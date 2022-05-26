const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById("progressText");
const scoreText = document.getElementById('score');
const progressBar = document.getElementById("progressBarFull");
const loader = document.getElementById('loader');
const game = document.getElementById('game');

let currentQuestion = {};
let acceptingAnswer = false;
let score = 0;
let questionCounter = 0;
let availableQuestion = [];

let questions = [];
fetch(
  "https://opentdb.com/api.php?amount=10&category=9"
)
  .then((res) => {
    console.log(res);
    return res.json();
  })
  .then((loadedQuestions) => {
    console.log(loadedQuestions.results);
    questions = loadedQuestions.results.map( loadedQuestion =>{
      const formattedQuestion = {
        question : loadedQuestion.question
      };

      const answerChoices = [...loadedQuestion.incorrect_answers];
      formattedQuestion.answer = Math.floor(Math.random()*3)+1;
      answerChoices.splice(formattedQuestion.answer -1, 0, loadedQuestion.correct_answer);

      answerChoices.forEach((choice, index) => {
        formattedQuestion["choice" + (index+1)] = choice;
      })
      return formattedQuestion;
    });
    startGame();
  })
  .catch((err) => {
    console.error(err);
  });

const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 3;

function startGame(){
  questionCounter =0;
  score=0;
  availableQuestion = [...questions];
  getNewQuestion();
  game.classList.remove("hidden");
  loader.classList.add("hidden");
}


function getNewQuestion(){
  if(availableQuestion.length === 0 || questionCounter>=MAX_QUESTIONS){
    localStorage.setItem('mostRecentScore',score);
    return window.location.assign("/end.html");
  }
  questionCounter++;

  progressText.innerText = "Question "+ questionCounter + "/" + MAX_QUESTIONS;
  var per = (questionCounter*100)/MAX_QUESTIONS;
  if(per == 100){
    per = 99.6;
  }
  progressBar.style.width = per+'%';
  var questionInd = Math.floor(Math.random() * availableQuestion.length);
  currentQuestion = availableQuestion[questionInd];
  question.innerText = currentQuestion["question"];
  // currentQuestion.question;
  choices.forEach(function (choice) {
    const number = choice.dataset["num"];
    choice.innerText = currentQuestion["choice" + number];
  });
  availableQuestion.splice(questionInd,1);
  acceptingAnswer = true;
}

choices.forEach(function(choice){
  choice.addEventListener('click', function(e){
    if(!acceptingAnswer) return ;
    acceptingAnswer = false; 
    const userAns = e.target.dataset["num"];
    const classAp = userAns == currentQuestion.answer ? 'correct': 'incorrect';
    if(classAp == "correct"){
      increment(CORRECT_BONUS)
    }
    e.target.parentElement.classList.add(classAp);
    setTimeout(function(){
      e.target.parentElement.classList.remove(classAp);
      getNewQuestion();
    },500)
  })

})

function increment(num){
  score += num;
  scoreText.innerText = score;
}
























