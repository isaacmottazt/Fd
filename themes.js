// themes.js - Sistema de temas COMPLETO

class FendaThemes {
  constructor() {
    this.currentTheme = localStorage.getItem('fenda-theme') || 'dark-purple';
    this.themes = {
      'dark-purple': {
        name: 'Roxo Fenda', emoji: '💜',
        bg1: '#0a0a0f', bg2: '#0f0f1a', bg3: '#07070c',
        surface: '#1c1826', surface2: '#12101c',
        primary: '#7c3aed', primary2: '#a855f7', primaryGlow: 'rgba(124,58,237,0.5)',
        accent: '#ec4899',
        gradient: 'linear-gradient(135deg, #7c3aed, #ec4899)',
        playerBg: 'linear-gradient(145deg, #0c0916 0%, #05030a 100%)',
        playerGrad: 'linear-gradient(160deg, #2a1a4a 0%, #0a0812 60%)',
        navBg: 'rgba(10,10,15,0.9)',
        text: '#ffffff', textMuted: 'rgba(255,255,255,0.45)',
        border: 'rgba(255,255,255,0.05)',
        mode: 'dark',
      },
      'dark-blue': {
        name: 'Azul Noturno', emoji: '🔵',
        bg1: '#030a14', bg2: '#071020', bg3: '#020810',
        surface: '#0f1c2e', surface2: '#0a1420',
        primary: '#3b82f6', primary2: '#60a5fa', primaryGlow: 'rgba(59,130,246,0.5)',
        accent: '#06b6d4',
        gradient: 'linear-gradient(135deg, #3b82f6, #06b6d4)',
        playerBg: 'linear-gradient(145deg, #071020 0%, #020810 100%)',
        playerGrad: 'linear-gradient(160deg, #0d2a4a 0%, #020c18 60%)',
        navBg: 'rgba(3,10,20,0.9)',
        text: '#ffffff', textMuted: 'rgba(255,255,255,0.45)',
        border: 'rgba(255,255,255,0.05)',
        mode: 'dark',
      },
      'dark-green': {
        name: 'Verde Floresta', emoji: '💚',
        bg1: '#030f0a', bg2: '#071a0f', bg3: '#020c07',
        surface: '#0f2018', surface2: '#0a1810',
        primary: '#10b981', primary2: '#34d399', primaryGlow: 'rgba(16,185,129,0.5)',
        accent: '#f59e0b',
        gradient: 'linear-gradient(135deg, #10b981, #f59e0b)',
        playerBg: 'linear-gradient(145deg, #071a0f 0%, #020c07 100%)',
        playerGrad: 'linear-gradient(160deg, #0d3a20 0%, #020e08 60%)',
        navBg: 'rgba(3,15,10,0.9)',
        text: '#ffffff', textMuted: 'rgba(255,255,255,0.45)',
        border: 'rgba(255,255,255,0.05)',
        mode: 'dark',
      },
      'dark-pink': {
        name: 'Rosa Neon', emoji: '🩷',
        bg1: '#100510', bg2: '#1a0a1a', bg3: '#0c030c',
        surface: '#200f20', surface2: '#180a18',
        primary: '#ec4899', primary2: '#f472b6', primaryGlow: 'rgba(236,72,153,0.5)',
        accent: '#8b5cf6',
        gradient: 'linear-gradient(135deg, #ec4899, #8b5cf6)',
        playerBg: 'linear-gradient(145deg, #1a0a1a 0%, #0c030c 100%)',
        playerGrad: 'linear-gradient(160deg, #3a0d2a 0%, #100510 60%)',
        navBg: 'rgba(16,5,16,0.9)',
        text: '#ffffff', textMuted: 'rgba(255,255,255,0.45)',
        border: 'rgba(255,255,255,0.05)',
        mode: 'dark',
      },
      'dark-red': {
        name: 'Vermelho Fogo', emoji: '🔴',
        bg1: '#100303', bg2: '#1a0707', bg3: '#0c0202',
        surface: '#200a0a', surface2: '#180505',
        primary: '#ef4444', primary2: '#f87171', primaryGlow: 'rgba(239,68,68,0.5)',
        accent: '#fbbf24',
        gradient: 'linear-gradient(135deg, #ef4444, #fbbf24)',
        playerBg: 'linear-gradient(145deg, #1a0707 0%, #0c0202 100%)',
        playerGrad: 'linear-gradient(160deg, #3a0d0d 0%, #100303 60%)',
        navBg: 'rgba(16,3,3,0.9)',
        text: '#ffffff', textMuted: 'rgba(255,255,255,0.45)',
        border: 'rgba(255,255,255,0.05)',
        mode: 'dark',
      },
      'oled': {
        name: 'OLED Black', emoji: '⚫',
        bg1: '#000000', bg2: '#000000', bg3: '#000000',
        surface: '#0a0a0a', surface2: '#050505',
        primary: '#9333ea', primary2: '#a855f7', primaryGlow: 'rgba(147,51,234,0.5)',
        accent: '#ec4899',
        gradient: 'linear-gradient(135deg, #9333ea, #ec4899)',
        playerBg: 'linear-gradient(145deg, #050505 0%, #000000 100%)',
        playerGrad: 'linear-gradient(160deg, #150a25 0%, #000000 60%)',
        navBg: 'rgba(0,0,0,0.95)',
        text: '#ffffff', textMuted: 'rgba(255,255,255,0.45)',
        border: 'rgba(255,255,255,0.04)',
        mode: 'dark',
      },
      'light': {
        name: 'Claro Moderno', emoji: '☀️',
        bg1: '#f5f5f5', bg2: '#ececf5', bg3: '#e8e8f0',
        surface: '#ffffff', surface2: '#f0f0f8',
        primary: '#7c3aed', primary2: '#a855f7', primaryGlow: 'rgba(124,58,237,0.3)',
        accent: '#ec4899',
        gradient: 'linear-gradient(135deg, #7c3aed, #ec4899)',
        playerBg: 'linear-gradient(145deg, #e8e0f8 0%, #f5f0ff 100%)',
        playerGrad: 'linear-gradient(160deg, #d4b8f8 0%, #f0e8ff 60%)',
        navBg: 'rgba(245,245,245,0.95)',
        text: '#1a1a2e', textMuted: 'rgba(0,0,0,0.45)',
        border: 'rgba(0,0,0,0.08)',
        mode: 'light',
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

    this.styleEl.textContent = `
      body {
        background: ${t.bg1} !important;
        color: ${t.text} !important;
      }
      .app-container {
        background: linear-gradient(180deg, ${t.bg2} 0%, ${t.bg3} 100%) !important;
      }
      .nav-bar {
        background: ${t.navBg} !important;
        border-top-color: ${t.border} !important;
      }
      .nav-btn { color: ${t.textMuted} !important; }
      .nav-btn.active { color: ${t.primary2} !important; }
      .nav-btn p, .nav-btn span { color: inherit !important; }

      /* Player bottom bar */
      .player-bottom-bar {
        background: ${t.mode === 'light' ? 'rgba(255,255,255,0.85)' : 'rgba(28,20,50,0.55)'} !important;
        box-shadow: 0 8px 32px rgba(0,0,0,0.3), 0 0 0 1px ${t.primary}33 !important;
      }
      .mini-ring-fill { stroke: ${t.primary2} !important; }
      .mini-ctrl-play {
        background: rgba(${t.primary2.replace('#','').match(/.{2}/g).map(h=>parseInt(h,16)).join(',')},0.9) !important;
        box-shadow: 0 2px 12px ${t.primaryGlow} !important;
      }
      .mini-info h4 { color: ${t.text} !important; }
      .mini-info p { color: ${t.textMuted} !important; }

      /* Player expandido */
      .lyrics-full-screen { background: ${t.playerBg} !important; }
      .player-bg { background: ${t.playerGrad} !important; }
      .player-mini-controls {
        background: ${t.mode === 'light' ? 'rgba(240,240,255,0.96)' : 'rgba(8,6,16,0.96)'} !important;
        border-top-color: ${t.primary}22 !important;
      }
      .player-mini-play {
        background: ${t.gradient} !important;
        box-shadow: 0 2px 10px ${t.primaryGlow} !important;
      }
      .ctrl-play {
        background: ${t.gradient} !important;
        box-shadow: 0 4px 20px ${t.primaryGlow} !important;
      }
      .player-seek-fill { background: ${t.primary} !important; }
      .player-seek-thumb { background: ${t.primary} !important; }

      /* Modais */
      .modal-content-box { background: ${t.surface} !important; color: ${t.text} !important; }
      .context-menu-modal { background: ${t.surface2} !important; }
      .modal-btn-ok { background: ${t.gradient} !important; }

      /* Featured */
      .featured-card { background: ${t.gradient} !important; }
      .featured-badge {
        background: ${t.primary}55 !important;
        border-color: ${t.primary}66 !important;
      }
      .featured-play-btn { background: ${t.mode === 'light' ? t.primary : '#fff'} !important; color: ${t.mode === 'light' ? '#fff' : '#0a0812'} !important; }

      /* Biblioteca tabs */
      .lib-main-tab.active {
        background: ${t.primary} !important;
        color: #fff !important;
      }
      .lib-main-tab {
        color: ${t.textMuted} !important;
        background: ${t.mode === 'light' ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.06)'} !important;
      }

      /* Perfil */
      .profile-banner { background: ${t.gradient} !important; }
      .profile-stat-num { color: ${t.primary} !important; }
      .profile-edit-chip { border-color: ${t.primary} !important; color: ${t.primary} !important; }

      /* Notificações */
      .notif-activate-btn { background: ${t.primary} !important; }

      /* Toast */
      .premium-toast { background: ${t.surface} !important; }

      /* Textos gerais */
      h1, h2, h3, h4, h5, h6 { color: ${t.text} !important; }
      p { color: ${t.text} !important; }

      /* Ctx menu */
      .ctx-title { color: ${t.text} !important; }
      .ctx-btn { color: ${t.mode === 'light' ? '#1a1a2e' : '#f0eaff'} !important; }
      .ctx-btn:active { background: ${t.primary}22 !important; }
      .ctx-icon-purple { background: ${t.primary}2e !important; color: ${t.primary2} !important; }

      /* Queue */
      .queue-panel { background: ${t.surface} !important; }

      /* Summary cards */
      .summary-card { background: ${t.mode === 'light' ? 'rgba(0,0,0,0.04)' : 'rgba(255,255,255,0.04)'} !important; }

      /* Section headers */
      .section-header h2 { color: ${t.text} !important; }
      .section-see-all { color: ${t.primary} !important; }

      /* Search */
      .search-bar-new {
        background: ${t.mode === 'light' ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.06)'} !important;
      }
      #globalSearchInput { color: ${t.text} !important; }
      #globalSearchInput::placeholder { color: ${t.textMuted} !important; }
    `;

    localStorage.setItem('fenda-theme', name);
    this.currentTheme = name;

    // Fechar modal
    const modal = document.getElementById('themesModal');
    if (modal) setTimeout(() => { modal.style.display = 'none'; }, 400);
  }

  renderThemePicker() {
    return `
      <div>
        <h3 style="margin:0 0 20px;font-size:20px;font-weight:800">🎨 Temas</h3>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">
          ${Object.entries(this.themes).map(([key, t]) => `
            <button onclick="fendaThemes.applyTheme('${key}')" style="
              display:flex;align-items:center;gap:10px;
              padding:12px;text-align:left;
              border:2px solid ${this.currentTheme === key ? t.primary : 'rgba(255,255,255,0.08)'};
              border-radius:16px;
              background:${this.currentTheme === key ? t.primary + '22' : 'rgba(255,255,255,0.04)'};
              cursor:pointer;transition:all 0.2s;
            ">
              <div style="
                width:38px;height:38px;border-radius:10px;flex-shrink:0;
                background:${t.gradient};
                display:flex;align-items:center;justify-content:center;font-size:18px;
              ">${t.emoji}</div>
              <div>
                <div style="font-size:13px;font-weight:600;color:white;line-height:1.2">${t.name}</div>
                ${this.currentTheme === key ? `<div style="font-size:11px;color:${t.primary};margin-top:2px">✓ Ativo</div>` : ''}
              </div>
            </button>
          `).join('')}
        </div>
      </div>
    `;
  }
}

const fendaThemes = new FendaThemes();
