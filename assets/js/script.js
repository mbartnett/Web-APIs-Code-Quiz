// General variables
var question = document.querySelector('#question');
var options = document.querySelector('#options');
var timerText = document.querySelector('#timer');

var startButton = document.querySelector(".start-button");
var startTime = 60;
var question = 0;

// Function to start the timer

function startTimer() {
    remainingTimeEl.textContent = timeRemaining;
    interval = setInterval(function () {
        timeRemaining--;
        remainingTimeEl.textContent = timeRemaining;

        if (timeRemaining === 0){
            clearInterval(interval);
            cardEl.textContent = "Time is up!"
        }
    }, 1000)
}
startTimer ()

// Function to stop the timer

function stopTimer(){
    clearInterval(interval)
}

// An array of objects containing the number of the quesiton, the quesiton, the possible solutions and the answers.

let questions = [
    {
        number: 1,
        question: "Commonly used data types DO NOT include",
        options: [
            "1. strings",
            "2. booleans",
            "3. alerts",
            "4. numbers"
        ],
        answer: "3. alerts"
    },
    {
        number: 2,
        question: "The condition in an if / else statement is enclosed with _______.",
        options: [
            "1. quotes",
            "2. curly brackets",
            "3. parenthesis",
            "4. square brackets"
        ],
        answer: "3. parenthesis",
},  
{
    number: 3,
    question: "Arrays in Javascript can be used to store _______.",
    options: [
        "1. numbers and strings",
        "2. other arrays",
        "3. booleans",
        "4. all of the above"
        ],
    answer: "4. all of the above"
    },
    {
    number: 4,
    question: "String values must be enclosed within _______ when being assigned to variables.",
    options: [
        "1. commas",
        "2. curly brackets",
        "3. quotes",
        "4. parenthesis",
        ],
    answer: "3. quotes"
    }, 
    {
    number: 5,
    question: "A very useful tool used during development and debugging is:",
    options: [
        "1. Javascript",
        "2. terminal/bash", 
        "3. for loops",
        "4. console log",
        ],
    answer: "4. console log"
    }
]