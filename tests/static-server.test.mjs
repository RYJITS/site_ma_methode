import assert from "node:assert/strict";
import { request } from "node:http";
import { after, before, test } from "node:test";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { gunzipSync } from "node:zlib";
import { acceptsGzip, createStaticServer, normalizeNetworkProfile, parseByteRange, resolvePublicRequest } from "../scripts/static-server.mjs";

const projectRoot = resolve(fileURLToPath(new URL("..", import.meta.url)));
const server = createStaticServer({ root: projectRoot });
let port = 0;

before(async () => {
  await new Promise((resolvePromise, reject) => {
    server.once("error", reject);
    server.listen(0, "127.0.0.1", resolvePromise);
  });
  const address = server.address();
  port = typeof address === "object" && address ? address.port : 0;
});

after(async () => {
  await new Promise((resolvePromise) => server.close(resolvePromise));
});

test("sert les fichiers publics necessaires", async () => {
  const home = await httpRequest("/");
  const script = await httpRequest("/src/main.js", { method: "HEAD" });
  const image = await httpRequest("/public/images/skyia.webp", { method: "HEAD" });

  assert.equal(home.statusCode, 200);
  assert.match(home.headers["content-type"], /^text\/html/);
  assert.equal(script.statusCode, 200);
  assert.equal(image.statusCode, 200);
});

test("refuse les fichiers internes et les traversals", async () => {
  const paths = [
    "/package.json",
    "/.git/config",
    "/.project-orchestrator.json",
    "/README.md",
    "/sauvegarde.zip",
    "/%2e%2e/package.json",
    "/%252e%252e/package.json"
  ];

  for (const path of paths) {
    const response = await httpRequest(path, { method: "HEAD" });
    assert.ok([403, 404].includes(response.statusCode), `${path} retourne ${response.statusCode}`);
  }
});

test("retourne 400 pour une URI malformee et reste vivant", async () => {
  const malformed = await httpRequest("/%E0%A4%A", { method: "HEAD" });
  const health = await httpRequest("/", { method: "HEAD" });

  assert.equal(malformed.statusCode, 400);
  assert.equal(health.statusCode, 200);
});

test("retourne 416 pour une plage invalide et reste vivant", async () => {
  const invalid = await httpRequest("/index.html", {
    method: "HEAD",
    headers: { Range: "bytes=999999999-" }
  });
  const health = await httpRequest("/", { method: "HEAD" });

  assert.equal(invalid.statusCode, 416);
  assert.match(invalid.headers["content-range"], /^bytes \*\/\d+$/);
  assert.equal(health.statusCode, 200);
});

test("reste disponible apres 100 requetes invalides", async () => {
  const responses = await Promise.all(Array.from({ length: 100 }, (_, index) => (
    index % 2 === 0
      ? httpRequest("/%E0%A4%A", { method: "HEAD" })
      : httpRequest("/index.html", {
          method: "HEAD",
          headers: { Range: `bytes=${Number.MAX_SAFE_INTEGER - index}-` }
        })
  )));
  const health = await httpRequest("/", { method: "HEAD" });

  assert.equal(responses.filter(({ statusCode }) => statusCode === 400).length, 50);
  assert.equal(responses.filter(({ statusCode }) => statusCode === 416).length, 50);
  assert.equal(health.statusCode, 200);
});

test("sert les plages valides avec les bons en-tetes", async () => {
  const response = await httpRequest("/index.html", {
    headers: { Range: "bytes=0-9" }
  });

  assert.equal(response.statusCode, 206);
  assert.equal(response.body.length, 10);
  assert.match(response.headers["content-range"], /^bytes 0-9\/\d+$/);
});

test("compresse les fichiers texte sans modifier leur contenu", async () => {
  const plain = await httpRequest("/src/main.js");
  const compressed = await httpRequest("/src/main.js", {
    headers: { "Accept-Encoding": "gzip" }
  });

  assert.equal(compressed.statusCode, 200);
  assert.equal(compressed.headers["content-encoding"], "gzip");
  assert.equal(compressed.headers.vary, "Accept-Encoding");
  assert.equal(compressed.headers["content-length"], undefined);
  assert.deepEqual(gunzipSync(compressed.body), plain.body);
  assert.ok(compressed.body.length < plain.body.length * 0.4);
});

