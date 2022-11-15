// General variables

var question = document.querySelector('#question');
var choices = document.querySelector('#choices');
var timerText = document.querySelector('#timer');
var scoreText = document.querySelector ('#score');

var currentQuestion = {};
var acceptingAnswers = true;
var score = 0;
var questionCounter = 0;
var availableQuestions = [];

var maxQuestions = 5;
var scorePoints = -10;

var startButton = document.querySelector(".start-button");

// Functions

function startgame () {
    questionCounter = 0;
    score = 60;
    availableQuestions = [...questions];
    getNewQuestion();
}

function getNewQuestion () {
    if(availableQuestions.length === 0 || questionCounter > maxQuestions) {
        localStorage.setItem('mostRecentScore', score);
        return window.location.assign('end.html');
    }

    var questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex];
    question.innerText = currentQuestion.question;
    
    choices.forEach(choice => {
        var number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number];
    })
    availableQuestions.splice(questionsIndex, 1);
    acceptingAnswers = true;
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return;
        acceptingAnswers = false;
        var selectedChoice = e.target;
        var selectedAnswer = selectedChoice.dataset['number'];
        var classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';

        if(classToApply === 'incorrect')
        incrementScore(scorePoints);

        selectedChoice.parentElement.classList.add(classToApply);

        setTimeout (() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();
            }, 1000)
    })
})

incrementScore = num => {
    score +=num;
    scoreText.innerText = score;
}

startGame();