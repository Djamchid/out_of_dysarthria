/**
 * parcours-router.js
 * Gestion des bifurcations entre parcours
 */

class ParcoursRouter {
    constructor(parcours, storage) {
        this.parcours = parcours;
        this.storage = storage;

        // Compteur de répétitions par étape
        this.stepRepetitions = new Map();

        // Seuil de répétitions avant suggestion automatique
        this.AUTO_SUGGEST_THRESHOLD = 3;

        // État de la bifurcation
        this.bifurcationPending = false;
        this.selectedBlockage = null;
    }

    /**
     * Enregistre une répétition d'étape
     * @param {string} stepId
     * @returns {number} Nombre de répétitions
     */
    recordStepRepetition(stepId) {
        const currentCount = this.stepRepetitions.get(stepId) || 0;
        const newCount = currentCount + 1;
        this.stepRepetitions.set(stepId, newCount);
        return newCount;
    }

    /**
     * Réinitialise le compteur de répétitions pour une étape
     * @param {string} stepId
     */
    resetStepRepetitions(stepId) {
        this.stepRepetitions.delete(stepId);
    }

    /**
     * Vérifie si une suggestion automatique doit être affichée
     * @param {string} stepId
     * @returns {boolean}
     */
    shouldAutoSuggestBifurcation(stepId) {
        const count = this.stepRepetitions.get(stepId) || 0;
        return count >= this.AUTO_SUGGEST_THRESHOLD;
    }

    /**
     * Obtient les options de bifurcation selon le type de blocage
     * @param {string} blockageType
     * @returns {Object|null}
     */
    getBifurcationOption(blockageType) {
        const options = {
            'ventricular': {
                parcoursType: PARCOURS_TYPES.A_DETENTE,
                name: 'Détente laryngée',
                description: 'Pour relâcher la tension du larynx',
                icon: '😓'
            },
            'spasticity': {
                parcoursType: PARCOURS_TYPES.B_RELACHEMENT,
                name: 'Relâchement musculaire',
                description: 'Pour détendre les muscles articulatoires',
                icon: '💪'
            },
            'fatigue': {
                parcoursType: PARCOURS_TYPES.C_ECONOMIE,
                name: 'Mode économie',
                description: 'Pour récupérer avec effort minimal',
                icon: '😴'
            },
            'unknown': {
                parcoursType: PARCOURS_TYPES.D_MODIFIE,
                name: 'Standard modifié',
                description: 'Progression douce et alternative',
                icon: '🌀'
            }
        };

        return options[blockageType] || null;
    }

    /**
     * Obtient toutes les options de bifurcation
     * @returns {Array}
     */
    getAllBifurcationOptions() {
        return [
            {
                id: 'ventricular',
                parcoursType: PARCOURS_TYPES.A_DETENTE,
                name: 'Bandes ventriculaires',
                description: 'Vibrations parasites',
                icon: '😓',
                parcours: 'Détente laryngée'
            },
            {
                id: 'spasticity',
                parcoursType: PARCOURS_TYPES.B_RELACHEMENT,
                name: 'Spasticité musculaire',
                description: 'Muscles trop tendus',
                icon: '💪',
                parcours: 'Relâchement musculaire'
            },
            {
                id: 'fatigue',
                parcoursType: PARCOURS_TYPES.C_ECONOMIE,
                name: 'Fatigue importante',
                description: 'Manque d\'énergie',
                icon: '😴',
                parcours: 'Mode économie'
            },
            {
                id: 'unknown',
                parcoursType: PARCOURS_TYPES.D_MODIFIE,
                name: 'Autre / Ne sais pas',
                description: 'Parcours standard modifié',
                icon: '🌀',
                parcours: 'Standard modifié'
            }
        ];
    }

    /**
     * Initie une bifurcation vers un parcours alternatif
     * @param {string} blockageType Type de blocage sélectionné
     * @param {number} fromStepIndex Index de l'étape actuelle
     * @returns {boolean}
     */
    initiateBifurcation(blockageType, fromStepIndex) {
        const option = this.getBifurcationOption(blockageType);
        if (!option) {
            console.error('Type de blocage invalide:', blockageType);
            return false;
        }

        // Sauvegarder le type de blocage sélectionné
        this.selectedBlockage = blockageType;

        // Effectuer le changement de parcours
        const success = this.parcours.switchParcours(option.parcoursType, fromStepIndex);

        if (success) {
            // Réinitialiser les répétitions
            this.stepRepetitions.clear();

            console.log(`✨ Bifurcation vers ${option.name}`);
        }

        return success;
    }

    /**
     * Retourne au parcours standard
     * @param {number} returnStepIndex Index de retour (optionnel)
     * @returns {boolean}
     */
    returnToStandard(returnStepIndex = null) {
        const success = this.parcours.returnToStandard(returnStepIndex);

        if (success) {
            // Réinitialiser les répétitions
            this.stepRepetitions.clear();
            this.selectedBlockage = null;

            console.log('↩️ Retour au parcours standard');
        }

        return success;
    }

    /**
     * Vérifie si on doit proposer un retour au standard
     * @returns {boolean}
     */
    shouldSuggestReturnToStandard() {
        const currentStep = this.parcours.getCurrentStep();
        return currentStep && currentStep.returnToStandard !== undefined;
    }

    /**
     * Obtient l'état actuel du router
     * @returns {Object}
     */
    getState() {
        return {
            currentParcoursType: this.parcours.getCurrentType(),
            selectedBlockage: this.selectedBlockage,
            stepRepetitions: Object.fromEntries(this.stepRepetitions),
            parcoursHistory: this.parcours.getParcoursHistory()
        };
    }

    /**
     * Génère un résumé du parcours pour l'historique
     * @returns {Array}
     */
    generateParcoursPath() {
        const history = this.parcours.getParcoursHistory();
        return history.map((entry, index) => {
            const metadata = PARCOURS_METADATA[entry.type] || {};
            return {
                type: entry.type,
                name: metadata.name || entry.type,
                startedAt: entry.startedAt,
                fromStep: entry.fromStandardStep,
                returnedToStep: entry.returnedToStep
            };
        });
    }

    /**
     * Réinitialise le router
     */
    reset() {
        this.stepRepetitions.clear();
        this.bifurcationPending = false;
        this.selectedBlockage = null;
    }
}

// Export pour utilisation dans d'autres modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ParcoursRouter;
}
