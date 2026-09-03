import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { test } from "node:test";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = resolve(fileURLToPath(new URL("..", import.meta.url)));

test("la video principale demarre son prechargement des l'ouverture", async () => {
  const [html, main] = await Promise.all([
    readFile(resolve(projectRoot, "index.html"), "utf8"),
    readFile(resolve(projectRoot, "src/main.js"), "utf8")
  ]);

  assert.match(html, /id="story-video"[\s\S]+?preload="auto"/);
  assert.doesNotMatch(html, /id="story-video"[\s\S]+?fetchpriority="high"/);
  assert.match(main, /function bindStoryVideoWarmup/);
  assert.match(main, /storyVideoWarmed/);
  assert.match(main, /analyzeStoryVideoConnection/);
  assert.match(main, /measureStoryVideoThroughput/);
  assert.match(main, /waitForStoryVideoBuffer/);
  assert.match(main, /ensureAdaptiveStoryVideo\(\)[\s\S]+?waitForStoryVideoBuffer/);
  assert.match(main, /withTimeout\(runBootPreload\(\), isMobileViewport\(\) \? 5600 : 6500\)/);
  assert.doesNotMatch(main, /ensureContactScene\("idle"\)/);
});

test("le boot attend un tampon video borne sans charger les contenus secondaires", async () => {
  const main = await readFile(resolve(projectRoot, "src/main.js"), "utf8");
  const bootBlock = main.match(/async function runBootPreload\(\) \{([\s\S]*?)\n\}/)?.[1] || "";

  assert.match(bootBlock, /waitForStoryVideoBuffer/);
  assert.doesNotMatch(bootBlock, /preloadProjectRegistryModule/);
  assert.doesNotMatch(bootBlock, /preloadProjectImagesForBoot/);
  assert.doesNotMatch(bootBlock, /ensureContactScene/);
});

test("la video choisit automatiquement entre 900p et 1080p sans controle visuel", async () => {
  const [html, main] = await Promise.all([
    readFile(resolve(projectRoot, "index.html"), "utf8"),
    readFile(resolve(projectRoot, "src/main.js"), "utf8")
  ]);

  assert.match(html, /storyboard-kling-12-clips-900p-scroll-test-20260903\.mp4/);
  assert.match(main, /storyboard-kling-12-clips-1080p-scroll-web-optimized-20260614\.mp4/);
  assert.doesNotMatch(`${html}\n${main}`, /storyboard-kling-12-clips-480p-scroll-test-20260903\.mp4/);
  assert.doesNotMatch(html, /id="video-quality-test"|data-video-mode=/);
  assert.doesNotMatch(main, /videoQualityTest|applyStoryVideoMode/);
  assert.match(main, /initAdaptiveStoryVideo/);
  assert.match(main, /setStoryVideoQuality/);
});

test("les ressources secondaires attendent la fin du demarrage video", async () => {
  const [html, main] = await Promise.all([
    readFile(resolve(projectRoot, "index.html"), "utf8"),
    readFile(resolve(projectRoot, "src/main.js"), "utf8")
  ]);
  const contactVideoTag = html.match(/<video[^>]*id="contact-transition-video"[^>]*>/)?.[0] || "";
  const warmupBlock = main.match(/function scheduleProgressiveWarmup\(\) \{([\s\S]*?)\n\}/)?.[1] || "";

  assert.match(contactVideoTag, /data-poster=/);
  assert.doesNotMatch(contactVideoTag, /\sposter=/);
  assert.match(main, /videoElement\.poster = videoElement\.dataset\.poster/);
  assert.doesNotMatch(warmupBlock, /preloadProjectRegistryModule/);
  assert.match(main, /bootLoader\.hidden = true;\s*scheduleProjectRegistryWarmup\(\)/);
});

