const CACHE_NAME = "aquarium-v11";

const ASSETS = [
  "./",
  "./index.html",
  "./style.css",
  "./script.js",
  "./offline.html",
];

self.addEventListener("install", (e) => {
  self.skipWaiting();

  e.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS)));
});

self.addEventListener("activate", (e) => {
  clients.claim();

  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) return caches.delete(key);
        }),
      ),
    ),
  );
});

self.addEventListener("fetch", (e) => {
  e.respondWith(
    fetch(e.request)
      .then((response) => {
        if (
          e.request.method === "GET" &&
          e.request.url.startsWith(self.location.origin)
        ) {
          const resClone = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(e.request, resClone);
          });
        }
        return response;
      })
      .catch(() => caches.match(e.request) || caches.match("./offline.html")),
  );
});
