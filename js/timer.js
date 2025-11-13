/**
 * timer.js
 * Gestion du chronomètre pour les étapes
 */

class Timer {
    constructor() {
        this.startTime = null;
        this.elapsedSeconds = 0;
        this.intervalId = null;
        this.isRunning = false;
        this.callbacks = {
            onTick: null,
            onStart: null,
            onPause: null,
            onReset: null
        };
    }

    /**
     * Démarre ou reprend le chronomètre
     */
    start() {
        if (this.isRunning) {
            return; // Déjà en cours
        }

        this.startTime = Date.now() - (this.elapsedSeconds * 1000);
        this.isRunning = true;

        // Mettre à jour toutes les secondes
        this.intervalId = setInterval(() => {
            this.tick();
        }, 1000);

        // Appeler le callback de démarrage
        if (this.callbacks.onStart) {
            this.callbacks.onStart();
        }
    }

    /**
     * Met en pause le chronomètre
     */
    pause() {
        if (!this.isRunning) {
            return; // Déjà en pause
        }

        this.isRunning = false;
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }

        // Appeler le callback de pause
        if (this.callbacks.onPause) {
            this.callbacks.onPause();
        }
    }

    /**
     * Réinitialise le chronomètre
     */
    reset() {
        this.pause();
        this.startTime = null;
        this.elapsedSeconds = 0;

        // Appeler le callback de reset
        if (this.callbacks.onReset) {
            this.callbacks.onReset();
        }

        // Mettre à jour l'affichage
        if (this.callbacks.onTick) {
            this.callbacks.onTick(this.elapsedSeconds);
        }
    }

    /**
     * Tick du chronomètre (appelé chaque seconde)
     */
    tick() {
        if (!this.isRunning) {
            return;
        }

        const now = Date.now();
        this.elapsedSeconds = Math.floor((now - this.startTime) / 1000);

        // Appeler le callback de tick
        if (this.callbacks.onTick) {
            this.callbacks.onTick(this.elapsedSeconds);
        }
    }

    /**
     * Obtient le temps écoulé en secondes
     * @returns {number}
     */
    getElapsedSeconds() {
        return this.elapsedSeconds;
    }

    /**
     * Obtient le temps écoulé formaté (MM:SS)
     * @returns {string}
     */
    getFormattedTime() {
        return this.formatTime(this.elapsedSeconds);
    }

    /**
     * Formate un temps en secondes en MM:SS
     * @param {number} seconds
     * @returns {string}
     */
    formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }

    /**
     * Définit un callback pour un événement
     * @param {string} event 'onTick', 'onStart', 'onPause', 'onReset'
     * @param {Function} callback
     */
    on(event, callback) {
        if (this.callbacks.hasOwnProperty(event)) {
            this.callbacks[event] = callback;
        }
    }

    /**
     * Vérifie si le chronomètre est en cours
     * @returns {boolean}
     */
    isActive() {
        return this.isRunning;
    }

    /**
     * Nettoie les ressources (à appeler lors de la destruction)
     */
    destroy() {
        this.pause();
        this.callbacks = {};
    }
}

/**
 * Classe StepTimer - Chronomètre spécifique pour une étape
 * Permet de gérer plusieurs chronomètres indépendants pour chaque étape
 */
class StepTimer extends Timer {
    constructor(stepId) {
        super();
        this.stepId = stepId;
    }

    /**
     * Obtient les données de l'étape pour la sauvegarde
     * @returns {Object}
     */
    getStepData() {
        return {
            stepId: this.stepId,
            duration: this.getElapsedSeconds(),
            completedAt: new Date().toISOString()
        };
    }
}

// Export pour utilisation dans d'autres modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { Timer, StepTimer };
}
