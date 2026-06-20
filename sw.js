// ============================================================
// Fenda Music — Service Worker v6
// Estratégia:
//   - HTML e JS: network-first (sempre busca versão nova da rede)
//   - CSS e fontes: cache-first (mudam pouco)
//   - Supabase: sempre rede, sem cache
// ============================================================

const CACHE_NAME = 'fenda-music-v6';

const SHELL_ASSETS = [
  './',
  './index.html',
  './player.html',
  './reset-password.html',
  './manifest.json',
  './base.css',
  './inicio.css',
  './busca.css',
  './biblioteca.css',
  './perfil.css',
  './login.css',
  './supabase-config.js',
  './search.js',
  './player-core.js',
  './player-ui.js',
  './player-audio-lyrics.js',
  './player-menus-core.js',
  './player-music-actions.js',
  './player-playlists.js',
  './fonts/material-symbols.css',
  './fonts/material-symbols-rounded.woff2',
];

// Arquivos que usam network-first (sempre pega versão mais nova)
const NETWORK_FIRST = [
  'index.html',
  'player.html',
  'player-core.js',
  'player-ui.js',
  'player-audio-lyrics.js',
  'player-menus-core.js',
  'player-music-actions.js',
  'player-playlists.js',
  'supabase-config.js',
  'search.js',
  'manifest.json',
];

function isNetworkFirst(url) {
  return NETWORK_FIRST.some(f => url.pathname.endsWith(f))
      || url.pathname === '/'
      || url.pathname.endsWith('/');
}

// ── Instalação ────────────────────────────────────────────────
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return Promise.allSettled(
        SHELL_ASSETS.map(url =>
          cache.add(url).catch(err => console.warn('[SW] Não cacheou:', url, err))
        )
      );
    })
  );
  // skipWaiting: ativa imediatamente para que os arquivos novos
  // sejam servidos sem precisar fechar e reabrir o app
  self.skipWaiting();
});

// ── Ativação: limpa TODOS os caches antigos ──────────────────
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME)
          .map((key) => {
            console.log('[SW] Removendo cache antigo:', key);
            return caches.delete(key);
          })
      )
    ).then(() => self.clients.claim())
  );
});

// ── Fetch ─────────────────────────────────────────────────────
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // Supabase: sempre rede
  if (url.hostname.includes('supabase.co')) {
    event.respondWith(
      fetch(event.request).catch(() =>
        new Response(JSON.stringify([]), {
          headers: { 'Content-Type': 'application/json' }
        })
      )
    );
    return;
  }

  // Google Fonts e jsDelivr: cache-first
  if (url.hostname === 'fonts.googleapis.com' ||
      url.hostname === 'fonts.gstatic.com' ||
      url.hostname === 'cdn.jsdelivr.net') {
    event.respondWith(
      caches.open(CACHE_NAME).then((cache) =>
        cache.match(event.request).then((cached) => {
          if (cached) return cached;
          return fetch(event.request).then((res) => {
            if (res.ok) cache.put(event.request, res.clone());
            return res;
          });
        })
      )
    );
    return;
  }

  // Arquivos locais: network-first para HTML/JS, cache-first para CSS/fontes
  if (url.origin === self.location.origin) {
    if (isNetworkFirst(url)) {
      // Network-first: tenta rede, cai no cache se offline
      event.respondWith(
        fetch(event.request)
          .then((res) => {
            if (res.ok) {
              // Atualiza o cache com a versão mais nova
              caches.open(CACHE_NAME).then(c => c.put(event.request, res.clone()));
            }
            return res;
          })
          .catch(() => caches.match(event.request))
      );
    } else {
      // Cache-first: CSS, fontes, imagens
      event.respondWith(
        caches.match(event.request).then((cached) => {
          if (cached) return cached;
          return fetch(event.request).then((res) => {
            if (res.ok) {
              caches.open(CACHE_NAME).then(c => c.put(event.request, res.clone()));
            }
            return res;
          });
        })
      );
    }
    return;
  }

  // Fallback para qualquer outra requisição
  event.respondWith(fetch(event.request));
});
