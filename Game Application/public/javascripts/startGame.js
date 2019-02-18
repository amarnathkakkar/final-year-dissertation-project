var timeWhenGameStarted = Date.now();
var score = 0;

function endGame() {
	var timeSurvived = Date.now() - timeWhenGameStarted;
	console.log('Score:  ' + score + ' points');
}

function startNewGame() {
	player.x = player.width/2;
	player.y = Math.ceil(canvasHeight/2);
	player.futureX = player.x;
	player.futureY = player.y;
	player.hp = 100;
	timeWhenGameStarted = Date.now();
	frameCount = 0;
	score = 0;
	Enemy.list = {};
	Bullet.list = {};
	Player.bufferedActionsArray = [];
	Enemy.generateRandom();
}