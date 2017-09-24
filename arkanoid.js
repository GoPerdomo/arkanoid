'use strict'

var canvas = document.getElementById("canvas");		// Gets the id of the canvas from the HTML

function Arkanoid(canvas) {		// Arkanoid Class Constructor
	this.canvas = canvas;
	this.context = canvas.getContext('2d');

	this.ball = new Ball([250, 250], 7);		// Creates a new instance of the Ball class
	this.ball.renderBall(this.context);

	this.paddle = new Paddle([this.canvas.clientWidth/2-60, this.canvas.clientHeight-20], 120, 15)
	this.paddle.renderPaddle(this.context);

	this.bricks = [];
	Brick.prototype.createBricks(this.bricks, this.context);
};

Arkanoid.prototype.resetCanvas = function() {		// Fills the canvas with the background
	this.context.fillStyle = "#000000";
	this.context.fillRect(0, 0, this.canvas.clientWidth, this.canvas.clientHeight);
};


Arkanoid.prototype.play = function() {		// Sets an interval to call the functions that reset the canvas, render the ball and checks for its collisions and moves the paddle
	setInterval(function(){
		this.resetCanvas();
		this.ball.renderBall(this.context);
		this.paddle.renderPaddle(this.context);
		for(var brick in this.bricks) {
			this.bricks[brick].renderBrick(this.context);
		}
		this.paddle.eventListeners();
		this.paddle.movePaddle(this.context);
		this.ball.moveBall(this.paddle, this.bricks);
	}.bind(this), 17);
};

var arkanoid = new Arkanoid(canvas);		// Creates a new instance of the Arkanoid class

arkanoid.resetCanvas();

