// ============================================================
// Fenda Music — player-session.js
// Persiste e restaura o estado do player entre aberturas do PWA.
//
// PROBLEMA: quando o PWA instalado é aberto no Android, o Chrome
// faz um reload completo da página — zerando o player.
//
// SOLUÇÃO: salvar no localStorage qual música estava tocando,
// o tempo exato e o contexto, e restaurar automaticamente ao
// inicializar (após as músicas carregarem do Supabase).
// ============================================================

const SESSION_KEY = 'fenda_player_session';

// ── Salva o estado atual do player ───────────────────────────
function savePlayerSession() {
    try {
        if (!AppState.currentMusicId) return;

        const audio = document.getElementById('audio');
        const currentTime = audio ? Math.floor(audio.currentTime) : 0;

        // Não salva se o usuário não chegou a ouvir nada
        if (currentTime < 2) return;

        const session = {
            musicId:     AppState.currentMusicId,
            currentTime: currentTime,
            isShuffle:   AppState.isShuffle,
            isRepeat:    AppState.isRepeat,
            playContext: {
                source:     AppState.playContext?.source     || 'library',
                playlistId: AppState.playContext?.playlistId || null,
                // Salva apenas os IDs para não pesar no localStorage
                trackIds:   (AppState.playContext?.trackList || []).map(m => m.id),
            },
            savedAt: Date.now(),
        };

        localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    } catch (e) {
        console.warn('[Session] Erro ao salvar sessão:', e);
    }
}

// ── Carrega a sessão salva ────────────────────────────────────
function loadPlayerSession() {
    try {
        const raw = localStorage.getItem(SESSION_KEY);
        if (!raw) return null;
        const session = JSON.parse(raw);

        // Descarta sessões com mais de 24h (o usuário provavelmente não quer retomar)
        const MAX_AGE = 24 * 60 * 60 * 1000;
        if (Date.now() - session.savedAt > MAX_AGE) {
            localStorage.removeItem(SESSION_KEY);
            return null;
        }

        return session;
    } catch (e) {
        console.warn('[Session] Erro ao carregar sessão:', e);
        return null;
    }
}

// ── Limpa a sessão (chamado quando o usuário pausa manualmente
//    ou troca de música voluntariamente) ─────────────────────
function clearPlayerSession() {
    try {
        localStorage.removeItem(SESSION_KEY);
    } catch (e) {}
}

// ── Restaura o player com a sessão salva ─────────────────────
// Deve ser chamado APÓS as músicas carregarem (AppState.musics preenchido).
async function restorePlayerSession() {
    const session = loadPlayerSession();
    if (!session) return false;

    const music = AppState.musics.find(m => m.id === session.musicId);
    if (!music) {
        console.log('[Session] Música da sessão não encontrada, descartando.');
        clearPlayerSession();
        return false;
    }

    console.log('[Session] Restaurando sessão:', music.title, '@', session.currentTime + 's');

    // Restaura flags de shuffle/repeat
    AppState.isShuffle = session.isShuffle || false;
    AppState.isRepeat  = session.isRepeat  || false;

    // Reconstrói o trackList do contexto a partir dos IDs salvos
    const savedTrackIds = session.playContext?.trackIds || [];
    const restoredTrackList = savedTrackIds.length > 0
        ? savedTrackIds.map(id => AppState.musics.find(m => m.id === id)).filter(Boolean)
        : AppState.musics;

    // Restaura o contexto de reprodução (sem reconstruir a fila ainda)
    AppState.playContext = {
        source:     session.playContext?.source     || 'library',
        playlistId: session.playContext?.playlistId || null,
        trackList:  restoredTrackList,
    };

    // Carrega a música em modo "pausado" — não começa a tocar automaticamente
    // (respeitando a decisão do usuário de abrir o app sem áudio surpresa)
    const audio = document.getElementById('audio');
    if (!audio) return false;

    AppState.currentMusicId = music.id;
    AppState.playing = false;

    // Usa o áudio cacheado offline se disponível
    let audioUrl = music.src;
    if (typeof window.getCachedAudioUrl === 'function') {
        const cached = await window.getCachedAudioUrl(music);
        if (cached) audioUrl = cached;
    }

    audio.src = audioUrl;
    audio.currentTime = 0;

    // Aguarda o metadado carregar para aplicar o currentTime
    audio.addEventListener('loadedmetadata', () => {
        if (session.currentTime > 0 && session.currentTime < audio.duration - 3) {
            audio.currentTime = session.currentTime;
        }
    }, { once: true });

    // Atualiza a UI do player (mini barra + player expandido)
    if (typeof window.updatePlayerVisibility === 'function') {
        window.updatePlayerVisibility(music);
    }
    if (typeof window.updatePlayerUIState === 'function') {
        window.updatePlayerUIState();
    }
    if (typeof window.updateMediaSession === 'function') {
        window.updateMediaSession(music);
    }

    // Constrói a fila automática com o contexto restaurado
    if (typeof window.buildAutoQueue === 'function') {
        AppState.autoQueue = window.buildAutoQueue(
            music.id,
            restoredTrackList,
            AppState.isShuffle
        );
    }

    return true;
}

// ── Hook: salva sessão periodicamente enquanto toca ──────────
// e ao minimizar/fechar o app (visibilitychange + pagehide).
function initSessionPersistence() {
    const audio = document.getElementById('audio');
    if (!audio) return;

    // Salva a cada 10 segundos enquanto tocando
    setInterval(() => {
        if (AppState.playing) savePlayerSession();
    }, 10_000);

    // Salva ao trocar música (src muda)
    audio.addEventListener('loadedmetadata', () => {
        // Pequeno delay para o currentMusicId já estar atualizado no AppState
        setTimeout(savePlayerSession, 500);
    });

    // Salva quando o app vai para background (usuário muda de app ou fecha)
    document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'hidden') {
            savePlayerSession();
        }
    });

    // Salva ao fechar/sair da página (pagehide é mais confiável que beforeunload no mobile)
    window.addEventListener('pagehide', savePlayerSession);

    // Também no beforeunload para desktop
    window.addEventListener('beforeunload', savePlayerSession);

    console.log('[Session] Persistência de sessão iniciada.');
}

// ── Exportações globais ───────────────────────────────────────
window.savePlayerSession    = savePlayerSession;
window.loadPlayerSession    = loadPlayerSession;
window.clearPlayerSession   = clearPlayerSession;
window.restorePlayerSession = restorePlayerSession;
window.initSessionPersistence = initSessionPersistence;
