const CACHE_NAME = 'abel-tree-farm-static-v2';
const ASSETS = [
  '/',
  '/index.html',
  '/css/styles.css',
  '/css/updates.css',
  '/js/main.js',
  '/images/draft-gallery-actual-gate-watercolor-v2.png',
  '/images/draft-about-field-grown-rows-watercolor-v1.png',
  '/images/draft-service-install-equipment-watercolor-v1.png',
  '/images/draft-visit-gate-watercolor-v1.png',
  '/images/draft-gallery-palm-avenue-watercolor-v1.png',
  '/images/draft-gallery-shade-tree-rows-watercolor-v1.png',
  '/images/draft-gallery-equipment-operations-watercolor-v1.png',
  '/images/draft-gallery-john-deere-333p-tree-spade-watercolor-v1.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
    )).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  const request = event.request;
  if(request.method !== 'GET') return;

  event.respondWith(
    caches.match(request).then(cached => {
      if(cached) return cached;
      return fetch(request).then(response => {
        const sameOrigin = new URL(request.url).origin === self.location.origin;
        if(sameOrigin && response && response.status === 200){
          const copy = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(request, copy));
        }
        return response;
      });
    })
  );
});
