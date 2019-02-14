$( document ).ready(function() {

	var ctx = document.getElementById("myCanvas").getContext("2d");

	var canvasWidth = window.outerWidth/1.5;
	var canvasHeight = window.outerHeight/1.5;

	function sizeCanvas() {
  
	  ctx.canvas.width  = canvasWidth;
	  ctx.canvas.height = canvasHeight
	  //...drawing code...
	}

	sizeCanvas();

	ctx.fillText('O', 0, 8);

	ctx.fillText('O', canvasWidth-8, canvasHeight-1);

	var bottomW = canvasWidth-8;
	var bottomH = canvasHeight-1;


	var entityList = {};

	var Player = {
		name:'O',
		x:50,
		y:40,
		spdx:30,
		spdy:10
	}

	function createEntity(name, id, x, y, spdx, spdy) {
		
		var entity = {
			name:name,
			x:x,
			y:y,
			spdx:spdx,
			spdy:spdy,
			id:id
		}

		entityList[id] = entity;

	}

	ctx.fillStyle = 'red';
	ctx.globalAlpha = 1;

	createEntity('X', 'E1', 100, 200, 10, 50);
	createEntity('X', 'E2', 250, 100, 15, 20);

	

	function updatePlayer(entity) {
		entity.x += entity.spdx;
		entity.y += entity.spdy;
		ctx.fillText(entity.name, entity.x, entity.y);	

		if (entity.x >= bottomW || entity.x <= 0) {
			entity.spdx = -entity.spdx;
		} 
		if (entity.y >= bottomH || entity.y <= 0) {
			entity.spdy = -entity.spdy;
		} 
	}

	function updateEntity(entity) {
		entity.x += entity.spdx;
		entity.y += entity.spdy;
		ctx.fillText(entity.name, entity.x, entity.y);	

		if (entity.x >= bottomW || entity.x <= 0) {
			entity.spdx = -entity.spdx;
		} 
		if (entity.y >= bottomH || entity.y <= 0) {
			entity.spdy = -entity.spdy;
		} 
	}


	function getDistanceBetweenEntities(entity1, entity2) {
		var xDist = entity1.x - entity2.x;
		var yDist = entity1.y - entity2.y;

		return Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2))

	}


	function checkCollisionEntity(entity1, entity2) { //returns true or false
		var distance = getDistanceBetweenEntities(entity1, entity2);
		return distance < 50;
	}


	function update() {
		ctx.clearRect(0, 0, canvasWidth, canvasHeight);


		for (var key in entityList) {
			
			updateEntity(entityList[key]);
		
			
			var isColliding = checkCollisionEntity(Player, entityList[key])
			if(isColliding) {
				console.log('Colliding!');
			}
		}

		updatePlayer(Player);
	}


	setInterval(update, 40);
});