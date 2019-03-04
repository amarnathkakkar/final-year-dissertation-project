$( document ).ready(function() {
	

	compileCode = function() {
		eval(editor.getValue())



		async.eachLimit(Player.bufferedActionsArray, 1, function(el, callback) {
			setTimeout( () =>  {
				player.doAction(el);
				callback();
			}, 900);
		    
		}, function(err) {
			Player.bufferedActionsArray = [];
		})
	}

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
				endGame();
				startLevel();
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
		    ctx.moveTo(0, mapTileHeight*6);
		    ctx.lineTo(canvasWidth, mapTileHeight*6);
		    ctx.moveTo(0, mapTileHeight*4);
		    ctx.lineTo(canvasWidth, mapTileHeight*4);
		    ctx.stroke();

		    //level exit tile
		    ctx.fillStyle = "#990000";
		    ctx.fillRect(canvasWidth-mapTileWidth, mapTileHeight*5, mapTileWidth, mapTileHeight - ctx.lineWidth/2);

		    ctx.restore();
	  	}

	  	self.drawLevelOne = function() {
	    	//create level 2 map
	  	}

	  	self.drawLevelTwo = function() {
	    	//create level 2 map
	  	}

	  	self.drawLevelThree = function() {
	    	//create level 3 map
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

		    if (self.id == 'levelThree') {
		      self.drawLevelThree();
		    } else if (self.id == 'levelTwo') {
		      self.drawLevelTwo();
		    } else if (self.id == 'levelOne') {
		      self.drawLevelOne();
		    } else if (self.id == 'levelTutorial') {
		      self.drawTutorial();
		    }
	  	}

	  	return self;
	}

	update = function() {

		ctx.clearRect(0, 0, canvasWidth, canvasHeight);

		Maps.current.draw();

		frameCount++;	

		if (levelScore > 0) {
			levelScore--;
		}
		
		if (frameCount % 100 == 0) {
		//	Enemy.generateRandom();
		}

		for (var key in Bullet.list) {
			Bullet.list[key].update();
		}

		for (var key in Enemy.list) {	
			Enemy.list[key].update();
		}

		player.update();

		ctx.save();

		ctx.fillStyle = '#aad4bf';
		ctx.font = "13px Courier";
		ctx.fillText('Score: ' + levelScore, canvasWidth/2 - 35, 15); //change to show on level completion
		ctx.fillText('Hp: ' + player.hp, 5, 15);

		ctx.restore();
	}
	
	createCanvas();
  	player = Player();
	startLevel();
	setInterval(update, 40);
});