test("la scene WebGL peut etre suspendue et respecte la visibilite", async () => {
  const scene = await readFile(resolve(projectRoot, "src/contact-scene.js"), "utf8");
  assert.match(scene, /setActive\(value\)/);
  assert.match(scene, /document\.hidden \|\| !state\.active/);
  assert.match(scene, /visibilitychange/);
  assert.doesNotMatch(scene, /if \(document\.hidden\) \{\s*requestAnimationFrame\(render\)/);
});

test("le service worker est tolerant et ne cache que les reponses valides", async () => {
  const worker = await readFile(resolve(projectRoot, "sw.js"), "utf8");
  assert.doesNotMatch(worker, /cache\.addAll/);
  assert.match(worker, /precacheAvailableAssets/);
  assert.match(worker, /if \(response\.ok\) await cache\.put/);
  assert.doesNotMatch(worker, /\.mp4/);
});

test("la hauteur du recit est reservee avant son injection pour eviter le CLS", async () => {
  const css = await readFile(resolve(projectRoot, "src/styles.css"), "utf8");
  assert.match(css, /\.story-scroll \{[\s\S]*?min-height: 1375svh;/);
  assert.match(css, /@media \(max-width: 920px\) \{[\s\S]*?\.story-scroll \{[\s\S]*?min-height: 1262svh;/);
  assert.match(css, /@media \(max-width: 760px\) \{[\s\S]*?\.story-scroll \{[\s\S]*?min-height: 1144svh;/);
  assert.match(css, /@media \(prefers-reduced-motion: reduce\) \{[\s\S]*?\.story-scroll \{[\s\S]*?min-height: 1208svh;/);
});

test("la demonstration automatique des fiches est retiree du scroll mobile", async () => {
  const [main, css] = await Promise.all([
    readFile(resolve(projectRoot, "src/main.js"), "utf8"),
    readFile(resolve(projectRoot, "src/styles.css"), "utf8")
  ]);

  assert.match(main, /function isGuidedScrollDemoEnabled\(\) \{[\s\S]*?return !isMobileMethodCardMode\(\) && !prefersReducedMotion\(\);/);
  assert.match(main, /function updateGuidedScrollDemo\(rawProgress\) \{[\s\S]*?!isGuidedScrollDemoEnabled\(\)/);
  assert.match(main, /function getGuidedDemoEffectiveProgress\(rawProgress\) \{[\s\S]*?if \(!isGuidedScrollDemoEnabled\(\)\) return progress;/);
  assert.match(css, /@media \(max-width: 760px\) \{[\s\S]*?\.story-section\[data-id="methodologie"\] \{[\s\S]*?min-height: 112svh;/);
  assert.match(css, /@media \(max-width: 760px\) \{[\s\S]*?\.guided-cursor \{[\s\S]*?display: none !important;/);
});

test("le raccourci global vers la grille projet est masque sur mobile", async () => {
  const css = await readFile(resolve(projectRoot, "src/styles.css"), "utf8");

  assert.match(css, /@media \(max-width: 760px\) \{[\s\S]*?\.method-section-project-guide \{[\s\S]*?display: none;/);
});

test("la tuile resultat des fiches est masquee sur mobile", async () => {
  const css = await readFile(resolve(projectRoot, "src/styles.css"), "utf8");

  assert.match(css, /@media \(max-width: 760px\) \{[\s\S]*?\.method-section-outcome \{[\s\S]*?display: none;/);
});

test("les polices sont prechargees sans bloquer le premier rendu", async () => {
  const [html, main] = await Promise.all([
    readFile(resolve(projectRoot, "index.html"), "utf8"),
    readFile(resolve(projectRoot, "src/main.js"), "utf8")
  ]);
  assert.match(html, /id="site-fonts" rel="preload" as="style"/);
  assert.match(html, /<noscript><link rel="stylesheet"[^>]+fonts\.googleapis\.com/);
  assert.match(main, /deferredFontStylesheet\.rel = "stylesheet"/);
});
