/**
 * ui.js
 * Gestion de l'interface utilisateur et manipulation du DOM
 */

class UI {
    constructor() {
        // Références aux écrans
        this.screens = {
            home: document.getElementById('screen-home'),
            exercise: document.getElementById('screen-exercise'),
            completion: document.getElementById('screen-completion')
        };

        // Références aux éléments de l'écran d'accueil
        this.homeElements = {
            btnStart: document.getElementById('btn-start'),
            btnResume: document.getElementById('btn-resume'),
            lastSessionInfo: document.getElementById('last-session-info')
        };

        // Références aux éléments de l'écran d'exercice
        this.exerciseElements = {
            btnAbandon: document.getElementById('btn-abandon'),
            timerDisplay: document.getElementById('timer-display'),
            stepNumber: document.getElementById('step-number'),
            progressFill: document.getElementById('progress-fill'),
            stepTitle: document.getElementById('step-title'),
            stepInstruction: document.getElementById('step-instruction'),
            stepContent: document.getElementById('step-content'),
            btnDone: document.getElementById('btn-done'),
            btnRepeat: document.getElementById('btn-repeat')
        };

        // Références aux éléments de l'écran de complétion
        this.completionElements = {
            totalDuration: document.getElementById('total-duration'),
            btnFinish: document.getElementById('btn-finish'),
            linkFeedback: document.getElementById('link-feedback')
        };

        // Références à la modale
        this.modalElements = {
            modal: document.getElementById('modal-abandon'),
            btnConfirm: document.getElementById('btn-confirm-abandon'),
            btnCancel: document.getElementById('btn-cancel-abandon')
        };
    }

    /**
     * Affiche un écran spécifique et cache les autres
     * @param {string} screenName 'home', 'exercise', 'completion'
     */
    showScreen(screenName) {
        // Cacher tous les écrans
        Object.values(this.screens).forEach(screen => {
            if (screen) {
                screen.classList.remove('active');
            }
        });

        // Afficher l'écran demandé
        if (this.screens[screenName]) {
            this.screens[screenName].classList.add('active');

            // Scroll en haut de la page
            window.scrollTo(0, 0);
        }
    }

    /**
     * Affiche ou cache le bouton "Reprendre" sur l'écran d'accueil
     * @param {boolean} show
     */
    showResumeButton(show) {
        if (this.homeElements.btnResume) {
            this.homeElements.btnResume.style.display = show ? 'block' : 'none';
        }
    }

    /**
     * Affiche les informations de la dernière session
     * @param {string} relativeTime Temps relatif (ex: "il y a 3 heures")
     */
    showLastSessionInfo(relativeTime) {
        if (this.homeElements.lastSessionInfo) {
            this.homeElements.lastSessionInfo.textContent = `Dernière utilisation : ${relativeTime}`;
            this.homeElements.lastSessionInfo.style.display = 'block';
        }
    }

    /**
     * Cache les informations de la dernière session
     */
    hideLastSessionInfo() {
        if (this.homeElements.lastSessionInfo) {
            this.homeElements.lastSessionInfo.style.display = 'none';
        }
    }

    /**
     * Met à jour l'affichage du chronomètre
     * @param {string} formattedTime Format MM:SS
     */
    updateTimer(formattedTime) {
        if (this.exerciseElements.timerDisplay) {
            this.exerciseElements.timerDisplay.textContent = formattedTime;
        }
    }

    /**
     * Met à jour le numéro de l'étape
     * @param {number} current Numéro de l'étape actuelle (base 1)
     * @param {number} total Nombre total d'étapes
     */
    updateStepNumber(current, total) {
        if (this.exerciseElements.stepNumber) {
            this.exerciseElements.stepNumber.textContent = `Étape ${current}/${total}`;
        }
    }

    /**
     * Met à jour la barre de progression
     * @param {number} percentage Pourcentage (0-100)
     */
    updateProgress(percentage) {
        if (this.exerciseElements.progressFill) {
            this.exerciseElements.progressFill.style.width = `${percentage}%`;
        }
    }

    /**
     * Affiche une étape du parcours
     * @param {Object} step Données de l'étape
     */
    renderStep(step) {
        // Mettre à jour le titre et l'instruction
        if (this.exerciseElements.stepTitle) {
            this.exerciseElements.stepTitle.textContent = step.title;
        }

        if (this.exerciseElements.stepInstruction) {
            this.exerciseElements.stepInstruction.textContent = step.instruction;
        }

        // Rendre le contenu selon le mode d'affichage
        if (this.exerciseElements.stepContent) {
            this.exerciseElements.stepContent.innerHTML = '';
            this.exerciseElements.stepContent.className = 'step-content';

            switch (step.displayMode) {
                case 'spaced':
                    this.renderSpacedContent(step.content);
                    break;
                case 'grouped':
                    this.renderGroupedContent(step.content);
                    break;
                case 'list':
                    this.renderListContent(step.content);
                    break;
                case 'single':
                    this.renderSingleContent(step.content);
                    break;
                default:
                    this.renderSpacedContent(step.content);
            }
        }
    }

