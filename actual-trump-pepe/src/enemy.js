export default class Enemy {
  constructor(game, size, vel, image) {
    this.size = size;
    this.game = game;
    this.image = document.getElementById(image);
    if (image === "mexicanj") {
      this.position = {
        x: this.game.gamewidth,
        y: this.game.gameheight - this.size * 2
      };
    } else {
      this.position = {
        x: this.game.gamewidth,
        y: this.game.gameheight - this.size
      };
    }
    this.vel = vel;
    this.extra = image;
    this.health = 10;
    this.visible = true;
    this.hitbox = {
      a: this.position.x,
      b: this.position.y,
      c: this.position.x + this.size,
      d: this.position.y + this.size
    };
    this.player = this.game.player;
    this.wall = this.game.wall;
  }
  draw(ctx) {
    if (this.visible) {
      ctx.drawImage(
        this.image,
        this.position.x,
        this.position.y,
        this.size,
        this.size
      );
      ctx.fillStyle = "#8B0000";
      ctx.fillRect(this.hitbox.a, this.hitbox.b - 20, this.size, 10);
      ctx.fillStyle = "#1E90FF";
      ctx.fillRect(
        this.hitbox.a,
        this.hitbox.b - 20,
        (this.size / 10) * this.health,
        10
      );
    }
  }
  update(dt) {
    if (!dt) return;
    if (this.position.x < this.player.hitbox.c) this.player.hit();
    if (this.extra === "mexican" || this.extra === "mexicanj") {
      this.game.missles.forEach(object => object.hit(this));
      this.game.full.forEach(object => object.hit(this));
    }
    if (this.extra === "cnn") this.game.oks.forEach(object => object.hit(this));
    if (this.extra === "democrat")
      this.game.trumps.forEach(object => object.hit(this));
    if (this.position.x < this.wall.hitbox.c) this.wall.hit(this);
    this.position.x -= this.vel;
    this.hitbox.a = this.position.x;
    this.hitbox.b = this.position.y;
    this.hitbox.c = this.position.x + this.size;
    this.hitbox.d = this.position.y + this.size;
  }
  hit(missle) {
    this.game.bullets = this.game.bullets.filter(bullet => !bullet.is);
    if (this.health > 0) {
      this.health = this.health - missle.health;
      missle.health = 0;
      this.game.score.votes++;
    } else this.visible = false;
  }
}
