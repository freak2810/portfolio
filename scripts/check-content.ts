import assert from "node:assert";
import { existsSync, mkdirSync, mkdtempSync, readdirSync, readFileSync, rmSync, statSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, extname, join } from "node:path";
import { content } from "../content/index.ts";
import { iconSlugs } from "../content/ids.ts";
import type { Content } from "../content/types.ts";

type Add = (path: string, rule: string, detail: string) => void;
type DeepMutable<T> = { -readonly [K in keyof T]: DeepMutable<T[K]> };

const repoRoot = join(import.meta.dirname, "..");
const bannedFile = "scripts/banned.txt";
const textExtensions = new Set([".ts", ".tsx", ".css", ".svg", ".json", ".md", ".txt", ".html"]);
const scannedDirs = ["app", "components", "styles"];

const phonePattern = /(?<!\d)\+?\d(?:[ ().-]{0,2}\d){8,}(?!\d)/;
const emailPattern = /^[^\s@:]+@[^\s@]+\.[^\s@]+$/;
const monthPattern = /^\d{4}-(0[1-9]|1[0-2])$/;
const teluguPattern = /^[ఀ-౿‌‍ ]+$/;
const pdfCharPattern = /^[ -~ -ÿ–—‘’“”•…€™]$/;
const publicNamePattern = /marvel|disney|avengers/i;

const main = (): void => {
  const args = process.argv.slice(2);
  if (args.includes("--self-test")) {
    selfTest();
    return;
  }
  const strict = args.includes("--strict");
  const flags = openFlags(content);
  if (!strict) flags.forEach((line) => console.log(`check-content: ${line}`));
  const problems = [...findProblems(content, strict), ...scanBanned(repoRoot)];
  if (problems.length > 0) {
    problems.forEach((problem) => console.log(`check-content: ${problem}`));
    console.log(`check-content: ${problems.length} problem(s)`);
    process.exitCode = 1;
    return;
  }
  console.log(`check-content: ok (${flags.length} open flag(s))`);
};

const walkNodes = (value: unknown, path: string, visit: (node: unknown, path: string) => void): void => {
  visit(value, path);
  if (Array.isArray(value)) {
    value.forEach((item, index) => walkNodes(item, `${path}[${index}]`, visit));
  } else if (typeof value === "object" && value !== null) {
    for (const [key, inner] of Object.entries(value)) walkNodes(inner, path ? `${path}.${key}` : key, visit);
  }
};

const walkStrings = (value: unknown, path: string, visit: (text: string, path: string) => void): void =>
  walkNodes(value, path, (node, nodePath) => {
    if (typeof node === "string") visit(node, nodePath);
  });

const findProblems = (c: Content, strict: boolean): string[] => {
  const found: string[] = [];
  const add: Add = (path, rule, detail) => {
    found.push(`${path}: ${rule}: ${detail}`);
  };
  checkStrings(c, add);
  checkHold(c, add);
  checkCharset(c, add);
  checkMonths(c, add);
  checkYears(c, add);
  checkIds(c, add);
  checkIcons(c, add);
  checkFeatured(c, add);
  if (strict) checkStrict(c, add);
  return found;
};

const openFlags = (c: Content): string[] => flagEntries(c).map(([path, text]) => `open flag: ${path}: ${text}`);

const checkStrings = (c: Content, add: Add): void =>
  walkStrings(c, "", (text, path) => {
    if (phonePattern.test(text)) add(path, "phone", "holds a phone-number pattern");
    if (path === "links.email") {
      if (!emailPattern.test(text)) add(path, "email", "not a bare address");
    } else if (text.includes("@")) {
      add(path, "email", "holds an @ outside links.email");
    }
    if (text !== text.normalize("NFC")) add(path, "nfc", "not NFC-normalised");
    if (path.endsWith(".te") && !teluguPattern.test(text)) add(path, "te", "holds a character outside the Telugu block");
  });

const checkHold = (c: Content, add: Add): void =>
  walkNodes(c, "", (node, path) => {
    if (typeof node === "object" && node !== null && (node as { hold?: unknown }).hold === true) {
      add(path, "hold", "held item left in published content");
    }
  });

