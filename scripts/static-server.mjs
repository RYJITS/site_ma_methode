import { createServer } from "node:http";
import { createReadStream } from "node:fs";
import { stat } from "node:fs/promises";
import { extname, isAbsolute, relative, resolve } from "node:path";
import { Transform } from "node:stream";
import { fileURLToPath } from "node:url";
import { createGzip } from "node:zlib";

const DEFAULT_ROOT = resolve(fileURLToPath(new URL("..", import.meta.url)));
const PUBLIC_ROOT_FILES = new Set([
  "index.html",
  "sw.js",
  "robots.txt",
  "sitemap.xml",
  "llms.txt",
  "google7cc8c3a317a10d93.html",
  "a17f4cc7705b6a9ba0da5ac23a539cba28655697f235bb33c0441bac7ca900bf.txt"
]);
const PUBLIC_DIRECTORIES = new Set(["public", "src"]);
const COMPRESSIBLE_EXTENSIONS = new Set([".css", ".html", ".js", ".svg", ".txt", ".xml"]);
const MIME_TYPES = new Map([
  [".avif", "image/avif"],
  [".css", "text/css; charset=utf-8"],
  [".gif", "image/gif"],
  [".html", "text/html; charset=utf-8"],
  [".ico", "image/x-icon"],
  [".jpeg", "image/jpeg"],
  [".jpg", "image/jpeg"],
  [".js", "text/javascript; charset=utf-8"],
  [".json", "application/json; charset=utf-8"],
  [".mp4", "video/mp4"],
  [".png", "image/png"],
  [".svg", "image/svg+xml"],
  [".txt", "text/plain; charset=utf-8"],
  [".webm", "video/webm"],
  [".webp", "image/webp"],
  [".woff2", "font/woff2"],
  [".xml", "application/xml; charset=utf-8"]
]);

export function createStaticServer(options = {}) {
  const root = resolve(options.root || DEFAULT_ROOT);
  const isProduction = options.isProduction === true;
  const networkProfile = normalizeNetworkProfile(options);

  return createServer((request, response) => {
    handleRequest(request, response, { root, isProduction, networkProfile }).catch((error) => {
      if (response.destroyed || response.writableEnded) return;
      if (response.headersSent) {
        response.destroy(error);
        return;
      }
      sendText(response, 500, "Internal server error");
    });
  });
}

async function handleRequest(request, response, context) {
  applySecurityHeaders(response, context.isProduction);

  if (!["GET", "HEAD"].includes(request.method || "")) {
    response.setHeader("Allow", "GET, HEAD");
    sendText(response, 405, "Method not allowed", request.method === "HEAD");
    return;
  }

  const resolved = resolvePublicRequest(context.root, request.url || "/");
  if (!resolved.ok) {
    sendText(response, resolved.status, resolved.message, request.method === "HEAD");
    return;
  }

  let fileStat;
  try {
    fileStat = await stat(resolved.filePath);
  } catch {
    sendText(response, 404, "Not found", request.method === "HEAD");
    return;
  }

  if (!fileStat.isFile()) {
    sendText(response, 404, "Not found", request.method === "HEAD");
    return;
  }

  const rangeHeader = request.headers.range;
  const byteRange = rangeHeader ? parseByteRange(rangeHeader, fileStat.size) : null;
  if (rangeHeader && !byteRange) {
    response.setHeader("Accept-Ranges", "bytes");
    response.setHeader("Content-Range", `bytes */${fileStat.size}`);
    sendText(response, 416, "Range not satisfiable", request.method === "HEAD");
    return;
  }

  const start = byteRange?.start ?? 0;
  const end = byteRange?.end ?? fileStat.size - 1;
  const status = byteRange ? 206 : 200;
  const length = Math.max(0, end - start + 1);
  const extension = extname(resolved.filePath).toLowerCase();
  const canCompress = !byteRange && length >= 1024 && COMPRESSIBLE_EXTENSIONS.has(extension);
  const useGzip = canCompress && acceptsGzip(request.headers["accept-encoding"]);
  response.statusCode = status;
  response.setHeader("Content-Type", MIME_TYPES.get(extension) || "application/octet-stream");
  response.setHeader("Accept-Ranges", "bytes");
  response.setHeader("Content-Length", String(length));
  response.setHeader("Cache-Control", getCacheControl(resolved.relativePath, context.isProduction));
  if (canCompress) response.setHeader("Vary", "Accept-Encoding");
  if (useGzip) {
    response.setHeader("Content-Encoding", "gzip");
    response.removeHeader("Content-Length");
  }
  if (context.networkProfile.enabled) {
    response.setHeader(
      "X-Local-Network-Simulation",
      `${context.networkProfile.bandwidthKbps}kbps; latency=${context.networkProfile.latencyMs}ms`
    );
  }
  if (byteRange) response.setHeader("Content-Range", `bytes ${start}-${end}/${fileStat.size}`);

  if (request.method === "HEAD" || length === 0) {
    response.end();
    return;
  }

  await streamFile(resolved.filePath, response, { start, end }, context.networkProfile, { gzip: useGzip });
}

