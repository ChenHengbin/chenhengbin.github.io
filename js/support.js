function Constant(){
	this.SERVER_URL = "http://www.simplewish.cn/";
	this.BOOK_MARK_URL = this.SERVER_URL+"data/BookMark.json";
	this.DREAM_URL = this.SERVER_URL+"data/Dream.json";
	this.SCHE_URL = this.SERVER_URL+"data/Schedule.json";
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
		var toggleBtn = document.getElementById("toggleBtn");
		if(document.body.clientWidth<768){   //toggerBtn在768以下才会显示
			if(document.getElementById("bs-example-navbar-collapse-1").classList.contains("in")){  //导航栏处于下拉状态
				var eve = window.event || event ; 
					var ele = eve['srcElement']||eve['target'];	
					if(ele.id!='toggleBtn'){
						toggleBtn.click();
				}	
			}
		}
	}
}