require ('./moving_object');
require ('./game');

module.exports = GameView;

function GameView(game, ctx){
  this.ctx = ctx;
  this.game = game;
}

GAME_INTERVAL = 1000/60;
GameView.prototype.start = function () {
  this.lastTime = 0;
  requestAnimationFrame(this.animate.bind(this));
};

GameView.prototype.animate = function (time) {
  const timeDelta = time - this.lastTime;

  this.game.step(timeDelta);
  this.game.draw(this.ctx);
  this.lastTime = time;

  requestAnimationFrame(this.animate.bind(this));
};

module.exports = GameView;
