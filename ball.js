'use strict'

function Ball(position, radius) {		// Ball Class Constructor
	this.ballX = position[0];
	this.ballY = position[1];
	this.radius = radius;
};

Ball.prototype.renderBall = function(context) {		// Renders the ball with the arkanoid.context as context
	context.beginPath();
	context.fillStyle = "#09fb06";
	context.arc(this.ballX, this.ballY, this.radius, 0, 2*Math.PI, false);
	context.fill();
};

Ball.prototype.moveBall = function(movement) {
	this.ballX += movement[0];
	this.ballY += movement[1];
};