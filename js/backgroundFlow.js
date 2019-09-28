var ctxB = backgroundCanvas.getContext('2d');

var xFlow = [],
yFlow = [];

var xDistance = [];
var objSize = [];

var blur =[],
speedFlow = [];

var color = [];
var colorArray = ['#2a8951','#309c5d','#1f6139','#247546'];

var flowAnimation;

startFlow();
function startFlow(){
	backgroundCanvas.width = document.documentElement.clientWidth;
	backgroundCanvas.height = document.documentElement.clientHeight;

	// Left side
	for(var i =0;i<=100;i++){
		xFlow[i] = Math.floor(Math.random() * (0.5*backgroundCanvas.width - 1) ) + 1;
		yFlow[i] = Math.floor(Math.random() * (backgroundCanvas.height - 0) ) + 0;

		xDistance[i] = 0.5*backgroundCanvas.width-xFlow[i];
		objSize[i] = Math.floor(Math.random() * (13 - 10) ) + 10;
		color[i] = colorArray[Math.floor(Math.random() * (3 - 0) ) + 0];

		blur[i] = 1;
		speedFlow[i] = Math.floor(Math.random() * (5 - 3) ) + 3;
	}
	// left side

	//right side
	for(var i =101;i<=200;i++){
		xFlow[i] = Math.floor(Math.random() * (backgroundCanvas.width - 0.5*backgroundCanvas.width) ) + 0.5*backgroundCanvas.width;
		yFlow[i] = Math.floor(Math.random() * (backgroundCanvas.height - 0) ) + 0;

		xDistance[i] = xFlow[i]-0.5*backgroundCanvas.width;
		objSize[i] = Math.floor(Math.random() * (13 - 10) ) + 10;
		color[i] = colorArray[Math.floor(Math.random() * (3 - 0) ) + 0];

		blur[i] = 1;
		speedFlow[i] = Math.floor(Math.random() * (5 - 3) ) + 3;
	}
	//right side

	flow();
	function flow(){

		ctxB.clearRect(0,0,backgroundCanvas.width,backgroundCanvas.height);

		for(var i =0;i<=100;i++){
			ctxB.save();
			ctxB.fillStyle = color[i];
			ctxB.globalAlpha = blur[i];
			ctxB.fillRect(xFlow[i],yFlow[i],objSize[i],objSize[i]);
			ctxB.restore();

			xFlow[i]+=speedFlow[i];
			blur[i]= (0.5*backgroundCanvas.width-xFlow[i]+50)/(xDistance[i]);

			if(xFlow[i]>=0.5*backgroundCanvas.width){
				xFlow[i] = Math.floor(Math.random() * (5 - 1) ) + 1;
				yFlow[i] = Math.floor(Math.random() * (backgroundCanvas.height - 0) ) + 0;

				xDistance[i] = 0.5*backgroundCanvas.width-xFlow[i];
				objSize[i] = Math.floor(Math.random() * (13 - 10) ) + 10;
				color[i] = colorArray[Math.floor(Math.random() * (3 - 0) ) + 0];

				blur[i] = 1;
				speedFlow[i] = Math.floor(Math.random() * (5 - 3) ) + 3;
			}
		}

		for(var i =101;i<=200;i++){
			ctxB.save();
			ctxB.fillStyle = color[i];
			ctxB.globalAlpha = blur[i];
			ctxB.fillRect(xFlow[i],yFlow[i],objSize[i],objSize[i]);
			ctxB.restore();

			xFlow[i]-=speedFlow[i];
			blur[i]= (xFlow[i]-0.5*backgroundCanvas.width+50)/(xDistance[i]);

			if(xFlow[i]<=0.5*backgroundCanvas.width){
				xFlow[i] = Math.floor(Math.random() * (backgroundCanvas.width - backgroundCanvas.width-5) ) + backgroundCanvas.width-5;
				yFlow[i] = Math.floor(Math.random() * (backgroundCanvas.height - 0) ) + 0;	

				xDistance[i] = xFlow[i]-0.5*backgroundCanvas.width;
				objSize[i] = Math.floor(Math.random() * (13 - 10) ) + 10;
				color[i] = colorArray[Math.floor(Math.random() * (3 - 0) ) + 0];

				blur[i] = 1;
				speedFlow[i] = Math.floor(Math.random() * (5 - 3) ) + 3;
			}
		}

		flowAnimation = requestAnimationFrame(flow);
	}
}

function resize(){    
	$("#backgroundCanvas").outerHeight($(window).height()-$("#backgroundCanvas").offset().top- Math.abs($("#backgroundCanvas").outerHeight(true) - $("#backgroundCanvas").outerHeight()));
}
$(document).ready(function(){
	resize();
	$(window).on("resize", function(){                   
    	resize();
	});
});