// themes.js v4 - Simples e elegante

class FendaThemes {
  constructor() {
    this.currentTheme = localStorage.getItem('fenda-theme') || 'dark-purple';
    this.themes = {

      // ── ESCUROS ──
      'dark-purple': {
        name: 'Roxo Fenda', emoji: '💜', mode: 'dark',
        bg: '#0a0a0f', bg2: '#0f0f1a', bg3: '#07070c',
        surface: '#1c1826', surface2: '#12101c',
        primary: '#7c3aed', primaryHi: '#a855f7', primaryUp: '#c084fc',
        primaryGlow: 'rgba(124,58,237,0.45)',
        accent: '#ec4899',
        gradient: 'linear-gradient(135deg, #7c3aed, #ec4899)',
        gradientProfile: 'linear-gradient(135deg, #3b1d8a, #6d28d9, #9333ea, #c026d3)',
        playerBg: 'linear-gradient(145deg, #0c0916, #05030a)',
        playerGrad: 'linear-gradient(160deg, #2a1a4a, #0a0812)',
        navBg: 'rgba(10,10,15,0.92)',
        ink: '#ffffff', inkMid: 'rgba(255,255,255,0.65)',
        inkLow: 'rgba(255,255,255,0.40)', inkFaint: 'rgba(255,255,255,0.22)',
        border: 'rgba(255,255,255,0.06)', borderHi: 'rgba(192,132,252,0.3)',
        cardBg: 'rgba(255,255,255,0.05)', inputBg: 'rgba(255,255,255,0.07)',
      },

      'oled': {
        name: 'OLED Preto', emoji: '⚫', mode: 'dark',
        bg: '#000000', bg2: '#000000', bg3: '#000000',
        surface: '#0d0d0d', surface2: '#080808',
        primary: '#9333ea', primaryHi: '#a855f7', primaryUp: '#c084fc',
        primaryGlow: 'rgba(147,51,234,0.4)',
        accent: '#ec4899',
        gradient: 'linear-gradient(135deg, #7c3aed, #ec4899)',
        gradientProfile: 'linear-gradient(135deg, #3b0764, #7c3aed, #ec4899)',
        playerBg: 'linear-gradient(145deg, #080808, #000000)',
        playerGrad: 'linear-gradient(160deg, #130822, #000000)',
        navBg: 'rgba(0,0,0,0.98)',
        ink: '#ffffff', inkMid: 'rgba(255,255,255,0.65)',
        inkLow: 'rgba(255,255,255,0.40)', inkFaint: 'rgba(255,255,255,0.22)',
        border: 'rgba(255,255,255,0.05)', borderHi: 'rgba(192,132,252,0.25)',
        cardBg: 'rgba(255,255,255,0.04)', inputBg: 'rgba(255,255,255,0.06)',
      },

      // ── CLAROS ──
      'light-purple': {
        name: 'Lavanda', emoji: '🪻', mode: 'light',
        bg: '#faf9ff', bg2: '#f4f2ff', bg3: '#ede9ff',
        surface: '#ffffff', surface2: '#f8f6ff',
        primary: '#6d28d9', primaryHi: '#7c3aed', primaryUp: '#8b5cf6',
        primaryGlow: 'rgba(109,40,217,0.2)',
        accent: '#db2777',
        gradient: 'linear-gradient(135deg, #6d28d9, #db2777)',
        gradientProfile: 'linear-gradient(135deg, #3b1d8a, #6d28d9, #9333ea, #c026d3)',
        playerBg: 'linear-gradient(145deg, #ede9ff, #faf9ff)',
        playerGrad: 'linear-gradient(160deg, #ddd6fe, #f5f3ff)',
        navBg: 'rgba(250,249,255,0.95)',
        ink: '#1e1b4b', inkMid: 'rgba(30,27,75,0.65)',
        inkLow: 'rgba(30,27,75,0.45)', inkFaint: 'rgba(30,27,75,0.28)',
        border: 'rgba(109,40,217,0.1)', borderHi: 'rgba(109,40,217,0.25)',
        cardBg: 'rgba(109,40,217,0.05)', inputBg: 'rgba(109,40,217,0.06)',
      },

      'light-gray': {
        name: 'Cinza Neutro', emoji: '🩶', mode: 'light',
        bg: '#f7f7f8', bg2: '#f0f0f2', bg3: '#e8e8eb',
        surface: '#ffffff', surface2: '#f5f5f7',
        primary: '#7c3aed', primaryHi: '#6d28d9', primaryUp: '#5b21b6',
        primaryGlow: 'rgba(124,58,237,0.2)',
        accent: '#ec4899',
        gradient: 'linear-gradient(135deg, #7c3aed, #ec4899)',
        gradientProfile: 'linear-gradient(135deg, #3b1d8a, #6d28d9, #9333ea, #c026d3)',
        playerBg: 'linear-gradient(145deg, #e8e8eb, #f7f7f8)',
        playerGrad: 'linear-gradient(160deg, #ddd6fe, #f0f0f2)',
        navBg: 'rgba(247,247,248,0.95)',
        ink: '#111113', inkMid: 'rgba(17,17,19,0.6)',
        inkLow: 'rgba(17,17,19,0.42)', inkFaint: 'rgba(17,17,19,0.26)',
        border: 'rgba(0,0,0,0.08)', borderHi: 'rgba(124,58,237,0.2)',
        cardBg: 'rgba(0,0,0,0.03)', inputBg: 'rgba(0,0,0,0.05)',
      },

      'light-warm': {
        name: 'Creme Suave', emoji: '🤍', mode: 'light',
        bg: '#faf8f5', bg2: '#f5f1ea', bg3: '#ede8df',
        surface: '#ffffff', surface2: '#faf7f2',
        primary: '#7c3aed', primaryHi: '#6d28d9', primaryUp: '#5b21b6',
        primaryGlow: 'rgba(124,58,237,0.2)',
        accent: '#db2777',
        gradient: 'linear-gradient(135deg, #7c3aed, #db2777)',
        gradientProfile: 'linear-gradient(135deg, #3b1d8a, #6d28d9, #9333ea, #c026d3)',
        playerBg: 'linear-gradient(145deg, #f5f1ea, #faf8f5)',
        playerGrad: 'linear-gradient(160deg, #ede8df, #faf8f5)',
        navBg: 'rgba(250,248,245,0.95)',
        ink: '#1c1917', inkMid: 'rgba(28,25,23,0.62)',
        inkLow: 'rgba(28,25,23,0.42)', inkFaint: 'rgba(28,25,23,0.26)',
        border: 'rgba(0,0,0,0.07)', borderHi: 'rgba(124,58,237,0.18)',
        cardBg: 'rgba(0,0,0,0.025)', inputBg: 'rgba(0,0,0,0.04)',
      },

      'light-mint': {
        name: 'Menta', emoji: '🌱', mode: 'light',
        bg: '#f4faf7', bg2: '#eaf5f0', bg3: '#ddeee6',
        surface: '#ffffff', surface2: '#f2faf6',
        primary: '#059669', primaryHi: '#047857', primaryUp: '#065f46',
        primaryGlow: 'rgba(5,150,105,0.2)',
        accent: '#7c3aed',
        gradient: 'linear-gradient(135deg, #047857, #059669)',
        gradientProfile: 'linear-gradient(135deg, #064e3b, #059669, #34d399)',
        playerBg: 'linear-gradient(145deg, #ddeee6, #f4faf7)',
        playerGrad: 'linear-gradient(160deg, #bbf7d0, #f0fdf4)',
        navBg: 'rgba(244,250,247,0.95)',
        ink: '#052e16', inkMid: 'rgba(5,46,22,0.62)',
        inkLow: 'rgba(5,46,22,0.42)', inkFaint: 'rgba(5,46,22,0.26)',
        border: 'rgba(5,150,105,0.1)', borderHi: 'rgba(5,150,105,0.25)',
        cardBg: 'rgba(5,150,105,0.05)', inputBg: 'rgba(5,150,105,0.06)',
      },

      'light-rose': {
        name: 'Rosa Pétala', emoji: '🌸', mode: 'light',
        bg: '#fff5f8', bg2: '#ffecf2', bg3: '#ffe0eb',
        surface: '#ffffff', surface2: '#fff8fb',
        primary: '#be185d', primaryHi: '#9d174d', primaryUp: '#831843',
        primaryGlow: 'rgba(190,24,93,0.2)',
        accent: '#7c3aed',
        gradient: 'linear-gradient(135deg, #be185d, #9d174d)',
        gradientProfile: 'linear-gradient(135deg, #831843, #be185d, #f472b6)',
        playerBg: 'linear-gradient(145deg, #ffe0eb, #fff5f8)',
        playerGrad: 'linear-gradient(160deg, #fecdd3, #fff1f2)',
        navBg: 'rgba(255,245,248,0.95)',
        ink: '#4a0020', inkMid: 'rgba(74,0,32,0.62)',
        inkLow: 'rgba(74,0,32,0.42)', inkFaint: 'rgba(74,0,32,0.26)',
        border: 'rgba(190,24,93,0.1)', borderHi: 'rgba(190,24,93,0.25)',
        cardBg: 'rgba(190,24,93,0.05)', inputBg: 'rgba(190,24,93,0.06)',
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
      body{background:${t.bg}!important;color:${t.ink}!important}
      .app-container{background:linear-gradient(180deg,${t.bg2} 0%,${t.bg3} 100%)!important}

      /* NAV */
      .nav-bar{background:${t.navBg}!important;border-top-color:${t.border}!important}
      .nav-btn{color:${t.inkFaint}!important}
      .nav-btn.active{color:${t.primary}!important}
      .nav-btn p,.nav-btn span{color:inherit!important}

      /* MINI PLAYER */
      .player-bottom-bar{background:${L?'rgba(255,255,255,0.9)':'rgba(18,12,30,0.75)'}!important;box-shadow:0 8px 32px rgba(0,0,0,0.2),0 0 0 1px ${t.primary}22!important}
      .mini-ring-fill{stroke:${t.primaryHi}!important}
      .mini-ctrl-play{background:${t.primary}!important;box-shadow:0 2px 12px ${t.primaryGlow}!important}
      .mini-info h4{color:${t.ink}!important}
      .mini-info p{color:${t.inkMid}!important}

      /* PLAYER EXPANDIDO */
      .lyrics-full-screen{background:${t.playerBg}!important}
      .player-bg{background:${t.playerGrad}!important}
      .ctrl-play{background:${t.gradient}!important;box-shadow:0 4px 20px ${t.primaryGlow}!important}
      .player-seek-fill{background:${t.primary}!important}
      .player-seek-thumb{background:${t.primary}!important}
      .player-mini-controls{background:${L?t.surface+'f7':'rgba(6,4,14,0.97)'}!important;border-top-color:${t.primary}14!important}
      .player-mini-play{background:${t.gradient}!important}
      .player-mini-info span:first-child{color:${t.ink}!important}
      .player-mini-info span:last-child{color:${t.inkLow}!important}
      #playerExpandedTitle{color:${L?t.ink:'#fff'}!important}
      #playerExpandedArtist{color:${L?t.inkMid:'rgba(255,255,255,0.6)'}!important}
      #currentTime,#totalTime{color:${t.inkLow}!important}
      .ctrl-extra,.ctrl-main{color:${L?t.inkMid:'rgba(255,255,255,0.7)'}!important}
      .player-fav-big,.player-action-btn{color:${L?t.inkLow:'rgba(255,255,255,0.5)'}!important}
      .player-lyrics-header{color:${t.inkMid}!important}
      .lyrics-container-content p{color:${L?t.inkFaint:'rgba(255,255,255,0.32)'}!important}
      .lyrics-container-content p.active{color:${t.ink}!important}
      .player-top-context,.player-top-playlist{color:${t.inkMid}!important}

      /* MODAIS */
      .modal-content-box{background:${t.surface}!important;color:${t.ink}!important}
      .modal-content-box h3{color:${t.ink}!important}
      .context-menu-modal{background:${t.surface2}!important}
      .modal-btn-ok{background:${t.gradient}!important;color:#fff!important}
      .modal-btn-cancel{background:${t.cardBg}!important;color:${t.inkMid}!important}
      input,textarea{background:${t.inputBg}!important;color:${t.ink}!important;border-color:${t.border}!important}
      input::placeholder,textarea::placeholder{color:${t.inkFaint}!important}

      /* CONTEXT MENU */
      .ctx-title{color:${t.ink}!important}
      .ctx-artist{color:${t.inkLow}!important}
      .ctx-btn{color:${t.ink}!important}
      .ctx-btn:active{background:${t.primary}14!important}
      .ctx-icon-purple{background:${t.primary}20!important;color:${t.primaryHi}!important}
      .ctx-divider{background:${t.border}!important}
      .context-menu-modal::before{background:${t.border}!important}

      /* FEATURED */
      .featured-card{background:${t.gradient}!important}
      .featured-badge{background:rgba(255,255,255,0.2)!important;border-color:rgba(255,255,255,0.3)!important;color:#fff!important}
      .featured-content h2{color:#fff!important}
      .featured-content p{color:rgba(255,255,255,0.75)!important}
      .featured-play-btn{background:#fff!important;color:#1a0050!important}

      /* INÍCIO */
      .section-header h2{color:${t.ink}!important}
      .section-see-all{color:${t.primaryHi}!important}

      /* BIBLIOTECA */
      #biblioteca{
        --lib-violet:${t.primary};--lib-violet-hi:${t.primaryHi};--lib-violet-up:${t.primaryUp};
        --lib-violet-glow:${t.primaryGlow};--lib-magenta:${t.accent};
        --lib-ink:${t.ink};--lib-ink-mid:${t.inkMid};--lib-ink-low:${t.inkLow};--lib-ink-faint:${t.inkFaint};
        --lib-surface:${L?'rgba(255,255,255,0.9)':'rgba(22,18,38,0.78)'};
        --lib-surface-2:${t.surface};--lib-border:${t.border};--lib-border-hi:${t.borderHi};
        --lib-surface-hi:${t.cardBg};
      }
      .lib-main-tab{color:${t.inkLow}!important;background:${t.cardBg}!important}
      .lib-main-tab.active{background:${t.primary}!important;color:#fff!important}
      .library-header h1{color:${t.ink}!important}
      .lib-icon-btn{color:${t.inkMid}!important}
      .summary-card{background:${t.cardBg}!important}
      .summary-card h3{color:${t.primary}!important}
      .summary-card p{color:${t.inkLow}!important}
      .playlist-play-all-btn{background:${t.primary}!important;color:#fff!important}
      .playlist-shuffle-btn{border-color:${t.primary}!important;color:${t.primaryHi}!important;background:${t.primary}10!important}
      #playlistDetailName,#playlistDetailCount{color:${t.ink}!important}

      /* BUSCA */
      .search-top{background:linear-gradient(180deg,${t.bg} 0%,transparent 100%)!important}
      .search-bar-new{background:${t.inputBg}!important;border-color:${t.border}!important}
      .search-bar-new:focus-within{border-color:${t.primary}!important}
      #globalSearchInput{color:${t.ink}!important}
      #globalSearchInput::placeholder{color:${t.inkFaint}!important}
      .search-icon-static{color:${t.inkLow}!important}
      .search-section-header span:first-child{color:${t.inkLow}!important}
      .search-section-header button{color:${t.primaryHi}!important}
      .recent-search-item{color:${t.ink}!important;background:${t.cardBg}!important;border-color:${t.border}!important}

      /* PERFIL */
      .profile-banner{background:${t.gradientProfile}!important}
      .profile-stats-row{background:${t.cardBg}!important;border-color:${t.border}!important}
      .profile-stat-num{color:${t.primary}!important}
      .profile-stat-label{color:${t.inkLow}!important}
      .profile-stat-divider{background:${t.border}!important}
      .profile-edit-chip{border-color:${t.primary}44!important;color:${t.primary}!important;background:${t.primary}10!important}
      .profile-menu{background:${t.cardBg}!important;border-color:${t.border}!important}
      .profile-menu-item:active{background:${t.primary}10!important}
      .profile-menu-title{color:${t.ink}!important}
      .profile-menu-sub{color:${t.inkLow}!important}
      .profile-menu-arrow{color:${t.inkFaint}!important}
      #profileName{color:${t.ink}!important}
      #profileUsername{color:${t.inkLow}!important}
      #profileBio{color:${t.inkMid}!important}
      .profile-logout-btn{background:rgba(239,68,68,0.08)!important;color:#dc2626!important}

      /* NOTIFICAÇÕES */
      .notifications-overlay{background:${t.bg}!important}
      .notif-header{border-bottom-color:${t.border}!important}
      .notif-header-icon{color:${t.primaryHi}!important}
      .notif-header h1{color:${t.ink}!important}
      .notif-tab{color:${t.inkLow}!important}
      .notif-tab.active{color:${t.primaryHi}!important;border-bottom-color:${t.primaryHi}!important}
      .notif-close-btn{color:${t.inkMid}!important;background:${t.cardBg}!important}
      .notif-prompt-card{background:${t.primary}18!important;border-color:${t.borderHi}!important}
      .notif-activate-btn{background:${t.gradient}!important;color:#fff!important}

      /* QUEUE PANEL */
      .queue-panel{background:${L?t.surface2:'linear-gradient(160deg,#0e0b1a,#080612)'}!important;border-left-color:${t.primary}28!important}
      .queue-panel-header h3{color:${t.ink}!important}
      .qp-playing-bar{background:${t.gradient}!important}

      /* TOAST */
      .premium-toast{background:${t.surface}!important;color:${t.ink}!important}
    `;

    localStorage.setItem('fenda-theme', name);
    this.currentTheme = name;

    const modal = document.getElementById('themesModal');
    if (modal) setTimeout(() => { modal.style.display='none'; }, 350);
  }

  renderThemePicker() {
    const groups = [
      { label: 'Escuros', keys: ['dark-purple','oled'] },
      { label: 'Claros', keys: ['light-purple','light-gray','light-warm','light-mint','light-rose'] },
    ];

    return `
      <div>
        <h3 style="margin:0 0 20px;font-size:19px;font-weight:800">🎨 Temas</h3>
        ${groups.map(g => `
          <p style="font-size:11px;font-weight:700;letter-spacing:0.07em;opacity:0.45;margin:0 0 10px;text-transform:uppercase">${g.label}</p>
          <div style="display:flex;flex-direction:column;gap:8px;margin-bottom:20px">
            ${g.keys.map(key => {
              const t = this.themes[key];
              const active = this.currentTheme === key;
              return `
                <button onclick="fendaThemes.applyTheme('${key}')" style="
                  display:flex;align-items:center;gap:12px;padding:12px 14px;
                  border:1.5px solid ${active ? t.primary : 'rgba(128,128,128,0.15)'};
                  border-radius:14px;
                  background:${active ? t.primary+'15' : 'rgba(128,128,128,0.06)'};
                  cursor:pointer;text-align:left;transition:all 0.18s;width:100%;
                ">
                  <div style="width:38px;height:38px;border-radius:10px;flex-shrink:0;background:${t.gradient};display:flex;align-items:center;justify-content:center;font-size:20px">${t.emoji}</div>
                  <span style="font-size:14px;font-weight:600;flex:1">${t.name}</span>
                  ${active ? `<span style="font-size:12px;color:${t.primary};font-weight:700">✓</span>` : ''}
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
