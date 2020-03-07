export default class Missle {
  constructor(game, size, vel, image) {
    this.image = document.getElementById(image);
    this.player = game.player;
    this.position = {
      x: this.player.position.x + this.player.size / 2,
      y: this.player.position.y + this.player.size / 2
    };
    this.gamewidth = game.gamewidth;
    this.size = size;
    this.vel = vel;
    this.is = false;
    this.health = 1;
    this.hitbox = {
      a: this.position.x,
      b: this.position.y,
      c: this.position.x + this.size,
      d: this.position.y + this.size
    };
  }
  vis() {
    if (!this.is) this.is = true;
    this.position.x = this.player.position.x + this.player.size / 2;
    this.position.y = this.player.position.y + this.player.size / 2;
  }
  hit(enemy) {
    if (this.hitbox.c > enemy.hitbox.a && this.hitbox.b > enemy.hitbox.b) {
      this.is = false;
      enemy.hit(this);
    }
  }
  draw(ctx) {
    if (this.is)
      ctx.drawImage(
        this.image,
        this.position.x,
        this.position.y,
        this.size,
        this.size
      );
  }
  update(dt) {
    if (!this.is) return;
    this.position.x += this.vel;
    if (this.position.x > this.gamewidth) this.is = false;
    this.hitbox = {
      a: this.position.x,
      b: this.position.y,
      c: this.position.x + this.size,
      d: this.position.y + this.size
    };
  }
}
