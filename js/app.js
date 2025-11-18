/**
 * app.js
 * Contrôleur principal de l'application
 */

class App {
    constructor() {
        // Initialisation des modules
        this.parcours = new Parcours();
        this.storage = new Storage();
        this.ui = new UI();
        this.timer = new StepTimer('current');

        // V2.0: Nouveaux modules
        this.router = new ParcoursRouter(this.parcours, this.storage);
        this.suggestions = new SuggestionsEngine(this.storage);
        this.statistics = new Statistics(this.storage);

        // État de l'application
        this.currentSession = null;

        // V2.0: État des bifurcations
        this.blockagesEncountered = [];

        // Bind des méthodes pour préserver le contexte
        this.handleStartClick = this.handleStartClick.bind(this);
        this.handleResumeClick = this.handleResumeClick.bind(this);
        this.handleDoneClick = this.handleDoneClick.bind(this);
        this.handleRepeatClick = this.handleRepeatClick.bind(this);
        this.handleAbandonClick = this.handleAbandonClick.bind(this);
        this.handleConfirmAbandon = this.handleConfirmAbandon.bind(this);
        this.handleCancelAbandon = this.handleCancelAbandon.bind(this);
        this.handleFinishClick = this.handleFinishClick.bind(this);
        this.handleFeedbackClick = this.handleFeedbackClick.bind(this);

        // V2.0: Nouveaux handlers
        this.handleNotWorkingClick = this.handleNotWorkingClick.bind(this);
        this.handleConfirmDiagnostic = this.handleConfirmDiagnostic.bind(this);
        this.handleCancelDiagnostic = this.handleCancelDiagnostic.bind(this);
        this.handleStatsClick = this.handleStatsClick.bind(this);
        this.handleStatsBackClick = this.handleStatsBackClick.bind(this);
        this.handleAcceptSuggestion = this.handleAcceptSuggestion.bind(this);
        this.handleDismissSuggestion = this.handleDismissSuggestion.bind(this);

        // V2.0: Onboarding handlers
        this.handleOnboardingStart = this.handleOnboardingStart.bind(this);
        this.handleOnboardingSkip = this.handleOnboardingSkip.bind(this);
        this.handleOnboardingNext = this.handleOnboardingNext.bind(this);
        this.handleOnboardingBack = this.handleOnboardingBack.bind(this);
        this.handleOnboardingFinish = this.handleOnboardingFinish.bind(this);

        // V2.0: Feedback handlers
        this.handleCancelFeedback = this.handleCancelFeedback.bind(this);
        this.handleSubmitFeedback = this.handleSubmitFeedback.bind(this);

        // V2.0: Settings handlers
        this.handleSettingsClick = this.handleSettingsClick.bind(this);
        this.handleSettingsBackClick = this.handleSettingsBackClick.bind(this);
        this.handleToggleSuggestions = this.handleToggleSuggestions.bind(this);
        this.handleEditParcours = this.handleEditParcours.bind(this);
        this.handleEditDuration = this.handleEditDuration.bind(this);
        this.handleResetOnboarding = this.handleResetOnboarding.bind(this);
        this.handleClearHistory = this.handleClearHistory.bind(this);
        this.handleResetAll = this.handleResetAll.bind(this);

        // État de l'onboarding
        this.onboardingStep = 1;
    }

    /**
     * Initialise l'application
     */
    init() {
        console.log('🎙️ Out of Dysarthria - Initialisation...');

        // Initialiser l'UI
        this.ui.init();

        // Configurer le timer
        this.setupTimer();

        // Configurer les écouteurs d'événements
        this.setupEventListeners();

        // V2.0: Vérifier si l'onboarding doit être affiché
        const prefs = this.storage.getPreferences();
        if (!prefs.onboardingCompleted) {
            this.startOnboarding();
        } else {
            // Vérifier s'il y a une session en cours
            this.checkForActiveSession();

            // Afficher l'écran d'accueil
            this.showHome();
        }

        console.log('✅ Application initialisée');
    }

