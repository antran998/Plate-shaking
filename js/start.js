var ctx = canvasDraw.getContext('2d');
var ctx2 = canvasDraw2.getContext('2d');

var board = new Image();
var topButton = new Image();
topButton.src = 'img/top-buttons1.png';
var centerButton = new Image();
centerButton.src = 'img/center-buttons.png';
var bottomButton = new Image();
bottomButton.src = 'img/bottom-buttons.png';
var bottomButtonBright = new Image();
bottomButtonBright.src = 'img/bottom-buttons-bright.png';
var bottomButtonContrast = new Image();
bottomButtonContrast.src = 'img/bottom-buttons-contrast.png';
var chip = new Image();
chip.src = 'img/chips1.png';
var chipMoney = new Image();
chipMoney.src = 'img/chip-numbers.png';
var shaker = new Image();
shaker.src = 'img/shaker.png';

var startAnimation;
var drawOne = 0;
var moneyBet=0;

var buttonRow = new Array();
var buttonRow2D = new Array();

board.onload = function(){
	canvasDraw.width = board.width;
	canvasDraw.height = board.height;
	canvasDraw2.width = board.width;
	canvasDraw2.height = board.height;

	ctx.drawImage(board,0,0);
	drawStart();
	setPath();
}
board.src = 'img/board1.png';


function drawStart(){
	// ctx.drawImage(topButton,0,0);
	ctx.drawImage(centerButton,0,0);
	ctx.drawImage(bottomButton,0,0);
	ctx.drawImage(shaker,0,0);
	ctx.drawImage(chip,226,567);
	ctx.drawImage(chipMoney,0,0);
	ctx.font = "bold 20px serif";
	ctx.fillStyle = "#df7f1c";
	ctx.textAlign = "center";
	ctx.fillText(moneyBet, 150,610);

	startAnimation = requestAnimationFrame(drawStart);
	cancelAnimationFrame(startAnimation);
}

function setPath(){
	// choose button 6 button
	var x=482;
	for(var i=1;i<=2;i++){ 
		buttonRow2D[i] = new Path2D();
		buttonRow2D[i].rect(x,233,245,96);
		
		buttonRow[i]={
			x1:x,
			y1:233,
			x2:245,
			y2:96
		}
		x+=280;
	}
	x=482;
	for(var i=3;i<=6;i++){
		buttonRow2D[i] = new Path2D();
		buttonRow2D[i].rect(x,362,109,75);
		
		buttonRow[i]={
			x1:x,
			y1:362,
			x2:109,
			y2:75
		}
		x+=139
	}
	// choose button 6 button

	// chips
	x=250;
	for(var i=7;i<=11;i++){
		buttonRow2D[i] = new Path2D();
		buttonRow2D[i].arc(x,591,24,0,2 * Math.PI);

		buttonRow[i]={
			x1:x-24,
			y1:567,// 591-24
			x2:48,
			y2:48
		}
		// ctx.strokeRect(buttonRow[i].x1,buttonRow[i].y1,buttonRow[i].x2,buttonRow[i].y2);
		x+=57;
	}
	// chips

	// bet and abort bet
	x=615;
	for(var i=12;i<=13;i++){
		buttonRow2D[i] = new Path2D();
		buttonRow2D[i].rect(x,550,208,87);
		
		x+=259;
	}
	// bet and abort bet
	
	// shaker
	buttonRow[0] = {
		x1:146,
		y1:183,
		x2:283,
		y2:285
	}
	// shaker

	// ctx.strokeRect(255,235,60,30);
	// ctx.strokeRect(195,300,25,45);
	// ctx.strokeRect(320,300,35,35);
	// ctx.strokeRect(255,300,35,35);
	// ctx.strokeRect(255,365,60,25);
}

