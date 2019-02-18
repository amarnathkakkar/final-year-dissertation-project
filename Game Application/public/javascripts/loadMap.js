var cnv, ctx;
var textEditor, editor;
var btn;
var canvasHeight = (window.outerHeight/1.4);
var canvasWidth	 = canvasHeight;
var mapTileHeight = Math.round(  (Math.floor(canvasHeight/10) ) / 10) * 10; 
var mapTileWidth = Math.round(  (Math.floor(canvasWidth/10) ) / 10) * 10; 

console.log(canvasHeight);
//var consolecnv, consolectx;
//var canvasOffset, offsetX, offsetY;
//var canvasWidth = window.outerWidth/1.4;

var Img = {};

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
  	cnv.style.border = '1px dashed #EFF0D1';
  	//cnv.style['z-index'] = 0;
  	//cnv.style.backgroundColor = '#EFF0D1';

  	canvasHeight = cnv.height;
  	canvasWidth = cnv.width;

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

  	textEditor = document.createElement('editor');

  	textEditor.setAttribute('id','editor')
	textEditor.innerHTML = "Tutorial;";
	textEditor.style.position = 'absolute';
	textEditor.style.margin = 'auto';
	textEditor.style.width = canvasHeight*0.8 + 'px';
	textEditor.style.height = canvasHeight+1 + 'px';
  	textEditor.style.top = 0;
	textEditor.style.right = window.outerWidth/2.76 + canvasWidth*0.1 + 'px';
  	textEditor.style.bottom = 0;
  	textEditor.style.left = 0;
	textEditor.style.border = '1px solid #EFF0D1'

	document.getElementById('container').appendChild(textEditor);

	editor = ace.edit('editor');
  	editor.session.setMode('ace/mode/javascript');
  	editor.setTheme("ace/theme/gob");


  	btn = document.createElement('button');
  	btn.innerHTML = '<span style="font-size: 14px">Run</font>';
  	btn.setAttribute('id','sumbitButton');
  	btn.setAttribute('class','btn btn-success');

  	btn.style.width = textEditor.style.width;
	btn.style.height = canvasHeight*0.075 + 'px';
  	btn.style.position = 'absolute';
	btn.style.margin = 'auto';
  	btn.style.bottom = 0;

  	textEditor.appendChild(btn);

	btn.addEventListener('click', (event) => {
	  compileCode();
	});


	Img.player = new Image();
	Img.player.src = 'images/player.png';
	Img.enemy = new Image();
	Img.enemy.src = 'images/enemy.png';
	Img.bullet = new Image();
	Img.bullet.src = 'images/bullet.png';
	Img.map = new Image()
	Img.map.src = 'images/map.png';
}