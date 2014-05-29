﻿var last_remains;  //上次还剩余的时间

var setTime = setInterval(function(){   //设置为10分钟
	if(document.getElementById('ChangeTimer10')){
		document.getElementById('ChangeTimer10').click();
		console.log("已设置为:10分钟!");
		last_remains = 600;
		clearInterval(setTime);
	}
},1000);

console.log('任务列表中还剩下'+JSON.parse(localStorage.LessionList).length+'个课件');

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
		var LessionList = JSON.parse(localStorage.LessionList);
		if(LessionList&&LessionList.length>0){
			var url = LessionList.shift();
			console.log('本视频已看完,3分钟后将播放的视频地址是:\n'+url);
			console.log('剩余视频个数为:'+LessionList.length);			
			localStorage.LessionList = JSON.stringify(LessionList);
			setTimeout(function(){
					window.location=url;
			},190000);	
			clearInterval(auto_play);//停止轮询
		}else{
			alert('任务列表中已没有视频!');
			window.close();
		}
		return;
	}

	if(thisPlayer.getState()=='PAUSED'&&document.getElementById('RecordBut').disabled==true||
	   thisPlayer.getState()=='IDLE'&&document.getElementById('RecordBut').disabled==true){
		thisPlayer.play();
	}

	if(minutes==0&&seconds==0&&document.getElementById('RecordBut').disabled==false){
		var minus = thisPlayer.getDuration() - (parseInt(document.getElementById("RecordTime").innerHTML)+nsTimer)*60;
		document.getElementById('RecordBut').click();
		document.getElementById('RecordBut').disabled = 'true';
		if(minus<=180){
			document.getElementById('ChangeTimer1').click();	
			last_remains = 60;
		}else if(minus<=500){
			document.getElementById('ChangeTimer5').click();
			last_remains = 300;
		}else{
			document.getElementById('ChangeTimer10').click(); 	
			last_remains = 600;
		}
	}
}

function list(){  //列出当前任务列表
	var LessionList = JSON.parse(localStorage.LessionList);
	console.log('任务列表中共有'+LessionList.length+'个视频！');
	for (var i = 0; i < LessionList.length; i++) {
		console.log('第'+i+'个视频：');
		console.log(LessionList[i]);
	};
}

auto_play = setInterval('run()',15000);