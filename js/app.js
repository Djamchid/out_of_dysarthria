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

        // État de l'application
        this.currentSession = null;

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

        // Vérifier s'il y a une session en cours
        this.checkForActiveSession();

        // Afficher l'écran d'accueil
        this.showHome();

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

        // Modale d'abandon
        this.ui.addEventListener(this.ui.modalElements.btnConfirm, 'click', this.handleConfirmAbandon);
        this.ui.addEventListener(this.ui.modalElements.btnCancel, 'click', this.handleCancelAbandon);

        // Écran de complétion
        this.ui.addEventListener(this.ui.completionElements.btnFinish, 'click', this.handleFinishClick);
        this.ui.addEventListener(this.ui.completionElements.linkFeedback, 'click', this.handleFeedbackClick);
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

        // Ajouter à l'historique
        const historyEntry = {
            id: this.currentSession.id,
            startedAt: this.currentSession.startedAt,
            completedAt: this.currentSession.completedAt,
            totalDuration: totalDuration,
            completed: true,
            stepsCount: this.currentSession.stepsCompleted.length
        };

        this.storage.addToHistory(historyEntry);

        // Supprimer la session en cours
        this.storage.clearCurrentSession();

        // Afficher l'écran de complétion
        this.showCompletionScreen(totalDuration);
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

        // Pour V1.0, on peut simplement afficher un message
        // En V1.1+, on pourrait ouvrir un formulaire ou une modale
        const feedback = prompt('Comment s\'est passé ce parcours ? (optionnel)');

        if (feedback && feedback.trim() !== '') {
            console.log('Feedback reçu:', feedback);
            alert('Merci pour votre retour ! (Dans une future version, ce feedback sera sauvegardé)');
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
