const questions = [
    {
        text: "You want to create the structure of a webpage. Which technology should you use?",
        options: ["CSS", "JavaScript", "HTML", "Python"],
        correct: 2
    },
    {
        text: "Which tool is mainly responsible for webpage design and layout?",
        options: ["HTML", "CSS", "SQL", "C++"],
        correct: 1
    },
    {
        text: "Which language makes a webpage interactive?",
        options: ["HTML", "CSS", "JavaScript", "XML"],
        correct: 2
    }
];

let index = 0;
let score = 0;
let selected = null;

const questionText = document.getElementById("question-text");
const optionsBox = document.getElementById("options-box");
const nextBtn = document.getElementById("next-btn");
const progress = document.getElementById("progress");
const quizBox = document.getElementById("quiz-box");
const resultBox = document.getElementById("result-box");
const finalScore = document.getElementById("final-score");
const finalMessage = document.getElementById("final-message");
const restartBtn = document.getElementById("restart-btn");

function loadQuestion() {
    selected = null;
    nextBtn.disabled = true;
    optionsBox.innerHTML = "";

    const q = questions[index];
    questionText.textContent = q.text;
    progress.textContent = `Question ${index + 1} of ${questions.length}`;

    q.options.forEach((option, i) => {
        const btn = document.createElement("button");
        btn.textContent = option;
        btn.classList.add("option-btn");

        btn.onclick = () => {
            document.querySelectorAll(".option-btn")
                .forEach(b => b.classList.remove("selected"));
            btn.classList.add("selected");
            selected = i;
            nextBtn.disabled = false;
        };

        optionsBox.appendChild(btn);
    });
}

nextBtn.onclick = () => {
    if (selected === questions[index].correct) {
        score++;
    }

    index++;

    if (index < questions.length) {
        loadQuestion();
    } else {
        showResult();
    }
};

function showResult() {
    quizBox.classList.add("hidden");
    resultBox.classList.remove("hidden");

    finalScore.textContent = `You scored ${score} out of ${questions.length}`;

    if (score === questions.length) {
        finalMessage.textContent = "Outstanding! You have strong web fundamentals 💯";
    } else if (score >= 2) {
        finalMessage.textContent = "Good job! A little more practice will make you perfect 👍";
    } else {
        finalMessage.textContent = "Keep learning! Practice makes progress 💪";
    }
}

restartBtn.onclick = () => {
    index = 0;
    score = 0;
    quizBox.classList.remove("hidden");
    resultBox.classList.add("hidden");
    loadQuestion();
};

loadQuestion();