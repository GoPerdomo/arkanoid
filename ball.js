'use strict'

function Ball(position, radius) {		// Ball Class Constructor
	let speed = 4;

	this.ballX = position[0];
	this.ballY = position[1];
	this.radius = radius;
	this.direction = [randomDirection(), -speed];

	function randomDirection() {		// Randoms the ball's starting X direction
		return Math.floor(Math.random() * 2) === 0 ? -speed : speed;
	}
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

Ball.prototype.checkBricksHorizontalHit = function(brick) {		// Checks if the ball's positions is within the brick's horizontal range
	return (this.ballX + this.radius > brick.brickX) && (this.ballX - this.radius < brick.brickX + brick.brickWidth);
};

Ball.prototype.checkBricksVerticalHit = function(brick) {		// Checks if the ball's positions is within the brick's vertical range
	return (this.ballY + this.radius > brick.brickY) && (this.ballY - this.radius < brick.brickY + brick.brickHeight);
};

Ball.prototype.moveBall = function(paddle, bricks) {		// Moves the ball while checking it has hit a wall or a brick and, if so, changes it direction
	if(this.checkWallsHit()) {
		this.direction[0] = -this.direction[0];
	}
	if(this.checkTopAndBottomHit()) {
		this.direction[1] = -this.direction[1];
	}
	if(this.checkPaddle(paddle)){
		this.direction[1] = -this.direction[1];
	}
	bricks.forEach(function(brick) {
		if(this.checkBricksHorizontalHit(brick) && this.checkBricksVerticalHit(brick)) {
			var brickPos = arkanoid.bricks.indexOf(brick);
			arkanoid.bricks.splice(brickPos, 1);
			arkanoid.score += 100;
			if(this.checkBricksHorizontalHit(brick)) {
				this.direction[1] = -this.direction[1];
			} else {
				this.direction[0] = -this.direction[0];
			}
		}
	}.bind(this))

	this.ballX += this.direction[0];
	this.ballY += this.direction[1];
};
