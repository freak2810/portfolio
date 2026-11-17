import assert from "node:assert";
import { execFile, spawn } from "node:child_process";
import { existsSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import type { Server } from "node:http";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { promisify } from "node:util";
import { baseProblem, serveOut } from "./serve-out.ts";

type Run = { perf: number; a11y: number; cls: number; fcp: number; lcp: number; contrast: boolean; failing: string[] };
type Tools = { chrome: string; bin: string; dir: string };

const repoRoot = join(import.meta.dirname, "..");
const port = 4173;
const pageRuns = 3;
const runTimeoutMs = 120_000;
const defaultChrome = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const limits = { perf: 90, a11y: 90, cls: 0.1, fcp: 2000, lcp: 2500 };
const themePattern = /portfolio-theme|data-theme/;
const execFileAsync = promisify(execFile);

const main = async (): Promise<void> => {
  const args = process.argv.slice(2);
  if (args.includes("--self-test")) {
    selfTest();
    return;
  }
  const dir = mkdtempSync(join(tmpdir(), "lighthouse-check-"));
  const tools = {
    chrome: process.env.CHROME_PATH ?? defaultChrome,
    bin: join(repoRoot, "node_modules", ".bin", "lighthouse"),
    dir,
  };
  try {
    const urlAt = args.indexOf("--url");
    const outDir = args[0] && !args[0].startsWith("--") ? args[0] : join(repoRoot, "out");
    report(urlAt >= 0 ? await checkLive(args[urlAt + 1] ?? "", tools) : await checkLocal(outDir, tools));
  } finally {
    rmSync(dir, { recursive: true });
  }
};

const report = (problems: string[]): void => {
  problems.forEach((problem) => console.log(`lighthouse: ${problem}`));
  if (problems.length === 0) {
    console.log("lighthouse: ok");
    return;
  }
  console.log(`lighthouse: ${problems.length} problem(s)`);
  process.exitCode = 1;
};

const message = (error: unknown): string => (error instanceof Error ? error.message : String(error));

const themeProblem = (name: string, text: string): string | undefined => {
  const hit = text.match(themePattern);
  return hit ? `theme: ${name} holds "${hit[0]}" but the site has one black theme` : undefined;
};

const toolProblems = (tools: Tools): string[] => [
  ...(existsSync(tools.chrome) ? [] : [`chrome: not found at ${tools.chrome} (set CHROME_PATH)`]),
  ...(existsSync(tools.bin) ? [] : [`bin: ${tools.bin} is missing (run pnpm install)`]),
];

const preflight = (outDir: string, base: string, tools: Tools): string[] => {
  const envProblem = baseProblem(base);
  if (envProblem) return [envProblem];
  const files = ["index.html", "404.html"].map((name) => join(outDir, name));
  const missing = files.filter((file) => !existsSync(file)).map((file) => `out: missing-file: ${file}`);
  if (missing.length > 0) return [...missing, ...toolProblems(tools)];
  const [index = "", notFound = ""] = files.map((file) => readFileSync(file, "utf8"));
  const problems = [themeProblem("out/index.html", index), themeProblem("out/404.html", notFound)];
  if (!index.includes(`${base}/_next/`)) problems.push(`out: index.html: not built with ${base}`);
  return [...problems.filter((problem) => problem !== undefined), ...toolProblems(tools)];
};

const checkLocal = async (outDir: string, tools: Tools): Promise<string[]> => {
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  const early = preflight(outDir, base, tools);
  if (early.length > 0) return early;
  let server: Server;
  try {
    server = await serveOut({ outDir, base, port });
  } catch (error) {
    return [`${message(error)} (stop any pnpm serve first)`];
  }
  try {
    const root = `http://127.0.0.1:${port}${base}`;
    for (const url of [`${root}/`, `${root}/404.html`]) await proveRendered(tools, url);
    const pages = await auditRuns(tools, `${root}/`, "page", "performance,accessibility", pageRuns);
    printRuns(pages);
    const notFound = await auditRuns(tools, `${root}/404.html`, "404", "accessibility", 1);
    notFound.forEach((run) => console.log(`lighthouse: 404: a11y ${run.a11y} contrast ${run.contrast ? "pass" : "FAIL"}`));
    return [...judgePage("page", pages), ...judgeA11y("404", notFound)];
  } catch (error) {
    return [message(error)];
  } finally {
    server.close();
    server.closeAllConnections();
  }
};

const urlProblem = (raw: string): string | undefined =>
  URL.canParse(raw) && new URL(raw).protocol === "https:" ? undefined : `url: must be an https URL, got "${raw}"`;

const checkLive = async (raw: string, tools: Tools): Promise<string[]> => {
  const early = [urlProblem(raw), ...toolProblems(tools)].filter((problem) => problem !== undefined);
  if (early.length > 0) return early;
  try {
    const runs = await auditRuns(tools, raw, "live", "performance,accessibility", pageRuns);
    printRuns(runs);
    return judgePage("live", runs);
  } catch (error) {
    return [message(error)];
  }
};

const proveRendered = async (tools: Tools, url: string): Promise<void> => {
  const profile = join(tools.dir, `profile-${Math.random().toString(36).slice(2)}`);
  const args = ["--headless=new", "--disable-gpu", "--no-first-run", `--user-data-dir=${profile}`, "--dump-dom", url];
  let dom: string;
  try {
    dom = (await execFileAsync(tools.chrome, args, { timeout: 30_000, maxBuffer: 5_000_000 })).stdout;
  } catch (error) {
    throw new Error(`page: ${url}: ${message(error)}`);
  }
  if (!/<html[^>]*\sclass="[^"]*\bjs\b/.test(dom)) throw new Error(`page: ${url}: <html> has no js class, the head script did not run`);
  if (/data-(forced-)?theme/.test(dom)) throw new Error(`page: ${url}: a theme attribute is set`);
};

