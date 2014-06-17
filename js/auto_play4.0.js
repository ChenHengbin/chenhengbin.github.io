//P2PVOD  都是5分钟记录一次
if(document.body.innerHTML=='ｲﾎﾊｴ﨔｡'){
	logout();
}

var setTime = setInterval(function(){   //设置为5分钟
	if(document.getElementById('ChangeTimer5')&&swfobject.getObjectById('P2PVod')){
		swfobject.getObjectById('P2PVod').Pause();
		document.getElementById('ChangeTimer5').click();
		console.log("已设置为:5分钟!");
		clearInterval(setTime);
	}
},1000);

console.log('任务列表中还剩下'+JSON.parse(localStorage.LessionList).length+'个课件');

function run(){
	if(typeof(minutes)=='undefined'||typeof(seconds)=='undefined'){
		swfobject.getObjectById('P2PVod').Pause();
	}
	
	if(document.getElementById("string").innerHTML=='此课件观看时长已满足！'){
		var LessionList = JSON.parse(localStorage.LessionList);
		if(LessionList&&LessionList.length>0){
			var url = LessionList.shift();
			console.log('本视频已看完,5分钟后将播放的视频地址是:\n'+url);
			console.log('剩余视频个数为:'+LessionList.length);			
			localStorage.LessionList = JSON.stringify(LessionList);
			setTimeout(function(){
					window.location=url;
			},300000);	
			clearInterval(auto_play);//停止轮询
		}else{
			alert('任务列表中已没有视频!');
			window.close();
		}
		return;
	}

	if(minutes==0&&seconds==0&&document.getElementById('RecordBut').disabled==false){
		document.getElementById('RecordBut').click();
		document.getElementById('RecordBut').disabled = 'true';
		document.getElementById('ChangeTimer5').click();
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

auto_play = setInterval('run()',10000);