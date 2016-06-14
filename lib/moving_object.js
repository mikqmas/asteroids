const Util = require('./util');


function MovingObject(options){
  this.pos = options.pos;
  this.vel = options.vel;
  this.radius = options.radius;
  this.color = options.color;
  this.game = options.game;
}

MovingObject.prototype.draw = function (ctx) {
  ctx.beginPath();
  ctx.arc(this.pos[0], this.pos[1], this.radius, 0, Math.PI*2);
  ctx.fillStyle = this.color;
  ctx.fill();
  ctx.closePath();
};


MovingObject.prototype.move = function (timeDelta) {
    offsetX = this.vel[0]
    offsetY = this.vel[1]


  this.pos = [this.pos[0] + offsetX, this.pos[1] + offsetY];

  if(this.game.isOutOfBounds(this.pos)){
    this.pos = this.game.wrap(this.pos);
  }
};

module.exports = MovingObject;
