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

// ==========================================
// PARCOURS TABATA - FONCTION
// ==========================================

/**
 * Parcours 3: Souffle - Contrôle respiratoire
 */
const PARCOURS_SOUFFLE = [
    { id: 'souffle-intro', title: 'Introduction au souffle', instruction: 'Préparez-vous pour les exercices de contrôle respiratoire', content: ['Ces exercices renforcent votre capacité respiratoire'], displayMode: 'list', duration: 20 },
    { id: 'souffle-49', title: 'Gonfler les joues', instruction: 'En serrant fortement les lèvres, gonfler les deux joues en même temps. L\'air ne peut pas sortir, ni par le nez, ni par la bouche.', content: ['Gonfler', 'Maintenir', 'Relâcher'], displayMode: 'list', duration: 30 },
    { id: 'souffle-51', title: 'Bougie douce', instruction: 'Souffler doucement sur une bougie le plus longtemps possible. Faire vaciller la flamme mais ne pas l\'éteindre.', content: ['Soufflez doucement', 'Le plus longtemps possible', 'Sans éteindre'], displayMode: 'list', duration: 40 },
    { id: 'souffle-50', title: 'Bougie éloignée', instruction: 'Éteindre une bougie qu\'on éloigne de plus en plus.', content: ['Soufflez fort', 'Augmentez la distance'], displayMode: 'list', duration: 35 },
    { id: 'souffle-52', title: 'Moulin à vent', instruction: 'Souffler sur un moulin à vent.', content: ['Soufflez régulièrement', 'Faites tourner le moulin'], displayMode: 'list', duration: 30 },
    { id: 'souffle-53', title: 'Bulles de savon', instruction: 'Souffler des bulles de savon.', content: ['Soufflez doucement', 'Créez de belles bulles'], displayMode: 'list', duration: 35 },
    { id: 'souffle-54', title: 'Bille en pente', instruction: 'Faire remonter une petite bille le long d\'une pente en kapla en soufflant avec une paille.', content: ['Utilisez une paille', 'Soufflez avec précision'], displayMode: 'list', duration: 40 },
    { id: 'souffle-56', title: 'Ballons', instruction: 'Gonfler des ballons de baudruche.', content: ['Inspirez profondément', 'Gonflez progressivement'], displayMode: 'list', duration: 35 },
    { id: 'souffle-57', title: 'Bulles dans l\'eau', instruction: 'À l\'aide d\'une paille, produire des bulles dans un verre d\'eau.', content: ['Utilisez une paille', 'Créez des bulles régulières'], displayMode: 'list', duration: 30 }
];

/**
 * Parcours 4: Voix et Résonance
 */
const PARCOURS_VOIX_RESONANCE = [
    { id: 'voix-intro', title: 'Introduction à la pose de voix', instruction: 'Travaillons sur la résonance vocale', content: ['La voix doit être posée sur le souffle'], displayMode: 'list', duration: 20 },
    { id: 'voix-87', title: 'Posture', instruction: 'Bien verticale, sternum non enfoncé et respiration abdominale afin de mettre en place naturellement le soutien abdomino-diaphragmatique.', content: ['Tenez-vous droit', 'Sternum ouvert', 'Respirez avec le ventre'], displayMode: 'list', duration: 30 },
    { id: 'voix-88', title: 'Bâillement voisé', instruction: 'Inspirer fort bouche grande ouverte, de façon audible. Le voile se lève.', content: ['Inspirez fort', 'Bouche grande ouverte', 'De façon audible'], displayMode: 'list', duration: 35 },
    { id: 'voix-89', title: 'Expiration voisée', instruction: 'Souffler en expirant fort l\'air et en émettant un « A » tenu et souple. Le voile se baisse.', content: ['Expirez fort', 'Émettez « A »', 'Souple et tenu'], displayMode: 'list', duration: 35 },
    { id: 'voix-90', title: 'Le boudègue', instruction: 'Gonfler les joues et apposer les lèvres l\'une contre l\'autre sans pression. Souffler fort « Bouuuu ».', content: ['Gonflez les joues', 'Lèvres sans pression', 'Soufflez « Bouuuu »'], displayMode: 'list', duration: 35 },
    { id: 'voix-91', title: 'Le cheval', instruction: 'Battement de lèvres, comme le bruit du cheval. Pour aider, on peut venir soutenir vers le haut la lèvre du bas avec l\'index.', content: ['Vibrez les lèvres', 'Comme un cheval', 'Aidez-vous de l\'index si nécessaire'], displayMode: 'list', duration: 35 }
];

/**
 * Parcours 5: Voisement
 */
