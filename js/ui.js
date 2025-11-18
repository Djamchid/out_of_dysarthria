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
            completion: document.getElementById('screen-completion'),
            statistics: document.getElementById('screen-statistics'),
            onboarding: document.getElementById('screen-onboarding')
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
            btnRepeat: document.getElementById('btn-repeat'),
            btnNotWorking: document.getElementById('btn-not-working')
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

        // V2.0: Références aux nouveaux éléments
        this.statsElements = {
            btnStats: document.getElementById('btn-stats'),
            btnStatsBack: document.getElementById('btn-stats-back'),
            statsContent: document.getElementById('stats-content')
        };

        this.settingsElements = {
            btnSettings: document.getElementById('btn-settings'),
            btnSettingsBack: document.getElementById('btn-settings-back'),
            btnSaveSettings: document.getElementById('btn-save-settings'),
            settingsContent: document.getElementById('settings-content')
        };

        this.diagnosticElements = {
            modal: document.getElementById('modal-diagnostic'),
            options: document.getElementById('diagnostic-options'),
            btnCancel: document.getElementById('btn-cancel-diagnostic'),
            btnConfirm: document.getElementById('btn-confirm-diagnostic')
        };

        this.suggestionElements = {
            banner: document.getElementById('suggestion-banner'),
            text: document.getElementById('suggestion-text'),
            btnAccept: document.getElementById('btn-accept-suggestion'),
            btnDismiss: document.getElementById('btn-dismiss-suggestion')
        };

        this.onboardingElements = {
            content: document.getElementById('onboarding-content')
        };

        // V2.0: État de sélection
        this.selectedBlockage = null;
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

    // ==========================================
    // V2.0: Nouvelles méthodes
    // ==========================================

    /**
     * Affiche le menu de diagnostic
     */
    showDiagnosticMenu() {
        if (!this.diagnosticElements.modal) return;

        this.diagnosticElements.modal.style.display = 'block';
        this.selectedBlockage = null;

        // Réinitialiser les sélections
        const options = this.diagnosticElements.options?.querySelectorAll('.diagnostic-option');
        options?.forEach(opt => opt.classList.remove('selected'));

        // Désactiver le bouton de confirmation
        if (this.diagnosticElements.btnConfirm) {
            this.diagnosticElements.btnConfirm.disabled = true;
        }

        // Configurer les clics sur les options
        options?.forEach(opt => {
            opt.addEventListener('click', (e) => {
                options.forEach(o => o.classList.remove('selected'));
                opt.classList.add('selected');
                this.selectedBlockage = opt.dataset.blockage;

                if (this.diagnosticElements.btnConfirm) {
                    this.diagnosticElements.btnConfirm.disabled = false;
                }
            });
        });
    }

    /**
     * Cache le menu de diagnostic
     */
    hideDiagnosticMenu() {
        if (this.diagnosticElements.modal) {
            this.diagnosticElements.modal.style.display = 'none';
        }
    }

    /**
     * Obtient le blocage sélectionné
     * @returns {string|null}
     */
    getSelectedBlockage() {
        return this.selectedBlockage;
    }

    /**
     * Affiche une suggestion
     * @param {Object} suggestion
     */
    showSuggestion(suggestion) {
        if (!this.suggestionElements.banner || !this.suggestionElements.text) return;

        this.suggestionElements.text.textContent = suggestion.reason || suggestion.message;
        this.suggestionElements.banner.style.display = 'flex';

        // Stocker la suggestion pour utilisation ultérieure
        this.currentSuggestion = suggestion;
    }

    /**
     * Cache la bannière de suggestion
     */
    hideSuggestion() {
        if (this.suggestionElements.banner) {
            this.suggestionElements.banner.style.display = 'none';
        }
        this.currentSuggestion = null;
    }

    /**
     * Obtient la suggestion actuelle
     * @returns {Object|null}
     */
    getCurrentSuggestion() {
        return this.currentSuggestion || null;
    }

    /**
     * Affiche l'écran de statistiques
     * @param {Object} stats Données statistiques
     */
    renderStatistics(stats) {
        if (!this.statsElements.statsContent) return;

        let html = '';

        if (!stats.hasData) {
            html = `
                <div class="stats-card">
                    <p style="text-align: center; color: var(--text-secondary);">
                        Aucune session enregistrée pour le moment.
                    </p>
                    <p style="text-align: center; margin-top: var(--spacing-md);">
                        Commencez un parcours pour voir vos statistiques !
                    </p>
                </div>
            `;
        } else {
            // Carte des statistiques globales
            html += `
                <div class="stats-card">
                    <div class="title">📊 Vue d'ensemble</div>
                    <div class="stat-item">
                        <span class="stat-label">Sessions complétées</span>
                        <span class="stat-value">${stats.global.completedSessions}/${stats.global.totalSessions}</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-label">Taux de réussite</span>
                        <span class="stat-value">${stats.global.successRate}%</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-label">Durée moyenne</span>
                        <span class="stat-value">${Math.floor(stats.global.averageDuration / 60)} min</span>
                    </div>
                </div>
            `;

            // Parcours les plus efficaces
            if (stats.parcours && stats.parcours.length > 0) {
                html += `
                    <div class="stats-card">
                        <div class="title">🎯 Parcours les plus utilisés</div>
                        <ul class="parcours-list">
                `;

                stats.parcours.slice(0, 3).forEach((p, i) => {
                    html += `
                        <li class="parcours-list-item">
                            <span class="number">${i + 1}.</span>
                            <span class="name">${p.name}</span>
                            <span class="count">(${p.count} fois)</span>
                        </li>
                    `;
                });

                html += `
                        </ul>
                    </div>
                `;
            }

            // Blocages fréquents
            if (stats.blockages && stats.blockages.length > 0) {
                html += `
                    <div class="stats-card">
                        <div class="title">⚠️ Blocages fréquents</div>
                `;

                stats.blockages.forEach(b => {
                    html += `
                        <div class="stat-item">
                            <span class="stat-label">${b.name}</span>
                            <span class="stat-value">${b.percentage}%</span>
                        </div>
                    `;
                });

                html += `</div>`;
            }

            // V2.0: Bouton d'export CSV
            html += `
                <div class="stats-actions" style="margin-top: var(--spacing-xl); text-align: center;">
                    <button id="btn-export-csv" class="btn btn-secondary">
                        📥 Exporter en CSV
                    </button>
                </div>
            `;
        }

        this.statsElements.statsContent.innerHTML = html;
    }

    /**
     * Affiche un badge de parcours
     * @param {string} parcoursType
     * @returns {string} HTML du badge
     */
    renderParcoursBadge(parcoursType) {
        const metadata = PARCOURS_METADATA[parcoursType];
        if (!metadata) return '';

        return `<span class="parcours-badge parcours-${parcoursType}">${metadata.name}</span>`;
    }

    // ==========================================
    // V2.0: Settings Screen
    // ==========================================

    /**
     * Charge et affiche l'écran des réglages
     * @param {Object} preferences Préférences utilisateur
     */
    renderSettings(preferences) {
        // Charger les parcours favoris
        const favoriteParcours = preferences.favoriteParcours || [];
        document.getElementById('pref-standard').checked = favoriteParcours.includes('standard');
        document.getElementById('pref-a').checked = favoriteParcours.includes('A');
        document.getElementById('pref-b').checked = favoriteParcours.includes('B');
        document.getElementById('pref-c').checked = favoriteParcours.includes('C');
        document.getElementById('pref-d').checked = favoriteParcours.includes('D');

        // Charger la durée par défaut
        const duration = preferences.defaultStepDuration || 30;
        const radios = document.querySelectorAll('input[name="step-duration"]');
        radios.forEach(radio => {
            radio.checked = (parseInt(radio.value) === duration);
        });

        // Charger l'option de suggestions
        const showSuggestions = preferences.showSuggestions !== false; // true par défaut
        document.getElementById('pref-suggestions').checked = showSuggestions;
    }

    /**
     * Récupère les valeurs du formulaire de réglages
     * @returns {Object} Préférences
     */
    getSettingsFormValues() {
        // Parcours favoris
        const favoriteParcours = [];
        if (document.getElementById('pref-standard').checked) favoriteParcours.push('standard');
        if (document.getElementById('pref-a').checked) favoriteParcours.push('A');
        if (document.getElementById('pref-b').checked) favoriteParcours.push('B');
        if (document.getElementById('pref-c').checked) favoriteParcours.push('C');
        if (document.getElementById('pref-d').checked) favoriteParcours.push('D');

        // Durée par étape
        const durationRadio = document.querySelector('input[name="step-duration"]:checked');
        const defaultStepDuration = durationRadio ? parseInt(durationRadio.value) : 30;

        // Suggestions
        const showSuggestions = document.getElementById('pref-suggestions').checked;

        return {
            favoriteParcours,
            defaultStepDuration,
            showSuggestions
        };
    }

    // ==========================================
    // V2.0: Onboarding Wizard
    // ==========================================

    /**
     * Affiche l'écran d'onboarding
     * @param {number} step Numéro de l'étape (1, 2, ou 3)
     */
    showOnboarding(step = 1) {
        this.showScreen('onboarding');
        this.renderOnboardingStep(step);
    }

    /**
     * Génère le contenu d'une étape d'onboarding
     * @param {number} step
     */
    renderOnboardingStep(step) {
        const content = this.onboardingElements.content;
        if (!content) return;

        let html = '';

        if (step === 1) {
            // Étape 1: Bienvenue
            html = `
                <div class="onboarding-welcome">
                    <div class="icon">🎙️</div>
                    <h2 class="title">Bienvenue sur Out of Dysarthria !</h2>
                    <p class="description">
                        Cette application vous aide à retrouver votre voix
                        lors des épisodes de dysarthrie grâce à des parcours
                        adaptés et intelligents.
                    </p>
                    <div class="onboarding-actions">
                        <button id="btn-onboarding-start" class="btn btn-primary">
                            Commencer la configuration
                        </button>
                        <button id="btn-onboarding-skip" class="btn btn-text">
                            J'ai déjà utilisé l'app
                        </button>
                    </div>
                </div>
            `;
        } else if (step === 2) {
            // Étape 2: Sélection des parcours favoris
            html = `
                <div class="onboarding-parcours">
                    <h2 class="title">Sélectionnez vos parcours favoris</h2>
                    <p class="subtitle">Vous pourrez changer ces préférences plus tard</p>

                    <div class="parcours-options">
                        <label class="parcours-checkbox">
                            <input type="checkbox" name="parcours" value="standard" checked>
                            <div class="content">
                                <div class="name">Parcours Standard</div>
                                <div class="description">Parcours complet de récupération vocale</div>
                            </div>
                        </label>

                        <label class="parcours-checkbox">
                            <input type="checkbox" name="parcours" value="A">
                            <div class="content">
                                <div class="name">😓 Détente laryngée</div>
                                <div class="description">Pour les bandes ventriculaires (vibrations parasites)</div>
                            </div>
                        </label>

                        <label class="parcours-checkbox">
                            <input type="checkbox" name="parcours" value="B">
                            <div class="content">
                                <div class="name">💪 Relâchement musculaire</div>
                                <div class="description">Pour la spasticité musculaire (muscles trop tendus)</div>
                            </div>
                        </label>

                        <label class="parcours-checkbox">
                            <input type="checkbox" name="parcours" value="C">
                            <div class="content">
                                <div class="name">😴 Mode économie</div>
                                <div class="description">Pour la fatigue importante (manque d'énergie)</div>
                            </div>
                        </label>
                    </div>

                    <div class="onboarding-actions">
                        <button id="btn-onboarding-next" class="btn btn-primary">Suivant</button>
                        <button id="btn-onboarding-back" class="btn btn-secondary">Retour</button>
                    </div>
                </div>
            `;
        } else if (step === 3) {
            // Étape 3: Durée par étape
            html = `
                <div class="onboarding-duration">
                    <h2 class="title">Temps par défaut pour chaque étape</h2>
                    <p class="subtitle">Vous pourrez toujours répéter ou passer chaque étape</p>

                    <div class="duration-options">
                        <label class="duration-radio">
                            <input type="radio" name="duration" value="20">
                            <div class="content">
                                <div class="name">⚡ Rapide</div>
                                <div class="description">15-20 secondes par étape</div>
                            </div>
                        </label>

                        <label class="duration-radio">
                            <input type="radio" name="duration" value="30" checked>
                            <div class="content">
                                <div class="name">✓ Normal</div>
                                <div class="description">30 secondes par étape (recommandé)</div>
                            </div>
                        </label>

                        <label class="duration-radio">
                            <input type="radio" name="duration" value="60">
                            <div class="content">
                                <div class="name">🐢 Lent</div>
                                <div class="description">60 secondes par étape</div>
                            </div>
                        </label>
                    </div>

                    <div class="onboarding-actions">
                        <button id="btn-onboarding-finish" class="btn btn-primary">Terminer</button>
                        <button id="btn-onboarding-back" class="btn btn-secondary">Retour</button>
                    </div>
                </div>
            `;
        }

        content.innerHTML = html;
    }

    /**
     * Récupère les parcours sélectionnés dans l'onboarding
     * @returns {Array<string>}
     */
    getSelectedParcours() {
        const checkboxes = document.querySelectorAll('input[name="parcours"]:checked');
        return Array.from(checkboxes).map(cb => cb.value);
    }

    /**
     * Récupère la durée sélectionnée dans l'onboarding
     * @returns {number}
     */
    getSelectedDuration() {
        const radio = document.querySelector('input[name="duration"]:checked');
        return radio ? parseInt(radio.value) : 30;
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
