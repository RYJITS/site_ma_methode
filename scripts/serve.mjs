import { networkInterfaces } from "node:os";
import { createStaticServer } from "./static-server.mjs";

const args = parseArgs(process.argv.slice(2));
let port = normalizePort(args.port ?? process.env.PORT ?? 4177);
const host = String(args.host || process.env.HOST || (process.env.NODE_ENV === "production" ? "0.0.0.0" : "127.0.0.1"));
const strictPort = Boolean(args.strictPort || process.env.STRICT_PORT === "true" || process.env.STRICT_PORT === "1");
const bandwidthKbps = normalizeNetworkValue(args.kbps ?? process.env.THROTTLE_KBPS);
const latencyMs = normalizeNetworkValue(args.latency ?? process.env.THROTTLE_LATENCY_MS);
const maxPortAttempts = 20;
let portAttempts = 0;

const server = createStaticServer({
  isProduction: process.env.NODE_ENV === "production",
  bandwidthKbps,
  latencyMs
});

server.on("error", (error) => {
  if (error.code !== "EADDRINUSE") {
    console.error("Le serveur local a rencontre une erreur.", error);
    process.exitCode = 1;
    return;
  }

  if (!strictPort && portAttempts < maxPortAttempts) {
    const busyPort = port;
    port += 1;
    portAttempts += 1;
    console.warn(`Port ${busyPort} deja utilise, essai sur ${port}.`);
    server.listen(port, host);
    return;
  }

  console.error(`Port ${port} deja utilise sur ${host}.`);
  console.error(`Site possiblement deja lance: http://127.0.0.1:${port}`);
  console.error(`Autre port: npm run dev -- --port ${port + 1}`);
  process.exitCode = 1;
});

server.listen(port, host, () => {
  const address = server.address();
  const activePort = typeof address === "object" && address ? address.port : port;
  console.log(`Site Ma Methode: http://127.0.0.1:${activePort}`);
  if (bandwidthKbps > 0 || latencyMs > 0) {
    console.log(`Simulation reseau: ${bandwidthKbps || "sans limite"} kbps, latence ${latencyMs} ms par requete.`);
  }
  if (host === "0.0.0.0" || host === "::") {
    getLanAddresses().forEach((ipAddress) => {
      console.log(`iPhone / Wi-Fi local: http://${ipAddress}:${activePort}`);
    });
  }
});

function normalizePort(value) {
  const parsed = Number(value);
  if (!Number.isInteger(parsed) || parsed < 0 || parsed > 65535) return 4177;
  return parsed;
}

function normalizeNetworkValue(value) {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 0;
}

function parseArgs(values) {
  const result = {};
  for (let index = 0; index < values.length; index += 1) {
    const value = values[index];
    if (value === "--strictPort" || value === "--strict-port") result.strictPort = true;
    if (value === "--host") result.host = values[index + 1];
    if (value === "--port") result.port = values[index + 1];
    if (value === "--kbps") result.kbps = values[index + 1];
    if (value === "--latency") result.latency = values[index + 1];
    if (value.startsWith("--host=")) result.host = value.slice("--host=".length);
    if (value.startsWith("--port=")) result.port = value.slice("--port=".length);
    if (value.startsWith("--kbps=")) result.kbps = value.slice("--kbps=".length);
    if (value.startsWith("--latency=")) result.latency = value.slice("--latency=".length);
  }
  return result;
}

function getLanAddresses() {
  return Object.values(networkInterfaces())
    .flat()
    .filter((entry) => entry && entry.family === "IPv4" && !entry.internal)
    .map((entry) => entry.address);
}
