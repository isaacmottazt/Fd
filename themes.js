// themes.js v5 - Cor principal + modo claro/escuro

class FendaThemes {
  constructor() {
    this.savedColor = localStorage.getItem('fenda-color') || '#7c3aed';
    this.savedMode = localStorage.getItem('fenda-mode') || 'dark';
    this.styleEl = null;
    this.init();
  }

  // Converte hex para HSL
  hexToHSL(hex) {
    let r = parseInt(hex.slice(1,3),16)/255;
    let g = parseInt(hex.slice(3,5),16)/255;
    let b = parseInt(hex.slice(5,7),16)/255;
    const max = Math.max(r,g,b), min = Math.min(r,g,b);
    let h, s, l = (max+min)/2;
    if (max === min) { h = s = 0; }
    else {
      const d = max - min;
      s = l > 0.5 ? d/(2-max-min) : d/(max+min);
      switch(max) {
        case r: h = ((g-b)/d + (g<b?6:0))/6; break;
        case g: h = ((b-r)/d + 2)/6; break;
        case b: h = ((r-g)/d + 4)/6; break;
      }
    }
    return { h: Math.round(h*360), s: Math.round(s*100), l: Math.round(l*100) };
  }

  // Gera variações da cor
  generatePalette(hex) {
    const { h, s } = this.hexToHSL(hex);
    return {
      base: hex,
      hi:   `hsl(${h},${Math.min(s+5,100)}%,65%)`,
      up:   `hsl(${h},${Math.min(s+5,100)}%,75%)`,
      dark: `hsl(${h},${Math.min(s+5,100)}%,28%)`,
      glow: `hsla(${h},${Math.min(s+5,100)}%,50%,0.4)`,
      soft: `hsla(${h},${Math.min(s+5,100)}%,50%,0.15)`,
      line: `hsla(${h},${Math.min(s+5,100)}%,50%,0.2)`,
      grad: `linear-gradient(135deg, hsl(${h},${Math.min(s+5,100)}%,38%), hsl(${(h+30)%360},${Math.min(s+5,100)}%,55%))`,
      gradProfile: `linear-gradient(135deg, hsl(${h},${Math.min(s+5,100)}%,22%), hsl(${h},${Math.min(s+5,100)}%,38%), hsl(${(h+30)%360},${Math.min(s+5,100)}%,55%))`,
    };
  }