const pdfSections = (c: Content): [string, unknown][] => [
  ["profile", c.profile],
  ["links", c.links],
  ["skills", c.skills],
  ["experience", c.experience],
  ["education", c.education],
  ["certifications", c.certifications],
  ...c.projects.flatMap((project, index): [string, unknown][] =>
    c.featuredProjectIds.includes(project.id) ? [[`projects[${index}]`, project]] : [],
  ),
];

const checkCharset = (c: Content, add: Add): void => {
  for (const [root, section] of pdfSections(c)) {
    walkStrings(section, root, (text, path) => {
      if (path.endsWith(".te")) return;
      const bad = [...text].find((char) => !pdfCharPattern.test(char));
      if (bad === undefined) return;
      const hex = (bad.codePointAt(0) ?? 0).toString(16).toUpperCase().padStart(4, "0");
      add(path, "charset", `U+${hex} is outside the PDF font allowance`);
    });
  }
};

const checkMonths = (c: Content, add: Add): void =>
  c.experience.forEach((job, i) =>
    job.roles.forEach((role, j) => {
      const path = `experience[${i}].roles[${j}]`;
      const startOk = monthPattern.test(role.start);
      const endOk = role.end === "present" || monthPattern.test(role.end);
      if (!startOk) add(`${path}.start`, "month", "not YYYY-MM with a month from 01 to 12");
      if (!endOk) add(`${path}.end`, "month", "not YYYY-MM with a month from 01 to 12, or present");
      if (startOk && endOk && role.end !== "present" && role.start > role.end) add(path, "month", "start is after end");
    }),
  );

const isYear = (value: unknown): value is number => Number.isInteger(value) && (value as number) >= 1950 && (value as number) <= 2100;

const checkYears = (c: Content, add: Add): void =>
  c.education.entries.forEach((entry, i) => {
    const path = `education.entries[${i}]`;
    if (!isYear(entry.start)) add(`${path}.start`, "years", "not a year from 1950 to 2100");
    if (entry.end !== "present" && !isYear(entry.end)) add(`${path}.end`, "years", "not a year from 1950 to 2100, or present");
    else if (typeof entry.end === "number" && isYear(entry.start) && entry.start > entry.end) add(path, "years", "start is after end");
  });

const checkIds = (c: Content, add: Add): void => {
  const collections: [string, readonly { id: string }[]][] = [
    ["experience", c.experience],
    ["education.entries", c.education.entries],
    ["certifications", c.certifications],
    ["projects", c.projects],
    ["landing.easterEggs", c.landing.easterEggs],
  ];
  for (const [name, items] of collections) {
    const seen = new Set<string>();
    items.forEach((item, index) => {
      if (seen.has(item.id)) add(`${name}[${index}].id`, "dup-id", "id repeats in this collection");
      seen.add(item.id);
    });
  }
};

const checkIcons = (c: Content, add: Add): void => {
  const shown = new Set([...c.skills.flatMap((group) => group.items), ...c.experience.flatMap((job) => job.tech)]);
  const keys = Object.keys(c.techIcons);
  const slugs: readonly string[] = iconSlugs;
  for (const name of shown) {
    if (!keys.includes(name)) add(`techIcons.${name}`, "icon-missing", "name is shown but has no table entry");
  }
  for (const key of keys) if (!shown.has(key)) add(`techIcons.${key}`, "icon-orphan", "key is not shown in skills or experience tech");
  const used = new Set<string>(Object.values(c.techIcons));
  for (const [key, value] of Object.entries(c.techIcons)) {
    if (value !== "chip" && !slugs.includes(value)) add(`techIcons.${key}`, "icon-slug", `${value} is neither chip nor a slug in iconSlugs`);
  }
  for (const slug of slugs) if (!used.has(slug)) add(`iconSlugs.${slug}`, "icon-unused", "slug is the value of no table entry");
  for (const slug of slugs) if (!/^[a-z0-9]+$/.test(slug)) add(`iconSlugs.${slug}`, "icon-slug-shape", "sprite id must be lowercase letters and digits");
};

