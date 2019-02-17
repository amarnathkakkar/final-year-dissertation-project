$( document ).ready(function() {

	createEvents = function() {
		
		document.onkeydown = function(event) {
			if(event.keyCode == 38) 
				player.pressingUp = true;
			if(event.keyCode == 40)
				player.pressingDown = true;
			if(event.keyCode == 37)
				player.pressingLeft = true;
			if(event.keyCode == 39)
				player.pressingRight = true;
			//if(event.keyCode == 83)
			//	generateRandomBullet();
		}

		document.onkeyup = function(event) {
			if(event.keyCode == 38) 
				player.pressingUp = false;
			if(event.keyCode == 40)
				player.pressingDown = false;
			if(event.keyCode == 37)
				player.pressingLeft = false;
			if(event.keyCode == 39)
				player.pressingRight = false;
		}
	}


	compileCode = function() {
		eval(editor.getValue())
	}


	//drawLevelLines = function() {
	//	//map style
	//	for (i = mapTileWidth; i < canvasWidth; i += mapTileWidth) {
	//		ctx.save();
	//		ctx.moveTo(0, i);
	//		ctx.fillStyle = 'red';
	//		ctx.lineTo(canvasWidth, i);
	//		ctx.stroke();
	//		ctx.restore();
//
//	//	}
//
//
//	//	for (i = mapTileHeight; i < canvasHeight; i += mapTileHeight) {
//	//		ctx.save();
//	//		ctx.moveTo(i, 0);
//	//		ctx.fillStyle = 'red';
//	//		ctx.lineTo(i,canvasHeight);
//	//		ctx.stroke();
//	//		ctx.restore();
//	//	
//	//	}
	//}

	update = function() {
		ctx.clearRect(0, 0, canvasWidth, canvasHeight);

		//drawLevelLines();

		frameCount++;
		score++;

		if (frameCount % 10000 == 0) {
			generateRandomEnemy();
		}


		for (var key in bulletList) {
			bulletList[key].update();
			
		}

		for (var key in entityList) {	
			entityList[key].update();
		
		}

		player.update();

		ctx.save();
		ctx.fillStyle = '#aad4bf';
		//ctx.globalAlpha = 0.2;
		ctx.font = "13px Courier";
		ctx.fillText('Score: ' + score, canvasWidth/2 - 35, 15); //change to show on level completion
		ctx.fillText('Hp: ' + player.hp, 5, 15);
		ctx.restore();
	}
  	
	drawMap();
	createEvents();
  	player = Player();
	startNewGame();
	setInterval(update, 40);
});