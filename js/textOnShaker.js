function showText(content,typeCon){
	if(typeCon==0){
		if(content==-1){
			countdown.innerHTML = '';
			showResult(0,0,0,1);
		}
		else{
			if(content<10){
				countdown.innerHTML = '0'+content;
			}
			else{
				countdown.innerHTML = content;	
			}
		}				
	}
	else{
		countdown.innerHTML = content;
	}	
}