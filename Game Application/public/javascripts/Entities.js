var player;
var halvedMapTileWidth = mapTileWidth/2;
var halvedMapTileHeight = mapTileHeight/2;

Entity = function(type, id, x, y, spdx, spdy, width, height, img) {
	var self = { 
		type:type,
		id:id,
		x:x,
		y:y,
		spdx:spdx,
		spdy:spdy,
		width:width,
		height:height,
		img:img
	}

	self.spriteAnimCounter = 0;

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
		
		var x = self.x-self.width/2;
		var y = self.y-self.height/2
		//ctx.drawImage(self.img, x, y);


		var frameWidth = self.img.width/3;
		var frameHeight = self.img.height/4;

		var directionMod = 3; //looking right
		if(self.y < self.futureY)
			directionMod = 2; //down
		else if(self.x > self.futureX)
			directionMod = 1; //left
		else if (self.y > self.futureY)
			directionMod = 0; //up
		else 
			directionMod = 3;

		ctx.drawImage(self.img,
			0, directionMod*frameHeight, frameWidth, frameHeight,
			x, y, self.width, self.height);

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
	var self = Entity('player','myId', mapTileWidth/2,canvasHeight/2 + mapTileHeight/2,30,10,35/500*canvasWidth,35/500*canvasHeight,Img.player);

	
	self.movePixelsY = Math.round((mapTileHeight/20) * 10) / 10;
	self.movePixelsX = Math.round((mapTileWidth/20) * 10) / 10;


	self.updatePosition = function() {


		var oldX = self.x;
		var oldY = self.y;


		var rBumper = {type:self.type, x:self.x + self.width/2, y:self.y};
		var lBumper = {type:self.type, x:self.x - self.width/2, y:self.y};
		var tBumper = {type:self.type, x:self.x, y:self.y - self.height/2};
		var bBumper = {type:self.type, x:self.x, y:self.y + self.height/2};



		if(self.y < self.futureY){
			if(Maps.current.isPositionWall(bBumper)) {
				self.x = oldX;
				self.y = oldY;
				self.futureX = self.x;
				self.futureY = self.y;
			} else {
				//self.y += Math.round( (mapTileHeight/10) * 10 ) / 10;
				//self.y = Math.round(self.y);
				self.y += self.movePixelsY;
			}
		}
		if(self.y > self.futureY) {
			if (Maps.current.isPositionWall(tBumper)) {
				self.x = oldX;
				self.y = oldY;
				self.futureX = self.x;
				self.futureY = self.y;
			} else {
				//self.y -= Math.round( (mapTileHeight/10) * 10 ) / 10;
				//self.y = Math.round(self.y);
				self.y -= self.movePixelsY;
			}
		}
		if(self.x > self.futureX) {
			if (Maps.current.isPositionWall(lBumper)) {
				self.x = oldX;
				self.y = oldY;
				self.futureX = self.x;
				self.futureY = self.y;
			} else {
				//self.x -= Math.round( (mapTileWidth/10) * 10 ) / 10;
				//self.x = Math.round(self.x);
				self.x -= self.movePixelsX;
			}
		}
		if(self.x < self.futureX) {
			if(Maps.current.isPositionWall(rBumper)) {
				self.x = oldX;
				self.y = oldY;
				self.futureX = self.x;
				self.futureY = self.y;
			} else {
				//self.x += (mapTileWidth/10);
				//self.x = Math.round(self.x);
				self.x += self.movePixelsX;
			}
		}
	


		// Keep character within map and specifcally in the centre of a tile (i.e mapTile Width or Height)
		if(self.x < halvedMapTileWidth) {
			self.x = halvedMapTileWidth;
			self.futureX = self.x;
		}
		if(self.x > canvasWidth - halvedMapTileWidth) {
			self.x = canvasWidth - halvedMapTileWidth;
			self.futureX = self.x;
		}
		if(self.y < halvedMapTileHeight) {
			self.y = halvedMapTileHeight;
			self.futureY = self.y;
		}
		if(self.y > canvasHeight - halvedMapTileHeight) {
			self.y = canvasHeight - halvedMapTileHeight;
			self.futureY = self.y;
		}

	}

	self.draw = function() {
		ctx.save();
		
		var x = self.x-self.width/2;
		var y = self.y-self.height/2
		//ctx.drawImage(self.img, x, y);


		var frameWidth = self.img.width/4;
		var frameHeight = self.img.height/4;

		var directionMod = 3; //looking right
		if(self.y < self.futureY)
			directionMod = 0; //down
		else if(self.x > self.futureX)
			directionMod = 2; //left
		else if (self.y > self.futureY)
			directionMod = 1; //up
		else if (self.x < self.futureX)
			directionMod = 3;


		var walkingMod = Math.floor(self.spriteAnimCounter % 4); //1,2,3

		ctx.shadowColor='black';
		ctx.shadowBlur=15;

		ctx.drawImage(self.img,
			walkingMod*frameWidth, directionMod*frameHeight, frameWidth, frameHeight,
			x, y, self.width, self.height);

		//ctx.shadowColor='black';
		//ctx.shadowBlur=30;
		//ctx.fillStyle = self.color;
		//ctx.fillRect(self.x-self.width/2, self.y-self.height/2, self.width, self.height);
		ctx.restore();
	}


	self.doAction = function (input) {

		if(input[1] == 'move') {
			if(input[0] == 'right') 
				self.futureX += mapTileWidth;
			if(input[0] == 'left')
				self.futureX -= mapTileWidth;
			if(input[0] == 'up') 
				self.futureY -= mapTileHeight;
			if(input[0] == 'down')
				self.futureY += mapTileHeight;
		}
		else if(input[1] == 'shoot') {
			if(input[0] == 'right') 
				Bullet.generate(0);
			if(input[0] == 'left')
				Bullet.generate(180);
			if(input[0] == 'up') 
				Bullet.generate(270);
			if(input[0] == 'down')
				Bullet.generate(90);

		}

	}

	self.move = function(input) {
		Player.bufferedActionsArray.push([input, 'move']);
	}


	self.shoot = function(input) {
		Player.bufferedActionsArray.push([input, 'shoot']);
	}


	var super_update = self.update;
	self.update = function() {
		super_update();

		if(self.x != self.futureX || self.y != self.futureY) {
			self.spriteAnimCounter += 0.1;
		}
		

		if (self.hp <= 0) {
			levelScore -= 2000;
			restartLevel();
		}
	}

	self.hp = 100;

	self.futureX = self.x;
	self.futureY = self.y;
	
	return self;
}

