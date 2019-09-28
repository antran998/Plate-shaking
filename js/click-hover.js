var mouseX,mouseY;
var currButton='';
var lastButton = '';
var mouseOutSide;

var mouseInButtonAnimation;
var chipRotateAnimation;

var buttonChose = new Array();
var lastButtonChosen='';

var moneyEachButton = new Array();

for(var i = 1;i<=13;i++){
	buttonChose[i]=-1;
	if(i>=1&&i<=6){
		moneyEachButton[i]=-1;
	}
}

function highlightButton(){
	for(var i = 1;i<=6;i++){
		if(moneyEachButton[i]!=-1){
			allButtonChosen(i);
		}
	}
} 	

function eraserHoverOnButton(){ // no centerbutton
	ctx.clearRect(0,0,canvasDraw.width,canvasDraw.height);
	ctx.drawImage(board,0,0);
	ctx.drawImage(bottomButton,0,0);
	ctx.drawImage(shaker,0,0);
	ctx.drawImage(chip,226,567);
	ctx.drawImage(chipMoney,0,0);
	ctx.fillText(moneyBet, 150,610);
}
function eraserHoverOutButton(){// clear all
	ctx.clearRect(0,0,canvasDraw.width,canvasDraw.height);
	ctx.drawImage(board,0,0);
	ctx.drawImage(centerButton,0,0);
	ctx.drawImage(bottomButton,0,0);
	ctx.drawImage(shaker,0,0);
	ctx.drawImage(chip,226,567);
	ctx.drawImage(chipMoney,0,0);
	ctx.fillText(moneyBet, 150,610);
}
function eraserHoverOnChip(){ // no chipMoney
	ctx.clearRect(0,0,canvasDraw.width,canvasDraw.height);
	ctx.drawImage(board,0,0);
	ctx.drawImage(centerButton,0,0);
	ctx.drawImage(bottomButton,0,0);
	ctx.drawImage(shaker,0,0);
	ctx.drawImage(chip,226,567);
	ctx.fillText(moneyBet, 150,610);
}
function eraserShaker(){
	ctx2.clearRect(0,0,canvasDraw.width,canvasDraw.height);
	ctx2.drawImage(board,0,0);
	ctx2.drawImage(centerButton,0,0);
	ctx2.drawImage(bottomButton,0,0);
	ctx2.drawImage(chip,226,567);
	ctx2.drawImage(chipMoney,0,0);
	ctx2.font = "bold 20px serif";
	ctx2.fillStyle = "#df7f1c";
	ctx2.textAlign = "center";
	ctx2.fillText(moneyBet, 150,610);
}

canvasDraw.addEventListener('mousemove',function(e){
	mouseX = e.clientX-canvasDraw.getBoundingClientRect().left;
	mouseY = e.clientY-canvasDraw.getBoundingClientRect().top;
	hover();
})

