import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { test } from "node:test";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { runInNewContext } from "node:vm";
import { orchestratorProjectCards } from "../src/project-registry.js";

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
  assert.match(main, /function getMobileProjectSections/);
  assert.doesNotMatch(main, /label: "Projets à la une"/);
});

test("la liste classe chaque projet une seule fois dans sa categorie", async () => {
  const main = await readFile(resolve(projectRoot, "src/main.js"), "utf8");
  const grouping = main.match(/function getMobileProjectSections\(\) \{[\s\S]*?\n\}/)?.[0];
  const labels = main.match(/function getProjectCategoryLabel\(category\) \{[\s\S]*?\n\}/)?.[0];
  const categoryOrder = JSON.parse(main.match(/const PROJECT_MOBILE_CATEGORY_ORDER = (\[[^;]+\]);/)?.[1] || "[]");
  assert.ok(grouping && labels, "Fonctions de classement de la liste manquantes.");
  assert.deepEqual(categoryOrder, ["tools", "ai", "design"]);
  const sections = runInNewContext(`${labels}\n${grouping}\ngetMobileProjectSections()`, {
    projectCards: orchestratorProjectCards,
    PROJECT_MOBILE_CATEGORY_ORDER: categoryOrder
  });
  const listed = Array.from(sections).flatMap((section) => Array.from(section.projects));
  assert.deepEqual(listed.map(({ project }) => project.id).sort(), orchestratorProjectCards.map((project) => project.id).sort());
  assert.equal(new Set(listed.map(({ project }) => project.id)).size, listed.length);
  assert.ok(sections.every((section) => section.id !== "featured"));
  for (const section of sections) {
    assert.ok(section.projects.every(({ project, index }) => (project.category || "tools") === section.id && orchestratorProjectCards[index] === project));
    assert.deepEqual(Array.from(section.projects, ({ project }) => project.id), orchestratorProjectCards.filter((project) => (project.category || "tools") === section.id).map((project) => project.id));
  }
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
  assert.match(projectCss, /is-list-view \.project-mobile-card strong \{[\s\S]*font-size: clamp\(0\.85rem, 1\.275vw, 1\.088rem\)/);
});
