$( document ).ready(function() {
	var cnv, ctx;
	var consolecnv, consolectx;
	var textEditor, editor;
	var canvasOffset, offsetX, offsetY;
	//var canvasWidth = window.outerWidth/1.4;
	var canvasHeight = window.outerHeight/1.4;
	var canvasWidth	 = canvasHeight;
	var timeWhenGameStarted = Date.now();
	var frameCount;

	drawMap = function() {
	  	cnv = document.createElement('canvas');
	  	ctx = cnv.getContext("2d");

	  	consolecnv = document.createElement('canvas');
	  	consolectx = consolecnv.getContext("2d");
		
		
	  	cnv.setAttribute('id','mapCanvas')
		cnv.width  = canvasWidth;
	  	cnv.height = canvasHeight;
	  	cnv.style.position = 'absolute';
	  	cnv.style.margin = 'auto';
	  	cnv.style.left = window.outerWidth/2.75 - canvasWidth*0.1 + 'px';
	  	cnv.style.top = 0;
	  	cnv.style.bottom = 0;
	  	cnv.style.right = 0;


	  	cnv.style.border = '1px solid #EFF0D1';
	  	cnv.style.backgroundColor = '#EFF0D1';


		consolecnv.setAttribute('id','consoleCanvas')
		consolecnv.width = canvasHeight*0.8;
		consolecnv.height = canvasHeight;
		consolecnv.style.position = 'absolute';
		consolecnv.style.margin = 'auto';
		consolecnv.style.right = window.outerWidth/2.75 + canvasWidth*0.1 + 'px';
	  	consolecnv.style.top = 0;
	  	consolecnv.style.bottom = 0;
	  	consolecnv.style.left = 0;

		consolecnv.style.border = '1px solid #EFF0D1'
		consolecnv.style.backgroundColor = '#000000';
	
		document.getElementById('container').appendChild(cnv);
	  	document.getElementById('container').appendChild(consolecnv);
	  	


	  	//<div id="editor">
	    //  function foo(items) {
	    //  var x = "All this is syntax highlighted";
	    //  return x;
	    //  }
	    //</div>

	  	//var textEditor = document.getElementById('editor');


	  	var textEditor = document.createElement('editor');
	  	textEditor.setAttribute('id','editor')
		textEditor.innerHTML = "Tutorial;";
		textEditor.style.position = 'absolute';
		textEditor.style.margin = 'auto';
		textEditor.style.width = consolecnv.width + 'px';
		textEditor.style.height = consolecnv.height + 'px';
	  	textEditor.style.top = 0;
		textEditor.style.right = consolecnv.style.right;
	  	textEditor.style.bottom = 0;
	  	textEditor.style.left = 0;
		textEditor.style.border = '1px solid #EFF0D1'

		document.getElementById('container').appendChild(textEditor);

		var editor = ace.edit('editor');
      	editor.session.setMode('ace/mode/javascript');
      	editor.setTheme("ace/theme/gob");


      	
      	

      	//editor.on('blur', function(){
      	//	alert(editor.getValue())
      	//})
	}

	drawMap();

	var entityList = {}; //create a list of enemies
	var Player = { //define our Player
		name:'O',
		x:canvasWidth/2,
		y:canvasHeight/2,
		spdx:30,
		spdy:10,
		hp:100,
		width:20,
		height:20,
		color:'#77BA99',
		pressingDown:false,
		pressingUp:false,
		pressingLeft:false,
		pressingRight:false
	}

	createEntity = function(id, x, y, spdx, spdy, width, height) {
		
		var entity = {
			name:'X',
			x:x,
			y:y,
			spdx:spdx,
			spdy:spdy,
			id:id,
			width:width,
			height:height,
			color:'#D33F49'
		}

		entityList[id] = entity;
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

	updateEntityPosition = function(entity) {
		entity.x += entity.spdx;
		entity.y += entity.spdy;
			

		if (entity.x >= canvasWidth || entity.x <= 0) {
			entity.spdx = -entity.spdx;
		} 
		if (entity.y >= canvasHeight || entity.y <= 0) {
			entity.spdy = -entity.spdy;
		} 
	}

	drawEntity = function(entity) {
		ctx.save();
		ctx.fillStyle = entity.color;
		ctx.fillRect(entity.x-entity.width/2, entity.y-entity.height/2, entity.width, entity.height);
		ctx.restore();
	}

	updateEntity = function(entity) {
		updateEntityPosition(entity);
		drawEntity(entity);
	}

	getDistanceBetweenEntities = function(entity1, entity2) {
		var xDist = entity1.x - entity2.x;
		var yDist = entity1.y - entity2.y;

		return Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2))
	}

	checkCollisionRectRect = function(rect1, rect2) {
		return rect1.x <= rect2.x + rect2.width
			&& rect2.x <= rect1.x + rect1.width
			&& rect1.y <= rect2.y + rect2.height
			&& rect2.y <= rect1.y + rect1.height;
	}

	checkCollisionEntity = function(entity1, entity2) { //returns true or false
		var rect1 = {
			x:entity1.x - entity1.width/2,
			y:entity1.y - entity1.height/2,
			width:entity1.width,
			height:entity1.width
		}

		var rect2 = {
			x:entity2.x - entity2.width/2,
			y:entity2.y - entity2.height/2,
			width:entity2.width,
			height:entity2.width
		}


		return checkCollisionRectRect(rect1, rect2);
	}

	update = function() {
		ctx.clearRect(0, 0, canvasWidth, canvasHeight);

		frameCount++;

		if (frameCount % 100 == 0) {
			generateRandomEnemy();
		}

		for (var key in entityList) {	
			updateEntity(entityList[key]);
		
			var isColliding = checkCollisionEntity(Player, entityList[key]);
			if(isColliding) {
				Player.hp = Player.hp - 10;
				
				//console.log(getDistanceBetweenEntities(Player, entityList[key]));
			}
		}

		if (Player.hp <= 0) {
			var timeSurvived = Date.now() - timeWhenGameStarted;
			console.log('You Died! You survived for ' + timeSurvived + ' ms.');
			startNewGame();
		}

		updatePlayerPosition();
		drawEntity(Player);
		ctx.save();
		ctx.fillStyle = '#77BA99';
		ctx.fillText('Hp: ' + Player.hp, 0, 10);
		ctx.restore();
	}

	startNewGame = function() {
		Player.hp = 100;
		timeWhenGameStarted = Date.now();
		frameCount = 0;
		entityList = {};
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

		createEntity(id, x, y, spdx, spdy, width, height);
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


	updatePlayerPosition = function() {
		if(Player.pressingUp) 
			Player.y -= 10;
		if(Player.pressingDown)
			Player.y += 10;
		if(Player.pressingLeft)
			Player.x -= 10;
		if(Player.pressingRight)
			Player.x += 10;
	}


	createEvents = function() {
		cnv.addEventListener('mousemove', mouseMoveOver, false);
	}

	createEvents();
	startNewGame();
	setInterval(update, 40);
});