  apply(color, mode) {
    const p = this.generatePalette(color);
    const L = mode === 'light';

    const bg     = L ? '#f8f8fc' : '#0a0a0f';
    const bg2    = L ? '#f2f2f8' : '#0f0f1a';
    const bg3    = L ? '#e8e8f0' : '#07070c';
    const surf   = L ? '#ffffff' : '#1c1826';
    const surf2  = L ? '#f5f5fb' : '#12101c';
    const navBg  = L ? 'rgba(248,248,252,0.95)' : 'rgba(10,10,15,0.92)';
    const ink    = L ? '#111118' : '#ffffff';
    const inkMid = L ? 'rgba(17,17,24,0.62)' : 'rgba(255,255,255,0.65)';
    const inkLow = L ? 'rgba(17,17,24,0.42)' : 'rgba(255,255,255,0.40)';
    const inkFnt = L ? 'rgba(17,17,24,0.26)' : 'rgba(255,255,255,0.22)';
    const border = L ? 'rgba(0,0,0,0.08)' : 'rgba(255,255,255,0.06)';
    const cardBg = L ? 'rgba(0,0,0,0.03)' : 'rgba(255,255,255,0.05)';
    const inptBg = L ? 'rgba(0,0,0,0.05)' : 'rgba(255,255,255,0.07)';
    const playerBg = L
      ? `linear-gradient(145deg, hsl(${this.hexToHSL(color).h},30%,92%), #f8f8fc)`
      : `linear-gradient(145deg, hsl(${this.hexToHSL(color).h},40%,8%), #050305)`;
    const playerGrad = L
      ? `linear-gradient(160deg, hsl(${this.hexToHSL(color).h},40%,85%), hsl(${this.hexToHSL(color).h},20%,95%))`
      : `linear-gradient(160deg, hsl(${this.hexToHSL(color).h},50%,14%), hsl(${this.hexToHSL(color).h},30%,5%))`;

    this.styleEl.textContent = `
      body{background:${bg}!important;color:${ink}!important}
      .app-container{background:linear-gradient(180deg,${bg2} 0%,${bg3} 100%)!important}

      .nav-bar{background:${navBg}!important;border-top-color:${border}!important}
      .nav-btn{color:${inkFnt}!important}
      .nav-btn.active{color:${p.base}!important}
      .nav-btn p,.nav-btn span{color:inherit!important}

      .player-bottom-bar{background:${L?'rgba(255,255,255,0.9)':'rgba(18,12,30,0.75)'}!important;box-shadow:0 8px 32px rgba(0,0,0,0.2),0 0 0 1px ${p.base}20!important}
      .mini-ring-fill{stroke:${p.hi}!important}
      .mini-ctrl-play{background:${p.base}!important;box-shadow:0 2px 12px ${p.glow}!important}
      .mini-info h4{color:${ink}!important}
      .mini-info p{color:${inkMid}!important}

      .lyrics-full-screen{background:${playerBg}!important}
      .player-bg{background:${playerGrad}!important}
      .ctrl-play{background:${p.grad}!important;box-shadow:0 4px 20px ${p.glow}!important}
      .player-seek-fill{background:${p.base}!important}
      .player-seek-thumb{background:${p.base}!important}
      .player-mini-controls{background:${L?surf+'f5':'rgba(6,4,14,0.97)'}!important;border-top-color:${p.base}14!important}
      .player-mini-play{background:${p.grad}!important}
      .player-mini-info span:first-child{color:${ink}!important}
      .player-mini-info span:last-child{color:${inkLow}!important}
      #playerExpandedTitle{color:${L?ink:'#fff'}!important}
      #playerExpandedArtist{color:${L?inkMid:'rgba(255,255,255,0.6)'}!important}
      #currentTime,#totalTime{color:${inkLow}!important}
      .ctrl-extra,.ctrl-main{color:${L?inkMid:'rgba(255,255,255,0.7)'}!important}
      .player-fav-big,.player-action-btn{color:${L?inkLow:'rgba(255,255,255,0.5)'}!important}
      .player-lyrics-header{color:${inkMid}!important}
      .lyrics-container-content p{color:${L?inkFnt:'rgba(255,255,255,0.32)'}!important}
      .lyrics-container-content p.active{color:${ink}!important}
      .player-top-context,.player-top-playlist{color:${inkMid}!important}

      .modal-content-box{background:${surf}!important;color:${ink}!important}
      .modal-content-box h3{color:${ink}!important}
      .context-menu-modal{background:${surf2}!important}
      .modal-btn-ok{background:${p.grad}!important;color:#fff!important}
      .modal-btn-cancel{background:${cardBg}!important;color:${inkMid}!important}
      input,textarea{background:${inptBg}!important;color:${ink}!important;border-color:${border}!important}
      input::placeholder,textarea::placeholder{color:${inkFnt}!important}

      .ctx-title{color:${ink}!important}
      .ctx-artist{color:${inkLow}!important}
      .ctx-btn{color:${ink}!important}
      .ctx-btn:active{background:${p.soft}!important}
      .ctx-icon-purple{background:${p.soft}!important;color:${p.hi}!important}
      .ctx-divider{background:${border}!important}
      .context-menu-modal::before{background:${border}!important}

      .featured-card{background:${p.grad}!important}
      .featured-badge{background:rgba(255,255,255,0.2)!important;border-color:rgba(255,255,255,0.3)!important;color:#fff!important}
      .featured-content h2{color:#fff!important}
      .featured-content p{color:rgba(255,255,255,0.75)!important}
      .featured-play-btn{background:#fff!important;color:${p.dark}!important}

      .section-header h2{color:${ink}!important}
      .section-see-all{color:${p.hi}!important}

      #biblioteca{
        --lib-violet:${p.base};--lib-violet-hi:${p.hi};--lib-violet-up:${p.up};
        --lib-violet-glow:${p.glow};--lib-ink:${ink};--lib-ink-mid:${inkMid};
        --lib-ink-low:${inkLow};--lib-ink-faint:${inkFnt};
        --lib-surface:${L?'rgba(255,255,255,0.9)':'rgba(22,18,38,0.78)'};
        --lib-surface-2:${surf};--lib-border:${border};--lib-border-hi:${p.line};
        --lib-surface-hi:${cardBg};
      }
      .lib-main-tab{color:${inkLow}!important;background:${cardBg}!important}
      .lib-main-tab.active{background:${p.base}!important;color:#fff!important}
      .library-header h1{color:${ink}!important}
      .lib-icon-btn{color:${inkMid}!important}
      .summary-card{background:${cardBg}!important}
      .summary-card h3{color:${p.base}!important}
      .summary-card p{color:${inkLow}!important}
      .playlist-play-all-btn{background:${p.base}!important;color:#fff!important}
      .playlist-shuffle-btn{border-color:${p.base}!important;color:${p.hi}!important;background:${p.soft}!important}
      #playlistDetailName,#playlistDetailCount{color:${ink}!important}

      .search-top{background:linear-gradient(180deg,${bg} 0%,transparent 100%)!important}
      .search-bar-new{background:${inptBg}!important;border-color:${border}!important}
      .search-bar-new:focus-within{border-color:${p.base}!important}
      #globalSearchInput{color:${ink}!important}
      #globalSearchInput::placeholder{color:${inkFnt}!important}
      .search-icon-static{color:${inkLow}!important}
      .search-section-header span:first-child{color:${inkLow}!important}
      .search-section-header button{color:${p.hi}!important}
      .recent-search-item{color:${ink}!important;background:${cardBg}!important;border-color:${border}!important}

      .profile-banner{background:${p.gradProfile}!important}
      .profile-stats-row{background:${cardBg}!important;border-color:${border}!important}
      .profile-stat-num{color:${p.base}!important}
      .profile-stat-label{color:${inkLow}!important}
      .profile-stat-divider{background:${border}!important}
      .profile-edit-chip{border-color:${p.base}44!important;color:${p.base}!important;background:${p.soft}!important}
      .profile-menu{background:${cardBg}!important;border-color:${border}!important}
      .profile-menu-item:active{background:${p.soft}!important}
      .profile-menu-title{color:${ink}!important}
      .profile-menu-sub{color:${inkLow}!important}
      .profile-menu-arrow{color:${inkFnt}!important}
      #profileName{color:${ink}!important}
      #profileUsername{color:${inkLow}!important}
      #profileBio{color:${inkMid}!important}
      .profile-logout-btn{background:rgba(239,68,68,0.08)!important;color:#dc2626!important}

      .notifications-overlay{background:${bg}!important}
      .notif-header{border-bottom-color:${border}!important}
      .notif-header-icon{color:${p.hi}!important}
      .notif-header h1{color:${ink}!important}
      .notif-tab{color:${inkLow}!important}
      .notif-tab.active{color:${p.hi}!important;border-bottom-color:${p.hi}!important}
      .notif-close-btn{color:${inkMid}!important;background:${cardBg}!important}
      .notif-prompt-card{background:${p.soft}!important;border-color:${p.line}!important}
      .notif-activate-btn{background:${p.grad}!important;color:#fff!important}

      .queue-panel{background:${L?surf2:playerBg}!important;border-left-color:${p.base}28!important}
      .queue-panel-header h3{color:${ink}!important}
      .qp-playing-bar{background:${p.grad}!important}

      .premium-toast{background:${surf}!important;color:${ink}!important}
    `;

    localStorage.setItem('fenda-color', color);
    localStorage.setItem('fenda-mode', mode);
    this.savedColor = color;
    this.savedMode = mode;
  }