test("ne compresse jamais une plage ni une video", async () => {
  const partial = await httpRequest("/src/main.js", {
    headers: {
      "Accept-Encoding": "gzip",
      Range: "bytes=0-31"
    }
  });
  const video = await httpRequest("/public/generated/videos/storyboard-7-scenes-v4-compress-block/kling-assembled/storyboard-kling-12-clips-900p-scroll-test-20260903.mp4", {
    method: "HEAD",
    headers: { "Accept-Encoding": "gzip" }
  });

  assert.equal(partial.statusCode, 206);
  assert.equal(partial.headers["content-encoding"], undefined);
  assert.equal(partial.body.length, 32);
  assert.equal(video.statusCode, 200);
  assert.equal(video.headers["content-encoding"], undefined);
});

test("refuse les methodes non prevues", async () => {
  const response = await httpRequest("/", { method: "POST" });
  assert.equal(response.statusCode, 405);
  assert.equal(response.headers.allow, "GET, HEAD");
});

test("parse les plages simples et suffixes", () => {
  assert.deepEqual(parseByteRange("bytes=2-5", 10), { start: 2, end: 5 });
  assert.deepEqual(parseByteRange("bytes=-3", 10), { start: 7, end: 9 });
  assert.equal(parseByteRange("bytes=10-", 10), null);
  assert.equal(parseByteRange("bytes=5-2", 10), null);
  assert.equal(parseByteRange("bytes=0-1,4-5", 10), null);
});

test("le resolveur applique la liste blanche", () => {
  assert.equal(resolvePublicRequest(projectRoot, "/src/main.js").ok, true);
  assert.equal(resolvePublicRequest(projectRoot, "/public/images/skyia.webp").ok, true);
  assert.equal(resolvePublicRequest(projectRoot, "/api/contact.php").ok, false);
  assert.equal(resolvePublicRequest(projectRoot, "/package.json").ok, false);
});

test("le profil reseau local est borne et desactivable", () => {
  assert.deepEqual(normalizeNetworkProfile({}), {
    enabled: false,
    bandwidthKbps: 0,
    latencyMs: 0,
    bytesPerSecond: 0
  });
  assert.deepEqual(normalizeNetworkProfile({ bandwidthKbps: 800, latencyMs: 120 }), {
    enabled: true,
    bandwidthKbps: 800,
    latencyMs: 120,
    bytesPerSecond: 100000
  });
});

test("respecte les preferences Accept-Encoding", () => {
  assert.equal(acceptsGzip("br, gzip"), true);
  assert.equal(acceptsGzip("gzip;q=0"), false);
  assert.equal(acceptsGzip("br, *;q=0.5"), true);
  assert.equal(acceptsGzip("gzip;q=0, *;q=1"), false);
  assert.equal(acceptsGzip("identity"), false);
});

test("le serveur peut simuler une connexion lente sans casser les plages video", async () => {
  const slowServer = createStaticServer({
    root: projectRoot,
    bandwidthKbps: 800,
    latencyMs: 20
  });
  await new Promise((resolvePromise, reject) => {
    slowServer.once("error", reject);
    slowServer.listen(0, "127.0.0.1", resolvePromise);
  });
  const address = slowServer.address();
  const slowPort = typeof address === "object" && address ? address.port : 0;
  const startedAt = Date.now();
  const response = await httpRequest("/index.html", {
    port: slowPort,
    headers: { Range: "bytes=0-31" }
  });
  const elapsed = Date.now() - startedAt;
  await new Promise((resolvePromise) => slowServer.close(resolvePromise));

  assert.equal(response.statusCode, 206);
  assert.equal(response.body.length, 32);
  assert.equal(response.headers["x-local-network-simulation"], "800kbps; latency=20ms");
  assert.ok(elapsed >= 15, `La latence mesuree est trop courte: ${elapsed} ms`);
});

function httpRequest(path, options = {}) {
  return new Promise((resolvePromise, reject) => {
    const req = request({
      host: "127.0.0.1",
      port: options.port || port,
      path,
      method: options.method || "GET",
      headers: options.headers || {}
    }, (response) => {
      const chunks = [];
      response.on("data", (chunk) => chunks.push(chunk));
      response.on("end", () => {
        resolvePromise({
          statusCode: response.statusCode,
          headers: response.headers,
          body: Buffer.concat(chunks)
        });
      });
    });
    req.on("error", reject);
    req.end();
  });
}
