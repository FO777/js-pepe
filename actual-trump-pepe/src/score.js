export default class Score {
  constructor(game) {
    this.game = game;
    this.votes = 0;
    // show score with draw and update.
  }
  draw(ctx) {
    ctx.font = "30px Arial";
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.fillText("Votes: " + this.votes, 750, 30);
  }
  update(dt) {
    //
  }
}
