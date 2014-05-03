function run(){
	if(typeof(minutes)!='undefined'&typeof(seconds)!='undefined'){
		console.log('还剩'+minutes+'分'+seconds+'秒');
	}
	if(document.getElementById("string").innerHTML=='此课件观看时长已满足！'){
		console.log('--------');
		thisPlayer.pause();//暂停播放
		if(task.length>0){
			setTimeout(function(){
				window.location=document.getElementById('nextUrl').value;
			},180000);	
		}
		clearInterval(auto_play);//停止轮询
	}
	if(thisPlayer.getState()=='PAUSED'&&document.getElementById('RecordBut').disabled==true||
	   thisPlayer.getState()=='IDLE'&&document.getElementById('RecordBut').disabled==true){
		thisPlayer.play();
	}
	if(minutes==0&&seconds==0&&document.getElementById('RecordBut').disabled==false){
		document.getElementById('RecordBut').click();
		document.getElementById('RecordBut').disabled = 'true';
	}
}

auto_play = setInterval('run()',30000);