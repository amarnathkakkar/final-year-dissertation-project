calcPlayerBufferedPos = function() {
	var x = player.x; 
	var y = player.y;

	for (i = 0; i < Player.bufferedActionsArray.length; i++) { 
		
		var rBumper = {type:'bufferingPlayerPos', x:x + player.width/2, y:y};
		var lBumper = {type:'bufferingPlayerPos', x:x - player.width/2, y:y};
		var tBumper = {type:'bufferingPlayerPos', x:x, y:y - player.height/2};
		var bBumper = {type:'bufferingPlayerPos', x:x, y:y + player.height/2};

		if(Player.bufferedActionsArray[i][1] == 'move') {

			if(Player.bufferedActionsArray[i][0] == 'right' && (Maps.current.isPositionWall(rBumper) == 0))
				x += mapTileWidth;
			else if(Player.bufferedActionsArray[i][0] == 'left' && (Maps.current.isPositionWall(lBumper) == 0))
				x -= mapTileWidth;
			else if(Player.bufferedActionsArray[i][0] == 'up' && (Maps.current.isPositionWall(tBumper) == 0)) 
				y -= mapTileHeight;
			else if(Player.bufferedActionsArray[i][0] == 'down' && (Maps.current.isPositionWall(bBumper) == 0))
				y += mapTileHeight;
		}
	}
	return [x, y];
}

enemyPosition = function (direction) {
	var bufferedPos = calcPlayerBufferedPos();
	var x = bufferedPos[0];
	var y = bufferedPos[1];


	for (var key in Enemy.list) {
		var b = Enemy.list[key];

		if (direction == 'right') {
			if (x < b.x
				&& x + halvedMapTileWidth + mapTileWidth > b.x 
				&& y > b.y - halvedMapTileHeight 
				&& y < b.y + halvedMapTileHeight) {
					return true;
			}
		}
		else if (direction == 'left') {
			if (x > b.x
				&& x - halvedMapTileWidth - mapTileWidth < b.x 
				&& y > b.y - halvedMapTileHeight 
				&& y < b.y + halvedMapTileHeight) {
					return true;
			}
		}
		else if (direction == 'up') {
			if (y > b.y
				&& y - halvedMapTileHeight - mapTileHeight < b.y 
				&& x > b.x - halvedMapTileWidth 
				&& x < b.x + halvedMapTileWidth) {
					return true;
			}
		}
		else if (direction == 'down') {
			if (y < b.y
				&& y + halvedMapTileHeight + mapTileHeight > b.y 
				&& x > b.x - halvedMapTileWidth 
				&& x < b.x + halvedMapTileWidth) {
					return true;
			}
		}
	}
}

wallPosition = function (direction) {
	var bufferedPos = calcPlayerBufferedPos();
	var x = bufferedPos[0];
	var y = bufferedPos[1];

	var rBumper = {type:'bufferedPlayerPos', x:x + player.width/2, y:y};
	var lBumper = {type:'bufferedPlayerPos', x:x - player.width/2, y:y};
	var tBumper = {type:'bufferedPlayerPos', x:x, y:y - player.height/2};
	var bBumper = {type:'bufferedPlayerPos', x:x, y:y + player.height/2};

	if(direction == 'down' && Maps.current.isPositionWall(bBumper))
		return true;
	if (direction == 'up' && Maps.current.isPositionWall(tBumper))
		return true;
	if (direction == 'left' && Maps.current.isPositionWall(lBumper))
		return true;
	if (direction == 'right' && Maps.current.isPositionWall(rBumper))
		return true;
}