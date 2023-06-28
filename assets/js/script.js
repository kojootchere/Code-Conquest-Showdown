// Array to hold quiz questions, choices, and the correct answer.
// Each question is an object with three properties: title, choices (an array), and answer.
var questions = [
  {
    title: "Which HTML tag is used to define a hyperlink?",
    choices: ["href", "link", "a", "url"],
    answer: "a"
  },
  {
    title: "How do you select an element with id 'example' in CSS?",
    choices: [".example", "#example", "example", "$example"],
    answer: "#example"
  },
  {
    title: "What does HTML stand for?",
    choices: ["Hyper Text Markup Language", "High Text Markup Language", "Hyperlinks and Text Markup Language", "Home Tool Markup Language"],
    answer: "Hyper Text Markup Language"
  },
  {
    title: "Which organization defines the Web standards?",
    choices: ["Mozilla", "Microsoft", "W3C", "Google"],
    answer: "W3C"
  },
  {
    title: "Which of the following JavaScript data types is not primitive?",
    choices: ["String", "Number", "Boolean", "Object"],
    answer: "Object"
  },
  {
    title: "What is the correct way to declare a JavaScript variable?",
    choices: ["variable example;", "var example;", "v example;", "variable: example;"],
    answer: "var example;"
  },
  {
    title: "What does JSON stand for?",
    choices: ["JavaScript Object Notation", "JavaScript Optimal Network", "JavaScript Optional Notation", "Java Standard Object Notation"],
    answer: "JavaScript Object Notation"
  },
  {
    title: "Inside which HTML element do we put the CSS?",
    choices: ["style", "css", "stylesheet", "script"],
    answer: "style"
  },
  {
    title: "What does CSS stand for?",
    choices: ["Cascading Style System", "Cascading Style Sheet", "Common Style Sheet", "Computed Style Sheet"],
    answer: "Cascading Style Sheet"
  },
  {
    title: "What does DOM stand for in JavaScript?",
    choices: ["Data Object Model", "Document Object Model", "Digital Object Model", "Display Object Management"],
    answer: "Document Object Model"
  },
  {
    title: "How to define a keyframe in CSS?",
    choices: ["@keyframes", "@frames", "@animate", "@motion"],
    answer: "@keyframes"
  },
  {
    title: "Which HTML attribute is used to specify the source URL for an image?",
    choices: ["url", "src", "href", "alt"],
    answer: "src"
  },
  {
    title: "Which HTML element is used for the root element of an HTML document?",
    choices: ["root", "html", "head", "body"],
    answer: "html"
  },
  {
    title: "What does API stand for?",
    choices: ["Application Programming Interface", "Applicable Programming Interface", "Advanced Programming Interface", "Applicable Program Input"],
    answer: "Application Programming Interface"
  },
  {
    title: "Which CSS property sets the text color of an element?",
    choices: ["font-color", "text-color", "color", "text-style"],
    answer: "color"
  },
  {
    title: "How do you write 'Hello World' in an alert box in JavaScript?",
    choices: ["alertBox('Hello World');", "msgAlert('Hello World');", "alert('Hello World');", "msg('Hello World');"],
    answer: "alert('Hello World');"
  },
  {
    title: "Which JavaScript method is used to output data to the console?",
    choices: ["console.log()", "console()", "log.console()", "console=>log()"],
    answer: "console.log()"
  },
  {
    title: "Which HTML tag is used to define a list item?",
    choices: ["li", "item", "list", "ul"],
    answer: "li"
  }
];

// Score starts at 0.
var score = 0;

// Keep track of which question the user is currently on. Start before the first one.
var currentQuestion = -1;

// Set the time for the quiz. This will count down.
var timeLeft = 0;

// The timer that will count down. This will be set using setInterval when the quiz starts.
var timer;

// Function to start the quiz. This sets up the time and the timer and starts the questions.
function startQuiz() {
  timeLeft = 90;
  document.getElementById("time-remaining").innerHTML = timeLeft;

  timer = setInterval(function () {
    timeLeft--;
    document.getElementById("time-remaining").innerHTML = timeLeft;
    if (timeLeft <= 0) {
      clearInterval(timer);
      endQuiz();
    }
  }, 1000);

  nextQuestion();
}

