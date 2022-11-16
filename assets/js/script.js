// Variables

var startButton = document.querySelector("#start-button");
var timer = document.querySelector("#timer");
var timeGiven = 60;
var secondsElapsed = 0;
var questions = [];

var question = document.querySelector("#question");
var choices = document.querySelector("#choices");

// Starts timer

function startTimer() {
    timer.textContent = timeGiven;
    interval = setInterval(function () {
        secondsElapsed++;
        timer.textContent = timeGiven - secondsElapsed;
        if (secondsElapsed >= timeGiven) {
            currentQ = questions.length;
            nextQuestion();
        }
    }, 1000);
}

// Stops timer
function stopTimer() {
    clearInterval(interval);
}

startButton.addEventListener("click", startTimer);