    /**
     * Configure les écouteurs d'événements
     */
    setupEventListeners() {
        // Écran d'accueil
        this.ui.addEventListener(this.ui.homeElements.btnStart, 'click', this.handleStartClick);
        this.ui.addEventListener(this.ui.homeElements.btnResume, 'click', this.handleResumeClick);

        // Écran d'exercice
        this.ui.addEventListener(this.ui.exerciseElements.btnDone, 'click', this.handleDoneClick);
        this.ui.addEventListener(this.ui.exerciseElements.btnRepeat, 'click', this.handleRepeatClick);
        this.ui.addEventListener(this.ui.exerciseElements.btnAbandon, 'click', this.handleAbandonClick);

        // V2.0: Bouton "Ça ne marche pas"
        this.ui.addEventListener(this.ui.exerciseElements.btnNotWorking, 'click', this.handleNotWorkingClick);

        // Modale d'abandon
        this.ui.addEventListener(this.ui.modalElements.btnConfirm, 'click', this.handleConfirmAbandon);
        this.ui.addEventListener(this.ui.modalElements.btnCancel, 'click', this.handleCancelAbandon);

        // Écran de complétion
        this.ui.addEventListener(this.ui.completionElements.btnFinish, 'click', this.handleFinishClick);
        this.ui.addEventListener(this.ui.completionElements.linkFeedback, 'click', this.handleFeedbackClick);

        // V2.0: Statistiques
        this.ui.addEventListener(this.ui.statsElements.btnStats, 'click', this.handleStatsClick);
        this.ui.addEventListener(this.ui.statsElements.btnStatsBack, 'click', this.handleStatsBackClick);

        // V2.0: Diagnostic
        this.ui.addEventListener(this.ui.diagnosticElements.btnConfirm, 'click', this.handleConfirmDiagnostic);
        this.ui.addEventListener(this.ui.diagnosticElements.btnCancel, 'click', this.handleCancelDiagnostic);

        // V2.0: Suggestions
        this.ui.addEventListener(this.ui.suggestionElements.btnAccept, 'click', this.handleAcceptSuggestion);
        this.ui.addEventListener(this.ui.suggestionElements.btnDismiss, 'click', this.handleDismissSuggestion);

        // V2.0: Feedback modal
        this.ui.addEventListener(this.ui.feedbackElements.btnCancel, 'click', this.handleCancelFeedback);
        this.ui.addEventListener(this.ui.feedbackElements.btnSubmit, 'click', this.handleSubmitFeedback);

        // V2.0: Settings
        this.ui.addEventListener(this.ui.settingsElements.btnSettings, 'click', this.handleSettingsClick);
        this.ui.addEventListener(this.ui.settingsElements.btnSettingsBack, 'click', this.handleSettingsBackClick);
        this.ui.addEventListener(this.ui.settingsElements.toggleSuggestions, 'change', this.handleToggleSuggestions);
        this.ui.addEventListener(this.ui.settingsElements.btnEditParcours, 'click', this.handleEditParcours);
        this.ui.addEventListener(this.ui.settingsElements.btnEditDuration, 'click', this.handleEditDuration);
        this.ui.addEventListener(this.ui.settingsElements.btnResetOnboarding, 'click', this.handleResetOnboarding);
        this.ui.addEventListener(this.ui.settingsElements.btnClearHistory, 'click', this.handleClearHistory);
        this.ui.addEventListener(this.ui.settingsElements.btnResetAll, 'click', this.handleResetAll);
    }

    /**
     * Configure le timer
     */
    setupTimer() {
        this.timer.on('onTick', (seconds) => {
            this.ui.updateTimer(this.timer.formatTime(seconds));
        });
    }

    /**
     * Vérifie s'il existe une session active
     */
    checkForActiveSession() {
        if (this.storage.hasActiveSession()) {
            this.ui.showResumeButton(true);
        } else {
            this.ui.showResumeButton(false);
        }

        // Afficher l'info de la dernière session
        const lastSession = this.storage.getLastSession();
        if (lastSession && lastSession.completedAt) {
            const relativeTime = this.storage.getRelativeTime(lastSession.completedAt);
            this.ui.showLastSessionInfo(relativeTime);
        } else {
            this.ui.hideLastSessionInfo();
        }
    }

