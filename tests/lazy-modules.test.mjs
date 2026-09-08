import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { test } from "node:test";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { readJsonResponse } from "../src/contact-panel.js";
import { renderProjectDetail } from "../src/project-detail.js";

const projectRoot = resolve(fileURLToPath(new URL("..", import.meta.url)));

test("Contact et le rendu detail projet restent hors du module initial", async () => {
  const [main, contactPanel, projectDetail] = await Promise.all([
    readFile(resolve(projectRoot, "src/main.js"), "utf8"),
    readFile(resolve(projectRoot, "src/contact-panel.js"), "utf8"),
    readFile(resolve(projectRoot, "src/project-detail.js"), "utf8")
  ]);

  assert.match(main, /import\(CONTACT_PANEL_MODULE\)/);
  assert.match(main, /import\(PROJECT_DETAIL_MODULE\)/);
  assert.doesNotMatch(main, /from "\.\/contact-panel\.js/);
  assert.doesNotMatch(main, /from "\.\/project-detail\.js/);
  assert.doesNotMatch(main, /function bindContactForm/);
  assert.doesNotMatch(main, /function renderProjectDetail/);
  assert.match(contactPanel, /export function createContactPanelController/);
  assert.match(projectDetail, /export function renderProjectDetail/);
});

test("le cache precharge les versions CSS et JavaScript referencees par la page", async () => {
  const [html, worker, main] = await Promise.all([
    readFile(resolve(projectRoot, "index.html"), "utf8"),
    readFile(resolve(projectRoot, "sw.js"), "utf8"),
    readFile(resolve(projectRoot, "src/main.js"), "utf8")
  ]);

  const precache = JSON.parse(worker.match(/const PRECACHE_URLS = (\[[\s\S]*?\]);/)?.[1] || "[]");
  for (const path of ["src/styles.css", "src/main.js"]) {
    const assetUrl = [...html.matchAll(/(?:href|src)="([^"]+)"/g)]
      .map((match) => match[1]).find((url) => url.startsWith(`${path}?v=`));
    assert.ok(assetUrl, `Version publique manquante pour ${path}`);
    assert.ok(precache.includes(`./${assetUrl}`), `Version precache incoherente pour ${path}: ${assetUrl}`);
  }
  const workerVersion = main.match(/\.register\("\.\/sw\.js\?v=([^"]+)"\)/)?.[1];
  const cacheName = worker.match(/const CACHE_NAME = "([^"]+)";/)?.[1];
  assert.ok(workerVersion, "Le service worker doit etre versionne.");
  assert.ok(cacheName?.endsWith(workerVersion), "Le cache doit correspondre a la version du service worker.");
});

test("les styles Projet ne bloquent pas le premier affichage", async () => {
  const [html, main, projectCss] = await Promise.all([
    readFile(resolve(projectRoot, "index.html"), "utf8"),
    readFile(resolve(projectRoot, "src/main.js"), "utf8"),
    readFile(resolve(projectRoot, "src/project-grid.css"), "utf8")
  ]);

  assert.doesNotMatch(html, /project-grid\.css/);
  assert.match(main, /PROJECT_GRID_STYLESHEET/);
  assert.match(main, /function ensureProjectGridStyles/);
  assert.match(main, /insertBefore\(link, criticalStyles \|\| null\)/);
  assert.match(main, /await Promise\.all\(\[\s*ensureProjectGridStyles\(\)/);
  assert.match(main, /pointerover[\s\S]+?focusin[\s\S]+?touchstart/);
  assert.match(projectCss, /\.project-grid-overlay/);
  assert.match(main, /loading="\$\{priority \? "eager" : "lazy"\}"/);
  assert.match(main, /fetchpriority="\$\{index < 3 \? "high" : "auto"\}"/);
});

test("le rendu differe conserve les liens sur liste blanche", () => {
  const html = renderProjectDetail({
    name: "Projet test",
    category: "design",
    comment: "Test",
    image: "/public/test.webp",
    githubUrl: "javascript:alert(1)",
    hostingerUrl: "https://example.com/app",
    stack: [],
    functions: [],
    progress: [],
    screenshots: []
  });

  assert.match(html, /https:\/\/example\.com\/app/);
  assert.doesNotMatch(html, /javascript:/);
});

test("le parseur Contact refuse une reponse non JSON", async () => {
  const payload = await readJsonResponse({
    headers: { get: () => "text/html" }
  });
  assert.deepEqual(payload, {
    ok: false,
    message: "Envoi indisponible. Réessayez dans un instant."
  });
});
