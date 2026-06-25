// themes.js - Sistema de temas com modo escuro e múltiplas cores

class FendaThemes {
  constructor() {
    this.currentTheme = localStorage.getItem('fenda-theme') || 'dark-purple';
    this.themes = {
      'dark-purple': {
        name: 'Roxo Escuro (padrão)',
        primary: '#7c3aed',
        secondary: '#a855f7',
        background: '#0a0612',
        surface: '#1a1625',
        text: '#ffffff',
        accent: '#ec4899',
      },
      'dark-blue': {
        name: 'Azul Noturno',
        primary: '#3b82f6',
        secondary: '#60a5fa',
        background: '#0f172a',
        surface: '#1e293b',
        text: '#ffffff',
        accent: '#06b6d4',
      },
      'dark-green': {
        name: 'Verde Floresta',
        primary: '#10b981',
        secondary: '#34d399',
        background: '#051c16',
        surface: '#1a3a3a',
        text: '#ffffff',
        accent: '#f59e0b',
      },
      'dark-pink': {
        name: 'Rosa Neon',
        primary: '#ec4899',
        secondary: '#f472b6',
        background: '#1a0e1e',
        surface: '#2a1a35',
        text: '#ffffff',
        accent: '#8b5cf6',
      },
      'dark-red': {
        name: 'Vermelho Vinho',
        primary: '#dc2626',
        secondary: '#ef4444',
        background: '#1a0a0a',
        surface: '#2a1515',
        text: '#ffffff',
        accent: '#fbbf24',
      },
      'light-modern': {
        name: 'Claro Moderno',
        primary: '#7c3aed',
        secondary: '#a855f7',
        background: '#f8f8f8',
        surface: '#ffffff',
        text: '#1f2937',
        accent: '#ec4899',
      },
      'oled-black': {
        name: 'OLED Puro',
        primary: '#7c3aed',
        secondary: '#a855f7',
        background: '#000000',
        surface: '#0a0a0a',
        text: '#ffffff',
        accent: '#ec4899',
      },
    };
    this.init();
  }

  init() {
    this.applyTheme(this.currentTheme);
    this.setupThemeListener();
  }

  applyTheme(themeName) {
    const theme = this.themes[themeName];
    if (!theme) {
      console.warn(`Tema ${themeName} não encontrado`);
      return;
    }

    const root = document.documentElement;
    root.style.setProperty('--color-primary', theme.primary);
    root.style.setProperty('--color-secondary', theme.secondary);
    root.style.setProperty('--color-background', theme.background);
    root.style.setProperty('--color-surface', theme.surface);
    root.style.setProperty('--color-text', theme.text);
    root.style.setProperty('--color-accent', theme.accent);

    document.body.style.backgroundColor = theme.background;
    document.body.style.color = theme.text;

    localStorage.setItem('fenda-theme', themeName);
    this.currentTheme = themeName;
  }

  getThemeNames() {
    return Object.keys(this.themes).map(key => ({
      id: key,
      name: this.themes[key].name,
    }));
  }

  setupThemeListener() {
    // Detectar mudança de preferência de sistema (claro/escuro)
    if (window.matchMedia) {
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (e.matches && !this.currentTheme.includes('light')) {
          // Sistema mudou pra escuro, manter tema escuro
          this.applyTheme(this.currentTheme);
        } else if (!e.matches && this.currentTheme.includes('light')) {
          // Sistema mudou pra claro, manter tema claro
          this.applyTheme(this.currentTheme);
        }
      });
    }
  }

  renderThemePicker() {
    const themes = this.getThemeNames();
    const html = `
      <div class="theme-picker-container">
        <h3>Escolha seu tema</h3>
        <div class="theme-grid">
          ${themes.map(theme => `
            <button 
              class="theme-btn ${this.currentTheme === theme.id ? 'active' : ''}"
              onclick="fendaThemes.applyTheme('${theme.id}')"
              title="${theme.name}"
            >
              <div class="theme-preview" style="background: ${this.themes[theme.id].primary}"></div>
              <span>${theme.name}</span>
            </button>
          `).join('')}
        </div>
      </div>
    `;
    return html;
  }

  getCSS() {
    return `
      :root {
        --color-primary: ${this.themes[this.currentTheme].primary};
        --color-secondary: ${this.themes[this.currentTheme].secondary};
        --color-background: ${this.themes[this.currentTheme].background};
        --color-surface: ${this.themes[this.currentTheme].surface};
        --color-text: ${this.themes[this.currentTheme].text};
        --color-accent: ${this.themes[this.currentTheme].accent};
      }

      * {
        color: var(--color-text);
        background-color: var(--color-background);
      }

      body {
        background-color: var(--color-background);
        color: var(--color-text);
      }

      .theme-picker-container {
        padding: 20px;
        border-radius: 12px;
        background: var(--color-surface);
      }

      .theme-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
        gap: 10px;
        margin-top: 15px;
      }

      .theme-btn {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 8px;
        padding: 10px;
        border: 2px solid transparent;
        border-radius: 8px;
        background: var(--color-surface);
        cursor: pointer;
        transition: all 0.3s ease;
        font-size: 12px;
      }

      .theme-btn:hover {
        border-color: var(--color-primary);
        transform: translateY(-2px);
      }

      .theme-btn.active {
        border-color: var(--color-primary);
        background: rgba(124, 58, 237, 0.1);
      }

      .theme-preview {
        width: 40px;
        height: 40px;
        border-radius: 6px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
      }
    `;
  }
}

// Inicializar
const fendaThemes = new FendaThemes();

// Injetar CSS dos temas
const styleTag = document.createElement('style');
styleTag.textContent = fendaThemes.getCSS();
document.head.appendChild(styleTag);
