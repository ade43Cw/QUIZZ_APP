
const questions = [
    {
        questionType: "multipleChoice",
        question: "Which is large animal in the World?",
        image: "/imge/Component 1.png",
        answer: [
            {text: "Shark", correct: false},
            {text: "Blue While", correct: true},
            {text: "Elephant", correct: false},
            {text: "Giraffe", correct: false},
        ]
    },
    {
        questionType: "multipleChoice",
        question: "Which is the largest desert in the Word?",
        image: "/imge/Component 2.png",
        answer: [
            {text: "Kalahari", correct: false},
            {text: "Gobi", correct: false},
            {text: "Sahara", correct: true},
            {text: "Antarctica", correct: false},
        ]
    },
    {
        questionType: "multipleChoice",
        question: "Which is the smallest continent in the World?",
        image: "/imge/Component 3.png",
        answer: [
            {text: "Asia", correct: false},
            {text: "Australia", correct: true},
            {text: "Europe", correct: false},
            {text: "Africa", correct: false},
        ]
    },
    {
        questionType: "multipleChoice",
        question: "Which is small country in the World?",
        image: "/imge/Component 4.png",
        answer: [
            {text: "Sri Lanka", correct: false},
            {text: "Monaco", correct: false},
            {text: "Singapore", correct: false},
            {text: "Vatican", correct: true},
        ]
    },
    {
        questionType: "multipleChoice",
        question: "Which is animal live in water?",
        image: "/imge/Component 5.png",
        answer: [
            {text: "Chicken", correct: false},
            {text: "Dog", correct: false},
            {text: "Cat", correct: false},
            {text: "Nemo", correct: true},
        ]
    },
    {
        questionType: "fillInTheBlank",
        question: "Jawablah pertanyaan berikut ini!",
        image: "/imge/soal 6.png",
        answer: ["250g", "250 gram"]
    },
    {
        questionType: "fillInTheBlank",
        question: "Mamalia terbesar di bumi adalah________.",
        answer: ["Blue Whale", "Paus Biru"]
    },
    {
        questionType: "fillInTheBlank",
        question: "Ibukota Indonesia adalah ________.",
        answer: ["Jakarta", "DKI Jakarta", "jakarta"]
    },
    {
        questionType: "fillInTheBlank",
        question: "Gunung tertinggi di Indonesia adalah ________.",
        answer: ["Puncak Jaya", "Carstensz Pyramid", "Jaya Wijaya", "Puncak Jaya Wijaya"]
    },
    {
        questionType: "fillInTheBlank",
        question: "Hewan yang menjadi lambang negara Indonesia adalah ________.",
        answer: ["Garuda", "Burung Garuda"]
    },
];

const questionElement = document.getElementById("question");
const imageElement = document.getElementById("img");
const answerBtn = document.getElementById("answer-buttons");
const nextBtn = document.getElementById("nextBtn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextBtn.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    imageElement.src = currentQuestion.image;

    if (currentQuestion.questionType === "multipleChoice") {
        currentQuestion.answer.forEach(answer => {
            const button = document.createElement("button");
            button.innerHTML = answer.text;
            button.classList.add("btn");
            answerBtn.appendChild(button);
            if (answer.correct) {
                button.dataset.correct = answer.correct;
            }
            button.addEventListener("click", selectAnswer);
        });
    } 
    else if (currentQuestion.questionType === "fillInTheBlank") {
        const inputField = document.createElement("input");
        inputField.type = "text";
        inputField.classList.add("fill-in-the-blank-input");
        answerBtn.appendChild(inputField);

        const submitBtn = document.createElement("button");
        submitBtn.innerHTML = "Submit";
        submitBtn.classList.add("btnn");
        answerBtn.appendChild(submitBtn);

        submitBtn.addEventListener("click", () => {
            const userAnswer = inputField.value.trim().toLowerCase();
            const correctAnswers = currentQuestion.answer.map(answer => answer.toLowerCase());
        
            if (correctAnswers.includes(userAnswer)) {
                inputField.classList.add("correct");
                score++;
            } else {
                inputField.classList.add("incorrect");
            }
        
            inputField.disabled = true;
            submitBtn.disabled = true;
            nextBtn.style.display = "block";
        });        
    }
}

function resetState() {
    nextBtn.style.display = "none";
    while (answerBtn.firstChild) {
        answerBtn.removeChild(answerBtn.firstChild);
    }
}

function selectAnswer(e) {
    const selectBtn = e.target;
    const isCorrect = selectBtn.dataset.correct == "true";
    if (isCorrect) {
        selectBtn.classList.add("correct");
        score++;
    } else {
        selectBtn.classList.add("incorrect");
    }
    Array.from(answerBtn.children).forEach(button => {
        if (button.dataset.correct == "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextBtn.style.display = "block";
}

function showScore() {
    resetState();
    let maxscore = (score / questions.length) * 100;
    questionElement.innerHTML = `You Score ${maxscore}% (${score} out of ${questions.length})!`;
    nextBtn.innerHTML = "Play Again";
    nextBtn.style.display = "block";
}

function handleNextBtn() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

nextBtn.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextBtn();
    } else {
        startQuiz();
    }
});

startQuiz();
