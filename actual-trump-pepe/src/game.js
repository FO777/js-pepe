import Player from "./player";
import Wall from "./wall";
import Enemy from "./enemy";
import Score from "./score";
import InputHandler from "./inputs";
import Highscore from "./highscore";

const GAMESTATE = {
  PAUSED: 0,
  RUNNING: 1,
  MENU: 2,
  GAMEOVER: 3,
  NEW: 4
};

export default class Game {
  constructor(gamewidth, gameheight) {
    this.gamestate = GAMESTATE.MENU;
    this.gamewidth = gamewidth;
    this.gameheight = gameheight;
    this.player = new Player(this);
    this.wall = new Wall(this);
    this.enemy = ["cnn", "mexican", "democrat", "mexicanj"];
    this.enemys = [];
    this.score = new Score();
    this.missleloop = 0;
    this.okloop = 0;
    this.trumploop = 0;
    this.fullloop = 0;
    this.missles = [];
    this.oks = [];
    this.trumps = [];
    new InputHandler(this);
    this.full = [];
    this.gameObjects = [];
    this.bullets = [];
  }
  start() {
    if (this.gamestate !== GAMESTATE.MENU && this.gamestate !== GAMESTATE.NEW)
      return;
    this.gamestate = GAMESTATE.RUNNING;
    Highscore(this.score);
    this.highscore = localStorage.getItem("highscore");
  }
  draw(ctx) {
    if (this.gamestate === GAMESTATE.MENU) {
      ctx.rect(0, 0, this.gamewidth, this.gameheight);
      ctx.fillStyle = "rgba(0,0,0,1)";
      ctx.fill();
      ctx.font = "30px Arial";
      ctx.fillStyle = "white";
      ctx.textAlign = "center";
      ctx.fillText("Press w to start", this.gamewidth / 2, this.gameheight / 2);
    }
    if (this.gamestate === GAMESTATE.PAUSED) {
      ctx.rect(0, 0, this.gamewidth, this.gameheight);
      ctx.fillStyle = "rgba(0,0,0,.5)";
      ctx.fill();
      ctx.font = "30px Arial";
      ctx.fillStyle = "white";
      ctx.textAlign = "center";
      ctx.fillText("Paused", this.gamewidth / 2, this.gameheight / 2);
    }
    if (this.gamestate === GAMESTATE.GAMEOVER) {
      ctx.rect(0, 0, this.gamewidth, this.gameheight);
      ctx.fillStyle = "rgba(0,0,0,1)";
      ctx.fill();
      ctx.font = "24px Arial";
      ctx.fillStyle = "white";
      ctx.textAlign = "center";
      ctx.fillText(
        "GAME OVER, refresh page to restart, YOUR SCORE: " +
          this.score.votes +
          " HIGHSCORE: " +
          this.highscore,
        this.gamewidth / 2,
        this.gameheight / 2
      );
    }
    if (this.gamestate === GAMESTATE.RUNNING) {
      if (this.enemys.length === 0) {
        for (let i = 1; i <= this.score.votes / 10000 + 1; i++) {
          this.enemys.push(
            new Enemy(this, 224, 2, this.enemy[Math.floor(Math.random() * 4)])
          );
        }
      }
      this.gameObjects = [
        this.score,
        this.wall,
        this.player,
        ...this.enemys,
        ...this.missles,
        ...this.oks,
        ...this.trumps,
        ...this.full
      ];
      this.gameObjects.forEach(object => object.draw(ctx));
    }
  }
  update(dt) {
    if (this.wall.health === 0) this.gamestate = GAMESTATE.GAMEOVER;
    if (this.score.votes < 0) this.gamestate = GAMESTATE.GAMEOVER;
    if (this.gamestate === GAMESTATE.GAMEOVER) {
      Highscore(this.score);
    }
    if (
      this.gamestate === GAMESTATE.PAUSED ||
      this.gamestate === GAMESTATE.MENU ||
      this.gamestate === GAMESTATE.GAMEOVER
    )
      return;
    this.gameObjects = [
      this.player,
      ...this.enemys,
      ...this.missles,
      ...this.oks,
      ...this.trumps,
      ...this.full
    ];
    this.bullets = [...this.missles, ...this.oks, ...this.trumps, ...this.full];
    this.gameObjects.forEach(object => object.update(dt));
    this.bullets = this.bullets.filter(bullet => !bullet.is);
    this.enemys = this.enemys.filter(enemy => enemy.visible);
    if (this.trumploop > 0) {
      if (!this.trumps[0].is) this.trumploop = 0;
    }
    if (this.okloop > 0) {
      if (!this.oks[0].is) this.okloop = 0;
    }
    if (this.missleloop > 0) {
      if (!this.missles[0].is) this.missleloop = 0;
    }
    if (this.fullloop > 0) {
      if (!this.full[0].is) this.fullloop = 0;
    }
  }
  togglePause() {
    if (this.gamestate === GAMESTATE.PAUSED) {
      this.gamestate = GAMESTATE.RUNNING;
    } else {
      this.gamestate = GAMESTATE.PAUSED;
    }
  }
}