const checkFeatured = (c: Content, add: Add): void =>
  c.featuredProjectIds.forEach((id, index) => {
    if (!c.projects.some((project) => project.id === id)) add(`featuredProjectIds[${index}]`, "featured", "no project has this id");
  });

const checkStrict = (c: Content, add: Add): void => {
  flagEntries(c).forEach(([path, text]) => add(path, "flag", text));
  Object.entries(c.status).forEach(([key, value]) => {
    if (value === "placeholder") add(`status.${key}`, "status", "section is still a placeholder");
  });
};

const flagEntries = (c: Content): [string, string][] => {
  const entries: [string, string][] = [];
  walkNodes(c, "", (node, path) => {
    if (typeof node !== "object" || node === null || Array.isArray(node)) return;
    const { flag, hold } = node as { flag?: unknown; hold?: unknown };
    if (typeof flag === "string" && hold !== true) entries.push([path, flag]);
  });
  return entries;
};

const scanBanned = (root: string): string[] => {
  const listPath = join(root, bannedFile);
  const lines = existsSync(listPath) ? readFileSync(listPath, "utf8").split(/\r?\n/) : [];
  const patterns = lines.filter((line) => line.trim() !== "" && !line.startsWith("#")).map((line) => new RegExp(line, "i"));
  if (patterns.length === 0) return [`${bannedFile}: banned: file missing or holds no pattern`];
  const reports: string[] = [];
  for (const file of scannedTextFiles(root)) {
    readFileSync(join(root, file), "utf8")
      .split(/\r?\n/)
      .forEach((line, index) => {
        const hit = patterns.find((pattern) => pattern.test(line));
        if (hit) reports.push(`${file}:${index + 1}: banned: matches ${hit.source}`);
      });
  }
  return [...reports, ...bannedPublicNames(root)];
};

const listFiles = (root: string, dir: string, recursive: boolean): string[] => {
  if (!existsSync(join(root, dir))) return [];
  return readdirSync(join(root, dir), { recursive })
    .map((entry) => `${dir}/${entry}`)
    .filter((file) => statSync(join(root, file)).isFile());
};

const scannedTextFiles = (root: string): string[] =>
  [...listFiles(root, "content", false), ...scannedDirs.flatMap((dir) => listFiles(root, dir, true))].filter((file) =>
    textExtensions.has(extname(file)),
  );

const bannedPublicNames = (root: string): string[] =>
  listFiles(root, "public", true)
    .filter((file) => publicNamePattern.test(file))
    .map((file) => `${file}: banned-name: matches ${publicNamePattern.source}`);

const selfTest = (): void => {
  runRuleCases();
  runModeCases();
  runBannedCases();
  console.log("self-test: ok");
};

const freshContent = (): DeepMutable<Content> => structuredClone(content) as DeepMutable<Content>;

