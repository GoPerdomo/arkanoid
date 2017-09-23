'use strict'

function Paddle(position, width, height) {		// Paddle Class Contructor
	this.paddleX = position[0];
	this.paddleY = position[1];
	this.paddleWidth = width;
	this.paddleHeight = height;
};

Paddle.prototype.renderPaddle = function(context) {		// Renders the paddle
	context.fillStyle = "#09fb06";
	context.fillRect(this.paddleX, this.paddleY, this.paddleWidth, this.paddleHeight);
};

var moveRight = false;
var moveLeft = false;

Paddle.prototype.eventListeners = function() {
	document.addEventListener('keydown', function(event) {		// Adds an Event Listener that changes the pressed key to true when pressed down
		if(event.keyCode === 39) {
			moveRight = true;
		}
		if(event.keyCode === 37) {
			moveLeft = true;
		}
	});

	document.addEventListener('keyup', function() {		// Adds an Event Listener that changes the pressed key to false when released
		if(event.keyCode === 39) {
			moveRight = false;
		}
		if(event.keyCode === 37) {
			moveLeft = false;
		}
	});
}


Paddle.prototype.movePaddle = function(context) {		// DESCRIPTION
	// TODO: ADD DESCRIPTION

	var paddleSpeed = 5;

	if(moveRight === true && this.paddleX < context.canvas.clientWidth - this.paddleWidth) {
		this.paddleX += paddleSpeed;
	}
	if(moveLeft === true && this.paddleX > 0) {
		this.paddleX -= paddleSpeed;
	}
};