const auditRuns = async (tools: Tools, url: string, label: string, categories: string, count: number): Promise<Run[]> => {
  const runs: Run[] = [];
  for (let n = 1; n <= count; n++) {
    const file = join(tools.dir, `${label}-${n}.json`);
    await runLighthouse(tools, [
      url,
      `--only-categories=${categories}`,
      "--chrome-flags=--headless=new",
      "--output=json",
      `--output-path=${file}`,
      "--quiet",
    ]);
    runs.push(parseReport(readFileSync(file, "utf8"), file, categories.includes("performance")));
  }
  return runs;
};

const runLighthouse = (tools: Tools, args: string[]): Promise<void> =>
  new Promise((done, fail) => {
    const child = spawn(tools.bin, args, { env: { ...process.env, CHROME_PATH: tools.chrome }, stdio: "ignore" });
    const timer = setTimeout(() => child.kill(), runTimeoutMs);
    child.on("error", (error) => {
      clearTimeout(timer);
      fail(error);
    });
    child.on("close", (code, signal) => {
      clearTimeout(timer);
      if (code === 0) done();
      else fail(new Error(`run: ${args[0]}: lighthouse ${signal ? `killed by ${signal}` : `exited ${code}`}`));
    });
  });

const pick = (value: unknown, path: string[]): unknown =>
  path.reduce<unknown>((node, key) => (typeof node === "object" && node !== null ? (node as Record<string, unknown>)[key] : undefined), value);

const parseReport = (raw: string, file: string, withPerf: boolean): Run => {
  let data: unknown;
  try {
    data = JSON.parse(raw);
  } catch {
    throw new Error(`report: ${file}: JSON unparsable`);
  }
  const num = (path: string[]): number => {
    const value = pick(data, path);
    if (typeof value !== "number") throw new Error(`report: ${file}: ${path.join(".")} missing`);
    return value;
  };
  const metric = (path: string[]): number => (withPerf ? num(path) : 0);
  const expected = { formFactor: "mobile", throttlingMethod: "simulate" };
  for (const [key, want] of Object.entries(expected)) {
    const got = pick(data, ["configSettings", key]);
    if (got !== want) throw new Error(`report: ${file}: configSettings.${key} is ${String(got)}, not ${want}`);
  }
  return {
    perf: Math.round(metric(["categories", "performance", "score"]) * 100),
    a11y: Math.round(num(["categories", "accessibility", "score"]) * 100),
    cls: metric(["audits", "cumulative-layout-shift", "numericValue"]),
    fcp: metric(["audits", "first-contentful-paint", "numericValue"]),
    lcp: metric(["audits", "largest-contentful-paint", "numericValue"]),
    contrast: pick(data, ["audits", "color-contrast", "score"]) === 1,
    failing: failingIds(data, file),
  };
};

const failingIds = (data: unknown, file: string): string[] => {
  const refs = pick(data, ["categories", "accessibility", "auditRefs"]);
  if (!Array.isArray(refs)) throw new Error(`report: ${file}: categories.accessibility.auditRefs missing`);
  return refs
    .filter((ref: { id: string; weight: number }) => ref.weight > 0 && pick(data, ["audits", ref.id, "score"]) === 0)
    .map((ref: { id: string }) => ref.id);
};

const median = (values: number[]): number => {
  const sorted = [...values].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 === 1 ? (sorted[mid] ?? 0) : ((sorted[mid - 1] ?? 0) + (sorted[mid] ?? 0)) / 2;
};

const medianRun = (runs: Run[]): Run => ({
  perf: median(runs.map((run) => run.perf)),
  a11y: median(runs.map((run) => run.a11y)),
  cls: median(runs.map((run) => run.cls)),
  fcp: median(runs.map((run) => run.fcp)),
  lcp: median(runs.map((run) => run.lcp)),
  contrast: runs.every((run) => run.contrast),
  failing: runs.flatMap((run) => run.failing),
});

