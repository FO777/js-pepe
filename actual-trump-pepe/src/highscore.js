export default function Highscore(score) {
  if (!localStorage.getItem("highscore")) {
    localStorage.setItem("highscore", JSON.stringify(score.votes));
  }
  if (score.votes > localStorage.getItem("highscore")) {
    localStorage.setItem("highscore", JSON.stringify(score.votes));
  }
}