const PARCOURS_VOISEMENT = [
    { id: 'voisement-intro', title: 'Introduction au voisement', instruction: 'Travaillons les consonnes voisées et non-voisées', content: ['Sentez les vibrations dans votre gorge'], displayMode: 'list', duration: 20 },
    { id: 'voisement-92', title: 'F tenu', instruction: 'Émettre un fffff tenu', content: ['fffff'], displayMode: 'spaced', duration: 30 },
    { id: 'voisement-93-94', title: 'F vers V', instruction: 'Reprendre le fff et le transformer en vvv en cours d\'expiration. En posant une main sur la gorge vous sentirez la vibration.', content: ['fffff', 'vvvvv'], displayMode: 'spaced', duration: 35 },
    { id: 'voisement-95-96', title: 'J tenu', instruction: 'Ajouter un jjjjjjj sur l\'expiration. Sentez la vibration dans la gorge.', content: ['jjjjjjj'], displayMode: 'spaced', duration: 30 },
    { id: 'voisement-97', title: 'F-V avec voyelles', instruction: 'Ajouter une voyelle en fin de souffle', content: ['fffff vvvvv aaaa', 'fffff vvvvv éééé', 'fffff vvvvv uuu'], displayMode: 'list', duration: 40 },
    { id: 'voisement-98', title: 'Ch-J avec voyelles', instruction: 'Même exercice avec ch et j', content: ['chchch jjjjjj aaaa', 'chchch jjjjjj éééé', 'chchch jjjjjj uuu'], displayMode: 'list', duration: 40 },
    { id: 'voisement-99-100', title: 'M et N tenus', instruction: 'Lèvres jointes sans pression, émettre un mmmmmm tenu. Puis pointe de langue au palais, émettre nnnnnnn.', content: ['mmmmmm', 'nnnnnnn'], displayMode: 'spaced', duration: 35 },
    { id: 'voisement-101-102', title: 'N-G alternance', instruction: 'Reprendre le nnnn et l\'entrecouper de G, puis ajouter une voyelle', content: ['nnnnn G nnnnn G nnnnn', 'nnnnn G aaaaaa'], displayMode: 'list', duration: 35 },
    { id: 'voisement-103', title: 'Ronronnement (fry)', instruction: 'Sonorité du fry. Pensez à abaisser votre fréquence et à « faire tomber le son en fond de gorge ».', content: ['Ronronnez doucement', 'Son grave'], displayMode: 'list', duration: 35 },
    { id: 'voisement-104', title: 'Chuchotement profond', instruction: 'Bouche ouverte, on émet un A comme pour faire de la buée sur une fenêtre.', content: ['hhhhh aaaaa'], displayMode: 'spaced', duration: 30 },
    { id: 'voisement-105', title: 'Le louré', instruction: 'Reprendre le chuchotement profond en variant l\'intensité', content: ['AAAA aaaa AAAA aaaa AAA'], displayMode: 'spaced', duration: 35 }
];

/**
 * Parcours 6: Articulation
 */
const PARCOURS_ARTICULATION = [
    { id: 'artic-intro', title: 'Introduction à l\'articulation', instruction: 'Travaillons la précision articulatoire', content: ['Exagérez les mouvements'], displayMode: 'list', duration: 20 },
    { id: 'artic-42-43', title: 'Répétitions', instruction: 'Répéter avec précision', content: ['a - an, o - on, è - in', 'mba, nda, nga, sma, sni'], displayMode: 'list', duration: 35 },
    { id: 'artic-44', title: 'Grrrr et Crrrr', instruction: 'Répéter Grrrr et Crrrr en insistant', content: ['Grrrr', 'Crrrr'], displayMode: 'spaced', duration: 30 },
    { id: 'artic-64', title: 'Le chêne et le roseau', instruction: 'Réciter le poème « Le chêne et le roseau » (La Fontaine) en alternant des voix Fortes et Douces une fois sur deux.', content: ['Alternez voix forte et douce', 'Une ligne sur deux'], displayMode: 'list', duration: 60 },
    { id: 'artic-65', title: 'La Cigale et la Fourmi', instruction: 'Réciter le poème « La Cigale et la Fourmi » (La Fontaine) en alternant des voix Fortes et Douces une fois sur deux.', content: ['Alternez voix forte et douce', 'Une ligne sur deux'], displayMode: 'list', duration: 60 }
];

/**
 * Parcours 7: Déglutition
 */
const PARCOURS_DEGLUTITION = [
    { id: 'deglut-intro', title: 'Introduction à la déglutition', instruction: 'Renforçons la déglutition', content: ['Ces exercices améliorent la coordination de la déglutition'], displayMode: 'list', duration: 20 },
    { id: 'deglut-77-78', title: 'Déglutition forcée', instruction: 'Prendre un peu d\'eau, déglutir fort en serrant bien le fond de la gorge. Serrer en même temps les poings. Sentir l\'élévation du larynx.', content: ['Prenez de l\'eau', 'Déglutissez fort', 'Serrez les poings', 'Sentez le larynx'], displayMode: 'list', duration: 40 },
    { id: 'deglut-79-80', title: 'Masako', instruction: 'À vide, uniquement sur déglutition de salive. Réunir la salive sur le dessus de la langue. Sortir la langue tirée devant. Déglutir en gardant la langue tirée.', content: ['Salive uniquement', 'Sortez la langue', 'Déglutissez langue sortie'], displayMode: 'list', duration: 45 },
    { id: 'deglut-81', title: 'Mendelson', instruction: 'Prendre un peu d\'eau. Déglutir et sentir la montée du larynx (pomme d\'adam). Maintenir le larynx en haut.', content: ['Prenez de l\'eau', 'Sentez le larynx monter', 'Maintenez-le en haut'], displayMode: 'list', duration: 40 },
    { id: 'deglut-82', title: 'Langue contractée', instruction: 'Sortir la langue plate et molle. Sans la rentrer, contracter les bords pour la pointer en avant. De nouveau la rendre plate.', content: ['Langue plate', 'Contractez les bords', 'Pointez', 'Relâchez'], displayMode: 'list', duration: 35 },
    { id: 'deglut-83', title: 'Trot du cheval alterné', instruction: 'Claquer la langue une fois lèvres étirées, une fois lèvres tendues vers l\'avant. Produire un «clic-clouc».', content: ['Lèvres étirées: clic', 'Lèvres tendues: clouc'], displayMode: 'list', duration: 35 }
];

