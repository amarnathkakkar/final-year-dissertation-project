var player, entityList = {}, bulletList = {};
var bufferedActionsArray = [];


Entity = function(type, id, x, y, spdx, spdy, width, height, color) {
	var self = { 
		type:type,
		id:id,
		x:x,
		y:y,
		spdx:spdx,
		spdy:spdy,
		width:width,
		height:height,
		color:color,
	}

	self.update = function(entity) {
		self.updatePosition();
		self.draw();
	}

	self.updatePosition = function() {
		self.x += self.spdx;
		self.y += self.spdy;

		if (self.x >= canvasWidth || self.x <= 0) {
			self.spdx = -self.spdx;
		} 
		if (self.y >= canvasHeight || self.y <= 0) {
			self.spdy = -self.spdy;
		} 
	}

	self.draw = function() {
		ctx.save();
		ctx.shadowColor='black';
		ctx.shadowBlur=30;
		ctx.fillStyle = self.color;
		ctx.fillRect(self.x-self.width/2, self.y-self.height/2, self.width, self.height);
		ctx.restore();
	}

	self.getDistance = function(entity2) {
		var xDist = self.x - entity2.x;
		var yDist = self.y - entity2.y;

		return Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2))
	}

	self.checkCollision = function(entity2) { //returns true or false
		var rect1 = {
			x:self.x - self.width/2,
			y:self.y - self.height/2,
			width:self.width,
			height:self.width
		}

		var rect2 = {
			x:entity2.x - entity2.width/2,
			y:entity2.y - entity2.height/2,
			width:entity2.width,
			height:entity2.width
		}

		return checkCollisionRectRect(rect1, rect2);
	}

	return self;
}

Player = function() {
	var self = Entity('player','myId', mapTileWidth/2,canvasHeight/2 + mapTileHeight/2,30,10,25,25,'#77BA99');

	
	self.updatePosition = function() {
		//if(player.y < player.futureY)
		//	player.y += mapTileHeight/10;
		//if(player.y > player.futureY) 
		//	player.y -= mapTileHeight/10;
		//if(player.x > player.futureX)
		//	player.x -= mapTileWidth/10;
		//if(player.x < player.futureX)
		//	player.x += mapTileWidth/10;
	

		if(player.x < player.width/2 + mapTileWidth/2)
			player.x = player.width/2 + mapTileWidth/2;
		if(player.x > canvasWidth - player.width/2 - mapTileWidth/2)
			player.x = canvasWidth - player.width/2 - mapTileWidth/2;
		if(player.y < player.height/2 + mapTileHeight/2)
			player.y = player.height/2 + mapTileHeight/2;
		if(player.y > canvasHeight - player.height/2 - mapTileHeight/2)
			player.y = canvasHeight - player.height/2 - mapTileHeight/2;
	}


	self.doAction = function (input) {

		if(input[1] == 'move') {
			if(input[0] == 'right') 
				player.x += mapTileWidth;
			if(input[0] == 'left')
				player.x -= mapTileWidth;
			if(input[0] == 'up') 
				player.y -= mapTileHeight;
			if(input[0] == 'down')
				player.y += mapTileHeight;
		}
		else if(input[1] == 'shoot') {
			if(input[0] == 'right') 
				generateBullet(0);
			if(input[0] == 'left')
				generateBullet(180);
			if(input[0] == 'up') 
				generateBullet(270);
			if(input[0] == 'down')
				generateBullet(90);

		}

	}

	self.move = function(input) {
		bufferedActionsArray.push([input, 'move']);
	}


	self.shoot = function(input) {
		bufferedActionsArray.push([input, 'shoot']);
	}


	var super_update = self.update;
	self.update = function() {
		super_update();
		if (self.hp <= 0) {
			endGame();
			startNewGame();
		}
	}

	self.hp = 100;
	self.shooting = false;
	self.pressingDown = false;
	self.pressingUp = false;
	self.pressingLeft = false;
	self.pressingRight = false;

	//self.futureX = self.x;
	//self.futureY = self.y;
	
	return self;
}

createEnemy = function(id, x, y, spdx, spdy, width, height) {
	var self = Entity('enemy',id,x,y,spdx,spdy,width,height,'#D33F49');
	
	var super_update = self.update;
	self.update = function() {
		super_update();
		var isColliding = player.checkCollision(self);
		if(isColliding) {
			player.hp = player.hp - 10;
		}
	}//console.log(getDistanceBetweenEntities(player, entityList[key]));
	

	entityList[id] = self;
}

generateRandomEnemy = function() {
	var id = Math.random();
	var x = Math.random()*canvasWidth;
	var y = Math.random()*canvasHeight;
	var spdx = 5 + Math.random()*5;
	var spdy = 5 + Math.random()*5;
	var width = 10 + Math.random()*30;
	var height = 10 + Math.random()*30;

	createEnemy(id, x, y, spdx, spdy, width, height);
}

createBullet = function(id, x, y, spdx, spdy, width, height) {
	var self = Entity('bullet',id,x,y,spdx,spdy,width,height,'#D7C0D0');


	var super_update = self.update;
	self.update = function() {
		super_update();
		
		self.timer++

		var toRemove = false;

		if (self.timer > mapTileWidth/5) {
			toRemove = true;
		}
		
		for (var key2 in entityList) {
			var isColliding = bulletList[self.id].checkCollision(entityList[key2]);
			if(isColliding) {
				toRemove = true;
				score += 100;
				delete entityList[key2];
				break;
			}
		}
		if(toRemove)
			delete bulletList[self.id];
	}

	self.timer = 0;

	bulletList[id] = self;
}

generateBullet = function(angle) {
	var id = Math.random();
	var x = player.x;
	var y = player.y;
	var width = 10;
	var height = 10;
	var angle = angle;
	var spdx = Math.cos(angle/180*Math.PI)*5;
	var spdy = Math.sin(angle/180*Math.PI)*5;

	createBullet(id, x, y, spdx, spdy, width, height);
}

checkCollisionRectRect = function(rect1, rect2) {
	return rect1.x <= rect2.x + rect2.width
		&& rect2.x <= rect1.x + rect1.width
		&& rect1.y <= rect2.y + rect2.height
		&& rect2.y <= rect1.y + rect1.height;
}