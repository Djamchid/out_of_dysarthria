/**
 * storage.js
 * Wrapper pour localStorage avec gestion d'erreurs
 */

class Storage {
    constructor() {
        this.KEYS = {
            CURRENT_SESSION: 'currentSession',
            SESSIONS_HISTORY: 'sessionsHistory',
            PREFERENCES: 'preferences'
        };

        this.MAX_HISTORY_LENGTH = 10;

        // Vérifier la disponibilité de localStorage
        this.isAvailable = this.checkAvailability();
    }

    /**
     * Vérifie si localStorage est disponible
     * @returns {boolean}
     */
    checkAvailability() {
        try {
            const test = '__storage_test__';
            localStorage.setItem(test, test);
            localStorage.removeItem(test);
            return true;
        } catch (e) {
            console.warn('localStorage non disponible:', e);
            return false;
        }
    }

    /**
     * Sauvegarde une valeur dans localStorage
     * @param {string} key
     * @param {*} value
     * @returns {boolean} Succès de la sauvegarde
     */
    set(key, value) {
        if (!this.isAvailable) {
            console.warn('localStorage non disponible, données non sauvegardées');
            return false;
        }

        try {
            const serialized = JSON.stringify(value);
            localStorage.setItem(key, serialized);
            return true;
        } catch (e) {
            console.error('Erreur lors de la sauvegarde:', e);

            // Si quota dépassé, essayer de faire de la place
            if (e.name === 'QuotaExceededError') {
                console.warn('Quota localStorage dépassé, nettoyage...');
                this.cleanupOldSessions();

                // Réessayer
                try {
                    const serialized = JSON.stringify(value);
                    localStorage.setItem(key, serialized);
                    return true;
                } catch (e2) {
                    console.error('Impossible de sauvegarder même après nettoyage:', e2);
                    return false;
                }
            }

            return false;
        }
    }

    /**
     * Récupère une valeur depuis localStorage
     * @param {string} key
     * @param {*} defaultValue Valeur par défaut si la clé n'existe pas
     * @returns {*}
     */
    get(key, defaultValue = null) {
        if (!this.isAvailable) {
            return defaultValue;
        }

        try {
            const item = localStorage.getItem(key);
            if (item === null) {
                return defaultValue;
            }
            return JSON.parse(item);
        } catch (e) {
            console.error('Erreur lors de la lecture:', e);
            return defaultValue;
        }
    }

    /**
     * Supprime une clé de localStorage
     * @param {string} key
     */
    remove(key) {
        if (!this.isAvailable) return;

        try {
            localStorage.removeItem(key);
        } catch (e) {
            console.error('Erreur lors de la suppression:', e);
        }
    }

    /**
     * Vide complètement localStorage (à utiliser avec précaution)
     */
    clear() {
        if (!this.isAvailable) return;

        try {
            localStorage.clear();
        } catch (e) {
            console.error('Erreur lors du nettoyage:', e);
        }
    }

    // ==========================================
    // Méthodes spécifiques à l'application
    // ==========================================

    /**
     * Sauvegarde la session en cours
     * @param {Object} session
     */
    saveCurrentSession(session) {
        return this.set(this.KEYS.CURRENT_SESSION, session);
    }

    /**
     * Récupère la session en cours
     * @returns {Object|null}
     */
    getCurrentSession() {
        return this.get(this.KEYS.CURRENT_SESSION, null);
    }

    /**
     * Supprime la session en cours
     */
    clearCurrentSession() {
        this.remove(this.KEYS.CURRENT_SESSION);
    }

    /**
     * Vérifie s'il existe une session en cours active
     * @returns {boolean}
     */
    hasActiveSession() {
        const session = this.getCurrentSession();
        return session !== null && session.isActive === true;
    }

    /**
     * Ajoute une session terminée à l'historique
     * @param {Object} session
     */
    addToHistory(session) {
        let history = this.getSessionsHistory();

        // Ajouter la nouvelle session au début
        history.unshift(session);

        // Limiter à MAX_HISTORY_LENGTH sessions
        if (history.length > this.MAX_HISTORY_LENGTH) {
            history = history.slice(0, this.MAX_HISTORY_LENGTH);
        }

        return this.set(this.KEYS.SESSIONS_HISTORY, history);
    }

