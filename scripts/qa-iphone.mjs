import { spawn } from "node:child_process";
import { createRequire } from "node:module";
import { existsSync, mkdirSync } from "node:fs";
import { get } from "node:http";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");
const port = Number(getArg("--port") || process.env.PORT || 4177);
const url = `http://127.0.0.1:${port}`;
const headed = process.argv.includes("--headed");
const outputDir = resolve(root, "output", "playwright");
const serverScript = resolve(root, "scripts", "serve.mjs");

mkdirSync(outputDir, { recursive: true });

const playwright = loadPlaywright();
const chromePath = findBrowserExecutable();
const server = await ensureServer();

try {
  const browser = await playwright.chromium.launch({
    headless: !headed,
    executablePath: chromePath
  });
  const context = await browser.newContext({
    serviceWorkers: "block",
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 3,
    isMobile: true,
    hasTouch: true,
    userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1"
  });
  const page = await context.newPage();

  await page.goto(`${url}/?qa=iphone-local`, { waitUntil: "domcontentloaded" });
  await page.waitForFunction(() => typeof window.__videoProbe === "function" && window.__videoProbe().storyTimelineMax > 1000);
  await page.waitForFunction(() => document.getElementById("boot-loader")?.hidden === true, null, { timeout: 9000 }).catch(() => {});

  await page.screenshot({ path: resolve(outputDir, "qa-iphone-home.png"), fullPage: false });

  const raw = 2.5 * (1 / 12) * 0.815 + 0.02;
  await jumpToProgress(page, raw);
  const beforeExplorer = await probe(page);

  await page.locator("#explorer-point").click({ force: true });
  await page.waitForTimeout(700);
  const afterExplorer = await probe(page);
  await page.screenshot({ path: resolve(outputDir, "qa-iphone-fiches.png"), fullPage: false });

  const closeTileButton = page.locator("#holographic-tile-close");
  if (await closeTileButton.count()) {
    await closeTileButton.click({ force: true });
  } else {
    await page.keyboard.press("Escape");
  }
  await page.waitForTimeout(1300);
  const afterClose = await probe(page);
  await page.screenshot({ path: resolve(outputDir, "qa-iphone-retour.png"), fullPage: false });

  const gridStart = Date.now();
  await page.evaluate(() => window.openProjectGrid?.());
  await page.waitForFunction(() => document.getElementById("project-grid-overlay")?.classList.contains("is-open"), null, { timeout: 5000 });
  const gridElapsed = Date.now() - gridStart;
  const afterGrid = await probe(page);
  await page.screenshot({ path: resolve(outputDir, "qa-iphone-grille.png"), fullPage: false });

  await page.locator("#project-mobile-page [data-project-index]").first().click({ force: true });
  await page.waitForFunction(() => document.getElementById("project-grid-overlay")?.classList.contains("has-project-detail"), null, { timeout: 5000 });
  const afterMobileDetail = await probe(page);
  await page.screenshot({ path: resolve(outputDir, "qa-iphone-detail.png"), fullPage: false });

  await browser.close();

  const checks = [
    {
      name: "Explorer ne change pas la progression",
      ok: near(beforeExplorer.effectiveProgress, afterExplorer.effectiveProgress, 0.002)
    },
    {
      name: "Retour conserve le scroll",
      ok: Math.abs(beforeExplorer.scrollY - afterClose.scrollY) <= 2
    },
    {
      name: "Grille projets prechargee",
      ok: gridElapsed < 250
    },
    {
      name: "Page projets mobile active",
      ok: afterGrid.mobileProjectPage && afterGrid.mobileCards >= afterGrid.gridCards && afterGrid.firstMobileSection === "tools"
    },
    {
      name: "Fiche projet mobile ouvrable",
      ok: afterMobileDetail.projectDetailOpen
    }
  ];

  printSummary({ beforeExplorer, afterExplorer, afterClose, afterGrid, afterMobileDetail, gridElapsed, checks });
  if (checks.some((check) => !check.ok)) process.exitCode = 1;
} finally {
  if (server) server.kill();
}

function loadPlaywright() {
  const require = createRequire(import.meta.url);
  const sharedNodeModules = resolve(root, "..", "..", "Conpetances", "node_modules");
  const candidates = [
    () => require("playwright-core"),
    () => require("playwright"),
    () => require(require.resolve("playwright-core", { paths: [sharedNodeModules] })),
    () => require(require.resolve("playwright", { paths: [sharedNodeModules] }))
  ];

  for (const load of candidates) {
    try {
      return load();
    } catch {}
  }

  throw new Error("Playwright introuvable. Installe playwright-core ou lance depuis D:\\00_Cerveau_IA\\Conpetances avec ses dependances.");
}

