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
 * Parcours A : Détente laryngée
 * Pour les bandes ventriculaires (vibrations parasites)
 */
const PARCOURS_A_DETENTE = [
    {
        id: 'deep-breathing',
        title: 'Respiration profonde',
        instruction: 'Inspirez 4 secondes, expirez 6 secondes',
        content: ['Inspirez lentement par le nez...', 'Expirez doucement par la bouche...', 'Répétez 3 fois'],
        displayMode: 'list',
        duration: 30
    },
    {
        id: 'yawning',
        title: 'Bâillements',
        instruction: 'Réalisez 5 bâillements contrôlés',
        content: ['Ouvrez grand la bouche', 'Laissez le bâillement se faire naturellement', 'Ressentez le relâchement'],
        displayMode: 'list',
        duration: 40
    },
    {
        id: 'low-sounds',
        title: 'Sons graves relâchés',
        instruction: 'Émettez des sons très doux',
        content: ['hhhhh', 'aaaah', 'hoooo'],
        displayMode: 'spaced',
        duration: 35
    },
    {
        id: 'prolonged-whispers',
        title: 'Chuchotements prolongés',
        instruction: 'Prononcez en chuchotant',
        content: [
            ['ma', 'me', 'mi'],
            ['sa', 'se', 'si'],
            ['la', 'le', 'li']
        ],
        displayMode: 'grouped',
        duration: 40
    },
    {
        id: 'open-vowels',
        title: 'Voyelles ouvertes',
        instruction: 'Prononcez en voix douce',
        content: ['a', 'o', 'â', 'ô'],
        displayMode: 'spaced',
        duration: 30
    },
    {
        id: 'progressive-transition-a',
        title: 'Transition progressive',
        instruction: 'Vous pouvez retourner au parcours standard',
        content: ['Vous vous sentez plus détendu(e)', 'Retour au parcours principal étape 3'],
        displayMode: 'list',
        duration: 20,
        returnToStandard: 2
    }
];

/**
 * Parcours B : Relâchement musculaire
 * Pour la spasticité musculaire (muscles trop tendus)
 */
const PARCOURS_B_RELACHEMENT = [
    {
        id: 'facial-massage',
        title: 'Massage facial',
        instruction: 'Massez doucement votre visage',
        content: ['Massez vos joues en cercles', 'Détendez votre mâchoire', 'Massez vos lèvres doucement'],
        displayMode: 'list',
        duration: 60
    },
    {
        id: 'passive-movements',
        title: 'Mouvements passifs',
        instruction: 'Mobilisez doucement votre mâchoire',
        content: ['Ouvrez et fermez lentement', 'Mouvements latéraux doux', 'Laissez pendre votre mâchoire'],
        displayMode: 'list',
        duration: 45
    },
    {
        id: 'soft-consonants',
        title: 'Consonnes douces',
        instruction: 'Articulez sans forcer',
        content: ['m', 'n', 'l'],
        displayMode: 'spaced',
        duration: 30
    },
    {
        id: 'fluid-syllables',
        title: 'Syllabes fluides',
        instruction: 'Prononcez en continu, sans à-coups',
        content: [
            ['ma', 'ma', 'ma'],
            ['na', 'na', 'na'],
            ['la', 'la', 'la']
        ],
        displayMode: 'grouped',
        duration: 40
    },
    {
        id: 'sustained-sounds',
        title: 'Sons soutenus',
        instruction: 'Tenez chaque voyelle 5 secondes',
        content: ['aaaaaaa', 'ooooooo', 'iiiiiii'],
        displayMode: 'spaced',
        duration: 35
    },
    {
        id: 'progressive-transition-b',
        title: 'Transition progressive',
        instruction: 'Vous pouvez retourner au parcours standard',
        content: ['Vos muscles sont plus détendus', 'Retour au parcours principal étape 2'],
        displayMode: 'list',
        duration: 20,
        returnToStandard: 1
    }
];

/**
 * Parcours C : Mode économie
 * Pour la fatigue importante (manque d'énergie)
 */
