var spinningShaker;

var speed = 1;
var reverse =0;

function spinShaker(){
	canvasDraw2.style.display = 'block';
	canvasDraw.style.display = 'none';
	eraserShaker();

	ctx2.save();
	ctx2.translate(148+280/2,188+282/2);
	ctx2.rotate(speed * Math.PI / 180);
	ctx2.drawImage(shaker,148,188,280,282,-140,-141,280,282);
	ctx2.restore();
	
	if(reverse==0){
		speed*=1.05;
		if(speed>=360*150+5){
			reverse=1;
		}
	}
	else{
		speed/=1.02;
	}
	highlightButtonDraw2()
	spinningShaker = requestAnimationFrame(spinShaker);

	if(speed<=1){
		speed = 1;
		reverse=0;
		cancelAnimationFrame(spinningShaker);
		eraserShaker();
		ctx2.drawImage(shaker,0,0);
		cancelAnimationFrame(spinningShaker);
		canvasDraw.style.display = 'block';
		canvasDraw2.style.display = 'none';

		// Phụ
		var counting = 5;
		var textCount = setInterval(function(){
			showText(counting,0);/// Hàm cần
			counting--;

			if(counting==-2){
				clearInterval(textCount);
			}
		},1000)
		// Phụ
	}
	
}

function highlightButtonDraw2(){
	for(var i = 1;i<=6;i++){
		if(moneyEachButton[i]!=-1){
			allButtonChosenDraw2(i);
		}
	}
}
function allButtonChosenDraw2(tempp){
	ctx2.save();
	ctx2.filter = 'opacity(0.5)';
	ctx2.fillStyle = '#10153b';
	ctx2.fillRect(buttonRow[tempp].x1,buttonRow[tempp].y1,buttonRow[tempp].x2,buttonRow[tempp].y2);
	ctx2.restore();

	ctx2.drawImage(centerButton,buttonRow[tempp].x1,buttonRow[tempp].y1,buttonRow[tempp].x2,buttonRow[tempp].y2,buttonRow[tempp].x1,buttonRow[tempp].y1,buttonRow[tempp].x2,buttonRow[tempp].y2);

	ctx2.strokeStyle = '#4b0067';
	ctx2.strokeStyle = 'gold';
	ctx2.lineJoin = "round";
	ctx2.lineWidth = '5';
	ctx2.strokeRect(buttonRow[tempp].x1,buttonRow[tempp].y1,buttonRow[tempp].x2,buttonRow[tempp].y2);
}