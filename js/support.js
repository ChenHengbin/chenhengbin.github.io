﻿window.onload = function(){  
	// if(document.documentElement.scrollHeight<document.documentElement.clientHeiht){
	// 	var bodyTag =  document.getElemenstByTagName("body")[0];
	// 	bodyTag.style.height = document.documentElement.clientWidth/screen.width*screen.height+"px";
	// }
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
					eve.stopPropagation();
				}	
			}
		}
	}
}