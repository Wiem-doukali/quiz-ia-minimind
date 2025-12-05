const quizDatabase = {
    
    categories: [
        {
            id: "fundamentals",
            name: "Fondamentaux IA",
            icon: "fas fa-brain",
            color: "#4A00E0",
            description: "Concepts de base de l'intelligence artificielle"
        },
        {
            id: "machine-learning",
            name: "Apprentissage Machine",
            icon: "fas fa-robot",
            color: "#00C853",
            description: "Comment les machines apprennent"
        },
        {
            id: "applications",
            name: "Applications IA",
            icon: "fas fa-mobile-alt",
            color: "#FF4081",
            description: "IA dans la vie quotidienne"
        },
        {
            id: "ethics",
            name: "Éthique et Société",
            icon: "fas fa-balance-scale",
            color: "#FFC107",
            description: "Enjeux éthiques de l'IA"
        },
        {
            id: "future",
            name: "Futur de l'IA",
            icon: "fas fa-rocket",
            color: "#2196F3",
            description: "Tendances et innovations"
        }
    ],

   
    difficulties: [
        {
            id: "easy",
            name: "Facile",
            points: 10,
            color: "#00C853"
        },
        {
            id: "medium",
            name: "Moyen",
            points: 20,
            color: "#FFC107"
        },
        {
            id: "hard",
            name: "Difficile",
            points: 30,
            color: "#FF5252"
        }
    ],

    
    questions: [
        {
            id: "Q001",
            question: "Qu'est-ce que l'intelligence artificielle (IA) ?",
            options: [
                "Un programme qui simule l'intelligence humaine",
                "Un robot physique capable de penser",
                "Une technologie qui remplace tous les emplois",
                "Un mythe scientifique inexistant"
            ],
            correctAnswer: 0,
            explanation: "L'IA est un ensemble de techniques permettant à des machines d'imiter certaines formes d'intelligence humaine, comme l'apprentissage ou le raisonnement. Elle ne se limite pas aux robots et n'a pas pour but de remplacer l'humain, mais de l'assister.",
            category: "fundamentals",
            difficulty: "easy",
            points: 10,
            tags: ["définition", "fondamentaux"],
            aiGenerated: false,
            imageUrl: null,
            funFact: "Le terme 'intelligence artificielle' a été inventé en 1956 lors de la conférence de Dartmouth."
        },
        {
            id: "Q002",
            question: "Quelle est la différence entre l'IA faible et l'IA forte ?",
            options: [
                "L'IA faible est spécialisée, l'IA forte serait consciente",
                "L'IA faible est lente, l'IA forte est rapide",
                "L'IA faible coûte moins cher",
                "Il n'y a pas de différence"
            ],
            correctAnswer: 0,
            explanation: "L'IA faible (ou étroite) est conçue pour une tâche spécifique (comme jouer aux échecs). L'IA forte (ou générale) aurait des capacités cognitives équivalentes à un humain et une conscience. Nous n'avons actuellement que des IA faibles.",
            category: "fundamentals",
            difficulty: "medium",
            points: 20,
            tags: ["concepts", "théorie"],
            aiGenerated: false,
            imageUrl: null,
            funFact: "Les assistants vocaux comme Siri ou Alexa sont des exemples d'IA faible."
        },
        {
            id: "Q003",
            question: "Qu'est-ce que l'apprentissage automatique (Machine Learning) ?",
            options: [
                "La capacité d'une machine à apprendre sans être explicitement programmée",
                "Un cours d'informatique pour débutants",
                "La programmation traditionnelle",
                "L'étude des machines industrielles"
            ],
            correctAnswer: 0,
            explanation: "L'apprentissage automatique est une sous-catégorie de l'IA où les algorithmes apprennent à partir de données pour prendre des décisions ou faire des prédictions, sans être programmés spécifiquement pour chaque tâche.",
            category: "machine-learning",
            difficulty: "easy",
            points: 10,
            tags: ["machine-learning", "apprentissage"],
            aiGenerated: false,
            imageUrl: null,
            funFact: "Netflix utilise le machine learning pour recommander des films selon tes préférences."
        },
        {
            id: "Q004",
            question: "Quel est le rôle des données dans l'apprentissage automatique ?",
            options: [
                "Elles servent à entraîner et tester les modèles",
                "Elles ne sont pas importantes",
                "Elles servent uniquement au stockage",
                "Elles déterminent la vitesse du processeur"
            ],
            correctAnswer: 0,
            explanation: "Les données sont cruciales en machine learning. Plus un modèle a de données de qualité, mieux il peut apprendre. Les données sont divisées en ensembles d'entraînement (pour apprendre) et de test (pour évaluer).",
            category: "machine-learning",
            difficulty: "medium",
            points: 20,
            tags: ["données", "machine-learning"],
            aiGenerated: false,
            imageUrl: null,
            funFact: "Certains modèles d'IA sont entraînés avec des milliards de données !"
        },
        {
            id: "Q005",
            question: "Qu'est-ce qu'un réseau de neurones artificiels ?",
            options: [
                "Un système inspiré du cerveau humain avec des neurones connectés",
                "Un réseau internet pour robots",
                "Un câblage électronique complexe",
                "Un nouveau type de processeur"
            ],
            correctAnswer: 0,
            explanation: "Un réseau de neurones artificiels est un modèle informatique inspiré du cerveau humain. Il est composé de neurones artificiels connectés qui traitent l'information en plusieurs couches pour apprendre des motifs complexes.",
            category: "machine-learning",
            difficulty: "medium",
            points: 20,
            tags: ["réseaux-neurones", "deep-learning"],
            aiGenerated: false,
            imageUrl: null,
            funFact: "Les réseaux de neurones peuvent reconnaître des images mieux que les humains dans certains cas !"
        },
        {
            id: "Q006",
            question: "Quelle application d'IA utilises-tu probablement chaque jour ?",
            options: [
                "Les recommandations YouTube ou Netflix",
                "Les voitures volantes",
                "Les robots domestiques intelligents",
                "Les voyages dans le temps"
            ],
            correctAnswer: 0,
            explanation: "Les recommandations personnalisées sur les plateformes de streaming utilisent l'IA pour analyser tes préférences et te suggérer du contenu. C'est une application concrète et quotidienne de l'intelligence artificielle.",
            category: "applications",
            difficulty: "easy",
            points: 10,
            tags: ["applications", "quotidien"],
            aiGenerated: false,
            imageUrl: null,
            funFact: "L'algorithme de YouTube analyse plus de 80 milliards de signaux pour ses recommandations !"
        },
        {
            id: "Q007",
            question: "Comment l'IA aide-t-elle en médecine ?",
            options: [
                "En analysant des images médicales pour détecter des maladies",
                "En remplaçant tous les médecins",
                "En créant des médicaments instantanément",
                "En faisant des opérations chirurgicales sans surveillance"
            ],
            correctAnswer: 0,
            explanation: "L'IA assiste les médecins en analysant des radiographies, IRM et autres images médicales pour détecter précocement des anomalies comme des tumeurs. Elle ne remplace pas les médecins mais les aide à être plus précis.",
            category: "applications",
            difficulty: "medium",
            points: 20,
            tags: ["médecine", "applications"],
            aiGenerated: false,
            imageUrl: null,
            funFact: "Certains systèmes d'IA peuvent détecter le cancer de la peau avec une précision de 95% !"
        },
        {
            id: "Q008",
            question: "Qu'est-ce qu'un biais algorithmique ?",
            options: [
                "Une injustice reproduite par l'IA à cause de données biaisées",
                "Une erreur de calcul mathématique",
                "Un problème technique du serveur",
                "Une fonctionnalité intentionnelle"
            ],
            correctAnswer: 0,
            explanation: "Un biais algorithmique se produit quand un système d'IA reproduit ou amplifie des préjugés présents dans les données d'entraînement. Par exemple, si un système de recrutement est entraîné avec des données majoritairement masculines, il pourrait défavoriser les femmes.",
            category: "ethics",
            difficulty: "hard",
            points: 30,
            tags: ["éthique", "biais", "société"],
            aiGenerated: false,
            imageUrl: null,
            funFact: "En 2018, Amazon a dû abandonner un outil de recrutement car il pénalisait les CV contenant le mot 'femmes'."
        },
        {
            id: "Q009",
            question: "Pourquoi la transparence est-elle importante en IA ?",
            options: [
                "Pour comprendre comment les décisions sont prises",
                "Pour rendre l'IA plus rapide",
                "Pour réduire les coûts de développement",
                "Pour cacher les défauts du système"
            ],
            correctAnswer: 0,
            explanation: "La transparence (ou explicabilité) permet de comprendre comment une IA prend ses décisions. C'est crucial pour la confiance, la responsabilité et la détection des biais ou erreurs.",
            category: "ethics",
            difficulty: "medium",
            points: 20,
            tags: ["éthique", "transparence"],
            aiGenerated: false,
            imageUrl: null,
            funFact: "Le RGPD (règlement européen) donne le 'droit à l'explication' face aux décisions automatisées."
        },
        {
            id: "Q010",
            question: "Quel est un défi majeur pour le futur de l'IA ?",
            options: [
                "Développer une IA éthique et bénéfique pour l'humanité",
                "Créer des robots qui ressemblent exactement aux humains",
                "Remplacer tous les emplois humains",
                "Construire des super-ordinateurs géants"
            ],
            correctAnswer: 0,
            explanation: "Le plus grand défi n'est pas technique mais éthique : comment développer une IA qui respecte les valeurs humaines, qui soit juste, transparente et qui améliore réellement nos vies sans créer de nouveaux problèmes.",
            category: "future",
            difficulty: "hard",
            points: 30,
            tags: ["futur", "enjeux", "éthique"],
            aiGenerated: false,
            imageUrl: null,
            funFact: "Des organisations comme OpenAI et DeepMind ont des chartes éthiques pour guider leurs recherches."
        },
        {
            id: "Q011",
            question: "Qu'est-ce que le traitement du langage naturel (NLP) ?",
            options: [
                "La capacité des machines à comprendre et générer du langage humain",
                "La traduction mot à mot par ordinateur",
                "L'étude des langues anciennes",
                "Un programme de correction grammaticale"
            ],
            correctAnswer: 0,
            explanation: "Le NLP est un domaine de l'IA qui permet aux machines de comprendre, interpréter et générer le langage humain. C'est la technologie derrière les assistants vocaux, les chatbots et les traducteurs automatiques.",
            category: "applications",
            difficulty: "medium",
            points: 20,
            tags: ["langage", "NLP", "applications"],
            aiGenerated: false,
            imageUrl: null,
            funFact: "ChatGPT est un modèle de traitement du langage naturel qui peut tenir des conversations cohérentes."
        },
        {
            id: "Q012",
            question: "Comment fonctionne la reconnaissance d'images par IA ?",
            options: [
                "En analysant les pixels et en apprenant des motifs",
                "En comparant à une seule image de référence",
                "En demandant à un humain de décrire l'image",
                "En utilisant une base de données de mots-clés"
            ],
            correctAnswer: 0,
            explanation: "La reconnaissance d'images utilise des réseaux de neurones convolutifs qui analysent les pixels, détectent des caractéristiques (bords, formes, couleurs) et comparent avec des millions d'images apprises précédemment.",
            category: "applications",
            difficulty: "medium",
            points: 20,
            tags: ["vision", "images", "applications"],
            aiGenerated: false,
            imageUrl: null,
            funFact: "Google Photos peut reconnaître tes amis sur des photos et les regrouper automatiquement !"
        }
    ],

    
    stats: {
        totalQuestions: 0,
        averageDifficulty: "medium",
        totalPoints: 0,
        lastUpdated: "2024-01-15"
    },

   
    updateStats: function() {
        this.stats.totalQuestions = this.questions.length;
        this.stats.totalPoints = this.questions.reduce((sum, q) => sum + q.points, 0);
        
        
        const difficultyScores = {
            "easy": 1,
            "medium": 2,
            "hard": 3
        };
        
        const avgScore = this.questions.reduce((sum, q) => sum + difficultyScores[q.difficulty], 0) / this.questions.length;
        
        if (avgScore < 1.5) this.stats.averageDifficulty = "easy";
        else if (avgScore < 2.5) this.stats.averageDifficulty = "medium";
        else this.stats.averageDifficulty = "hard";
        
        this.stats.lastUpdated = new Date().toISOString().split('T')[0];
    },

    
    getQuestionsByCategory: function(categoryId) {
        return this.questions.filter(q => q.category === categoryId);
    },

    
    getQuestionsByDifficulty: function(difficulty) {
        return this.questions.filter(q => q.difficulty === difficulty);
    },

    
    shuffleQuestions: function() {
        const shuffled = [...this.questions];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    },

    
    getRandomQuestion: function() {
        const randomIndex = Math.floor(Math.random() * this.questions.length);
        return this.questions[randomIndex];
    },

    
    getCategoryInfo: function(categoryId) {
        return this.categories.find(c => c.id === categoryId) || null;
    },

    
    getDifficultyInfo: function(difficultyId) {
        return this.difficulties.find(d => d.id === difficultyId) || null;
    },

 
    generateCustomQuiz: function(options = {}) {
        const {
            numberOfQuestions = 10,
            categories = [],
            difficulties = []
        } = options;
        
        let filteredQuestions = [...this.questions];
        
        
        if (categories.length > 0) {
            filteredQuestions = filteredQuestions.filter(q => categories.includes(q.category));
        }
        
        
        if (difficulties.length > 0) {
            filteredQuestions = filteredQuestions.filter(q => difficulties.includes(q.difficulty));
        }
        
       
        const shuffled = [...filteredQuestions];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        
        return shuffled.slice(0, numberOfQuestions);
    }
};


quizDatabase.updateStats();


if (typeof window !== 'undefined') {
    window.quizDatabase = quizDatabase;
}


if (typeof module !== 'undefined' && module.exports) {
    module.exports = quizDatabase;
}

console.log(`✅ Base de données chargée : ${quizDatabase.stats.totalQuestions} questions disponibles`);