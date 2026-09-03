import { access, lstat, readdir } from "node:fs/promises";
import { dirname, extname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const requiredFiles = [
  ".htaccess",
  "index.html",
  "sw.js",
  "robots.txt",
  "sitemap.xml",
  "llms.txt",
  "google7cc8c3a317a10d93.html",
  "a17f4cc7705b6a9ba0da5ac23a539cba28655697f235bb33c0441bac7ca900bf.txt",
  "api/contact.php"
];
const publicDirectories = ["public", "src"];
const forbiddenNames = new Set([".env", ".env.local", ".git", ".svn", "node_modules"]);
const forbiddenExtensions = new Set([".bak", ".key", ".log", ".map", ".pem", ".pfx", ".sql", ".zip"]);
const publicFiles = [...requiredFiles];
const problems = [];

for (const file of requiredFiles) {
  try {
    await access(join(projectRoot, file));
  } catch {
    problems.push(`fichier requis absent: ${file}`);
  }
}

for (const directory of publicDirectories) {
  await collectPublicFiles(join(projectRoot, directory));
}

let totalBytes = 0;
for (const file of publicFiles) {
  const absolutePath = join(projectRoot, file);
  const info = await lstat(absolutePath).catch(() => null);
  if (!info) continue;
  if (info.isSymbolicLink()) {
    problems.push(`lien symbolique interdit dans la surface publique: ${file}`);
    continue;
  }
  if (!info.isFile()) continue;
  totalBytes += info.size;

  const parts = file.split(/[\\/]/);
  if (parts.some((part) => forbiddenNames.has(part.toLowerCase()))) {
    problems.push(`nom sensible dans la surface publique: ${file}`);
  }
  if (forbiddenExtensions.has(extname(file).toLowerCase())) {
    problems.push(`extension sensible dans la surface publique: ${file}`);
  }
}

if (problems.length) {
  console.error("Surface de deploiement refusee:");
  problems.forEach((problem) => console.error(`- ${problem}`));
  process.exitCode = 1;
} else {
  console.log(`Surface de deploiement validee: ${publicFiles.length} fichiers, ${formatBytes(totalBytes)}.`);
  console.log("Racine limitee aux fichiers publics requis, a api/contact.php, public/ et src/.");
}

async function collectPublicFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  for (const entry of entries) {
    const absolutePath = join(directory, entry.name);
    const publicPath = relative(projectRoot, absolutePath).replaceAll("\\", "/");
    if (entry.isDirectory()) await collectPublicFiles(absolutePath);
    else publicFiles.push(publicPath);
  }
}

function formatBytes(bytes) {
  if (bytes < 1024) return `${bytes} o`;
  const units = ["Ko", "Mo", "Go"];
  let value = bytes / 1024;
  let unit = units[0];
  for (let index = 1; value >= 1024 && index < units.length; index += 1) {
    value /= 1024;
    unit = units[index];
  }
  return `${value.toFixed(1)} ${unit}`;
}
