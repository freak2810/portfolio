import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { gzipSync } from "node:zlib";

const budgetBytes = 200_000;
const scriptPattern = /<script\b([^>]*)>(.*?)<\/script>/gs;
const srcPattern = /\ssrc=(["'])(.*?)\1/s;
const noModulePattern = /\snomodule\b/i;

const main = (): void => {
  const outDir = process.argv[2] ?? join(import.meta.dirname, "..", "out");
  const indexFile = join(outDir, "index.html");
  if (!existsSync(indexFile)) {
    console.log("measure: index.html not found; run the build first");
    process.exitCode = 1;
    return;
  }
  const html = readFileSync(indexFile, "utf8");
  const problems: string[] = [];
  let counted = 0;
  let firstLoadBytes = 0;
  let inlineBytes = 0;

  for (const [, attributes = "", body = ""] of html.matchAll(scriptPattern)) {
    const src = srcPattern.exec(attributes)?.[2];
    if (src === undefined) {
      inlineBytes += gzipSync(body, { level: 9 }).length;
      continue;
    }
    if (noModulePattern.test(attributes)) continue;
    const file = assetFile(outDir, src);
    if (file === undefined) {
      problems.push(`${src}: not found under out/_next`);
      continue;
    }
    counted++;
    firstLoadBytes += gzipSync(readFileSync(file), { level: 9 }).length;
  }

  console.log(
    `measure: first-load js ${firstLoadBytes} B gzip over ${counted} script(s) (budget ${budgetBytes} B); inline scripts ${inlineBytes} B gzip, not counted`,
  );
  if (firstLoadBytes > budgetBytes) problems.push(`over budget by ${firstLoadBytes - budgetBytes} B`);
  if (counted === 0) problems.push("no external script counted in index.html");
  problems.forEach((problem) => console.log(`measure: ${problem}`));
  if (problems.length > 0) process.exitCode = 1;
};

const assetFile = (outDir: string, src: string): string | undefined => {
  const marker = src.indexOf("/_next/");
  if (!src.startsWith("/") || src.startsWith("//") || marker === -1) return undefined;
  const file = join(outDir, src.slice(marker + 1));
  return existsSync(file) ? file : undefined;
};

main();
