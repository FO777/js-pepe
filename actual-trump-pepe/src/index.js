import Game from "./game";

let canvas = document.getElementById("gameScreen");
let ctx = canvas.getContext("2d");
let image = document.getElementById("background");

const gamewidth = 950;
const gameheight = 800;

let game = new Game(gamewidth, gameheight);

let lastTime = 0;

function gameLoop(timestamp) {
  let dt = timestamp - lastTime;
  lastTime = timestamp;
  ctx.clearRect(0, 0, gamewidth, gameheight);
  ctx.drawImage(image, 0, 0, gamewidth, gameheight);
  game.draw(ctx);
  game.update(dt);

  requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);