    /**
     * Affiche l'écran d'accueil
     */
    showHome() {
        this.ui.showScreen('home');
        this.checkForActiveSession();

        // V2.0: Afficher une suggestion au démarrage si pertinent
        this.showStartSuggestionIfRelevant();
    }

    /**
     * V2.0: Affiche une suggestion au démarrage si pertinent
     */
    showStartSuggestionIfRelevant() {
        if (!this.suggestions.shouldShowSuggestions()) {
            return;
        }

        const suggestion = this.suggestions.getSuggestionAtStart();
        if (suggestion) {
            this.ui.showSuggestion(suggestion);
        }
    }

    /**
     * Démarre un nouveau parcours
     */
    startNewCourse() {
        console.log('🚀 Démarrage d\'un nouveau parcours');

        // Réinitialiser le parcours
        this.parcours.reset();

        // Créer une nouvelle session
        this.currentSession = this.storage.createNewSession(0);
        this.storage.saveCurrentSession(this.currentSession);

        // Afficher la première étape
        this.showExerciseScreen();
    }

    /**
     * Reprend une session en cours
     */
    resumeCourse() {
        console.log('▶️ Reprise du parcours');

        // Récupérer la session en cours
        this.currentSession = this.storage.getCurrentSession();

        if (!this.currentSession) {
            console.error('Aucune session à reprendre');
            this.startNewCourse();
            return;
        }

        // Restaurer l'état du parcours
        this.parcours.setCurrentStepIndex(this.currentSession.currentStepIndex);

        // Afficher l'étape courante
        this.showExerciseScreen();
    }

    /**
     * Affiche l'écran d'exercice
     */
    showExerciseScreen() {
        const step = this.parcours.getCurrentStep();
        if (!step) {
            console.error('Aucune étape à afficher');
            return;
        }

        // Mettre à jour l'UI
        this.ui.showScreen('exercise');
        this.ui.renderStep(step);
        this.ui.updateStepNumber(
            this.parcours.getCurrentStepIndex() + 1,
            this.parcours.getTotalSteps()
        );
        this.ui.updateProgress(this.parcours.getProgressPercentage());

        // Réinitialiser et démarrer le timer
        this.timer.reset();
        this.timer.stepId = step.id;
        this.timer.start();

        // Sauvegarder automatiquement toutes les 5 secondes
        this.startAutoSave();
    }

    /**
     * Démarre la sauvegarde automatique
     */
    startAutoSave() {
        if (this.autoSaveInterval) {
            clearInterval(this.autoSaveInterval);
        }

        this.autoSaveInterval = setInterval(() => {
            this.saveCurrentProgress();
        }, 5000); // Toutes les 5 secondes
    }

    /**
     * Arrête la sauvegarde automatique
     */
    stopAutoSave() {
        if (this.autoSaveInterval) {
            clearInterval(this.autoSaveInterval);
            this.autoSaveInterval = null;
        }
    }

    /**
     * Sauvegarde la progression courante
     */
    saveCurrentProgress() {
        if (!this.currentSession) return;

        this.currentSession.currentStepIndex = this.parcours.getCurrentStepIndex();
        this.storage.saveCurrentSession(this.currentSession);
    }

    /**
     * Gère le clic sur "Commencer"
     */
    handleStartClick(e) {
        e.preventDefault();
        this.startNewCourse();
    }

    /**
     * Gère le clic sur "Reprendre"
     */
    handleResumeClick(e) {
        e.preventDefault();
        this.resumeCourse();
    }

