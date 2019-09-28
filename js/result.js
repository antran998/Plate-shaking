var ball = new Image();
ball.src = 'img/ball.png';
var ballAnimation;
var shakerArea=[
	[''],
	[0,255,235,60,30],
	[0,195,300,25,45],
	[0,320,300,35,35],
	[0,255,300,35,35],
	[0,255,365,60,25]
];
var countBall=1;

function showResult(ball1,ball2,ball3,ball4){
	canvasDraw2.style.display = 'block';
	canvasDraw.style.display = 'none';

	var ballArray=['',ball1,ball2,ball3,ball4];
	var areaArray = new Array();

	//1=red,0=green;
	
	while(countBall<=4){
		areaArray[countBall] = Math.floor(Math.random() * 5) + 1;
		if(shakerArea[areaArray[countBall]][0]==0){
			shakerArea[areaArray[countBall]][0]=1;
			countBall++;
		}
	}
	for(var i =1;i<=4;i++){
		var maxX=shakerArea[areaArray[i]][1] + shakerArea[areaArray[i]][3];
		var maxY =shakerArea[areaArray[i]][2] + shakerArea[areaArray[i]][4];

		var xPlate = Math.floor(Math.random() * (maxX-shakerArea[areaArray[i]][1]) + shakerArea[areaArray[i]][1]);//////
		var yPlate = Math.floor(Math.random() * (maxY-shakerArea[areaArray[i]][2]) + shakerArea[areaArray[i]][2]);/////

		if(ballArray[i]==1){
			ctx2.save()
			ctx2.scale(0.4,0.4);
			ctx2.drawImage(ball,0,0,ball.height,ball.height,xPlate/0.4,yPlate/0.4,ball.height,ball.height);	
			ctx2.restore();
		}
		else{
			ctx2.save()
			ctx2.scale(0.4,0.4);
			ctx2.drawImage(ball,ball.height+15,0,ball.height,ball.height,xPlate/0.4,yPlate/0.4,ball.height,ball.height);	
			ctx2.restore();
		}
	}
		
	
	ballAnimation = requestAnimationFrame(showResult);
	cancelAnimationFrame(ballAnimation);
	for(var i=1;i<=4;i++){
		shakerArea[i][0]=0;
	}
	countBall=1;

	setTimeout(function(){
		showReward(1,ball1,ball2,ball3,ball4);
	},2000)	
}