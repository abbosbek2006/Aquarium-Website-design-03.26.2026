const CACHE_NAME = "aquarium-v10";

const ASSETS = [
  "/",
  "/index.html",
  "/style.css",
  "/script.js",
  "/offline.html",
];

self.addEventListener("install", (e) => {
  self.skipWaiting();

  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    }),
  );
});

self.addEventListener("activate", (e) => {
  clients.claim();

  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        }),
      ),
    ),
  );
});

self.addEventListener("fetch", (e) => {
  e.respondWith(
    fetch(e.request)
      .then((response) => {
        return caches.open(CACHE_NAME).then((cache) => {
          cache.put(e.request, response.clone());
          return response;
        });
      })
      .catch(() => {
        return caches.match(e.request) || caches.match("/offline.html");
      }),
  );
});
