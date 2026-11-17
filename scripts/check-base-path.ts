import assert from "node:assert";
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { content } from "../content/index.ts";

type Page = { path: string; text: string };
type Reference = { where: string; value: string };

const repoRoot = join(import.meta.dirname, "..");
const requiredFiles = ["index.html", "404.html"];
const inlineScriptPattern = /<script(?![^>]*\ssrc=)[^>]*>.*?<\/script>/gs;
const attributePattern = /\s([\w:.-]+)=(["'])(.*?)\2/gs;
const urlPattern = /url\(\s*(["']?)([^)"'\s]*)\1\s*\)/g;

const main = (): void => {
  const args = process.argv.slice(2);
  if (args.includes("--self-test")) {
    selfTest();
    return;
  }
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  const problems = checkOutput(args[0] ?? join(repoRoot, "out"), base);
  if (problems.length > 0) {
    problems.forEach((problem) => console.log(`check-base-path: ${problem}`));
    console.log(`check-base-path: ${problems.length} problem(s)`);
    process.exitCode = 1;
    return;
  }
  console.log("check-base-path: ok");
};

const checkOutput = (outDir: string, base: string): string[] => {
  const envProblem = baseProblem(base) ?? siteProblem(content.links.site, base);
  if (envProblem) return [envProblem];
  const missing = requiredFiles.filter((name) => !existsSync(join(outDir, name)));
  if (missing.length > 0) return missing.map((name) => `out: missing-file: ${name}`);
  return findProblems(readPages(outDir), base);
};

const baseProblem = (base: string): string | undefined =>
  /^\/[^/]/.test(base) && !base.endsWith("/")
    ? undefined
    : `env: base: NEXT_PUBLIC_BASE_PATH must look like /name with no trailing slash, got "${base}"`;

const siteProblem = (site: string, base: string): string | undefined =>
  new URL(site).pathname === `${base}/`
    ? undefined
    : `site: path: content.links.site must end in "${base}/", got "${new URL(site).pathname}"`;

const readPages = (outDir: string): Page[] =>
  readdirSync(outDir, { recursive: true, encoding: "utf8" })
    .filter((path) => /\.(html|css)$/.test(path))
    .map((path) => ({ path, text: readFileSync(join(outDir, path), "utf8") }));

const findProblems = (pages: Page[], base: string): string[] => {
  const found: string[] = [];
  let nextAssets = 0;
  for (const page of pages) {
    for (const { where, value } of references(page)) {
      if (value.startsWith(`${base}/_next/`)) nextAssets++;
      if (isOffender(value, base)) found.push(`${page.path}: ${where}: ${value.slice(0, 80)}`);
    }
  }
  if (nextAssets === 0) found.push(`out: no-next-asset: no reference starts with ${base}/_next/`);
  return found;
};

const references = (page: Page): Reference[] => {
  const isHtml = page.path.endsWith(".html");
  const text = isHtml ? page.text.replace(inlineScriptPattern, "") : page.text;
  const found: Reference[] = [];
  if (isHtml) {
    for (const [, name = "", , value = ""] of text.matchAll(attributePattern)) {
      for (const path of attributePaths(name, value)) found.push({ where: `attr ${name}`, value: path });
    }
  }
  for (const [, , value = ""] of text.matchAll(urlPattern)) found.push({ where: "url()", value });
  return found;
};

const attributePaths = (name: string, value: string): string[] =>
  /^(image)?srcset$/i.test(name)
    ? value.split(",").map((entry) => entry.trim().split(/\s+/)[0] ?? "")
    : [value];

const isOffender = (path: string, base: string): boolean =>
  path.startsWith("/") && !path.startsWith("//") && !isUnderBase(path, base);

const isUnderBase = (path: string, base: string): boolean =>
  path === base || ["/", "?", "#"].some((separator) => path.startsWith(base + separator));

const selfBase = "/base";
const html = (text: string): Page => ({ path: "p.html", text });
const css = (text: string): Page => ({ path: "a.css", text });
const anchor = html('<link href="/base/_next/a.css">');

const check = (label: string, ok: boolean): void => {
  assert.ok(ok, label);
  console.log(`self-test: ${label}`);
};

const selfTest = (): void => {
  check("anchor alone is clean", findProblems([anchor], selfBase).length === 0);
  selfTestFlagged();
  selfTestClean();
  selfTestBase();
  console.log("self-test: ok");
};

const selfTestFlagged = (): void => {
  const flagged: [string, Page, string][] = [
    ["root-relative href", html('<a href="/_next/a.js">'), "attr href"],
    ["root-relative src", html('<img src="/x.png">'), "attr src"],
    ["wrong-case base", html('<a href="/Base/x">'), "attr href"],
    ["base as prefix of another segment", html('<a href="/base-x/y">'), "attr href"],
    ["second srcset entry", html('<img srcset="/base/a.png 1x, /b.png 2x">'), "attr srcset"],
    ["unquoted css url", css("a{b:url(/f.woff2)}"), "url()"],
    ["spaced quoted css url", css('a{b:url( "/f.woff2" )}'), "url()"],
    ["inline style url", html('<div style="background:url(/p.png)">'), "url()"],
  ];
  for (const [label, page, rule] of flagged) {
    check(`flags ${label}`, findProblems([anchor, page], selfBase).some((line) => line.includes(rule)));
  }
  const noAnchor = findProblems([html('<a href="#a">')], selfBase);
  check("flags a page set with no anchor", noAnchor.some((line) => line.includes("no-next-asset")));
};

const selfTestClean = (): void => {
  const clean: [string, Page][] = [
    ["the base itself", html('<a href="/base">')],
    ["base with hash", html('<a href="/base#a">')],
    ["base with query", html('<a href="/base?x=1">')],
    ["protocol-relative host", html('<a href="//cdn.example/x.js">')],
    ["fragment", html('<a href="#projects">')],
    ["mailto", html('<a href="mailto:a@b.co">')],
    ["https", html('<a href="https://example.com/">')],
    ["relative css url", css("a{b:url(../media/a.woff2)}")],
    ["data css url", css("a{b:url(data:image/png;base64,AAA)}")],
    ["inline script text", html('<script>x("<a href=\\"/zzz\\">")</script>')],
    ["external script under base", html('<script src="/base/_next/s.js"></script>')],
  ];
  for (const [label, page] of clean) {
    check(`passes ${label}`, findProblems([anchor, page], selfBase).length === 0);
  }
};

const selfTestBase = (): void => {
  for (const bad of ["", "name", "/name/", "/"]) {
    check(`rejects base "${bad}"`, baseProblem(bad) !== undefined);
  }
  for (const good of ["/name", "/a.b"]) {
    check(`accepts base "${good}"`, baseProblem(good) === undefined);
  }
  check("accepts a site under the base", siteProblem("https://x.github.io/name/", "/name") === undefined);
  for (const bad of ["https://x.github.io/", "https://x.github.io/other/", "https://x.github.io/name"]) {
    check(`rejects site "${bad}"`, siteProblem(bad, "/name") !== undefined);
  }
};

main();
