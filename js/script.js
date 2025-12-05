// ==============================================
// LOGIQUE PRINCIPALE DU QUIZ MINIMIND
// ==============================================

// Variables globales
let currentAppState = 'welcome'; // 'welcome', 'quiz', 'results'
let currentQuestionIndex = 0;
let userScore = 0;
let totalPossibleScore = 0;
let timeSpent = 0;
let quizStartTime = null;
let timerInterval = null;
let currentQuestionStartTime = null;
let selectedAnswerIndex = null;
let isAnswerSubmitted = false;
let quizQuestions = [];
let userAnswers = [];
let sessionAnalytics = null;
let aiGenerator = null;
let aiModeEnabled = true;

// Éléments DOM
const elements = {
    // Chargement
    loader: document.getElementById('loader'),
    mainContainer: document.getElementById('mainContainer'),
    
    // En-tête
    startQuizBtn: document.getElementById('startQuiz'),
    aiToggle: document.getElementById('aiToggle'),
    aiLabel: document.querySelector('.ai-label'),
    
    // Sections
    quizContainer: document.getElementById('quizContainer'),
    resultsSection: document.getElementById('resultsSection'),
    
    // Quiz - Informations
    progressFill: document.getElementById('progressFill'),
    progressText: document.getElementById('progressText'),
    currentScore: document.getElementById('currentScore'),
    questionNumber: document.getElementById('questionNumber'),
    questionDifficulty: document.getElementById('questionDifficulty'),
    questionCategory: document.getElementById('questionCategory'),
    questionText: document.getElementById('questionText'),
    questionImage: document.getElementById('questionImage'),
    questionImg: document.getElementById('questionImg'),
    
    // Quiz - Options
    optionsContainer: document.getElementById('optionsContainer'),
    
    // Quiz - Contrôles
    hintBtn: document.getElementById('hintBtn'),
    prevBtn: document.getElementById('prevBtn'),
    nextBtn: document.getElementById('nextBtn'),
    timerCircle: document.getElementById('timerCircle'),
    timerText: document.getElementById('timerText'),
    
    // Quiz - Feedback
    explanationCard: document.getElementById('explanationCard'),
    explanationText: document.getElementById('explanationText'),
    explanationConcept: document.getElementById('explanationConcept'),
    explanationDifficulty: document.getElementById('explanationDifficulty'),
    closeExplanation: document.getElementById('closeExplanation'),
    
    // Indice
    hintModal: document.getElementById('hintModal'),
    hintText: document.getElementById('hintText'),
    closeHint: document.getElementById('closeHint'),
    
    // Résultats
    finalScore: document.getElementById('finalScore'),
    correctCount: document.getElementById('correctCount'),
    aiGeneratedCount: document.getElementById('aiGeneratedCount'),
    timeSpentElement: document.getElementById('timeSpent'),
    feedbackText: document.getElementById('feedbackText'),
    feedbackStats: document.getElementById('feedbackStats'),
    feedbackRecommendations: document.getElementById('feedbackRecommendations'),
    scoreCircle: document.getElementById('scoreCircle'),
    progressChart: document.getElementById('progressChart'),
    
    // Actions résultats
    restartBtn: document.getElementById('restartBtn'),
    shareBtn: document.getElementById('shareBtn'),
    certificateBtn: document.getElementById('certificateBtn'),
    
    // Modals
    shareModal: document.getElementById('shareModal'),
    closeShareModal: document.getElementById('closeShareModal'),
    shareScoreValue: document.getElementById('shareScoreValue'),
    copyLinkBtn: document.getElementById('copyLinkBtn'),
    
    certificateModal: document.getElementById('certificateModal'),
    certificateContent: document.getElementById('certificateContent'),
    downloadCertificate: document.getElementById('downloadCertificate'),
    printCertificate: document.getElementById('printCertificate'),
    
    // Tabs
    tabBtns: document.querySelectorAll('.tab-btn'),
    tabContents: document.querySelectorAll('.tab-content'),
    
    // Footer
    lastUpdate: document.getElementById('lastUpdate')
};

// ==============================================
// INITIALISATION DE L'APPLICATION
// ==============================================

function initApp() {
    console.log("🚀 Initialisation de l'application MiniMind...");
    
    // Initialiser les systèmes
    initializeSystems();
    
    // Configurer les écouteurs d'événements
    setupEventListeners();
    
    // Charger les données utilisateur
    loadUserData();
    
    // Mettre à jour l'interface
    updateUI();
    
    console.log("✅ Application MiniMind initialisée !");
}

