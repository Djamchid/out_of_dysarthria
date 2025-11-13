/**
 * statistics.js
 * Calculs et rendu des statistiques utilisateur
 */

class Statistics {
    constructor(storage) {
        this.storage = storage;
    }

    /**
     * Calcule les statistiques globales
     * @returns {Object}
     */
    calculateGlobalStats() {
        const history = this.storage.getParcoursHistory();

        if (history.length === 0) {
            return {
                totalSessions: 0,
                completedSessions: 0,
                successRate: 0,
                averageDuration: 0,
                totalDuration: 0
            };
        }

        const completedSessions = history.filter(s => s.completed === true);
        const totalDuration = history.reduce((sum, s) => sum + (s.totalDuration || 0), 0);
        const averageDuration = completedSessions.length > 0
            ? Math.round(totalDuration / completedSessions.length)
            : 0;

        return {
            totalSessions: history.length,
            completedSessions: completedSessions.length,
            successRate: Math.round((completedSessions.length / history.length) * 100),
            averageDuration,
            totalDuration
        };
    }

    /**
     * Calcule la fréquence d'utilisation des parcours
     * @returns {Array}
     */
    calculateParcoursFrequency() {
        const history = this.storage.getParcoursHistory();

        if (history.length === 0) {
            return [];
        }

        const parcoursCount = {};

        history.forEach(session => {
            if (!session.parcoursPath) return;

            session.parcoursPath.forEach(pathEntry => {
                // pathEntry format: "standard:0-2" ou "A:0-5"
                const parcoursType = pathEntry.split(':')[0];

                if (!parcoursCount[parcoursType]) {
                    parcoursCount[parcoursType] = {
                        type: parcoursType,
                        count: 0,
                        completed: 0,
                        totalDuration: 0
                    };
                }

                parcoursCount[parcoursType].count++;

                if (session.completed) {
                    parcoursCount[parcoursType].completed++;
                }

                parcoursCount[parcoursType].totalDuration += session.totalDuration || 0;
            });
        });

        // Convertir en tableau et trier par fréquence
        const parcoursArray = Object.values(parcoursCount).map(p => {
            const metadata = PARCOURS_METADATA[p.type] || { name: p.type };
            return {
                type: p.type,
                name: metadata.name,
                count: p.count,
                completed: p.completed,
                successRate: p.count > 0 ? Math.round((p.completed / p.count) * 100) : 0,
                averageDuration: p.completed > 0 ? Math.round(p.totalDuration / p.completed) : 0
            };
        });

        return parcoursArray.sort((a, b) => b.count - a.count);
    }

    /**
     * Calcule la fréquence des blocages
     * @returns {Array}
     */
    calculateBlockageFrequency() {
        const history = this.storage.getParcoursHistory();

        if (history.length === 0) {
            return [];
        }

        const blockageCount = {};
        const blockageNames = {
            'ventricular': 'Bandes ventriculaires',
            'spasticity': 'Spasticité musculaire',
            'fatigue': 'Fatigue',
            'unknown': 'Autre / Ne sais pas'
        };

        let totalBlockages = 0;

        history.forEach(session => {
            if (!session.blockages || session.blockages.length === 0) return;

            session.blockages.forEach(blockage => {
                if (!blockageCount[blockage]) {
                    blockageCount[blockage] = 0;
                }
                blockageCount[blockage]++;
                totalBlockages++;
            });
        });

        // Convertir en tableau et calculer les pourcentages
        const blockageArray = Object.entries(blockageCount).map(([type, count]) => ({
            type,
            name: blockageNames[type] || type,
            count,
            percentage: totalBlockages > 0 ? Math.round((count / totalBlockages) * 100) : 0
        }));

        return blockageArray.sort((a, b) => b.count - a.count);
    }

    /**
     * Génère les données pour un graphique de progression hebdomadaire
     * @returns {Array}
     */
    getWeeklyProgress() {
        const history = this.storage.getParcoursHistory();
        const now = new Date();
        const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

        const weekSessions = history.filter(session => {
            const sessionDate = new Date(session.startedAt);
            return sessionDate >= oneWeekAgo && sessionDate <= now;
        });

        // Regrouper par jour
        const dayMap = {};
        const daysOfWeek = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];

