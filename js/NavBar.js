//导航栏对象
swModule.navBar = (function NavBar(){
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
 	return this;
 })();