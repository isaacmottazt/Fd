// themes.js - Sistema de temas COMPLETO v3

class FendaThemes {
  constructor() {
    this.currentTheme = localStorage.getItem('fenda-theme') || 'dark-purple';
    this.themes = {

      'dark-purple': {
        name: 'Roxo Fenda', emoji: '💜', mode: 'dark',
        bg: '#0a0a0f', bg2: '#0f0f1a', bg3: '#07070c',
        surface: '#1c1826', surface2: '#12101c',
        primary: '#7c3aed', primaryHi: '#a855f7', primaryUp: '#c084fc',
        primaryGlow: 'rgba(124,58,237,0.45)', primaryLine: 'rgba(146,76,255,0.25)',
        accent: '#ec4899',
        gradient: 'linear-gradient(135deg, #7c3aed, #ec4899)',
        gradientProfile: 'linear-gradient(135deg, #3b1d8a 0%, #6d28d9 40%, #9333ea 70%, #c026d3 100%)',
        playerBg: 'linear-gradient(145deg, #0c0916 0%, #05030a 100%)',
        playerGrad: 'linear-gradient(160deg, #2a1a4a 0%, #0a0812 60%)',
        navBg: 'rgba(10,10,15,0.92)',
        ink: '#ffffff', inkMid: 'rgba(255,255,255,0.65)',
        inkLow: 'rgba(255,255,255,0.42)', inkFaint: 'rgba(255,255,255,0.22)',
        border: 'rgba(255,255,255,0.06)', borderHi: 'rgba(192,132,252,0.3)',
        cardBg: 'rgba(255,255,255,0.05)', inputBg: 'rgba(255,255,255,0.07)',
      },

      'dark-blue': {
        name: 'Azul Oceano', emoji: '🌊', mode: 'dark',
        bg: '#050d18', bg2: '#081525', bg3: '#040c14',
        surface: '#0e1e30', surface2: '#091625',
        primary: '#2563eb', primaryHi: '#3b82f6', primaryUp: '#60a5fa',
        primaryGlow: 'rgba(37,99,235,0.4)', primaryLine: 'rgba(59,130,246,0.2)',
        accent: '#0ea5e9',
        gradient: 'linear-gradient(135deg, #1d4ed8, #0ea5e9)',
        gradientProfile: 'linear-gradient(135deg, #1e3a8a 0%, #1d4ed8 50%, #0ea5e9 100%)',
        playerBg: 'linear-gradient(145deg, #081525 0%, #040c14 100%)',
        playerGrad: 'linear-gradient(160deg, #0d2240 0%, #050d18 60%)',
        navBg: 'rgba(5,13,24,0.92)',
        ink: '#ffffff', inkMid: 'rgba(255,255,255,0.65)',
        inkLow: 'rgba(255,255,255,0.42)', inkFaint: 'rgba(255,255,255,0.22)',
        border: 'rgba(255,255,255,0.06)', borderHi: 'rgba(96,165,250,0.3)',
        cardBg: 'rgba(255,255,255,0.05)', inputBg: 'rgba(255,255,255,0.07)',
      },

      'dark-green': {
        name: 'Verde Meia-noite', emoji: '🌿', mode: 'dark',
        bg: '#040f09', bg2: '#071a0e', bg3: '#030c07',
        surface: '#0c1e12', surface2: '#08160d',
        primary: '#059669', primaryHi: '#10b981', primaryUp: '#34d399',
        primaryGlow: 'rgba(5,150,105,0.4)', primaryLine: 'rgba(16,185,129,0.2)',
        accent: '#f59e0b',
        gradient: 'linear-gradient(135deg, #047857, #10b981)',
        gradientProfile: 'linear-gradient(135deg, #064e3b 0%, #059669 50%, #10b981 100%)',
        playerBg: 'linear-gradient(145deg, #071a0e 0%, #030c07 100%)',
        playerGrad: 'linear-gradient(160deg, #0a3018 0%, #040f09 60%)',
        navBg: 'rgba(4,15,9,0.92)',
        ink: '#ffffff', inkMid: 'rgba(255,255,255,0.65)',
        inkLow: 'rgba(255,255,255,0.42)', inkFaint: 'rgba(255,255,255,0.22)',
        border: 'rgba(255,255,255,0.06)', borderHi: 'rgba(52,211,153,0.3)',
        cardBg: 'rgba(255,255,255,0.05)', inputBg: 'rgba(255,255,255,0.07)',
      },

      'dark-amber': {
        name: 'Âmbar Quente', emoji: '🔶', mode: 'dark',
        bg: '#100a02', bg2: '#1a1103', bg3: '#0d0802',
        surface: '#1e1504', surface2: '#160f03',
        primary: '#d97706', primaryHi: '#f59e0b', primaryUp: '#fbbf24',
        primaryGlow: 'rgba(217,119,6,0.4)', primaryLine: 'rgba(245,158,11,0.2)',
        accent: '#ef4444',
        gradient: 'linear-gradient(135deg, #b45309, #f59e0b)',
        gradientProfile: 'linear-gradient(135deg, #78350f 0%, #b45309 50%, #f59e0b 100%)',
        playerBg: 'linear-gradient(145deg, #1a1103 0%, #0d0802 100%)',
        playerGrad: 'linear-gradient(160deg, #2d1f05 0%, #100a02 60%)',
        navBg: 'rgba(16,10,2,0.92)',
        ink: '#ffffff', inkMid: 'rgba(255,255,255,0.65)',
        inkLow: 'rgba(255,255,255,0.42)', inkFaint: 'rgba(255,255,255,0.22)',
        border: 'rgba(255,255,255,0.06)', borderHi: 'rgba(251,191,36,0.3)',
        cardBg: 'rgba(255,255,255,0.05)', inputBg: 'rgba(255,255,255,0.07)',
      },

      'oled': {
        name: 'OLED Puro', emoji: '⚫', mode: 'dark',
        bg: '#000000', bg2: '#000000', bg3: '#000000',
        surface: '#0d0d0d', surface2: '#060606',
        primary: '#9333ea', primaryHi: '#a855f7', primaryUp: '#c084fc',
        primaryGlow: 'rgba(147,51,234,0.4)', primaryLine: 'rgba(147,51,234,0.2)',
        accent: '#ec4899',
        gradient: 'linear-gradient(135deg, #7c3aed, #ec4899)',
        gradientProfile: 'linear-gradient(135deg, #3b0764 0%, #7c3aed 50%, #ec4899 100%)',
        playerBg: 'linear-gradient(145deg, #060606 0%, #000000 100%)',
        playerGrad: 'linear-gradient(160deg, #130822 0%, #000000 60%)',
        navBg: 'rgba(0,0,0,0.98)',
        ink: '#ffffff', inkMid: 'rgba(255,255,255,0.65)',
        inkLow: 'rgba(255,255,255,0.42)', inkFaint: 'rgba(255,255,255,0.22)',
        border: 'rgba(255,255,255,0.05)', borderHi: 'rgba(192,132,252,0.25)',
        cardBg: 'rgba(255,255,255,0.04)', inputBg: 'rgba(255,255,255,0.06)',
      },

      'light': {
        name: 'Claro', emoji: '☀️', mode: 'light',
        bg: '#f8f8fc', bg2: '#f2f2f8', bg3: '#ebebf5',
        surface: '#ffffff', surface2: '#f5f5fb',
        primary: '#7c3aed', primaryHi: '#6d28d9', primaryUp: '#5b21b6',
        primaryGlow: 'rgba(124,58,237,0.25)', primaryLine: 'rgba(124,58,237,0.15)',
        accent: '#db2777',
        gradient: 'linear-gradient(135deg, #7c3aed, #db2777)',
        gradientProfile: 'linear-gradient(135deg, #3b1d8a 0%, #6d28d9 40%, #9333ea 70%, #c026d3 100%)',
        playerBg: 'linear-gradient(145deg, #ede9fe 0%, #fdf4ff 100%)',
        playerGrad: 'linear-gradient(160deg, #ddd6fe 0%, #faf5ff 60%)',
        navBg: 'rgba(248,248,252,0.95)',
        ink: '#1a1a2e', inkMid: 'rgba(26,26,46,0.65)',
        inkLow: 'rgba(26,26,46,0.45)', inkFaint: 'rgba(26,26,46,0.28)',
        border: 'rgba(0,0,0,0.08)', borderHi: 'rgba(124,58,237,0.25)',
        cardBg: 'rgba(0,0,0,0.03)', inputBg: 'rgba(0,0,0,0.05)',
      },

      'light-warm': {
        name: 'Bege Suave', emoji: '🤍', mode: 'light',
        bg: '#faf8f5', bg2: '#f5f0ea', bg3: '#ede8e0',
        surface: '#ffffff', surface2: '#f9f6f1',
        primary: '#92400e', primaryHi: '#b45309', primaryUp: '#d97706',
        primaryGlow: 'rgba(146,64,14,0.2)', primaryLine: 'rgba(180,83,9,0.15)',
        accent: '#be185d',
        gradient: 'linear-gradient(135deg, #92400e, #b45309)',
        gradientProfile: 'linear-gradient(135deg, #78350f 0%, #92400e 50%, #b45309 100%)',
        playerBg: 'linear-gradient(145deg, #fef3c7 0%, #fffbeb 100%)',
        playerGrad: 'linear-gradient(160deg, #fde68a 0%, #fef9ee 60%)',
        navBg: 'rgba(250,248,245,0.95)',
        ink: '#1c1917', inkMid: 'rgba(28,25,23,0.65)',
        inkLow: 'rgba(28,25,23,0.45)', inkFaint: 'rgba(28,25,23,0.28)',
        border: 'rgba(0,0,0,0.07)', borderHi: 'rgba(180,83,9,0.2)',
        cardBg: 'rgba(0,0,0,0.025)', inputBg: 'rgba(0,0,0,0.04)',
      },
    };

    this.styleEl = null;
    this.init();
  }