    /**
     * Gère le clic sur "C'est fait"
     */
    handleDoneClick(e) {
        e.preventDefault();

        // Arrêter le timer et enregistrer l'étape
        this.timer.pause();
        const stepData = this.timer.getStepData();
        this.currentSession.stepsCompleted.push(stepData);

        // Vérifier si c'est la dernière étape
        if (this.parcours.isLastStep()) {
            this.completeCourse();
        } else {
            // Passer à l'étape suivante
            this.parcours.nextStep();
            this.saveCurrentProgress();
            this.showExerciseScreen();
        }
    }

    /**
     * Gère le clic sur "Répéter"
     */
    handleRepeatClick(e) {
        e.preventDefault();

        // Réinitialiser le timer pour cette étape
        this.timer.reset();
        this.timer.start();
    }

    /**
     * Gère le clic sur "Abandonner"
     */
    handleAbandonClick(e) {
        e.preventDefault();
        this.ui.showAbandonModal();
    }

    /**
     * Gère la confirmation d'abandon
     */
    handleConfirmAbandon(e) {
        e.preventDefault();

        console.log('⏸️ Abandon du parcours');

        // Arrêter le timer
        this.timer.pause();
        this.stopAutoSave();

        // Sauvegarder la progression
        this.saveCurrentProgress();

        // Fermer la modale
        this.ui.hideAbandonModal();

        // Retourner à l'accueil
        this.showHome();
    }

    /**
     * Gère l'annulation de l'abandon
     */
    handleCancelAbandon(e) {
        e.preventDefault();
        this.ui.hideAbandonModal();
    }

    /**
     * Complète le parcours
     */
    completeCourse() {
        console.log('🎉 Parcours terminé !');

        // Arrêter le timer et la sauvegarde automatique
        this.timer.pause();
        this.stopAutoSave();

        // Marquer la session comme terminée
        this.currentSession.isActive = false;
        this.currentSession.completedAt = new Date().toISOString();

        // Calculer la durée totale
        const totalDuration = this.storage.calculateSessionDuration(this.currentSession);

        // V2.0: Ajouter à l'historique avec format enrichi
        const historyEntry = {
            id: this.currentSession.id,
            startedAt: this.currentSession.startedAt,
            completedAt: this.currentSession.completedAt,
            totalDuration: totalDuration,
            completed: true,
            stepsCount: this.currentSession.stepsCompleted.length,
            // V2.0: Nouveaux champs
            parcoursPath: this.generateParcoursPath(),
            blockages: this.blockagesEncountered,
            outcome: {
                completed: true,
                totalDuration: totalDuration,
                userRating: null // Peut être ajouté plus tard
            }
        };

        this.storage.addToHistoryV2(historyEntry);

        // Supprimer la session en cours
        this.storage.clearCurrentSession();

        // Réinitialiser l'état V2.0
        this.blockagesEncountered = [];
        this.router.reset();

        // Afficher l'écran de complétion
        this.showCompletionScreen(totalDuration);
    }

    /**
     * V2.0: Génère le chemin des parcours utilisés
     * @returns {Array<string>}
     */
    generateParcoursPath() {
        const history = this.router.getState().parcoursHistory;
        return history.map(entry => {
            return `${entry.type}:0-${this.parcours.getTotalSteps() - 1}`;
        });
    }

    /**
     * Affiche l'écran de complétion
     * @param {number} totalDuration Durée totale en secondes
     */
    showCompletionScreen(totalDuration) {
        this.ui.showScreen('completion');
        this.ui.showCompletionDuration(this.storage.formatDurationLong(totalDuration));
    }

    /**
     * Gère le clic sur "Terminer"
     */
    handleFinishClick(e) {
        e.preventDefault();
        this.showHome();
    }

    /**
     * Gère le clic sur le lien de feedback
     */
    handleFeedbackClick(e) {
        e.preventDefault();

        // V2.0: Afficher la modale de feedback avec notation
        this.ui.showFeedbackModal();
    }

    /**
     * V2.0: Gère l'annulation du feedback
     */
    handleCancelFeedback(e) {
        e.preventDefault();
        this.ui.hideFeedbackModal();
    }