Player.bufferedActionsArray = [];

Enemy = function(id, x, y, spdx, spdy, width, height) {
	var self = Entity('enemy',id,x,y,spdx,spdy,width,height,Img.enemy);

	self.updatePosition = function() {
		var oldX = self.x;
		var oldY = self.y;

		self.x += self.spdx;
		self.y += self.spdy;

		var rBumper = {x:self.x + self.width/4, y:self.y};
		var lBumper = {x:self.x - self.width/4, y:self.y};
		var tBumper = {x:self.x, y:self.y - self.height/4};
		var bBumper = {x:self.x, y:self.y + self.height/4};

		if (self.x >= canvasWidth || self.x <= 0 
		 || Maps.current.isPositionWall(rBumper) || Maps.current.isPositionWall(lBumper)) {
			self.spdx = -self.spdx;
		} 
		if (self.y >= canvasHeight || self.y <= 0
		 || Maps.current.isPositionWall(tBumper) || Maps.current.isPositionWall(bBumper)) {
			self.spdy = -self.spdy;
		} 

	}

	self.draw = function() {
		ctx.save();
		
		var x = self.x-self.width/2;
		var y = self.y-self.height/2

		var frameWidth = self.img.width/4;
		var frameHeight = self.img.height/4;

		var directionMod = 3; //looking right
		if(self.spdy > 0)
			directionMod = 0; //down
		else if(self.spdx < 0)
			directionMod = 3; //left
		else if (self.spdy < 0)
			directionMod = 2; //up
		else if (self.spdx > 0)
			directionMod = 1;


		ctx.shadowColor='black';

		var walkingMod = Math.floor(self.spriteAnimCounter % 4); //1,2,3

		if (walkingMod == 0) 
			ctx.shadowBlur=6;
		else if (walkingMod == 1)
			ctx.shadowBlur=5;
		else if (walkingMod == 2)
			ctx.shadowBlur = 6;
		else
			ctx.shadowBlur = 7;		
		

		ctx.drawImage(self.img,
			walkingMod*frameWidth, directionMod*frameHeight, frameWidth, frameHeight,
			x, y, self.width, self.height);

		
		ctx.restore();
	}

	var super_update = self.update;
	self.update = function() {

		super_update();
		
		self.spriteAnimCounter += 0.1;
		
		var isColliding = player.checkCollision(self);
		if(isColliding) {
			player.hp = player.hp - 10;
		}
	}//console.log(getDistanceBetweenEntities(player, Enemy.list[key]));
	
	Enemy.list[id] = self;
}