const ruleCases: { label: string; rule: string; mutate: (c: DeepMutable<Content>) => void }[] = [
  { label: "phone, spaced", rule: "phone", mutate: (c) => { c.profile.summary += " 040 2345 6789"; } },
  { label: "phone, bracketed", rule: "phone", mutate: (c) => { c.profile.summary += " (040) 2345 6789"; } },
  { label: "month 13", rule: "month", mutate: (c) => { c.experience[0].roles[0].start = "2023-13"; } },
  { label: "year 1900", rule: "years", mutate: (c) => { c.education.entries[0].start = 1900; } },
  {
    label: "years reversed",
    rule: "years",
    mutate: (c) => {
      c.education.entries[0].start = 2021;
      c.education.entries[0].end = 2017;
    },
  },
  { label: "duplicate id", rule: "dup-id", mutate: (c) => { c.experience.push(structuredClone(c.experience[0])); } },
  { label: "missing featured id", rule: "featured", mutate: (c) => { c.featuredProjectIds[0] = "nope"; } },
  { label: "non-NFC string", rule: "nfc", mutate: (c) => { c.profile.name = "é"; } },
  { label: "hold left in content", rule: "hold", mutate: (c) => { c.experience[0].hold = true; } },
  { label: "arrow outside the PDF font", rule: "charset", mutate: (c) => { c.skills[0].items[0] += "→"; } },
  { label: "Telugu outside te", rule: "charset", mutate: (c) => { c.profile.title += "క"; } },
  { label: "te holds Latin", rule: "te", mutate: (c) => { c.profile.base.te = "abc"; } },
  { label: "stray email", rule: "email", mutate: (c) => { c.profile.summary += " a@b.co"; } },
  { label: "icon name with no table entry", rule: "icon-missing", mutate: (c) => { delete c.techIcons["Kafka"]; } },
  { label: "icon key shown nowhere", rule: "icon-orphan", mutate: (c) => { c.techIcons["Nothing Shown"] = "chip"; } },
  { label: "icon value not a slug", rule: "icon-slug", mutate: (c) => { (c.techIcons as Record<string, string>)["Kafka"] = "nope"; } },
  { label: "slug used by no entry", rule: "icon-unused", mutate: (c) => { c.techIcons["Kafka"] = "chip"; } },
  { label: "mailto in links.email", rule: "email", mutate: (c) => { c.links.email = "mailto:a@b.co"; } },
];

const runRuleCases = (): void => {
  for (const { label, rule, mutate } of ruleCases) {
    const c = freshContent();
    mutate(c);
    assert.ok(findProblems(c, false).some((problem) => problem.includes(`: ${rule}: `)), `${label}: expected a ${rule} problem`);
    console.log(`self-test: ${label}: ok`);
  }
};

const runModeCases = (): void => {
  assert.deepStrictEqual(findProblems(freshContent(), false), [], "untouched content must have no problem");
  const strict = findProblems(freshContent(), true);
  assert.ok(strict.some((problem) => problem.includes(": status: ")), "strict must flag a placeholder status");
  assert.ok(strict.some((problem) => problem.includes(": flag: ")), "strict must flag an open flag");
  assert.ok(openFlags(freshContent()).length > 0, "default mode must list the open flags");
  console.log("self-test: default and strict modes: ok");
};

const plant = (root: string, relPath: string, text: string): void => {
  const file = join(root, relPath);
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, text);
};

const scanPlanted = (files: Record<string, string>, withList: boolean): string[] => {
  const root = mkdtempSync(join(tmpdir(), "check-content-"));
  try {
    if (withList) plant(root, bannedFile, readFileSync(join(repoRoot, bannedFile), "utf8"));
    for (const [relPath, text] of Object.entries(files)) plant(root, relPath, text);
    return scanBanned(root);
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
};

const runBannedCases = (): void => {
  const listed = scanPlanted(
    {
      "app/planted.txt": "Marvel Studios\nif we lose, we lose it together\nthe publish API\n",
      "public/marvel-logo.png": "",
    },
    true,
  );
  assert.strictEqual(listed.length, 4, "listed phrases and public file name: expected four reports");
  for (const key of ["app/planted.txt:1", "app/planted.txt:2", "app/planted.txt:3", "public/marvel-logo.png"]) {
    assert.ok(listed.some((report) => report.startsWith(`${key}: `)), `expected a report for ${key}`);
  }
  console.log("self-test: banned phrases and public names: ok");

  const guards = [["Reg", "alla"], ["aditya", "2810.me"]].map(([head, tail]) => `${head}${tail}`);
  const guarded = scanPlanted({ "app/guards.txt": `${guards.join("\n")}\n` }, true);
  assert.strictEqual(guarded.length, 2, "guard lines: expected two reports");
  for (const key of ["app/guards.txt:1", "app/guards.txt:2"]) {
    assert.ok(guarded.some((report) => report.startsWith(`${key}: `)), `expected a report for ${key}`);
  }
  console.log("self-test: guard lines: ok");

  const silent = scanPlanted({ "app/anything.txt": "clean\n" }, false);
  assert.ok(silent.some((report) => report.includes("banned.txt")), "a missing banned.txt must be reported");
  console.log("self-test: missing banned.txt is reported: ok");
};

main();