// Function to end the quiz. This clears the timer and displays the final results.
function endQuiz() {
  clearInterval(timer);

  var quizContent = `
  <h2>Game over!</h2>
  <h3>You scored a ` + score + ` /100!</h3>
  <input type="text" id="name" placeholder="Initials"> 
  <button onclick="storeScore()">Save Score</button>`;

  document.getElementById("quiz-body").innerHTML = quizContent;
}

// Function to store the score. This stores the score and initials in local storage.
function storeScore() {

  var names = JSON.parse(localStorage.getItem("highscoreName")) || [];
  var scores = JSON.parse(localStorage.getItem("highscore")) || [];

  names.push(document.getElementById('name').value);
  scores.push(score);

  localStorage.setItem("highscore", JSON.stringify(scores));
  localStorage.setItem("highscoreName", JSON.stringify(names));
  viewHighscores();
}


// Function to get the highscore. This retrieves and displays the high scores from local storage.
function viewHighscores() {
  var names = JSON.parse(localStorage.getItem("highscoreName"));
  var scores = JSON.parse(localStorage.getItem("highscore"));
  var nameElement = '', scoreElement = '';
  names.forEach((name, index) => {
    nameElement += `<p>${name}</p>`;
    scoreElement += `<p>${scores[index]}</p>`
  });
  var quizContent = `  
  <div class="row">
    <div class="column">
      <h2>Names</h2>
      ${nameElement}
    </div>
    <div class="column">
      <h2>Score</h2>
      ${scoreElement}
    </div>
  </div>
  <button onclick="clearScore()">Clear Score!</button><button onclick="resetQuiz()">Play Again!</button>`;

  document.getElementById("quiz-body").innerHTML = quizContent;
}

// Function to clear the highscore. This clears out the high scores in local storage.
function clearScore() {
  localStorage.setItem("highscore", "[]");
  localStorage.setItem("highscoreName", "[]");

  resetQuiz();
}

// Function to reset the game. This resets all the fields to their original state and shows the start screen.
function resetQuiz() {
  clearInterval(timer);
  score = 0;
  currentQuestion = -1;
  timeLeft = 0;
  timer = null;

  document.getElementById("time-remaining").innerHTML = timeLeft;

  var quizContent = `
  <h1>
  Quiz Code Challenge!
  </h1>
  <h3>
  Try to answer the following code-related questions within the time limit. Keep in mind that incorrect answers will penalize your scoretime by ten seconds!   
  </h3>
  <button onclick="startQuiz()">Start</button>`;

  document.getElementById("quiz-body").innerHTML = quizContent;
}

// Function to handle incorrect answers. This reduces the remaining time and moves on to the next question.
function incorrectAnswer() {
  if ((timeLeft - 7) <= 0) {
    timeLeft = 1;
  } else {
    timeLeft -= 7;
  }

  nextQuestion();
}

// Function to handle correct answers. This increases the score and moves on to the next question.
function correctAnswer() {
  score += 10;
  nextQuestion();
}

// Function to load next question. This shows the next question or ends the quiz if there are no more questions.
function nextQuestion() {
  currentQuestion++;

  if (currentQuestion > questions.length - 1) {
    endQuiz();
    return;
  }

  var quizContent = "<h2>" + questions[currentQuestion].title + "</h2>"

  for (var buttonLoop = 0; buttonLoop < questions[currentQuestion].choices.length; buttonLoop++) {
    var buttonCode = "<button onclick=\"[ANSWER]\">[CHOICE]</button>";
    buttonCode = buttonCode.replace("[CHOICE]", questions[currentQuestion].choices[buttonLoop]);
    if (questions[currentQuestion].choices[buttonLoop] == questions[currentQuestion].answer) {
      buttonCode = buttonCode.replace("[ANSWER]", "correctAnswer()");
    } else {
      buttonCode = buttonCode.replace("[ANSWER]", "incorrectAnswer()");
    }
    quizContent += buttonCode;
  }

  document.getElementById("quiz-body").innerHTML = quizContent;
}