// ==========================================
// PARCOURS TABATA - ANATOMIE
// ==========================================

/**
 * Parcours 8: Lèvres
 */
const PARCOURS_LEVRES = [
    { id: 'levres-intro', title: 'Introduction - Lèvres', instruction: 'Mobilisons et tonifions les lèvres', content: ['Travaillons la mobilité labiale'], displayMode: 'list', duration: 20 },
    { id: 'levres-6', title: 'Lèvre inférieure', instruction: 'Recouvrir la lèvre inférieure par la lèvre supérieure. Maintenir.', content: ['Recouvrez', 'Maintenez'], displayMode: 'list', duration: 30 },
    { id: 'levres-7', title: 'Lèvre supérieure', instruction: 'Recouvrir la lèvre supérieure par la lèvre inférieure. Maintenir.', content: ['Recouvrez', 'Maintenez'], displayMode: 'list', duration: 30 },
    { id: 'levres-8', title: 'Bisous', instruction: 'Envoyer des bisous qui claquent, lèvres serrées et bien tendues vers l\'avant.', content: ['Lèvres tendues', 'Bisous qui claquent'], displayMode: 'list', duration: 30 },
    { id: 'levres-9', title: 'Tendre et rentrer', instruction: 'Tendre et rentrer les lèvres.', content: ['Tendez', 'Rentrez', 'Alternez'], displayMode: 'list', duration: 30 },
    { id: 'levres-10', title: 'Demi-sourires', instruction: 'Faire des demi-sourires, sourires en coin à gauche puis à droite.', content: ['Sourire gauche', 'Sourire droite'], displayMode: 'list', duration: 30 },
    { id: 'levres-11', title: 'Grand sourire', instruction: 'Faire un grand sourire en gardant les lèvres serrées. Maintenir.', content: ['Grand sourire', 'Lèvres serrées', 'Maintenez'], displayMode: 'list', duration: 30 },
    { id: 'levres-12', title: 'Moue', instruction: 'Faire la moue en abaissant les commissures des lèvres. Maintenir.', content: ['Moue', 'Commissures baissées', 'Maintenez'], displayMode: 'list', duration: 30 },
    { id: 'levres-13', title: 'Mouvements latéraux', instruction: 'Bouger les lèvres, ensemble, vers la gauche et vers la droite.', content: ['Gauche', 'Droite', 'Alternez'], displayMode: 'list', duration: 30 },
    { id: 'levres-14', title: 'Vibrations', instruction: 'Faire vibrer les lèvres, comme un cheval.', content: ['Vibrez les lèvres', 'Brrrr'], displayMode: 'list', duration: 30 },
    { id: 'levres-15', title: 'Dents visibles', instruction: 'Montrer toutes les dents comme un chien qui grogne.', content: ['Montrez les dents', 'Toutes visibles'], displayMode: 'list', duration: 25 },
    { id: 'levres-16', title: 'Cuillère', instruction: 'Maintenir une petite cuillère entre ses lèvres.', content: ['Serrez la cuillère', 'Entre les lèvres'], displayMode: 'list', duration: 35 },
    { id: 'levres-17', title: 'OU-I exagéré', instruction: 'Projeter les lèvres en avant en disant \'ou\' puis étirer les lèvres en disant \'i\'. L\'articulation doit être exagérée.', content: ['ou', 'i'], displayMode: 'spaced', duration: 30 },
    { id: 'levres-18', title: 'Bouton avec fil', instruction: 'Placer un bouton relié à un fil entre les lèvres et les dents. Tirer délicatement sur le fil. Tonifier les lèvres afin de ne pas laisser échapper.', content: ['Tenez le bouton', 'Résistez à la traction'], displayMode: 'list', duration: 40 },
    { id: 'levres-19', title: 'Résistance cuillère', instruction: 'Résister contre une petite cuillère avec les lèvres projetées.', content: ['Lèvres projetées', 'Résistez'], displayMode: 'list', duration: 35 },
    { id: 'levres-20-21', title: 'P et B', instruction: 'Éteindre une bougie en prononçant des «p». Prononcer \'pa\' et \'ba\' en exagérant l\'articulation.', content: ['p p p p p', 'pa', 'ba'], displayMode: 'list', duration: 35 },
    { id: 'levres-22', title: 'Crayon sous le nez', instruction: 'Maintenir un crayon entre la lèvre supérieure et le nez.', content: ['Tenez le crayon', 'Maintenez'], displayMode: 'list', duration: 35 },
    { id: 'levres-23', title: 'Lèvres serrées', instruction: 'Maintenir les lèvres serrées.', content: ['Serrez fort', 'Maintenez'], displayMode: 'list', duration: 30 },
    { id: 'levres-24', title: 'Siffler', instruction: 'Siffler.', content: ['Sifflez une mélodie'], displayMode: 'list', duration: 30 },
    { id: 'levres-25', title: 'Air dans les lèvres', instruction: 'Gonfler la lèvre inférieure avec de l\'air. Ensuite, faire passer l\'air dans la lèvre supérieure.', content: ['Lèvre inférieure', 'Lèvre supérieure'], displayMode: 'list', duration: 30 }
];

