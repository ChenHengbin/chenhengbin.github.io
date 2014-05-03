function run(){
	if(typeof(minutes)!='undefined'&typeof(seconds)!='undefined'){
		console.log('remains:'+minutes+'minutes'+seconds+'seconds');
	}
	if(document.getElementById("string").innerHTML=='此课件观看时长已满足！'){
		thisPlayer.pause();//暂停播放
		var url = document.getElementById('nextUrl').value;
		console.log('------------url---------------');
		console.log(url);
		setTimeout(function(){
				window.location=url;
		},180000);	
		clearInterval(auto_play);//停止轮询
	}
	if(thisPlayer.getState()=='PAUSED'&&document.getElementById('RecordBut').disabled==true||
	   thisPlayer.getState()=='IDLE'&&document.getElementById('RecordBut').disabled==true){
		thisPlayer.play();
	}
	if(minutes==0&&seconds==0&&document.getElementById('RecordBut').disabled==false){
		document.getElementById('RecordBut').click();
		document.getElementById('ChangeTimer10').click(); 
		document.getElementById('RecordBut').disabled = 'true';
	}
}

auto_play = setInterval('run()',30000);