function initializeSystems() {
    // Initialiser l'analyse IA
    sessionAnalytics = new AIAnalytics();
    
    // Initialiser le générateur IA
    try {
        aiGenerator = new AIQuestionGenerator();
        console.log("🤖 Générateur IA initialisé");
    } catch (error) {
        console.error("❌ Erreur d'initialisation IA:", error);
        aiModeEnabled = false;
        if (elements.aiToggle) elements.aiToggle.checked = false;
        updateAIModeUI();
    }
    
    // Initialiser les questions
    initializeQuestions();
    
    // Mettre à jour la date dans le footer
    if (elements.lastUpdate) {
        elements.lastUpdate.textContent = new Date().toLocaleDateString('fr-FR');
    }
}

function initializeQuestions() {
    // Mélanger les questions de la base de données
    const baseQuestions = quizDatabase.shuffleQuestions();
    
    // Sélectionner 8 questions de base
    const selectedBaseQuestions = baseQuestions.slice(0, 8);
    
    // Si le mode IA est activé, ajouter 2 questions IA
    if (aiModeEnabled && aiGenerator) {
        try {
            const aiQuestions = [
                aiGenerator.generateQuestion('medium'),
                aiGenerator.generateQuestion('easy')
            ];
            quizQuestions = [...selectedBaseQuestions, ...aiQuestions];
        } catch (error) {
            console.error("❌ Erreur de génération IA:", error);
            quizQuestions = selectedBaseQuestions;
        }
    } else {
        quizQuestions = selectedBaseQuestions;
    }
    
    // Mélanger à nouveau toutes les questions
    quizQuestions = shuffleArray(quizQuestions);
    
    // Limiter à 10 questions maximum
    quizQuestions = quizQuestions.slice(0, 10);
    
    console.log(`📚 ${quizQuestions.length} questions chargées (${quizQuestions.filter(q => q.aiGenerated).length} IA)`);
}

function loadUserData() {
    // Charger les préférences utilisateur
    const savedAIMode = localStorage.getItem('minimind_ai_mode');
    if (savedAIMode !== null) {
        aiModeEnabled = savedAIMode === 'true';
        if (elements.aiToggle) {
            elements.aiToggle.checked = aiModeEnabled;
            updateAIModeUI();
        }
    }
    
    // Charger les statistiques précédentes
    const userStats = sessionAnalytics.getUserStats();
    if (userStats.bestScore) {
        console.log(`🏆 Meilleur score précédent: ${userStats.bestScore}`);
    }
}

// ==============================================
// GESTION DES ÉVÉNEMENTS
// ==============================================

function setupEventListeners() {
    // Bouton de démarrage
    if (elements.startQuizBtn) {
        elements.startQuizBtn.addEventListener('click', startQuiz);
    }
    
    // Toggle IA
    if (elements.aiToggle) {
        elements.aiToggle.addEventListener('change', toggleAIMode);
    }
    
    // Navigation du quiz
    if (elements.hintBtn) {
        elements.hintBtn.addEventListener('click', showHint);
    }
    
    if (elements.prevBtn) {
        elements.prevBtn.addEventListener('click', previousQuestion);
    }
    
    if (elements.nextBtn) {
        elements.nextBtn.addEventListener('click', nextQuestion);
    }
    
    // Fermeture des modals
    if (elements.closeExplanation) {
        elements.closeExplanation.addEventListener('click', () => {
            elements.explanationCard.style.display = 'none';
        });
    }
    
    if (elements.closeHint) {
        elements.closeHint.addEventListener('click', () => {
            elements.hintModal.style.display = 'none';
        });
    }
    
    // Actions des résultats
    if (elements.restartBtn) {
        elements.restartBtn.addEventListener('click', restartQuiz);
    }
    
    if (elements.shareBtn) {
        elements.shareBtn.addEventListener('click', showShareModal);
    }
    
    if (elements.certificateBtn) {
        elements.certificateBtn.addEventListener('click', showCertificateModal);
    }
    
    // Modal de partage
    if (elements.closeShareModal) {
        elements.closeShareModal.addEventListener('click', () => {
            elements.shareModal.style.display = 'none';
        });
    }
    
    if (elements.copyLinkBtn) {
        elements.copyLinkBtn.addEventListener('click', copyShareLink);
    }
    
    // Modal certificat
    if (elements.downloadCertificate) {
        elements.downloadCertificate.addEventListener('click', downloadCertificate);
    }
    
    if (elements.printCertificate) {
        elements.printCertificate.addEventListener('click', printCertificate);
    }
    
    // Tabs d'information
    if (elements.tabBtns.length > 0) {
        elements.tabBtns.forEach(btn => {
            btn.addEventListener('click', () => switchTab(btn.dataset.tab));
        });
    }
    
    // Fermeture des modals en cliquant à l'extérieur
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal-overlay')) {
            e.target.style.display = 'none';
        }
    });
    
    // Gestion des touches du clavier
    document.addEventListener('keydown', handleKeyboardNavigation);
}

