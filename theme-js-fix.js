// theme-js-fix.js - Remove/sobrescreve roxo inline gerado em runtime

class ThemeJSFix {
  constructor() {
    this.root = document.documentElement;
    this.init();
  }

  init() {
    // 1. INJETA CSS que sobrescreve inline styles
    this.injectRuntimeCSS();

    // 2. OBSERVER pra elementos criados dinamicamente
    this.watchDynamicElements();

    // 3. INTERCEPTA setProperty do element.style
    this.interceptInlineStyles();

    // 4. REMOVE box-shadows roxas
    this.fixBoxShadows();

    // 5. MONITORA mudanças CSS
    this.monitorCSSChanges();
  }

  injectRuntimeCSS() {
    const styleEl = document.getElementById('theme-js-fix-inject') || (() => {
      const el = document.createElement('style');
      el.id = 'theme-js-fix-inject';
      el.setAttribute('data-priority', 'high');
      document.head.appendChild(el);
      return el;
    })();

    styleEl.textContent = `
      /* ========== FORÇA VARIÁVEIS CSS EM TUDO ========== */
      * {
        --primary-base: var(--primary-base) !important;
        --primary-hi: var(--primary-hi) !important;
        --primary-up: var(--primary-up) !important;
        --primary-dark: var(--primary-dark) !important;
        --primary-grad: var(--primary-grad) !important;
        --primary-glow: var(--primary-glow) !important;
        --primary-soft: var(--primary-soft) !important;
      }

      /* ========== INLINE STYLES COM ROXO - REMOVE/SOBRESCREVE ========== */

      /* Qualquer elemento com cor inline roxo */
      [style*="7c3aed"],
      [style*="a855f7"],
      [style*="c084fc"],
      [style*="9333ea"],
      [style*="5b21b6"],
      [style*="d8b4fe"],
      [style*="be185d"],
      [style*="c026d3"],
      [style*="6d28d9"],
      [style*="4c1d95"],
      [style*="1e0938"] {
        /* Remove background roxo inline */
        background: var(--primary-base) !important;
        /* Remove cor texto roxo inline */
        color: inherit !important;
        /* Remove border roxo inline */
        border-color: var(--primary-line) !important;
      }

      /* ========== BOX SHADOWS - REMOVE BRILHO ROXO ========== */

      /* Remove todas as box shadows roxas */
      [style*="box-shadow"][style*="7c3a"],
      [style*="box-shadow"][style*="a855"],
      [style*="box-shadow"][style*="c084"],
      [style*="box-shadow"][style*="9333"],
      [style*="box-shadow"][style*="rgba(124,58,237"],
      [style*="box-shadow"][style*="rgba(168,85,247"],
      [style*="box-shadow"][style*="rgba(192,132,252"] {
        box-shadow: none !important;
      }

      /* Remove glow/sombra de qualquer elemento roxo */
      [style*="box-shadow"] {
        box-shadow: 0 0 0 rgba(0,0,0,0) !important;
      }

      /* ========== BUTTONS ========== */

      button[style*="7c3a"],
      button[style*="a855"],
      button[style*="c084"],
      button[style*="9333"],
      .btn[style*="7c3a"],
      .btn[style*="a855"],
      [class*="btn"][style*="7c3a"],
      [class*="btn"][style*="a855"] {
        background: var(--primary-base) !important;
        color: white !important;
        border: none !important;
        box-shadow: none !important;
      }

      /* ========== BADGES ========== */

      span[style*="7c3a"],
      span[style*="a855"],
      span[style*="c084"],
      [class*="badge"][style*="7c3a"],
      [class*="badge"][style*="a855"],
      [class*="badge"][style*="c084"] {
        background: var(--primary-soft) !important;
        color: var(--primary-hi) !important;
        border-color: var(--primary-line) !important;
      }

      /* ========== AVATARS ========== */

      [class*="avatar"][style*="7c3a"],
      [class*="avatar"][style*="a855"],
      [class*="profile"][style*="7c3a"],
      [class*="circle"][style*="7c3a"] {
        background: var(--primary-base) !important;
        border-color: var(--primary-hi) !important;
      }

      /* ========== MODALS E OVERLAYS ========== */

      [class*="modal"][style*="7c3a"],
      [class*="modal"][style*="a855"],
      [class*="overlay"][style*="7c3a"] {
        background: rgba(0,0,0,0.5) !important;
        box-shadow: none !important;
      }

      /* ========== INPUTS ========== */

      input[style*="7c3a"],
      input[style*="a855"],
      textarea[style*="7c3a"] {
        background: var(--primary-soft) !important;
        border-color: var(--primary-line) !important;
        color: white !important;
      }

      input[style*="7c3a"]::placeholder,
      textarea[style*="7c3a"]::placeholder {
        color: var(--primary-line) !important;
      }

      /* ========== ICONS E SVG ========== */

      svg[style*="7c3a"],
      svg[style*="a855"],
      svg[style*="c084"],
      [class*="icon"][style*="7c3a"],
      [class*="icon"][style*="a855"] {
        color: var(--primary-base) !important;
        fill: var(--primary-base) !important;
        stroke: var(--primary-base) !important;
      }

      /* ========== GRADIENTES INLINE ========== */

      [style*="linear-gradient"][style*="7c3a"],
      [style*="linear-gradient"][style*="a855"],
      [style*="linear-gradient"][style*="c084"],
      [style*="radial-gradient"][style*="7c3a"] {
        background: var(--primary-grad) !important;
      }

      /* ========== BORDERS ========== */

      [style*="border"][style*="7c3a"],
      [style*="border"][style*="a855"],
      [style*="border"][style*="c084"] {
        border-color: var(--primary-line) !important;
      }

      /* ========== SHADOWS/GLOWS ========== */

      [style*="shadow"][style*="7c3a"],
      [style*="shadow"][style*="a855"],
      [style*="shadow"][style*="rgba(124"],
      [style*="shadow"][style*="rgba(168"] {
        box-shadow: none !important;
        text-shadow: none !important;
      }

      /* ========== FORÇA TUDO QUE TIVER ROXO ========== */

      /* Se ainda tiver algo com cor roxo específica */
      [style*="color: rgb(124, 58, 237"],
      [style*="color: rgb(168, 85, 247"],
      [style*="color: rgb(192, 132, 252"],
      [style*="background: rgb(124, 58, 237"],
      [style*="background: rgb(168, 85, 247"] {
        color: var(--primary-hi) !important;
        background: var(--primary-base) !important;
      }

      /* ========== REMOVE TODA SOMBRA ========== */

      /* Remove qualquer brilho/glow atrás de caixas */
      [class*="card"],
      [class*="modal"],
      [class*="container"],
      [class*="box"],
      [class*="panel"] {
        box-shadow: none !important;
      }

      /* Adiciona apenas sombra neutra sem cor */
      [class*="card"]::before,
      [class*="card"]::after,
      [class*="modal"]::before,
      [class*="modal"]::after {
        box-shadow: none !important;
      }

      /* ========== FORÇA CSS CUSTOM PROPERTIES ========== */

      [style] {
        --current-primary: var(--primary-base) !important;
      }

      /* ========== LIMPA ESTILOS INLINE QUE CONFLITAM ========== */

      /* Se algo tiver transform ou filter roxo */
      [style*="filter"][style*="7c3a"],
      [style*="filter"][style*="a855"] {
        filter: none !important;
      }

      /* ========== ÚLTIMO RESORT - SELECTORS ESPECÍFICOS ========== */

      /* Buttons no geral */
      button {
        box-shadow: none !important;
      }

      button:not([style*="rgb(0"]):not([style*="rgb(255"]):not([style*="rgb(46"]) {
        background: var(--primary-base) !important;
      }

      /* Cards */
      [class*="card"] {
        box-shadow: 0 1px 3px rgba(0,0,0,0.1) !important;
      }

      /* Modals */
      [class*="modal"] {
        box-shadow: 0 10px 40px rgba(0,0,0,0.2) !important;
      }

      /* Remove brilho/glow específico */
      [style*="0 0 0 1px"],
      [style*="0 0 0 2px"],
      [style*="0 0 0 3px"] {
        box-shadow: none !important;
      }
    `;
  }