export function acceptsGzip(value) {
  const preferences = String(value || "")
    .split(",")
    .map((entry) => {
      const [encoding, ...parameters] = entry.trim().toLowerCase().split(";");
      const quality = parameters
        .map((parameter) => parameter.trim())
        .find((parameter) => parameter.startsWith("q"));
      const parsed = quality ? Number(quality.split("=").at(-1)?.trim()) : 1;
      return {
        encoding,
        quality: Number.isFinite(parsed) ? parsed : 0
      };
    });
  const explicit = preferences.find(({ encoding }) => encoding === "gzip");
  if (explicit) return explicit.quality > 0;
  return Boolean(preferences.find(({ encoding, quality }) => encoding === "*" && quality > 0));
}

export function normalizeNetworkProfile(options = {}) {
  const bandwidthKbps = normalizePositiveNumber(options.bandwidthKbps);
  const latencyMs = normalizePositiveNumber(options.latencyMs);
  return {
    enabled: bandwidthKbps > 0 || latencyMs > 0,
    bandwidthKbps,
    latencyMs,
    bytesPerSecond: bandwidthKbps > 0 ? (bandwidthKbps * 1000) / 8 : 0
  };
}

function normalizePositiveNumber(value) {
  const parsed = Number(value);
  if (!Number.isFinite(parsed) || parsed <= 0) return 0;
  return Math.min(parsed, 1_000_000);
}

export function resolvePublicRequest(root, requestUrl) {
  let url;
  let decodedPath;
  try {
    url = new URL(requestUrl, "http://127.0.0.1");
    decodedPath = decodeURIComponent(url.pathname);
  } catch {
    return { ok: false, status: 400, message: "Bad request" };
  }

  if (decodedPath.includes("\0") || decodedPath.includes("\\")) {
    return { ok: false, status: 400, message: "Bad request" };
  }

  const relativePath = decodedPath === "/"
    ? "index.html"
    : decodedPath.replace(/^\/+/, "");
  const segments = relativePath.split("/");

  if (
    !relativePath
    || segments.some((segment) => !segment || segment === "." || segment === ".." || segment.startsWith("."))
    || !isPublicPath(relativePath, segments)
  ) {
    return { ok: false, status: 404, message: "Not found" };
  }

  const filePath = resolve(root, ...segments);
  const boundary = relative(root, filePath);
  if (!boundary || boundary.startsWith("..") || isAbsolute(boundary)) {
    return { ok: false, status: 403, message: "Forbidden" };
  }

  return {
    ok: true,
    filePath,
    relativePath: segments.join("/")
  };
}

function isPublicPath(relativePath, segments) {
  if (segments.length === 1) return PUBLIC_ROOT_FILES.has(relativePath);
  return PUBLIC_DIRECTORIES.has(segments[0]);
}

