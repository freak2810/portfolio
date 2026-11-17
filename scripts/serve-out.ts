import assert from "node:assert";
import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, statSync, writeFileSync } from "node:fs";
import { createServer, request, type IncomingMessage, type Server, type ServerResponse } from "node:http";
import { tmpdir } from "node:os";
import { extname, join, resolve, sep } from "node:path";
import { gunzipSync, gzipSync } from "node:zlib";

type Options = { outDir: string; base: string; port: number; injectHead?: string };
type Reply = { status: number; type: string; body: Buffer; headers?: Record<string, string> };

const repoRoot = join(import.meta.dirname, "..");
const html = "text/html; charset=utf-8";
const headPattern = /<head(\s[^>]*)?>/i;
const textType = /^(text\/|application\/json|image\/svg\+xml)/;
const types: Record<string, string> = {
  ".html": html,
  ".css": "text/css",
  ".js": "text/javascript",
  ".mjs": "text/javascript",
  ".json": "application/json",
  ".txt": "text/plain",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".webp": "image/webp",
  ".avif": "image/avif",
  ".ico": "image/x-icon",
  ".woff2": "font/woff2",
  ".pdf": "application/pdf",
};

const main = async (): Promise<void> => {
  const args = process.argv.slice(2);
  if (args.includes("--self-test")) {
    await selfTest();
    return;
  }
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  const envProblem = baseProblem(base);
  if (envProblem) {
    console.log(`serve-out: ${envProblem}`);
    process.exitCode = 1;
    return;
  }
  const outDir = join(repoRoot, "out");
  const index = join(outDir, "index.html");
  if (!existsSync(index) || !readFileSync(index, "utf8").includes(`${base}/_next/`)) {
    console.log(`serve-out: out: not built with ${base}`);
    process.exitCode = 1;
    return;
  }
  const port = Number(args[0] ?? 4173);
  await serveOut({ outDir, base, port });
  console.log(`serve-out: http://127.0.0.1:${port}${base}/`);
};

export const baseProblem = (base: string): string | undefined =>
  /^\/[^/]+$/.test(base)
    ? undefined
    : `env: base: NEXT_PUBLIC_BASE_PATH must look like /name with no trailing slash, got "${base}"`;

export const serveOut = (options: Options): Promise<Server> => {
  const problem = baseProblem(options.base);
  if (problem) return Promise.reject(new Error(problem));
  const outDir = resolve(options.outDir);
  const server = createServer((req, res) => send(req, res, answer(outDir, options.base, req), options.injectHead));
  return new Promise((done, fail) => {
    server.once("error", (error: NodeJS.ErrnoException) =>
      fail(error.code === "EADDRINUSE" ? new Error(`port ${options.port} is in use`) : error),
    );
    server.listen(options.port, "127.0.0.1", () => done(server));
  });
};

const text = (status: number, body: string): Reply => ({ status, type: "text/plain", body: Buffer.from(body) });

const answer = (outDir: string, base: string, req: IncomingMessage): Reply => {
  if (req.method !== "GET" && req.method !== "HEAD") return { ...text(405, "method not allowed"), headers: { Allow: "GET, HEAD" } };
  const pathname = (req.url ?? "/").split("?")[0] ?? "/";
  if (pathname === base) return { ...text(301, ""), headers: { Location: `${base}/` } };
  if (!pathname.startsWith(`${base}/`)) return text(404, `outside ${base}`);
  const file = fileFor(outDir, pathname.slice(base.length));
  if (file) return { status: 200, type: types[extname(file).toLowerCase()] ?? "application/octet-stream", body: readFileSync(file) };
  const missing = join(outDir, "404.html");
  const body = existsSync(missing) ? readFileSync(missing) : Buffer.from("not found");
  return { status: 404, type: html, body };
};

const fileFor = (outDir: string, rest: string): string | undefined => {
  let decoded: string;
  try {
    decoded = decodeURIComponent(rest);
  } catch {
    return undefined;
  }
  const target = resolve(outDir, `.${decoded}`);
  if (decoded.includes("\0") || (target !== outDir && !target.startsWith(outDir + sep))) return undefined;
  try {
    return [target, join(target, "index.html"), `${target}.html`].find((path) => statSync(path, { throwIfNoEntry: false })?.isFile());
  } catch {
    return undefined;
  }
};

const send = (req: IncomingMessage, res: ServerResponse, reply: Reply, injectHead?: string): void => {
  let body = reply.body;
  if (injectHead !== undefined && reply.type.startsWith("text/html")) {
    body = Buffer.from(body.toString().replace(headPattern, (tag) => tag + injectHead));
  }
  const headers: Record<string, string | number> = { "Content-Type": reply.type, ...reply.headers };
  if (textType.test(reply.type) && /\bgzip\b/.test(req.headers["accept-encoding"] ?? "")) {
    body = gzipSync(body);
    headers["Content-Encoding"] = "gzip";
    headers.Vary = "Accept-Encoding";
  }
  headers["Content-Length"] = body.length;
  res.writeHead(reply.status, headers);
  res.end(req.method === "HEAD" ? undefined : body);
};

