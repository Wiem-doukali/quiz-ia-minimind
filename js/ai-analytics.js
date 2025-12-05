class AIAnalytics {
    constructor() {
        console.log("Initialisation du système d'analyse IA...");
        
        this.sessionId = this.generateSessionId();
        this.userId = this.getOrCreateUserId();
        this.sessionStart = new Date().toISOString();
        
        
        this.sessionData = {
            sessionId: this.sessionId,
            userId: this.userId,
            startTime: this.sessionStart,
            endTime: null,
            totalQuestions: 0,
            correctAnswers: 0,
            score: 0,
            totalPoints: 0,
            timeSpent: 0,
            questions: [],
            categories: {},
            difficulties: {},
            aiGeneratedCount: 0,
            performanceTrend: []
        };
        
        
        this.config = {
            trackDetailedAnalytics: true,
            saveToLocalStorage: true,
            anonymizeData: true,
            maxSessionDuration: 3600000 
        };
        
       
        this.initializeStorage();
        
        console.log("Système d'analyse initialisé - Session:", this.sessionId);
    }
    
    
    generateSessionId() {
        return `SESSION-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    }
    
    getOrCreateUserId() {
        
        let userId = localStorage.getItem('minimind_user_id');
        
        if (!userId) {
            
            userId = `USER-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`;
            localStorage.setItem('minimind_user_id', userId);
            
            
            this.initializeUserStats(userId);
        }
        
        return userId;
    }
    
    initializeUserStats(userId) {
        const userStats = {
            userId: userId,
            createdAt: new Date().toISOString(),
            totalSessions: 0,
            totalQuestionsAnswered: 0,
            totalCorrectAnswers: 0,
            totalScore: 0,
            averageScore: 0,
            bestScore: 0,
            categoriesMastery: {},
            learningJourney: []
        };
        
        localStorage.setItem(`user_${userId}_stats`, JSON.stringify(userStats));
    }
    
    initializeStorage() {
       
        if (!localStorage.getItem('minimind_sessions')) {
            localStorage.setItem('minimind_sessions', JSON.stringify([]));
        }
        
        
        if (!localStorage.getItem('minimind_global_stats')) {
            const globalStats = {
                totalUsers: 0,
                totalSessions: 0,
                totalQuestions: 0,
                averageSessionDuration: 0,
                mostPopularCategory: null,
                mostDifficultQuestion: null,
                lastUpdated: new Date().toISOString()
            };
            localStorage.setItem('minimind_global_stats', JSON.stringify(globalStats));
        }
    }
    
   
    
    trackQuestionStart(question) {
        const questionData = {
            questionId: question.id,
            startTime: Date.now(),
            endTime: null,
            timeSpent: null,
            userAnswer: null,
            correct: false,
            points: question.points || 0,
            category: question.category,
            difficulty: question.difficulty,
            aiGenerated: question.aiGenerated || false,
            confidence: null
        };
        
        this.sessionData.questions.push(questionData);
        return questionData;
    }
    
    trackQuestionAnswer(questionIndex, userAnswer, correct, timeSpent) {
        if (questionIndex >= 0 && questionIndex < this.sessionData.questions.length) {
            const question = this.sessionData.questions[questionIndex];
            question.endTime = Date.now();
            question.timeSpent = timeSpent;
            question.userAnswer = userAnswer;
            question.correct = correct;
            
           
            this.sessionData.totalQuestions++;
            if (correct) {
                this.sessionData.correctAnswers++;
                this.sessionData.score += question.points;
            }
            this.sessionData.totalPoints += question.points;
            
           
            this.updateCategoryStats(question.category, correct, question.points);
            
            
            this.updateDifficultyStats(question.difficulty, correct, question.points);
            
           
            if (question.aiGenerated) {
                this.sessionData.aiGeneratedCount++;
            }
            
            this.updatePerformanceTrend(correct, question.difficulty);
            
           
            question.confidence = this.calculateConfidence(timeSpent, correct);
            
            return question;
        }
        return null;
    }
    
    
    
    updateCategoryStats(category, correct, points) {
        if (!this.sessionData.categories[category]) {
            this.sessionData.categories[category] = {
                total: 0,
                correct: 0,
                score: 0,
                averageTime: 0
            };
        }
        
        const catStats = this.sessionData.categories[category];
        catStats.total++;
        if (correct) {
            catStats.correct++;
            catStats.score += points;
        }
    }
    
    updateDifficultyStats(difficulty, correct, points) {
        if (!this.sessionData.difficulties[difficulty]) {
            this.sessionData.difficulties[difficulty] = {
                total: 0,
                correct: 0,
                score: 0,
                averageTime: 0
            };
        }
        
        const diffStats = this.sessionData.difficulties[difficulty];
        diffStats.total++;
        if (correct) {
            diffStats.correct++;
            diffStats.score += points;
        }
    }
    
    updatePerformanceTrend(correct, difficulty) {
        const performanceScore = correct ? 
            (difficulty === 'easy' ? 1 : difficulty === 'medium' ? 2 : 3) : 0;
        
        this.sessionData.performanceTrend.push({
            index: this.sessionData.performanceTrend.length,
            score: performanceScore,
            timestamp: Date.now()
        });
    }
    
    calculateConfidence(timeSpent, correct) {
       
        let confidence = 'medium';
        
        if (timeSpent < 3000) { 
            confidence = correct ? 'high' : 'low';
        } else if (timeSpent < 10000) { 
            confidence = 'medium';
        } else { 
            confidence = correct ? 'medium' : 'low';
        }
        
        return confidence;
    }
    
    
    
    generateSessionReport() {
        const endTime = Date.now();
        const startTime = new Date(this.sessionStart).getTime();
        const duration = endTime - startTime;
        
        this.sessionData.endTime = new Date(endTime).toISOString();
        this.sessionData.timeSpent = Math.floor(duration / 1000); // en secondes
        
        const report = {
            summary: this.generateSummary(),
            detailedAnalysis: this.generateDetailedAnalysis(),
            recommendations: this.generateRecommendations(),
            insights: this.generateInsights(),
            visualizations: this.generateVisualizations()
        };
        
        
        this.saveSession();
        
        
        this.updateUserStats();
        
        
        this.updateGlobalStats();
        
        return report;
    }
    
    generateSummary() {
        const accuracy = this.sessionData.totalQuestions > 0 ? 
            (this.sessionData.correctAnswers / this.sessionData.totalQuestions * 100).toFixed(1) : 0;
        
        const avgTimePerQuestion = this.sessionData.totalQuestions > 0 ?
            (this.sessionData.timeSpent / this.sessionData.totalQuestions).toFixed(1) : 0;
        
        return {
            sessionId: this.sessionId,
            duration: this.formatDuration(this.sessionData.timeSpent),
            totalQuestions: this.sessionData.totalQuestions,
            correctAnswers: this.sessionData.correctAnswers,
            accuracy: `${accuracy}%`,
            score: this.sessionData.score,
            totalPoints: this.sessionData.totalPoints,
            aiGeneratedQuestions: this.sessionData.aiGeneratedCount,
            averageTimePerQuestion: `${avgTimePerQuestion}s`,
            completionRate: "100%"
        };
    }
    
    generateDetailedAnalysis() {
        const analysis = {
            byCategory: {},
            byDifficulty: {},
            confidenceAnalysis: {},
            timeAnalysis: {},
            learningCurve: this.analyzeLearningCurve()
        };
        
       
        for (const [category, stats] of Object.entries(this.sessionData.categories)) {
            const accuracy = stats.total > 0 ? (stats.correct / stats.total * 100).toFixed(1) : 0;
            analysis.byCategory[category] = {
                total: stats.total,
                correct: stats.correct,
                accuracy: `${accuracy}%`,
                score: stats.score,
                mastery: this.calculateMastery(stats.correct, stats.total)
            };
        }
        
        
        for (const [difficulty, stats] of Object.entries(this.sessionData.difficulties)) {
            const accuracy = stats.total > 0 ? (stats.correct / stats.total * 100).toFixed(1) : 0;
            analysis.byDifficulty[difficulty] = {
                total: stats.total,
                correct: stats.correct,
                accuracy: `${accuracy}%`,
                score: stats.score
            };
        }
        
       
        const confidenceStats = {
            high: 0,
            medium: 0,
            low: 0
        };
        
        this.sessionData.questions.forEach(q => {
            if (q.confidence) {
                confidenceStats[q.confidence]++;
            }
        });
        
        analysis.confidenceAnalysis = confidenceStats;
        
        
        const times = this.sessionData.questions.map(q => q.timeSpent).filter(t => t !== null);
        if (times.length > 0) {
            const avgTime = times.reduce((a, b) => a + b, 0) / times.length;
            const maxTime = Math.max(...times);
            const minTime = Math.min(...times);
            
            analysis.timeAnalysis = {
                average: avgTime.toFixed(1),
                fastest: minTime.toFixed(1),
                slowest: maxTime.toFixed(1),
                total: times.reduce((a, b) => a + b, 0).toFixed(1)
            };
        }
        
        return analysis;
    }
    
    analyzeLearningCurve() {
        if (this.sessionData.performanceTrend.length < 2) {
            return { trend: "stable", improvement: 0 };
        }
        
        const windowSize = Math.min(5, this.sessionData.performanceTrend.length);
        const recentScores = this.sessionData.performanceTrend.slice(-windowSize).map(p => p.score);
        const initialScores = this.sessionData.performanceTrend.slice(0, windowSize).map(p => p.score);
        
        const recentAvg = recentScores.reduce((a, b) => a + b, 0) / recentScores.length;
        const initialAvg = initialScores.reduce((a, b) => a + b, 0) / initialScores.length;
        
        const improvement = ((recentAvg - initialAvg) / initialAvg * 100).toFixed(1);
        
        let trend = "stable";
        if (improvement > 10) trend = "improving";
        else if (improvement < -10) trend = "declining";
        
        return {
            trend: trend,
            improvement: `${improvement}%`,
            recentAverage: recentAvg.toFixed(2),
            initialAverage: initialAvg.toFixed(2)
        };
    }
    
    calculateMastery(correct, total) {
        const percentage = (correct / total) * 100;
        
        if (percentage >= 90) return "Expert";
        if (percentage >= 70) return "Avancé";
        if (percentage >= 50) return "Intermédiaire";
        if (percentage >= 30) return "Débutant";
        return "Novice";
    }
    
   
    
    generateRecommendations() {
        const recommendations = [];
        const analysis = this.generateDetailedAnalysis();
        
        
        const overallAccuracy = parseFloat(this.generateSummary().accuracy);
        
        if (overallAccuracy < 50) {
            recommendations.push({
                type: "foundation",
                priority: "high",
                title: "Revoyons les bases",
                description: "Ta précision globale est inférieure à 50%. Il serait bénéfique de revoir les concepts fondamentaux de l'IA.",
                action: "Consulte la section 'Fondamentaux IA' dans les ressources d'apprentissage.",
                icon: "fas fa-graduation-cap"
            });
        } else if (overallAccuracy < 70) {
            recommendations.push({
                type: "practice",
                priority: "medium",
                title: "Pratique régulière",
                description: "Une précision entre 50% et 70% montre une bonne compréhension, mais la pratique permettra de consolider tes connaissances.",
                action: "Rejoue le quiz pour renforcer les concepts.",
                icon: "fas fa-dumbbell"
            });
        }
        
        
        for (const [category, stats] of Object.entries(analysis.byCategory)) {
            if (stats.total >= 3 && parseFloat(stats.accuracy) < 60) {
                const categoryName = this.formatCategoryName(category);
                recommendations.push({
                    type: "category_focus",
                    priority: "medium",
                    title: `Focus sur ${categoryName}`,
                    description: `Ta précision en ${categoryName} est de ${stats.accuracy}. Cette catégorie mérite plus d'attention.`,
                    action: `Consulte les ressources spécifiques à ${categoryName}.`,
                    icon: "fas fa-bullseye"
                });
            }
        }
        
        
        if (analysis.timeAnalysis) {
            const avgTime = parseFloat(analysis.timeAnalysis.average);
            if (avgTime > 15) {
                recommendations.push({
                    type: "time_management",
                    priority: "low",
                    title: "Gestion du temps",
                    description: `Tu prends en moyenne ${avgTime}s par question. Essayer de répondre plus rapidement pourrait t'aider.`,
                    action: "Ne passe pas trop de temps sur une seule question. Si tu hésites, passe à la suivante.",
                    icon: "fas fa-clock"
                });
            }
        }
        
      
        if (this.sessionData.aiGeneratedCount > 0) {
            recommendations.push({
                type: "exploration",
                priority: "low",
                title: "Continue avec l'IA générée",
                description: `Tu as répondu à ${this.sessionData.aiGeneratedCount} questions générées par IA. Continue à explorer ce contenu unique !`,
                action: "Active le mode IA pour plus de questions générées dynamiquement.",
                icon: "fas fa-robot"
            });
        }
        
        
        return recommendations.slice(0, 3);
    }
    
    generateInsights() {
        const insights = [];
        const summary = this.generateSummary();
        const analysis = this.generateDetailedAnalysis();
        
       
        const accuracy = parseFloat(summary.accuracy);
        
        if (accuracy >= 80) {
            insights.push({
                type: "excellent_performance",
                title: "Performance exceptionnelle !",
                content: `Avec ${summary.accuracy} de précision, tu maîtrises remarquablement bien les concepts de l'IA.`,
                icon: "fas fa-trophy",
                color: "#00C853"
            });
        } else if (accuracy >= 60) {
            insights.push({
                type: "good_performance",
                title: "Bonne performance !",
                content: `${summary.accuracy} de précision montre une solide compréhension des concepts clés.`,
                icon: "fas fa-star",
                color: "#FFC107"
            });
        }
        
       
        let strongestCategory = null;
        let highestAccuracy = 0;
        
        for (const [category, stats] of Object.entries(analysis.byCategory)) {
            const acc = parseFloat(stats.accuracy);
            if (acc > highestAccuracy && stats.total >= 2) {
                highestAccuracy = acc;
                strongestCategory = category;
            }
        }
        
        if (strongestCategory && highestAccuracy >= 70) {
            insights.push({
                type: "strength",
                title: "Point fort identifié !",
                content: `Tu excelles en ${this.formatCategoryName(strongestCategory)} avec ${highestAccuracy}% de précision.`,
                icon: "fas fa-bolt",
                color: "#4A00E0"
            });
        }
        
        
        const learningCurve = analysis.learningCurve;
        if (learningCurve.trend === "improving" && Math.abs(parseFloat(learningCurve.improvement)) > 15) {
            insights.push({
                type: "improvement",
                title: "Progression notable !",
                content: `Tu t'améliores rapidement : +${learningCurve.improvement} entre le début et la fin du quiz.`,
                icon: "fas fa-chart-line",
                color: "#2196F3"
            });
        }
        
       
        if (this.sessionData.aiGeneratedCount > 0) {
            const aiAccuracy = this.calculateAIGeneratedAccuracy();
            if (aiAccuracy !== null) {
                insights.push({
                    type: "ai_interaction",
                    title: "Interaction avec l'IA",
                    content: `Tu as répondu à ${this.sessionData.aiGeneratedCount} questions générées par IA avec ${aiAccuracy}% de précision.`,
                    icon: "fas fa-robot",
                    color: "#8E2DE2"
                });
            }
        }
        
        return insights;
    }
    
    calculateAIGeneratedAccuracy() {
        const aiQuestions = this.sessionData.questions.filter(q => q.aiGenerated);
        if (aiQuestions.length === 0) return null;
        
        const correctAI = aiQuestions.filter(q => q.correct).length;
        return ((correctAI / aiQuestions.length) * 100).toFixed(1);
    }
    
    
    
    generateVisualizations() {
        return {
            accuracyChart: this.generateAccuracyChartData(),
            categoryDistribution: this.generateCategoryDistributionData(),
            difficultyPerformance: this.generateDifficultyPerformanceData(),
            timeDistribution: this.generateTimeDistributionData(),
            confidenceDistribution: this.generateConfidenceDistributionData()
        };
    }
    
    generateAccuracyChartData() {
        const data = [];
        let cumulativeCorrect = 0;
        
        this.sessionData.questions.forEach((q, index) => {
            if (q.correct) cumulativeCorrect++;
            const accuracy = (cumulativeCorrect / (index + 1)) * 100;
            
            data.push({
                question: index + 1,
                accuracy: parseFloat(accuracy.toFixed(1)),
                correct: q.correct
            });
        });
        
        return {
            type: "line",
            title: "Évolution de la précision",
            data: data,
            labels: data.map(d => `Q${d.question}`)
        };
    }
    
    generateCategoryDistributionData() {
        const categories = Object.keys(this.sessionData.categories);
        const data = categories.map(cat => ({
            category: this.formatCategoryName(cat),
            count: this.sessionData.categories[cat].total,
            correct: this.sessionData.categories[cat].correct
        }));
        
        return {
            type: "bar",
            title: "Performance par catégorie",
            data: data,
            labels: data.map(d => d.category)
        };
    }
    
    generateDifficultyPerformanceData() {
        const difficulties = Object.keys(this.sessionData.difficulties);
        const data = difficulties.map(diff => ({
            difficulty: this.formatDifficultyName(diff),
            accuracy: this.sessionData.difficulties[diff].total > 0 ?
                (this.sessionData.difficulties[diff].correct / this.sessionData.difficulties[diff].total * 100).toFixed(1) : 0,
            count: this.sessionData.difficulties[diff].total
        }));
        
        return {
            type: "radar",
            title: "Performance par difficulté",
            data: data,
            labels: data.map(d => d.difficulty)
        };
    }
    
    generateTimeDistributionData() {
        const times = this.sessionData.questions
            .map(q => q.timeSpent)
            .filter(t => t !== null)
            .sort((a, b) => a - b);
        
        if (times.length === 0) return null;
        
        const bins = this.createTimeBins(times);
        
        return {
            type: "histogram",
            title: "Distribution du temps de réponse",
            data: bins,
            labels: bins.map(b => b.range)
        };
    }
    
    generateConfidenceDistributionData() {
        const confidenceCounts = {
            high: 0,
            medium: 0,
            low: 0
        };
        
        this.sessionData.questions.forEach(q => {
            if (q.confidence && confidenceCounts[q.confidence] !== undefined) {
                confidenceCounts[q.confidence]++;
            }
        });
        
        const total = Object.values(confidenceCounts).reduce((a, b) => a + b, 0);
        const data = Object.entries(confidenceCounts).map(([conf, count]) => ({
            confidence: this.formatConfidenceName(conf),
            count: count,
            percentage: total > 0 ? ((count / total) * 100).toFixed(1) : 0
        }));
        
        return {
            type: "pie",
            title: "Distribution de la confiance",
            data: data,
            labels: data.map(d => d.confidence)
        };
    }
    
    
    
    formatCategoryName(categoryId) {
        const names = {
            "fundamentals": "Fondamentaux IA",
            "machine-learning": "Apprentissage Machine",
            "applications": "Applications IA",
            "ethics": "Éthique de l'IA",
            "future": "Futur de l'IA"
        };
        
        return names[categoryId] || categoryId;
    }
    
    formatDifficultyName(difficulty) {
        const names = {
            "easy": "Facile",
            "medium": "Moyen",
            "hard": "Difficile"
        };
        
        return names[difficulty] || difficulty;
    }
    
    formatConfidenceName(confidence) {
        const names = {
            "high": "Haute",
            "medium": "Moyenne",
            "low": "Basse"
        };
        
        return names[confidence] || confidence;
    }
    
    formatDuration(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        
        if (minutes > 0) {
            return `${minutes}m ${remainingSeconds}s`;
        }
        return `${remainingSeconds}s`;
    }
    
    createTimeBins(times) {
        if (times.length === 0) return [];
        
        const maxTime = Math.max(...times);
        const binCount = Math.min(5, Math.ceil(times.length / 3));
        const binSize = Math.ceil(maxTime / binCount);
        
        const bins = [];
        for (let i = 0; i < binCount; i++) {
            const min = i * binSize;
            const max = (i + 1) * binSize;
            const count = times.filter(t => t >= min && t < max).length;
            
            bins.push({
                range: `${min}-${max}s`,
                count: count,
                percentage: ((count / times.length) * 100).toFixed(1)
            });
        }
        
        return bins;
    }
    
    
    
    saveSession() {
        if (!this.config.saveToLocalStorage) return;
        
        try {
            const sessions = JSON.parse(localStorage.getItem('minimind_sessions') || '[]');
            sessions.push(this.sessionData);
            localStorage.setItem('minimind_sessions', JSON.stringify(sessions));
            
            console.log("Session sauvegardée:", this.sessionId);
        } catch (error) {
            console.error("Erreur de sauvegarde de session:", error);
        }
    }
    
    updateUserStats() {
        try {
            const userStats = JSON.parse(localStorage.getItem(`user_${this.userId}_stats`) || '{}');
            
            
            userStats.totalSessions = (userStats.totalSessions || 0) + 1;
            userStats.totalQuestionsAnswered = (userStats.totalQuestionsAnswered || 0) + this.sessionData.totalQuestions;
            userStats.totalCorrectAnswers = (userStats.totalCorrectAnswers || 0) + this.sessionData.correctAnswers;
            userStats.totalScore = (userStats.totalScore || 0) + this.sessionData.score;
            
           
            userStats.averageScore = userStats.totalSessions > 0 ?
                (userStats.totalScore / userStats.totalSessions).toFixed(1) : 0;
            
            
            if (this.sessionData.score > (userStats.bestScore || 0)) {
                userStats.bestScore = this.sessionData.score;
            }
            
            
            for (const [category, stats] of Object.entries(this.sessionData.categories)) {
                if (!userStats.categoriesMastery[category]) {
                    userStats.categoriesMastery[category] = {
                        total: 0,
                        correct: 0,
                        lastAccuracy: 0
                    };
                }
                
                userStats.categoriesMastery[category].total += stats.total;
                userStats.categoriesMastery[category].correct += stats.correct;
                userStats.categoriesMastery[category].lastAccuracy = stats.total > 0 ?
                    (stats.correct / stats.total * 100).toFixed(1) : 0;
            }
            
            
            userStats.learningJourney.push({
                sessionId: this.sessionId,
                date: new Date().toISOString(),
                score: this.sessionData.score,
                accuracy: parseFloat(this.generateSummary().accuracy),
                duration: this.sessionData.timeSpent
            });
            
           
            if (userStats.learningJourney.length > 50) {
                userStats.learningJourney = userStats.learningJourney.slice(-50);
            }
            
            localStorage.setItem(`user_${this.userId}_stats`, JSON.stringify(userStats));
            
        } catch (error) {
            console.error("Erreur de mise à jour des statistiques utilisateur:", error);
        }
    }
    
    updateGlobalStats() {
        try {
            const globalStats = JSON.parse(localStorage.getItem('minimind_global_stats') || '{}');
            
            globalStats.totalSessions = (globalStats.totalSessions || 0) + 1;
            globalStats.totalQuestions = (globalStats.totalQuestions || 0) + this.sessionData.totalQuestions;
            
            
            const totalDuration = (globalStats.averageSessionDuration || 0) * (globalStats.totalSessions - 1);
            globalStats.averageSessionDuration = (totalDuration + this.sessionData.timeSpent) / globalStats.totalSessions;
            
            
            const categoryCounts = {};
            this.sessionData.questions.forEach(q => {
                categoryCounts[q.category] = (categoryCounts[q.category] || 0) + 1;
            });
            
            let mostPopular = null;
            let maxCount = 0;
            for (const [category, count] of Object.entries(categoryCounts)) {
                if (count > maxCount) {
                    maxCount = count;
                    mostPopular = category;
                }
            }
            
            if (mostPopular) {
                globalStats.mostPopularCategory = mostPopular;
            }
            
            globalStats.lastUpdated = new Date().toISOString();
            
            localStorage.setItem('minimind_global_stats', JSON.stringify(globalStats));
            
        } catch (error) {
            console.error("Erreur de mise à jour des statistiques globales:", error);
        }
    }
    
   
    
    getGlobalStats() {
        try {
            return JSON.parse(localStorage.getItem('minimind_global_stats') || '{}');
        } catch (error) {
            console.error("Erreur de récupération des statistiques globales:", error);
            return {};
        }
    }
    
    getUserStats() {
        try {
            return JSON.parse(localStorage.getItem(`user_${this.userId}_stats`) || '{}');
        } catch (error) {
            console.error("Erreur de récupération des statistiques utilisateur:", error);
            return {};
        }
    }
    
    getAllUserSessions() {
        try {
            const sessions = JSON.parse(localStorage.getItem('minimind_sessions') || '[]');
            return sessions.filter(session => session.userId === this.userId);
        } catch (error) {
            console.error("Erreur de récupération des sessions:", error);
            return [];
        }
    }
    
    
    
    exportSessionData(format = 'json') {
        const report = this.generateSessionReport();
        
        switch(format.toLowerCase()) {
            case 'json':
                return JSON.stringify(report, null, 2);
                
            case 'text':
                return this.formatAsText(report);
                
            case 'csv':
                return this.formatAsCSV(report);
                
            default:
                return JSON.stringify(report);
        }
    }
    
    formatAsText(report) {
        let text = `=== RAPPORT DE SESSION MINIMIND ===\n\n`;
        text += `Session ID: ${report.summary.sessionId}\n`;
        text += `Durée: ${report.summary.duration}\n`;
        text += `Questions: ${report.summary.totalQuestions}\n`;
        text += `Précision: ${report.summary.accuracy}\n`;
        text += `Score: ${report.summary.score}/${report.summary.totalPoints}\n\n`;
        
        text += `=== RECOMMANDATIONS ===\n`;
        report.recommendations.forEach((rec, index) => {
            text += `${index + 1}. ${rec.title}\n   ${rec.description}\n\n`;
        });
        
        return text;
    }
    
    formatAsCSV(report) {
        let csv = "Category,Total,Correct,Accuracy,Score\n";
        
        for (const [category, stats] of Object.entries(report.detailedAnalysis.byCategory)) {
            csv += `${category},${stats.total},${stats.correct},${stats.accuracy},${stats.score}\n`;
        }
        
        return csv;
    }
    
   
    
    resetSession() {
        this.sessionId = this.generateSessionId();
        this.sessionStart = new Date().toISOString();
        
        this.sessionData = {
            sessionId: this.sessionId,
            userId: this.userId,
            startTime: this.sessionStart,
            endTime: null,
            totalQuestions: 0,
            correctAnswers: 0,
            score: 0,
            totalPoints: 0,
            timeSpent: 0,
            questions: [],
            categories: {},
            difficulties: {},
            aiGeneratedCount: 0,
            performanceTrend: []
        };
        
        console.log("Session réinitialisée:", this.sessionId);
    }
    
    clearAllData() {
        if (confirm("Cela supprimera toutes tes données. Es-tu sûr ?")) {
            localStorage.removeItem('minimind_user_id');
            localStorage.removeItem('minimind_sessions');
            localStorage.removeItem('minimind_global_stats');
            
            
            const keys = Object.keys(localStorage);
            keys.forEach(key => {
                if (key.startsWith('user_') && key.endsWith('_stats')) {
                    localStorage.removeItem(key);
                }
            });
            
            this.userId = this.getOrCreateUserId();
            this.resetSession();
            
            console.log("Toutes les données ont été supprimées");
            return true;
        }
        return false;
    }
}




if (typeof window !== 'undefined') {
    window.AIAnalytics = AIAnalytics;
}


if (typeof module !== 'undefined' && module.exports) {
    module.exports = AIAnalytics;
}

console.log("AI Analytics System - Prêt à analyser les performances !");