function hover(){
	mouseOutSide=1;
	for(var i=1;i<=13;i++){
		if(ctx.isPointInPath(buttonRow2D[i], mouseX, mouseY)){
			mouseOutSide--;
			currButton=i;	
		}
	}
	if(mouseOutSide==1){
		canvasDraw.style.cursor = 'default';
		eraserHoverOutButton();
		currButton='';
		lastButton='';
		cancelAnimationFrame(chipRotateAnimation);
		cancelAnimationFrame(mouseInButtonAnimation);
		if(lastButtonChosen!=''){
			buttonChosen();
		}
		highlightButton();
	}
	else{
		if(currButton!=''){
			if(currButton!=lastButton){
				canvasDraw.style.cursor = 'pointer';
				if(currButton>=1 && currButton<=6){
					cancelAnimationFrame(mouseInButtonAnimation);
					zoomPercent=0;
					blurColor();
				}
				if(currButton>=7 && currButton<=11){
					eraserHoverOutButton();
					cancelAnimationFrame(chipRotateAnimation);
					angle=0;
					startRotate();
				}
				if(currButton>=12 && currButton<=13){
					eraserHoverOutButton();
					ctx.save();
					if(currButton==12){
						ctx.drawImage(bottomButtonBright,615,550,208,87,615,550,208,87);	
					}
					else{
						ctx.drawImage(bottomButtonBright,615+259,550,208,87,615+259,550,208,87);
					}				
					ctx.restore();
					if(lastButtonChosen!=''){
						buttonChosen();	
					}
					highlightButton();
				}
				
				lastButton=currButton;
			}
		}
	}
}
var zoomPercent;
var drawAgain = 0;
function blurColor(){
	eraserHoverOnButton();

	ctx.save();
	ctx.filter = 'opacity(0.5)';
	ctx.fillStyle = '#10153b';
	ctx.fillRect(buttonRow[currButton].x1+(buttonRow[currButton].x2/2)*(1-zoomPercent),buttonRow[currButton].y1+(buttonRow[currButton].y2/2)*(1-zoomPercent),buttonRow[currButton].x2*zoomPercent,buttonRow[currButton].y2*zoomPercent);
	ctx.restore();

	ctx.drawImage(centerButton,0,0);

	if(lastButtonChosen!=''){
		buttonChosen();
	}
	highlightButton();
	zoomPercent+=0.2;
	mouseInButtonAnimation=requestAnimationFrame(blurColor);
	if(zoomPercent>=1.2){

		cancelAnimationFrame(mouseInButtonAnimation);
	}
}

var angle=0;
var scaleChip=1;
var conditionToScaleChip = 0;
function rotateChip() {
	var chipNumber = currButton-7;
    ctx.translate(buttonRow[currButton].x1+23.5,buttonRow[currButton].y1+23.5);
    ctx.rotate(angle);
    if(conditionToScaleChip==1){
    	ctx.scale(scaleChip,scaleChip);
    	scaleChip+=0.08;
    	if(scaleChip>=1.5){
    		conditionToScaleChip=2;
    	}
    }
    if(conditionToScaleChip==2){
    	ctx.scale(scaleChip,scaleChip);
    	scaleChip-=0.08;
    	if(scaleChip<=1){
    		conditionToScaleChip=0;
    		scaleChip=1;
    	}
    }
    ctx.drawImage(chip,chip.height*chipNumber+chipNumber*10,0,chip.height,chip.height,chip.height/-2,chip.height/-2,chip.height,chip.height);

    if (angle >= 2*3.14) {
        angle = 0;
    }
    angle += 0.05;
}

function startRotate() {
	eraserHoverOnChip();
	var chipNumber = currButton-7;
   
	ctx.save();

    rotateChip();
    ctx.restore();

    ctx.drawImage(chipMoney,0,0);
    if(lastButtonChosen!=''){
		buttonChosen();		
	}
	highlightButton();
    chipRotateAnimation = requestAnimationFrame(startRotate);
}

var priceArray = ['',1,5,10,100,500];
canvasDraw.addEventListener('mousedown',function(e){
	for(var i=1;i<=13;i++){
		if(ctx.isPointInPath(buttonRow2D[i], mouseX, mouseY)){
			if(currButton>=1 && currButton<=6){
				eraserHoverOnButton();

				ctx.save();
				ctx.filter = 'opacity(0.5)';
				ctx.fillStyle = '#8dc0ff';
				ctx.fillRect(buttonRow[currButton].x1,buttonRow[currButton].y1,buttonRow[currButton].x2,buttonRow[currButton].y2);
				ctx.restore();

				ctx.drawImage(centerButton,0,0);
			}

			if(currButton>=7 && currButton<=11){
				conditionToScaleChip=1;
				moneyBet+=priceArray[currButton-6];
			}

			if(currButton>=12 && currButton<=13){
				eraserHoverOutButton();
				// if(lastButtonChosen!=''){
				// 	buttonChosen();
				// }
				ctx.save();
				if(currButton==12){
					ctx.drawImage(bottomButtonContrast,615,550,208,87,615,550,208,87);	
				}
				else{
					ctx.drawImage(bottomButtonContrast,615+259,550,208,87,615+259,550,208,87);
				}				
				ctx.restore();
								
			}
			highlightButton();
		}
	}
})

