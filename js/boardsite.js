// format money type
function numberWithDots(x) {
	x=x.toString();
    return x.replace(/\B(?=(\d{3})+(?!\d))/," "); // \B not boundary \d{3} 3 digit /d 
}
// format money type


function showMoney(money){
	document.querySelector('.moneyAmount').innerHTML = numberWithDots(money.toFixed(2));
}
showMoney(500);


var lls = [0,1,1,0,1,1,1,0,0,0,1,1,0,1,1,0,0,1,0,1,0,0,0,0,1,1,0,0,1];

historyBoard(lls)
function historyBoard(histArray){
	var countRow = 1;
	for(var i = 0;i<6;i++){
		for(var j=0;j<4;j++){
			var temp = j.toString()+i.toString();

			if(histArray[histArray.length-countRow]==1){
				document.getElementById('hist'+temp).style.backgroundImage = 'url("img/ball1.png")';
				document.getElementById('hist'+temp).style.backgroundRepeat = 'no-repeat';
				document.getElementById('hist'+temp).style.backgroundPosition = '2px 2px';	
			}
			else if(histArray[histArray.length-countRow]==0){
				document.getElementById('hist'+temp).style.backgroundImage = 'url("img/ball1.png")';
				document.getElementById('hist'+temp).style.backgroundRepeat = 'no-repeat';
				document.getElementById('hist'+temp).style.backgroundPosition = '-28px 2px';
			}

			countRow++;
		}
	}	
}

// document.getElementById('hist'+'0'+0).style.backgroundImage = 'url("img/ball1.png")';
// document.getElementById('hist'+'0'+0).style.backgroundPosition = '2px 2px';
// document.getElementById('hist'+'0'+0).style.backgroundRepeat = 'no-repeat';

// document.getElementById('hist'+'1'+0).style.backgroundImage = 'url("img/ball1.png")';
// document.getElementById('hist'+'1'+0).style.backgroundPosition = '-28px 2px';
// document.getElementById('hist'+'1'+0).style.backgroundRepeat = 'no-repeat';
