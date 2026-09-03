import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { test } from "node:test";
import { fileURLToPath } from "node:url";

const projectRoot = resolve(fileURLToPath(new URL("..", import.meta.url)));
const sourceFiles = [
  "index.html",
  "sw.js",
  "src/styles.css",
  "src/project-grid.css",
  "src/main.js",
  "src/contact-panel.js",
  "src/contact-scene.js",
  "src/project-detail.js",
  "src/project-registry.js"
];
const publicAssetPattern = /(?:\.\.\/|\.\/|\/)?public\/[A-Za-z0-9_./@%+~=:-]+?\.(?:avif|gif|jpe?g|mp4|png|svg|webm|webp|woff2?)(?:\?[A-Za-z0-9_./@%+&=:-]+)?/gi;

test("toutes les ressources publiques referencees existent dans la copie isolee", async () => {
  const references = new Set();

  for (const sourceFile of sourceFiles) {
    const content = await readFile(resolve(projectRoot, sourceFile), "utf8");
    for (const match of content.matchAll(publicAssetPattern)) {
      const normalized = match[0]
        .replace(/^\.\.\//, "")
        .replace(/^\.\//, "")
        .replace(/^\//, "")
        .split("?", 1)[0];
      references.add(normalized);
    }
  }

  const missing = [];
  for (const reference of [...references].sort()) {
    try {
      await access(resolve(projectRoot, reference));
    } catch {
      missing.push(reference);
    }
  }

  assert.deepEqual(missing, [], `Ressources absentes:\n${missing.join("\n")}`);
  assert.ok(references.size >= 40, `Seulement ${references.size} ressources detectees`);
});