function findBrowserExecutable() {
  const candidates = [
    "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
    "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
    "C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe",
    "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe"
  ];
  const found = candidates.find((candidate) => existsSync(candidate));
  if (!found) throw new Error("Chrome ou Edge introuvable. Installe Chrome/Edge pour lancer qa:iphone.");
  return found;
}

async function ensureServer() {
  if (await isReachable(url)) return null;

  const child = spawn(process.execPath, [serverScript, "--host", "127.0.0.1", "--port", String(port)], {
    cwd: root,
    stdio: "ignore",
    windowsHide: true
  });

  for (let attempt = 0; attempt < 40; attempt += 1) {
    if (await isReachable(url)) return child;
    await delay(150);
  }

  child.kill();
  throw new Error(`Serveur local indisponible sur ${url}`);
}

function isReachable(target) {
  return new Promise((resolveReachable) => {
    const request = get(target, (response) => {
      response.resume();
      resolveReachable(response.statusCode >= 200 && response.statusCode < 500);
    });
    request.on("error", () => resolveReachable(false));
    request.setTimeout(900, () => {
      request.destroy();
      resolveReachable(false);
    });
  });
}

async function jumpToProgress(page, progress) {
  for (let attempt = 0; attempt < 10; attempt += 1) {
    await page.evaluate((target) => {
      const max = window.__videoProbe().storyTimelineMax;
      window.scrollTo(0, Math.round(max * target));
    }, progress);
    await page.waitForTimeout(120);
    const current = await page.evaluate(() => window.__videoProbe().progress);
    if (near(current, progress, 0.004)) return;
  }
}

function probe(page) {
  return page.evaluate(() => {
    const data = window.__videoProbe();
    return {
      scrollY: data.scrollY,
      progress: data.progress,
      effectiveProgress: data.effectiveProgress,
      storyLock: data.storyLock,
      tileOpen: document.getElementById("holographic-tile")?.classList.contains("is-open"),
      gridCards: document.querySelectorAll("#project-grid-track [data-project-index]").length,
      mobileCards: document.querySelectorAll("#project-mobile-page [data-project-index]").length,
      mobileProjectPage: document.getElementById("project-grid-overlay")?.classList.contains("is-mobile-list"),
      firstMobileSection: document.querySelector("#project-mobile-page [data-project-mobile-section]")?.dataset.projectMobileSection || "",
      projectDetailOpen: document.getElementById("project-grid-overlay")?.classList.contains("has-project-detail")
    };
  });
}

function printSummary({ beforeExplorer, afterExplorer, afterClose, afterGrid, afterMobileDetail, gridElapsed, checks }) {
  console.log("QA iPhone local");
  console.log(`- Avant Explorer: scrollY=${beforeExplorer.scrollY}, progress=${beforeExplorer.progress}, effective=${beforeExplorer.effectiveProgress}`);
  console.log(`- Fiches ouvertes: effective=${afterExplorer.effectiveProgress}, lock=${afterExplorer.storyLock ? "oui" : "non"}`);
  console.log(`- Apres fermeture: scrollY=${afterClose.scrollY}, progress=${afterClose.progress}, effective=${afterClose.effectiveProgress}`);
  console.log(`- Grille projets: ${gridElapsed} ms, cartes=${afterClose.gridCards}`);
  console.log(`- Page mobile projets: ${afterGrid.mobileProjectPage ? "oui" : "non"}, sections depuis ${afterGrid.firstMobileSection || "n/a"}, vignettes=${afterGrid.mobileCards}`);
  console.log(`- Detail mobile projet: ${afterMobileDetail.projectDetailOpen ? "ouvert" : "ferme"}`);
  checks.forEach((check) => console.log(`- ${check.ok ? "OK" : "ECHEC"} ${check.name}`));
  console.log("Captures: output/playwright/qa-iphone-*.png");
}

function getArg(name) {
  const index = process.argv.indexOf(name);
  return index >= 0 ? process.argv[index + 1] : "";
}

function near(a, b, tolerance) {
  return Math.abs(Number(a) - Number(b)) <= tolerance;
}

function delay(ms) {
  return new Promise((resolveDelay) => setTimeout(resolveDelay, ms));
}