/**
 * Parcours 9: Langue
 */
const PARCOURS_LANGUE = [
    { id: 'langue-intro', title: 'Introduction - Langue', instruction: 'Mobilisons et renforçons la langue', content: ['Travaillons la mobilité linguale'], displayMode: 'list', duration: 20 },
    { id: 'langue-26', title: 'Claquer la langue', instruction: 'Claquer la langue.', content: ['Clac clac clac'], displayMode: 'list', duration: 25 },
    { id: 'langue-27', title: 'Claquer avec T', instruction: 'Claquer la langue en disant «t».', content: ['t t t t t'], displayMode: 'spaced', duration: 25 },
    { id: 'langue-28', title: 'Derrière les dents', instruction: 'Placer la pointe de la langue derrière les dents du haut, ensuite derrière les dents du bas tout en gardant la bouche ouverte.', content: ['Dents du haut', 'Dents du bas', 'Bouche ouverte'], displayMode: 'list', duration: 30 },
    { id: 'langue-29', title: 'Balayer le palais', instruction: 'Balayer tout le palais d\'avant en arrière avec la langue. Commencer avec la pointe de la langue derrière les dents du haut, sur la papille palatine.', content: ['Partez de devant', 'Balayez vers l\'arrière'], displayMode: 'list', duration: 35 },
    { id: 'langue-30', title: 'Cacher les dents', instruction: 'Cacher les dents du haut ou celles du bas en glissant la langue entre les lèvres et les dents.', content: ['Dents du haut', 'Dents du bas'], displayMode: 'list', duration: 30 },
    { id: 'langue-31', title: 'KA-LA et PA-TA-KA', instruction: 'Prononcer rapidement \'ka – la\' ou \'pa – ta – ka\'.', content: ['ka la ka la ka la', 'pa ta ka pa ta ka'], displayMode: 'list', duration: 35 },
    { id: 'langue-32', title: 'Balayer les lèvres', instruction: 'Balayer les lèvres avec la langue.', content: ['Lèvre supérieure', 'Lèvre inférieure', 'Tour complet'], displayMode: 'list', duration: 30 },
    { id: 'langue-33', title: 'Lécher les lèvres', instruction: 'Lécher la lèvre inférieure puis la lèvre supérieure.', content: ['Lèvre inférieure', 'Lèvre supérieure'], displayMode: 'list', duration: 25 },
    { id: 'langue-34', title: 'Mouvements directionnels', instruction: 'Orienter la langue vers le nez, vers la commissure des lèvres à droite et à gauche, vers le menton.', content: ['Vers le nez', 'Vers la droite', 'Vers la gauche', 'Vers le menton'], displayMode: 'list', duration: 35 },
    { id: 'langue-35', title: 'Avant-arrière', instruction: 'Sortir la pointe de la langue le plus loin possible en avant et la rentrer le plus possible en arrière.', content: ['Le plus loin devant', 'Le plus loin derrière'], displayMode: 'list', duration: 30 },
    { id: 'langue-36', title: 'Balayer les dents', instruction: 'Avec la pointe de langue balayer les dents du haut et du bas, sur les faces intérieures et extérieures.', content: ['Faces intérieures', 'Faces extérieures', 'Haut et bas'], displayMode: 'list', duration: 35 },
    { id: 'langue-37', title: 'Élastique en équilibre', instruction: 'Placer un élastique orthodontique sur la pointe de la langue tirée en avant et relevée vers le haut. Le tenir en équilibre.', content: ['Langue tirée en avant', 'Relevée vers le haut', 'Tenez l\'élastique'], displayMode: 'list', duration: 40 },
    { id: 'langue-38', title: 'Vers le nez et papille', instruction: 'Monter la pointe de la langue vers le nez, le plus loin possible. Puis, la rentrer et placer la pointe de la langue sur la papille palatine, derrière.', content: ['Vers le nez', 'Rentrer', 'Sur la papille'], displayMode: 'list', duration: 35 },
    { id: 'langue-39', title: 'Vers le menton', instruction: 'Descendre la pointe de la langue le plus bas possible, vers le menton.', content: ['Le plus bas possible'], displayMode: 'list', duration: 25 },
    { id: 'langue-40', title: 'Pousser les joues', instruction: 'Pousser, avec la langue, à l\'intérieur de la joue droite puis à l\'intérieur de la joue gauche.', content: ['Joue droite', 'Joue gauche'], displayMode: 'list', duration: 30 },
    { id: 'langue-41', title: 'Résistance cuillère', instruction: 'Résister contre la pression d\'une petite cuillère', content: ['Poussez avec la langue', 'Résistez à la cuillère'], displayMode: 'list', duration: 35 },
    { id: 'langue-42', title: 'Élastique maintenu', instruction: 'Placer un élastique orthodontique sur la pointe de la langue positionnée derrière les dents du haut. Cet exercice peut être répété durant la journée.', content: ['Langue derrière les dents', 'Tenez l\'élastique'], displayMode: 'list', duration: 35 },
    { id: 'langue-43', title: 'Mouvements latéraux', instruction: 'Réaliser des mouvements latéraux avec la langue : passer des commissures des lèvres de droite à gauche.', content: ['Droite', 'Gauche', 'Alternez'], displayMode: 'list', duration: 30 },
    { id: 'langue-44', title: 'Langue de chat', instruction: 'Sortir et entrer la langue étalée à plat (langue de chat).', content: ['Sortir plat', 'Rentrer', 'Alternez'], displayMode: 'list', duration: 30 },
    { id: 'langue-45', title: 'Bâiller', instruction: 'Essayer de bâiller.', content: ['Bâillez naturellement', 'Bouche grande ouverte'], displayMode: 'list', duration: 25 }
];