  init() {
    this.styleEl = document.createElement('style');
    this.styleEl.id = 'fenda-theme-css';
    document.head.appendChild(this.styleEl);
    this.applyTheme(this.currentTheme);
  }

  applyTheme(name) {
    const t = this.themes[name];
    if (!t) return;
    const L = t.mode === 'light';

    this.styleEl.textContent = `
      body { background:${t.bg}!important; color:${t.ink}!important; }
      .app-container { background:linear-gradient(180deg,${t.bg2} 0%,${t.bg3} 100%)!important; }

      /* NAV */
      .nav-bar { background:${t.navBg}!important; border-top-color:${t.border}!important; }
      .nav-btn { color:${t.inkFaint}!important; }
      .nav-btn.active { color:${t.primary}!important; }
      .nav-btn p,.nav-btn span { color:inherit!important; }

      /* MINI PLAYER */
      .player-bottom-bar { background:${L?'rgba(255,255,255,0.88)':'rgba(18,12,30,0.7)'}!important; box-shadow:0 8px 32px rgba(0,0,0,0.25),0 0 0 1px ${t.primary}28!important; }
      .mini-ring-fill { stroke:${t.primaryHi}!important; }
      .mini-ctrl-play { background:${t.primary}!important; box-shadow:0 2px 12px ${t.primaryGlow}!important; }
      .mini-info h4 { color:${t.ink}!important; }
      .mini-info p { color:${t.inkMid}!important; }

      /* PLAYER EXPANDIDO */
      .lyrics-full-screen { background:${t.playerBg}!important; }
      .player-bg { background:${t.playerGrad}!important; }
      .ctrl-play { background:${t.gradient}!important; box-shadow:0 4px 20px ${t.primaryGlow}!important; }
      .player-seek-fill { background:${t.primary}!important; }
      .player-seek-thumb { background:${t.primary}!important; }
      .player-mini-controls { background:${L?'rgba(248,248,252,0.97)':'rgba(6,4,14,0.97)'}!important; border-top-color:${t.primary}18!important; }
      .player-mini-play { background:${t.gradient}!important; }
      .player-mini-info span:first-child { color:${t.ink}!important; }
      .player-mini-info span:last-child { color:${t.inkLow}!important; }
      .player-top-meta span,.player-top-context,.player-top-playlist { color:${L?t.inkMid:'rgba(255,255,255,0.6)'}!important; }
      #playerExpandedTitle { color:${L?t.ink:'#fff'}!important; }
      #playerExpandedArtist { color:${L?t.inkMid:'rgba(255,255,255,0.6)'}!important; }
      #currentTime,#totalTime { color:${t.inkLow}!important; }
      .ctrl-extra,.ctrl-main { color:${L?t.inkMid:'rgba(255,255,255,0.7)'}!important; }
      .player-fav-big { color:${L?t.inkLow:'rgba(255,255,255,0.5)'}!important; }
      .player-action-btn { color:${L?t.inkLow:'rgba(255,255,255,0.5)'}!important; }
      .player-lyrics-header { color:${t.inkMid}!important; }
      .lyrics-container-content p { color:${L?t.inkLow:'rgba(255,255,255,0.35)'}!important; }
      .lyrics-container-content p.active { color:${L?t.ink:'#fff'}!important; }

      /* MODAIS */
      .modal-content-box { background:${t.surface}!important; color:${t.ink}!important; }
      .modal-content-box h3 { color:${t.ink}!important; }
      .context-menu-modal { background:${t.surface2}!important; }
      .modal-btn-ok { background:${t.gradient}!important; color:#fff!important; }
      .modal-btn-cancel { background:${L?'rgba(0,0,0,0.06)':'rgba(255,255,255,0.07)'}!important; color:${t.inkMid}!important; }
      input,textarea { background:${t.inputBg}!important; color:${t.ink}!important; border-color:${t.border}!important; }
      input::placeholder,textarea::placeholder { color:${t.inkFaint}!important; }

      /* CONTEXT MENU */
      .ctx-title { color:${t.ink}!important; }
      .ctx-artist { color:${t.inkLow}!important; }
      .ctx-btn { color:${L?t.ink:'#f0eaff'}!important; }
      .ctx-btn:active { background:${t.primary}18!important; }
      .ctx-icon-purple { background:${t.primary}22!important; color:${t.primaryHi}!important; }
      .ctx-icon-blue { background:rgba(59,130,246,0.15)!important; }
      .ctx-icon-pink { background:rgba(244,114,182,0.15)!important; }
      .ctx-icon-green { background:rgba(52,211,153,0.15)!important; }
      .ctx-divider { background:${t.border}!important; }

      /* FEATURED */
      .featured-card { background:${t.gradient}!important; }
      .featured-badge { background:rgba(255,255,255,0.2)!important; border-color:rgba(255,255,255,0.3)!important; color:#fff!important; }
      .featured-content h2 { color:#fff!important; }
      .featured-content p { color:rgba(255,255,255,0.75)!important; }
      .featured-play-btn { background:#fff!important; color:#1a0050!important; }

      /* INÍCIO */
      .section-header h2 { color:${t.ink}!important; }
      .section-see-all { color:${t.primaryHi}!important; }
      .home-section { color:${t.ink}!important; }

      /* CARDS DE MÚSICAS/ARTISTAS */
      .recent-song-card,.playlist-card,.music-card { background:${t.surface}!important; }
      .recent-song-title,.song-title,.track-title { color:${t.ink}!important; }
      .recent-song-artist,.song-artist,.track-artist { color:${t.inkLow}!important; }
      .artist-name { color:${t.ink}!important; }
      .artist-plays,.plays-badge { color:${t.primary}!important; background:${t.primary}18!important; }

      /* BIBLIOTECA */
      #biblioteca {
        --lib-violet:${t.primary};
        --lib-violet-hi:${t.primaryHi};
        --lib-violet-up:${t.primaryUp};
        --lib-violet-glow:${t.primaryGlow};
        --lib-magenta:${t.accent};
        --lib-ink:${t.ink};
        --lib-ink-mid:${t.inkMid};
        --lib-ink-low:${t.inkLow};
        --lib-ink-faint:${t.inkFaint};
        --lib-surface:${L?'rgba(255,255,255,0.9)':'rgba(22,18,38,0.78)'};
        --lib-surface-2:${t.surface};
        --lib-border:${t.border};
        --lib-border-hi:${t.borderHi};
        --lib-surface-hi:${t.cardBg};
      }
      .lib-main-tab { color:${t.inkLow}!important; background:${t.cardBg}!important; }
      .lib-main-tab.active { background:${t.primary}!important; color:#fff!important; }
      .library-header h1 { color:${t.ink}!important; }
      .lib-icon-btn { color:${t.inkMid}!important; }
      .summary-card { background:${t.cardBg}!important; }
      .summary-card h3 { color:${t.primary}!important; }
      .summary-card p { color:${t.inkLow}!important; }
      .playlist-play-all-btn { background:${t.primary}!important; color:#fff!important; }
      .playlist-shuffle-btn { border-color:${t.primary}!important; color:${t.primaryHi}!important; background:${t.primary}10!important; }
      .playlist-detail-name,.playlist-detail-count { color:${t.ink}!important; }

      /* BUSCA */
      .search-top { background:linear-gradient(180deg,${t.bg} 0%,transparent 100%)!important; }
      .search-bar-new { background:${t.inputBg}!important; border-color:${t.border}!important; }
      .search-bar-new:focus-within { border-color:${t.primary}!important; }
      #globalSearchInput { color:${t.ink}!important; }
      #globalSearchInput::placeholder { color:${t.inkFaint}!important; }
      .search-icon-static { color:${t.primaryHi}!important; }
      .search-section-header span:first-child { color:${t.inkMid}!important; font-size:12px!important; letter-spacing:0.05em!important; }
      .search-section-header button { color:${t.primaryHi}!important; }
      .recent-search-item { color:${t.ink}!important; background:${t.cardBg}!important; border-color:${t.border}!important; }
      .recent-search-icon { color:${t.inkFaint}!important; }
      .search-result-item { color:${t.ink}!important; }
      .search-result-artist { color:${t.inkLow}!important; }

      /* PERFIL */
      .profile-banner { background:${t.gradientProfile}!important; }
      .profile-stats-row { background:${t.cardBg}!important; border-color:${t.border}!important; }
      .profile-stat-num { color:${t.primary}!important; }
      .profile-stat-label { color:${t.inkLow}!important; }
      .profile-stat-divider { background:${t.border}!important; }
      .profile-edit-chip { border-color:${t.primary}55!important; color:${t.primaryHi}!important; background:${t.primary}12!important; }
      .profile-menu { background:${t.cardBg}!important; border-color:${t.border}!important; }
      .profile-menu-item { color:${t.ink}!important; }
      .profile-menu-item:active { background:${t.primary}14!important; }
      .profile-menu-title { color:${t.ink}!important; }
      .profile-menu-sub { color:${t.inkLow}!important; }
      .profile-menu-arrow { color:${t.inkFaint}!important; }
      #profileName { color:${t.ink}!important; }
      #profileUsername { color:${t.inkLow}!important; }
      #profileBio { color:${t.inkMid}!important; }
      .profile-logout-btn { background:rgba(239,68,68,0.1)!important; color:#ef4444!important; border-color:rgba(239,68,68,0.2)!important; }

      /* NOTIFICAÇÕES */
      .notifications-overlay { background:${t.bg}!important; }
      .notif-header { border-bottom-color:${t.border}!important; }
      .notif-header-icon { color:${t.primaryUp}!important; }
      .notif-header h1 { color:${t.ink}!important; }
      .notif-tab { color:${t.inkLow}!important; border-bottom-color:transparent!important; }
      .notif-tab.active { color:${t.primaryHi}!important; border-bottom-color:${t.primaryHi}!important; }
      .notif-close-btn { color:${t.inkMid}!important; background:${t.cardBg}!important; }
      .notif-prompt-card { background:${t.primary}22!important; border-color:${t.borderHi}!important; }
      .notif-activate-btn { background:${t.gradient}!important; color:#fff!important; }

      /* QUEUE PANEL */
      .queue-panel { background:${L?t.surface2:'linear-gradient(160deg,#0e0b1a 0%,#080612 100%)'}!important; border-left-color:${t.primary}33!important; }
      .queue-panel-header h3 { color:${t.ink}!important; }
      .qp-item { color:${t.ink}!important; }
      .qp-playing-bar { background:${t.gradient}!important; }

      /* ARTIST DETAIL */
      .artist-detail-overlay,.ado-container { background:${t.bg}!important; }

      /* TOAST */
      .premium-toast { background:${t.surface}!important; color:${t.ink}!important; }
    `;

    localStorage.setItem('fenda-theme', name);
    this.currentTheme = name;

    const modal = document.getElementById('themesModal');
    if (modal) setTimeout(() => { modal.style.display='none'; }, 350);
  }

