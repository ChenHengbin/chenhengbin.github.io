var last_remains;  //上次还剩余的时间

var setTime = setInterval(function(){   //设置为15分钟
	if(document.getElementById('ChangeTimer15')){
		document.getElementById('ChangeTimer15').click();
		console.log("已设置为:15分钟!");
		last_remains = 900;
		clearInterval(setTime);
	}
},1500);

function run(){
	if(thisPlayer.getState()=='BUFFERING'){  //如果正在缓冲状态,则将其设置为播放
		thisPlayer.play();
	} 

	if(typeof(minutes)!='undefined'&&typeof(seconds)!='undefined'&&minutes!=0&&seconds!=0){
		console.log('remains: '+minutes+' minutes '+seconds+' seconds');
		if(last_remains-(minutes*60+seconds)<=11){   //网速不够，卡住了，重新播放
			thisPlayer.seek(0);
		}
		last_remains = minutes*60+seconds;
	}
	
	if(document.getElementById("string").innerHTML=='此课件观看时长已满足！'){
		thisPlayer.pause();//暂停播放

		if(document.getElementById('nextUrl')){
			var url = document.getElementById('nextUrl').value;
			console.log('------------url---------------');
			console.log('本视频已看完,3分钟后将播放的视频地址是:\n'+url);
			setTimeout(function(){ 
				setInterval(function(){   //打开新窗口的条件：(1)上次操作间隔(2)当前播放视频数量
					if(new Date().getTime() - localStorage.lastActiveTime >= localStorage.maxInterval&&
						localStorage.currentPlayCount<localStorage.maxPlayCount){
						window.location = url;
						localStorage.currentPlayCount--;
						clearInterval(this);
					}
					// console.log('当前视频数量:'+localStorage.currentPlayCount);
					// console.log('距离上次操作时间：'+(new Date().getTime()-parseInt(localStorage.lastActiveTime))/1000+'秒');
				},10000);
			},parseInt(localStorage.maxInterval));	
		}
		clearInterval(auto_play);
		return;
	}

	if(thisPlayer.getState()=='PAUSED'&&document.getElementById('RecordBut').disabled==true||
	   thisPlayer.getState()=='IDLE'&&document.getElementById('RecordBut').disabled==true){
		thisPlayer.play();
	}

	if(minutes==0&&seconds==0&&document.getElementById('RecordBut').disabled==false&&
		new Date().getTime() - localStorage.lastActiveTime >= localStorage.maxInterval){
		var minus = thisPlayer.getDuration() - (parseInt(document.getElementById("RecordTime").innerHTML)+nsTimer)*60;
		document.getElementById('RecordBut').click();
		document.getElementById('RecordBut').disabled = 'true';
		localStorage.lastActiveTime = new Date().getTime; 
		if(minus<=180){
			document.getElementById('ChangeTimer1').click();	
			last_remains = 60;
		}else if(minus<=500){
			document.getElementById('ChangeTimer5').click();
			last_remains = 300;
		}else if(minus<=750){
			document.getElementById('ChangeTimer10').click(); 	
			last_remains = 600;
		}else{
			document.getElementById('ChangeTimer15').click();
			last_remains = 900;
		}
	}
}

auto_play = setInterval('run()',15000);