const PARCOURS_C_ECONOMIE = [
    {
        id: 'silent-rest',
        title: 'Repos silencieux',
        instruction: 'Prenez 30 secondes de pause complète',
        content: ['Fermez les yeux', 'Respirez calmement', 'Reposez votre voix'],
        displayMode: 'list',
        duration: 30
    },
    {
        id: 'whispers-only',
        title: 'Chuchotements uniquement',
        instruction: 'Pas de voix sonorisée pour l\'instant',
        content: ['Chuchotez doucement', 'Sans forcer', 'Minimal effort'],
        displayMode: 'list',
        duration: 25
    },
    {
        id: 'whispered-vowels',
        title: 'Voyelles chuchotées',
        instruction: 'Chuchotez chaque voyelle',
        content: ['a', 'i', 'o'],
        displayMode: 'spaced',
        duration: 25
    },
    {
        id: 'short-whispered-words',
        title: 'Mots courts chuchotés',
        instruction: 'Chuchotez ces mots simples',
        content: ['oui', 'non', 'merci', 'bonjour', 'salut'],
        displayMode: 'list',
        duration: 30
    },
    {
        id: 'soft-voice-test',
        title: 'Test voix douce',
        instruction: 'Essayez une phrase en voix très douce',
        content: ['Je reprends doucement'],
        displayMode: 'single',
        duration: 20
    },
    {
        id: 'validation-c',
        title: 'Validation',
        instruction: 'Vous avez économisé votre énergie',
        content: ['Bravo, vous avez pris soin de votre voix', 'Reposez-vous si nécessaire'],
        displayMode: 'list',
        duration: 15
    }
];

/**
 * Parcours D : Standard modifié
 * Pour "Autre / Ne sais pas"
 */
const PARCOURS_D_MODIFIE = [
    {
        id: 'prolonged-vowels',
        title: 'Voyelles prolongées',
        instruction: 'Tenez chaque voyelle 3 secondes',
        content: ['aaa', 'eee', 'iii', 'ooo', 'uuu'],
        displayMode: 'spaced',
        duration: 35
    },
    {
        id: 'nasal-consonants',
        title: 'Consonnes nasales',
        instruction: 'Plus faciles à articuler',
        content: ['m', 'n'],
        displayMode: 'spaced',
        duration: 25
    },
    {
        id: 'repeated-syllables',
        title: 'Syllabes répétées',
        instruction: 'Répétez chaque série',
        content: [
            ['ma', 'ma', 'ma'],
            ['na', 'na', 'na']
        ],
        displayMode: 'grouped',
        duration: 35
    },
    {
        id: 'whispers-d',
        title: 'Chuchotements',
        instruction: 'Étape habituelle en chuchotant',
        content: [
            ['ma', 'me', 'mi'],
            ['na', 'ne', 'ni']
        ],
        displayMode: 'grouped',
        duration: 35
    },
    {
        id: 'progressive-return',
        title: 'Retour progressif',
        instruction: 'Reprenons le parcours standard',
        content: ['Vous avez bien progressé', 'Retour au parcours principal étape 5'],
        displayMode: 'list',
        duration: 20,
        returnToStandard: 4
    }
];

/**
 * Types de parcours disponibles
 */
const PARCOURS_TYPES = {
    STANDARD: 'standard',
    A_DETENTE: 'A',
    B_RELACHEMENT: 'B',
    C_ECONOMIE: 'C',
    D_MODIFIE: 'D'
};

/**
 * Métadonnées des parcours
 */
const PARCOURS_METADATA = {
    'standard': {
        name: 'Parcours standard',
        color: '#2C3E50',
        description: 'Parcours complet de récupération vocale',
        blockageType: 'none'
    },
    'A': {
        name: 'Détente laryngée',
        color: '#3498DB',
        description: 'Pour les bandes ventriculaires (vibrations parasites)',
        blockageType: 'ventricular'
    },
    'B': {
        name: 'Relâchement musculaire',
        color: '#9B59B6',
        description: 'Pour la spasticité musculaire (muscles trop tendus)',
        blockageType: 'spasticity'
    },
    'C': {
        name: 'Mode économie',
        color: '#F39C12',
        description: 'Pour la fatigue importante (manque d\'énergie)',
        blockageType: 'fatigue'
    },
    'D': {
        name: 'Standard modifié',
        color: '#95A5A6',
        description: 'Progression douce (autre / ne sais pas)',
        blockageType: 'unknown'
    }
};

