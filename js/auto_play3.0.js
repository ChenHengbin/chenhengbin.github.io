//功能：自动播放、只选择15分钟
var last_remains;  //上次还剩余的时间

if(document.body.innerHTML=='ｲﾎﾊｴ﨔｡'){
	logout();
}

var detectCount = 0;  //轮询计时
var detectPlayer = setInterval(function(){
	if(thisPlayer){  //如果播放器存在
		detectResouce();
		clearInterval(detectPlayer);
	}else{
		detectCount ++ ;
		if(detectCount>=30){
			location.reload();   //刷新页面
		}
		console.log((60-detectCount*2)+'秒后页面未加载,将会自动刷新。');
	}
},2000);

var setTime = setInterval(function(){   //设置为15分钟
	if(document.getElementById('ChangeTimer15')){
		document.getElementById('ChangeTimer15').click();
		console.log("已设置为:15分钟!");
		last_remains = 900;
		clearInterval(setTime);
	}
},1000);

localStorage.maxInterval = 300000; //最大操作时间间隔
localStorage.maxPlayCount = 3;     //最大播放次数
if(!localStorage.currentPlayCount){
	localStorage.currentPlayCount = 1;
}else{
	localStorage.currentPlayCount = 1+parseInt(localStorage.currentPlayCount);
}

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
			console.log('本视频已看完,5分钟后将播放的视频地址是:\n'+url);
			console.log('剩余视频个数为:'+LessionList.length);			
			localStorage.LessionList = JSON.stringify(LessionList);
			setTimeout(function(){
				localStorage.currentPlayCount = parseInt(localStorage.currentPlayCount)-1;
				window.location=url;	
			},300000);	
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
		document.getElementById('ChangeTimer15').click(); 	
		last_remains = 900;
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

function logout(){
	$.ajax({
        type: "POST",
        url: "/Ajax/Ajax.do?action=Logout",
        success: function(data) {
        	window.location.href = 'http://www.lt-edu.net/User/';
        },
        error:function(){
        	alert('请重新登陆,插件才会正常工作!');
        }
    });
}

function detectResouce(){  //检测flv资源是否加载，若没有加载，minutes变量是不存在的
	var count = 0;
	setInterval(function(){
		if(typeof(minutes)=='undefined'){
			count++;
			console.log('资源五分钟未加载，则会自动切换下一个视频');
			if(count>=30){ //资源五分钟未加载
				localStorage.currentPlayCount = parseInt(localStorage.currentPlayCount)-1;
				window.location=getURL();
			}
		}else{
			playManager();
			clearInterval(this);
		}
	},10000);
}

function playManager(){   //播放管理,自动播放并监控播放个数
	setInterval(function(){
		if(parseInt(localStorage.currentPlayCount)<parseInt(localStorage.maxPlayCount)){
			window.open(getURL());
		}
	},parseInt(localStorage.maxInterval));
}

function getURL(){  //获得下一个播放视频的视频地址
	var LessionList = JSON.parse(localStorage.LessionList);
	var url = LessionList.shift();
	localStorage.LessionList = JSON.stringify(LessionList);
	return url;
}

window.unload = function(){
	localStorage.currentPlayCount = parseInt(localStorage.currentPlayCount)-1;
}

auto_play = setInterval('run()',15000);