export function parseByteRange(value, size) {
  if (!Number.isSafeInteger(size) || size <= 0) return null;
  const match = /^bytes=(\d*)-(\d*)$/.exec(String(value || "").trim());
  if (!match || (!match[1] && !match[2])) return null;

  if (!match[1]) {
    const suffixLength = Number(match[2]);
    if (!Number.isSafeInteger(suffixLength) || suffixLength <= 0) return null;
    const length = Math.min(suffixLength, size);
    return { start: size - length, end: size - 1 };
  }

  const start = Number(match[1]);
  const requestedEnd = match[2] ? Number(match[2]) : size - 1;
  if (
    !Number.isSafeInteger(start)
    || !Number.isSafeInteger(requestedEnd)
    || start < 0
    || start >= size
    || requestedEnd < start
  ) {
    return null;
  }

  return {
    start,
    end: Math.min(requestedEnd, size - 1)
  };
}

function applySecurityHeaders(response, isProduction) {
  response.setHeader("Content-Security-Policy", [
    "default-src 'self'",
    "base-uri 'self'",
    "object-src 'none'",
    "frame-ancestors 'none'",
    "form-action 'self'",
    "script-src 'self'",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "font-src 'self' https://fonts.gstatic.com",
    "img-src 'self' data:",
    "media-src 'self'",
    "connect-src 'self'",
    "worker-src 'self'",
    "upgrade-insecure-requests"
  ].join("; "));
  response.setHeader("X-Content-Type-Options", "nosniff");
  response.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
  response.setHeader("Permissions-Policy", "camera=(), geolocation=(), microphone=(), payment=(), usb=()");
  response.setHeader("X-Frame-Options", "DENY");
  response.setHeader("X-XSS-Protection", "0");
  response.setHeader("X-Permitted-Cross-Domain-Policies", "none");
  if (isProduction) response.setHeader("Strict-Transport-Security", "max-age=31536000");
}

function getCacheControl(relativePath, isProduction) {
  if (!isProduction) return "no-store";
  if (["index.html", "sw.js", "robots.txt", "sitemap.xml", "llms.txt"].includes(relativePath)) {
    return "no-cache";
  }
  return "public, max-age=31536000, immutable";
}

function sendText(response, status, message, headOnly = false) {
  const body = Buffer.from(message, "utf8");
  response.statusCode = status;
  response.setHeader("Content-Type", "text/plain; charset=utf-8");
  response.setHeader("Content-Length", String(body.length));
  if (headOnly) response.end();
  else response.end(body);
}

function streamFile(filePath, response, range, networkProfile, options = {}) {
  return new Promise((resolvePromise) => {
    const highWaterMark = networkProfile.bytesPerSecond > 0 ? 16 * 1024 : undefined;
    const stream = createReadStream(filePath, { ...range, highWaterMark });
    const compressor = options.gzip ? createGzip({ level: 6 }) : null;
    const compressedOutput = compressor ? stream.pipe(compressor) : stream;
    const output = networkProfile.enabled
      ? compressedOutput.pipe(new BandwidthThrottle(networkProfile))
      : compressedOutput;
    const handleError = (error) => {
      if (!response.headersSent) sendText(response, 500, "Internal server error");
      else if (!response.destroyed) response.destroy(error);
      resolvePromise();
    };
    stream.on("error", handleError);
    compressor?.on("error", handleError);
    if (output !== compressedOutput) output.on("error", handleError);
    response.on("close", resolvePromise);
    response.on("finish", resolvePromise);
    output.pipe(response);
  });
}

class BandwidthThrottle extends Transform {
  constructor(profile) {
    super();
    this.bytesPerSecond = profile.bytesPerSecond;
    this.nextChunkAt = Date.now() + profile.latencyMs;
  }

  _transform(chunk, encoding, callback) {
    const now = Date.now();
    const delay = Math.max(0, this.nextChunkAt - now);
    const transferTime = this.bytesPerSecond > 0
      ? (chunk.length / this.bytesPerSecond) * 1000
      : 0;
    this.nextChunkAt = Math.max(now, this.nextChunkAt) + transferTime;
    setTimeout(() => {
      this.push(chunk);
      callback();
    }, delay);
  }
}
