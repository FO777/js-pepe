export default class Player {
  constructor(game) {
    this.game = game;
    this.image = document.getElementById("pepe");
    this.size = 224;
    this.gamewidth = game.gamewidth;
    this.gameheight = game.gameheight;
    this.vel = 0;
    this.maxVel = 5;
    this.isJump = false;
    this.jumpCount = 10;
    this.position = {
      x: this.gamewidth / 2 - this.size / 2,
      y: this.gameheight - this.size
    };
    this.hitbox = {
      a: this.position.x,
      b: this.position.y,
      c: this.position.x + this.size,
      d: this.position.y + this.size
    };
  }
  left() {
    this.vel = -this.maxVel;
  }
  right() {
    this.vel = this.maxVel;
  }
  jump() {
    this.isJump = true;
    if (this.jumpCount >= -10) {
      this.neg = 1;
      if (this.jumpCount < 0) {
        this.neg = -1;
      }
      this.position.y -= this.jumpCount ** 2 * 0.5 * this.neg;
      this.jumpCount -= 1;
    } else {
      this.isJump = false;
      this.jumpCount = 10;
    }
  }
  stop() {
    this.vel = 0;
  }
  hit() {
    this.position.x -= 50;
    this.game.score.votes -= 1000;
  }
  draw(ctx) {
    ctx.drawImage(this.image, this.position.x, this.position.y);
  }
  update(dt) {
    if (!dt) return;
    this.position.x += this.vel;
    if (this.isJump) this.jump();
    this.hitbox = {
      a: this.position.x,
      b: this.position.y,
      c: this.position.x + this.size,
      d: this.position.y + this.size
    };
    if (this.position.x < 0) this.position.x = 0;
    if (this.position.x + this.size > this.gamewidth)
      this.position.x = this.gamewidth - this.size;
  }
}
