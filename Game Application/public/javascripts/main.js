$( document ).ready(function() {
	//const async = window.async;
	
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



		async.eachLimit(bufferedActionsArray, 1, function(el, callback) {
			setTimeout( () =>  {
				player.doAction(el);
				callback();
			}, 1000);
		    
		}, function(err) {
			console.log('done')
			bufferedActionsArray = [];
		})
	}

	update = function() {
		ctx.clearRect(0, 0, canvasWidth, canvasHeight);

		//drawLevelLines();

		frameCount++;
		score++;

		if (frameCount % 100 == 0) {
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