type Got = { status: number; headers: IncomingMessage["headers"]; body: Buffer };

const get = (port: number, path: string, method = "GET", headers: Record<string, string> = {}): Promise<Got> =>
  new Promise((done, fail) => {
    const req = request({ host: "127.0.0.1", port, path, method, headers }, (res) => {
      const chunks: Buffer[] = [];
      res.on("data", (chunk: Buffer) => chunks.push(chunk));
      res.on("end", () => done({ status: res.statusCode ?? 0, headers: res.headers, body: Buffer.concat(chunks) }));
    });
    req.on("error", fail);
    req.end();
  });

const fixtureHtml = "<!doctype html><html><head><title>t</title></head><body>home</body></html>";
const injectedScript = "<script>x()</script>";

const selfTest = async (): Promise<void> => {
  const root = mkdtempSync(join(tmpdir(), "serve-out-"));
  const servers: Server[] = [];
  try {
    const out = join(root, "out");
    mkdirSync(out);
    writeFileSync(join(out, "index.html"), fixtureHtml);
    writeFileSync(join(out, "404.html"), "<html><head></head><body>NOT-FOUND-PAGE</body></html>");
    writeFileSync(join(out, "a.css"), "body{color:red}");
    writeFileSync(join(out, "f.woff2"), "font-bytes");
    writeFileSync(join(out, "x.pdf"), "%PDF-1.4");
    writeFileSync(join(root, "secret.txt"), "TOP-SECRET");
    const start = async (injectHead?: string): Promise<number> => {
      const server = await serveOut({ outDir: out, base: "/site", port: 0, injectHead });
      servers.push(server);
      const address = server.address();
      assert(address !== null && typeof address === "object");
      assert.strictEqual(address.address, "127.0.0.1");
      return address.port;
    };
    const port = await start();
    await assert.rejects(serveOut({ outDir: out, base: "/site/", port: 0 }), /env: base/);
    await checkMapping(port);
    await checkEscapes(port);
    await checkGzip(port);
    await checkInject(await start(injectedScript));
    console.log("self-test: ok");
  } finally {
    servers.forEach((server) => {
      server.close();
      server.closeAllConnections();
    });
    rmSync(root, { recursive: true });
  }
};

const checkMapping = async (port: number): Promise<void> => {
  const home = await get(port, "/site/");
  assert(home.status === 200 && String(home.headers["content-type"]).startsWith("text/html"));
  const head = await get(port, "/site/", "HEAD");
  assert(head.status === 200 && head.body.length === 0);
  const bare = await get(port, "/site");
  assert(bare.status === 301 && bare.headers.location === "/site/");
  const missing = await get(port, "/site/nope");
  assert(missing.status === 404 && missing.body.toString().includes("NOT-FOUND-PAGE"));
  const outside = await get(port, "/other/x");
  assert(outside.status === 404 && outside.body.toString() === "outside /site");
  assert.strictEqual((await get(port, "/site/", "POST")).status, 405);
  console.log("self-test: mapping, redirect, 404, outside-base and 405 are right");
};

const checkEscapes = async (port: number): Promise<void> => {
  const paths = ["/site/%2e%2e/secret.txt", "/site/..%2fsecret.txt", "/site/../secret.txt", `/site/${"a".repeat(300)}`];
  for (const path of paths) {
    const escaped = await get(port, path);
    assert(escaped.status === 404 && !escaped.body.toString().includes("TOP-SECRET"), path);
  }
  assert.strictEqual((await get(port, "/site/")).status, 200);
  console.log("self-test: path escapes and over-long names are 404 and the server stays up");
};

const checkGzip = async (port: number): Promise<void> => {
  const gz = { "Accept-Encoding": "gzip" };
  const css = await get(port, "/site/a.css", "GET", gz);
  assert(css.headers["content-encoding"] === "gzip" && gunzipSync(css.body).toString() === "body{color:red}");
  const page = await get(port, "/site/", "GET", gz);
  assert(page.headers["content-encoding"] === "gzip" && gunzipSync(page.body).toString() === fixtureHtml);
  for (const path of ["/site/f.woff2", "/site/x.pdf"]) {
    assert((await get(port, path, "GET", gz)).headers["content-encoding"] === undefined, path);
  }
  console.log("self-test: text is gzipped, fonts and pdf are not");
};

const checkInject = async (port: number): Promise<void> => {
  for (const path of ["/site/", "/site/nope"]) {
    const page = (await get(port, path)).body.toString();
    assert(page.includes(`<head>${injectedScript}`) && page.split(injectedScript).length === 2, path);
  }
  assert(!(await get(port, "/site/a.css")).body.toString().includes(injectedScript));
  console.log("self-test: injected head script appears once in html and in the 404 body only");
};

if (import.meta.main) {
  main().catch((error: unknown) => {
    console.log(`serve-out: ${error instanceof Error ? error.message : String(error)}`);
    process.exitCode = 1;
  });
}
