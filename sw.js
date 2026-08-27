// ============================================================
// SUIVI SAV - Service Worker (cache offline + mises à jour)
// Repris du pattern Ride Tracker.
// ============================================================

// IMPORTANT : incrémenter CACHE_VERSION à chaque déploiement qui touche index.html.
// Le bump force la suppression complète de l'ancien cache (event 'activate'),
// donc une version mise à jour ne reste jamais coincée derrière un cache périmé.
const CACHE_VERSION = 'v1';
const CACHE_NAME = 'sav-app-' + CACHE_VERSION;

const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  './icon-512-maskable.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(ASSETS))
      .catch(() => {})
  );
  // Ne PAS appeler skipWaiting ici : on attend le signal explicite de l'utilisateur
  // (bouton "Mettre à jour") pour activer la nouvelle version. Voir message 'SKIP_WAITING'.
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// Message envoyé par l'app quand l'utilisateur clique "Mettre à jour"
self.addEventListener('message', (event) => {
  if (event.data === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  if (!event.request.url.startsWith(self.location.origin)) return;

  const isHTML = event.request.mode === 'navigate' || event.request.url.endsWith('.html') || event.request.url.endsWith('/');

  if (isHTML) {
    // Network-first pour le HTML : garantit un document valide et une détection
    // rapide de nouvelle version. Fallback cache si hors-ligne.
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          if (response && response.ok) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
          }
          return response;
        })
        .catch(() =>
          caches.match(event.request).then((cached) => cached || caches.match('./index.html'))
        )
    );
  } else {
    // Cache-first pour les assets statiques : rapide, mise à jour silencieuse
    // en arrière-plan (stale-while-revalidate).
    event.respondWith(
      caches.match(event.request).then((cached) => {
        const networkFetch = fetch(event.request)
          .then((response) => {
            if (response && response.ok) {
              const clone = response.clone();
              caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
            }
            return response;
          })
          .catch(() => cached);
        return cached || networkFetch;
      })
    );
  }
});
