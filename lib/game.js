const Asteroid = require ('./asteroid');
const Bullet = require ('./bullet');
const Ship = require ('./ship');
const Util = require ('./util');

function Game(){
  this.asteroids = [];
  this.bullets = [];
  this.ships = [];

  this.addAsteroids();
};

Game.BG_COLOR = "black"
Game.DIM_X = 1000;
Game.DIM_Y = 600;
Game.FPS = 32;
Game.NUM_ASTEROIDS = 10;


Game.prototype.add = function (object) {
  if (object instanceof Asteroid) {
    this.asteroids.push(object);
  }
}

Game.prototype.addAsteroids = function () {
  for (var i = 0; i < Game.NUM_ASTEROIDS; i++){
    this.asteroids.push(new Asteroid({game: this}));
  }
};

Game.prototype.randomPosition = function () {
  let pos = [];
  pos.push(Math.random() * Game.DIM_X);
  pos.push(Math.random() * Game.DIM_Y);
  return pos;
};

Game.prototype.draw = function (ctx) {
  ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
  ctx.fillStyle = Game.BG_COLOR;
  ctx.fillRect(0,0, Game.DIM_X, Game.DIM_Y);

  this.allObjects().forEach((object) => {object.draw(ctx);});
};

Game.prototype.allObjects = function () {
  return [].concat(this.ships, this.asteroids, this.bullets);
};

Game.prototype.moveObjects = function () {
  this.allObjects().forEach(object => {object.move();});
};

Game.prototype.step = function (delta) {
  this.moveObjects(delta);
};

Game.prototype.wrap = function (pos) {
  return [
    Util.wrap(pos[0], Game.DIM_X), Util.wrap(pos[1], Game.DIM_Y)
  ];
};

Game.prototype.isOutOfBounds = function (pos) {
  return (pos[0] < 0) || (pos[1] < 0) ||
    (pos[0] > Game.DIM_X) || (pos[1] > Game.DIM_Y);
};

module.exports = Game;
