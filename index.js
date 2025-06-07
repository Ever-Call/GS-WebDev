let currentSlide = 0;
let currentQuestion = 0;
let quizAnswers = [];

// Quiz data
const quizData = [
    {
        question: "Qual é a principal causa das enchentes urbanas no Brasil?",
        options: [
            "Excesso de chuva apenas",
            "Falta de infraestrutura de drenagem",
            "Vento forte",
            "Temperatura alta",
        ],
        correct: 1,
    },
    {
        question: "O que é uma bacia hidrográfica?",
        options: [
            "Um lago artificial",
            "Área drenada por um rio principal",
            "Uma represa",
            "Um canal de irrigação",
        ],
        correct: 1,
    },
    {
        question: "Qual medida NÃO ajuda na prevenção de enchentes?",
        options: [
            "Criação de áreas verdes",
            "Pavimentação de todas as superfícies",
            "Limpeza de bueiros",
            "Sistemas de alerta",
        ],
        correct: 1,
    },
    {
        question: "Em caso de enchente, o que NÃO se deve fazer?",
        options: [
            "Procurar abrigo em local alto",
            "Desligar energia elétrica",
            "Atravessar água corrente",
            "Ter kit de emergência",
        ],
        correct: 2,
    },
    {
        question: "O que significa 'infraestrutura verde'?",
        options: [
            "Construções pintadas de verde",
            "Soluções naturais para drenagem",
            "Uso de energia solar",
            "Plantio de árvores apenas",
        ],
        correct: 1,
    },
    {
        question: "Qual região do Brasil é mais afetada por enchentes?",
        options: [
            "Apenas o Norte",
            "Apenas o Sul",
            "Todas as regiões",
            "Apenas o Nordeste",
        ],
        correct: 2,
    },
    {
        question: "O desmatamento contribui para enchentes porque:",
        options: [
            "Aumenta a temperatura",
            "Reduz a absorção de água pelo solo",
            "Atrai mais chuvas",
            "Diminui o vento",
        ],
        correct: 1,
    },
    {
        question: "Qual é o papel dos bueiros na prevenção de enchentes?",
        options: [
            "Decoração urbana",
            "Drenagem da água das chuvas",
            "Suporte para calçadas",
            "Armazenamento de lixo",
        ],
        correct: 1,
    },
    {
        question: "Em que época do ano as enchentes são mais comuns no Brasil?",
        options: ["Inverno seco", "Verão chuvoso", "Outono", "Não há padrão"],
        correct: 1,
    },
    {
        question: "O que é um plano de contingência para enchentes?",
        options: [
            "Um mapa da cidade",
            "Estratégia para emergências",
            "Lista de telefones",
            "Previsão do tempo",
        ],
        correct: 1,
    },
];

// Inicialização
document.addEventListener("DOMContentLoaded", function () {
    initializeSlideshow();
    initializeQuiz();
    initializeForm();
    initializeMenu();
});

// Menu Hambúrguer
function initializeMenu() {
    const hamburger = document.querySelector(".hamburger");
    const navMenu = document.querySelector(".nav-menu");

    hamburger.addEventListener("click", () => {
        hamburger.classList.toggle("active");
        navMenu.classList.toggle("active");
    });

    // Fechar menu ao clicar em link
    document.querySelectorAll(".nav-menu a").forEach((link) => {
        link.addEventListener("click", () => {
            hamburger.classList.remove("active");
            navMenu.classList.remove("active");
        });
    });
}

// Slideshow
function initializeSlideshow() {
    showSlide(currentSlide);
}

function showSlide(n) {
    const slides = document.querySelectorAll(".slide");
    if (n >= slides.length) currentSlide = 0;
    if (n < 0) currentSlide = slides.length - 1;

    slides.forEach((slide) => slide.classList.remove("active"));
    slides[currentSlide].classList.add("active");
}

function nextSlide() {
    currentSlide++;
    showSlide(currentSlide);
}

function previousSlide() {
    currentSlide--;
    showSlide(currentSlide);
}

// Mudança de tema
function changeTheme(theme) {
    const body = document.body;
    const themes = {
        blue: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        green: "linear-gradient(135deg, #11998e 0%, #38ef7d 100%)",
        red: "linear-gradient(135deg, #ff416c 0%, #ff4b2b 100%)",
    };

    body.style.background = themes[theme];
}

// Formulário
function initializeForm() {
    const form = document.getElementById("contactForm");
    form.addEventListener("submit", handleFormSubmit);
}

function handleFormSubmit(e) {
    e.preventDefault();
    alert("Formulário enviado com sucesso! Obrigado pelo contato.");
    e.target.reset();
}

// Quiz
function initializeQuiz() {
    loadQuizQuestion();
}

function loadQuizQuestion() {
    const container = document.getElementById("quizQuestions");

    if (currentQuestion >= quizData.length) {
        showQuizResult();
        return;
    }

    const question = quizData[currentQuestion];

    container.innerHTML = `
                <div class="question">
                    <h4>Pergunta ${currentQuestion + 1}/10: ${
        question.question
    }</h4>
                    <div class="options">
                        ${question.options
                            .map(
                                (option, index) => `
                            <div class="option" onclick="selectOption(${index})" data-index="${index}">
                                ${option}
                            </div>
                        `
                            )
                            .join("")}
                    </div>
                    <button class="btn" onclick="nextQuestion()" style="margin-top: 1rem; display: none;" id="nextBtn">
                        ${
                            currentQuestion < quizData.length - 1
                                ? "Próxima Pergunta"
                                : "Finalizar Quiz"
                        }
                    </button>
                </div>
            `;
}

function selectOption(index) {
    // Remove seleção anterior
    document
        .querySelectorAll(".option")
        .forEach((opt) => opt.classList.remove("selected"));

    // Adiciona nova seleção
    document.querySelector(`[data-index="${index}"]`).classList.add("selected");

    // Armazena resposta
    quizAnswers[currentQuestion] = index;

    // Mostra botão próxima
    document.getElementById("nextBtn").style.display = "block";
}

function nextQuestion() {
    currentQuestion++;
    loadQuizQuestion();
}

function showQuizResult() {
    let correct = 0;
    quizAnswers.forEach((answer, index) => {
        if (answer === quizData[index].correct) {
            correct++;
        }
    });

    const percentage = (correct / quizData.length) * 100;
    let message = "";

    if (percentage >= 80) {
        message = "Excelente! Você tem um ótimo conhecimento sobre enchentes.";
    } else if (percentage >= 60) {
        message = "Bom trabalho! Você conhece bem o assunto.";
    } else if (percentage >= 40) {
        message = "Razoável. Continue estudando sobre o tema.";
    } else {
        message = "Precisa estudar mais sobre enchentes no Brasil.";
    }

    document.getElementById("quizQuestions").innerHTML = "";
    document.getElementById("quizResult").innerHTML = `
                <h3>Resultado do Quiz</h3>
                <p>Você acertou <strong>${correct} de ${
        quizData.length
    }</strong> perguntas (${percentage.toFixed(1)}%)</p>
                <p>${message}</p>
                <button class="btn" onclick="restartQuiz()">Refazer Quiz</button>
            `;
    document.getElementById("quizResult").style.display = "block";
}

function restartQuiz() {
    currentQuestion = 0;
    quizAnswers = [];
    document.getElementById("quizResult").style.display = "none";
    loadQuizQuestion();
}
