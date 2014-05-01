setInterval(function(){
	console.log('还剩'+minutes+'分'+seconds+'秒');
	if($('#string').html()=='此课件观看时长已满足！'){
		window.close();
	}
	if(thisPlayer.getState()=='PAUSED'&&document.getElementById('RecordBut').disabled==true||
	   thisPlayer.getState()=='IDLE'&&document.getElementById('RecordBut').disabled==true){
		thisPlayer.play();
	}
	if(minutes==0&&seconds==0&&document.getElementById('RecordBut').disabled==false){
		document.getElementById('RecordBut').click();
		document.getElementById('RecordBut').disabled = 'true';
	}
},30000);