const printRuns = (runs: Run[]): void => {
  runs.forEach((run, index) => console.log(`lighthouse: run ${index + 1}: ${summarize(run)}`));
  console.log(`lighthouse: median: ${summarize(medianRun(runs))}`);
};

const summarize = (run: Run): string =>
  `perf ${run.perf} a11y ${run.a11y} cls ${Number(run.cls.toFixed(3))} fcp ${Math.round(run.fcp)} lcp ${Math.round(run.lcp)} contrast ${run.contrast ? "pass" : "FAIL"}`;

const judgeA11y = (label: string, runs: Run[]): string[] => {
  const problems: string[] = [];
  const a11y = median(runs.map((run) => run.a11y));
  if (a11y < limits.a11y) problems.push(`${label}: a11y ${a11y} vs ${limits.a11y}`);
  if (runs.some((run) => !run.contrast)) problems.push(`${label}: color-contrast failing in at least one run`);
  for (const id of new Set(runs.flatMap((run) => run.failing))) problems.push(`${label}: failing audit ${id}`);
  return problems;
};

const judgePage = (label: string, runs: Run[]): string[] => {
  const med = medianRun(runs);
  const problems: string[] = [];
  if (med.perf < limits.perf) problems.push(`${label}: perf ${med.perf} vs ${limits.perf}`);
  if (!(med.cls < limits.cls)) problems.push(`${label}: cls ${med.cls} vs ${limits.cls}`);
  if (!(med.fcp < limits.fcp)) problems.push(`${label}: fcp ${Math.round(med.fcp)} vs ${limits.fcp}`);
  if (!(med.lcp < limits.lcp)) problems.push(`${label}: lcp ${Math.round(med.lcp)} vs ${limits.lcp}`);
  return [...problems, ...judgeA11y(label, runs)];
};

const preflightSelfTest = (): void => {
  const dir = mkdtempSync(join(tmpdir(), "lighthouse-check-test-"));
  try {
    const tools = { chrome: process.execPath, bin: process.execPath, dir };
    const page = (extra: string): string => `<html class="js"><a href="/b/_next/x">${extra}</a></html>`;
    writeFileSync(join(dir, "404.html"), "<html></html>");
    writeFileSync(join(dir, "index.html"), page(""));
    assert.deepStrictEqual(preflight(dir, "/b", tools), []);
    writeFileSync(join(dir, "index.html"), page("portfolio-theme"));
    assert(preflight(dir, "/b", tools).some((problem) => problem.startsWith("theme:")));
  } finally {
    rmSync(dir, { recursive: true });
  }
};

const selfTest = (): void => {
  assert.strictEqual(median([3, 1, 2]), 2);
  assert.strictEqual(median([4, 1, 3, 2]), 2.5);
  const good: Run = { perf: 90, a11y: 90, cls: 0.099, fcp: 1999, lcp: 2499, contrast: true, failing: [] };
  const withBad = (bad: Partial<Run>, count: number): Run[] =>
    Array.from({ length: 3 }, (_, index) => (index < count ? { ...good, ...bad } : good));
  assert.deepStrictEqual(judgePage("page", withBad({}, 0)), []);
  const cases: [Partial<Run>, number, string][] = [
    [{ perf: 89 }, 2, "perf"],
    [{ a11y: 89 }, 2, "a11y"],
    [{ cls: 0.1 }, 2, "cls"],
    [{ fcp: 2000 }, 2, "fcp"],
    [{ lcp: 2500 }, 2, "lcp"],
    [{ contrast: false }, 1, "color-contrast"],
    [{ failing: ["aria-allowed-attr"] }, 1, "aria-allowed-attr"],
  ];
  for (const [bad, count, metric] of cases) {
    const problems = judgePage("page", withBad(bad, count));
    assert(problems.length === 1 && problems[0]?.includes(metric), metric);
  }
  assert.deepStrictEqual(judgeA11y("404", withBad({ perf: 10 }, 3)), []);
  assert(["http://x", "file:///x", "not a url"].every((raw) => urlProblem(raw) !== undefined));
  assert.strictEqual(urlProblem("https://example.com/"), undefined);
  assert(themeProblem("page", '<html data-theme="x">') !== undefined);
  assert(themeProblem("page", "<style>.portfolio-theme{}</style>") !== undefined);
  assert.strictEqual(themeProblem("page", "<html class=\"js\">"), undefined);
  preflightSelfTest();
  console.log("self-test: ok");
};

if (import.meta.main) {
  main().catch((error: unknown) => {
    console.log(`lighthouse: ${message(error)}`);
    process.exitCode = 1;
  });
}
