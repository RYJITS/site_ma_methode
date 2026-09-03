import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { test } from "node:test";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { orchestratorProjectCards } from "../src/project-registry.js";

const projectRoot = resolve(fileURLToPath(new URL("..", import.meta.url)));
const technicalKeys = new Set([
  "id", "category", "image", "url", "githubUrl", "hostingerUrl", "ficheUrl", "localPath",
  "stack", "screenshots", "exposure", "global", "security", "functionality", "publication",
  "securityStatus", "screenshotStatus", "maMethode", "contentStatus"
]);
const missingAccent = /\b(?:Etat|Securite|Methode|pret|cote|plutot|alimentee|eviter|synchronises|implementation|planifie|prepares|detection|organises|verifier|execution|planifiee|detaillee|controlee|optimisees|chaine|serie|schemas|validee|perimetre|isolee|criteres|capacite|automatise|detectes|decoupage|ages|inappropriees|adaptee|generer|identite|creation|deuxieme|lumiere|definition|proposes|avancees|repoussees|apres|prevoir|publiee|versionnee|demarrage|utilisees|donnees|systeme|resultat|reel|idee|memoire|competences|decisions|defaut|sourcee|specifications|inspiree|verificables|structurees|integrations|definissent|partagees|centralisees|reellement|privees|indexee)\b/;

test("les 18 fiches du registre actuel sont synchronisees", () => {
  assert.equal(orchestratorProjectCards.length, 18);
  assert.ok(orchestratorProjectCards.some((project) => project.id === "03-agent-design"));
  assert.equal(orchestratorProjectCards.find((project) => project.id === "01-site-ma-methode")?.url, "https://c2rdesign.com/");
});

test("les textes des fiches conservent les accents hors champs techniques", () => {
  const failures = [];
  walk(orchestratorProjectCards, "cards", "", failures);
  assert.deepEqual(failures, []);
});

test("les libelles principaux et SEO utilisent les accents et le domaine public", async () => {
  const [html, main, contact, detail] = await Promise.all([
    readFile(resolve(projectRoot, "index.html"), "utf8"),
    readFile(resolve(projectRoot, "src/main.js"), "utf8"),
    readFile(resolve(projectRoot, "src/contact-panel.js"), "utf8"),
    readFile(resolve(projectRoot, "src/project-detail.js"), "utf8")
  ]);
  assert.match(html, /rel="canonical" href="https:\/\/c2rdesign\.com\/"/);
  assert.match(html, /aria-label="Accès directs"/);
  assert.match(html, /aria-label="Contrôle du zoom de la grille"/);
  assert.match(main, /Chaque optimisation doit produire un résultat réel et mesurable/);
  assert.match(contact, /Message reçu/);
  assert.match(detail, /À quoi il sert/);
  assert.match(detail, /Détails GitHub/);
  assert.doesNotMatch(detail, /Details GitHub/);
});

function walk(value, path, key, failures) {
  if (typeof value === "string") {
    if (technicalKeys.has(key)) return;
    const match = value.match(missingAccent);
    if (match) failures.push(`${path}: ${match[0]}`);
    return;
  }
  if (Array.isArray(value)) {
    value.forEach((entry, index) => walk(entry, `${path}.${index}`, key, failures));
    return;
  }
  if (!value || typeof value !== "object") return;
  Object.entries(value).forEach(([childKey, child]) => walk(child, `${path}.${childKey}`, childKey, failures));
}
