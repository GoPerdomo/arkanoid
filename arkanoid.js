'use strict'

var canvas = document.getElementById("canvas");		// Gets the id of the canvas from the HTML

function Arkanoid(canvas) {		// Arkanoid Class Constructor
	this.canvas = canvas;
	this.context = canvas.getContext('2d');

	this.ball = new Ball([250, 250], 7);		// Creates a new instance of the Ball class
	this.ball.renderBall(this.context);

	this.paddle = new Paddle([100, this.canvas.clientHeight-20], 120, 15)
	this.paddle.renderPaddle(this.context);
};

Arkanoid.prototype.resetCanvas = function() {		// Fills the canvas with the background
	this.context.fillStyle = "#000000";
	this.context.fillRect(0, 0, this.canvas.clientWidth, this.canvas.clientHeight);
};

Arkanoid.prototype.checkCollisions = function(movement) {		// Checks for collision with the walls and moves the ball based on it
	// TODO: ADD DESCRIPTIONS

	if(this.ball.ballX < this.ball.radius || this.ball.ballX > canvas.clientWidth-this.ball.radius) {		// DESCRIPTION
		movement[0] = -movement[0];
		this.ball.moveBall(movement);
	} else {
		this.ball.moveBall(movement);
	};
	if(this.ball.ballY < this.ball.radius || this.ball.ballY > canvas.clientHeight-this.ball.radius) {		// DESCRIPTION
		movement[1] = -movement[1];
		this.ball.moveBall(movement);
	} else {
		this.ball.moveBall(movement);
	}
};

Arkanoid.prototype.play = function() {		// Sets an interval to call the functions that reset the canvas, render the ball and checks for its collisions and moves the paddle
	var movement = [2, 2];

	setInterval(function(){
		this.resetCanvas();
		this.ball.renderBall(this.context);
		this.paddle.renderPaddle(this.context);
		this.paddle.eventListeners();
		this.paddle.movePaddle(this.context);
		this.checkCollisions(movement);
	}.bind(this), 17);
};

var arkanoid = new Arkanoid(canvas);		// Creates a new instance of the Arkanoid class

arkanoid.resetCanvas();

