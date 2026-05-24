const CACHE_NAME = 'telugu-app-v4';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/manifest.json',
  '/css/variables.css',
  '/css/main.css',
  '/css/animations.css',
  '/css/components/cards.css',
  '/css/components/buttons.css',
  '/js/app.js',
  '/js/router.js',
  '/js/state.js',
  '/js/storage.js',
  '/js/audio.js',
  '/js/learning/varnamala.js',
  '/js/learning/guninthalu.js',
  '/js/learning/pronunciation.js',
  '/js/engine/game-engine.js',
  '/js/tracing/tracing.js',
  '/js/games/tracing-game.js',
  '/js/games/word-builder.js',
  '/js/games/memory-match.js',
  '/js/games/bubble-pop.js',
  '/js/ui/dashboard.js',
  '/js/ui/rewards.js',
  '/assets/libs/gsap.min.js',
  '/assets/libs/howler.min.js',
  '/assets/libs/lottie.min.js',
  '/assets/fonts/Mandali-Regular.ttf',
  '/assets/icons/icon-192x192.png',
  '/assets/icons/icon-512x512.png',
  '/data/vowels.json',
  '/data/consonants.json',
  '/data/guninthalu.json',
  '/data/ottulu.json',
  '/data/words.json',
  '/data/levels.json',
  '/data/rewards.json',
  '/data/stories.json',
  '/data/quizzes.json'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(ASSETS_TO_CACHE);
      })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  // Only cache GET requests
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Return from cache if found
        if (response) return response;

        // Otherwise fetch from network
        return fetch(event.request).then((networkResponse) => {
          // Check if response is valid before caching
          if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
            return networkResponse;
          }

          // Clone the response because it's a stream and can only be consumed once
          const responseToCache = networkResponse.clone();

          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });

          return networkResponse;
        });
      }).catch(() => {
        // Handle offline state for non-cached items gracefully if needed
      })
  );
});
