/**
 * parcours.js
 * Définition du parcours standard de récupération vocale
 */

const PARCOURS_STANDARD = [
    {
        id: 'vowels',
        title: 'Voyelles isolées',
        instruction: 'Prononcez chaque voyelle clairement',
        content: ['a', 'e', 'i', 'o', 'u', 'é', 'è', 'ou', 'on', 'an'],
        displayMode: 'spaced'
    },
    {
        id: 'simple-consonants',
        title: 'Consonnes simples',
        instruction: 'Articulez distinctement chaque consonne',
        content: ['m', 'n', 'p', 'b', 't', 'd'],
        displayMode: 'spaced'
    },
    {
        id: 'syllables-cv',
        title: 'Syllabes CV',
        instruction: 'Prononcez chaque syllabe distinctement',
        content: [
            ['ma', 'me', 'mi', 'mo', 'mu'],
            ['pa', 'pe', 'pi', 'po', 'pu'],
            ['ba', 'be', 'bi', 'bo', 'bu']
        ],
        displayMode: 'grouped'
    },
    {
        id: 'whispers',
        title: 'Chuchotements',
        instruction: 'Répétez les syllabes en chuchotant',
        content: [
            ['ma', 'me', 'mi'],
            ['pa', 'pe', 'pi'],
            ['ba', 'be', 'bi']
        ],
        displayMode: 'grouped'
    },
    {
        id: 'complex-consonants',
        title: 'Consonnes complexes',
        instruction: 'Prenez votre temps pour chaque son',
        content: ['ch', 'j', 's', 'f', 'v', 'z', 'r', 'l'],
        displayMode: 'spaced'
    },
    {
        id: 'complex-syllables',
        title: 'Syllabes complexes',
        instruction: 'Articulez avec précision',
        content: [
            ['cha', 'je', 'si', 'fa', 'va'],
            ['ra', 'la', 'cho', 'jo', 'so']
        ],
        displayMode: 'grouped'
    },
    {
        id: 'short-words',
        title: 'Mots courts',
        instruction: 'Prononcez chaque mot entièrement',
        content: ['maman', 'papa', 'bonjour', 'merci', 'oui', 'non', 'salut'],
        displayMode: 'list'
    },
    {
        id: 'final-sentence',
        title: 'Phrase de validation',
        instruction: 'Dites cette phrase à voix haute',
        content: ['Je retrouve ma voix progressivement'],
        displayMode: 'single'
    }
];

/**
 * Classe Parcours - Gestion du parcours de récupération vocale
 */
class Parcours {
    constructor() {
        this.steps = PARCOURS_STANDARD;
        this.currentStepIndex = 0;
    }

    /**
     * Obtient le nombre total d'étapes
     * @returns {number}
     */
    getTotalSteps() {
        return this.steps.length;
    }

    /**
     * Obtient l'étape courante
     * @returns {Object|null}
     */
    getCurrentStep() {
        if (this.currentStepIndex < 0 || this.currentStepIndex >= this.steps.length) {
            return null;
        }
        return this.steps[this.currentStepIndex];
    }

    /**
     * Obtient l'index de l'étape courante (base 0)
     * @returns {number}
     */
    getCurrentStepIndex() {
        return this.currentStepIndex;
    }

    /**
     * Définit l'étape courante
     * @param {number} index
     */
    setCurrentStepIndex(index) {
        if (index >= 0 && index < this.steps.length) {
            this.currentStepIndex = index;
        }
    }

    /**
     * Passe à l'étape suivante
     * @returns {boolean} True si on a pu avancer, false si on est à la fin
     */
    nextStep() {
        if (this.currentStepIndex < this.steps.length - 1) {
            this.currentStepIndex++;
            return true;
        }
        return false;
    }

    /**
     * Retourne à l'étape précédente
     * @returns {boolean} True si on a pu reculer, false si on est au début
     */
    previousStep() {
        if (this.currentStepIndex > 0) {
            this.currentStepIndex--;
            return true;
        }
        return false;
    }

    /**
     * Vérifie si on est à la dernière étape
     * @returns {boolean}
     */
    isLastStep() {
        return this.currentStepIndex === this.steps.length - 1;
    }

    /**
     * Vérifie si on est à la première étape
     * @returns {boolean}
     */
    isFirstStep() {
        return this.currentStepIndex === 0;
    }

    /**
     * Calcule le pourcentage de progression
     * @returns {number} Pourcentage entre 0 et 100
     */
    getProgressPercentage() {
        if (this.steps.length === 0) return 0;
        return Math.round(((this.currentStepIndex + 1) / this.steps.length) * 100);
    }

    /**
     * Réinitialise le parcours au début
     */
    reset() {
        this.currentStepIndex = 0;
    }

    /**
     * Obtient une étape par son ID
     * @param {string} stepId
     * @returns {Object|null}
     */
    getStepById(stepId) {
        return this.steps.find(step => step.id === stepId) || null;
    }

    /**
     * Obtient toutes les étapes
     * @returns {Array}
     */
    getAllSteps() {
        return [...this.steps];
    }
}

// Export pour utilisation dans d'autres modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { Parcours, PARCOURS_STANDARD };
}
