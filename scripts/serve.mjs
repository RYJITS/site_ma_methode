import { createServer } from "node:http";
import { createReadStream } from "node:fs";
import { readFile, stat } from "node:fs/promises";
import { extname, join, normalize, resolve } from "node:path";
import { networkInterfaces } from "node:os";

const root = resolve(new URL("..", import.meta.url).pathname.slice(1));
const args = parseArgs(process.argv.slice(2));
const port = Number(args.port || process.env.PORT || 4177);
const host = String(args.host || process.env.HOST || "127.0.0.1");
const isProduction = process.env.NODE_ENV === "production";

const mime = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".svg": "image/svg+xml",
  ".mp4": "video/mp4"
};

createServer(async (request, response) => {
  const url = new URL(request.url || "/", `http://127.0.0.1:${port}`);
  const requested = url.pathname === "/" ? "/index.html" : decodeURIComponent(url.pathname);
  const filePath = normalize(join(root, requested));

  if (!filePath.startsWith(root)) {
    response.writeHead(403);
    response.end("Forbidden");
    return;
  }

  try {
    if (extname(filePath) === ".mp4") {
      const fileStat = await stat(filePath);
      const range = request.headers.range;
      const cacheControl = getCacheControl(filePath);

      if (range) {
        const match = /bytes=(\d+)-(\d*)/.exec(range);
        const start = match ? Number(match[1]) : 0;
        const end = match && match[2] ? Number(match[2]) : fileStat.size - 1;
        const safeEnd = Math.min(end, fileStat.size - 1);
        const chunkSize = safeEnd - start + 1;

        response.writeHead(206, {
          "Content-Type": "video/mp4",
          "Accept-Ranges": "bytes",
          "Content-Range": `bytes ${start}-${safeEnd}/${fileStat.size}`,
          "Content-Length": chunkSize,
          "Cache-Control": cacheControl
        });
        createReadStream(filePath, { start, end: safeEnd }).pipe(response);
        return;
      }

      response.writeHead(200, {
        "Content-Type": "video/mp4",
        "Accept-Ranges": "bytes",
        "Content-Length": fileStat.size,
        "Cache-Control": cacheControl
      });
      createReadStream(filePath).pipe(response);
      return;
    }

    const body = await readFile(filePath);
    response.writeHead(200, {
      "Content-Type": mime[extname(filePath)] || "application/octet-stream",
      "Cache-Control": getCacheControl(filePath)
    });
    response.end(body);
  } catch {
    response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    response.end("Not found");
  }
}).listen(port, host, () => {
  console.log(`AI Video WebGL clean site: http://127.0.0.1:${port}`);
  if (host === "0.0.0.0" || host === "::") {
    getLanAddresses().forEach((address) => {
      console.log(`iPhone / Wi-Fi local: http://${address}:${port}`);
    });
  }
});

function getCacheControl(filePath) {
  if (!isProduction) return "no-store";
  if (extname(filePath) === ".html") return "no-cache";
  return "public, max-age=31536000, immutable";
}

function parseArgs(values) {
  const result = {};
  for (let index = 0; index < values.length; index += 1) {
    const value = values[index];
    if (value === "--host") result.host = values[index + 1];
    if (value === "--port") result.port = values[index + 1];
  }
  return result;
}

function getLanAddresses() {
  return Object.values(networkInterfaces())
    .flat()
    .filter((entry) => entry && entry.family === "IPv4" && !entry.internal)
    .map((entry) => entry.address);
}
