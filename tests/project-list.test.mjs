import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { test } from "node:test";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = resolve(fileURLToPath(new URL("..", import.meta.url)));

test("la carte desktop propose les modes Carte et Liste", async () => {
  const html = await readFile(resolve(projectRoot, "index.html"), "utf8");
  assert.match(html, /id="project-grid-view-map"[^>]+aria-pressed="true"/);
  assert.match(html, /id="project-grid-view-list"[^>]+aria-pressed="false"/);
  assert.match(html, /role="group" aria-label="Mode d'affichage des projets"/);
});

test("le changement de vue conserve la carte et reutilise la liste mobile", async () => {
  const main = await readFile(resolve(projectRoot, "src/main.js"), "utf8");
  assert.match(main, /function setProjectGridView/);
  assert.match(main, /projectGridViewMode/);
  assert.match(main, /projectGridViewMap\?\.addEventListener/);
  assert.match(main, /projectGridViewList\?\.addEventListener/);
  assert.match(main, /projectMobilePage\?\.focus/);
});

test("la vue Liste desktop est responsive et masque seulement la scene spatiale", async () => {
  const [criticalCss, projectCss] = await Promise.all([
    readFile(resolve(projectRoot, "src/styles.css"), "utf8"),
    readFile(resolve(projectRoot, "src/project-grid.css"), "utf8")
  ]);
  const css = `${criticalCss}\n${projectCss}`;
  assert.match(css, /\.project-grid-overlay\.is-list-view \.project-grid-stage/);
  assert.match(css, /\.project-grid-overlay\.is-list-view \.project-mobile-page/);
  assert.match(css, /repeat\(auto-fit, minmax\(min\(100%, 13rem\), 1fr\)\)/);
  assert.match(css, /\.project-grid-view-toggle \{\s*display: none;/);
});

test("la vue Liste desktop reprend les couleurs de titres de la vue mobile", async () => {
  const projectCss = await readFile(resolve(projectRoot, "src/project-grid.css"), "utf8");
  assert.match(projectCss, /is-list-view \.project-mobile-section-head h3 \{\s*margin: 0;\s*color: rgba\(57, 189, 248, 0\.24\)/);
  assert.match(projectCss, /is-list-view \.project-mobile-section-ai \.project-mobile-section-head h3 \{\s*color: rgba\(255, 255, 255, 0\.18\)/);
  assert.match(projectCss, /is-list-view \.project-mobile-section-design \.project-mobile-section-head h3 \{\s*color: rgba\(255, 193, 90, 0\.22\)/);
});