  watchDynamicElements() {
    // Observer pra elementos criados em runtime
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList') {
          mutation.addedNodes.forEach((node) => {
            if (node.nodeType === 1) { // Element
              this.cleanElement(node);
              this.cleanDescendants(node);
            }
          });
        }
        if (mutation.type === 'attributes') {
          if (mutation.target && mutation.target.style) {
            this.cleanElement(mutation.target);
          }
        }
      });
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['style'],
      attributeOldValue: true,
    });
  }

  cleanElement(el) {
    if (!el || !el.style) return;

    const style = el.getAttribute('style') || '';

    // Se tem cor roxo, remove
    if (
      style.includes('7c3aed') ||
      style.includes('a855f7') ||
      style.includes('c084fc') ||
      style.includes('9333ea') ||
      style.includes('rgba(124,58,237') ||
      style.includes('rgba(168,85,247')
    ) {
      const cleaned = style
        .replace(/background:\s*#?7c3aed[^;]*/gi, `background: var(--primary-base)`)
        .replace(/background:\s*#?a855f7[^;]*/gi, `background: var(--primary-hi)`)
        .replace(/background:\s*#?c084fc[^;]*/gi, `background: var(--primary-up)`)
        .replace(/background:\s*#?9333ea[^;]*/gi, `background: var(--primary-darker)`)
        .replace(/color:\s*#?7c3aed[^;]*/gi, `color: var(--primary-base)`)
        .replace(/color:\s*#?a855f7[^;]*/gi, `color: var(--primary-hi)`)
        .replace(/color:\s*#?c084fc[^;]*/gi, `color: var(--primary-up)`)
        .replace(/border-color:\s*#?7c3aed[^;]*/gi, `border-color: var(--primary-line)`)
        .replace(/border-color:\s*#?a855f7[^;]*/gi, `border-color: var(--primary-line)`)
        .replace(/box-shadow:\s*[^;]*rgba\(124,58,237[^;]*;?/gi, `box-shadow: none`)
        .replace(/box-shadow:\s*[^;]*rgba\(168,85,247[^;]*;?/gi, `box-shadow: none`)
        .replace(/box-shadow:\s*[^;]*rgba\(192,132,252[^;]*;?/gi, `box-shadow: none`)
        .replace(/box-shadow:\s*0\s+[^;]*#?[ac0-9a-f]{6}[^;]*7c3a[^;]*;?/gi, `box-shadow: none`);

      if (cleaned !== style) {
        el.setAttribute('style', cleaned);
      }
    }

    // Remove box-shadow roxo específico
    if (el.style.boxShadow && el.style.boxShadow.includes('rgb(124')) {
      el.style.boxShadow = 'none';
    }
  }

  cleanDescendants(parent) {
    if (!parent) return;
    parent.querySelectorAll('[style]').forEach((el) => {
      this.cleanElement(el);
    });
  }

  interceptInlineStyles() {
    // Intercepta quando JS tenta setar cor roxo via style
    const originalSetAttribute = Element.prototype.setAttribute;
    const self = this;

    Element.prototype.setAttribute = function(name, value) {
      if (
        name === 'style' &&
        (value.includes('7c3aed') ||
          value.includes('a855f7') ||
          value.includes('c084fc') ||
          value.includes('9333ea') ||
          value.includes('rgba(124') ||
          value.includes('rgba(168'))
      ) {
        // Limpa a cor roxo antes de aplicar
        const cleaned = value
          .replace(/#7c3aed/g, 'var(--primary-base)')
          .replace(/#a855f7/g, 'var(--primary-hi)')
          .replace(/#c084fc/g, 'var(--primary-up)')
          .replace(/#9333ea/g, 'var(--primary-darker)')
          .replace(/rgba\(124,58,237/g, 'rgba(var(--primary-base-rgb)')
          .replace(/rgba\(168,85,247/g, 'rgba(var(--primary-hi-rgb)')
          .replace(/box-shadow:\s*[^;]*rgba\(124[^;]*/g, 'box-shadow: none');

        return originalSetAttribute.call(this, name, cleaned);
      }

      return originalSetAttribute.call(this, name, value);
    };
  }

  fixBoxShadows() {
    // Remove todas as box-shadow roxas do documento
    const allElements = document.querySelectorAll('[style*="box-shadow"]');
    allElements.forEach((el) => {
      const boxShadow = el.style.boxShadow || '';
      if (
        boxShadow.includes('124,58,237') ||
        boxShadow.includes('168,85,247') ||
        boxShadow.includes('192,132,252') ||
        boxShadow.includes('rgba(124') ||
        boxShadow.includes('rgba(168')
      ) {
        el.style.boxShadow = 'none';
      }
    });
  }

  monitorCSSChanges() {
    // Monitora mudanças no CSS em tempo real
    setInterval(() => {
      // Limpa styles inline roxos gerados dinamicamente
      document.querySelectorAll('[style]').forEach((el) => {
        const style = el.getAttribute('style');
        if (
          style &&
          (style.includes('7c3aed') ||
            style.includes('a855f7') ||
            style.includes('c084fc'))
        ) {
          this.cleanElement(el);
        }
      });
    }, 500); // A cada 500ms

    // Remove brilho atrás de elementos quando mudar tema
    if (window.fendaThemes) {
      const originalApply = window.fendaThemes.apply.bind(window.fendaThemes);
      window.fendaThemes.apply = function(color, mode) {
        const result = originalApply(color, mode);
        setTimeout(() => {
          // Reaplica a limpeza após aplicar tema
          document.querySelectorAll('[style]').forEach((el) => {
            this.cleanElement(el);
          });
        }, 100);
        return result;
      };
    }
  }
}

// Inicializa assim que o DOM tá ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    new ThemeJSFix();
  });
} else {
  new ThemeJSFix();
}