    /**
     * Rend le contenu en mode "spaced" (phonèmes espacés)
     * @param {Array} content
     */
    renderSpacedContent(content) {
        this.exerciseElements.stepContent.classList.add('display-spaced');

        content.forEach(item => {
            const span = document.createElement('span');
            span.className = 'phoneme';
            span.textContent = item;
            this.exerciseElements.stepContent.appendChild(span);
        });
    }

    /**
     * Rend le contenu en mode "grouped" (groupes de syllabes)
     * @param {Array} content Array de groupes (arrays)
     */
    renderGroupedContent(content) {
        this.exerciseElements.stepContent.classList.add('display-grouped');

        content.forEach(group => {
            const div = document.createElement('div');
            div.className = 'phoneme-group';
            div.textContent = Array.isArray(group) ? group.join(' · ') : group;
            this.exerciseElements.stepContent.appendChild(div);
        });
    }

    /**
     * Rend le contenu en mode "list" (liste de mots)
     * @param {Array} content
     */
    renderListContent(content) {
        this.exerciseElements.stepContent.classList.add('display-list');

        content.forEach(word => {
            const div = document.createElement('div');
            div.className = 'word-item';
            div.textContent = word;
            this.exerciseElements.stepContent.appendChild(div);
        });
    }

    /**
     * Rend le contenu en mode "single" (phrase unique)
     * @param {Array} content
     */
    renderSingleContent(content) {
        this.exerciseElements.stepContent.classList.add('display-single');

        const div = document.createElement('div');
        div.className = 'sentence';
        div.textContent = content[0];
        this.exerciseElements.stepContent.appendChild(div);
    }

    /**
     * Affiche la durée totale sur l'écran de complétion
     * @param {string} formattedDuration Format "15 min 32 sec"
     */
    showCompletionDuration(formattedDuration) {
        if (this.completionElements.totalDuration) {
            this.completionElements.totalDuration.textContent = formattedDuration;
        }
    }

    /**
     * Affiche la modale d'abandon
     */
    showAbandonModal() {
        if (this.modalElements.modal) {
            this.modalElements.modal.style.display = 'block';
        }
    }

    /**
     * Cache la modale d'abandon
     */
    hideAbandonModal() {
        if (this.modalElements.modal) {
            this.modalElements.modal.style.display = 'none';
        }
    }

    /**
     * Active ou désactive un bouton
     * @param {HTMLElement} button
     * @param {boolean} enabled
     */
    setButtonEnabled(button, enabled) {
        if (button) {
            button.disabled = !enabled;
        }
    }

    /**
     * Affiche un message de feedback (pour V1.1)
     * @param {string} message
     * @param {string} type 'success', 'error', 'info'
     */
    showFeedback(message, type = 'info') {
        // Pour V1.0, on utilise un simple alert
        // En V1.1, on pourrait créer un composant toast personnalisé
        console.log(`[${type}] ${message}`);
    }

    /**
     * Gère l'événement de clic sur un élément
     * @param {string} elementId ID de l'élément
     * @param {Function} handler Fonction à exécuter
     */
    onClick(elementId, handler) {
        const element = document.getElementById(elementId);
        if (element) {
            element.addEventListener('click', handler);
        }
    }

    /**
     * Ajoute un écouteur d'événement sur un élément
     * @param {HTMLElement} element
     * @param {string} event
     * @param {Function} handler
     */
    addEventListener(element, event, handler) {
        if (element) {
            element.addEventListener(event, handler);
        }
    }

    /**
     * Retire un écouteur d'événement d'un élément
     * @param {HTMLElement} element
     * @param {string} event
     * @param {Function} handler
     */
    removeEventListener(element, event, handler) {
        if (element) {
            element.removeEventListener(event, handler);
        }
    }

    /**
     * Ajoute la gestion du clavier pour l'accessibilité
     */
    setupKeyboardNavigation() {
        document.addEventListener('keydown', (e) => {
            // Échap pour fermer la modale
            if (e.key === 'Escape') {
                if (this.modalElements.modal && this.modalElements.modal.style.display === 'block') {
                    this.hideAbandonModal();
                }
            }

            // Espace pour valider l'étape (sur l'écran d'exercice)
            if (e.key === ' ' || e.key === 'Spacebar') {
                if (this.screens.exercise.classList.contains('active')) {
                    e.preventDefault();
                    if (this.exerciseElements.btnDone && !this.exerciseElements.btnDone.disabled) {
                        this.exerciseElements.btnDone.click();
                    }
                }
            }
        });
    }

    /**
     * Initialise les écouteurs d'événements pour la modale
     */
    setupModalEvents() {
        // Fermer la modale en cliquant sur l'overlay
        if (this.modalElements.modal) {
            const overlay = this.modalElements.modal.querySelector('.modal-overlay');
            if (overlay) {
                overlay.addEventListener('click', () => {
                    this.hideAbandonModal();
                });
            }
        }
    }

    /**
     * Initialise l'interface utilisateur
     */
    init() {
        this.setupKeyboardNavigation();
        this.setupModalEvents();
    }
}

// Export pour utilisation dans d'autres modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = UI;
}
