// stats.js - Estatísticas de uso tipo Spotify Wrapped

class FendaStats {
  constructor(supabaseClient) {
    this.supabase = supabaseClient;
    this.userId = null;
  }

  async init(userId) {
    this.userId = userId;
  }

  async getYearStats() {
    const now = new Date();
    const year = now.getFullYear();
    const startOfYear = new Date(year, 0, 1).toISOString();
    const endOfYear = new Date(year, 11, 31).toISOString();

    try {
      // Buscar histórico do ano
      const { data: history } = await this.supabase
        .from('history')
        .select('music_id, artist, created_at')
        .gte('created_at', startOfYear)
        .lte('created_at', endOfYear);

      if (!history || history.length === 0) {
        return this.getEmptyStats();
      }

      return {
        totalSongs: history.length,
        uniqueSongs: new Set(history.map(h => h.music_id)).size,
        topArtists: this.getTopArtists(history),
        topSongs: this.getTopSongs(history),
        listeningStreak: this.calculateStreak(history),
        favoriteDayOfWeek: this.getFavoriteDayOfWeek(history),
        totalMinutes: history.length * 3.5, // média de 3.5 min por música
        mostActiveMonth: this.getMostActiveMonth(history),
      };
    } catch (error) {
      console.error('Erro ao buscar estatísticas:', error);
      return this.getEmptyStats();
    }
  }

  getTopArtists(history, limit = 5) {
    const artists = {};
    history.forEach(h => {
      artists[h.artist] = (artists[h.artist] || 0) + 1;
    });
    return Object.entries(artists)
      .sort((a, b) => b[1] - a[1])
      .slice(0, limit)
      .map(([name, count]) => ({ name, count }));
  }

  getTopSongs(history, limit = 5) {
    const songs = {};
    history.forEach(h => {
      const key = h.music_id;
      songs[key] = (songs[key] || 0) + 1;
    });
    return Object.entries(songs)
      .sort((a, b) => b[1] - a[1])
      .slice(0, limit)
      .map(([id, count]) => ({ id, count }));
  }

  calculateStreak(history) {
    if (history.length === 0) return 0;
    const dates = [...new Set(history.map(h => new Date(h.created_at).toDateString()))];
    dates.sort();
    
    let maxStreak = 1;
    let currentStreak = 1;
    
    for (let i = 1; i < dates.length; i++) {
      const prevDate = new Date(dates[i - 1]);
      const currDate = new Date(dates[i]);
      const diffDays = (currDate - prevDate) / (1000 * 60 * 60 * 24);
      
      if (diffDays === 1) {
        currentStreak++;
        maxStreak = Math.max(maxStreak, currentStreak);
      } else if (diffDays > 1) {
        currentStreak = 1;
      }
    }
    return maxStreak;
  }

  getFavoriteDayOfWeek(history) {
    const days = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
    const dayCount = Array(7).fill(0);
    
    history.forEach(h => {
      const date = new Date(h.created_at);
      dayCount[date.getDay()]++;
    });
    
    const maxDay = dayCount.indexOf(Math.max(...dayCount));
    return days[maxDay];
  }

  getMostActiveMonth(history) {
    const months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
    const monthCount = Array(12).fill(0);
    
    history.forEach(h => {
      const date = new Date(h.created_at);
      monthCount[date.getMonth()]++;
    });
    
    const maxMonth = monthCount.indexOf(Math.max(...monthCount));
    return months[maxMonth];
  }

  getEmptyStats() {
    return {
      totalSongs: 0,
      uniqueSongs: 0,
      topArtists: [],
      topSongs: [],
      listeningStreak: 0,
      favoriteDayOfWeek: '-',
      totalMinutes: 0,
      mostActiveMonth: '-',
    };
  }

  renderWrapped(stats) {
    const html = `
      <div class="fenda-wrapped-container">
        <div class="wrapped-header">
          <h1>Seu ${new Date().getFullYear()} no Fenda Music</h1>
          <p>Veja suas estatísticas do ano</p>
        </div>

        <div class="wrapped-grid">
          <div class="wrapped-card">
            <h3>Total de músicas</h3>
            <p class="wrapped-number">${stats.totalSongs}</p>
          </div>

          <div class="wrapped-card">
            <h3>Músicas únicas</h3>
            <p class="wrapped-number">${stats.uniqueSongs}</p>
          </div>

          <div class="wrapped-card">
            <h3>Tempo de escuta</h3>
            <p class="wrapped-number">${Math.floor(stats.totalMinutes / 60)}h ${Math.floor(stats.totalMinutes % 60)}m</p>
          </div>

          <div class="wrapped-card">
            <h3>Sequência máxima</h3>
            <p class="wrapped-number">${stats.listeningStreak} dias</p>
          </div>

          <div class="wrapped-card full-width">
            <h3>Top 5 Artistas</h3>
            <ol class="wrapped-list">
              ${stats.topArtists.map((a, i) => `
                <li>
                  <span class="rank">${i + 1}</span>
                  <span class="name">${a.name}</span>
                  <span class="count">${a.count} plays</span>
                </li>
              `).join('')}
            </ol>
          </div>

          <div class="wrapped-card">
            <h3>Dia favorito</h3>
            <p class="wrapped-number">${stats.favoriteDayOfWeek}</p>
          </div>

          <div class="wrapped-card">
            <h3>Mês mais ativo</h3>
            <p class="wrapped-number">${stats.mostActiveMonth}</p>
          </div>
        </div>

        <button class="wrapped-share-btn" onclick="fendaStats.shareWrapped()">
          Compartilhar meu Wrapped
        </button>
      </div>
    `;
    return html;
  }

  shareWrapped() {
    const year = new Date().getFullYear();
    const text = `Meu ${year} no Fenda Music! 🎵 Ouvi muita música boa. Vê o meu Wrapped em ${window.location.origin}`;
    
    if (navigator.share) {
      navigator.share({
        title: `Meu ${year} no Fenda Music`,
        text: text,
        url: window.location.href,
      }).catch(err => console.log('Erro ao compartilhar:', err));
    } else {
      // Fallback: copiar pra clipboard
      navigator.clipboard.writeText(text);
      alert('Link copiado! Cole nas suas redes sociais.');
    }
  }
}

// Inicializar
const fendaStats = new FendaStats(supabase);
