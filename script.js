let currentQuestion = 0;
let score = 0;
let questions = [];

// Fetch questions from the database
function loadQuestions() {
    fetch("fetch_questions.php")
        .then(response => response.json())
        .then(data => {
            questions = data;
            showQuestion();
        })
        .catch(error => console.error('Error fetching questions:', error));
}

function showQuestion() {
    if (currentQuestion >= questions.length) {
        document.getElementById("quiz").innerHTML = `
            <h2>You scored ${score} out of ${questions.length}!</h2>
        `;
        document.getElementById("next").style.display = "none";
        return;
    }

    const q = questions[currentQuestion];
    document.getElementById("quiz").innerHTML = `
        <h2>${q.question}</h2>
        <ul>
            <li><button onclick="checkAnswer(1)">${q.option1}</button></li>
            <li><button onclick="checkAnswer(2)">${q.option2}</button></li>
            <li><button onclick="checkAnswer(3)">${q.option3}</button></li>
            <li><button onclick="checkAnswer(4)">${q.option4}</button></li>
        </ul>
    `;
}

function checkAnswer(option) {
    const correct = questions[currentQuestion].correct_option;
    if (option == correct) score++;
    currentQuestion++;
    showQuestion();
}

function nextQuestion() {
    currentQuestion++;
    showQuestion();
}

// Load questions when the page loads
window.onload = loadQuestions;
