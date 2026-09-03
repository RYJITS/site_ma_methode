import assert from "node:assert/strict";
import { request } from "node:http";
import { readFile } from "node:fs/promises";
import { after, before, test } from "node:test";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { createStaticServer } from "../scripts/static-server.mjs";

const projectRoot = resolve(fileURLToPath(new URL("..", import.meta.url)));
const server = createStaticServer({ root: projectRoot, isProduction: true });
let port = 0;

before(async () => {
  await new Promise((resolvePromise, reject) => {
    server.once("error", reject);
    server.listen(0, "127.0.0.1", resolvePromise);
  });
  const address = server.address();
  port = typeof address === "object" && address ? address.port : 0;
});

after(async () => {
  await new Promise((resolvePromise) => server.close(resolvePromise));
});

test("le serveur envoie les en-tetes de defense", async () => {
  const response = await httpRequest("/");
  assert.equal(response.statusCode, 200);
  assert.equal(response.headers["x-content-type-options"], "nosniff");
  assert.equal(response.headers["x-frame-options"], "DENY");
  assert.equal(response.headers["referrer-policy"], "strict-origin-when-cross-origin");
  assert.match(response.headers["content-security-policy"], /frame-ancestors 'none'/);
  assert.equal(response.headers["x-xss-protection"], "0");
  assert.equal(response.headers["x-permitted-cross-domain-policies"], "none");
  assert.match(response.headers["strict-transport-security"], /^max-age=31536000/);
  assert.equal(response.headers["cache-control"], "no-cache");

  const staticAsset = await httpRequest("/src/main.js");
  assert.equal(staticAsset.headers["cache-control"], "public, max-age=31536000, immutable");
});

test("la configuration Apache applique la CSP, le cache cible et bloque les fichiers internes", async () => {
  const config = await readFile(resolve(projectRoot, ".htaccess"), "utf8");
  assert.match(config, /Options -Indexes/);
  assert.match(config, /Header always set Content-Security-Policy /);
  assert.doesNotMatch(config, /Content-Security-Policy-Report-Only/);
  assert.match(config, /X-Content-Type-Options/);
  assert.match(config, /X-XSS-Protection "0"/);
  assert.match(config, /X-Permitted-Cross-Domain-Policies "none"/);
  assert.match(config, /Strict-Transport-Security/);
  assert.match(config, /max-age=31536000, immutable/);
  assert.match(config, /<Files "sw\.js">[\s\S]+?no-cache, no-store, must-revalidate/);
  assert.match(config, /AddOutputFilterByType DEFLATE/);
  assert.doesNotMatch(config, /DEFLATE[^\n]+(?:image\/(?:avif|webp)|video\/mp4)/);
  assert.match(config, /\.zip\$/);
  assert.match(config, /package\(-lock\)\?/);
});

test("les metadonnees SEO, sociales et le sitemap restent coherents", async () => {
  const [html, sitemap] = await Promise.all([
    readFile(resolve(projectRoot, "index.html"), "utf8"),
    readFile(resolve(projectRoot, "sitemap.xml"), "utf8")
  ]);
  const jsonLdText = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)?.[1] || "";
  const jsonLd = JSON.parse(jsonLdText);

  assert.equal(jsonLd["@type"], "ProfilePage");
  assert.equal(jsonLd.dateModified, "2026-09-03");
  assert.equal(jsonLd.primaryImageOfPage.width, 1536);
  assert.match(html, /property="og:image:width" content="1536"/);
  assert.match(html, /name="twitter:image:alt"/);
  assert.match(sitemap, /<lastmod>2026-09-03<\/lastmod>/);
  assert.match(sitemap, /<image:image>[\s\S]+?<image:loc>https:\/\/cv\.c2rdesign\.com\//);
});

test("le formulaire partage les limites client et serveur", async () => {
  const [html, php] = await Promise.all([
    readFile(resolve(projectRoot, "index.html"), "utf8"),
    readFile(resolve(projectRoot, "api/contact.php"), "utf8")
  ]);

  assert.match(html, /name="name"[^>]+maxlength="80"/);
  assert.match(html, /name="email"[^>]+maxlength="254"/);
  assert.match(html, /name="message"[^>]+maxlength="4000"/);
  assert.match(html, /name="form_started_at"/);
  assert.match(html, /class="contact-privacy"/);
  assert.match(php, /CONTACT_MAX_BODY_BYTES = 65536/);
  assert.match(php, /CONTACT_RATE_LIMIT_ATTEMPTS = 5/);
  assert.match(php, /FILTER_VALIDATE_EMAIL/);
  assert.match(php, /Cache-Control: no-store/);
  assert.match(php, /isSameOriginRequest/);
});

test("le pied de page identifie l'auteur et rend la confidentialite accessible", async () => {
  const html = await readFile(resolve(projectRoot, "index.html"), "utf8");

  assert.match(html, /<footer class="site-footer"[^>]+aria-label="Informations du site"/);
  assert.match(html, /© <time datetime="2026">2026<\/time> Yann Scheidegger — C2R Design/);
  assert.match(html, /<details id="confidentialite" class="site-footer-privacy">/);
  assert.match(html, /Responsable :<\/strong> Yann Scheidegger, Suisse/);
  assert.match(html, /nom, votre adresse e-mail, le sujet et votre message/);
  assert.match(html, /au maximum douze mois après le dernier échange/);
  assert.match(html, /loi fédérale suisse sur la protection des données/);
  assert.doesNotMatch(html, /C2R Design (?:SA|Sàrl|SARL)/);
});

function httpRequest(path) {
  return new Promise((resolvePromise, reject) => {
    const req = request({ host: "127.0.0.1", port, path }, (response) => {
      response.resume();
      response.on("end", () => resolvePromise({
        statusCode: response.statusCode,
        headers: response.headers
      }));
    });
    req.on("error", reject);
    req.end();
  });
}