    /**
     * V2.0: Gère la soumission du feedback
     */
    handleSubmitFeedback(e) {
        e.preventDefault();

        const rating = this.ui.getSelectedRating();
        const comment = this.ui.getFeedbackComment();

        if (rating === 0) {
            console.warn('Aucune notation sélectionnée');
            return;
        }

        console.log('✅ Feedback reçu:', { rating, comment });

        // Mettre à jour la dernière session dans l'historique avec la notation
        this.updateLastSessionWithRating(rating, comment);

        // Cacher la modale
        this.ui.hideFeedbackModal();

        // Optionnel : Afficher un message de confirmation
        console.log(`Merci pour votre notation de ${rating}/5 !`);
    }

    /**
     * V2.0: Met à jour la dernière session avec la notation utilisateur
     * @param {number} rating Note de 1 à 5
     * @param {string} comment Commentaire optionnel
     */
    updateLastSessionWithRating(rating, comment) {
        const history = this.storage.getParcoursHistory();

        if (history.length > 0) {
            const lastSession = history[0];

            // Ajouter/mettre à jour la notation
            if (!lastSession.outcome) {
                lastSession.outcome = {};
            }

            lastSession.outcome.userRating = rating;

            if (comment) {
                lastSession.outcome.userComment = comment;
            }

            // Sauvegarder l'historique mis à jour
            this.storage.set(this.storage.KEYS.PARCOURS_HISTORY, history);

            console.log('📊 Session mise à jour avec notation:', rating);
        }
    }

    // ==========================================
    // V2.0: Nouvelles méthodes de gestion d'événements
    // ==========================================

    /**
     * Gère le clic sur "Ça ne marche pas"
     */
    handleNotWorkingClick(e) {
        e.preventDefault();

        // Enregistrer une répétition
        const currentStep = this.parcours.getCurrentStep();
        if (currentStep) {
            const count = this.router.recordStepRepetition(currentStep.id);
            console.log(`Répétition ${count} de l'étape ${currentStep.id}`);
        }

        // Afficher le menu de diagnostic
        this.ui.showDiagnosticMenu();
    }

    /**
     * Gère la confirmation du diagnostic
     */
    handleConfirmDiagnostic(e) {
        e.preventDefault();

        const blockage = this.ui.getSelectedBlockage();
        if (!blockage) return;

        const currentStepIndex = this.parcours.getCurrentStepIndex();

        // Enregistrer le blocage
        if (!this.blockagesEncountered.includes(blockage)) {
            this.blockagesEncountered.push(blockage);
        }

        // Effectuer la bifurcation
        const success = this.router.initiateBifurcation(blockage, currentStepIndex);

        if (success) {
            console.log(`Bifurcation vers parcours pour "${blockage}"`);

            // Cacher le menu de diagnostic
            this.ui.hideDiagnosticMenu();

            // Sauvegarder la progression
            this.saveCurrentProgress();

            // Afficher la nouvelle première étape du parcours alternatif
            this.showExerciseScreen();
        }
    }

    /**
     * Gère l'annulation du diagnostic
     */
    handleCancelDiagnostic(e) {
        e.preventDefault();
        this.ui.hideDiagnosticMenu();
    }

    /**
     * Gère le clic sur le bouton Stats
     */
    handleStatsClick(e) {
        e.preventDefault();

        // Générer et afficher les statistiques
        const stats = this.statistics.generateStatsScreen();
        this.ui.renderStatistics(stats);
        this.ui.showScreen('statistics');
    }

    /**
     * Gère le retour depuis l'écran de statistiques
     */
    handleStatsBackClick(e) {
        e.preventDefault();
        this.showHome();
    }

    /**
     * Gère l'acceptation d'une suggestion
     */
    handleAcceptSuggestion(e) {
        e.preventDefault();

        const suggestion = this.ui.getCurrentSuggestion();
        if (!suggestion) return;

        // Enregistrer l'acceptance
        this.suggestions.recordSuggestionFeedback(Date.now().toString(), true);

        // Démarrer avec le parcours suggéré
        if (suggestion.parcoursType) {
            this.parcours.reset(suggestion.parcoursType);
        }

        // Cacher la suggestion et démarrer
        this.ui.hideSuggestion();
        this.startNewCourse();
    }

