/**
 * suggestions.js
 * Algorithme de suggestions intelligentes basé sur l'historique
 */

class SuggestionsEngine {
    constructor(storage) {
        this.storage = storage;

        // Seuils pour les suggestions
        this.MIN_SESSIONS_FOR_PATTERN = 3;
        this.BLOCKAGE_FREQUENCY_THRESHOLD = 0.6; // 60%
    }

    /**
     * Obtient le contexte actuel
     * @returns {Object}
     */
    getCurrentContext() {
        const now = new Date();
        const hour = now.getHours();
        const dayOfWeek = now.getDay(); // 0 = dimanche, 6 = samedi

        let timeOfDay;
        if (hour >= 5 && hour < 12) {
            timeOfDay = 'morning';
        } else if (hour >= 12 && hour < 17) {
            timeOfDay = 'afternoon';
        } else if (hour >= 17 && hour < 22) {
            timeOfDay = 'evening';
        } else {
            timeOfDay = 'night';
        }

        const daysOfWeek = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

        return {
            timeOfDay,
            dayOfWeek: daysOfWeek[dayOfWeek],
            hour,
            timestamp: now.toISOString()
        };
    }

    /**
     * Obtient les N dernières sessions de l'historique
     * @param {number} n Nombre de sessions
     * @returns {Array}
     */
    getLastNSessions(n) {
        const history = this.storage.getParcoursHistory();
        return history.slice(0, n);
    }

    /**
     * Calcule la fréquence d'un type de blocage
     * @param {string} blockageType
     * @param {number} sessionCount Nombre de sessions à analyser
     * @returns {number} Fréquence entre 0 et 1
     */
    getBlockageFrequency(blockageType, sessionCount = 5) {
        const sessions = this.getLastNSessions(sessionCount);

        if (sessions.length === 0) {
            return 0;
        }

        const blockageCount = sessions.filter(session => {
            return session.blockages && session.blockages.includes(blockageType);
        }).length;

        return blockageCount / sessions.length;
    }

    /**
     * Détecte un pattern de parcours utilisé
     * @param {string} parcoursType Type de parcours
     * @param {number} sessionCount Nombre de sessions à analyser
     * @returns {Object|null}
     */
    detectParcoursPattern(parcoursType, sessionCount = 3) {
        const sessions = this.getLastNSessions(sessionCount);

        if (sessions.length < this.MIN_SESSIONS_FOR_PATTERN) {
            return null;
        }

        // Vérifier si toutes les sessions ont utilisé ce parcours
        const allUsedParcours = sessions.every(session => {
            return session.parcoursPath &&
                   session.parcoursPath.some(path => path.includes(parcoursType));
        });

        if (!allUsedParcours) {
            return null;
        }

        // Vérifier si le contexte est similaire
        const currentContext = this.getCurrentContext();
        const contextMatch = sessions.filter(session => {
            return session.context &&
                   session.context.timeOfDay === currentContext.timeOfDay;
        }).length;

        return {
            parcoursType,
            sessionCount: sessions.length,
            contextMatch: contextMatch / sessions.length,
            confidence: (contextMatch / sessions.length) * 100
        };
    }

