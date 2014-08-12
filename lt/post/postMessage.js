var ExtensionID = 'bdckcppmamjfibdlofjhnilfcdfdmefi';
if(!localStorage.posts){  //将帖子存到本地存储
	$.getJSON('chrome-extension://'+ExtensionID+'/posts.json',function(data){
			localStorage.posts = JSON.stringify(data);
		}
	);
}

var loop = setInterval(function(){
	if(localStorage.posts){
		postMessage();  //发帖
		clearInterval(loop);
	}
},2000);

function postMessage(){  //自动填帖子内容
	var iframe = document.getElementById('xhe0_iframe');
	var postlist = JSON.parse(localStorage.posts)[getID()];
	var index = Math.round(Math.random()*(postlist.length-1));
	document.getElementById('BBSName').value = postlist[index].title; //帖子标题
	iframe.contentWindow.document.body.innerHTML = postlist[index].content;//帖子正文
	window.scrollTo(0,document.body.scrollHeight);//滚动条置底
}

function getID(){
	var reg=/\?id=\d+/;
	var id = reg.exec(window.location.href); 
	id = id[0].substr(id[0].indexOf('=')+1);
	console.log('科目编号为:'+id);
	return id;
}