    /**
     * Récupère l'historique des sessions
     * @returns {Array}
     */
    getSessionsHistory() {
        return this.get(this.KEYS.SESSIONS_HISTORY, []);
    }

    /**
     * Récupère la dernière session de l'historique
     * @returns {Object|null}
     */
    getLastSession() {
        const history = this.getSessionsHistory();
        return history.length > 0 ? history[0] : null;
    }

    /**
     * Nettoie les anciennes sessions pour libérer de l'espace
     */
    cleanupOldSessions() {
        let history = this.getSessionsHistory();

        // Ne garder que les 5 dernières sessions
        if (history.length > 5) {
            history = history.slice(0, 5);
            this.set(this.KEYS.SESSIONS_HISTORY, history);
        }
    }

    /**
     * Sauvegarde les préférences utilisateur
     * @param {Object} preferences
     */
    savePreferences(preferences) {
        return this.set(this.KEYS.PREFERENCES, preferences);
    }

    /**
     * Récupère les préférences utilisateur
     * @returns {Object}
     */
    getPreferences() {
        return this.get(this.KEYS.PREFERENCES, {
            darkMode: false,
            version: '1.0.0'
        });
    }

    /**
     * Met à jour une préférence spécifique
     * @param {string} key
     * @param {*} value
     */
    updatePreference(key, value) {
        const prefs = this.getPreferences();
        prefs[key] = value;
        return this.savePreferences(prefs);
    }

    /**
     * Crée une nouvelle session
     * @param {number} startStepIndex Index de l'étape de départ
     * @returns {Object}
     */
    createNewSession(startStepIndex = 0) {
        return {
            id: this.generateSessionId(),
            startedAt: new Date().toISOString(),
            currentStepIndex: startStepIndex,
            stepsCompleted: [],
            isActive: true
        };
    }

    /**
     * Génère un ID unique pour une session
     * @returns {string}
     */
    generateSessionId() {
        return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    }

    /**
     * Calcule la durée d'une session en secondes
     * @param {Object} session
     * @returns {number}
     */
    calculateSessionDuration(session) {
        if (!session.stepsCompleted || session.stepsCompleted.length === 0) {
            return 0;
        }

        return session.stepsCompleted.reduce((total, step) => total + (step.duration || 0), 0);
    }

    /**
     * Formate une durée en secondes en format MM:SS
     * @param {number} seconds
     * @returns {string}
     */
    formatDuration(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }

    /**
     * Formate une durée en format lisible (ex: "15 min 32 sec")
     * @param {number} seconds
     * @returns {string}
     */
    formatDurationLong(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;

        if (mins === 0) {
            return `${secs} sec`;
        }

        if (secs === 0) {
            return `${mins} min`;
        }

        return `${mins} min ${secs} sec`;
    }

    /**
     * Calcule le temps écoulé depuis une date
     * @param {string} dateString Date au format ISO
     * @returns {string} Temps relatif (ex: "il y a 3 heures")
     */
    getRelativeTime(dateString) {
        const date = new Date(dateString);
        const now = new Date();
        const diffMs = now - date;
        const diffSec = Math.floor(diffMs / 1000);
        const diffMin = Math.floor(diffSec / 60);
        const diffHour = Math.floor(diffMin / 60);
        const diffDay = Math.floor(diffHour / 24);

        if (diffSec < 60) {
            return 'il y a moins d\'une minute';
        } else if (diffMin < 60) {
            return `il y a ${diffMin} minute${diffMin > 1 ? 's' : ''}`;
        } else if (diffHour < 24) {
            return `il y a ${diffHour} heure${diffHour > 1 ? 's' : ''}`;
        } else if (diffDay < 7) {
            return `il y a ${diffDay} jour${diffDay > 1 ? 's' : ''}`;
        } else {
            return date.toLocaleDateString('fr-FR', {
                day: 'numeric',
                month: 'long',
                year: diffDay > 365 ? 'numeric' : undefined
            });
        }
    }
}

// Export pour utilisation dans d'autres modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Storage;
}
