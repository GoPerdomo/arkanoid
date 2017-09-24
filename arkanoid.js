'use strict'

var canvas = document.getElementById("canvas");		// Gets the id of the canvas from the HTML

function Arkanoid(canvas) {		// Arkanoid Class Constructor
	this.canvas = canvas;
	this.context = canvas.getContext('2d');

	this.ball = new Ball([this.canvas.clientWidth/2, this.canvas.clientHeight-30], 7);		// Creates a new instance of the Ball class
	this.ball.renderBall(this.context);

	this.paddle = new Paddle([this.canvas.clientWidth/2-60, this.canvas.clientHeight-20], 120, 15)
	this.paddle.renderPaddle(this.context);

	this.bricks = [];
	Brick.prototype.createBricks(this.bricks, this.context);

	this.lives = 3;
	this.score = 0;
};

Arkanoid.prototype.resetCanvas = function() {		// Fills the canvas with the background
	this.context.fillStyle = "#000000";
	this.context.fillRect(0, 0, this.canvas.clientWidth, this.canvas.clientHeight);
};

Arkanoid.prototype.scoreBoard = function() {		// Shows lives left and score
	this.context.font = "20px Arial";
	this.context.fillStyle = "white";
	this.context.fillText('Lives: ' + this.lives, 800, 20);
	this.context.fillText('Score: ' + this.score, 885, 20);
}

Arkanoid.prototype.ballOnBottom = function() {
	return this.ball.ballY + this.ball.radius >= this.canvas.clientHeight;
};

Arkanoid.prototype.play = function() {		// Sets an interval to call all the rendering and movement functions
	var interval = setInterval(function(){
		if(this.ballOnBottom()) {
			if(this.lives === 0) {
				clearInterval(interval);
				let replay = confirm('You lose!\nPlay again?')
				if(replay === true) {
					window.location.reload();
				}
			}
			this.lives -= 1;
			this.ball = new Ball([this.paddle.paddleX+this.paddle.paddleWidth/2, this.canvas.clientHeight-30], 7);		// Creates a new instance of the Ball class
		}
		if(this.bricks.length === 0) {
			clearInterval(interval);
			let replay = confirm('You win!\nPlay again?')
			if(replay === true) {
				window.location.reload();
			}
		}
		this.resetCanvas();
		this.scoreBoard();
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
arkanoid.play();
