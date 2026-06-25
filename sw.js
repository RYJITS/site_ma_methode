const CACHE_NAME = "site-ma-methode-project-registry-20260620";

const PRECACHE_URLS = [
  "./",
  "./index.html",
  "./src/styles.css?v=mobile-card-undertext-opaque-20260619",
  "./src/main.js?v=mobile-card-undertext-opaque-20260619",
  "./public/generated/videos/storyboard-7-scenes-v4-compress-block/kling-assembled/poster/storyboard-kling-12-clips-poster.jpg",
  "./public/generated/images/textures/method-card-edge-v2/method-card-edge-v2-plate.webp",
  "./public/generated/images/textures/method-card-edge-v2/method-card-edge-v2-grain.webp",
  "./public/generated/images/contact/contact-cube-face-512-20260614.webp"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(PRECACHE_URLS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys
        .filter((key) => key !== CACHE_NAME)
        .map((key) => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const request = event.request;
  if (request.method !== "GET") return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  if (request.mode === "navigate") {
    event.respondWith(networkFirst(request));
    return;
  }

  if (request.headers.has("range")) {
    event.respondWith(fetch(request));
    return;
  }

  if (["style", "script", "image", "font"].includes(request.destination)) {
    event.respondWith(cacheFirst(request));
  }
});

async function networkFirst(request) {
  const cache = await caches.open(CACHE_NAME);
  try {
    const response = await fetch(request);
    cache.put(request, response.clone());
    return response;
  } catch {
    return cache.match(request) || cache.match("./index.html");
  }
}

async function cacheFirst(request) {
  const cache = await caches.open(CACHE_NAME);
  const cached = await cache.match(request);
  if (cached) return cached;

  const response = await fetch(request);
  if (response.ok) cache.put(request, response.clone());
  return response;
}