function handleKeyboardNavigation(e) {
    if (currentAppState !== 'quiz') return;
    
    switch(e.key) {
        case '1':
        case '2':
        case '3':
        case '4':
            const optionIndex = parseInt(e.key) - 1;
            if (optionIndex >= 0 && optionIndex < 4 && !isAnswerSubmitted) {
                selectAnswer(optionIndex);
            }
            break;
            
        case 'Enter':
            if (isAnswerSubmitted && elements.nextBtn.disabled === false) {
                nextQuestion();
            } else if (!isAnswerSubmitted && selectedAnswerIndex !== null) {
                submitAnswer();
            }
            break;
            
        case 'ArrowLeft':
            if (elements.prevBtn.disabled === false) {
                previousQuestion();
            }
            break;
            
        case 'ArrowRight':
            if (elements.nextBtn.disabled === false) {
                nextQuestion();
            }
            break;
            
        case 'h':
        case 'H':
            showHint();
            break;
            
        case 'Escape':
            if (elements.explanationCard.style.display !== 'none') {
                elements.explanationCard.style.display = 'none';
            }
            if (elements.hintModal.style.display !== 'none') {
                elements.hintModal.style.display = 'none';
            }
            break;
    }
}

// ==============================================
// GESTION DU QUIZ
// ==============================================

function startQuiz() {
    console.log("🎮 Démarrage du quiz...");
    
    // Réinitialiser les variables
    currentAppState = 'quiz';
    currentQuestionIndex = 0;
    userScore = 0;
    totalPossibleScore = 0;
    timeSpent = 0;
    userAnswers = [];
    selectedAnswerIndex = null;
    isAnswerSubmitted = false;
    
    // Réinitialiser l'analyse
    sessionAnalytics.resetSession();
    
    // Cacher l'en-tête et montrer le quiz
    document.querySelector('.app-header').style.display = 'none';
    elements.quizContainer.style.display = 'block';
    elements.resultsSection.style.display = 'none';
    
    // Démarrer le timer
    quizStartTime = Date.now();
    startTimer();
    
    // Charger la première question
    loadQuestion(currentQuestionIndex);
    
    // Mettre à jour l'UI
    updateUI();
}

function loadQuestion(index) {
    if (index < 0 || index >= quizQuestions.length) {
        console.error("Index de question invalide:", index);
        return;
    }
    
    const question = quizQuestions[index];
    
    // Réinitialiser l'état
    selectedAnswerIndex = null;
    isAnswerSubmitted = false;
    
    // Mettre à jour les informations de la question
    elements.questionNumber.textContent = `Q${index + 1}`;
    elements.questionText.textContent = question.question;
    
    // Mettre à jour la difficulté
    const difficultyInfo = quizDatabase.getDifficultyInfo(question.difficulty);
    elements.questionDifficulty.textContent = difficultyInfo ? difficultyInfo.name : question.difficulty;
    elements.questionDifficulty.style.background = difficultyInfo ? difficultyInfo.color : '#FFC107';
    
    // Mettre à jour la catégorie
    const categoryInfo = quizDatabase.getCategoryInfo(question.category);
    elements.questionCategory.textContent = categoryInfo ? categoryInfo.name : question.category;
    elements.questionCategory.style.background = categoryInfo ? categoryInfo.color : '#4A00E0';
    
    // Gérer l'image (si disponible)
    if (question.imageUrl) {
        elements.questionImg.src = question.imageUrl;
        elements.questionImage.style.display = 'block';
    } else {
        elements.questionImage.style.display = 'none';
    }
    
    // Générer les options
    generateOptions(question.options);
    
    // Mettre à jour la progression
    updateProgress(index);
    
    // Mettre à jour les boutons
    elements.prevBtn.disabled = index === 0;
    elements.nextBtn.disabled = true;
    elements.nextBtn.textContent = index === quizQuestions.length - 1 ? "Terminer" : "Suivant";
    
    // Masquer l'explication précédente
    elements.explanationCard.style.display = 'none';
    
    // Démarrer le timer de la question
    currentQuestionStartTime = Date.now();
    
    // Track dans l'analyse
    sessionAnalytics.trackQuestionStart(question);
    
    // Mettre à jour l'UI
    updateUI();
}

