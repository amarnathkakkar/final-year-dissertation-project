var cnv, ctx;
var textEditor, editor;
var btn;
var canvasHeight =  Math.round(  (Math.floor(window.outerHeight/1.4) ) / 100) * 100;  
var canvasWidth	 = canvasHeight;
var mapTileHeight = canvasHeight/10;
var mapTileWidth = canvasWidth/10;

var Img = {};

createCanvas = function() {
  //creating map canvas (RHS canvas)
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

  canvasHeight = cnv.height;
  canvasWidth = cnv.width;

	document.getElementById('container').appendChild(cnv);


  //creating IDE canvas (LHS canvas)
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


  //creating button at the bottom on IDE to compile code inside IDE
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


  //loading sprites/still images for all animations
	Img.player = new Image();
	Img.player.src = 'images/player.png';
	Img.enemy = new Image();
	Img.enemy.src = 'images/enemy.png';
	Img.bullet = new Image();
	Img.bullet.src = 'images/bullet.png';
	Img.map = new Image()
	Img.map.src = 'images/map.png';
}