/**
 * Parcours 10: Mâchoire
 */
const PARCOURS_MACHOIRE = [
    { id: 'machoire-intro', title: 'Introduction - Mâchoire', instruction: 'Mobilisons la mâchoire', content: ['Travaillons la mobilité mandibulaire'], displayMode: 'list', duration: 20 },
    { id: 'machoire-61', title: 'Ouvrir-fermer', instruction: 'Ouvrir et fermer la bouche plusieurs fois.', content: ['Ouvrez', 'Fermez', 'Répétez'], displayMode: 'list', duration: 30 },
    { id: 'machoire-62', title: 'Résistance ouverture', instruction: 'Essayer d\'ouvrir la bouche contre résistance : les doigts sont placés sous le menton et résistent.', content: ['Doigts sous le menton', 'Ouvrez en résistant'], displayMode: 'list', duration: 35 },
    { id: 'machoire-63', title: 'Serrer les dents', instruction: 'Serrer fortement les dents.', content: ['Serrez fort', 'Maintenez'], displayMode: 'list', duration: 25 },
    { id: 'machoire-64', title: 'Mouvements latéraux', instruction: 'Faire des mouvements de menton de la gauche vers la droite.', content: ['Gauche', 'Droite', 'Alternez'], displayMode: 'list', duration: 30 },
    { id: 'machoire-65', title: 'Avancer et mordre', instruction: 'Avancer la mâchoire inférieure et mordre la lèvre supérieure. Symétriquement, mordre la lèvre inférieure.', content: ['Mordre lèvre supérieure', 'Mordre lèvre inférieure'], displayMode: 'list', duration: 30 },
    { id: 'machoire-66', title: 'Claquer les dents', instruction: 'Claquer les dents.', content: ['Clac clac clac'], displayMode: 'list', duration: 25 },
    { id: 'machoire-67', title: 'Mâcher', instruction: 'Faire semblant de mâcher un chewing-gum.', content: ['Mâchez lentement', 'Comme un chewing-gum'], displayMode: 'list', duration: 30 }
];

/**
 * Parcours 11: Joues
 */
const PARCOURS_JOUES = [
    { id: 'joues-intro', title: 'Introduction - Joues', instruction: 'Contrôlons les joues', content: ['Travaillons le contrôle des joues'], displayMode: 'list', duration: 20 },
    { id: 'joues-54', title: 'Gonfler et résister', instruction: 'Gonfler les deux joues et résister à une pression : appuyer avec les doigts sur les joues gonflées.', content: ['Gonflez les joues', 'Résistez à la pression'], displayMode: 'list', duration: 35 },
    { id: 'joues-55', title: 'Alterner gauche-droite', instruction: 'Durant quelques secondes, gonfler la joue gauche, puis faire passer l\'air dans la joue droite.', content: ['Joue gauche', 'Joue droite', 'Alternez'], displayMode: 'list', duration: 30 },
    { id: 'joues-56', title: 'Aspirer', instruction: 'Aspirer les joues à l\'intérieur de la bouche.', content: ['Aspirez les joues', 'Creusez'], displayMode: 'list', duration: 25 }
];

// ==========================================
// PARCOURS TABATA - COMPLETS
// ==========================================

/**
 * Parcours 15: Renforcement Global
 */
