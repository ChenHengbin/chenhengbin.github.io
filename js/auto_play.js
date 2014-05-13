var setTime = setInterval(function(){   //设置为10分钟
	if(document.getElementById('ChangeTimer10')){
		document.getElementById('ChangeTimer10').click();
		console.log("已设置为:10分钟!");
		clearInterval(setTime);
	}
},1000);

function run(){
	if(typeof(minutes)!='undefined'&&typeof(seconds)!='undefined'){
		console.log('remains: '+minutes+' minutes '+seconds+' seconds');
	}
	if(document.getElementById("string").innerHTML=='此课件观看时长已满足！'){
		thisPlayer.pause();//暂停播放
		var url = document.getElementById('nextUrl').value;
		console.log('------------url---------------');
		console.log('本视频已看完,3分钟后将播放的视频地址是:\n'+url);
		setTimeout(function(){
				window.location=url;
		},180000);	
		clearInterval(auto_play);//停止轮询
		return;
	}
	if(thisPlayer.getState()=='PAUSED'&&document.getElementById('RecordBut').disabled==true||
	   thisPlayer.getState()=='IDLE'&&document.getElementById('RecordBut').disabled==true){
		thisPlayer.play();
	}
	if(minutes==0&&seconds==0&&document.getElementById('RecordBut').disabled==false){
		document.getElementById('RecordBut').click();
		var minus = thisPlayer.getDuration() - parseInt(document.getElementById("RecordTime").innerHTML)*60;
		if(minus<=60){
			document.getElementById('ChangeTimer1').click();	
		}else if(minus<=300){
			document.getElementById('ChangeTimer5').click();
		}else{
			document.getElementById('ChangeTimer10').click(); 	
		}
		document.getElementById('RecordBut').disabled = 'true';
	}
}

auto_play = setInterval('run()',15000);