var tempNumber;
var textjumpAnimation;
var jumpCon=1;

function textJump(){
	document.getElementById('area'+lastButtonChosen).style.animation = 'MoveUpDown 0.08s';
	if(document.getElementById('area'+lastButtonChosen).innerHTML==''){
		moneyEachButton[lastButtonChosen]=moneyBet;
	}
	else{
		moneyEachButton[lastButtonChosen]+=moneyBet;
	}
	document.getElementById('area'+lastButtonChosen).innerHTML = moneyEachButton[lastButtonChosen];
	moneyBet=0;
	setTimeout(function(){
		console.log(123);
		document.getElementById('area'+lastButtonChosen).style.animation = 'none';
		lastButtonChosen='';
	},80)
}

function clearBet(){
	eraserHoverOutButton();
}

canvasDraw.addEventListener('mouseup',function(e){
	for(var i=1;i<=13;i++){
		if(ctx.isPointInPath(buttonRow2D[i], mouseX, mouseY)){
			if(currButton>=1 && currButton<=6){
				mouseUpButton();
			}
			if(currButton>=12 && currButton<=13){
				eraserHoverOutButton();
				ctx.save();
				if(currButton==12){
					ctx.drawImage(bottomButtonBright,615,550,208,87,615,550,208,87);
					if(moneyBet!=0 && lastButtonChosen!=''){
						textJump();
					}
					else{
						alertError();
					}
				}
				else{ /// clear all
					ctx.drawImage(bottomButtonBright,615+259,550,208,87,615+259,550,208,87);
					moneyBet=0;
					eraserHoverOutButton();
					for(var i = 1;i<=13;i++){
						buttonChose[i]=-1;
						if(i>=1&&i<=6){
							moneyEachButton[i]=-1;
							document.getElementById('area'+i).innerHTML='';
						}
					}
					lastButtonChosen='';

					// clear all;
				}				
				ctx.restore();
			}
			highlightButton();
		}
	}
})

function mouseUpButton(){
	eraserHoverOnButton();
				
	ctx.save();
	ctx.filter = 'opacity(0.5)';
	ctx.fillStyle = '#10153b';
	ctx.fillRect(buttonRow[currButton].x1,buttonRow[currButton].y1,buttonRow[currButton].x2,buttonRow[currButton].y2);
	ctx.restore();

	ctx.drawImage(centerButton,0,0);

	ctx.strokeStyle = '#4b0067';
	ctx.strokeStyle = 'gold';
	ctx.lineJoin = "round";
	ctx.lineWidth = '5';
	ctx.strokeRect(buttonRow[currButton].x1,buttonRow[currButton].y1,buttonRow[currButton].x2,buttonRow[currButton].y2);

	lastButtonChosen=currButton;
}

function buttonChosen(){ //single
	ctx.save();
	ctx.filter = 'opacity(0.5)';
	ctx.fillStyle = '#10153b';
	ctx.fillRect(buttonRow[lastButtonChosen].x1,buttonRow[lastButtonChosen].y1,buttonRow[lastButtonChosen].x2,buttonRow[lastButtonChosen].y2);
	ctx.restore();

	ctx.drawImage(centerButton,buttonRow[lastButtonChosen].x1,buttonRow[lastButtonChosen].y1,buttonRow[lastButtonChosen].x2,buttonRow[lastButtonChosen].y2,buttonRow[lastButtonChosen].x1,buttonRow[lastButtonChosen].y1,buttonRow[lastButtonChosen].x2,buttonRow[lastButtonChosen].y2);

	ctx.strokeStyle = '#4b0067';
	ctx.strokeStyle = 'gold';
	ctx.lineJoin = "round";
	ctx.lineWidth = '5';
	ctx.strokeRect(buttonRow[lastButtonChosen].x1,buttonRow[lastButtonChosen].y1,buttonRow[lastButtonChosen].x2,buttonRow[lastButtonChosen].y2);
}

