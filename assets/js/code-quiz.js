var welcomeEl = document.querySelector("#welcome");
var startQuizBtnEl = document.querySelector("#startQuiz");
var quizEl = document.querySelector("#quiz");
var questionEl = document.querySelector("#question");
var answersEl = document.querySelector("#answers");
var inputScoreEl = document.querySelector("#inputScore");
var initialsEl = document.querySelector("#initials");
var submitInitialsBtnEl = document.querySelector("#submitInitials");
var userScoreEl = document.querySelector("#score");
var highScoresEl = document.querySelector("#highScores");
var scoresEl = document.querySelector("#scores");
var goBackBtnEl = document.querySelector("#goBack");
var clearScoresBtnEl = document.querySelector("#clearScores");
var viewHScoresBtnEl = document.querySelector("#viewHScores");
var timerEl = document.querySelector("#timer");
var score = 0;
var currentQ = 0;
var highScores = [];
var interval;
var timeGiven = 60;
var secondsElapsed = 0;

//starts and updates timer
function startTimer() {
    timerEl.textContent = timeGiven;
    interval = setInterval(function () {
        secondsElapsed++;
        timerEl.textContent = timeGiven - secondsElapsed;
        if (secondsElapsed >= timeGiven) {
            currentQ = questions.length;
            nextQuestion();
        }
    }, 1000);
}

//stops timer
function stopTimer() {
    clearInterval(interval);
}

//Clears current question and calls for display of next question
//Calls for input score display if last question
function nextQuestion() {
    currentQ++;
    if (currentQ < questions.length) {
        renderQuestion();
    } else {
        stopTimer();
        if ((timeGiven - secondsElapsed) > 0)
            score += (timeGiven - secondsElapsed);
        userScoreEl.textContent = score;
        hide(quizEl);
        show(inputScoreEl);
        timerEl.textContent = 0;
    }
}

//checks answer based on current question and updates the user score
function checkAnswer(answer) {
    if (questions[currentQ].answer == questions[currentQ].choices[answer.id]) {
        score += 5;
        displayMessage("That's correct!");
    }
    else {
        secondsElapsed += 10;
        displayMessage("Nope!");
    }
}

//displays a message for 2 seconds
function displayMessage(m) {
    let messageHr = document.createElement("hr");
    let messageEl = document.createElement("div");
    messageEl.textContent = m;
    document.querySelector(".solution").appendChild(messageHr);
    document.querySelector(".solution").appendChild(messageEl);
    setTimeout(function () {
            messageHr.remove();
            messageEl.remove();
    }, 2000);

}

//hides element
function hide(element) {
    element.style.display = "none";
}

//displays element
function show(element) {
    element.style.display = "flex";
    element.style.flexDirection = "column";
}

//reset local variables
function reset() {
    score = 0;
    currentQ = 0;
    secondsElapsed = 0;
    timerEl.textContent = 0;
}

//Renders current question
function renderQuestion() {
    questionEl.textContent = questions[currentQ].title;
    for (i = 0; i < answersEl.children.length; i++) {
        answersEl.children[i].textContent = `${(i + 1)}: ${questions[currentQ].choices[i]}`;
    }
}

//Renders high scores stored in local storage
function renderHighScores() {
    // Clear content
    scoresEl.innerHTML = "";
    show(highScoresEl);
    highScores = JSON.parse(localStorage.getItem("scores"));
    for (let i = 0; i < highScores.length; i++) {
        let scoreItem = document.createElement("div");
        scoreItem.className += "scores";
        console.log(scoreItem)
        //scoreItem.setAttribute("style", "background-color:pink;");
        scoreItem.textContent = `${(i + 1)}. ${highScores[i].username} - ${highScores[i].userScore}`;
        scoresEl.appendChild(scoreItem);
    }
}

//displays high scores
viewHScoresBtnEl.addEventListener("click", function () {
    hide(welcomeEl);
    hide(quizEl);
    hide(inputScoreEl);
    renderHighScores();
    stopTimer();
    reset();
});

//starts quiz from  Welcome page
startQuizBtnEl.addEventListener("click", function () {
    hide(welcomeEl);
    startTimer();
    renderQuestion();
    show(quizEl);
});

//Calls to check answer selected and calls to next question if button is clicked
answersEl.addEventListener("click", function (e) {
    if (e.target.matches("button")) {
        checkAnswer(e.target);
        nextQuestion();
    }
});

//Creates a user score object to push to the local storage scores array calls to display high scores
//calls to render high scores
submitInitialsBtnEl.addEventListener("click", function () {
    let initValue = initialsEl.value.trim();
    if (initValue) {
        let userScore = { username: initValue, userScore: score };
        initialsEl.value = '';
        highScores = JSON.parse(localStorage.getItem("scores")) || [];
        highScores.push(userScore)
        localStorage.setItem("scores", JSON.stringify(highScores));
        hide(inputScoreEl);
        renderHighScores();
        reset();
    }
});

//Goes back to Welcome page from High scores 
goBackBtnEl.addEventListener("click", function () {
    hide(highScoresEl);
    show(welcomeEl);
});

//Clears saved scores from local storage
clearScoresBtnEl.addEventListener("click", function () {
    highScores = [];
    localStorage.setItem("scores", JSON.stringify(highScores));
    renderHighScores();
});