  renderThemePicker() {
    const groups = [
      { label: '🌙 Escuros', keys: ['dark-purple','dark-blue','dark-green','dark-amber','oled'] },
      { label: '☀️ Claros', keys: ['light','light-warm'] },
    ];

    return `
      <div>
        <h3 style="margin:0 0 18px;font-size:19px;font-weight:800">🎨 Temas</h3>
        ${groups.map(g => `
          <p style="font-size:11px;font-weight:700;letter-spacing:0.08em;opacity:0.5;margin:0 0 10px;text-transform:uppercase">${g.label}</p>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:18px">
            ${g.keys.map(key => {
              const t = this.themes[key];
              const active = this.currentTheme === key;
              return `
                <button onclick="fendaThemes.applyTheme('${key}')" style="
                  display:flex;align-items:center;gap:10px;padding:11px 12px;
                  border:2px solid ${active ? t.primary : 'rgba(128,128,128,0.15)'};
                  border-radius:14px;
                  background:${active ? t.primary+'18' : 'rgba(128,128,128,0.06)'};
                  cursor:pointer;text-align:left;transition:all 0.18s;
                ">
                  <div style="width:34px;height:34px;border-radius:9px;flex-shrink:0;background:${t.gradient};display:flex;align-items:center;justify-content:center;font-size:16px">${t.emoji}</div>
                  <div style="min-width:0">
                    <div style="font-size:13px;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${t.name}</div>
                    ${active ? `<div style="font-size:11px;color:${t.primary};margin-top:1px">✓ Ativo</div>` : ''}
                  </div>
                </button>
              `;
            }).join('')}
          </div>
        `).join('')}
      </div>
    `;
  }
}

const fendaThemes = new FendaThemes();