Enemy.list = {};

Enemy.generateRandom = function() {
	var id = Math.random();
	var x = Math.random()*canvasWidth;
	var y = Math.random()*canvasHeight;
	var spdx = 5 + Math.random()*5;
	var spdy = 5 + Math.random()*5;
	var width = 40;
	var height = 40;

	Enemy(id, x, y, spdx, spdy, width, height);
}

Bullet = function(id, x, y, spdx, spdy, width, height) {
	var self = Entity('bullet',id,x,y,spdx,spdy,width,height,Img.bullet);

	self.draw = function() {
		ctx.save();
		
		var x = self.x-self.width/2;
		var y = self.y-self.height/2;
		var frameWidth = self.img.width;
		var frameHeight = self.img.height/4;

		var directionMod; 
		if(self.spdy > 0)
			directionMod = 3;
		else if(self.spdx < 0)
			directionMod = 2;
		else if (self.spdy < 0)
			directionMod = 1;
		else 
			directionMod = 0;

		ctx.shadowColor='black';
		ctx.shadowBlur=5;

		ctx.drawImage(self.img,
			0, directionMod*frameHeight, frameWidth, frameHeight,
			x, y, self.width, self.height);

		ctx.restore();
	}

	var super_update = self.update;
	self.update = function() {
		super_update();
		
		self.timer++

		var toRemove = false;


		for (var key in Bullet.list) {
			var b = Bullet.list[key];

			if (self.timer > mapTileWidth) {
				toRemove = true;
			}

			for (var key2 in Enemy.list) {
				var isColliding = Bullet.list[self.id].checkCollision(Enemy.list[key2]);
				if(isColliding) {
					toRemove = true;
					levelScore += 1000;
					delete Enemy.list[key2];
					break;
				}
			}

			if(Maps.current.isPositionWall(b)) {
				//toRemove = true;
				self.spdx = -self.spdx;
				self.spdy = -self.spdy;
			}

		}

		if(toRemove)
			delete Bullet.list[self.id];
	}

	self.timer = 0;

	Bullet.list[id] = self;
}

Bullet.list = {};

Bullet.generate = function(angle) {
	var id = Math.random();
	var x = player.x;
	var y = player.y;
	var width = 22;
	var height = 22;
	var angle = angle;
	var spdx = Math.round(Math.cos(angle/180*Math.PI)*5);
	var spdy = Math.round(Math.sin(angle/180*Math.PI)*5);

	Bullet(id, x, y, spdx, spdy, width, height);
}

checkCollisionRectRect = function(rect1, rect2) {
	return rect1.x <= rect2.x + rect2.width
		&& rect2.x <= rect1.x + rect1.width
		&& rect1.y <= rect2.y + rect2.height
		&& rect2.y <= rect1.y + rect1.height;
}