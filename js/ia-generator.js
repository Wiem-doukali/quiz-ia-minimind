class AIQuestionGenerator {
    constructor() {
        console.log("Initialisation du générateur IA...");
        
        
        this.knowledgeBase = {
            concepts: {
                "intelligence artificielle": {
                    definition: "Domaine de l'informatique qui crée des systèmes capables d'effectuer des tâches nécessitant normalement l'intelligence humaine",
                    examples: ["Assistants vocaux", "Recommandations personnalisées", "Voitures autonomes"],
                    applications: ["Médecine", "Éducation", "Finance", "Divertissement"],
                    challenges: ["Éthique", "Transparence", "Biais algorithmiques"],
                    keywords: ["apprentissage", "algorithmes", "données", "prédiction"]
                },
                "apprentissage automatique": {
                    definition: "Capacité des machines à apprendre à partir de données sans être explicitement programmées",
                    types: ["Supervisé", "Non supervisé", "Par renforcement"],
                    examples: ["Détection de spam", "Reconnaissance d'images", "Prédiction météo"],
                    algorithms: ["Régression", "Classification", "Clustering"],
                    keywords: ["entraînement", "modèle", "précision", "données"]
                },
                "deep learning": {
                    definition: "Sous-domaine du machine learning utilisant des réseaux de neurones profonds",
                    architecture: ["Couches", "Neurones", "Poids", "Fonctions d'activation"],
                    applications: ["Vision par ordinateur", "Traitement du langage", "Génération d'images"],
                    frameworks: ["TensorFlow", "PyTorch", "Keras"],
                    keywords: ["réseaux neuronaux", "convolution", "récursivité", "GPU"]
                },
                "traitement du langage naturel": {
                    definition: "Interaction entre les ordinateurs et le langage humain",
                    tasks: ["Traduction", "Résumé", "Analyse de sentiments", "Chatbots"],
                    models: ["BERT", "GPT", "Transformer"],
                    applications: ["Assistants virtuels", "Traducteurs", "Correcteurs"],
                    keywords: ["tokenisation", "embedding", "attention", "sémantique"]
                },
                "vision par ordinateur": {
                    definition: "Capacité des machines à interpréter et comprendre le contenu visuel",
                    techniques: ["Classification", "Détection", "Segmentation", "Reconnaissance"],
                    applications: ["Sécurité", "Médecine", "Automobile", "Retail"],
                    challenges: ["Variations lumineuses", "Angles", "Occlusions"],
                    keywords: ["pixels", "caractéristiques", "CNN", "étiquettes"]
                },
                "éthique de l'IA": {
                    definition: "Principes guidant le développement et l'utilisation responsable de l'intelligence artificielle",
                    principles: ["Équité", "Transparence", "Responsabilité", "Vie privée"],
                    risks: ["Biais", "Discrimination", "Manipulation", "Surveillance"],
                    frameworks: ["AI Ethics Guidelines", "Responsible AI", "Ethical AI"],
                    keywords: ["biais", "redevabilité", "explicabilité", "justice"]
                },
                "robotique intelligente": {
                    definition: "Combinaison de la robotique et de l'intelligence artificielle",
                    capabilities: ["Perception", "Planification", "Action", "Apprentissage"],
                    applications: ["Industrie", "Santé", "Services", "Exploration"],
                    technologies: ["Capteurs", "Actionneurs", "Contrôleurs", "IA"],
                    keywords: ["autonomie", "interaction", "coopération", "adaptation"]
                },
                "IA générative": {
                    definition: "IA capable de créer du nouveau contenu (texte, images, musique)",
                    models: ["GANs", "VAEs", "Transformers", "Diffusion"],
                    outputs: ["Images", "Texte", "Musique", "Vidéo"],
                    applications: ["Design", "Art", "Rédaction", "Recherche"],
                    keywords: ["création", "innovation", "originalité", "variation"]
                }
            },
            
            facts: [
                "Le premier programme d'IA fut créé en 1951 par Christopher Strachey",
                "Le terme 'intelligence artificielle' date de 1956",
                "En 1997, Deep Blue bat le champion du monde d'échecs",
                "En 2011, Watson gagne Jeopardy!",
                "AlphaGo bat le champion de Go en 2016",
                "GPT-3 a 175 milliards de paramètres",
                "L'IA peut détecter certaines maladies mieux que les médecins",
                "90% des données mondiales ont été créées ces deux dernières années"
            ],
            
            pioneers: [
                "Alan Turing - Test de Turing",
                "John McCarthy - Père de l'IA",
                "Marvin Minsky - Co-fondateur du MIT AI Lab",
                "Geoffrey Hinton - Père du Deep Learning",
                "Yann LeCun - CNN et vision par ordinateur",
                "Andrew Ng - Cours en ligne sur l'IA",
                "Fei-Fei Li - ImageNet et vision par IA"
            ]
        };
        
        
        this.questionTemplates = [
            
            {
                type: "definition",
                templates: [
                    "Qu'est-ce que {concept} en intelligence artificielle ?",
                    "Définis le concept de {concept}.",
                    "Comment peux-tu expliquer {concept} à un débutant ?",
                    "Qu'entend-on par {concept} dans le domaine de l'IA ?"
                ]
            },
            
           
            {
                type: "example",
                templates: [
                    "Donne un exemple concret de {concept}.",
                    "Cite une application réelle de {concept}.",
                    "Où trouve-t-on {concept} dans la vie quotidienne ?",
                    "Quel cas d'utilisation illustre le mieux {concept} ?"
                ]
            },
            
            
            {
                type: "comparison",
                templates: [
                    "Quelle est la différence entre {concept1} et {concept2} ?",
                    "Compare {concept1} avec {concept2}.",
                    "En quoi {concept1} se distingue-t-il de {concept2} ?"
                ]
            },
            
            
            {
                type: "importance",
                templates: [
                    "Pourquoi {concept} est-il important en IA ?",
                    "Quel est l'intérêt de {concept} ?",
                    "En quoi {concept} révolutionne-t-il le domaine ?"
                ]
            },
            
            
            {
                type: "how",
                templates: [
                    "Comment fonctionne {concept} ?",
                    "Quel est le principe de {concept} ?",
                    "Décris le mécanisme de {concept}."
                ]
            },
            
            
            {
                type: "challenge",
                templates: [
                    "Quel est le principal défi de {concept} ?",
                    "Quelles limites rencontre {concept} ?",
                    "Quels problèmes pose {concept} ?"
                ]
            }
        ];
        
        
        this.answerTemplates = {
            definition: [
                "Il s'agit de {definition}",
                "C'est un concept qui {definition}",
                "En IA, cela signifie que {definition}",
                "{definition} est la définition précise"
            ],
            example: [
                "Un bon exemple est {example}",
                "On peut citer {example} comme illustration",
                "{example} en est une application courante",
                "Par exemple, {example} utilise ce concept"
            ],
            importance: [
                "C'est important car {reason}",
                "Sans cela, l'IA ne pourrait pas {capability}",
                "Cela permet à l'IA de {benefit}",
                "Son importance réside dans {value}"
            ],
            how: [
                "Cela fonctionne en {mechanism}",
                "Le principe est {principle}",
                "Le mécanisme implique {process}",
                "Il s'agit de {explanation}"
            ]
        };
        
        
        this.distractorTemplates = [
            "C'est plutôt lié à {wrongConcept}",
            "Cela concerne surtout {wrongField}",
            "Il s'agit en réalité de {incorrectDefinition}",
            "C'est un type de {wrongCategory}",
            "Cela n'a rien à voir avec l'IA",
            "C'est une technologie obsolète",
            "Cela n'existe que dans la science-fiction"
        ];
        
        this.initialized = true;
        console.log("Générateur IA prêt !");
    }
    

    generateQuestion(difficulty = "medium") {
        try {
           
            const concepts = Object.keys(this.knowledgeBase.concepts);
            const conceptName = concepts[Math.floor(Math.random() * concepts.length)];
            const concept = this.knowledgeBase.concepts[conceptName];
            
            
            const questionType = this.selectQuestionType(difficulty);
            const templateGroup = this.questionTemplates.find(t => t.type === questionType);
            const template = templateGroup.templates[Math.floor(Math.random() * templateGroup.templates.length)];
            
            
            let questionText = template;
            
           
            if (questionType === "comparison") {
              
                let secondConceptName;
                do {
                    secondConceptName = concepts[Math.floor(Math.random() * concepts.length)];
                } while (secondConceptName === conceptName);
                
                questionText = questionText
                    .replace("{concept1}", conceptName)
                    .replace("{concept2}", secondConceptName);
            } else {
                questionText = questionText.replace("{concept}", conceptName);
            }
            
            
            const correctAnswer = this.generateCorrectAnswer(questionType, conceptName, concept);
            
           
            const wrongAnswers = this.generateWrongAnswers(questionType, conceptName, difficulty);
            
           
            const allAnswers = [correctAnswer, ...wrongAnswers];
            this.shuffleArray(allAnswers);
            
            const correctIndex = allAnswers.indexOf(correctAnswer);
            
            
            const explanation = this.generateExplanation(questionType, conceptName, concept, correctAnswer);
            
           
            const funFact = this.generateFunFact(conceptName);
            
           
            return {
                id: `AI-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
                question: questionText,
                options: allAnswers,
                correctAnswer: correctIndex,
                explanation: explanation,
                category: this.mapConceptToCategory(conceptName),
                difficulty: difficulty,
                points: this.calculatePoints(difficulty),
                tags: this.generateTags(conceptName, questionType),
                aiGenerated: true,
                concept: conceptName,
                questionType: questionType,
                timestamp: new Date().toISOString(),
                funFact: funFact,
                metadata: {
                    generatorVersion: "1.0.0",
                    knowledgeSource: "AI4GOOD Knowledge Base",
                    generationTime: Date.now()
                }
            };
            
        } catch (error) {
            console.error("Erreur de génération IA:", error);
            return this.getFallbackQuestion();
        }
    }
    
   
    
    selectQuestionType(difficulty) {
        const typeWeights = {
            "easy": ["definition", "example"],
            "medium": ["definition", "example", "importance", "how"],
            "hard": ["comparison", "challenge", "how"]
        };
        
        const types = typeWeights[difficulty] || typeWeights.medium;
        return types[Math.floor(Math.random() * types.length)];
    }
    
    generateCorrectAnswer(type, conceptName, concept) {
        const prefix = this.getAnswerPrefix("correct");
        
        switch(type) {
            case "definition":
                const defTemplate = this.answerTemplates.definition[Math.floor(Math.random() * this.answerTemplates.definition.length)];
                return `${prefix} ${defTemplate.replace("{definition}", concept.definition.toLowerCase())}`;
                
            case "example":
                const example = concept.examples[Math.floor(Math.random() * concept.examples.length)];
                const exTemplate = this.answerTemplates.example[Math.floor(Math.random() * this.answerTemplates.example.length)];
                return `${prefix} ${exTemplate.replace("{example}", example)}`;
                
            case "importance":
                const importanceReason = this.generateImportanceReason(concept);
                const impTemplate = this.answerTemplates.importance[Math.floor(Math.random() * this.answerTemplates.importance.length)];
                return `${prefix} ${impTemplate.replace("{reason}", importanceReason)}`;
                
            case "how":
                const howExplanation = this.generateHowExplanation(concept);
                const howTemplate = this.answerTemplates.how[Math.floor(Math.random() * this.answerTemplates.how.length)];
                return `${prefix} ${howTemplate.replace("{mechanism}", howExplanation)}`;
                
            case "comparison":
                return `${prefix} ${this.generateComparisonAnswer(conceptName)}`;
                
            case "challenge":
                const challenge = concept.challenges ? concept.challenges[0] : "son développement éthique et responsable";
                return `${prefix} Principalement ${challenge}`;
                
            default:
                return `${prefix} C'est un aspect essentiel de ${conceptName}`;
        }
    }
    
    generateWrongAnswers(type, correctConcept, difficulty) {
        const wrongAnswers = [];
        const concepts = Object.keys(this.knowledgeBase.concepts);
        
        while (wrongAnswers.length < 3) {
            let wrongConceptName;
            do {
                wrongConceptName = concepts[Math.floor(Math.random() * concepts.length)];
            } while (wrongConceptName === correctConcept && concepts.length > 1);
            
            const wrongConcept = this.knowledgeBase.concepts[wrongConceptName];
            const prefix = this.getAnswerPrefix("wrong");
            let wrongAnswer;
            
            const distractorTemplate = this.distractorTemplates[Math.floor(Math.random() * this.distractorTemplates.length)];
            
            switch(type) {
                case "definition":
                    wrongAnswer = `${prefix} ${distractorTemplate
                        .replace("{wrongConcept}", wrongConceptName)
                        .replace("{incorrectDefinition}", wrongConcept.definition.substring(0, 100) + "...")}`;
                    break;
                    
                case "example":
                    const wrongExample = wrongConcept.examples ? wrongConcept.examples[0] : "un autre domaine";
                    wrongAnswer = `${prefix} ${distractorTemplate.replace("{wrongField}", wrongExample)}`;
                    break;
                    
                default:
                    wrongAnswer = `${prefix} ${distractorTemplate.replace("{wrongCategory}", wrongConceptName)}`;
            }
            
            
            if (!wrongAnswers.includes(wrongAnswer)) {
                wrongAnswers.push(wrongAnswer);
            }
        }
        
        return wrongAnswers;
    }
    
    generateExplanation(type, conceptName, concept, correctAnswer) {
        const aiSignature = "**Question générée par IA** : ";
        let explanation = aiSignature;
        
        switch(type) {
            case "definition":
                explanation += `Le ${conceptName} est ${concept.definition.toLowerCase()}. `;
                if (concept.examples) {
                    explanation += `Exemples : ${concept.examples.slice(0, 2).join(', ')}. `;
                }
                break;
                
            case "example":
                explanation += `${conceptName} s'applique dans divers domaines comme ${concept.examples?.slice(0, 3).join(', ') || "plusieurs secteurs"}. `;
                explanation += `Cette technologie transforme notre façon de ${this.getApplicationImpact(conceptName)}.`;
                break;
                
            case "importance":
                explanation += `${conceptName} est crucial car il permet ${this.getImportanceReason(concept)}. `;
                explanation += `Sans cela, les systèmes d'IA ne pourraient pas ${concept.keywords?.slice(0, 2).join(' et ') || "fonctionner efficacement"}.`;
                break;
                
            case "comparison":
                explanation += this.generateComparisonExplanation(conceptName);
                break;
                
            default:
                explanation += `Cette question explore ${conceptName}, un concept fondamental en intelligence artificielle. `;
                explanation += `Ta réponse montre que tu ${this.getLearningFeedback()}`;
        }
        
        
        explanation += `\n\n**Savais-tu ?** ${this.generateEducationalTip(conceptName)}`;
        
        return explanation;
    }
    
    generateFunFact(concept) {
        const funFacts = {
            "intelligence artificielle": "Le premier programme d'IA fut créé en 1951 pour jouer aux dames !",
            "apprentissage automatique": "Netflix offre 1 million de dollars pour améliorer son algorithme de recommandation de 10% !",
            "deep learning": "Les réseaux de neurones s'inspirent du cerveau humain qui contient environ 86 milliards de neurones.",
            "traitement du langage naturel": "GPT-3 peut écrire des poèmes, des articles et même du code informatique !",
            "vision par ordinateur": "L'IA peut reconnaître un visage parmi des millions en moins d'une seconde.",
            "éthique de l'IA": "L'Union Européenne a créé les premières règles mondiales pour l'IA en 2024.",
            "robotique intelligente": "Les robots chirurgicaux peuvent opérer avec une précision de 0.1 mm.",
            "IA générative": "DALL-E peut créer des images à partir de simples descriptions textuelles."
        };
        
        return funFacts[concept] || "L'IA apprend de ses erreurs, tout comme nous !";
    }
    
   
    
    generateImportanceReason(concept) {
        const reasons = [
            `permet aux machines de ${concept.keywords?.[0] || "apprendre"}`,
            `est fondamental pour ${concept.keywords?.[1] || "le développement"} de l'IA`,
            `résout des problèmes ${concept.challenges?.[0] || "complexes"}`,
            `améliore ${concept.applications?.[0] || "notre quotidien"}`,
            `ouvre de nouvelles possibilités en ${concept.keywords?.[2] || "innovation"}`
        ];
        
        return reasons[Math.floor(Math.random() * reasons.length)];
    }
    
    generateHowExplanation(concept) {
        const explanations = [
            `analysant ${concept.keywords?.[0] || "des données"}`,
            `utilisant ${concept.algorithms?.[0] || "des algorithmes"} spécifiques`,
            `apprenant à partir de ${concept.keywords?.[1] || "l'expérience"}`,
            `imitant ${concept.architecture?.[0] || "des processus"} naturels`,
            `combinant ${concept.techniques?.[0] || "plusieurs approches"}`
        ];
        
        return explanations[Math.floor(Math.random() * explanations.length)];
    }
    
    generateComparisonAnswer(concept) {
        const comparisons = {
            "intelligence artificielle": "est le domaine général, tandis que l'apprentissage automatique en est une sous-partie",
            "apprentissage automatique": "utilise des données pour apprendre, alors que la programmation traditionnelle suit des règles fixes",
            "deep learning": "utilise des réseaux profonds, contrairement au machine learning classique qui peut être plus simple",
            "traitement du langage naturel": "se concentre sur le langage, tandis que la vision par ordinateur traite les images"
        };
        
        return comparisons[concept] || "ont des applications et des mécanismes différents";
    }
    
    generateComparisonExplanation(concept) {
        const explanations = {
            "intelligence artificielle": "L'IA est le vaste domaine qui englobe toutes les techniques d'intelligence machine. Le machine learning en est une branche spécifique qui se concentre sur l'apprentissage à partir de données.",
            "apprentissage automatique": "Contrairement à la programmation traditionnelle où on code explicitement chaque règle, le machine learning permet aux systèmes d'apprendre par eux-mêmes à partir d'exemples.",
            "deep learning": "Le deep learning est une forme avancée de machine learning qui utilise des réseaux de neurones avec de nombreuses couches, permettant de résoudre des problèmes plus complexes que les approches traditionnelles."
        };
        
        return explanations[concept] || "Ces deux concepts, bien que liés, abordent l'intelligence artificielle sous des angles complémentaires mais distincts.";
    }
    
    getApplicationImpact(concept) {
        const impacts = {
            "intelligence artificielle": "interagir avec la technologie",
            "apprentissage automatique": "prendre des décisions basées sur les données",
            "deep learning": "résoudre des problèmes complexes",
            "traitement du langage naturel": "communiquer avec les machines",
            "vision par ordinateur": "voir et comprendre le monde",
            "éthique de l'IA": "développer une technologie responsable",
            "robotique intelligente": "automatiser les tâches",
            "IA générative": "créer du contenu innovant"
        };
        
        return impacts[concept] || "utiliser la technologie";
    }
    
    getLearningFeedback() {
        const feedbacks = [
            "commences à maîtriser les concepts de base.",
            "as une bonne compréhension des principes fondamentaux.",
            "progresses dans ta connaissance de l'IA.",
            "développes une vision nuancée de cette technologie."
        ];
        
        return feedbacks[Math.floor(Math.random() * feedbacks.length)];
    }
    
    generateEducationalTip(concept) {
        const tips = {
            "intelligence artificielle": "L'IA ne remplace pas l'intelligence humaine, elle l'augmente !",
            "apprentissage automatique": "Plus les données sont variées, mieux le modèle apprend.",
            "deep learning": "Les réseaux de neurones s'inspirent de notre cerveau !",
            "traitement du langage naturel": "Les modèles de langage apprennent en lisant des milliards de mots.",
            "vision par ordinateur": "L'IA peut voir des détails invisibles à l'œil humain.",
            "éthique de l'IA": "Une IA éthique est une IA qui sert l'humanité.",
            "robotique intelligente": "Les robots apprennent par essai-erreur, comme les humains.",
            "IA générative": "La créativité n'est plus réservée aux humains !"
        };
        
        return tips[concept] || "Chaque jour, l'IA devient plus intelligente, et toi aussi en l'étudiant !";
    }
    
    
    
    getAnswerPrefix(type) {
        const prefixes = {
            "correct": ["✅", "🎯", "👏", "🌟"],
            "wrong": ["❌", "⚠️", "🚫", "💥"]
        };
        
        const available = prefixes[type] || ["📝"];
        return available[Math.floor(Math.random() * available.length)];
    }
    
    mapConceptToCategory(concept) {
        const mapping = {
            "intelligence artificielle": "fundamentals",
            "apprentissage automatique": "machine-learning",
            "deep learning": "machine-learning",
            "traitement du langage naturel": "applications",
            "vision par ordinateur": "applications",
            "éthique de l'IA": "ethics",
            "robotique intelligente": "applications",
            "IA générative": "future"
        };
        
        return mapping[concept] || "fundamentals";
    }
    
    calculatePoints(difficulty) {
        const points = {
            "easy": 10,
            "medium": 20,
            "hard": 30
        };
        
        return points[difficulty] || 15;
    }
    
    generateTags(concept, questionType) {
        const tags = [concept, questionType, "ia-générée"];
        
        
        if (concept.includes("apprentissage")) tags.push("machine-learning");
        if (concept.includes("vision")) tags.push("computer-vision");
        if (concept.includes("langage")) tags.push("nlp");
        if (concept.includes("éthique")) tags.push("ethics");
        
        return tags;
    }
    
    shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }
    
    getFallbackQuestion() {
        return {
            id: "AI-FALLBACK",
            question: "Qu'est-ce que l'apprentissage automatique ?",
            options: [
                "✅ La capacité d'une machine à apprendre sans être explicitement programmée",
                "❌ Un type de matériel informatique",
                "❌ Une technologie obsolète",
                "❌ Cela n'a rien à voir avec l'IA"
            ],
            correctAnswer: 0,
            explanation: "🤖 **Mode de secours** : L'apprentissage automatique permet aux machines d'apprendre à partir de données pour améliorer leurs performances.",
            category: "machine-learning",
            difficulty: "easy",
            points: 10,
            aiGenerated: false,
            concept: "apprentissage automatique"
        };
    }
    
    
    
    generatePersonalizedQuiz(userLevel = "beginner", preferences = {}) {
        const difficultyMap = {
            "beginner": ["easy", "medium"],
            "intermediate": ["medium"],
            "advanced": ["medium", "hard"]
        };
        
        const difficulties = difficultyMap[userLevel] || ["medium"];
        const numberOfQuestions = preferences.numberOfQuestions || 10;
        
        const questions = [];
        for (let i = 0; i < numberOfQuestions; i++) {
            const difficulty = difficulties[Math.floor(Math.random() * difficulties.length)];
            questions.push(this.generateQuestion(difficulty));
        }
        
        return {
            quizId: `QUIZ-${Date.now()}`,
            questions: questions,
            metadata: {
                userLevel: userLevel,
                generatedAt: new Date().toISOString(),
                totalPoints: questions.reduce((sum, q) => sum + q.points, 0),
                averageDifficulty: this.calculateAverageDifficulty(questions)
            }
        };
    }
    
    calculateAverageDifficulty(questions) {
        const difficultyValues = {
            "easy": 1,
            "medium": 2,
            "hard": 3
        };
        
        const avg = questions.reduce((sum, q) => sum + difficultyValues[q.difficulty], 0) / questions.length;
        
        if (avg < 1.5) return "easy";
        if (avg < 2.5) return "medium";
        return "hard";
    }
    
   
    
    analyzeAnswerPattern(question, userAnswer, timeSpent) {
        const analysis = {
            correctness: userAnswer === question.correctAnswer,
            confidence: this.estimateConfidence(timeSpent),
            concept: question.concept,
            difficulty: question.difficulty,
            timestamp: new Date().toISOString()
        };
        
        
        analysis.feedback = this.generateAnswerFeedback(analysis);
        
        return analysis;
    }
    
    estimateConfidence(timeSpent) {
        if (timeSpent < 5) return "high"; 
        if (timeSpent < 15) return "medium"; 
        return "low"; 
    }
    
    generateAnswerFeedback(analysis) {
        if (analysis.correctness) {
            const feedbacks = {
                "high": "🎉 Réponse rapide et correcte ! Tu maîtrises ce concept.",
                "medium": "👏 Bonne réponse réfléchie. Tu as bien compris.",
                "low": "✓ Bonne réponse ! Prends le temps de réfléchir, c'est important."
            };
            return feedbacks[analysis.confidence] || "👍 Correct !";
        } else {
            const feedbacks = {
                "high": "💡 Attention aux réponses trop rapides. Relis bien la question.",
                "medium": "📚 Cette notion mérite d'être revue. Consulte l'explication.",
                "low": "🤔 Tu as hésité, c'est normal. C'est en faisant des erreurs qu'on apprend !"
            };
            return feedbacks[analysis.confidence] || "❌ Pas tout à fait. Regarde l'explication.";
        }
    }
    
   
    
    getGeneratorStats() {
        return {
            conceptsAvailable: Object.keys(this.knowledgeBase.concepts).length,
            questionTemplates: this.questionTemplates.reduce((sum, t) => sum + t.templates.length, 0),
            answerTemplates: Object.values(this.answerTemplates).reduce((sum, arr) => sum + arr.length, 0),
            initialized: this.initialized,
            version: "1.0.0"
        };
    }
}




if (typeof window !== 'undefined') {
    window.AIQuestionGenerator = AIQuestionGenerator;
}


if (typeof module !== 'undefined' && module.exports) {
    module.exports = AIQuestionGenerator;
}

console.log("🤖 IA Question Generator - Prêt à générer du contenu éducatif !");

