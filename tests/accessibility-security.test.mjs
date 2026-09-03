import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { test } from "node:test";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { getSafeExternalUrl } from "../src/url-security.js";

const projectRoot = resolve(fileURLToPath(new URL("..", import.meta.url)));

test("les dialogues modaux exposent leur semantique", async () => {
  const html = await readFile(resolve(projectRoot, "index.html"), "utf8");
  assert.match(html, /id="project-grid-overlay"[^>]+role="dialog"[^>]+aria-modal="true"/);
  assert.match(html, /id="project-detail-panel"[^>]+role="dialog"[^>]+aria-modal="true"/);
  assert.match(html, /id="contact-panel"[^>]+role="dialog"[^>]+aria-modal="true"/);
});

test("la page conserve un seul H1 place avant les surfaces secondaires", async () => {
  const html = await readFile(resolve(projectRoot, "index.html"), "utf8");
  assert.equal((html.match(/<h1\b/g) || []).length, 1);
  assert.ok(html.indexOf("<h1") < html.indexOf("project-grid-overlay"));
});

test("la gestion du clavier ferme la fiche avant la grille", async () => {
  const main = await readFile(resolve(projectRoot, "src/main.js"), "utf8");
  const keyboardBlock = main.match(/document\.addEventListener\("keydown", \(event\) => \{[\s\S]*?closeProjectGridToApplications\(\);[\s\S]*?\n  \}\);/)?.[0] || "";
  assert.ok(keyboardBlock.indexOf("closeProjectDetail") < keyboardBlock.indexOf("closeProjectGridToApplications"));
  assert.match(main, /trapFocusWithin/);
  assert.match(main, /projectDetailReturnFocus/);
  assert.match(main, /setModalBackgroundInert/);
});

test("les URL externes sont limitees a HTTP et HTTPS", () => {
  assert.equal(getSafeExternalUrl("https://example.com/path"), "https://example.com/path");
  assert.equal(getSafeExternalUrl("http://example.com"), "http://example.com/");
  assert.equal(getSafeExternalUrl("javascript:alert(1)"), "");
  assert.equal(getSafeExternalUrl("data:text/html,test"), "");
  assert.equal(getSafeExternalUrl("/relative"), "");
});
