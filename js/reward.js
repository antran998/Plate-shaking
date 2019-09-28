var areaWin = new Array();
for (var i = 1; i <=6; i++) {
	areaWin[i]=-1;
}

function showReward(final,ball1,ball2,ball3,ball4){ //1: win, 2: lost, 3: draw
	var sum = ball1+ball2+ball3+ball4;

	if(sum%2==0){
		areaWin[1]=1;
	}
	else{
		areaWin[2]=1;
	}
	if(sum==4){
		areaWin[3]=1;
	}
	if(sum==0){
		areaWin[4]=1;
	}
	if(sum==3){
		areaWin[5]=1;
	}
	if(sum==1){
		areaWin[6]=1;
	}

	switch (final){
		case 1:
			eruption('WIN');
			break;
		case 2:
			eruption('LOST');
			break;
		case 3:
			canvasDraw.style.display = 'none';
			canvasDraw2.style.display = 'block';
			eruption('DRAW');
			break;
	}
}

var countBounceWin = 0;
var winAnimation;
function winAnnounce(){
	canvasDraw.style.display = 'none';
	canvasDraw2.style.display = 'block';
	eraserShaker();
	ctx2.drawImage(shaker,0,0);
	
	if(countBounceWin<=5|| (countBounceWin>=15&&countBounceWin<=20)||(countBounceWin>=30&&countBounceWin<=35)){
		for(var i =1;i<=6;i++){
			if(areaWin[i]!=-1){
				ctx2.save();
				ctx2.lineWidth = '5';
				ctx2.strokeStyle = 'gold';
				ctx2.stroke(buttonRow2D[i]);
				ctx2.restore();
			}			
		}			
	}
	countBounceWin++;
}

function eruption(result){

	if(result=='WIN'){

		document.querySelector('.containerTopButtons').style.zIndex = '-1';
		document.querySelector('.cup').style.zIndex = '-1';
		document.querySelector('.question').style.zIndex = '-1';
		historyTable.style.zIndex = '-1';

	    var erupAnimation
	    var chipObj = [];

	    var emitter = {
	        x: canvasDraw.width/2,
	        y: canvasDraw.height
	    }

	    var gravity=0.5;
	    var chipAmount = 300;

	    for(var i =1;i<=500;i++){
	        chipObj[i] = {
	            x: emitter.x,
	            y: emitter.y,
	            vx: Math.floor(Math.random() * (4 + 3) ) -3,
	            vy: Math.floor(Math.random() * (-20 + 40) ) - 40,
	            radius: Math.floor(Math.random() * (60 - 40) ) + 40,
	            chipNumber: Math.floor(Math.random() * (4 - 0) ) - 0,
	        }
	    }

	    for(var i = 1;i<=13;i++){
			buttonChose[i]=-1;
			if(i>=1&&i<=6){
				moneyEachButton[i]=-1;
				document.getElementById('area'+i).innerHTML='';
			}
		}

	    emit();

	    var sizeWin = 0;

	    function emit(){

	    	// blinking button
	    	winAnnounce();
	    	// blinking button

	        for(var i =1;i<=chipAmount;i++){
	            chipObj[i].vy +=gravity;
	            chipObj[i].x += chipObj[i].vx;
	            chipObj[i].y += chipObj[i].vy;

	            ctx2.save();
	            ctx2.drawImage(chip,chip.height*chipObj[i].chipNumber+chipObj[i].chipNumber*10,0,chip.height,chip.height,chipObj[i].x,chipObj[i].y,chip.height,chip.height);
	            ctx2.restore();

	             if(chipObj[i].y<canvasDraw.height){
	                chipObj[i].cond = 1;
	            }

	            if(chipObj[i].x > canvasDraw.width ||
	                chipObj[i].x < 0 ||
	                chipObj[i].y > canvasDraw.height){

	                chipObj[i] = {
	                    x: emitter.x,
	                    y: emitter.y,
	                    vx: Math.floor(Math.random() * (4 + 3) ) -3,
	                    vy: Math.floor(Math.random() * (-20 + 40) ) - 40,
	                    radius: Math.floor(Math.random() * (60 + 40) ) - 40,
	                    chipNumber: Math.floor(Math.random() * (4 - 0) ) - 0
	                }
	            }
	        }
	        if(chipAmount<500){
	            chipAmount++;
	        }

	        // text blurring
	        blurText();
	        // text blurring

	        erupAnimation = requestAnimationFrame(emit);

	        if(countBounceWin==500){
				cancelAnimationFrame(erupAnimation);
				countBounceWin=0;
				moneyBet=0;
				eraserHoverOutButton();
				
				lastButtonChosen='';

				document.querySelector('.containerTopButtons').style.zIndex = '10';
				document.querySelector('.moneyAmount').style.zIndex = '12';
				document.querySelector('.cup').style.zIndex = '12';
				document.querySelector('.question').style.zIndex = '12';
				historyTable.style.zIndex = '12';

				canvasDraw.style.display = 'block';
				canvasDraw2.style.display = 'none';

				size = 50;
				// document.querySelector('.win-container').style.display = 'none';
			}
	    }
	}

	var showLODAnimation;
	if(result=='LOST' || result=='DRAW'){
		for(var i = 1;i<=13;i++){
			buttonChose[i]=-1;
			if(i>=1&&i<=6){
				moneyEachButton[i]=-1;
				document.getElementById('area'+i).innerHTML='';
			}
		}

		showLostOrDraw()
		function showLostOrDraw(){
			// blinking button
	    	winAnnounce();
	    	// blinking button

			blurText();

			showLODAnimation = requestAnimationFrame(showLostOrDraw);

			if(size>=200){
				cancelAnimationFrame(showLODAnimation);
				countBounceWin=0;
				moneyBet=0;
				eraserHoverOutButton();

				lastButtonChosen='';

				document.querySelector('.containerTopButtons').style.zIndex = '10';
				document.querySelector('.cup').style.zIndex = '12';
				document.querySelector('.question').style.zIndex = '12';
				historyTable.style.zIndex = '12';
				canvasDraw.style.display = 'block';
				canvasDraw2.style.display = 'none';

				size = 50;				
			}
		}
	}

    var size = 50;
	function blurText(){
		ctx2.save();
		ctx2.font = size+"px grobold";
		if(result=='WIN'){
			ctx2.fillStyle = "#ffd700";
		}
		if(result=='LOST'){
			ctx2.fillStyle = "#ff0000";
		}
		if(result=='DRAW'){
			ctx2.fillStyle = "#FFF";
		}
		ctx2.textAlign = "center";
		
		ctx2.fillText(result, canvasDraw2.width/2, canvasDraw2.height/2);
		ctx2.restore();

		size +=0.28;
	}
}
