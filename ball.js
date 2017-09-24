'use strict'

function Ball(position, radius) {		// Ball Class Constructor
	this.ballX = position[0];
	this.ballY = position[1];
	this.radius = radius;
	this.speed = [4, 4];
};

Ball.prototype.renderBall = function(context) {		// Renders the ball with the arkanoid.context as context
	context.beginPath();
	context.fillStyle = "#09fb06";
	context.arc(this.ballX, this.ballY, this.radius, 0, 2*Math.PI, false);
	context.fill();
};


Ball.prototype.checkWallsHit = function() {		// Checks if the ball has hit a horizontal walls
	return (this.ballX < this.radius) || (this.ballX > canvas.clientWidth-this.radius);
};

Ball.prototype.checkTopAndBottomHit = function() {		// Checks if the ball has hit the top the or bottom wall
	return (this.ballY < this.radius) || (this.ballY > canvas.clientHeight-this.radius);
};

Ball.prototype.checkPaddle = function(paddle) {		// Checks if the ball's position is within the paddle's range
	var withinHorizontalRange = (this.ballX > paddle.paddleX) && (this.ballX < paddle.paddleX + paddle.paddleWidth);
	var withinVerticalRange = (this.ballY > paddle.paddleY - this.radius) && (this.ballY < paddle.paddleY + paddle.paddleHeight)

	return withinHorizontalRange && withinVerticalRange;
};

Ball.prototype.checkBricksHorizontalHit = function(brick) {		// DESCRIPTION
	// TODO: ADD DESCRIPTION

	var withinHorizontalRange = (this.ballX + this.radius > brick.brickX) && (this.ballX - this.radius < brick.brickX + brick.brickWidth);

	return withinHorizontalRange;
};

Ball.prototype.checkBricksVerticalHit = function(brick) {		// DESCRIPTION
	// TODO: ADD DESCRIPTION

	var withinVerticalRange = (this.ballY + this.radius > brick.brickY) && (this.ballY - this.radius < brick.brickY + brick.brickHeight);

	return withinVerticalRange;
};

Ball.prototype.moveBall = function(paddle, bricks) {		// DESCRIPTION
	// TODO: ADD DESCRIPTION

	if(this.checkWallsHit()) {
		this.speed[0] = -this.speed[0];
	}
	if(this.checkTopAndBottomHit()) {
		this.speed[1] = -this.speed[1];
	}
	if(this.checkPaddle(paddle)){
		this.speed[1] = -this.speed[1];
	}
	bricks.forEach(function(brick) {
		if(this.checkBricksHorizontalHit(brick) && this.checkBricksVerticalHit(brick)) {
			var brickPos = arkanoid.bricks.indexOf(brick);
			arkanoid.bricks.splice(brickPos, 1);
			if(this.checkBricksHorizontalHit(brick)) {
				this.speed[1] = -this.speed[1];
			} else {
				this.speed[0] = -this.speed[0];
			}
		}
	}.bind(this))

	this.ballX += this.speed[0];
	this.ballY += this.speed[1];
};
