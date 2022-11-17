// Variables

// Timer variables
var intro = document.querySelector("#intro");
var startButton = document.querySelector("#start-quiz");
var timer = document.querySelector("#timer");
var timeGiven = 60;
var timeElapsed = 0;
var interval;

// Quiz variables
var quiz = document.querySelector("#quiz");
var question = document.querySelector("#question");
var answers = document.querySelector("#answers");
var currentQuestion = 0;

// Score variables
var inputScore = document.querySelector("#input-score");
var initials = document.querySelector("#initials");
var submitInitialsButton = document.querySelector("#submit-initials");
var userScore = document.querySelector("#score");
var highScoresElement = document.querySelector("#high-scores");
var scores = document.querySelector("#scores");
var highScores = [];
var score = 0;

// End game variables
var goBackButton = document.querySelector("#go-back");
var clearScoresButton = document.querySelector("#clear-scores");
var viewScoresButton = document.querySelector("#view-scores");

// Functions & Event listeners

// Starts and updates the timer
function startTimer() {
    timer.textContent = timeGiven;
    interval = setInterval(function () {
        timeElapsed++;
        timer.textContent = timeGiven - timeElapsed;
        if (timeElapsed >= timeGiven) {
            currentQuestion = questions.length;
            nextQuestion();
        }
    }, 1000);
}

// Stops the timer
function stopTimer() {
    clearInterval(interval);
}

// Hides website module
function hide(element) {
    element.style.display = "none";
}

// Displays website module 
function show(element) {
    element.style.display = "flex";
    element.style.flexDirection = "column";
}

// Starts quiz from the intro
startButton.addEventListener("click", function () {
    hide(intro);
    startTimer();
    printQuestion();
    show(quiz);
});

// Loads the first or current question
function printQuestion() {
    question.textContent = questions[currentQuestion].question;
    for (i = 0; i < answers.children.length; i++) {
        answers.children[i].textContent = `${(i + 1)}: ${questions[currentQuestion].options[i]}`;
    }
}

// Loads the next question or, if it's the final question, the score input
function nextQuestion() {
    currentQuestion++;
    if (currentQuestion < questions.length) {
        printQuestion();
    } else {
        stopTimer();
        if ((timeGiven - timeElapsed) > 0)
            score += (timeGiven - timeElapsed);
        userScore.textContent = score;
        hide(quiz);
        show(inputScore);
        timer.textContent = 0;
    }
}

// Checks for the correct answer and updates the score if necessary
function checkAnswer(answer) {
    if (questions[currentQuestion].answer == questions[currentQuestion].options[answer.id]) {
        score += 5;
        displayMessage("CORRECT!");
    }
    else {
        timeElapsed += 10;
        displayMessage("NOPE!");
    }
}

// Checks the selected answer and prompts the next question if a button is clicked
answers.addEventListener("click", function (e) {
    if (e.target.matches("button")) {
        checkAnswer(e.target);
        nextQuestion();
    }
});

// Informs the user of a correct or incorrect response 
function displayMessage(m) {
    let messageHr = document.createElement("hr");
    let messageEl = document.createElement("div");
    messageEl.textContent = m;
    document.querySelector(".solution").appendChild(messageHr);
    document.querySelector(".solution").appendChild(messageEl);
    setTimeout(function () {
            messageHr.remove();
            messageEl.remove();
    }, 1000);

}

// Stores the high scores in local storage
function printHighScores() {
    scores.innerHTML = "";
    show(highScoresElement);
    highScores = JSON.parse(localStorage.getItem("scores"));
    for (let i = 0; i < highScores.length; i++) {
        let scoreItem = document.createElement("div");
        scoreItem.className += "scores";
        console.log(scoreItem)
        scoreItem.textContent = `${(i + 1)}. ${highScores[i].username} - ${highScores[i].userScore}`;
        scores.appendChild(scoreItem);
    }
}

// Shows the high scores
viewScoresButton.addEventListener("click", function () {
    hide(intro);
    hide(quiz);
    hide(inputScore);
    printHighScores();
    stopTimer();
    reset();
});

// Creates a user score to push to local storage, retrieves and displays high scores
submitInitialsButton.addEventListener("click", function () {
    let initValue = initials.value.trim();
    if (initValue) {
        let userScore = { username: initValue, userScore: score };
        initials.value = '';
        highScores = JSON.parse(localStorage.getItem("scores")) || [];
        highScores.push(userScore)
        localStorage.setItem("scores", JSON.stringify(highScores));
        hide(inputScore);
        printHighScores();
        reset();
    }
});

// Resets the quiz
function reset() {
    score = 0;
    currentQuestion = 0;
    timeElapsed = 0;
    timer.textContent = 0;
}

// Clears saved data from local storage
clearScoresButton.addEventListener("click", function () {
    highScores = [];
    localStorage.setItem("scores", JSON.stringify(highScores));
    printHighScores();
});

// Return to the intro page 
goBackButton.addEventListener("click", function () {
    hide(highScoresElement);
    show(intro);
});




