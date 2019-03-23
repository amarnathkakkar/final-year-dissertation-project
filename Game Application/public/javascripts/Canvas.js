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
  cnv.style.border = '1px dashed white';

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
	textEditor.style.border = '1px solid white'

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

	btn.addEventListener('click', function(event) {
	  compileCode();
	});


  //button when clicked should display a pop-up with game instructions
  helpBtn = document.createElement('button');
  helpBtn.innerHTML = '<span style="font-size: 14px">Help</font>';
  helpBtn.setAttribute('id','helpButton');
  helpBtn.setAttribute('class','btn btn-secondary');

  helpBtn.style.position = 'absolute';
  helpBtn.style.top = '15px';
  helpBtn.style.left = '10px';
  document.getElementById('container').appendChild(helpBtn);

  helpBtn.addEventListener('click', function(event) {
    helpModal.style.display = 'block';
  });

  //creating the popup to display instructions, when helpBtn clicked
  helpModal = document.createElement('div');
  helpModal.setAttribute('id','helpModal');
  helpModal.setAttribute('class','modal');
  document.getElementById('container').appendChild(helpModal);

  helpContent = document.createElement('div');
  helpContent.setAttribute('class', 'modal-content');
  helpModal.appendChild(helpContent);

  helpClose = document.createElement('span');
  helpClose.setAttribute('class', 'closeBtn')
  helpClose.innerHTML = '&times;'
  helpContent.appendChild(helpClose);

  helpText = document.createElement('p');
  helpText.style.margin = '0rem';
  helpText.innerHTML = "<span style='color: grey;'>" +
  "<strong>Goals:</strong>" + 
  "<ul><br><li>Get to the red exit tile to escape, shooting any enemies in the way.</li>" +
  "<li>Use the functions below in <span style='color: #66b28c;'>'for'</span> loops and <span style='color: #538cc6;'>'if'</span> statements to help you.</li></ul>" + 
  "<strong>Functions:</strong></br>" + 
  "<ul><br><li><b>player.move('left/right/up/down')</li></b>" + 
  "<small>(Takes one argument) You move one tile left, right, up or down from your current position</small></br>" + 
  "<b><li>player.shoot('left/right/up/down')</li></b>" +
  "<small>(Takes one argument) You shoot left, right, up or down from your current position</small>" +
  "<br><li><span style='color: #538cc6;'><b>wallPosition('left/right/up/down')</b></span></li>" +
  "<small>(Takes one argument) Returns True if there is a wall left, right, up or down next to you, else False</small>" +
  "<br><li><span style='color: #538cc6;'><b>enemyPosition('left/right/up/down')</b></span></li>" +
  "<small>(Takes one argument) Returns True if there is an enemy 1 tile left, right, up or down from you, else False</small></ul>" +
  "<strong>Format:</strong></br>" + 
  "<br><ul><li><span style='color: #66b28c;'>for (declare variable; condition to be met; increment or decrement)</span></li>" +
  "<small>E.g. for (var x=0; x<10; x++) { code } - executes code if condition is met, and then increases x by 1 for each loop</small></br>" +
  "<li><span style='color: #538cc6;'>if (condition) { code }</span></li>" +
  "<small>E.g. if ( enemyPosition('right') ) { player.shoot('right') } - if enemyPosition returns true, then player will shoot.</small></br></ul>" +
  "<strong>Scoring:</strong></br>" + 
  "<ul><br><li>Complete all mazes as fast as you can to score maximum points.</li>" +
  "<li>Shooting a bat = +1000 points</li>" + 
  "<li>Dying to a bat = -2000 points</br></li></ul>" + 
  "<strong>Extra:</strong></br>" + 
  "<ul><br><li>Use the Reset button in the top right of the screen to reset your character back to his intial position.</br></li>" +
  "<li>The current level can be seen at the top of the page.</li><ul>" +
  "</span>";
  helpContent.appendChild(helpText);

  var span = document.getElementsByClassName("closeBtn")[0];

  span.onclick = function() {
    helpModal.style.display = "none";
  }

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
    if (event.target == helpModal) {
      helpModal.style.display = "none";
    }
  }


  //button when clicked should reset back to the start of the current level
  resetBtn = document.createElement('button');
  resetBtn.innerHTML = '<span style="font-size: 14px">Reset Level</font>';
  resetBtn.setAttribute('id','resetButton');
  resetBtn.setAttribute('class','btn btn-secondary');

  resetBtn.style.position = 'absolute';
  resetBtn.style.top = '15px';
  resetBtn.style.right = '10px';

  document.getElementById('container').appendChild(resetBtn);

  resetBtn.addEventListener('click', function(event) {
    restartLevel();
    tempAlert('Level Reset', 1000);
  });


  //button that is used to display what the current level is
  levelDisplay = document.createElement('button');
  levelDisplay.setAttribute('id','levelDisplayBtn');
  levelDisplay.setAttribute('class','btn btn-outline-secondary');
  levelDisplay.innerHTML =  '<span style="font-size: 14px">Current Level: 0/Calculating...</font>'

  levelDisplay.style.position = 'absolute';
  levelDisplay.style.top = '2%';
  levelDisplay.style.left = '42%';

  document.getElementById('container').appendChild(levelDisplay);


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

function tempAlert (msg,duration) {
    var el = document.createElement("div");
    el.setAttribute("style","position:absolute;top:48%;left:45%;background-color:black;");
    el.innerHTML = '<span style="font-size: 18px; color: green;">' + msg + '</font>';
    setTimeout(
      function(){
        el.parentNode.removeChild(el);
      }
      , duration);
    document.getElementById('container').appendChild(el);
}