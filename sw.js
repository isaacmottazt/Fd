// Fenda Music — Service Worker v11
// FORCE UPDATE — destrói todos os caches anteriores
const CACHE_NAME = 'fenda-music-v11';

const SHELL_ASSETS = [
  '/player.html', '/index.html', '/reset-password.html', '/manifest.json',
  '/base.css', '/inicio.css', '/busca.css', '/biblioteca.css',
  '/perfil.css', '/login.css', '/supabase-config.js', '/search.js',
  '/player-core.js', '/player-ui.js', '/player-audio-lyrics.js',
  '/player-menus-core.js', '/player-music-actions.js', '/player-playlists.js',
];

const PLAYER_ROUTES = ['/player.html', '/player', '/inicio', '/busca', '/biblioteca', '/perfil'];
const LOGIN_ROUTES  = ['/index.html', '/login', '/'];

self.addEventListener('install', (event) => {
  // Força ativação imediata sem esperar abas fecharem
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache =>
      Promise.allSettled(SHELL_ASSETS.map(url => cache.add(url).catch(() => {})))
    )
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    // Deleta TODOS os caches antigos sem exceção
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => {
        console.log('[SW] Deletando cache antigo:', k);
        return caches.delete(k);
      }))
    ).then(() => {
      // Toma controle de todas as abas abertas imediatamente
      return self.clients.claim();
    }).then(() => {
      // Força reload em todos os clientes para aplicar o novo SW
      return self.clients.matchAll({ type: 'window' }).then(clients => {
        clients.forEach(client => client.navigate(client.url));
      });
    })
  );
});

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);
  const path = url.pathname;

  // Supabase: sempre rede
  if (url.hostname.includes('supabase.co')) {
    event.respondWith(
      fetch(event.request).catch(() =>
        new Response(JSON.stringify([]), { headers: { 'Content-Type': 'application/json' } })
      )
    );
    return;
  }

  // CDN: cache-first
  if (url.hostname === 'cdn.jsdelivr.net' ||
      url.hostname === 'fonts.googleapis.com' ||
      url.hostname === 'fonts.gstatic.com') {
    event.respondWith(
      caches.open(CACHE_NAME).then(cache =>
        cache.match(event.request).then(cached => cached ||
          fetch(event.request).then(res => {
            if (res.ok) cache.put(event.request, res.clone());
            return res;
          })
        )
      )
    );
    return;
  }

  if (url.origin === self.location.origin) {
    // Rotas do player
    if (PLAYER_ROUTES.includes(path)) {
      event.respondWith(
        caches.open(CACHE_NAME).then(cache =>
          cache.match('/player.html').then(cached => {
            if (cached) return cached;
            return fetch('/player.html').then(res => {
              if (res.ok) cache.put('/player.html', res.clone());
              return res;
            });
          })
        )
      );
      return;
    }

    // Rotas de login
    if (LOGIN_ROUTES.includes(path)) {
      event.respondWith(
        caches.open(CACHE_NAME).then(cache =>
          cache.match('/index.html').then(cached => {
            if (cached) return cached;
            return fetch('/index.html').then(res => {
              if (res.ok) cache.put('/index.html', res.clone());
              return res;
            });
          })
        )
      );
      return;
    }

    // Outros arquivos: cache-first
    event.respondWith(
      caches.open(CACHE_NAME).then(cache =>
        cache.match(event.request).then(cached => {
          if (cached) {
            fetch(event.request).then(res => {
              if (res.ok) cache.put(event.request, res.clone());
            }).catch(() => {});
            return cached;
          }
          return fetch(event.request).then(res => {
            if (res.ok) cache.put(event.request, res.clone());
            return res;
          }).catch(() => cache.match('/player.html'));
        })
      )
    );
    return;
  }

  event.respondWith(fetch(event.request));
});