function generateOptions(options) {
    // Vider le conteneur
    elements.optionsContainer.innerHTML = '';
    
    // Créer les boutons d'options
    options.forEach((option, index) => {
        const button = document.createElement('button');
        button.className = 'option-btn';
        button.innerHTML = option;
        button.dataset.index = index;
        
        button.addEventListener('click', () => selectAnswer(index));
        
        elements.optionsContainer.appendChild(button);
    });
}

function selectAnswer(index) {
    if (isAnswerSubmitted) return;
    
    // Désélectionner l'option précédente
    if (selectedAnswerIndex !== null) {
        const prevButton = elements.optionsContainer.querySelector(`button[data-index="${selectedAnswerIndex}"]`);
        if (prevButton) prevButton.classList.remove('selected');
    }
    
    // Sélectionner la nouvelle option
    selectedAnswerIndex = index;
    const button = elements.optionsContainer.querySelector(`button[data-index="${index}"]`);
    if (button) button.classList.add('selected');
    
    // Activer le bouton suivant (pour soumettre)
    elements.nextBtn.disabled = false;
    elements.nextBtn.textContent = "Valider";
    
    updateUI();
}

function submitAnswer() {
    if (selectedAnswerIndex === null || isAnswerSubmitted) return;
    
    const question = quizQuestions[currentQuestionIndex];
    const isCorrect = selectedAnswerIndex === question.correctAnswer;
    
    // Marquer la réponse comme soumise
    isAnswerSubmitted = true;
    
    // Calculer le temps passé
    const questionTime = Date.now() - currentQuestionStartTime;
    timeSpent += questionTime;
    
    // Mettre à jour le score
    if (isCorrect) {
        userScore += question.points || 10;
    }
    totalPossibleScore += question.points || 10;
    
    // Mettre à jour l'affichage des options
    const buttons = elements.optionsContainer.querySelectorAll('.option-btn');
    buttons.forEach((button, index) => {
        if (index === question.correctAnswer) {
            button.classList.add('correct');
        } else if (index === selectedAnswerIndex && !isCorrect) {
            button.classList.add('wrong');
        }
        button.disabled = true;
    });
    
    // Afficher l'explication
    showExplanation(question, isCorrect);
    
    // Mettre à jour le bouton suivant
    elements.nextBtn.disabled = false;
    elements.nextBtn.textContent = currentQuestionIndex === quizQuestions.length - 1 ? "Voir les résultats" : "Question suivante";
    
    // Sauvegarder la réponse de l'utilisateur
    userAnswers[currentQuestionIndex] = {
        questionId: question.id,
        selectedAnswer: selectedAnswerIndex,
        isCorrect: isCorrect,
        timeSpent: questionTime
    };
    
    // Track dans l'analyse
    sessionAnalytics.trackQuestionAnswer(
        currentQuestionIndex,
        selectedAnswerIndex,
        isCorrect,
        questionTime
    );
    
    // Mettre à jour le score affiché
    elements.currentScore.textContent = userScore;
    
    updateUI();
}

function showExplanation(question, isCorrect) {
    // Mettre à jour le texte d'explication
    elements.explanationText.textContent = question.explanation;
    
    // Mettre à jour les détails
    const categoryInfo = quizDatabase.getCategoryInfo(question.category);
    elements.explanationConcept.textContent = categoryInfo ? categoryInfo.name : question.category;
    
    const difficultyInfo = quizDatabase.getDifficultyInfo(question.difficulty);
    elements.explanationDifficulty.textContent = difficultyInfo ? difficultyInfo.name : question.difficulty;
    
    // Afficher la carte d'explication
    elements.explanationCard.style.display = 'block';
    
    // Ajouter un effet de confetti pour les bonnes réponses
    if (isCorrect) {
        showMiniConfetti();
    }
}

