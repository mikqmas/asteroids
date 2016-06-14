/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	const Game = __webpack_require__(1);
	const GameView = __webpack_require__(7);
	
	document.addEventListener("DOMContentLoaded", function(){
	  const canvasEl = document.getElementsByTagName("canvas")[0];
	  canvasEl.width = Game.DIM_X;
	  canvasEl.height = Game.DIM_Y;
	
	  const ctx = canvasEl.getContext("2d");
	  const game = new Game();
	  new GameView(game, ctx).start();
	});


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	const Asteroid = __webpack_require__ (2);
	const Bullet = __webpack_require__ (5);
	const Ship = __webpack_require__ (6);
	const Util = __webpack_require__ (3);
	
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


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	const Util = __webpack_require__(3);
	const MovingObject = __webpack_require__(4);
	
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


/***/ },
/* 3 */
/***/ function(module, exports) {

	const Util = {
	  inherits(child, parent) {
	    function Surrogate() {};
	    Surrogate.prototype = parent.prototype;
	    child.prototype = new Surrogate();
	    // child.prototype.constructor = child;
	  },
	  randomVec(length) {
	    var deg = 2 * Math.PI * Math.random();
	    return Util.scale([Math.sin(deg), Math.cos(deg)], length);
	  },
	  scale (vec, m) {
	    return [vec[0] * m, vec[1] * m];
	  },
	  wrap (coord, max) {
	    if (coord < 0) {
	      return max - (coord % max);
	    } else if (coord > max) {
	      return coord % max;
	    } else {
	      return coord;
	    }
	  }
	
	}
	
	
	module.exports = Util;


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	const Util = __webpack_require__(3);
	
	
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


/***/ },
/* 5 */
/***/ function(module, exports) {



/***/ },
/* 6 */
/***/ function(module, exports) {



/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__ (4);
	__webpack_require__ (1);
	
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


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map