function runAtCenter(){
	LessionList = JSON.parse(localStorage.LessionList);

	var detectCategoryDiv = setInterval(function(){     //轮询是否出现课件中心窗口
		if(document.getElementById('CategoryDiv')){
			detectLessionList();
			clearInterval(detectCategoryDiv);
		}
	},5000);
}

var detectLessionList = function(){
	setInterval(function(){   //轮询课件中心窗口中课件列表DIV是否出现
		if(document.getElementById('SStr')){  //具体课件列表出现
			var trs = $("#SStr table tr[class^='mo']");
			if(trs){
				var isListUpdate = false;      //列表是否增加新的课程
				trs.each(function(i,o){
					if($(this).find('td:eq(3)').html()!=$(this).find('td:eq(4)').html()){  //该视频还未看完
						isListUpdate = true;
						LessionList.push('http://www.lt-edu.net'+$(this).find('td:last a:last').attr('href'));
						var content = $(this).find('td:eq(3)').html();
						$(this).find('td:eq(4)').html(content);
					}
				});	
				if(isListUpdate){
					LessionList=LessionList.unique();
					localStorage.LessionList = JSON.stringify(LessionList);
					console.log('----------当前任务列表有'+LessionList.length+'个视频---------------');
					for (var i = LessionList.length - 1; i >= 0; i--) {
						console.log(LessionList[i]);
					}	
					alert('本页面已将可播放的课件加入任务列表，请点击其它列表！\n');
				}
			}
		}
	},2000);	
}

//tools
Array.prototype.unique = function(){
	var result = [];
	var json = {};
	for(var i = this.length - 1;i>=0;i--){
		var temp = this[i];
		if(!json[temp]){
			json[temp] = 1;
			result.push(temp);
		}
	}
	return result;
}

//callback
function checkLoginCount(obj){
	var responseStr = obj.responseText;
    var StrArray = responseStr.split("{#}");
    if (StrArray[1] == "true") {
        var SArray = StrArray[0].split("[#]");
    	console.log('第'+SArray[1]+'次登录');
		if(!localStorage.loginCount||parseInt(localStorage.loginCount)!=SArray[1]){
			localStorage.loginCount = SArray[1];
			localStorage.LessionList = '[]';
		}else if(parseInt(localStorage.loginCount)==parseInt(SArray[1])){
			runAtCenter();
		}
    }
}

XMLHttp.sendReq("POST", "/Ajax/Ajax.do?action=ShowUserCheck", null, true, "null", "null", checkLoginCount);