const PARCOURS_RENFORCEMENT_GLOBAL = [
    { id: 'global-intro', title: 'Introduction - Corps et coordination', instruction: 'Travaillons le corps entier', content: ['La voix dépend de tout le corps'], displayMode: 'list', duration: 20 },
    { id: 'global-66', title: 'Muscles de la langue', instruction: 'Travaillez les muscles de votre langue', content: ['Préparez-vous'], displayMode: 'list', duration: 20 },
    { id: 'global-67', title: 'Cuillère résistance', instruction: 'Appuyez avec la langue contre une cuillère pendant 5 secondes, relâchez, recommencez 15 fois. La langue ne doit pas toucher les lèvres ni les dents.', content: ['Poussez 5 secondes', 'Relâchez', '15 fois'], displayMode: 'list', duration: 45 },
    { id: 'global-68', title: 'Menton vers le haut', instruction: 'Poussez le menton vers le haut avec les mains, essayez d\'ouvrir la bouche pendant 5 secondes, relâchez, recommencez 15 fois.', content: ['Résistez 5 secondes', 'Relâchez', '15 fois'], displayMode: 'list', duration: 45 },
    { id: 'global-69', title: 'Cuillère vers le bas', instruction: 'Poussez une cuillère du haut vers le bas avec la langue pendant 5 secondes, relâchez, recommencez 15 fois. La main qui tient la cuillère résiste.', content: ['Poussez 5 secondes', 'Relâchez', '15 fois'], displayMode: 'list', duration: 45 },
    { id: 'global-70', title: 'Cuillère vers le haut', instruction: 'Poussez une cuillère de bas en haut avec la langue pendant 5 secondes, relâchez, recommencez 15 fois. La main qui tient la cuillère résiste.', content: ['Poussez 5 secondes', 'Relâchez', '15 fois'], displayMode: 'list', duration: 45 },
    { id: 'global-71', title: 'Menton latéral', instruction: 'Poussez le menton vers la gauche pendant 5 secondes, relâchez, recommencer 15 fois. Avec une main, résistez au mouvement du menton.', content: ['Gauche 5 secondes', 'Relâchez', '15 fois', 'Puis droite'], displayMode: 'list', duration: 45 },
    { id: 'global-72', title: 'Omoplates et bras', instruction: 'Mettez les coudes en arrière, omoplates serrées, puis tendez les bras en avant, poignets fléchis, doigts écartés, recommencez', content: ['Coudes arrière', 'Bras en avant', 'Alternez'], displayMode: 'list', duration: 35 },
    { id: 'global-73', title: 'Doigts opposition', instruction: 'Touchez le bout du pouce avec le bout de chaque doigt, les deux mains en parallèle, de l\'index à l\'auriculaire', content: ['Pouce-index', 'Pouce-majeur', 'Pouce-annulaire', 'Pouce-auriculaire'], displayMode: 'list', duration: 35 },
    { id: 'global-74', title: 'Poignets', instruction: 'Bras tendus vers l\'avant, fléchissez les poignets vers le bas puis vers le haut', content: ['Vers le bas', 'Vers le haut', 'Alternez'], displayMode: 'list', duration: 30 },
    { id: 'global-75', title: 'Rotation mains', instruction: 'Bras tendus vers l\'avant, tournez les paumes des mains vers l\'intérieur puis vers l\'extérieur', content: ['Paumes intérieur', 'Paumes extérieur', 'Alternez'], displayMode: 'list', duration: 30 },
    { id: 'global-76', title: 'Doigts flexion-écartement', instruction: 'Fléchissez les deux premières phalanges des doigts, puis écartez les doigts au maximum', content: ['Fléchissez', 'Écartez', 'Alternez'], displayMode: 'list', duration: 30 }
];

/**
 * Parcours 16: Session Courte - 20 exercices essentiels
 */
const PARCOURS_SESSION_COURTE = [
    { id: 'court-intro', title: 'Session courte', instruction: 'Une sélection d\'exercices essentiels', content: ['20 exercices variés'], displayMode: 'list', duration: 15 },
    // Lèvres (4 exercices)
    { id: 'court-levres-1', title: 'Bisous', instruction: 'Envoyer des bisous qui claquent', content: ['Lèvres tendues', 'Bisous qui claquent'], displayMode: 'list', duration: 25 },
    { id: 'court-levres-2', title: 'Grand sourire', instruction: 'Grand sourire lèvres serrées', content: ['Souriez largement'], displayMode: 'list', duration: 25 },
    { id: 'court-levres-3', title: 'OU-I', instruction: 'Alternez ou et i de façon exagérée', content: ['ou', 'i'], displayMode: 'spaced', duration: 25 },
    { id: 'court-levres-4', title: 'Vibrations', instruction: 'Vibrez les lèvres comme un cheval', content: ['Brrrr'], displayMode: 'list', duration: 25 },
    // Langue (4 exercices)
    { id: 'court-langue-1', title: 'Claquer', instruction: 'Claquer la langue', content: ['Clac clac clac'], displayMode: 'list', duration: 20 },
    { id: 'court-langue-2', title: 'Balayer palais', instruction: 'Balayez le palais avec la langue', content: ['Avant vers arrière'], displayMode: 'list', duration: 25 },
    { id: 'court-langue-3', title: 'PA-TA-KA', instruction: 'Répétez rapidement', content: ['pa ta ka pa ta ka'], displayMode: 'list', duration: 25 },
    { id: 'court-langue-4', title: 'Mouvements directionnels', instruction: 'Langue vers haut, bas, gauche, droite', content: ['Haut', 'Bas', 'Gauche', 'Droite'], displayMode: 'list', duration: 25 },
    // Mâchoire (2 exercices)
    { id: 'court-machoire-1', title: 'Ouvrir-fermer', instruction: 'Ouvrez et fermez la bouche', content: ['Ouvrez', 'Fermez'], displayMode: 'list', duration: 20 },
    { id: 'court-machoire-2', title: 'Latéraux', instruction: 'Menton gauche-droite', content: ['Gauche', 'Droite'], displayMode: 'list', duration: 20 },
    // Joues (2 exercices)
    { id: 'court-joues-1', title: 'Gonfler', instruction: 'Gonflez et résistez', content: ['Gonflez', 'Résistez'], displayMode: 'list', duration: 25 },
    { id: 'court-joues-2', title: 'Alterner', instruction: 'Air gauche puis droite', content: ['Gauche', 'Droite'], displayMode: 'list', duration: 25 },
    // Souffle (3 exercices)
    { id: 'court-souffle-1', title: 'Bougie', instruction: 'Soufflez sur une bougie', content: ['Doucement', 'Sans éteindre'], displayMode: 'list', duration: 30 },
    { id: 'court-souffle-2', title: 'Bulles', instruction: 'Faites des bulles de savon', content: ['Soufflez doucement'], displayMode: 'list', duration: 25 },
    { id: 'court-souffle-3', title: 'Bulles dans eau', instruction: 'Bulles avec paille dans l\'eau', content: ['Soufflez régulièrement'], displayMode: 'list', duration: 25 },
    // Voix (3 exercices)
    { id: 'court-voix-1', title: 'Bâillement voisé', instruction: 'Inspirez fort bouche ouverte', content: ['Inspirez audiblement'], displayMode: 'list', duration: 25 },
    { id: 'court-voix-2', title: 'Le cheval', instruction: 'Vibrez les lèvres', content: ['Brrrr avec voix'], displayMode: 'list', duration: 25 },
    { id: 'court-voix-3', title: 'M et N', instruction: 'Sons tenus', content: ['mmmm', 'nnnn'], displayMode: 'spaced', duration: 25 },
    // Déglutition (1 exercice)
    { id: 'court-deglut', title: 'Déglutition forte', instruction: 'Déglutissez en serrant les poings', content: ['Prenez de l\'eau', 'Déglutissez fort'], displayMode: 'list', duration: 25 },
    // Final
    { id: 'court-final', title: 'Félicitations', instruction: 'Session courte terminée !', content: ['Vous avez fait 20 exercices essentiels'], displayMode: 'list', duration: 15 }
];

