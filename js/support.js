function Constant(){
	this.SERVER_URL = "http://www.simplewish.cn/";
	this.BOOK_MARK_URL = this.SERVER_URL+"data/BookMark.json";
	this.DREAM_URL = this.SERVER_URL+"data/Dream.json";
	this.SCHE_URL = this.SERVER_URL+"data/Schedule.json";
}

function NavBar(){
	this.bmark = document.getElementById("bmark");
	this.dream = document.getElementById("dream");
	this.sche = document.getElementById("sche");
	this.bmark.onclick = function(){
		
	}

	this.dream.onclick = function(){

	}

	this.sche.onclick = function(){

	}

	function showTab(tabId,contentId){

	}
}

/*手机端页面加载的时候全屏*/
window.onload = function(){  
	if(document.documentElement.scrollHeight<document.documentElement.clientHeiht){
		var bodyTag =  document.getElemenstByTagName("body")[0];
		bodyTag.style.height = document.documentElement.clientWidth/screen.width*screen.height+"px";
	}
	setTimeout(function(){
		window.scrollTo(0,1);
	},0);
}