function showMiniConfetti() {
    // Créer quelques éléments de confetti
    for (let i = 0; i < 10; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.className = 'mini-confetti';
            confetti.style.cssText = `
                position: absolute;
                width: 8px;
                height: 8px;
                background: ${['#4A00E0', '#00C853', '#FF4081', '#FFC107'][Math.floor(Math.random() * 4)]};
                border-radius: 2px;
                top: 50%;
                left: ${20 + Math.random() * 60}%;
                animation: mini-confetti-fall 1s ease-out forwards;
                z-index: 100;
            `;
            
            document.querySelector('.question-card').appendChild(confetti);
            
            // Supprimer après l'animation
            setTimeout(() => confetti.remove(), 1000);
        }, i * 100);
    }
    
    // Ajouter le CSS de l'animation si nécessaire
    if (!document.querySelector('#mini-confetti-style')) {
        const style = document.createElement('style');
        style.id = 'mini-confetti-style';
        style.textContent = `
            @keyframes mini-confetti-fall {
                0% {
                    transform: translateY(0) rotate(0deg);
                    opacity: 1;
                }
                100% {
                    transform: translateY(100px) rotate(360deg);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

function nextQuestion() {
    if (!isAnswerSubmitted && selectedAnswerIndex !== null) {
        // Si une réponse est sélectionnée mais pas soumise, la soumettre
        submitAnswer();
        return;
    }
    
    if (currentQuestionIndex < quizQuestions.length - 1) {
        // Passer à la question suivante
        currentQuestionIndex++;
        loadQuestion(currentQuestionIndex);
    } else {
        // Terminer le quiz
        finishQuiz();
    }
}

function previousQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        loadQuestion(currentQuestionIndex);
        
        // Restaurer l'état de la question précédente
        const previousAnswer = userAnswers[currentQuestionIndex];
        if (previousAnswer) {
            selectedAnswerIndex = previousAnswer.selectedAnswer;
            isAnswerSubmitted = true;
            
            // Mettre à jour l'affichage des options
            const question = quizQuestions[currentQuestionIndex];
            const buttons = elements.optionsContainer.querySelectorAll('.option-btn');
            buttons.forEach((button, index) => {
                if (index === question.correctAnswer) {
                    button.classList.add('correct');
                } else if (index === previousAnswer.selectedAnswer && !previousAnswer.isCorrect) {
                    button.classList.add('wrong');
                }
                if (index === previousAnswer.selectedAnswer) {
                    button.classList.add('selected');
                }
                button.disabled = true;
            });
            
            // Afficher l'explication
            showExplanation(question, previousAnswer.isCorrect);
            
            // Mettre à jour le bouton suivant
            elements.nextBtn.disabled = false;
            elements.nextBtn.textContent = currentQuestionIndex === quizQuestions.length - 1 ? "Voir les résultats" : "Question suivante";
        }
    }
    
    updateUI();
}

function finishQuiz() {
    console.log("🎯 Quiz terminé !");
    
    currentAppState = 'results';
    
    // Arrêter le timer
    stopTimer();
    
    // Calculer le temps total
    const totalTime = Date.now() - quizStartTime;
    
    // Générer le rapport d'analyse
    const analyticsReport = sessionAnalytics.generateSessionReport();
    
    // Afficher les résultats
    showResults(analyticsReport);
    
    // Cacher le quiz, montrer les résultats
    elements.quizContainer.style.display = 'none';
    elements.resultsSection.style.display = 'block';
    
    updateUI();
}

function showResults(report) {
    // Mettre à jour les scores
    const finalAccuracy = (userScore / totalPossibleScore * 100).toFixed(1);
    elements.finalScore.textContent = userScore;
    elements.correctCount.textContent = `${report.summary.correctAnswers}/${report.summary.totalQuestions}`;
    elements.timeSpentElement.textContent = report.summary.duration;
    
    // Compter les questions IA générées
    const aiGeneratedCount = quizQuestions.filter(q => q.aiGenerated).length;
    elements.aiGeneratedCount.textContent = aiGeneratedCount;
    
    // Mettre à jour le cercle de score
    const percentage = (userScore / totalPossibleScore) * 100;
    const circumference = 2 * Math.PI * 80;
    const offset = circumference - (percentage / 100) * circumference;
    elements.scoreCircle.style.strokeDashoffset = offset;
    
    // Générer le feedback IA
    generateAIFeedback(report);
    
    // Générer le graphique de progression
    generateProgressChart(report);
    
    // Mettre à jour le modal de partage
    if (elements.shareScoreValue) {
        elements.shareScoreValue.textContent = userScore;
    }
}

function generateAIFeedback(report) {
    let feedbackHTML = '';
    
    // Feedback basé sur le score
    const percentage = (userScore / totalPossibleScore) * 100;
    
    if (percentage >= 90) {
        feedbackHTML = `
            <div class="feedback-excellent">
                <h4><i class="fas fa-trophy"></i> Performance exceptionnelle !</h4>
                <p>Avec ${percentage.toFixed(1)}% de bonnes réponses, tu maîtrises déjà les concepts fondamentaux de l'IA. 
                Continue comme ça, tu as le potentiel pour devenir un expert !</p>
            </div>
        `;
    } else if (percentage >= 70) {
        feedbackHTML = `
            <div class="feedback-good">
                <h4><i class="fas fa-star"></i> Très bon travail !</h4>
                <p>${percentage.toFixed(1)}% de précision montre une excellente compréhension. 
                Quelques révisions sur les points difficiles et tu seras au top !</p>
            </div>
        `;
    } else if (percentage >= 50) {
        feedbackHTML = `
            <div class="feedback-average">
                <h4><i class="fas fa-thumbs-up"></i> Bonne base !</h4>
                <p>Tu as saisi ${percentage.toFixed(1)}% des concepts. Continue à pratiquer 
                pour consolider tes connaissances en intelligence artificielle.</p>
            </div>
        `;
    } else {
        feedbackHTML = `
            <div class="feedback-improve">
                <h4><i class="fas fa-lightbulb"></i> Bon début !</h4>
                <p>L'IA est un vaste domaine. Avec ${percentage.toFixed(1)}% de bonnes réponses, 
                tu as une base solide pour continuer à apprendre. Chaque erreur est une occasion d'apprendre !</p>
            </div>
        `;
    }
    
    // Ajouter les statistiques détaillées
    if (elements.feedbackStats) {
        let statsHTML = '<div class="feedback-stats-grid">';
        
        for (const [category, stats] of Object.entries(report.detailedAnalysis.byCategory)) {
            const categoryName = quizDatabase.getCategoryInfo(category)?.name || category;
            statsHTML += `
                <div class="stat-item">
                    <div class="stat-category">${categoryName}</div>
                    <div class="stat-value">${stats.accuracy}</div>
                    <div class="stat-bar">
                        <div class="stat-bar-fill" style="width: ${stats.accuracy}"></div>
                    </div>
                </div>
            `;
        }
        
        statsHTML += '</div>';
        elements.feedbackStats.innerHTML = statsHTML;
    }
    
    // Ajouter les recommandations
    if (elements.feedbackRecommendations && report.recommendations) {
        let recHTML = '<h5><i class="fas fa-bullseye"></i> Recommandations pour progresser :</h5><ul>';
        
        report.recommendations.forEach(rec => {
            recHTML += `
                <li>
                    <strong>${rec.title}</strong><br>
                    ${rec.description}
                </li>
            `;
        });
        
        recHTML += '</ul>';
        elements.feedbackRecommendations.innerHTML = recHTML;
    }
    
    if (elements.feedbackText) {
        elements.feedbackText.innerHTML = feedbackHTML;
    }
}

function generateProgressChart(report) {
    if (!elements.progressChart) return;
    
    // Créer un graphique simple avec des barres
    const categories = Object.keys(report.detailedAnalysis.byCategory);
    let chartHTML = '';
    
    categories.forEach(category => {
        const stats = report.detailedAnalysis.byCategory[category];
        const categoryName = quizDatabase.getCategoryInfo(category)?.name || category;
        const accuracy = parseFloat(stats.accuracy);
        
        chartHTML += `
            <div class="chart-item">
                <div class="chart-label">${categoryName}</div>
                <div class="chart-bar-container">
                    <div class="chart-bar" style="width: ${accuracy}%"></div>
                    <div class="chart-value">${accuracy}%</div>
                </div>
            </div>
        `;
    });
    
    elements.progressChart.innerHTML = chartHTML;
}



function toggleAIMode() {
    aiModeEnabled = elements.aiToggle.checked;
    

    localStorage.setItem('minimind_ai_mode', aiModeEnabled);
    

    updateAIModeUI();
    
   
    showNotification(
        aiModeEnabled ? 
        "Mode IA activé 🤖" : 
        "Mode IA désactivé",
        aiModeEnabled ? "#4A00E0" : "#666"
    );
}

function updateAIModeUI() {
    if (elements.aiLabel) {
        elements.aiLabel.innerHTML = `
            <i class="fas fa-robot"></i>
            ${aiModeEnabled ? "Mode IA actif" : "Mode IA inactif"}
        `;
        
        
        const slider = document.querySelector('.slider');
        if (slider) {
            slider.style.background = aiModeEnabled ? "#00C853" : "#666";
        }
    }
}

function showHint() {
    const question = quizQuestions[currentQuestionIndex];
    
    
    let hint = "";
    
    if (question.aiGenerated && aiGenerator) {
        
        hint = aiGenerator.generateEducationalTip(question.concept);
    } else {
        
        const hints = [
            "Regarde bien toutes les options avant de répondre.",
            "Pense aux applications concrètes de l'IA dans la vie quotidienne.",
            "Souviens-toi que l'IA apprend à partir de données.",
            "Une IA éthique est transparente et équitable.",
            "Les réseaux de neurones s'inspirent du cerveau humain."
        ];
        hint = hints[Math.floor(Math.random() * hints.length)];
    }
    
   
    if (elements.hintText) {
        elements.hintText.textContent = hint;
    }
    
    elements.hintModal.style.display = 'flex';
}



function startTimer() {
    
    stopTimer();
    
    let timeLimit = 120; 
    let timeLeft = timeLimit;
    
    
    updateTimerDisplay(timeLeft, timeLimit);
    
  
    timerInterval = setInterval(() => {
        timeLeft--;
        
        
        updateTimerDisplay(timeLeft, timeLimit);
        
        
        if (timeLeft <= 0) {
            stopTimer();
            
           
            if (!isAnswerSubmitted && selectedAnswerIndex !== null) {
                submitAnswer();
            } else if (!isAnswerSubmitted) {
                
                nextQuestion();
            }
            
            
            showNotification("Temps écoulé ! ⏰", "#FF5252");
        }
    }, 1000);
}

function stopTimer() {
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
    }
}

function updateTimerDisplay(timeLeft, timeLimit) {
    if (!elements.timerCircle || !elements.timerText) return;
    
    
    elements.timerText.textContent = timeLeft > 60 ? 
        `${Math.floor(timeLeft / 60)}:${(timeLeft % 60).toString().padStart(2, '0')}` :
        timeLeft.toString();
    

    if (timeLeft < 30) {
        elements.timerText.style.color = "#FF5252";
        elements.timerCircle.style.stroke = "#FF5252";
    } else if (timeLeft < 60) {
        elements.timerText.style.color = "#FFC107";
        elements.timerCircle.style.stroke = "#FFC107";
    } else {
        elements.timerText.style.color = "#4A00E0";
        elements.timerCircle.style.stroke = "#4A00E0";
    }
    
   
    const circumference = 2 * Math.PI * 27;
    const offset = circumference - (timeLeft / timeLimit) * circumference;
    elements.timerCircle.style.strokeDashoffset = offset;
}



function restartQuiz() {
    
    initializeQuestions();
    
    
    startQuiz();
}

function showShareModal() {
   
    if (elements.shareScoreValue) {
        elements.shareScoreValue.textContent = userScore;
    }
    
    
    elements.shareModal.style.display = 'flex';
}

function copyShareLink() {
    const shareText = `J'ai obtenu ${userScore}/10 au Quiz IA MiniMind ! 🧠\nDécouvre l'intelligence artificielle en t'amusant : ${window.location.href}`;
    
    
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(shareText)
            .then(() => {
                showNotification("Lien copié ! 📋", "#00C853");
            })
            .catch(err => {
                console.error("Erreur de copie:", err);
                fallbackCopy(shareText);
            });
    } else {
        fallbackCopy(shareText);
    }
}

