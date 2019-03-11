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
	    	//levelOne = true;
			nextLevel();
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
  	}

  	self.drawLevelFour = function() {
  	}

  	self.drawLevelFive = function() {
  	}

  	self.drawLevelSix = function() {
  	}

  	self.drawLevelSeven = function() {
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

	    if (self.id == 7) {
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