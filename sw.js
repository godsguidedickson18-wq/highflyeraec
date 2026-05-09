/**
 * Highflyer Adult Education Centre — Service Worker
 * Strategy:
 *   HTML pages   → Network-first  (always try to get fresh content)
 *   CSS / JS     → Cache-first    (fast, stable assets)
 *   Images       → Cache-first    (large, slow to fetch)
 *   Fonts        → Cache-first    (external Google Fonts)
 *   Offline      → offline.html   (friendly fallback)
 */

const CACHE_VERSION  = 'v2';
const STATIC_CACHE   = `highflyer-static-${CACHE_VERSION}`;
const DYNAMIC_CACHE  = `highflyer-dynamic-${CACHE_VERSION}`;
const IMAGE_CACHE    = `highflyer-images-${CACHE_VERSION}`;
const FONT_CACHE     = `highflyer-fonts-${CACHE_VERSION}`;

const BASE = '/highflyeraec';

/* ── Files pre-cached on install ── */
const PRECACHE_URLS = [
  `${BASE}/`,
  `${BASE}/index.html`,
  `${BASE}/about.html`,
  `${BASE}/programmes.html`,
  `${BASE}/stories.html`,
  `${BASE}/enrol.html`,
  `${BASE}/involve.html`,
  `${BASE}/news.html`,
  `${BASE}/games.html`,
  `${BASE}/contact.html`,
  `${BASE}/404.html`,
  `${BASE}/offline.html`,
  `${BASE}/css/styles.css`,
  `${BASE}/js/main.js`,
  `${BASE}/manifest.json`,
  `${BASE}/icons/icon-192x192.png`,
  `${BASE}/icons/icon-512x512.png`,
  `${BASE}/icons/icon-180x180.png`,
];

/* ── Max items in dynamic/image caches ── */
const MAX_DYNAMIC = 30;
const MAX_IMAGES  = 40;

/* ── INSTALL: pre-cache all static assets ── */
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then(cache => cache.addAll(PRECACHE_URLS))
      .then(() => self.skipWaiting())
      .catch(err => console.warn('[SW] Pre-cache failed:', err))
  );
});

/* ── ACTIVATE: remove stale caches from previous versions ── */
self.addEventListener('activate', event => {
  const current = [STATIC_CACHE, DYNAMIC_CACHE, IMAGE_CACHE, FONT_CACHE];
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys
          .filter(k => k.startsWith('highflyer-') && !current.includes(k))
          .map(k => { console.log('[SW] Removing old cache:', k); return caches.delete(k); })
      ))
      .then(() => self.clients.claim())
  );
});

/* ── FETCH: routing logic ── */
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);

  // Ignore non-GET and cross-origin requests we don't control
  if (request.method !== 'GET') return;

  // ── Google Fonts (cache-first, long-lived) ──
  if (url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com') {
    event.respondWith(cacheFirst(request, FONT_CACHE));
    return;
  }

  // ── Images from Unsplash or our icons (cache-first) ──
  if (url.hostname === 'images.unsplash.com' || request.destination === 'image') {
    event.respondWith(cacheFirstWithLimit(request, IMAGE_CACHE, MAX_IMAGES));
    return;
  }

  // ── Our own CSS and JS (cache-first — versioned files) ──
  if (url.pathname.includes('/css/') || url.pathname.includes('/js/')) {
    event.respondWith(cacheFirst(request, STATIC_CACHE));
    return;
  }

  // ── HTML pages (network-first — keep content fresh) ──
  if (request.destination === 'document' || url.pathname.endsWith('.html') || url.pathname.endsWith('/')) {
    event.respondWith(networkFirstWithOffline(request));
    return;
  }

  // ── Everything else (network-first, cache as fallback) ──
  event.respondWith(networkFirst(request, DYNAMIC_CACHE, MAX_DYNAMIC));
});

/* ════════════════════════════════════════════════════
   STRATEGY HELPERS
   ════════════════════════════════════════════════════ */

/** Cache-first: serve from cache; fetch + cache on miss. */
async function cacheFirst(request, cacheName) {
  const cached = await caches.match(request);
  if (cached) return cached;
  try {
    const response = await fetch(request);
    if (response && response.status === 200) {
      const cache = await caches.open(cacheName);
      cache.put(request, response.clone());
    }
    return response;
  } catch {
    return new Response('Resource unavailable offline.', { status: 503 });
  }
}

/** Cache-first with an item limit to prevent unbounded growth. */
async function cacheFirstWithLimit(request, cacheName, maxItems) {
  const cached = await caches.match(request);
  if (cached) return cached;
  try {
    const response = await fetch(request);
    if (response && response.status === 200) {
      const cache = await caches.open(cacheName);
      cache.put(request, response.clone());
      await trimCache(cache, maxItems);
    }
    return response;
  } catch {
    return new Response('Image unavailable offline.', { status: 503 });
  }
}

/** Network-first: try network; fall back to cache; fall back to offline.html. */
async function networkFirstWithOffline(request) {
  try {
    const response = await fetch(request);
    if (response && response.status === 200) {
      const cache = await caches.open(DYNAMIC_CACHE);
      cache.put(request, response.clone());
    }
    return response;
  } catch {
    const cached = await caches.match(request);
    if (cached) return cached;
    // Return the offline fallback page
    const offline = await caches.match(`${BASE}/offline.html`);
    return offline || new Response('<h1>You are offline</h1><p>Please check your connection.</p>', {
      status: 503,
      headers: { 'Content-Type': 'text/html' }
    });
  }
}

/** Network-first with cache fallback (non-HTML). */
async function networkFirst(request, cacheName, maxItems) {
  try {
    const response = await fetch(request);
    if (response && response.status === 200) {
      const cache = await caches.open(cacheName);
      cache.put(request, response.clone());
      await trimCache(cache, maxItems);
    }
    return response;
  } catch {
    const cached = await caches.match(request);
    return cached || new Response('Resource unavailable offline.', { status: 503 });
  }
}

/** Remove oldest entries when cache exceeds maxItems. */
async function trimCache(cache, maxItems) {
  const keys = await cache.keys();
  if (keys.length > maxItems) {
    const toDelete = keys.slice(0, keys.length - maxItems);
    await Promise.all(toDelete.map(k => cache.delete(k)));
  }
}

/* ── BACKGROUND SYNC: queue failed form submissions (future use) ── */
self.addEventListener('sync', event => {
  if (event.tag === 'sync-enquiry') {
    event.waitUntil(syncQueuedEnquiries());
  }
});

async function syncQueuedEnquiries() {
  // Placeholder: when Background Sync API is used for form submissions,
  // retrieve queued data from IndexedDB and replay to Formspree here.
  console.log('[SW] Background sync triggered — enquiry queue');
}

/* ── PUSH NOTIFICATIONS: future use ── */
self.addEventListener('push', event => {
  if (!event.data) return;
  const data = event.data.json();
  self.registration.showNotification(data.title || 'Highflyer AEC', {
    body:    data.body    || 'You have a new message from Highflyer Adult Education Centre.',
    icon:    `${BASE}/icons/icon-192x192.png`,
    badge:   `${BASE}/icons/icon-72x72.png`,
    vibrate: [200, 100, 200],
    data:    { url: data.url || `${BASE}/` }
  });
});

self.addEventListener('notificationclick', event => {
  event.notification.close();
  const target = (event.notification.data && event.notification.data.url) || `${BASE}/`;
  event.waitUntil(clients.openWindow(target));
});