        for (let i = 6; i >= 0; i--) {
            const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
            const dayKey = date.toISOString().split('T')[0];
            dayMap[dayKey] = {
                date: dayKey,
                dayName: daysOfWeek[date.getDay()],
                sessions: 0,
                completed: 0
            };
        }

        weekSessions.forEach(session => {
            const dayKey = session.startedAt.split('T')[0];
            if (dayMap[dayKey]) {
                dayMap[dayKey].sessions++;
                if (session.completed) {
                    dayMap[dayKey].completed++;
                }
            }
        });

        return Object.values(dayMap);
    }

    /**
     * Génère un histogramme simple en texte ASCII
     * @param {Array} data Données avec {label, value, max}
     * @returns {string}
     */
    generateTextHistogram(data) {
        const maxValue = Math.max(...data.map(d => d.value), 1);
        const barWidth = 20;

        return data.map(item => {
            const filledBars = Math.round((item.value / maxValue) * barWidth);
            const emptyBars = barWidth - filledBars;
            const bar = '█'.repeat(filledBars) + '░'.repeat(emptyBars);
            return `${item.label.padEnd(20)} ${bar} ${item.value}`;
        }).join('\n');
    }

    /**
     * Génère les données pour l'écran de statistiques
     * @returns {Object}
     */
    generateStatsScreen() {
        const globalStats = this.calculateGlobalStats();
        const parcoursFreq = this.calculateParcoursFrequency();
        const blockageFreq = this.calculateBlockageFrequency();
        const weeklyProgress = this.getWeeklyProgress();

        return {
            global: globalStats,
            parcours: parcoursFreq,
            blockages: blockageFreq,
            weekly: weeklyProgress,
            hasData: globalStats.totalSessions > 0
        };
    }

    /**
     * Formate une durée en minutes et secondes
     * @param {number} seconds
     * @returns {string}
     */
    formatDuration(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;

        if (mins === 0) {
            return `${secs}s`;
        }

        return `${mins}min`;
    }

    /**
     * Génère un rapport textuel des statistiques
     * @returns {string}
     */
    generateTextReport() {
        const stats = this.generateStatsScreen();

        if (!stats.hasData) {
            return 'Aucune session enregistrée pour le moment.';
        }

        let report = '';

        // Statistiques globales
        report += `📊 STATISTIQUES GLOBALES\n`;
        report += `${'='.repeat(40)}\n`;
        report += `Sessions complétées : ${stats.global.completedSessions}/${stats.global.totalSessions}\n`;
        report += `Taux de réussite   : ${stats.global.successRate}%\n`;
        report += `Durée moyenne      : ${this.formatDuration(stats.global.averageDuration)}\n\n`;

        // Parcours les plus utilisés
        if (stats.parcours.length > 0) {
            report += `🎯 PARCOURS LES PLUS EFFICACES\n`;
            report += `${'='.repeat(40)}\n`;
            stats.parcours.slice(0, 3).forEach((p, i) => {
                report += `${i + 1}. ${p.name.padEnd(25)} (${p.count} fois)\n`;
            });
            report += '\n';
        }

        // Blocages fréquents
        if (stats.blockages.length > 0) {
            report += `⚠️  BLOCAGES FRÉQUENTS\n`;
            report += `${'='.repeat(40)}\n`;
            stats.blockages.forEach(b => {
                report += `• ${b.name.padEnd(25)} : ${b.percentage}%\n`;
            });
        }

        return report;
    }

    /**
     * Exporte les statistiques en CSV
     * @returns {string}
     */
    exportToCSV() {
        const history = this.storage.getParcoursHistory();

        let csv = 'ID,Date,Complété,Durée (s),Parcours,Blocages,Note\n';

        history.forEach(session => {
            const date = new Date(session.startedAt).toLocaleDateString('fr-FR');
            const completed = session.completed ? 'Oui' : 'Non';
            const duration = session.totalDuration || 0;
            const parcours = session.parcoursPath ? session.parcoursPath.join(' > ') : 'Standard';
            const blockages = session.blockages ? session.blockages.join(', ') : '';
            const rating = session.outcome && session.outcome.userRating ? session.outcome.userRating : '';

            csv += `${session.id},"${date}",${completed},${duration},"${parcours}","${blockages}",${rating}\n`;
        });

        return csv;
    }
}

// Export pour utilisation dans d'autres modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Statistics;
}