    /**
     * Gère le rejet d'une suggestion
     */
    handleDismissSuggestion(e) {
        e.preventDefault();

        const suggestion = this.ui.getCurrentSuggestion();
        if (suggestion) {
            // Enregistrer le rejet
            this.suggestions.recordSuggestionFeedback(Date.now().toString(), false);
        }

        this.ui.hideSuggestion();
    }

    // ==========================================
    // V2.0: Onboarding
    // ==========================================

    /**
     * Démarre le processus d'onboarding
     */
    startOnboarding() {
        this.onboardingStep = 1;
        this.ui.showOnboarding(1);
        this.setupOnboardingListeners();
    }

    /**
     * Configure les écouteurs pour l'onboarding
     */
    setupOnboardingListeners() {
        // Utiliser une délégation d'événements pour les boutons qui sont créés dynamiquement
        document.addEventListener('click', (e) => {
            if (e.target.id === 'btn-onboarding-start') {
                this.handleOnboardingStart(e);
            } else if (e.target.id === 'btn-onboarding-skip') {
                this.handleOnboardingSkip(e);
            } else if (e.target.id === 'btn-onboarding-next') {
                this.handleOnboardingNext(e);
            } else if (e.target.id === 'btn-onboarding-back') {
                this.handleOnboardingBack(e);
            } else if (e.target.id === 'btn-onboarding-finish') {
                this.handleOnboardingFinish(e);
            }
        });
    }

    /**
     * Gère le clic sur "Commencer la configuration"
     */
    handleOnboardingStart(e) {
        e.preventDefault();
        this.onboardingStep = 2;
        this.ui.showOnboarding(2);
    }

    /**
     * Gère le clic sur "J'ai déjà utilisé l'app" (skip)
     */
    handleOnboardingSkip(e) {
        e.preventDefault();

        // Marquer l'onboarding comme complété avec les valeurs par défaut
        this.storage.updatePreference('onboardingCompleted', true);

        // Aller à l'accueil
        this.checkForActiveSession();
        this.showHome();
    }

    /**
     * Gère le clic sur "Suivant" (étape 2 -> 3)
     */
    handleOnboardingNext(e) {
        e.preventDefault();

        if (this.onboardingStep === 2) {
            // Sauvegarder les parcours sélectionnés
            const selectedParcours = this.ui.getSelectedParcours();
            this.storage.updatePreference('favoriteParcours', selectedParcours);

            // Passer à l'étape 3
            this.onboardingStep = 3;
            this.ui.showOnboarding(3);
        }
    }

    /**
     * Gère le clic sur "Retour"
     */
    handleOnboardingBack(e) {
        e.preventDefault();

        if (this.onboardingStep > 1) {
            this.onboardingStep--;
            this.ui.showOnboarding(this.onboardingStep);
        }
    }

    /**
     * Gère le clic sur "Terminer" (fin de l'onboarding)
     */
    handleOnboardingFinish(e) {
        e.preventDefault();

        // Sauvegarder la durée par défaut
        const selectedDuration = this.ui.getSelectedDuration();
        this.storage.updatePreference('defaultStepDuration', selectedDuration);

        // Marquer l'onboarding comme complété
        this.storage.updatePreference('onboardingCompleted', true);

        console.log('✅ Onboarding terminé');

        // Aller à l'écran d'accueil
        this.checkForActiveSession();
        this.showHome();
    }

    // ==========================================
    // V2.0: Settings Handlers
    // ==========================================

    /**
     * Gère le clic sur le bouton Paramètres
     */
    handleSettingsClick(e) {
        e.preventDefault();
        this.ui.showSettings(this.storage);
    }

    /**
     * Gère le retour depuis l'écran de paramètres
     */
    handleSettingsBackClick(e) {
        e.preventDefault();
        this.showHome();
    }

