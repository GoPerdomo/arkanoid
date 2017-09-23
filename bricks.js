'use strict'

function Brick(position, width, height) {		// Brick Class Constructor
	this.brickX = position[0];
	this.brickY = position[1];
	this.brickWidth = 90;
	this.brickHeight = 30;
};


Brick.prototype.renderBrick = function(context) {		// Renders the bricks
	context.fillStyle = "white";
	context.fillRect(this.brickX, this.brickY, this.brickWidth, this.brickHeight);
};

Brick.prototype.createBricks = function(bricks, context) {		// Creates new instances of bricks and position them
	var posX = 100;
	var posY = 50;
	var brickIndex = 0;

	for(var i = 0; i < 4; i++) {
		for(var n = 0; n < 8; n++) {
			bricks[brickIndex] = new Brick([posX, posY]);
			bricks[brickIndex].renderBrick(context);
			posX += 100;
			brickIndex++;
		}
		posX = 100;
		posY += 50;
	}
};