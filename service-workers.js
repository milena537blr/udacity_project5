let staticCacheName = 'app-static-v2';

self.addEventListener("install", function(event) {
  let urlsToCache = [
    "/css/styles.css",
    "/js/main.js",
    "/js/restaurant_info.js",
    "/js/dbhelper.js",
    "/index.html",
    "/restaurant.html"
  ];
  event.waitUntil(
    caches.open(staticCacheName).then(function(cache){
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response){
      if (response) return response;
      return fetch(event.request);
    })
  );
});

self.addEventListener("activate", function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames){
      return Promise.all(
        cacheNames.filter(function(cacheName){
          return cacheName.startsWith('app-') && cacheName != staticCacheName;
        }).map(function(cacheName){
          return caches.delete(cacheName);
        })
      );
    })
  );
});
