function Constant(){
	this.SERVER_URL = "http://www.simplewish.cn/";
	this.BOOK_MARK_URL = this.SERVER_URL+"data/BookMark.json";
	this.DREAM_URL = this.SERVER_URL+"data/Dream.json";
	this.SCHE_URL = this.SERVER_URL+"data/Schedule.json";
}

function NavBar(){
	this.bmark = document.getElementById("bmark");
	this.bmark.onclick = function(){
		document.getElementById("bMarkBtn").click();
	}
}
