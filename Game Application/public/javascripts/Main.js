$( document ).ready(function() {

	compileCode = function() {
		eval(editor.getValue())

		async.eachLimit(Player.bufferedActionsArray, 1, 
			function(el, callback) {
				setTimeout( function() {
					if (Player.bufferedActionsArray.length == 0) {
						return;
					}
					else {
						player.doAction(el);
						callback();
					}
				}, 900);
			}, function(err) {
				Player.bufferedActionsArray = [];
			}
		)
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

		levelDisplay.innerHTML =  '<span style="font-size: 14px">Current Level: '+currentLevel+'/' + numberOfLevels + '</font>'
		ctx.fillStyle = '#aad4bf';
		ctx.font = "13px Helvetica Neue";
		ctx.fillText('Score: ' + levelScore, 4.5*mapTileWidth, 15);
		ctx.fillText('Hp: ' + player.hp, 5, 15);

		ctx.restore();
	}
	
	createCanvas();
  	player = Player();
	startGame();
	setInterval(update, 40);
});