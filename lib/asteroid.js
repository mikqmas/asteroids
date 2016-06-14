const Util = require("./util");
const MovingObject = require("./moving_object");

Asteroid.COLOR = "blue";
Asteroid.RADIUS = 20;
Asteroid.SPEED = 4;

function Asteroid(options){
  options.color = Asteroid.COLOR;
  options.pos = options.pos || options.game.randomPosition();
  options.radius = Asteroid.RADIUS;
  options.vel = options.vel || Util.randomVec(Asteroid.SPEED);
  MovingObject.call(this, options);
}

Util.inherits(Asteroid, MovingObject);

module.exports = Asteroid;
