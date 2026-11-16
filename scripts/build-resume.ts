import assert from "node:assert";
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import PDFDocument from "pdfkit";
import { content } from "../content/index.ts";
import type { Content, YearMonth } from "../content/types.ts";

type Style = "name" | "title" | "contact" | "heading" | "employer" | "item" | "role" | "body" | "small";
type Part = { text: string; link?: string };
type Line = { style: Style; parts: readonly Part[]; bullet?: true; employer?: string };
type DeepMutable<T> = { -readonly [K in keyof T]: DeepMutable<T[K]> };

const repoRoot = join(import.meta.dirname, "..");
const maxPages = 2;
const dash = "–";
const separator = "  |  ";
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

// Copy of the allowance in check-content.ts (pdfCharPattern); check-content cannot be imported.
const winAnsi = /^[ -~ -ÿ–—‘’“”•…€™]*$/;

const faces: Record<Style, { font: string; size: number }> = {
  name: { font: "Helvetica-Bold", size: 20 },
  title: { font: "Helvetica", size: 11 },
  contact: { font: "Helvetica", size: 9 },
  heading: { font: "Helvetica-Bold", size: 10.5 },
  employer: { font: "Helvetica-Bold", size: 10 },
  item: { font: "Helvetica-Bold", size: 10 },
  role: { font: "Helvetica", size: 9.5 },
  body: { font: "Helvetica", size: 9 },
  small: { font: "Helvetica-Oblique", size: 8.5 },
};

const main = async (): Promise<void> => {
  if (process.argv.slice(2).includes("--self-test")) {
    selfTest();
    return;
  }
  const lines = buildLines(content);
  const { bytes, pages } = await render(lines);
  lines.forEach((line) => {
    if (line.employer) console.log(`build-resume: employer: ${line.employer}`);
  });
  const found = problems(content, lines, pages);
  if (found.length > 0) {
    found.forEach((problem) => console.log(`build-resume: ${problem}`));
    console.log(`build-resume: ${found.length} problem(s)`);
    process.exitCode = 1;
    return;
  }
  mkdirSync(join(repoRoot, "public"), { recursive: true });
  writeFileSync(join(repoRoot, "public", "resume.pdf"), bytes);
  console.log(`build-resume: ok (${pages} page(s), ${bytes.length} B, public/resume.pdf)`);
};

const month = (value: YearMonth | "present"): string => {
  if (value === "present") return "Present";
  const [year, number] = value.split("-");
  return `${months[Number(number) - 1]} ${year}`;
};

const year = (value: number | "present"): string => (value === "present" ? "Present" : String(value));