function allButtonChosen(tempp){
	ctx.save();
	ctx.filter = 'opacity(0.5)';
	ctx.fillStyle = '#10153b';
	ctx.fillRect(buttonRow[tempp].x1,buttonRow[tempp].y1,buttonRow[tempp].x2,buttonRow[tempp].y2);
	ctx.restore();

	ctx.drawImage(centerButton,buttonRow[tempp].x1,buttonRow[tempp].y1,buttonRow[tempp].x2,buttonRow[tempp].y2,buttonRow[tempp].x1,buttonRow[tempp].y1,buttonRow[tempp].x2,buttonRow[tempp].y2);

	ctx.strokeStyle = '#4b0067';
	ctx.strokeStyle = 'gold';
	ctx.lineJoin = "round";
	ctx.lineWidth = '5';
	ctx.strokeRect(buttonRow[tempp].x1,buttonRow[tempp].y1,buttonRow[tempp].x2,buttonRow[tempp].y2);
}

document.querySelector('.cup').addEventListener('mousedown',function(){
	document.querySelector('.cup').style.backgroundImage = "url('img/cup-bright.png')";
})
document.querySelector('.cup').addEventListener('mouseup',function(){
	document.querySelector('.cup').style.backgroundImage = "url('img/cup.png')";
	spinShaker();
})
document.querySelector('.question').addEventListener('mousedown',function(){
	document.querySelector('.question').style.backgroundImage = "url('img/question-bright.png')";
})
document.querySelector('.question').addEventListener('mouseup',function(){
	document.querySelector('.question').style.backgroundImage = "url('img/question.png')";
})

var countBounceError = 0;
var errorAnimation;
function alertError(){
	canvasDraw.style.display = 'none';
	canvasDraw2.style.display = 'block';
	eraserShaker();
	ctx2.drawImage(shaker,0,0);
	
	if(countBounceError<=5|| (countBounceError>=15&&countBounceError<=20)||(countBounceError>=30&&countBounceError<=35)){
		if(moneyBet==0 && lastButtonChosen==''){
			for(var i =1;i<=11;i++){
				ctx2.save();
				ctx2.lineWidth = '3';
				ctx2.strokeStyle = 'red';
				ctx2.stroke(buttonRow2D[i]);
				ctx2.restore();
			}
			// for(var i =26;i<=33;i++){
			// 	ctx2.save();
			// 	ctx2.lineWidth = '3';
			// 	ctx2.strokeStyle = 'red';
			// 	ctx2.stroke(buttonRow2D[i]);
			// 	ctx2.restore();
			// }			
		}
		if(moneyBet==0 && lastButtonChosen!=''){
			for(var i =7;i<=11;i++){
				ctx2.save();
				ctx2.lineWidth = '3';
				ctx2.strokeStyle = 'red';
				ctx2.stroke(buttonRow2D[i]);
				ctx2.restore();
			}
		}
		if(moneyBet!=0 && lastButtonChosen==''){
			for(var i =1;i<=6;i++){
				ctx2.save();
				ctx2.lineWidth = '3';
				ctx2.strokeStyle = 'red';
				ctx2.stroke(buttonRow2D[i]);
				ctx2.restore();
			}
		}
	}
	countBounceError++;
	errorAnimation = requestAnimationFrame(alertError);
	if(countBounceError==37){
		cancelAnimationFrame(errorAnimation);
		countBounceError=0;
		canvasDraw.style.display = 'block';
		canvasDraw2.style.display = 'none';
	}
}