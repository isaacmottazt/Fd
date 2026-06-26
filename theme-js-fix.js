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
      /* ========== REMOVE APENAS BOX-SHADOWS ROXAS ========== */
      /* NÃO mexe em cores, apenas remove a luz roxa atrás */

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

      /* Remove glow/sombra roxo de qualquer elemento */
      [style*="box-shadow"][style*="7c3a"] {
        box-shadow: none !important;
      }

      [style*="box-shadow"][style*="a855"] {
        box-shadow: none !important;
      }

      [style*="box-shadow"][style*="c084"] {
        box-shadow: none !important;
      }

      /* Remove sombra inline roxo específico */
      [style*="box-shadow"] {
        --temp-shadow: var(--temp-shadow, unset);
      }

      /* Se tiver shadow com roxo RGB */
      [style*="box-shadow"][style*="rgba(124"],
      [style*="box-shadow"][style*="rgba(168"],
      [style*="box-shadow"][style*="rgba(192"] {
        box-shadow: none !important;
      }

      /* ========== REMOVE BRILHO ATRÁS DE CAIXAS ========== */

      /* Cards/containers - remove qualquer sombra colorida, deixa só neutra se tiver */
      [class*="card"] {
        box-shadow: 0 1px 3px rgba(0,0,0,0.1) !important;
      }

      /* Modals - sombra neutra apenas */
      [class*="modal"] {
        box-shadow: 0 10px 40px rgba(0,0,0,0.2) !important;
      }

      /* Buttons - remove brilho roxo, deixa button normal */
      button {
        box-shadow: none !important;
      }

      button:hover {
        box-shadow: none !important;
      }

      button:active {
        box-shadow: none !important;
      }

      /* ========== FORÇA REMOVER GLOWS ROXOS ========== */

      /* Remove qualquer glow/shadow com roxo */
      [style*="0 0 0 1px"][style*="7c3a"],
      [style*="0 0 0 2px"][style*="7c3a"],
      [style*="0 0 0 3px"][style*="7c3a"],
      [style*="0 0 0 1px"][style*="a855"],
      [style*="0 0 0 2px"][style*="a855"],
      [style*="0 0 0 1px"][style*="c084"] {
        box-shadow: none !important;
      }

      /* Remove inset shadows roxos */
      [style*="inset"][style*="7c3a"],
      [style*="inset"][style*="a855"],
      [style*="inset"][style*="c084"] {
        box-shadow: none !important;
      }

      /* ========== REMOVE FILTER/BACKDROP ROXOS ========== */

      [style*="filter"][style*="7c3a"],
      [style*="filter"][style*="a855"] {
        filter: none !important;
      }

      [style*="backdrop-filter"][style*="7c3a"],
      [style*="backdrop-filter"][style*="a855"] {
        backdrop-filter: none !important;
      }

      /* ========== LIMPA TEXT-SHADOW ROXO ========== */

      [style*="text-shadow"][style*="7c3a"],
      [style*="text-shadow"][style*="a855"],
      [style*="text-shadow"][style*="c084"] {
        text-shadow: none !important;
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

    // Remove APENAS box-shadow roxo, não mexe em outras cores
    if (el.style.boxShadow) {
      const boxShadow = el.style.boxShadow;
      if (
        boxShadow.includes('124,58,237') ||
        boxShadow.includes('168,85,247') ||
        boxShadow.includes('192,132,252') ||
        boxShadow.includes('7c3a') ||
        boxShadow.includes('a855') ||
        boxShadow.includes('c084') ||
        boxShadow.includes('rgba(124') ||
        boxShadow.includes('rgba(168')
      ) {
        el.style.boxShadow = 'none';
      }
    }
  }

  cleanDescendants(parent) {
    if (!parent) return;
    parent.querySelectorAll('[style]').forEach((el) => {
      this.cleanElement(el);
    });
  }

  interceptInlineStyles() {
    // Intercepta APENAS box-shadow roxo, não mexe em outras cores
    const originalSetAttribute = Element.prototype.setAttribute;

    Element.prototype.setAttribute = function(name, value) {
      if (
        name === 'style' &&
        (value.includes('box-shadow') &&
          (value.includes('7c3aed') ||
            value.includes('a855f7') ||
            value.includes('c084fc') ||
            value.includes('rgba(124') ||
            value.includes('rgba(168')))
      ) {
        // Remove apenas o box-shadow roxo
        const cleaned = value
          .replace(/box-shadow:\s*[^;]*rgba\(124,58,237[^;]*;?/g, 'box-shadow: none;')
          .replace(/box-shadow:\s*[^;]*rgba\(168,85,247[^;]*;?/g, 'box-shadow: none;')
          .replace(/box-shadow:\s*[^;]*rgba\(192,132,252[^;]*;?/g, 'box-shadow: none;')
          .replace(/box-shadow:\s*[^;]*7c3aed[^;]*;?/g, 'box-shadow: none;');

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
    // Monitora APENAS box-shadows roxas em tempo real
    setInterval(() => {
      document.querySelectorAll('[style*="box-shadow"]').forEach((el) => {
        const boxShadow = el.style.boxShadow;
        if (
          boxShadow &&
          (boxShadow.includes('124,58,237') ||
            boxShadow.includes('168,85,247') ||
            boxShadow.includes('192,132,252') ||
            boxShadow.includes('7c3a') ||
            boxShadow.includes('a855'))
        ) {
          el.style.boxShadow = 'none';
        }
      });
    }, 500);
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