const plain = (text: string): Part => ({ text });
const shown = (url: string): string => url.replace(/^https:\/\//, "");
const linked = (url: string): Part => ({ text: shown(url), link: url });
const withSeparators = (parts: readonly Part[]): Part[] =>
  parts.flatMap((part, index) => (index === 0 ? [part] : [plain(separator), part]));
const techLine = (tech: readonly string[]): Line[] =>
  tech.length > 0 ? [{ style: "small", parts: [plain(`Tech: ${tech.join(", ")}`)] }] : [];
const bulletLines = (bullets: readonly { text: string }[]): Line[] =>
  bullets.map((bullet) => ({ style: "body", parts: [plain(bullet.text)], bullet: true }));

const buildLines = (c: Content): Line[] => [
  { style: "name", parts: [plain(c.profile.name)] },
  { style: "title", parts: [plain(c.profile.title)] },
  {
    style: "contact",
    parts: withSeparators([
      plain(c.profile.base.en),
      { text: c.links.email, link: `mailto:${c.links.email}` },
      linked(c.links.linkedin),
      linked(c.links.github),
    ]),
  },
  { style: "heading", parts: [plain("Summary")] },
  { style: "body", parts: [plain(c.profile.summary)] },
  { style: "heading", parts: [plain("Experience")] },
  ...c.experience.flatMap(experienceLines),
  { style: "heading", parts: [plain("Skills")] },
  ...c.skills.map((group): Line => ({ style: "body", parts: [plain(`${group.name}: ${group.items.join(", ")}`)] })),
  { style: "heading", parts: [plain("Projects")] },
  ...c.featuredProjectIds.flatMap((id) => projectLines(c, id)),
  { style: "heading", parts: [plain("Education")] },
  ...educationLines(c),
  { style: "heading", parts: [plain("Certifications")] },
  ...bulletLines(c.certifications.map((cert) => ({ text: cert.name }))),
  { style: "heading", parts: [plain("Languages")] },
  { style: "body", parts: [plain(c.profile.languages.map((l) => (l.level ? `${l.name} (${l.level})` : l.name)).join(", "))] },
];

const experienceLines = (e: Content["experience"][number]): Line[] => [
  { style: "employer", parts: [plain(`${e.company}, ${e.location}`)], employer: e.company },
  ...(e.about ? [{ style: "small", parts: [plain(e.about)] } satisfies Line] : []),
  ...e.roles.map((role): Line => ({
    style: "role",
    parts: [plain(`${role.title} ${dash} ${month(role.start)} ${dash} ${month(role.end)}`)],
  })),
  ...bulletLines(e.bullets),
  ...techLine(e.tech),
];

const projectLines = (c: Content, id: string): Line[] => {
  const project = c.projects.find((p) => p.id === id);
  if (!project) return [];
  const urls = [project.repoUrl, project.liveUrl].filter((url): url is string => url !== undefined);
  return [
    { style: "item", parts: [plain(project.title)] },
    { style: "small", parts: [plain(project.headline)] },
    ...bulletLines(project.points),
    ...techLine(project.tech),
    ...(urls.length > 0 ? [{ style: "small", parts: withSeparators(urls.map(linked)) } satisfies Line] : []),
  ];
};

const educationLines = (c: Content): Line[] => [
  ...c.education.entries.flatMap((entry): Line[] => [
    { style: "item", parts: [plain(entry.school)] },
    { style: "role", parts: [plain(`${entry.degree} ${dash} ${year(entry.start)} ${dash} ${year(entry.end)}`)] },
    ...(entry.detail ? [{ style: "small", parts: [plain(entry.detail)] } satisfies Line] : []),
  ]),
  ...(c.education.majorProject
    ? [
        {
          style: "body",
          parts: [
            plain(
              `Major project: ${c.education.majorProject.title}. ${c.education.majorProject.summary} Tech: ${c.education.majorProject.tech.join(", ")}`,
            ),
          ],
        } satisfies Line,
      ]
    : []),
];

const lineText = (line: Line): string => line.parts.map((part) => part.text).join("");

// Checks the built lines, not the written file; the file is proved by extracting its text.
const problems = (c: Content, lines: readonly Line[], pages: number): string[] => {
  const found: string[] = [];
  const drawn = lines.flatMap((line) => (line.employer ? [line.employer] : []));
  const expected = c.experience.map((e) => e.company);
  if (drawn.join("\n") !== expected.join("\n")) {
    found.push(`employers: drew [${drawn.join("; ")}], content has [${expected.join("; ")}]`);
  }
  if (pages > maxPages) found.push(`pages: ${pages} pages, the limit is ${maxPages}`);
  for (const line of lines) {
    if (!winAnsi.test(lineText(line))) found.push(`charset: outside the PDF font allowance: ${lineText(line).slice(0, 60)}`);
  }
  return found;
};

const render = (lines: readonly Line[]): Promise<{ bytes: Buffer; pages: number }> =>
  new Promise((resolve, reject) => {
    const doc = new PDFDocument({
      size: "A4",
      margins: { top: 40, bottom: 40, left: 46, right: 46 },
      bufferPages: true,
      info: { Title: `${content.profile.name} Resume`, Author: content.profile.name },
    });
    const chunks: Buffer[] = [];
    let pages = 0;
    doc.on("data", (chunk: Buffer) => chunks.push(chunk));
    doc.on("end", () => resolve({ bytes: Buffer.concat(chunks), pages }));
    doc.on("error", reject);
    try {
      lines.forEach((line) => drawLine(doc, line));
      pages = doc.bufferedPageRange().count;
      doc.end();
    } catch (error) {
      reject(error);
    }
  });

const drawLine = (doc: PDFKit.PDFDocument, line: Line): void => {
  const { font, size } = faces[line.style];
  const { left, right, bottom } = doc.page.margins;
  const width = doc.page.width - left - right;
  const isHeading = line.style === "heading";
  if (isHeading) {
    if (doc.y > doc.page.height - bottom - 90) doc.addPage();
    doc.moveDown(0.6);
  } else if (line.style === "employer" || line.style === "item") {
    doc.moveDown(0.4);
  }
  const parts = line.bullet ? [plain("•  "), ...line.parts] : line.parts;
  parts.forEach((part, index) => {
    doc.font(font).fontSize(size).fillColor(part.link ? "#1A4F8A" : "#000000");
    doc.text(isHeading ? part.text.toUpperCase() : part.text, {
      width,
      lineGap: 1.2,
      continued: index < parts.length - 1,
      link: part.link,
      ...(isHeading ? { characterSpacing: 0.6 } : {}),
    });
  });
  if (isHeading) {
    doc.moveTo(left, doc.y + 1).lineTo(left + width, doc.y + 1).lineWidth(0.5).strokeColor("#888888").stroke();
    doc.moveDown(0.3);
  }
};

const selfTest = (): void => {
  assert.strictEqual(month("2025-07"), "Jul 2025");
  assert.strictEqual(month("present"), "Present");
  assert.strictEqual(year(2017), "2017");
  assert.strictEqual(year("present"), "Present");
  console.log("self-test: month and year: ok");

  const lines = buildLines(content);
  assert.deepStrictEqual(problems(content, lines, 2), [], "untouched content must have no problem");
  console.log("self-test: untouched content: ok");

  const flagged = structuredClone(content) as DeepMutable<Content>;
  flagged.experience[0].bullets[0].flag = "SECRET-FLAG-TEXT";
  flagged.projects[0].points[0].flag = "SECRET-FLAG-TEXT";
  assert.ok(!buildLines(flagged).some((line) => lineText(line).includes("SECRET-FLAG-TEXT")), "flag text must not be drawn");
  console.log("self-test: flag text never drawn: ok");

  const dropped = structuredClone(content) as DeepMutable<Content>;
  dropped.experience.pop();
  const reversed = structuredClone(content) as DeepMutable<Content>;
  reversed.experience.reverse();
  for (const clone of [dropped, reversed]) {
    assert.ok(problems(clone, lines, 2).some((problem) => problem.startsWith("employers:")), "expected an employers problem");
  }
  console.log("self-test: employer list: ok");

  assert.ok(problems(content, lines, 3).some((problem) => problem.startsWith("pages:")), "3 pages must be a problem");
  assert.ok(!problems(content, lines, 2).some((problem) => problem.startsWith("pages:")), "2 pages must pass");
  console.log("self-test: page limit: ok");

  for (const extra of [" →", " ś", " ప"]) {
    const clone = structuredClone(content) as DeepMutable<Content>;
    clone.profile.summary += extra;
    assert.ok(problems(clone, buildLines(clone), 2).some((problem) => problem.startsWith("charset:")), `expected a charset problem for ${extra}`);
  }
  const allowed = structuredClone(content) as DeepMutable<Content>;
  allowed.profile.summary += ` café ${dash} €`;
  assert.ok(!problems(allowed, buildLines(allowed), 2).some((problem) => problem.startsWith("charset:")), "allowed letters must pass");
  console.log("self-test: charset: ok");

  console.log("self-test: ok");
};

main().catch((error: unknown) => {
  console.log(`build-resume: ${error instanceof Error ? error.message : String(error)}`);
  process.exitCode = 1;
});