  init() {
    this.styleEl = document.createElement('style');
    this.styleEl.id = 'fenda-theme-css';
    document.head.appendChild(this.styleEl);
    this.apply(this.savedColor, this.savedMode);
  }

  renderThemePicker() {
    const colors = [
      { hex: '#7c3aed', name: 'Roxo' },
      { hex: '#6d28d9', name: 'Violeta' },
      { hex: '#2563eb', name: 'Azul' },
      { hex: '#0891b2', name: 'Ciano' },
      { hex: '#059669', name: 'Verde' },
      { hex: '#d97706', name: 'Âmbar' },
      { hex: '#dc2626', name: 'Vermelho' },
      { hex: '#db2777', name: 'Rosa' },
      { hex: '#9333ea', name: 'Lilás' },
      { hex: '#0f172a', name: 'Ardósia' },
    ];

    const p = this.generatePalette(this.savedColor);

    return `
      <div>
        <h3 style="margin:0 0 20px;font-size:19px;font-weight:800">🎨 Personalizar</h3>

        <!-- Modo claro/escuro -->
        <p style="font-size:11px;font-weight:700;letter-spacing:0.07em;opacity:0.45;margin:0 0 10px;text-transform:uppercase">Modo</p>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:22px">
          <button onclick="fendaThemes.apply(fendaThemes.savedColor,'dark')" style="
            padding:12px;border-radius:14px;border:1.5px solid ${this.savedMode==='dark'?this.savedColor:'rgba(128,128,128,0.15)'};
            background:${this.savedMode==='dark'?this.savedColor+'15':'rgba(128,128,128,0.06)'};
            cursor:pointer;font-size:14px;font-weight:600;display:flex;align-items:center;justify-content:center;gap:8px
          ">🌙 Escuro ${this.savedMode==='dark'?'✓':''}</button>
          <button onclick="fendaThemes.apply(fendaThemes.savedColor,'light')" style="
            padding:12px;border-radius:14px;border:1.5px solid ${this.savedMode==='light'?this.savedColor:'rgba(128,128,128,0.15)'};
            background:${this.savedMode==='light'?this.savedColor+'15':'rgba(128,128,128,0.06)'};
            cursor:pointer;font-size:14px;font-weight:600;display:flex;align-items:center;justify-content:center;gap:8px
          ">☀️ Claro ${this.savedMode==='light'?'✓':''}</button>
        </div>

        <!-- Cor principal -->
        <p style="font-size:11px;font-weight:700;letter-spacing:0.07em;opacity:0.45;margin:0 0 12px;text-transform:uppercase">Cor principal</p>
        <div style="display:grid;grid-template-columns:repeat(5,1fr);gap:10px;margin-bottom:20px">
          ${colors.map(c => `
            <button onclick="fendaThemes.apply('${c.hex}',fendaThemes.savedMode)" title="${c.name}" style="
              width:100%;aspect-ratio:1;border-radius:50%;
              background:${c.hex};border:3px solid ${this.savedColor===c.hex?'white':'transparent'};
              cursor:pointer;box-shadow:${this.savedColor===c.hex?`0 0 0 2px ${c.hex}`:'none'};
              transition:all 0.18s;
            "></button>
          `).join('')}
        </div>

        <!-- Cor personalizada -->
        <p style="font-size:11px;font-weight:700;letter-spacing:0.07em;opacity:0.45;margin:0 0 10px;text-transform:uppercase">Cor personalizada</p>
        <div style="display:flex;align-items:center;gap:12px;margin-bottom:20px">
          <input type="color" value="${this.savedColor}"
            oninput="fendaThemes.apply(this.value,fendaThemes.savedMode)"
            style="width:48px;height:48px;border-radius:12px;border:none;cursor:pointer;padding:2px;background:none"
          />
          <div>
            <div style="font-size:14px;font-weight:600">Escolha qualquer cor</div>
            <div style="font-size:12px;opacity:0.5;margin-top:2px">${this.savedColor}</div>
          </div>
        </div>

        <!-- Preview -->
        <div style="border-radius:14px;overflow:hidden;border:1px solid rgba(128,128,128,0.15)">
          <div style="background:${p.grad};padding:14px 16px;color:#fff">
            <div style="font-size:12px;opacity:0.8">Preview</div>
            <div style="font-size:16px;font-weight:700;margin-top:2px">Fenda Music</div>
          </div>
          <div style="padding:12px 16px;display:flex;align-items:center;gap:10px;background:rgba(128,128,128,0.06)">
            <div style="width:32px;height:32px;border-radius:50%;background:${p.base};display:flex;align-items:center;justify-content:center;color:#fff;font-size:16px">▶</div>
            <div style="flex:1">
              <div style="font-size:13px;font-weight:600">Nome da música</div>
              <div style="font-size:11px;opacity:0.5">Artista</div>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}

const fendaThemes = new FendaThemes();
