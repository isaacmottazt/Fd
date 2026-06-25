// queue-visual.js - Fila visual com drag-and-drop

class FendaQueueVisual {
  constructor() {
    this.queue = [];
    this.draggedIndex = null;
  }

  setQueue(queue) {
    this.queue = queue || [];
  }

  renderQueueVisual() {
    if (this.queue.length === 0) {
      return '<p style="padding: 20px; text-align: center; color: #999;">Fila vazia</p>';
    }

    const html = `
      <div class="queue-visual-container">
        <h3>Próximas músicas (${this.queue.length})</h3>
        <div class="queue-list" id="queue-list">
          ${this.queue.map((song, index) => `
            <div 
              class="queue-item" 
              draggable="true" 
              data-index="${index}"
              ondragstart="fendaQueueVisual.dragStart(event, ${index})"
              ondragover="fendaQueueVisual.dragOver(event)"
              ondrop="fendaQueueVisual.drop(event, ${index})"
              ondragend="fendaQueueVisual.dragEnd()"
            >
              <div class="queue-drag-handle">☰</div>
              <div class="queue-item-info">
                <p class="queue-title">${song.title || 'Sem título'}</p>
                <p class="queue-artist">${song.artist || 'Artista desconhecido'}</p>
              </div>
              <div class="queue-duration">${this.formatDuration(song.duration || 0)}</div>
              <button 
                class="queue-remove-btn" 
                onclick="fendaQueueVisual.removeFromQueue(${index})"
                title="Remover"
              >✕</button>
            </div>
          `).join('')}
        </div>
      </div>
    `;
    return html;
  }

  dragStart(event, index) {
    this.draggedIndex = index;
    event.dataTransfer.effectAllowed = 'move';
    event.target.closest('.queue-item').style.opacity = '0.5';
  }

  dragOver(event) {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }

  drop(event, targetIndex) {
    event.preventDefault();
    
    if (this.draggedIndex === null || this.draggedIndex === targetIndex) {
      return;
    }

    // Reordenar array
    const item = this.queue[this.draggedIndex];
    this.queue.splice(this.draggedIndex, 1);
    this.queue.splice(targetIndex, 0, item);

    // Atualizar UI
    this.updateQueueUI();
    this.saveQueueToStorage();

    // Se usando AppState (seu contexto), atualizar também
    if (window.AppState) {
      window.AppState.queue = this.queue;
    }
  }

  dragEnd() {
    document.querySelectorAll('.queue-item').forEach(item => {
      item.style.opacity = '1';
    });
    this.draggedIndex = null;
  }

  removeFromQueue(index) {
    this.queue.splice(index, 1);
    this.updateQueueUI();
    this.saveQueueToStorage();

    if (window.AppState) {
      window.AppState.queue = this.queue;
    }
  }

  updateQueueUI() {
    const container = document.getElementById('queue-visual-container');
    if (container) {
      container.innerHTML = this.renderQueueVisual();
    }
  }

  saveQueueToStorage() {
    localStorage.setItem('fenda-queue', JSON.stringify(this.queue));
  }

  loadQueueFromStorage() {
    const saved = localStorage.getItem('fenda-queue');
    if (saved) {
      this.queue = JSON.parse(saved);
    }
  }

  formatDuration(seconds) {
    if (!seconds) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }

  getQueueCSS() {
    return `
      .queue-visual-container {
        padding: 20px;
        background: var(--color-surface);
        border-radius: 12px;
        max-height: 600px;
        overflow-y: auto;
      }

      .queue-visual-container h3 {
        margin: 0 0 15px 0;
        color: var(--color-text);
      }

      .queue-list {
        display: flex;
        flex-direction: column;
        gap: 8px;
      }

      .queue-item {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 12px;
        background: var(--color-background);
        border-radius: 8px;
        cursor: grab;
        transition: all 0.2s ease;
        border-left: 3px solid transparent;
      }

      .queue-item:hover {
        background: rgba(124, 58, 237, 0.1);
        border-left-color: var(--color-primary);
      }

      .queue-item:active {
        cursor: grabbing;
      }

      .queue-drag-handle {
        font-size: 18px;
        color: var(--color-primary);
        flex-shrink: 0;
        user-select: none;
      }

      .queue-item-info {
        flex: 1;
        min-width: 0;
      }

      .queue-title {
        margin: 0;
        font-weight: 600;
        font-size: 14px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .queue-artist {
        margin: 4px 0 0 0;
        font-size: 12px;
        color: var(--color-text);
        opacity: 0.7;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .queue-duration {
        font-size: 12px;
        color: var(--color-text);
        opacity: 0.6;
        flex-shrink: 0;
        min-width: 35px;
        text-align: right;
      }

      .queue-remove-btn {
        background: none;
        border: none;
        color: var(--color-accent);
        font-size: 18px;
        cursor: pointer;
        padding: 0;
        width: 24px;
        height: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 4px;
        transition: all 0.2s ease;
        flex-shrink: 0;
      }

      .queue-remove-btn:hover {
        background: rgba(236, 72, 153, 0.2);
        color: var(--color-accent);
      }

      /* Drag visual feedback */
      .queue-item[draggable="true"] {
        user-select: none;
      }

      .queue-item.dragging {
        opacity: 0.5;
        background: rgba(124, 58, 237, 0.2);
      }
    `;
  }
}

// Inicializar
const fendaQueueVisual = new FendaQueueVisual();
fendaQueueVisual.loadQueueFromStorage();

// Injetar CSS
const queueStyle = document.createElement('style');
queueStyle.textContent = fendaQueueVisual.getQueueCSS();
document.head.appendChild(queueStyle);
