﻿var constant = function Constant(){
	this.URL = "http://www.simplewish.cn/";
	this.bookMarkUrl = this.URL+"data/BookMark.json";
}

function getBookMarkData(){
	$.getJSON(constant.bookMarkUrl,function(data){
	   var array = data.CDN;
	   console.log(array[0].url);
	});
}