    /**
     * Génère une suggestion de parcours au démarrage
     * @returns {Object|null}
     */
    getSuggestionAtStart() {
        const currentContext = this.getCurrentContext();

        // 1. Vérifier les patterns récents pour chaque parcours
        const parcours = [
            PARCOURS_TYPES.A_DETENTE,
            PARCOURS_TYPES.B_RELACHEMENT,
            PARCOURS_TYPES.C_ECONOMIE,
            PARCOURS_TYPES.D_MODIFIE
        ];

        for (const parcoursType of parcours) {
            const pattern = this.detectParcoursPattern(parcoursType);
            if (pattern && pattern.confidence >= 60) {
                const metadata = PARCOURS_METADATA[parcoursType];
                return {
                    type: 'pattern',
                    parcoursType,
                    parcoursName: metadata.name,
                    reason: `D'après votre historique, le ${metadata.name} fonctionne bien ${this.getTimeOfDayText(currentContext.timeOfDay)}.`,
                    confidence: pattern.confidence
                };
            }
        }

        // 2. Vérifier les blocages récurrents
        const blockageTypes = ['ventricular', 'spasticity', 'fatigue', 'unknown'];

        for (const blockageType of blockageTypes) {
            const frequency = this.getBlockageFrequency(blockageType);

            if (frequency >= this.BLOCKAGE_FREQUENCY_THRESHOLD) {
                const parcoursMap = {
                    'ventricular': PARCOURS_TYPES.A_DETENTE,
                    'spasticity': PARCOURS_TYPES.B_RELACHEMENT,
                    'fatigue': PARCOURS_TYPES.C_ECONOMIE,
                    'unknown': PARCOURS_TYPES.D_MODIFIE
                };

                const suggestedParcours = parcoursMap[blockageType];
                const metadata = PARCOURS_METADATA[suggestedParcours];

                return {
                    type: 'blockage',
                    parcoursType: suggestedParcours,
                    parcoursName: metadata.name,
                    reason: `Vous rencontrez souvent ce type de difficulté (${Math.round(frequency * 100)}% des sessions récentes). Le ${metadata.name} pourrait vous aider.`,
                    confidence: frequency * 100
                };
            }
        }

        // 3. Pas de suggestion
        return null;
    }

    /**
     * Génère une suggestion après une bifurcation
     * @param {string} currentBlockage Type de blocage actuel
     * @returns {Object|null}
     */
    getSuggestionAfterBifurcation(currentBlockage) {
        // Analyser si ce parcours a été efficace par le passé
        const sessions = this.getLastNSessions(10);

        const parcoursMap = {
            'ventricular': PARCOURS_TYPES.A_DETENTE,
            'spasticity': PARCOURS_TYPES.B_RELACHEMENT,
            'fatigue': PARCOURS_TYPES.C_ECONOMIE,
            'unknown': PARCOURS_TYPES.D_MODIFIE
        };

        const parcoursType = parcoursMap[currentBlockage];
        if (!parcoursType) {
            return null;
        }

        const sessionsWithThisParcours = sessions.filter(session => {
            return session.parcoursPath &&
                   session.parcoursPath.some(path => path.includes(parcoursType)) &&
                   session.completed === true &&
                   session.outcome && session.outcome.userRating >= 4;
        });

        if (sessionsWithThisParcours.length >= 2) {
            return {
                type: 'encouragement',
                message: `Ce parcours vous a aidé ${sessionsWithThisParcours.length} fois par le passé. Continuez !`,
                confidence: 80
            };
        }

        return null;
    }

    /**
     * Convertit une période de la journée en texte
     * @param {string} timeOfDay
     * @returns {string}
     */
    getTimeOfDayText(timeOfDay) {
        const texts = {
            'morning': 'le matin',
            'afternoon': 'l\'après-midi',
            'evening': 'le soir',
            'night': 'la nuit'
        };
        return texts[timeOfDay] || '';
    }

    /**
     * Enregistre le feedback sur une suggestion
     * @param {string} suggestionId
     * @param {boolean} accepted
     */
    recordSuggestionFeedback(suggestionId, accepted) {
        const key = 'suggestionFeedback';
        let feedback = this.storage.get(key, []);

        feedback.push({
            id: suggestionId,
            accepted,
            timestamp: new Date().toISOString()
        });

        // Limiter à 50 entrées
        if (feedback.length > 50) {
            feedback = feedback.slice(0, 50);
        }

        this.storage.set(key, feedback);
    }

    /**
     * Calcule le taux d'acceptance des suggestions
     * @returns {number} Taux entre 0 et 1
     */
    getSuggestionAcceptanceRate() {
        const feedback = this.storage.get('suggestionFeedback', []);

        if (feedback.length === 0) {
            return 0;
        }

        const acceptedCount = feedback.filter(f => f.accepted).length;
        return acceptedCount / feedback.length;
    }

    /**
     * Vérifie si les suggestions doivent être activées
     * @returns {boolean}
     */
    shouldShowSuggestions() {
        const prefs = this.storage.getPreferences();
        return prefs.showSuggestions !== false; // Activé par défaut
    }
}

// Export pour utilisation dans d'autres modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SuggestionsEngine;
}
