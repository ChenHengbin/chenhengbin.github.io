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
		document.getElementById("getBmarkBtn").click();
		switchActive("bmark");
	}

	this.dream.onclick = function(){
		document.getElementById("getDreamBtn").click();
		switchActive("dream");
	}

	this.sche.onclick = function(){
		document.getElementById("getScheBtn").click();
		switchActive("sche");
 	}

 	//点击导航栏按钮后，改变导航栏的样式和网页中的内容
 	function switchActive(id){
 		var ul = document.querySelector(".navbar-nav");
 		var childList = ul.childNodes;
 		for (var i = childList.length - 1; i >= 0; i--) {
 			childList[i].className="";
 		};
 		document.getElementById(id).className="active";
 		var contents = document.getElementsByClassName("content");
 		for (var i = contents.length - 1; i >= 0; i--) {
 			contents[i].style.display = "none";
 		};
 		document.getElementById(id+"-content").style.display = "";
 	}
 }

/*判断是否为手持设备*/
function IsPC() 
{ 
   var userAgentInfo = navigator.userAgent; 
   var Agents = new Array("Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod"); 
   var flag = true; 
   for (var v = 0; v < Agents.length; v++) { 
       if (userAgentInfo.indexOf(Agents[v]) > 0) { flag = false; break; } 
   } 
   return flag; 
} 

window.onload = function(){  
	if(document.documentElement.scrollHeight<document.documentElement.clientHeiht){
		var bodyTag =  document.getElemenstByTagName("body")[0];
		bodyTag.style.height = document.documentElement.clientWidth/screen.width*screen.height+"px";
	}
	/*手机端页面加载的时候全屏*/
	setTimeout(function(){
		window.scrollTo(0,1);
	},0);

	/*单击书签按钮*/
	swModule.navBar.bmark.click();

	document.onclick = function(event){
		var eve = window.event || event ; 
		var ele = eve['srcElement']||eve['target'];
		if(ele.id!='toggleBtn'){
			document.getElementById('toggleBtn').click();
		}
	}
}