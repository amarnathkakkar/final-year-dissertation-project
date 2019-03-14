Maps = function(id, imgSrc, grid) {
  	var self = {
	    id:id,
	    image:new Image(),
	    width:grid[0].length * gridTileSize,
	    height:grid.length * gridTileSize,
	    grid:grid
  	}

  	self.isPositionWall = function(pnt) {
	    var gridX = Math.floor(pnt.x/gridTileSize);
	    var gridY = Math.floor(pnt.y/gridTileSize);

	    if(gridX < 0 || gridX > self.grid[0].length) {
	      return true;
	    }
	    if(gridY < 0 || gridY > self.grid.length) {
	      return true;
	    }


	    //exit tile reached
	    if (pnt.type == 'player' && self.grid[gridY][gridX] == '2') {
			
	    	if (self.id == numberOfLevels) {
				endGame();
	    	}
			else {
				nextLevel();
			}
		}
	    else {
		    return self.grid[gridY][gridX];
	    }
  	}

  	self.image.src = imgSrc;

  	self.drawTutorial = function() {
	    ctx.save();

	    //level walls
	    ctx.lineWidth = 5;
	    ctx.beginPath();
	    ctx.moveTo(0, mapTileHeight*4);
	    ctx.lineTo(canvasWidth, mapTileHeight*4);
	    ctx.moveTo(0, mapTileHeight*5);
	    ctx.lineTo(canvasWidth, mapTileHeight*5);
	    ctx.stroke();

	    //level exit tile
	    ctx.fillStyle = "#990000";
	    ctx.fillRect(canvasWidth-mapTileWidth, mapTileHeight*4 + ctx.lineWidth/2, mapTileWidth, mapTileHeight - ctx.lineWidth);

	    ctx.restore();
  	}

  	self.drawLevelOne = function() {
    	self.drawTutorial();
  	}

  	self.drawLevelTwo = function() {
    	ctx.save();

	    //level walls
	    ctx.lineWidth = 5;
	    ctx.beginPath();
	    ctx.moveTo(0, mapTileHeight*6);
	    ctx.lineTo(mapTileWidth*4, mapTileHeight*6);
	    ctx.lineTo(mapTileWidth*4, mapTileHeight*5);
	    ctx.lineTo(canvasWidth, mapTileHeight*5);
	    ctx.moveTo(0, mapTileHeight*4);
	    ctx.lineTo(canvasWidth, mapTileHeight*4);
	    ctx.stroke();

	    //level exit tile
	    ctx.fillStyle = "#990000";
	    ctx.fillRect(canvasWidth-mapTileWidth, mapTileHeight*4 + ctx.lineWidth/2, mapTileWidth, mapTileHeight - ctx.lineWidth);

	    ctx.restore();
  	}

  	self.drawLevelThree = function() {
  		ctx.save();

	    //level walls
	    ctx.lineWidth = 5;
	    ctx.beginPath();
	    ctx.moveTo(0, mapTileHeight*6);
	    ctx.lineTo(mapTileWidth*2, mapTileHeight*6);
	    ctx.lineTo(mapTileWidth*2, mapTileHeight*4);
	    ctx.lineTo(0, mapTileHeight*4);
	    ctx.stroke();

	    //level exit tile
	    ctx.fillStyle = "#990000";
	    ctx.fillRect(mapTileWidth, mapTileHeight*4  + ctx.lineWidth/2, mapTileWidth - ctx.lineWidth/2, mapTileHeight  - ctx.lineWidth/2);

	    ctx.restore();
  	}

  	self.drawLevelFour = function() {
  		ctx.save();

	    //level walls
	    ctx.lineWidth = 5;
	    ctx.beginPath();
	    ctx.moveTo(0, mapTileHeight*9);
	    ctx.lineTo(mapTileWidth*4, mapTileHeight*9);
	    ctx.lineTo(mapTileWidth*4, mapTileHeight*7);
	    ctx.lineTo(mapTileWidth*7, mapTileHeight*7);
	    ctx.lineTo(mapTileWidth*7, mapTileHeight*5);
	    ctx.lineTo(mapTileWidth*9, mapTileHeight*5);
	    ctx.lineTo(mapTileWidth*9, mapTileHeight*6);
	    ctx.lineTo(canvasWidth, mapTileHeight*6);
	    ctx.moveTo(0, mapTileHeight*8);
	    ctx.lineTo(mapTileWidth*3, mapTileHeight*8);
	    ctx.lineTo(mapTileWidth*3, mapTileHeight*6);
	    ctx.lineTo(mapTileWidth*6, mapTileHeight*6);
	    ctx.lineTo(mapTileWidth*6, mapTileHeight*4);
	    ctx.lineTo(canvasWidth, mapTileHeight*4);
	    ctx.stroke();

	    //level exit tile
	    ctx.fillStyle = "#990000";
	    ctx.fillRect(mapTileWidth*9 + ctx.lineWidth/2, mapTileHeight*5, mapTileWidth - ctx.lineWidth/2, mapTileHeight  - ctx.lineWidth/2);

	    ctx.restore();
  	}

  	self.drawLevelFive = function() {
  		ctx.save();

	    //level walls
	    ctx.lineWidth = 5;
	    ctx.beginPath();
	    ctx.moveTo(0, mapTileHeight*5);
	    ctx.lineTo(canvasWidth, mapTileHeight*5);
	    ctx.moveTo(0, mapTileHeight*6);
	    ctx.lineTo(canvasWidth, mapTileHeight*6);
	    ctx.stroke();

	    //level exit tile
	    ctx.fillStyle = "#990000";
	    ctx.fillRect(canvasWidth-mapTileWidth, mapTileHeight*5 + ctx.lineWidth/2, mapTileWidth, mapTileHeight - ctx.lineWidth);

	    ctx.restore();
  	}

  	self.drawLevelSix = function() {
  		ctx.save();

	    //level walls
	    ctx.lineWidth = 5;
	    ctx.beginPath();
	    ctx.moveTo(0, mapTileHeight*4);
	    ctx.lineTo(mapTileWidth*8, mapTileHeight*4);
	    ctx.lineTo(mapTileWidth*8, mapTileHeight*5);
	    ctx.lineTo(canvasWidth, mapTileHeight*5);
	    ctx.moveTo(0, mapTileHeight*7);
	    ctx.lineTo(mapTileWidth*8, mapTileHeight*7);
	    ctx.lineTo(mapTileWidth*8, mapTileHeight*6);
	    ctx.lineTo(canvasWidth, mapTileHeight*6);
	    ctx.moveTo(mapTileWidth*3, mapTileHeight*5);
	    ctx.lineTo(mapTileWidth*4, mapTileHeight*5);
	    ctx.lineTo(mapTileWidth*4, mapTileHeight*6);
	    ctx.lineTo(mapTileWidth*3, mapTileHeight*6);
	    ctx.lineTo(mapTileWidth*3, mapTileHeight*5);
	    ctx.stroke();

	    //level exit tile
	    ctx.fillStyle = "#990000";
	    ctx.fillRect(canvasWidth-mapTileWidth, mapTileHeight*5 + ctx.lineWidth/2, mapTileWidth, mapTileHeight - ctx.lineWidth);

	    ctx.restore();
  	}

  	self.drawLevelSeven = function() {
  		ctx.save();

	    //level walls
	    ctx.lineWidth = 5;
	    ctx.beginPath();
	    ctx.moveTo(0, mapTileHeight*9);
	    ctx.lineTo(mapTileWidth*2, mapTileHeight*9);
	    ctx.lineTo(mapTileWidth*2, mapTileHeight*8);
	    ctx.lineTo(mapTileWidth*4, mapTileHeight*8);
	    ctx.lineTo(mapTileWidth*4, mapTileHeight*6);
	    ctx.lineTo(mapTileWidth*7, mapTileHeight*6);
	    ctx.lineTo(mapTileWidth*7, mapTileHeight*3);
	    ctx.lineTo(canvasWidth, mapTileHeight*3);
	    ctx.moveTo(0, mapTileHeight*8);
	    ctx.lineTo(mapTileWidth*1, mapTileHeight*8);
	    ctx.lineTo(mapTileWidth*1, mapTileHeight*7);
	    ctx.lineTo(mapTileWidth*3, mapTileHeight*7);
	    ctx.lineTo(mapTileWidth*3, mapTileHeight*5);
	    ctx.lineTo(mapTileWidth*6, mapTileHeight*5);
	    ctx.lineTo(mapTileWidth*6, mapTileHeight*2);
	    ctx.lineTo(canvasWidth, mapTileHeight*2);
	    ctx.stroke();

	    //level exit tile
	    ctx.fillStyle = "#990000";
	    ctx.fillRect(mapTileWidth*9, mapTileHeight*2 + ctx.lineWidth/2, mapTileWidth - ctx.lineWidth/2, mapTileHeight  - ctx.lineWidth);

	    ctx.restore();
  	}

  	self.drawLevelEight = function() {
  		ctx.save();

	    //level walls
	    ctx.lineWidth = 5;
	    ctx.beginPath();

	    ctx.moveTo(0, mapTileHeight);
	    ctx.lineTo(mapTileWidth*3, mapTileHeight);
	    ctx.lineTo(mapTileWidth*3, mapTileHeight*3);
	    ctx.lineTo(mapTileWidth*2, mapTileHeight*3);
	    ctx.lineTo(mapTileWidth*2, mapTileHeight*4);
	    ctx.lineTo(mapTileWidth*8, mapTileHeight*4);
	    ctx.lineTo(mapTileWidth*8, mapTileHeight*6);
	    ctx.lineTo(mapTileWidth*10, mapTileHeight*6);

		ctx.moveTo(mapTileWidth*6, mapTileHeight*5);
		ctx.lineTo(mapTileWidth*7, mapTileHeight*5);
		ctx.lineTo(mapTileWidth*7, mapTileHeight*7);
		ctx.lineTo(mapTileWidth*6, mapTileHeight*7);
		ctx.lineTo(mapTileWidth*6, mapTileHeight*5);


		ctx.moveTo(mapTileWidth*8, mapTileHeight*7)
		ctx.lineTo(mapTileWidth*9, mapTileHeight*7);
		ctx.lineTo(mapTileWidth*9, mapTileHeight*8);


	    ctx.moveTo(0, mapTileHeight*2);
	    ctx.lineTo(mapTileWidth*2, mapTileHeight*2);
	    ctx.lineTo(mapTileWidth*1, mapTileHeight*2);
	    ctx.lineTo(mapTileWidth*1, mapTileHeight*6);
	    ctx.lineTo(mapTileWidth*5, mapTileHeight*6);
	    ctx.lineTo(mapTileWidth*5, mapTileHeight*8);
	    ctx.lineTo(mapTileWidth*8, mapTileHeight*8);
	    ctx.lineTo(mapTileWidth*8, mapTileHeight*9);
	    ctx.lineTo(mapTileWidth*10, mapTileHeight*9);
	    

	    ctx.stroke();

	    //level exit tile
	    ctx.fillStyle = "#990000";
	    ctx.fillRect(canvasWidth-mapTileWidth, mapTileHeight*8, mapTileWidth, mapTileHeight - ctx.lineWidth/2);

	    ctx.restore();
  	}

  	//draws map layout that exists in every level map
  	self.draw = function () {
	    ctx.save();
	    
	    ctx.globalAlpha = 0.15;
	    ctx.strokeStyle = "#b3b3b3";
	    ctx.beginPath();
	    for (var y=1; y < 10; y++) {
	      ctx.moveTo(0, ((y/10) * canvasHeight) );
	      ctx.lineTo(canvasWidth, ((y/10) * canvasHeight) );
	    }
	    for (var x=1; x < 10; x++) {
	      ctx.moveTo(((x/10) * canvasWidth), 0 );
	      ctx.lineTo(((x/10) * canvasWidth), canvasHeight );
	    }
	    ctx.stroke();

	    ctx.restore();

	    if (self.id == 8) {
	    	self.drawLevelEight();
	    } else if (self.id == 7) {
	    	self.drawLevelSeven();
	    } else if (self.id == 6) {
	    	self.drawLevelSix();
	    } else if (self.id == 5) {
	    	self.drawLevelFive();
	    } else if (self.id == 4) {
	    	self.drawLevelFour();
	    } else if (self.id == 3) {
	    	self.drawLevelThree();
	    } else if (self.id == 2) {
	    	self.drawLevelTwo();
	    } else if (self.id == 1) {
	    	self.drawLevelOne();
	    } else if (self.id == 0) {
	    	self.drawTutorial();
	    }
  	}

  	return self;
}