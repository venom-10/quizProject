const username = document.getElementById("username");
const saveScore = document.getElementById("saveScoreBtn");
const finalScore = document.getElementById("finalScore");
const mostRecentScore = localStorage.getItem('mostRecentScore');
const max_high_score = 5;
const highScores = JSON.parse(localStorage.getItem('highScores')) || [];
finalScore.innerText = mostRecentScore;
username.addEventListener("keyup", () =>{
  saveScore.disabled = !username.value;
})

saveHighScore =(e) =>{
  e.preventDefault();
  const score ={
    score: mostRecentScore, 
    name: username.value
  };
  highScores.push(score);
  highScores.sort( (a,b) =>b.score - a.score);
  highScores.splice(max_high_score);
  localStorage.setItem('highScores', JSON.stringify(highScores));
  window.location.assign('/');
};