/**
 * Parcours 17: Complet - Tous les exercices
 * (Combine tous les parcours précédents)
 */
const PARCOURS_TABATA_COMPLET = [
    { id: 'complet-intro', title: 'Parcours complet Tabata', instruction: 'Tous les exercices en séquence', content: ['105 exercices de rééducation'], displayMode: 'list', duration: 20 },
    ...PARCOURS_LEVRES.slice(1),
    ...PARCOURS_LANGUE.slice(1),
    ...PARCOURS_MACHOIRE.slice(1),
    ...PARCOURS_JOUES.slice(1),
    ...PARCOURS_SOUFFLE.slice(1),
    ...PARCOURS_VOIX_RESONANCE.slice(1),
    ...PARCOURS_VOISEMENT.slice(1),
    ...PARCOURS_ARTICULATION.slice(1),
    ...PARCOURS_DEGLUTITION.slice(1),
    ...PARCOURS_RENFORCEMENT_GLOBAL.slice(1),
    { id: 'complet-final', title: 'Parcours complet terminé !', instruction: 'Félicitations pour votre persévérance', content: ['Vous avez complété tous les exercices !'], displayMode: 'list', duration: 20 }
];

/**
 * Types de parcours disponibles
 */
const PARCOURS_TYPES = {
    STANDARD: 'standard',
    A_DETENTE: 'detente-laryngee',
    B_RELACHEMENT: 'relachement-musculaire',
    C_ECONOMIE: 'mode-economie',
    D_MODIFIE: 'standard-modifie',
    // Nouveaux parcours Tabata - Fonction
    SOUFFLE: 'souffle',
    VOIX_RESONANCE: 'voix-resonance',
    VOISEMENT: 'voisement',
    ARTICULATION: 'articulation',
    DEGLUTITION: 'deglutition',
    // Nouveaux parcours Tabata - Anatomie
    LEVRES: 'levres',
    LANGUE: 'langue',
    MACHOIRE: 'machoire',
    JOUES: 'joues',
    // Nouveaux parcours Tabata - Complets
    RENFORCEMENT_GLOBAL: 'renforcement-global',
    SESSION_COURTE: 'session-courte',
    TABATA_COMPLET: 'tabata-complet'
};

/**
 * Métadonnées des parcours
 */
