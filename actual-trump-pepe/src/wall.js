export default class Wall {
  constructor(game) {
    this.image = document.getElementById("wall");
    this.game = game;
    this.position = {
      x: 0,
      y: this.game.gameheight - 396
    };
    this.width = 224;
    this.height = 396;
    this.hitbox = {
      a: this.position.x,
      b: this.position.y,
      c: this.width,
      d: this.height
    };
    this.health = 10;
  }
  draw(ctx) {
    ctx.fillStyle = "#8B0000";
    ctx.fillRect(this.hitbox.a + 20, this.hitbox.b - 20, this.width - 20, 10);
    ctx.fillStyle = "#1E90FF";
    ctx.fillRect(
      this.hitbox.a + 20,
      this.hitbox.b - 20,
      (this.width / 10) * this.health - 20,
      10
    );
    ctx.drawImage(
      this.image,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
  }
  hit(enemy) {
    this.health--;
    this.game.score.votes -= 10;
    enemy.visible = false;
  }
}
