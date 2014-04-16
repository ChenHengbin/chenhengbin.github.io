function Constant(){
	this.URL = "http://www.simplewish.cn/";
	this.bookMarkUrl = this.URL+"data/BookMark.json";
}

var constant = new Constant();

function getBookMarkData(){
	$.getJSON(constant.bookMarkUrl,function(data){
	   var array = data.CDN;
	   console.log(array[0].url);
	});
}