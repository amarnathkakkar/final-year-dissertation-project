$( document ).ready(function() {
	var cnv, ctx;
	//var consolecnv, consolectx;
	var textEditor, editor;
	var btn;
	//var canvasOffset, offsetX, offsetY;
	//var canvasWidth = window.outerWidth/1.4;
	var canvasHeight = window.outerHeight/1.4;
	var canvasWidth	 = canvasHeight;
	var timeWhenGameStarted = Date.now();
	var frameCount, score, counter = 0;
	var Player;

	drawMap = function() {
	  	cnv = document.createElement('canvas');
	  	ctx = cnv.getContext("2d");

	  	cnv.setAttribute('id','mapCanvas')
		cnv.width  = canvasWidth;
	  	cnv.height = canvasHeight;
	  	cnv.style.position = 'absolute';
	  	cnv.style.margin = 'auto';
	  	cnv.style.left = window.outerWidth/2.76 - canvasWidth*0.1 + 'px';
	  	cnv.style.top = 0;
	  	cnv.style.bottom = 0;
	  	cnv.style.right = 0;
	  	cnv.style.border = '0px solid #EFF0D1';
	  	cnv.style.backgroundColor = '#EFF0D1';

		document.getElementById('container').appendChild(cnv);

		//consolecnv = document.createElement('canvas');
	  	//consolectx = consolecnv.getContext("2d");
		
		//consolecnv.setAttribute('id','consoleCanvas')
		//consolecnv.width = canvasHeight*0.8;
		//consolecnv.height = canvasHeight;
		//consolecnv.style.position = 'absolute';
		//consolecnv.style.margin = 'auto';
		//consolecnv.style.right = window.outerWidth/2.75 + canvasWidth*0.1 + 'px';
	  	//consolecnv.style.top = 0;
	  	//consolecnv.style.bottom = 0;
	  	//consolecnv.style.left = 0;
		//consolecnv.style.border = '1px solid #EFF0D1'
		//consolecnv.style.backgroundColor = '#000000';
	
	  	//document.getElementById('container').appendChild(consolecnv);

	  	var textEditor = document.createElement('editor');

	  	textEditor.setAttribute('id','editor')
		textEditor.innerHTML = "Tutorial;";
		textEditor.style.position = 'absolute';
		textEditor.style.margin = 'auto';
		textEditor.style.width = canvasHeight*0.8 + 'px';
		textEditor.style.height = canvasHeight + 'px';
	  	textEditor.style.top = 0;
		textEditor.style.right = window.outerWidth/2.76 + canvasWidth*0.1 + 'px';
	  	textEditor.style.bottom = 0;
	  	textEditor.style.left = 0;
		textEditor.style.border = '1px solid #EFF0D1'

		document.getElementById('container').appendChild(textEditor);

		var editor = ace.edit('editor');
      	editor.session.setMode('ace/mode/javascript');
      	editor.setTheme("ace/theme/gob");


      	var btn = document.createElement('button');
      	btn.innerHTML = '<span style="font-size: 14px">Run</font>';
      	btn.setAttribute('id','sumbitButton');
      	btn.setAttribute('class','btn btn-success');

      	btn.style.width = textEditor.style.width;
		btn.style.height = canvasHeight*0.075 + 'px';
      	btn.style.position = 'absolute';
		btn.style.margin = 'auto';
	  	btn.style.bottom = 0;

      	document.getElementById('editor').appendChild(btn);
	}

	drawMap();

	var entityList = {}; //create a list of enemies
	var bulletList = {};

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

	Bullet = function(id, x, y, spdx, spdy, width, height) {
		var self = Entity('bullet',id,x,y,spdx,spdy,width,height,'#262730');


		var super_update = self.update;
		self.update = function() {
			super_update();
			self.timer++
			var toRemove = false;
			if (self.timer > 75) {
				toRemove = true;
			}
			
			for (var key2 in entityList) {
				var isColliding = bulletList[self.id].checkCollision(entityList[key2]);
				if(isColliding) {
					toRemove = true;
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

	generateRandomBullet = function() {
		var id = Math.random();
		var x = Player.x;
		var y = Player.y;
		var width = 10;
		var height = 10;
		var angle = Math.random()*360;
		var spdx = Math.cos(angle/180*Math.PI)*5;
		var spdy = Math.sin(angle/180*Math.PI)*5;

		Bullet(id, x, y, spdx, spdy, width, height);
	}

	createEnemy = function(id, x, y, spdx, spdy, width, height) {
		var self = Entity('enemy',id,x,y,spdx,spdy,width,height,'#D33F49');
		
		var super_update = self.update;
		self.update = function() {
			super_update();
			var isColliding = Player.checkCollision(self);
			if(isColliding) {
				Player.hp = Player.hp - 10;
			}
		}//console.log(getDistanceBetweenEntities(Player, entityList[key]));
		

		entityList[id] = self;
	}


	player = function() {
		var self = Entity('player','myId',canvasWidth/2,canvasHeight/2,30,10,20,20,'#77BA99');

		
		self.updatePosition = function() {
			if(Player.pressingDown)
				Player.y += 10;
			if(Player.pressingUp) 
				Player.y -= 10;
			if(Player.pressingLeft)
				Player.x -= 10;
			if(Player.pressingRight)
				Player.x += 10;
		

			if(Player.x < Player.width/2)
				Player.x = Player.width/2;
			if(Player.x > canvasWidth - Player.width/2)
				Player.x = canvasWidth - Player.width/2;
			if(Player.y < Player.height/2)
				Player.y = Player.height/2;
			if(Player.y > canvasHeight - Player.height/2)
				Player.y = canvasHeight - Player.height/2;
		}


		var super_update = self.update;
		self.update = function() {
			super_update();
			if (self.hp <= 0) {
				var timeSurvived = Date.now() - timeWhenGameStarted;
				console.log('Score:  ' + score + ' points');
				startNewGame();
			}
		}

		self.hp = 100;
		self.shooting = false;
		self.pressingDown = false;
		self.pressingUp = false;
		self.pressingLeft = false;
		self.pressingRight = false;
		
		return self;
	}


	function mouseMoveOver(ev) {
		/*
		var mouseX, mouseY;

		// Get the mouse position relative to the <canvas> element
		if (ev.layerX || ev.layerX == 0) { // Firefox
			mouseX = ev.layerX;
			mouseY = ev.layerY;
		} else if (ev.offsetX || ev.offsetX == 0) { // Opera
			mouseX = ev.offsetX;
			mouseY = ev.offsetY;
		}


		if(mouseX < Player.width)
			mouseX = Player.width;
		if(mouseX > canvasWidth)
			mouseX = canvasWidth;
		if(mouseY < Player.height)
			mouseY = Player.height;
		if(mouseY > canvasHeight)
			mouseY = canvasHeight;



		Player.x = mouseX - Player.width/2;
		Player.y = mouseY - Player.height/2;
		*/
	}


	checkCollisionRectRect = function(rect1, rect2) {
		return rect1.x <= rect2.x + rect2.width
			&& rect2.x <= rect1.x + rect1.width
			&& rect1.y <= rect2.y + rect2.height
			&& rect2.y <= rect1.y + rect1.height;
	}


	update = function() {
		ctx.clearRect(0, 0, canvasWidth, canvasHeight);

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

		

		Player.update();
		ctx.save();
		ctx.fillStyle = '#77BA99';
		ctx.fillText('Score: ' + score, canvasWidth/2, 10); //change to show on level completion
		ctx.fillText('Hp: ' + Player.hp, 0, 10);
		ctx.restore();
	}


	startNewGame = function() {
		Player.hp = 100;
		timeWhenGameStarted = Date.now();
		frameCount = 0;
		score = 0;
		entityList = {};
		bulletList = {};
		generateRandomEnemy();
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


	document.onkeydown = function(event) {
		if(event.keyCode == 38) 
			Player.pressingUp = true;
		if(event.keyCode == 40)
			Player.pressingDown = true;
		if(event.keyCode == 37)
			Player.pressingLeft = true;
		if(event.keyCode == 39)
			Player.pressingRight = true;
		if(event.keyCode == 83)
			generateRandomBullet();
	}


	document.onkeyup = function(event) {
		if(event.keyCode == 38) 
			Player.pressingUp = false;
		if(event.keyCode == 40)
			Player.pressingDown = false;
		if(event.keyCode == 37)
			Player.pressingLeft = false;
		if(event.keyCode == 39)
			Player.pressingRight = false;
	}


	createEvents = function() {
		cnv.addEventListener('mousemove', mouseMoveOver, false);
	}


  	//editor.on('blur', function(){
  	//	// alert(editor.getValue())
  	//	eval(editor.getValue()
  	//	)
  	//})

  	Player = player();
	createEvents();
	startNewGame();
	setInterval(update, 40);
});