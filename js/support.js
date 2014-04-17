function Constant(){
	this.SERVER_URL = "http://www.simplewish.cn/";
	this.BOOK_MARK_URL = this.SERVER_URL+"data/BookMark.json";
}

function NavBar(){
	this.bmark = document.getElementById("bmark");
	this.bmark.onclick = function(){
		document.getElementById("bMarkBtn").click();
	}
}