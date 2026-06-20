// ============================================================
// Fenda Music — Service Worker v3
// Estratégia: Cache-first para o shell, sem interrupção do player.
//
// PROBLEMA RESOLVIDO:
//   - skipWaiting() + clients.claim() fazem o novo SW tomar
//     controle das abas abertas IMEDIATAMENTE, matando o player.
//   - Agora o novo SW só ativa quando TODAS as abas forem fechadas,
//     OU quando o usuário clicar em "Atualizar" no app.
// ============================================================

const CACHE_NAME = 'fenda-music-v4';

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
  './player-session.js',
  './player-core.js',
  './player-ui.js',
  './player-audio-lyrics.js',
  './player-menus-core.js',
  './player-music-actions.js',
  './player-playlists.js',
  './fonts/material-symbols.css',
  './fonts/material-symbols-rounded.woff2',
];

// ── Instalação: pré-cacheia o shell ───────────────────────────
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[SW] Cacheando shell do app...');
      return Promise.allSettled(
        SHELL_ASSETS.map(url =>
          cache.add(url).catch(err => console.warn('[SW] Não cacheou:', url, err))
        )
      );
    })
  );
  // ❌ NÃO chamar self.skipWaiting() aqui.
  // O novo SW fica em "waiting" até que todas as abas fechem
  // ou o usuário dispare manualmente via postMessage.
});

// ── Ativação: limpa caches antigos ───────────────────────────
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
    )
  );
  // ❌ NÃO chamar self.clients.claim() aqui automaticamente.
  // clients.claim() tomaria controle das abas abertas agora,
  // interrompendo o player. Só fazemos isso a pedido do app.
});

// ── Mensagem do app: "SKIP_WAITING" ──────────────────────────
// O app envia esta mensagem quando o usuário clica em "Atualizar".
// Aí sim ativamos o novo SW imediatamente.
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    console.log('[SW] Usuário solicitou atualização — skipWaiting()');
    self.skipWaiting();
  }
});

// ── Fetch: estratégia por tipo de recurso ─────────────────────
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // Supabase (dados e áudio): sempre rede, sem cache no SW
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

  // Google Fonts: cache first
  if (
    url.hostname === 'fonts.googleapis.com' ||
    url.hostname === 'fonts.gstatic.com'
  ) {
    event.respondWith(
      caches.open(CACHE_NAME).then((cache) =>
        cache.match(event.request).then((cached) => {
          if (cached) return cached;
          return fetch(event.request).then((res) => {
            if (res.ok) cache.put(event.request, res.clone());
            return res;
          }).catch(() => cached);
        })
      )
    );
    return;
  }

  // jsDelivr (SDK Supabase): cache first
  if (url.hostname === 'cdn.jsdelivr.net') {
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

  // Shell local: cache first, rede como fallback
  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) return cached;
      return fetch(event.request).then((res) => {
        if (res.ok && url.origin === self.location.origin) {
          caches.open(CACHE_NAME).then(c => c.put(event.request, res.clone()));
        }
        return res;
      }).catch(() => {
        if (event.request.destination === 'document') {
          return caches.match('./player.html') || caches.match('./index.html');
        }
      });
    })
  );
});