const PARCOURS_METADATA = {
    // CATÉGORIE 1 : FONCTION
    // Relaxation et détente
    'detente-laryngee': {
        name: 'Détente laryngée',
        color: '#3498DB',
        description: 'Pour les bandes ventriculaires (vibrations parasites)',
        blockageType: 'ventricular',
        category: 'fonction',
        subcategory: 'relaxation'
    },
    'relachement-musculaire': {
        name: 'Relâchement musculaire',
        color: '#9B59B6',
        description: 'Pour la spasticité musculaire (muscles trop tendus)',
        blockageType: 'spasticity',
        category: 'fonction',
        subcategory: 'relaxation'
    },
    // Fonctions vocales
    'souffle': {
        name: 'Souffle',
        color: '#1ABC9C',
        description: 'Contrôle respiratoire (bougie, bulles, ballons, paille)',
        blockageType: 'none',
        category: 'fonction',
        subcategory: 'vocales'
    },
    'voix-resonance': {
        name: 'Voix et Résonance',
        color: '#E74C3C',
        description: 'Pose de voix (respiration abdominale, bâillement voisé, boudègue, cheval)',
        blockageType: 'none',
        category: 'fonction',
        subcategory: 'vocales'
    },
    'voisement': {
        name: 'Voisement',
        color: '#9B59B6',
        description: 'Consonnes voisées/non-voisées (fff/vvv, jjj, mmm, nnn, fry, louré)',
        blockageType: 'none',
        category: 'fonction',
        subcategory: 'vocales'
    },
    'articulation': {
        name: 'Articulation',
        color: '#E67E22',
        description: 'Poèmes et précision articulatoire',
        blockageType: 'none',
        category: 'fonction',
        subcategory: 'vocales'
    },
    'deglutition': {
        name: 'Déglutition',
        color: '#16A085',
        description: 'Renforcement de la déglutition (déglutition forcée, Masako, Mendelson)',
        blockageType: 'none',
        category: 'fonction',
        subcategory: 'vocales'
    },

    // CATÉGORIE 2 : ANATOMIE
    'levres': {
        name: 'Lèvres',
        color: '#E91E63',
        description: 'Mobilité et tonicité labiale (moues, sourires, vibrations, projection, bisous)',
        blockageType: 'none',
        category: 'anatomie'
    },
    'langue': {
        name: 'Langue',
        color: '#FF5722',
        description: 'Mobilité et force linguale (claquer, balayer, mouvements latéraux, résistance)',
        blockageType: 'none',
        category: 'anatomie'
    },
    'machoire': {
        name: 'Mâchoire',
        color: '#795548',
        description: 'Mobilité mandibulaire (ouverture/fermeture, résistance, mouvements latéraux)',
        blockageType: 'none',
        category: 'anatomie'
    },
    'joues': {
        name: 'Joues',
        color: '#FF9800',
        description: 'Contrôle des joues (gonfler, résister, aspirer)',
        blockageType: 'none',
        category: 'anatomie'
    },

    // CATÉGORIE 3 : DIVERS
    'mode-economie': {
        name: 'Mode économie',
        color: '#F39C12',
        description: 'Pour fatigue importante',
        blockageType: 'fatigue',
        category: 'divers'
    },
    'standard-modifie': {
        name: 'Standard modifié',
        color: '#95A5A6',
        description: 'Progression douce (autre / ne sais pas)',
        blockageType: 'unknown',
        category: 'divers'
    },

    // CATÉGORIE 4 : COMPLETS
    'standard': {
        name: 'Standard',
        color: '#2C3E50',
        description: 'Récupération vocale complète (voyelles, consonnes, syllabes, mots)',
        blockageType: 'none',
        category: 'complets'
    },
    'renforcement-global': {
        name: 'Renforcement global',
        color: '#607D8B',
        description: 'Corps et coordination (cuillère, résistance, mains, bras, omoplates)',
        blockageType: 'none',
        category: 'complets'
    },
    'session-courte': {
        name: 'Session courte',
        color: '#00BCD4',
        description: 'Sélection de 20 exercices essentiels (tous domaines)',
        blockageType: 'none',
        category: 'complets'
    },
    'tabata-complet': {
        name: 'Complet',
        color: '#3F51B5',
        description: 'Tous les exercices en séquence progressive (105 exercices)',
        blockageType: 'none',
        category: 'complets'
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
            // Parcours existants (avec alias pour compatibilité)
            case PARCOURS_TYPES.A_DETENTE:
            case 'A': // Alias pour rétrocompatibilité
                return PARCOURS_A_DETENTE;
            case PARCOURS_TYPES.B_RELACHEMENT:
            case 'B': // Alias pour rétrocompatibilité
                return PARCOURS_B_RELACHEMENT;
            case PARCOURS_TYPES.C_ECONOMIE:
            case 'C': // Alias pour rétrocompatibilité
                return PARCOURS_C_ECONOMIE;
            case PARCOURS_TYPES.D_MODIFIE:
            case 'D': // Alias pour rétrocompatibilité
                return PARCOURS_D_MODIFIE;

            // Nouveaux parcours Tabata - Fonction
            case PARCOURS_TYPES.SOUFFLE:
                return PARCOURS_SOUFFLE;
            case PARCOURS_TYPES.VOIX_RESONANCE:
                return PARCOURS_VOIX_RESONANCE;
            case PARCOURS_TYPES.VOISEMENT:
                return PARCOURS_VOISEMENT;
            case PARCOURS_TYPES.ARTICULATION:
                return PARCOURS_ARTICULATION;
            case PARCOURS_TYPES.DEGLUTITION:
                return PARCOURS_DEGLUTITION;

            // Nouveaux parcours Tabata - Anatomie
            case PARCOURS_TYPES.LEVRES:
                return PARCOURS_LEVRES;
            case PARCOURS_TYPES.LANGUE:
                return PARCOURS_LANGUE;
            case PARCOURS_TYPES.MACHOIRE:
                return PARCOURS_MACHOIRE;
            case PARCOURS_TYPES.JOUES:
                return PARCOURS_JOUES;

            // Nouveaux parcours Tabata - Complets
            case PARCOURS_TYPES.RENFORCEMENT_GLOBAL:
                return PARCOURS_RENFORCEMENT_GLOBAL;
            case PARCOURS_TYPES.SESSION_COURTE:
                return PARCOURS_SESSION_COURTE;
            case PARCOURS_TYPES.TABATA_COMPLET:
                return PARCOURS_TABATA_COMPLET;

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
        // Parcours existants
        PARCOURS_STANDARD,
        PARCOURS_A_DETENTE,
        PARCOURS_B_RELACHEMENT,
        PARCOURS_C_ECONOMIE,
        PARCOURS_D_MODIFIE,
        // Nouveaux parcours Tabata - Fonction
        PARCOURS_SOUFFLE,
        PARCOURS_VOIX_RESONANCE,
        PARCOURS_VOISEMENT,
        PARCOURS_ARTICULATION,
        PARCOURS_DEGLUTITION,
        // Nouveaux parcours Tabata - Anatomie
        PARCOURS_LEVRES,
        PARCOURS_LANGUE,
        PARCOURS_MACHOIRE,
        PARCOURS_JOUES,
        // Nouveaux parcours Tabata - Complets
        PARCOURS_RENFORCEMENT_GLOBAL,
        PARCOURS_SESSION_COURTE,
        PARCOURS_TABATA_COMPLET,
        // Types et métadonnées
        PARCOURS_TYPES,
        PARCOURS_METADATA
    };
}
