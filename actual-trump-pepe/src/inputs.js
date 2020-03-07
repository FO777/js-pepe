import Missle from "./missle";

export default class InputHandler {
  constructor(game) {
    document.addEventListener("keydown", event => {
      switch (event.keyCode) {
        case 37:
          game.player.left();
          break;
        case 39:
          game.player.right();
          break;
        case 38:
          game.player.isJump = true;
          break;
        case 88: {
          if (game.trumploop < 2) {
            game.trumps.push(new Missle(game, 32, 20, "trump"));
            game.trumps[game.trumploop].vis();
            game.trumploop++;
          }
          break;
        }
        case 67: {
          if (game.okloop < 3) {
            game.oks.push(new Missle(game, 64, 10, "ok"));
            game.oks[game.okloop].vis();
            game.okloop++;
          }
          break;
        }
        case 86: {
          if (game.missleloop < 9) {
            game.missles.push(new Missle(game, 32, 50, "missle"));
            game.missles[game.missleloop].vis();
            game.missleloop++;
          }
          break;
        }
        case 32: {
          if (game.fullloop < 1 && game.player.isJump) {
            for (game.fullloop; game.fullloop < 10; game.fullloop++)
              game.full.push(new Missle(game, 32, 50, "missle"));
            game.full.forEach(object => object.vis());
            game.fullloop = 1;
          }
          break;
        }
        case 27:
          game.togglePause();
          break;
        case 87:
          game.start();
          break;
      }
    });
    document.addEventListener("keyup", event => {
      switch (event.keyCode) {
        case 37:
          if (game.player.vel < 0) game.player.stop();
          break;
        case 39:
          if (game.player.vel > 0) game.player.stop();
          break;
      }
    });
  }
}
