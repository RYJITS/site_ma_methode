import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { test } from "node:test";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = resolve(fileURLToPath(new URL("..", import.meta.url)));

test("la documentation decrit la stack et les commandes reelles", async () => {
  const [readme, installation, packageJson] = await Promise.all([
    readFile(resolve(projectRoot, "README.md"), "utf8"),
    readFile(resolve(projectRoot, "INSTALLATION_FR.md"), "utf8"),
    readFile(resolve(projectRoot, "package.json"), "utf8")
  ]);
  const packageData = JSON.parse(packageJson);

  assert.match(readme, /Vite n'est pas utilise/);
  assert.match(readme, /127\.0\.0\.1:4177/);
  assert.match(readme, /npm test/);
  assert.match(installation, /DEPLOIEMENT_CHECKLIST_FR\.md/);
  assert.equal(packageData.name, "site-ma-methode");
  assert.equal(packageData.scripts.test, "node --test tests/*.test.mjs");
});

test("les fins de ligne et les fichiers binaires sont declares", async () => {
  const attributes = await readFile(resolve(projectRoot, ".gitattributes"), "utf8");
  assert.match(attributes, /\*\.js text eol=lf/);
  assert.match(attributes, /\*\.php text eol=lf/);
  assert.match(attributes, /\*\.mp4 binary/);
  assert.match(attributes, /\*\.webp binary/);
});

test("la checklist interdit une publication non validee", async () => {
  const checklist = await readFile(resolve(projectRoot, "DEPLOIEMENT_CHECKLIST_FR.md"), "utf8");
  assert.match(checklist, /npm run check/);
  assert.match(checklist, /npm test/);
  assert.match(checklist, /php -l api\/contact\.php/);
  assert.match(checklist, /MCP Hostinger/);
  assert.match(checklist, /retour arriere/);
});