function fallbackCopy(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    
    try {
        document.execCommand('copy');
        showNotification("Lien copié ! 📋", "#00C853");
    } catch (err) {
        console.error("Erreur de copie:", err);
        showNotification("Impossible de copier 😕", "#FF5252");
    }
    
    document.body.removeChild(textArea);
}

function showCertificateModal() {
    
    generateCertificate();
    
    
    elements.certificateModal.style.display = 'flex';
}

function generateCertificate() {
    if (!elements.certificateContent) return;
    
    const date = new Date().toLocaleDateString('fr-FR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });
    
    const accuracy = (userScore / totalPossibleScore * 100).toFixed(1);
    
    const certificateHTML = `
        <div class="certificate">
            <div class="certificate-border">
                <div class="certificate-header">
                    <div class="certificate-logo">
                        <i class="fas fa-brain"></i>
                    </div>
                    <h1>Certificat d'Achèvement</h1>
                    <p class="certificate-subtitle">MiniMind Challenge - AI4GOOD</p>
                </div>
                
                <div class="certificate-body">
                    <p class="certificate-text">
                        Ce certificat atteste que
                    </p>
                    
                    <div class="certificate-name">
                        ${sessionAnalytics.userId.replace('USER-', 'Participant ')}
                    </div>
                    
                    <p class="certificate-text">
                        a complété avec succès le
                    </p>
                    
                    <div class="certificate-course">
                        Quiz d'Introduction à l'Intelligence Artificielle
                    </div>
                    
                    <div class="certificate-details">
                        <div class="detail">
                            <strong>Score obtenu :</strong>
                            <span>${userScore}/${totalPossibleScore} (${accuracy}%)</span>
                        </div>
                        <div class="detail">
                            <strong>Date :</strong>
                            <span>${date}</span>
                        </div>
                        <div class="detail">
                            <strong>ID du certificat :</strong>
                            <span>CERT-${sessionAnalytics.sessionId.substr(8, 8)}</span>
                        </div>
                    </div>
                </div>
                
                <div class="certificate-footer">
                    <div class="signature">
                        <div class="signature-line"></div>
                        <p>Directeur du Programme MiniMind</p>
                    </div>
                    <div class="seal">
                        <i class="fas fa-seal"></i>
                        <p>AI4GOOD Community</p>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    elements.certificateContent.innerHTML = certificateHTML;
}

function downloadCertificate() {
  
    showNotification("Téléchargement du certificat... 📄", "#4A00E0");
    
    
    setTimeout(() => {
        showNotification("Certificat téléchargé ! 🎉", "#00C853");
    }, 1500);
}

function printCertificate() {
    window.print();
}



function updateProgress(index) {
    const progress = ((index) / quizQuestions.length) * 100;
    
    if (elements.progressFill) {
        elements.progressFill.style.width = `${progress}%`;
    }
    
    if (elements.progressText) {
        elements.progressText.textContent = `Question ${index + 1}/${quizQuestions.length}`;
    }
}

function updateUI() {
  
    if (elements.currentScore) {
        elements.currentScore.textContent = userScore;
    }
    
    
    if (elements.nextBtn) {
        elements.nextBtn.disabled = selectedAnswerIndex === null && !isAnswerSubmitted;
    }
}

function showNotification(message, color = "#4A00E0") {
    
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${color};
        color: white;
        padding: 15px 25px;
        border-radius: 10px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.3);
        z-index: 9999;
        animation: slideInRight 0.3s ease, slideOutRight 0.3s ease 2.7s forwards;
        font-weight: 500;
    `;
    
    document.body.appendChild(notification);
    
    
    if (!document.querySelector('#notification-animations')) {
        const style = document.createElement('style');
        style.id = 'notification-animations';
        style.textContent = `
            @keyframes slideInRight {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            @keyframes slideOutRight {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(100%);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 3000);
}

function switchTab(tabId) {
    
    elements.tabBtns.forEach(btn => {
        btn.classList.remove('active');
    });
    
    elements.tabContents.forEach(content => {
        content.classList.remove('active');
    });
    
   
    const selectedBtn = document.querySelector(`.tab-btn[data-tab="${tabId}"]`);
    const selectedContent = document.getElementById(`${tabId}Tab`);
    
    if (selectedBtn) selectedBtn.classList.add('active');
    if (selectedContent) selectedContent.classList.add('active');
}

function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}


function focusOnQuestion() {
    if (elements.questionText) {
        elements.questionText.focus();
    }
}

function announceToScreenReader(message) {
   
    const ariaLive = document.getElementById('aria-live-region');
    
    if (!ariaLive) {
        const liveRegion = document.createElement('div');
        liveRegion.id = 'aria-live-region';
        liveRegion.setAttribute('aria-live', 'polite');
        liveRegion.setAttribute('aria-atomic', 'true');
        liveRegion.style.cssText = 'position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0, 0, 0, 0); border: 0;';
        document.body.appendChild(liveRegion);
    }
    
    document.getElementById('aria-live-region').textContent = message;
}


window.initApp = initApp;
window.startQuiz = startQuiz;
window.restartQuiz = restartQuiz;
window.toggleAIMode = toggleAIMode;


document.addEventListener('DOMContentLoaded', function() {
    
    console.log("📱 MiniMind - Prêt à démarrer !");
});


window.debugQuiz = function() {
    console.log("=== DEBUG QUIZ ===");
    console.log("État:", currentAppState);
    console.log("Question actuelle:", currentQuestionIndex);
    console.log("Score:", userScore);
    console.log("Réponses:", userAnswers);
    console.log("Questions:", quizQuestions);
    console.log("Mode IA:", aiModeEnabled);
    console.log("===================");
};

window.resetAllData = function() {
    if (sessionAnalytics) {
        sessionAnalytics.clearAllData();
    }
    localStorage.clear();
    location.reload();
};