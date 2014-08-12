var courseList = [ //科目列表
		{id:'569',title:'幼儿文学'},
		{id:'570',title:'幼儿教育学'},
		{id:'571',title:'幼儿游戏与指导'},
		{id:'630',title:'幼儿发展评价'},
		{id:'669',title:'幼儿数学教育'},
		{id:'703',title:'幼儿心理学'},
		{id:'704',title:'幼儿音乐活动指导'},
		{id:'705',title:'幼儿园班主任工作与家长工作'},
		{id:'706',title:'幼儿园环境创设'},
		{id:'707',title:'优秀教育活动案例展示和评析'},
		{id:'708',title:'幼儿园教师专业化成长'},
		{id:'834',title:'幼儿语言教育'},
		{id:'835',title:'教师口语'},
		{id:'836',title:'幼儿科学教育活动设计'},
		{id:'837',title:'学前儿童美术教育活动理论与实践'},
		{id:'838',title:'幼儿卫生保育教程'},
		{id:'839',title:'健康类活动案例示范与评析'},
		{id:'840',title:'怎么当好班主任——班级建设与工作能力'},
		{id:'841',title:'信息技术应用策略及案例示范'},
		{id:'855',title:'幼儿园教师专业标准解读'},
		{id:'856',title:'幼儿园主题探究性课题'},
		{id:'857',title:'奥尔夫音乐教学法'},
		{id:'858',title:'师德修养'},
		{id:'859',title:'幼儿发展知识'},
		{id:'860',title:'保教知识'},
		{id:'861',title:'幼儿园教育活动'},
		{id:'862',title:'学前教育发展趋势'},
		{id:'863',title:'计算机辅助国家普通话水平测试网络课程'}
	];
 
//create the html				
var tbd = document.getElementById('courselist').querySelector('tbody');
for (var i = 1 ; i < courseList.length ; i++) {
	var tr = "<tr>"+
					"<td>"+i+"</td>"+
	    			"<td>"+courseList[i].id+"</td>"+
	    			"<td>"+courseList[i].title+"</td>"+
	    			"<td><input type='text' value='' id='number"+courseList[i].id+"'></td>"+
	    			"<td>0</td>"+
	    			"<td style='cursor:pointer' class='post'>发帖<input type='hidden' value='"+courseList[i].id+"'></input></td>"+
    		  "</tr>";
    tbd.innerHTML = tbd.innerHTML + tr;
};

$(".post").click(function(){
	var CourseId = $(this).find('input').val();
	var count = document.getElementById('number'+CourseId).value;
	document.getElementById('number'+CourseId).value = '';
	if(verify(count)){
		for(var i = 0 ; i < count ; i++){
			setTimeout(function(){
				window.open('http://www.lt-edu.net/BBS/BBS.do?id='+CourseId+'&action=bbs','_blank');
			},600);
		}
		var total = parseInt(count) + parseInt($(this).parent().find('td:eq(3)').html());
		$(this).parent().find('td:eq(3)').html(total);
	}
});

function verify(data){
	data = data.Trime();
	if(/^\d+$/.test(data)){  //全为数字
		if(0<data&&data<11){
			return true;
		}else{
			alert('请输入1-10范围内的数字');
			return false;
		}
	}else{
		alert('请输入数字!');
		return false;
	}
}

String.prototype.Trime = function(){  //去除空格
	return this.replace(/\s/g,'');
}	