/**
 * Classe Parcours - Gestion du parcours de récupération vocale
 */
class Parcours {
    constructor(initialType = PARCOURS_TYPES.STANDARD) {
        this.currentType = initialType;
        this.steps = this.getStepsForType(initialType);
        this.currentStepIndex = 0;

        // Historique des parcours utilisés dans la session
        this.parcoursHistory = [{
            type: initialType,
            startedAt: Date.now()
        }];
    }

    /**
     * Obtient les étapes pour un type de parcours donné
     * @param {string} type
     * @returns {Array}
     */
    getStepsForType(type) {
        switch (type) {
            case PARCOURS_TYPES.A_DETENTE:
                return PARCOURS_A_DETENTE;
            case PARCOURS_TYPES.B_RELACHEMENT:
                return PARCOURS_B_RELACHEMENT;
            case PARCOURS_TYPES.C_ECONOMIE:
                return PARCOURS_C_ECONOMIE;
            case PARCOURS_TYPES.D_MODIFIE:
                return PARCOURS_D_MODIFIE;
            case PARCOURS_TYPES.STANDARD:
            default:
                return PARCOURS_STANDARD;
        }
    }

    /**
     * Change le parcours actuel (bifurcation)
     * @param {string} newType Type du nouveau parcours
     * @param {number} fromStepIndex Index de l'étape d'où vient la bifurcation
     * @returns {boolean}
     */
    switchParcours(newType, fromStepIndex) {
        if (!Object.values(PARCOURS_TYPES).includes(newType)) {
            console.error('Type de parcours invalide:', newType);
            return false;
        }

        this.currentType = newType;
        this.steps = this.getStepsForType(newType);
        this.currentStepIndex = 0;

        // Enregistrer la bifurcation
        this.parcoursHistory.push({
            type: newType,
            startedAt: Date.now(),
            fromStandardStep: fromStepIndex
        });

        return true;
    }

    /**
     * Retourne au parcours standard
     * @param {number} stepIndex Index de retour (optionnel)
     * @returns {boolean}
     */
    returnToStandard(stepIndex = null) {
        const currentStep = this.getCurrentStep();
        const returnStep = stepIndex !== null ? stepIndex : (currentStep?.returnToStandard || 0);

        this.currentType = PARCOURS_TYPES.STANDARD;
        this.steps = PARCOURS_STANDARD;
        this.currentStepIndex = returnStep;

        // Enregistrer le retour
        this.parcoursHistory.push({
            type: PARCOURS_TYPES.STANDARD,
            startedAt: Date.now(),
            returnedToStep: returnStep
        });

        return true;
    }

    /**
     * Obtient le type de parcours actuel
     * @returns {string}
     */
    getCurrentType() {
        return this.currentType;
    }

    /**
     * Obtient les métadonnées du parcours actuel
     * @returns {Object}
     */
    getCurrentMetadata() {
        return PARCOURS_METADATA[this.currentType] || PARCOURS_METADATA['standard'];
    }

    /**
     * Obtient l'historique des parcours
     * @returns {Array}
     */
    getParcoursHistory() {
        return [...this.parcoursHistory];
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
     * @param {string} type Type de parcours (optionnel)
     */
    reset(type = PARCOURS_TYPES.STANDARD) {
        this.currentType = type;
        this.steps = this.getStepsForType(type);
        this.currentStepIndex = 0;
        this.parcoursHistory = [{
            type: type,
            startedAt: Date.now()
        }];
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
    module.exports = {
        Parcours,
        PARCOURS_STANDARD,
        PARCOURS_A_DETENTE,
        PARCOURS_B_RELACHEMENT,
        PARCOURS_C_ECONOMIE,
        PARCOURS_D_MODIFIE,
        PARCOURS_TYPES,
        PARCOURS_METADATA
    };
}
