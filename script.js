const questions = [
    {
        question: "Which is the largest animal in the world?",
        answers: [
            {
                text: "Shark",
                correct: false
            },
            {
                text: "Blue whale",
                correct: true
            },
            {
                text: "Elephant",
                correct: false
            },
            {
                text: "Giraffe",
                correct: false
            },
        ]
    },
    {
        question: "Which is the smallest country in the world?",
        answers: [
            {
                text: "Vatican City",
                correct: true
            },
            {
                text: "Bhutan",
                correct: false
            },
            {
                text: "Nepal",
                correct: false
            },
            {
                text: "Sri Lanka",
                correct: false
            },
        ]
    },
    {
        question: "Which is the alrgest desert in the world?",
        answers: [
            {
                text: "Kalahari",
                correct: false
            },
            {
                text: "Gobi",
                correct: false
            },
            {
                text: "Sahara",
                correct: true
            },
            {
                text: "Thar",
                correct: false
            },
        ]
    },
    {
        question: "Which is the smallest continent in the world?",
        answers: [
            {
                text: "Asia",
                correct: false
            },
            {
                text: "Australia",
                correct: true
            },
            {
                text: "Arctic",
                correct: false
            },
            {
                text: "Africa",
                correct: false
            },
        ]
    }
];

const question = document.querySelector("#question");
const answerButtons = document.querySelector("#answer-buttons");
const nextButton = document.querySelector("#next-button");
const timer = document.querySelector("#timer");

// console.log(questions);
// console.log(question);
// console.log(answerButtons);
// console.log(nextButton);


// My steps for solving this problem.

/*
    1. So, first when a user loads the website, then open the question one by default
        logic: load the first question always on the load of the website
    
    2. Now, the user selects the answer, and if the answer is correct, change the background color of the answer button to be green or else change it to red and change the background of the color of the real answer button to be green and show the next button.
        logic: On the click of the button, check if that button is the right answer and if yes then change the background color of the button to be green and if not then change the same to red else change the background color to be red and make the background color of the real answer button to be green and show the next button.
        
        Note: after selecting any button, the user cannot select anymore button.
        Logic: So, the buttons are to be disabled once the button is clicked. 

    3. On clicking the next button, load the next question.

    4. And if all the questions are over, then show the result by saying You scored this out of total questions. And the next button's text should be Play again.

    5. Once the user clicks play again, then again, the game should load the first question.


*/

let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 20;
let intervalId = null;
let isNextPage = false;

const startQuiz = () => {
    currentQuestionIndex = 0;
    score = 0;
    timer.style.display = "block"
    showQuestion();
}

const showQuestion = () => {
    resetPreviousQuestion();
    showTimer();
    let currentQuestion = questions[currentQuestionIndex].question;
    let questionNumber = currentQuestionIndex + 1;

    question.innerHTML = `${questionNumber}. ${currentQuestion}`;

    questions[currentQuestionIndex].answers.forEach((answer) => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("button");
        answerButtons.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    })

}


const resetPreviousQuestion = () => {
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

const showTimer = (isClicked) => {
    if ((isClicked && intervalId !== null)) {
        clearInterval(intervalId);
        intervalId = null;
        console.log("Timer stopped by user");
        return;
    } else if (isNextPage) {
        clearInterval(intervalId);
        intervalId = null;
        console.log(isNextPage);
        timeLeft = 20;
        timer.innerHTML = timeLeft < 10 ? `00:0${timeLeft}` : `00:${timeLeft}`
        timer.style.color = timeLeft < 10 ? "red" : "black";
    }

    // Start countdown
    intervalId = setInterval(() => {
        if (timeLeft < 0) {
            clearInterval(intervalId);
            intervalId = null;
            console.log("Time's up");
            showTimeUpMessage();
        } else {
            timer.innerHTML = timeLeft < 10 ? `00:0${timeLeft}` : `00:${timeLeft}`;
            timeLeft--;
            timer.style.color = timeLeft < 10 ? "red" : "black";
        }
    }, 1000)
}


const selectAnswer = (event) => {
    console.log("I am clicked");
    const selectedButton = event.target;
    selectedButton.dataset.isClicked = true;
    showTimer(selectedButton.dataset.isClicked);
    // console.log(selectedButton);
    const isCorrect = selectedButton.dataset.correct === "true";

    if (isCorrect) {
        selectedButton.classList.add("correct");
        score++;
    } else {
        selectedButton.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach((button) => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
})

const handleNextButton = () => {
    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
        isNextPage = true;
        showQuestion();
    } else {
        showScore();
    }
}

const showTimeUpMessage = () => {
    showScore();
    question.innerHTML = `Oops! You ran out of time.
    You scored ${score} out of ${questions.length}`;
}

const showScore = () => {
    resetPreviousQuestion();
    timer.style.display = "none";
    question.innerHTML = `You scored ${score} out of ${questions.length}`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
    console.log(currentQuestionIndex);
}

startQuiz();