    /**
     * Gère le toggle des suggestions
     */
    handleToggleSuggestions(e) {
        const enabled = e.target.checked;
        this.storage.updatePreference('showSuggestions', enabled);
        this.ui.settingsElements.suggestionsValue.textContent = enabled ? 'Activé' : 'Désactivé';
        console.log(`✅ Suggestions ${enabled ? 'activées' : 'désactivées'}`);
    }

    /**
     * Gère la modification des parcours favoris
     */
    handleEditParcours(e) {
        e.preventDefault();

        // Afficher l'étape 2 de l'onboarding (sélection des parcours)
        this.onboardingStep = 2;
        this.ui.showOnboarding(2);
    }

    /**
     * Gère la modification de la durée par étape
     */
    handleEditDuration(e) {
        e.preventDefault();

        // Afficher l'étape 3 de l'onboarding (sélection de la durée)
        this.onboardingStep = 3;
        this.ui.showOnboarding(3);
    }

    /**
     * Gère la réinitialisation de l'onboarding
     */
    handleResetOnboarding(e) {
        e.preventDefault();

        const confirmed = confirm(
            '🔄 Voulez-vous refaire la configuration initiale ?\n\n' +
            'Vous allez pouvoir redéfinir vos parcours favoris et la durée par étape.'
        );

        if (confirmed) {
            // Marquer l'onboarding comme non complété
            this.storage.updatePreference('onboardingCompleted', false);

            console.log('🔄 Onboarding réinitialisé');

            // Relancer l'onboarding
            this.startOnboarding();
        }
    }

    /**
     * Gère l'effacement de l'historique des sessions
     */
    handleClearHistory(e) {
        e.preventDefault();

        const history = this.storage.getParcoursHistory();

        const confirmed = confirm(
            `🗑️ Voulez-vous effacer l'historique des sessions ?\n\n` +
            `${history.length} session(s) seront supprimées définitivement.\n` +
            `Cette action est irréversible.`
        );

        if (confirmed) {
            // Effacer l'historique
            this.storage.set(this.storage.KEYS.PARCOURS_HISTORY, []);
            this.storage.set(this.storage.KEYS.SESSIONS_HISTORY, []);

            console.log('🗑️ Historique effacé');

            // Rafraîchir l'affichage des paramètres
            this.ui.updateSettingsValues(this.storage);
        }
    }

    /**
     * Gère la réinitialisation complète des données
     */
    handleResetAll(e) {
        e.preventDefault();

        const confirmed = confirm(
            '⚠️ ATTENTION : Réinitialisation complète\n\n' +
            'Cette action va effacer TOUTES vos données :\n' +
            '• Préférences et configuration\n' +
            '• Historique des sessions\n' +
            '• Progression en cours\n\n' +
            'Cette action est IRRÉVERSIBLE.\n\n' +
            'Voulez-vous vraiment continuer ?'
        );

        if (confirmed) {
            // Double confirmation pour une action aussi destructive
            const doubleConfirm = confirm(
                '⚠️ Dernière confirmation\n\n' +
                'Êtes-vous VRAIMENT sûr(e) de vouloir tout effacer ?'
            );

            if (doubleConfirm) {
                // Effacer tout le localStorage
                localStorage.clear();

                console.log('⚠️ Toutes les données ont été effacées');

                // Recharger la page pour repartir de zéro
                window.location.reload();
            }
        }
    }

    /**
     * Nettoie les ressources avant fermeture
     */
    destroy() {
        this.stopAutoSave();
        this.timer.destroy();
    }
}

// Initialisation de l'application au chargement du DOM
document.addEventListener('DOMContentLoaded', () => {
    const app = new App();
    app.init();

    // Sauvegarder avant fermeture
    window.addEventListener('beforeunload', () => {
        if (app.currentSession && app.currentSession.isActive) {
            app.saveCurrentProgress();
        }
    });

    // Exposer l'app globalement pour le debugging (dev only)
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        window.app = app;
    }
});
