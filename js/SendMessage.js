var sTime = null,nSecond = 0;
//预读图片开始
var loadImging = new Array(),
imging = new Array();
loadImging[0] = '/SMS/images/Send.gif';
loadImging[1] = '/SMS/images/SMS_Tab_bg_01.gif';
loadImging[2] = '/SMS/images/SMS_Tab_bg_02.gif';
loadImging[3] = '/SMS/images/SMS_Tab_bg_03.gif';
loadImging[4] = '/SMS/images/Open.gif';
loadImging[5] = '/SMS/images/Close.gif';
loadImging[6] = '/SMS/images/IBg.gif';
loadImging[7] = '/SMS/images/SMSNew.gif';
loadImging[8] = '/SMS/images/SMSWBg.jpg';
loadImging[9] = '/SMS/images/SMSBg.jpg';
loadImging[10] = '/SMS/images/SMS_02_01_01.jpg';
loadImging[11] = '/SMS/images/SMS_02_01_02.jpg';
loadImging[12] = '/SMS/images/SMS_02_01_04.jpg';
loadImging[13] = '/SMS/images/SMS_02_02_01.jpg';
loadImging[14] = '/SMS/images/SMS_02_02_02.jpg';
loadImging[15] = '/SMS/images/SMS_02_02_03.jpg';
loadImging[16] = '/SMS/images/SMS_02_02_04.jpg';
loadImging[17] = '/SMS/images/SMS_02_02_06.jpg';
loadImging[18] = '/SMS/images/Del.jpg';
loadImging[19] = '../images/nophoto.jpg';
for (i = 0; i <= loadImging.length - 1; i++) {
    imging[i] = new Image();
    imging[i].src = loadImging[i];
}
//预读图片结束

function SendMessage(sUserName, sName, sMobile, sBg, sSll) {
    if (sMobile == null) sMobile = '';
    if (sBg == null) sBg = 1;
    if (sSll == null) sSll = true;
    var sDivName = "MessageDiv";
    var setUser = function() {
        if (sUserName != '' && sUserName != null) {
            if (sName.indexOf('本班成员') == -1 && sName.indexOf('县区成员') == -1) {
                if ($('#ChangeUser').attr('checked')) {
                    if ($('#ConsigneeName').val().indexOf('本班成员') == -1 && $('#ConsigneeName').val().indexOf('县区成员') == -1) {
                        if ($('#Consignee').val() != '') {
                            if ((',' + $('#Consignee').val() + ',').indexOf(',' + sUserName + ',') == -1) {
                                sUserName = $('#Consignee').val() + ',' + sUserName;
                                sName = $('#ConsigneeName').val() + ',' + sName;
                            } else {
                                sUserName = (',' + $('#Consignee').val() + ',').replace(',' + sUserName + ',', ',');
                                sName = (',' + $('#ConsigneeName').val() + ',').replace(',' + sName + ',', ',');
                                if (left(sUserName, 1) == ",") sUserName = mid(sUserName, 1);
                                if (right(sUserName, 1) == ",") sUserName = mid(sUserName, 0, sUserName.length - 1);

                                if (left(sName, 1) == ",") sName = mid(sName, 1);
                                if (right(sName, 1) == ",") sName = mid(sName, 0, sName.length - 1);
                            }
                        }
                    }
                }
            }
            $('#Consignee').val(sUserName);
            $('#ConsigneeName').val(sName);
            var sNum = 0;
            if (sUserName != '') sNum = sUserName.split(',').length;
            $('#SendNum').html(sNum);
        }
    };
    if (!$('#' + sDivName)[0]) {
        var sCentClassMember = '<td rowspan="' + ((sMobile != '') ? '5': '4') + '" width="180"><input type="checkbox" id="ChangeUser" name="ChangeUser" value="1">多选&nbsp;<span style="font-size:12px; width:100%; font-weight:bold; border-bottom:#CCC 1px dotted"><a href="javascript:void(0)" id="AllMember">本班成员</a>：（<span id="PersonnelSMSONum">0</span>/<span id="PersonnelSMSAllNum">0</span>）</span><div id="PersonnelSMS" style="width:100%; height:200px; overflow:hidden; overflow-y:auto"><img src="/Images/loading_16x16.gif" align="absmiddle" />&nbsp;数据处理中，请稍候...</div></td>';
        var sHtml = '<table align="center" width="670" cellspacing="1" cellpadding="3" class="tableBorder" style="margin-top:5px" id="sAssignCentClassTable">';
        sHtml += '<tr class="mout" height="25"><td width="50" align="right" class="ButtonList"><input type="hidden" name="Consignee" id="Consignee" value="">收件人：</td><td align="left"><input type="text" class="button" size="25" name="ConsigneeName" id="ConsigneeName" value="" disabled>（<span id="SendNum">0</span>人）&nbsp;<span style="color:#FF0000">*</span></td>' + ((MyUser != 'STUDENT') ? sCentClassMember: '') + '</tr>';
        if (sMobile != '') sHtml += '<tr class="mout" height="25"><td width="50" align="right" class="ButtonList">手机号码：</td><td align="left"><input type="text" class="button" name="Mobile" id="Mobile" size="30" value="' + sMobile + '" disabled></td></tr>';
        sHtml += '<tr class="mout" height="25"><td width="50" align="right" class="ButtonList">标&nbsp;&nbsp;题：</td><td align="left"><input type="text" class="button" name="Topic" id="Topic" size="36" value="">&nbsp;<span style="color:#FF0000">*</span></td></tr>';
        sHtml += '<tr class="mout" height="25"><td width="50" align="right" class="ButtonList">内&nbsp;&nbsp;容：</td><td align="left"><textarea name="Content" id="Content" style="overflow-y:auto;padding:0;width:100%;height:100%;border:1px solid gray;}"></textarea></td></tr>';
        sHtml += '<tr class="mout" align="center" height="25"><td colspan="2"><input type="button" name="Send" id="Send" class="button" value=" 发送信息 " onClick="WriteMessage(' + sBg + ', ' + sSll + ')">&nbsp;注：带有"<span style="color:#FF0000">*</span>"为必填项</td></tr>';
        sHtml += '</table>';
        ShowModal(sDivName, "<table border=\"0\" align=\"center\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\" height=\"245\"><tr><td background=\"/images/GModeTitle.jpg\" height=\"30\" align=\"left\"><img src=\"/images/GModeClose.jpg\" width=\"19\" height=\"19\" align=\"right\" onClick=\"CloseShowModal('MessageDiv'," + sBg + "," + sSll + ",'');CloseDiv('LoadingDiv');\" style=\"margin-right:8px;cursor:pointer\" ><span style=\"margin-left:15px; color:#FFFFFF; font-size:13px; font-weight:bold\">发送信息</span></td></tr><tr><td align=\"center\" valign=\"middle\" bgcolor=\"#FFFFFF\" id=\"erstr\" style=\"border-bottom:#add98c 1px solid; display:none\" height=\"20\"></td></tr><tr><td align=\"center\" valign=\"top\" bgcolor=\"#FFFFFF\" style=\"border-bottom:#add98c 1px solid;border-right:#add98c 1px solid\" height=\"245\"><Div style=\"border:#add98c 1px solid;overflow:hidden;overflow-y:auto;width:99.5%;height:245px;\" align=\"center\" id=\"HStr\">" + sHtml + "</Div></td></tr></table>", 700, 245, 0, 55, false, "null");

        if (MyUser != 'STUDENT') {
            if ($('#Personnel')[0]) {
                $('#PersonnelSMSONum').html($('#PersonnelONum').html());
                $('#PersonnelSMSAllNum').html($('#PersonnelAllNum').html());
                $('#PersonnelSMS').html($('#Personnel').html());
            } else {
                ShowPersonnel(((MyUser == 'USE' && sUserName == '' && sName == '') ? -1 : nTItemID), nCentClassID, 0, 'PersonnelSMS');
            }
			
			if (MyUser == 'USE' && sUserName == '' && sName == '') $('#AllMember').html('县区成员');
			
            $('#AllMember').click(function() {
                var sUserList = '';
                $('#PersonnelSMS div a').each(function() {
                    if ($(this).text().indexOf('助学导师') == -1 && $(this).text().indexOf('县区成员') == -1) {
                        sUserList += ',' + $(this).attr('id');
                    }
                });
                if (sUserList != '') {
                    sUserName = sUserList.substring(1);
                    sName = (MyUser == 'USE') ? '县区成员' : '本班成员（助学导师除外）';
                }
                setUser();
            });
			
		  $('#Content').xheditor({
				  tools: 'simple',
				  skin: 'o2007silver',
				  layerShadow: 5,
				  upLinkUrl: '/Inc/BBSUp.do?UpfileType=SMS&UpfileFromWhere=' + nCUCode,
				  upLinkExt: 'zip,rar,txt,jpg,jpeg,gif,png,doc,docx,xls,xlsx,ppt,pptx',
				  upImgUrl: '/Inc/BBSUp.do?UpfileType=SMS&UpfileFromWhere=' + nCUCode,
				  upImgExt: 'jpg,jpeg,gif,png,bmp'
		   });
			
        }
    }
    setUser();
}

function WriteMessage(sBg, sSll) {
    var sUserName = $("#Consignee").val();
    sSll = (!sSll) ? 1 : 0;
    if (sUserName != "") {
        var Topic = $("#Topic").val();
        var Content = $("#Content").val();

        if (Topic == "") {
            alert("温馨提示：\n\n请填写标题！");
        } else {
            $("#Topic").attr("disabled", true);
            $("#Content").attr("disabled", true);
            $("#Send").attr("disabled", true).val("正在发送信息，请稍候...");

            $.ajax({
                type: "POST",
                cache: true,
                url: "/Ajax/SMS.do?action=WriteMessage",
                data: {
                    sUserName: sUserName,
                    Topic: escape(Topic),
                    Content: escape(Content),
                    Bg: sBg,
                    Sll: sSll
                },
                success: function(data) {
                    var IsUser = data.split("{@&}");
                    if (IsUser[1] != "0") {
                        alert(IsUser[0]);
                        location.href = GetURL(1) + "//" + GetURL(2) + "/Service/?URL=" + encodeURIComponent(GetURL(0));
                    } else {
                        var reArr = IsUser[0].split("{#}");
                        if (reArr[0] != "0") {
                            alert("温馨提示：\n\n" + reArr[0]);
                            CloseShowModal("MessageDiv", parseInt(reArr[3]), ((reArr[4] == "1") ? false: true), '');
                        } else {
                            alert(reArr[0]);
                        }
                    }
                    CloseDiv("LoadingDiv");
                },
                error: function() {
                    Loading("出现异常，请刷新！");
                }
            });
        }
    } else {
        alert("温馨提示：\n\n收件人有误！");
    }
}

function ShowSMSBox(sType, sMy) {
    if (sType == null) sType = 1;
    if (sMy == null) sMy = 0;
    var sHtml = '<table align="center" width="980" height="554" border="0" cellpadding="0" cellspacing="0" style="margin-top:3px">';
    sHtml += '<tr valign="top">';
    sHtml += '<td width="980" height="30" align="left">';
    sHtml += '<table align="left" width="322" height="30" border="0" cellpadding="0" cellspacing="0" id="SMSChange">';
    sHtml += '<tr align="center">';
    sHtml += '<td width="95"><a href="javascript:void(0)" onClick="SMSChange(1, ' + sMy + ')" id="SMSType1">站内信息</a></td>';
    sHtml += '<td width="115"><a href="javascript:void(0)" onClick="SMSChange(2, ' + sMy + ')" id="SMSType2">好友请求</a></td>';
    sHtml += '<td align="left"><a href="javascript:void(0)" onClick="SMSChange(3, ' + sMy + ')" id="SMSType3" style="margin-left:15px">系统信息</a></td>';
    sHtml += '</tr>';
    sHtml += '</table>';
    sHtml += '</td>';
    sHtml += '</tr>';
    sHtml += '<tr>';
    sHtml += '<td width="980" height="524">';
    sHtml += '<table align="center" width="980" height="524" border="0" cellpadding="0" cellspacing="0">';
    sHtml += '<tr align="center" valign="top">';
    sHtml += '<td width="414">';
    sHtml += '<table align="center" width="414" height="524" border="0" cellpadding="0" cellspacing="0">';
    sHtml += '<tr>';
    sHtml += '<td><img src="/SMS/images/SMS_02_01_01.jpg" width="414" height="3"></td>';
    sHtml += '</tr>';
    sHtml += '<tr>';
    sHtml += '<td background="/SMS/images/SMS_02_01_02.jpg" width="414" height="516" align="center" valign="top">';
    sHtml += '<table align="center" width="411" border="0" cellpadding="0" cellspacing="0" style="margin-left:3px">';
    sHtml += '<tr><td id="SMSFMY" style="display:none"><table align="left" width="396" height="28" border="0" cellpadding="0" cellspacing="0" style="border-bottom:#d3d3d3 2px solid">';
    sHtml += '<tr align="center">';
    sHtml += '<td background="/SMS/images/SMSWBg.jpg" width="198" id="FriendSMS" onmouseover="this.style.backgroundImage=\'url(/SMS/images/SMSBg.jpg)\'" onmouseout="this.style.backgroundImage=\'url(/SMS/images/SMSWBg.jpg)\'"><a href="javascript:void(0)" onclick="ShowSMS(1, 10, 1, 0);">我收到的信息</a></td>';
    sHtml += '<td background="/SMS/images/SMSWBg.jpg" width="198" id="MySMS" onmouseover="this.style.backgroundImage=\'url(/SMS/images/SMSBg.jpg)\'" onmouseout="this.style.backgroundImage=\'url(/SMS/images/SMSWBg.jpg)\'" style="border-left:#d3d3d3 1px solid"><a href="javascript:void(0)" onclick="ShowSMS(1, 10, 1, 1);">我发送的信息</a></td>';
    sHtml += '</tr></table></td></tr>';
    sHtml += '<tr><td id="SMSList"></td></tr>';
    sHtml += '</table>';
    sHtml += '</td>';
    sHtml += '</tr>';
    sHtml += '<tr>';
    sHtml += '<td><img src="/SMS/images/SMS_02_01_04.jpg" width="414" height="5"></td>';
    sHtml += '</tr>';
    sHtml += '</table>';
    sHtml += '</td>';
    sHtml += '<td width="566">';
    sHtml += '<table align="center" width="566" height="524" border="0" cellpadding="0" cellspacing="0">';
    sHtml += '<tr>';
    sHtml += '<td><img src="/SMS/images/SMS_02_02_01.jpg" width="566" height="3"></td>';
    sHtml += '</tr>';
    sHtml += '<tr>';
    sHtml += '<td background="/SMS/images/SMS_02_02_02.jpg" width="566" height="22" align="right" id="SMSRefresh"></td>';
    sHtml += '</tr>';
    sHtml += '<tr>';
    sHtml += '<td><img src="/SMS/images/SMS_02_02_03.jpg" width="566" height="1"></td>';
    sHtml += '</tr>';
    sHtml += '<tr>';
    sHtml += '<td background="/SMS/images/SMS_02_02_04.jpg" width="566" height="493" valign="top" align="center">';
    sHtml += '<div align="left" id="SMSContent" style="width:98%; height:335px; overflow:hidden; overflow-y:auto;"></div>';
    sHtml += '<table align="center" id="SMSWrite" width="96%" height="100" border="0" cellpadding="0" cellspacing="0" style="border-top:#666 1px dotted; margin-top:5px">';
    sHtml += '<tr>';
    sHtml += '<td style="font-weight:bold" height="30" align="left">&nbsp;<input type="hidden" id="id" name="id" value="0" /><input type="hidden" id="Consignee" name="Consignee" value="" /><input type="hidden" id="sMy" name="sMy" value="' + sMy + '" />回复：</td>';
    sHtml += '</tr>';
    sHtml += '<tr>';
    sHtml += '<td><textarea id="Content" name="Content" rows="4" cols="65" style="border:#b5b5b5 1px solid" onKeyDown="KeyDown(this,\'ReplyMessage()\')"></textarea></td>';
    sHtml += '</tr>';
    sHtml += '<tr>';
    sHtml += '<td height="40" style="color:#666" align="left"><input type="button" id="Send" name="Send" style="background-image:url(/SMS/images/Send.gif); width:95px; height:26px; text-align:center; font-weight:bold; font-size:14px; color:#FFF; border:#FFF 0px solid; cursor:pointer" value="发 送" onClick="ReplyMessage()" />&nbsp;&nbsp;注：可按Ctrl+Enter快捷键发送信息</td>';
    sHtml += '</tr>';
    sHtml += '</table>';
    sHtml += '</td>';
    sHtml += '</tr>';
    sHtml += '<tr>';
    sHtml += '<td><img src="/SMS/images/SMS_02_02_06.jpg" width="566" height="3"></td>';
    sHtml += '</tr>';
    sHtml += '</table>';
    sHtml += '</td>';
    sHtml += '</tr>';
    sHtml += '</table>';
    sHtml += '</td>';
    sHtml += '</tr>';
    sHtml += '</table>';

    var sTmpDiv = "SMSDiv";
    switch (sType) {
    case 2:
        break;
    default:
        ShowModal(sTmpDiv, sHtml, 1010, 15, 0, 1, false, "null", 0, "0px solid #000000", 1, true, true, true);
        setTimeout(function() {
            $("#sModal" + sTmpDiv + "Title").html("站内信息");
            $("#sModal" + sTmpDiv + "string").hide();
            //$("#sModal" + sTmpDiv + "Str").html(sHtml);
            LauCons($("#sModal" + sTmpDiv + "Td"), "", 10, 565, "", true);
            SMSChange(sType, sMy);
            //$("#SMSFrame").attr("src", '/Inc/PreLoad.do?action=SMS&Link=' + encodeURIComponent('/SMS/SMS.do?ID=' + sType + '&sMy=' + sMy));
        },
        1500);
        break;
    }
}

function SMSChange(sType, sMy) {
    switch (sType) {
    case 2:
        $("#SMSChange").css("background-image", "url(/SMS/images/SMS_Tab_bg_02.gif)");
        $("#SMSType2").css({
            "color": "#FFFFFF",
            "font-size": "14px",
            "font-weight": "bold"
        });
        $("#SMSType1,#SMSType3").css({
            "color": "#5fa207",
            "font-size": "13px",
            "font-weight": "normal"
        });
        $("#SMSFMY").hide();
        $("#SMSList").html('<div align="center">暂无信息</div>');
        $("#SMSRefresh").html("");
        $("#SMSContent").html("");
        nType = 2;
        break;
    case 3:
        $("#SMSChange").css("background-image", "url(/SMS/images/SMS_Tab_bg_03.gif)");
        $("#SMSType3").css({
            "color": "#FFFFFF",
            "font-size": "14px",
            "font-weight": "bold"
        });
        $("#SMSType1,#SMSType2").css({
            "color": "#5fa207",
            "font-size": "13px",
            "font-weight": "normal"
        });
        $("#SMSFMY").hide();
        nType = 3;
        ShowSMS(3);
        break;
    default:
        sType = 1;
        $("#SMSChange").css("background-image", "url(/SMS/images/SMS_Tab_bg_01.gif)");
        $("#SMSType1").css({
            "color": "#FFFFFF",
            "font-size": "14px",
            "font-weight": "bold"
        });
        $("#SMSType2,#SMSType3").css({
            "color": "#5fa207",
            "font-size": "13px",
            "font-weight": "normal"
        });
        $("#SMSFMY").show();
        nType = 1;
        ShowSMS(1, 10, 1, sMy);
        break;
    }
    $("#SMSChange").css("background-image");
}

function ShowSMS(sType, iPage, sPage, isMy) {
    nID = 0;
    if (sType != "") {
        if (typeof(iPage) == "undefined") iPage = 10;
        if (typeof(sPage) == "undefined") sPage = 1;
        if (typeof(isMy) == "undefined") isMy = 0;
        switch (sType) {
        case 1:
            if (isMy == 1) {
                $("#FriendSMS").attr("background", '/SMS/images/SMSWBg.jpg');
                $("#MySMS").attr("background", '/SMS/images/SMSGBg.jpg');
                $Id("FriendSMS").onmouseover = function() {
                    $("#FriendSMS").attr("background", '/SMS/images/SMSBg.jpg');
                };
                $Id("FriendSMS").onmouseout = function() {
                    $("#FriendSMS").attr("background", '/SMS/images/SMSWBg.jpg');
                };
                $Id("MySMS").onmouseover = null;
                $Id("MySMS").onmouseout = null;

            } else {
                $("#FriendSMS").attr("background", '/SMS/images/SMSGBg.jpg');
                $("#MySMS").attr("background", '/SMS/images/SMSWBg.jpg');
                $Id("FriendSMS").onmouseover = null;
                $Id("FriendSMS").onmouseout = null;
                $Id("MySMS").onmouseover = function() {
                    $("#MySMS").attr("background", '/SMS/images/SMSBg.jpg');
                };
                $Id("MySMS").onmouseout = function() {
                    $("#MySMS").attr("background", '/SMS/images/SMSWBg.jpg');
                };
            }
            break;
        default:

            break;
        }
        $("#FriendSMS").css("background-image");
        $("#MySMS").css("background-image");

        $.ajax({
            type:
            "POST",
            cache: true,
            url: "/Ajax/SMS.do?action=ShowSMS",
            data: {
                sType: sType,
                iPage: iPage,
                Page: sPage,
                sMy: isMy
            },
            success: function(data) {
                var IsUser = data.split("{@&}");
                if (IsUser[1] != "0") {
                    alert(IsUser[0]);
                    location.href = GetURL(1) + "//" + GetURL(2) + "/Service/?URL=" + encodeURIComponent(GetURL(0));
                } else {
                    var reArr = IsUser[0].split("{#}");
                    if (reArr[1] == "0") {
                        var rArr = reArr[0].split("{&}");
                        var temID = 0;
                        var sHtml = '<table align="center" width="100%" border="0" cellpadding="0" cellspacing="0">';
                        if (rArr[0] != "null") { 
						    if (reArr[2] == "1") { 
							    $("#SMSWrite").show();
							    $('#SMSContent').css('height','335');
							} else {
								$("#SMSWrite").hide();
								$('#SMSContent').css('height','483');
							}
                            if (right(rArr[0], 3) == "[#]") rArr[0] = mid(Trim(rArr[0]), 0, rArr[0].length - 3);
                            var MyArr = rArr[0].split("[#]");
                            var sColor = ' style="color:#666;cursor:pointer"',
                            sBgC = ' onMouseOver="this.style.background=\'#eefac5\'" onMouseOut="this.style.background=\'#FFFFFF\'"';
                            for (var i = 0; i < MyArr.length; i++) {
                                var DArr = MyArr[i].split("(#)");
                                if (i == 0) temID = parseInt(DArr[0]);
                                sHtml += '<tr><td height="43" id="SMS' + DArr[0] + '">';
                                sHtml += '<table align="left" width="395" height="43" border="0" cellpadding="0" cellspacing="0" style="border-bottom:#e5e6e2 1px solid">';
                                sHtml += '<tr align="left"' + ((parseInt(DArr[0]) != nID) ? sBgC: "") + ' onClick="ShowSMSContent(' + DArr[0] + ', 0, ' + reArr[3] + ', ' + reArr[2] + ')" id="SMSBG' + DArr[0] + '">';
                                sHtml += '<td width="80"' + sColor + '>';
                                sHtml += '&nbsp;<img src="';
                                sHtml += (DArr[5] == '0' || parseInt(DArr[6]) > 0) ? '/SMS/images/Close.gif': '/SMS/images/Open.gif';
                                sHtml += '" border="0" id="SMSImg">&nbsp;' + ((parseInt(reArr[3]) == 0) ? DArr[2] : "<span style=\'color:#FF0000\'>" + DArr[1] + "</span>") + '</td>';
                                sHtml += '<td width="157"' + sColor + '>' + DArr[3].substring(0, 8) + ((parseInt(DArr[6]) > 0) ? '（<span style="color:#F00">' + DArr[6] + '</span>）': '') + '</td>';
                                sHtml += '<td width="130" style="color:#666">' + DArr[4] + '</td>';
                                sHtml += '<td align="center" width="20" id="SMSDel' + DArr[0] + '"></td>';
                                sHtml += '</tr>';
                                sHtml += '</table>';
                                sHtml += '</td></tr>';
                            }
                            sHtml += '</table>';
                            sHtml += '<table align="center" width="411" border="0" cellpadding="0" cellspacing="0" style="margin-top:3px">';
                            sHtml += '<tr><td>' + rArr[1] + '</td></tr>';
                        } else {
                            $("#SMSContent").html("");
                            $("#SMSWrite").hide();
                            sHtml += '<tr><td align="center">暂无信息</td></tr>';
                        }
                        sHtml += '</table>';
                        $("#SMSList").html(sHtml);
                        ShowSMSContent(temID, 0, reArr[3], reArr[2]);
                    }
                }
                CloseDiv("LoadingDiv");
            },
            error: function() {
                Loading("出现异常，请刷新！");
            }
        });
    }
}

function AutoRefresh(sID, sSecond, sMy) {
    if (sSecond != 0) {
        clearInterval(sTime);
        sTime = null;
        if (sSecond > 60) sSecond = 60;
        nSecond = sSecond;
        sTime = setInterval(function() {
            ShowSMSContent(sID, 1, sMy)
        },
        (sSecond * 1000))
    } else {
        clearInterval(sTime);
        sTime = null;
        nSecond = 0;
        ShowSMSContent(sID, 1, sMy);
    }
}

function ShowSMSContent(sID, sRef, isMy, isSys) {
    if (typeof(sID) == "undefined") sID = 0;
    if (typeof(sRef) == "undefined") sRef = 0;
    if (typeof(isMy) == "undefined") isMy = 0;
    if (typeof(isSys) == "undefined") isSys = 1;
    if (sID != 0) {
        if ((sID != nID || sRef == 1) && sID != 0) {
            if (sID != nID) {
                clearInterval(sTime);
                sTime = null;
                nSecond = 0;
            }

            $Id("SMSBG" + sID).onmouseover = null;
            $Id("SMSBG" + sID).onmouseout = null;
            $("#SMSBG" + sID).css("background", "");
            $("#SMS" + sID).css("background-image", "url(/SMS/images/IBg.gif)");
            $("#SMS" + sID).css("background-image");
            $("#SMSDel" + sID).html('<img src="/SMS/images/Del.jpg" width="12" height="12" border="0" style="cursor:pointer" onclick="DelSMS(' + sID + ', ' + isMy + ')" />');
            if (nID != 0 && sRef == 0) {
                $Id("SMSBG" + nID).onmouseover = function() {
                    this.style.background = "#eefac5"
                };
                $Id("SMSBG" + nID).onmouseout = function() {
                    this.style.background = "#FFFFFF"
                };
                $("#SMSBG" + nID).css("background", "#FFFFFF");
                $("#SMS" + nID).css("background-image", "url()");
                $("#SMSDel" + nID).html('');
            }
            nID = sID;
            $("#id").val(nID);

            var sTempHtml = '<div align="right" style="margin-right:18px; width:96%;"><select name="Second" id="Second" onchange="AutoRefresh(' + sID + ',parseInt(this.options[this.selectedIndex].value), ' + isMy + ')">';
            for (var i = 0; i <= 60; i += 5) {
                sTempHtml += '<option value="' + i + '">' + i + '</option>';
            }
            sTempHtml += '</select>秒自动刷新&nbsp;&nbsp;<a href="javascript:void(0)" onclick="AutoRefresh(' + sID + ',0, ' + isMy + ')">手动刷新</a></div>';
            if (isSys == 1) $("#SMSRefresh").html(sTempHtml);

            $.ajax({
                type: "POST",
                cache: true,
                url: "/Ajax/SMS.do?action=ShowSMSContent",
                data: {
                    sID: sID,
                    sMy: isMy,
                    isSys: isSys
                },
                success: function(data) {
                    var IsUser = data.split("{@&}");
                    if (IsUser[1] != "0") {
                        alert(IsUser[0]);
                        location.href = GetURL(1) + "//" + GetURL(2) + "/Service/?URL=" + encodeURIComponent(GetURL(0));
                    } else {
                        var reArr = IsUser[0].split("{#}");
                        if (reArr[1] == "0") {
                            var sHtml = "";
                            if (reArr[0] != "null") {
                                if (right(reArr[0], 3) == "[#]") reArr[0] = mid(reArr[0], 0, reArr[0].length - 3);
                                var MyArr = reArr[0].split("[#]");
                                var sColor = ' style="color:#666;cursor:pointer"',
                                sBgC = ' onMouseOver="this.style.background=\'#eefac5\'" onMouseOut="this.style.background=\'#FFFFFF\'"';
                                for (var i = 0; i < MyArr.length; i++) {
                                    var DArr = MyArr[i].split("(#)"),
                                    sUserType = DArr[10];
                                    switch (sUserType) {
                                    case 'USE':
                                        sUserType = '（班主任）';
                                        break;
                                    case 'TEACHER':
                                        sUserType = '（助学导师）';
                                        break;
                                    case 'STUDENT':
                                        sUserType = '（学员）';
										break;
                                    default:
                                        sUserType = '';
                                        break;
                                    }
                                    if (i == 0)(parseInt(reArr[3]) == 0) ? $("#Consignee").val(DArr[4]) : $("#Consignee").val(DArr[2]);
                                    sHtml += '<table align="center" width="530" cellpadding="0" cellspacing="0" border="0" style="margin-top:8px">';
                                    sHtml += '<tr align="center">';
                                    sHtml += '<td rowspan="2" width="75"><img src="../images/nophoto.jpg" width="55" height="55" border="0" /></td>';
                                    sHtml += '<td>';
                                    sHtml += '<table align="center" width="98%" cellpadding="0" cellspacing="0" border="0">';
                                    sHtml += '<tr>';
                                    sHtml += '<td align="left"><span style="color:#' + ((DArr[4] == MyName) ? '4b7c0f">我' + sUserType : 'FF0000">' + ((DArr[11] == '0') ? '<img src="/SMS/images/SMSNew.gif" width="22" height="14" border="0" />': '') + DArr[3] + sUserType) + '</span>说：</td>';
                                    sHtml += '<td align="right">' + DArr[7] + '</td>';
                                    sHtml += '</tr>';
                                    sHtml += '</table>';
                                    sHtml += '</td>';
                                    sHtml += '</tr>';
                                    sHtml += '<tr>';
                                    sHtml += '<td align="center"><div align="left" style="border:#e3e3e3 1px dotted; width:98%; background-color:#f9f9f9">' + DArr[6] + '</div></td>';
                                    sHtml += '</tr>';
                                    sHtml += '</table>';
                                }
                            } else {
                                sHtml += '<div align="center">暂无信息</div>'
                            }

                            if (reArr[4] != "0") {
                                var MySMSStr = ((isSys == 3) ? "SysSMSNum" : (reArr[3] != "0") ? "SSMSNum" : "SMSNum");
                                var TempSMSNum = parseInt($("#" + MySMSStr).html());
                                if (TempSMSNum >= parseInt(reArr[4])) $("#" + MySMSStr).html(TempSMSNum - parseInt(reArr[4]));
                            }
                            $("#sMy").val(reArr[3]);
                            $("#SMSContent").html(sHtml);
                            if (isSys != 3) $("#SMSContent").scrollTop($("#SMSContent")[0].scrollHeight);
                            if (reArr[5] == "1") $("#Second")[0].selectedIndex = (nSecond / 5);
                        }
                    }
                    CloseDiv("LoadingDiv");
                },
                error: function() {
                    Loading("出现异常，请刷新！");
                }
            });
        }
    } else {
        $("#SMSRefresh").html("");
    }
}

function ReplyMessage() {
    $("#Send").attr("disabled", true).val('发送中...');
    var id = $("#id").val();
    var sUserName = $("#Consignee").val();
    var sMy = $("#sMy").val();
    if (id != "" && sUserName != "") {
        var sContent = $("#Content").val();
        $("#Content").attr("disabled", true);
        if ($.trim(sContent) == "") {
            if ($.browser.msie) {
                event.keyCode = 8;
            } else {
                event.which = 8;
            }
            $("#Content").val("");
            alert("温馨提示：\n\n请填写回复内容！");
            $("#Content").attr("disabled", false);
            $("#Send").attr("disabled", false).val('发 送');
        } else {
            $.ajax({
                type: "POST",
                cache: true,
                url: "/Ajax/SMS.do?action=ReplyMessage",
                data: {
                    id: id,
                    sUserName: sUserName,
                    sContent: escape(sContent),
                    sMy: sMy
                },
                success: function(data) {
                    var IsUser = data.split("{@&}");
                    if (IsUser[1] != "0") {
                        alert(IsUser[0]);
                        location.href = GetURL(1) + "//" + GetURL(2) + "/Service/?URL=" + encodeURIComponent(GetURL(0));
                    } else {
                        var reArr = IsUser[0].split("{#}");
                        if (reArr[1] == "0") {
                            ShowSMSContent(reArr[2], 1, reArr[4]);
                        } else {
                            alert(reArr[0]);
                        }
                        $("#Content").attr("disabled", false).val("");
                        $("#Send").attr("disabled", false).val('发 送');
                    }
                    CloseDiv("LoadingDiv");
                },
                error: function() {
                    Loading("出现异常，请刷新！");
                }
            });
        }
    } else {
        alert("温馨提示：\n\n收件人有误！");
    }
}

function KeyDown(obj, fn) {
    obj.onkeydown = function(e) {
        if (isIE) { // window.eventIE
            if (event.ctrlKey && getkeyCode(event) == 13) eval(fn);
        } else {
            if (e.ctrlKey && getkeyCode(e) == 13) eval(fn);
        }
    }
}

function getkeyCode(e) {
    var keynum = "";
    if (isIE) { // window.event IE
        keynum = e.keyCode;
    } else { // Netscape/Firefox/Opera
        keynum = e.which;
    }
    return keynum;
}

function DelSMS(sID, isMy) {
    if (typeof(sID) == "undefined") sID = 0;
    if (typeof(isMy) == "undefined") isMy = 0;
    if (sID != 0) {
        ShowModal("yesandno", '<table align="center" width="250" boder="0" style="border:#88af04 1px solid"><tr><td colspan="2" align="left"><span style="font-weight:bold">你确定要删除该信息吗？</span><br><hr style="border-bottom:#eefac5 1px solid"><span style="color:#FF0000">注：删除后与之相关的回复（包括收件人的回复）也将删除，且不可恢复，你确定吗？</span><br><hr style="border-bottom:#eefac5 1px solid"></td></tr><tr align="center" height="40"><td><input type="button" id="yesDel" class="button" value="确 定" onclick="DelMessage(' + sID + ', ' + isMy + ')"></td><td><input type="button" class="button" id="noDel" value="取 消" onclick="CloseShowModal(\'yesandno\',0,false,\'\');"></td></tr></table>', 260, 140, 0, 85, false, "null", 0, "#eefac5");
    }
}

function DelMessage(sID, isMy) {
    if (typeof(sID) == "undefined") sID = 0;
    if (typeof(isMy) == "undefined") isMy = 0;
    if (sID != 0) {
        $("#yesDel").attr("disabled", true);
        $("#noDel").attr("disabled", true);
        $.ajax({
            type: "POST",
            cache: true,
            url: "/Ajax/SMS.do?action=DelMessage",
            data: {
                id: sID,
                sMy: isMy
            },
            success: function(data) {
                var IsUser = data.split("{@&}");
                if (IsUser[1] != "0") {
                    alert(IsUser[0]);
                    location.href = GetURL(1) + "//" + GetURL(2) + "/Service/?URL=" + encodeURIComponent(GetURL(0));
                } else {
                    var reArr = IsUser[0].split("{#}");
                    if (reArr[1] == "0") {
                        CloseShowModal('yesandno', 0, false, '');
                        ShowSMS(nType, 10, 1, reArr[4]);
                    } else {
                        alert(reArr[0]);
                    }
                }
                CloseDiv("LoadingDiv");
            },
            error: function() {
                Loading("出现异常，请刷新！");
            }
        });
    }
}

function ShowMessageNum() {
    $.ajax({
        type: "POST",
        cache: true,
        url: "/Ajax/SMS.do?action=ShowMessageNum",
        success: function(data) {
            var IsUser = data.split("{@&}");
            if (IsUser[1] != "0") {
                alert(IsUser[0]);
                location.href = GetURL(1) + "//" + GetURL(2) + "/Service/?URL=" + encodeURIComponent(GetURL(0));
            } else {
                var reArr = IsUser[0].split('{#}');
                if (reArr[1] == '0' && reArr[0] != 'null') {
                    var rArr = reArr[0].split('|');
                    //if (rArr[0] != "0" || rArr[1] != "0" || rArr[2] != "0") $("#SMSSound").attr('src', '/SMS/images/msg.wav');
                    $("#SMSNum").html(rArr[0]);
                    $("#SSMSNum").html(rArr[1]);
                    $("#SysSMSNum").html(rArr[2]);
                    /*
					setTimeout(function() {
                        ShowMessageNum();
                    },
                    60000);
					*/
                }
            }
            CloseDiv("LoadingDiv");
        },
        error: function() {
            //Loading("出现异常，请刷新！");
        }
    });
}

setTimeout(function() {
    ShowMessageNum();
},
1000);

/*********************************************************************
  载入参与人员名单函数
  函数：ShowPersonnel
  参数：TItemID     -----  项目ID（必填）
        CentClassID -----  班级ID（可选，不选时请指定为0）
		Num         -----  载入的人员起始数（必填，首次载入请指定为0）

		                   注：每次载入50人次，循环执行，完成后停止，
						   为了防止参与人数过多，一次性载入时间过长
*********************************************************************/
function ShowPersonnel(TItemID, CentClassID, Num, Personnel) {
    if (TItemID != null && TItemID != '') {
        if (CentClassID == '' || CentClassID == null) CentClassID = 0;
        if (Num == null) Num = 0;
        if (Personnel == null) Personnel = 'Personnel';
        if ($('#' + Personnel + ' div').length <= 1) $('#' + Personnel).html('<div align="center" style="height:20px" id="' + Personnel + 'ing"><img src="/Images/loading_16x16.gif" align="absmiddle" />&nbsp;载入名单中，请稍候...</div>');
		
        $.ajax({
            type: "POST",
            cache: true,
            url: "/Ajax/SMS.do?action=ShowPersonnel",
            data: {
                TItemID: TItemID,
                CentClassID: CentClassID,
                Num: Num
            },
            success: function(data) {
                var IsUser = data.split("{@&}");
                if (IsUser[1] != "0") {
                    if (IsUser[0] != "") alert(ErrStr + IsUser[0]);
                    location.href = GetURL(1) + "//" + GetURL(2) + "/Service/?URL=" + encodeURIComponent(GetURL(0));
                } else {
                    var reArr = IsUser[0].split("{#}");
                    if (reArr[1] == "0") {
                        if (reArr[0] != '') {
                            var rArr = reArr[0].split(','),
                            temArr;
                            for (var i = 0; i < rArr.length; i++) {
                                temArr = rArr[i].split('|');
                                if (!$('#' + Personnel + ' div[id="' + temArr[0] + '"]')[0]){
									if (temArr[0] != MyName) $('#' + Personnel).append('<div style="height:20px;white-space:noWrap" noWrap="noWrap" id="' + temArr[0] + '" align="left"><a href="javascript:void(0)" id="' + temArr[0] + '" onclick="SendMessage(\'' + temArr[0] + '\', \'' + temArr[1] + '\')">' + temArr[1] + '（' + ((temArr[2] == '助学导师') ? '<span style="color:#F00">助学导师</span>': temArr[2]) + '）</a></div>');
								}
                                $('#' + Personnel + 'AllNum').text($('#' + Personnel + ' div').length - 1);
                            }
                            ShowPersonnel(reArr[2], reArr[3], reArr[4], Personnel);
                        } else {
                            $('#' + Personnel + 'ing').hide();
                        }
                    } else {
                        $('#' + Personnel).css('color', '#F00').html('暂未指定参会人员！');
                    }
                }
            },
            error: function() {
                Loading("出现异常，请刷新！");
            }
        });
    } else {
        $('#' + Personnel).css('color', '#F00').html('项目错误！');
    }
}

function ShowPersonnelData(options) {
    options = $.extend({
        UserName: MyName,
        sName: MyName,
        Mobile: '',
        Bg: 1,
        Sll: true
    },
    options);

    $.ajax({
        type: "POST",
        cache: true,
        url: "/Ajax/SMS.do?action=ShowPersonnelData",
        data: {
            UserName: options.UserName
        },
        success: function(data) {
            var IsUser = data.split("{@&}");
            if (IsUser[1] != "0") {
                if (IsUser[0] != "") alert(ErrStr + IsUser[0]);
                location.href = GetURL(1) + "//" + GetURL(2) + "/Service/?URL=" + encodeURIComponent(GetURL(0));
            } else {
                var reArr = IsUser[0].split("{#}");
                if (reArr[1] == "0") {
                    var rArr = reArr[0].split('(#)'),
                    sDivName = 'PersonnelDataDiv';
                    var sHtml = '<table align="center" width="670" cellspacing="1" cellpadding="3" class="tableBorder" style="margin-top:5px" id="sDataTable">';
                    sHtml += '<tr class="mout" height="20">';
                    sHtml += '<td width="100" align="right" class="ButtonList">姓名：</td><td width="250" align="left">' + rArr[0] + '&nbsp;（<a href="javascript:void(0)" style="color:#F00" onclick="SendMessage(\'' + options.UserName + '\', \'' + options.sName + '\', \'' + options.Mobile + '\', 0, false)">发送信息</a>）</td>';
                    sHtml += '<td width="100" align="right" class="ButtonList">性别：</td><td align="left">' + rArr[1] + '</td>';
                    sHtml += '</tr>';
                    sHtml += '<tr class="mout" height="20">';
                    sHtml += '<td align="right" class="ButtonList">工作单位：</td><td align="left">' + rArr[5] + '</td>';
                    sHtml += '<td align="right" class="ButtonList">职称：</td><td align="left">' + rArr[7] + '</td>';
                    sHtml += '</tr>';
                    sHtml += '<tr class="mout" height="20">';
                    sHtml += '<td align="right" class="ButtonList">学段：</td><td align="left">' + rArr[8] + '</td>';
                    sHtml += '<td align="right" class="ButtonList">学科：</td><td align="left">' + rArr[9] + '</td>';
                    sHtml += '</tr>';
                    if (MyUser == 'TEACHER' || MyUser == 'USE') {
                        sHtml += '<tr class="mout" height="20">';
                        sHtml += '<td align="right" class="ButtonList">职务：</td><td align="left">' + rArr[6] + '</td>';
                        sHtml += '<td align="right" class="ButtonList">手机号码：</td><td align="left">' + rArr[2] + '</td>';
                        sHtml += '</tr>';
                    }
                    sHtml += '<tr class="mout" height="20">';
                    sHtml += '<td align="right" class="ButtonList">EMAIL：</td><td align="left">' + rArr[3] + '</td>';
                    sHtml += '<td align="right" class="ButtonList">QQ：</td><td align="left">' + rArr[4] + '</td>';
                    sHtml += '</tr>';
                    sHtml += '<tr class="mout" height="20">';
                    sHtml += '<td align="right" class="ButtonList">所属地区：</td><td align="left">' + rArr[10] + rArr[11] + rArr[12] + '</td>';
                    sHtml += '<td align="right" class="ButtonList">用户类型：</td><td align="left">';
                    switch (rArr[14]) {
                    case 'USE':
                        sHtml += '班主任';
                        break;
                    case 'TEACHER':
                        sHtml += '助学导师';
                        break;
                    default:
                        sHtml += '学员';
                        break;
                    }
                    sHtml += '</td>';
                    sHtml += '</tr>';
                    sHtml += '<tr class="mout" height="20">';
                    sHtml += '<td align="right" class="ButtonList">登录次数：</td><td align="left">' + rArr[13] + ' 次</td>';
                    sHtml += '<td align="right" class="ButtonList">最后登录时间：</td><td align="left">' + rArr[15] + '</td>';
                    sHtml += '</tr>';
                    sHtml += '</table>';
                    ShowModal(sDivName, '', 700, 46, 0, 55, false, "null", 0, "0px solid #000000", options.Bg, options.Sll);
                    $("#sModal" + sDivName + "string").css("display", "none");
                    $("#sModal" + sDivName + "Title").html('<span stlye="color:#F00">' + options.sName + "</span>个人信息");
                    $("#sModal" + sDivName + "Str").html(sHtml);
                    var sHeight = 245;
                    if (rArr[14] == 'TEACHER' && MyUser == 'USE') {
                        sHeight = 320;
                        ShowCount(options.UserName, nTItemID, nCentClassID);
                    };
                    LauCons($("#sModal" + sDivName + "Td"), "", 20, sHeight, "");
                }
            }
        },
        error: function() {
            Loading("出现异常，请刷新！");
        }
    });
}

function ShowCount(sUserName, sTItemID, sCentClassID) {
    if (sUserName != null) {
        if (sCentClassID == null) sCentClassID = 0;
        $.ajax({
            type: "POST",
            cache: true,
            url: "/Ajax/SMS.do?action=ShowCount",
            data: {
                UserName: sUserName,
                TItemID: sTItemID,
                CentClassID: sCentClassID
            },
            success: function(data) {
                var IsUser = data.split("{@&}");
                if (IsUser[1] != "0") {
                    if (IsUser[0] != "") alert(ErrStr + IsUser[0]);
                    location.href = GetURL(1) + "//" + GetURL(2) + "/Service/?URL=" + encodeURIComponent(GetURL(0));
                } else {
                    var reArr = IsUser[0].split("{#}");
                    if (reArr[1] == "0") {
                        var rArr = reArr[0].split('|');
                        var sHtml = '<table align="center" width="670" cellspacing="1" cellpadding="3" class="tableBorder" style="margin-top:5px" id="sCountTable">';
                        sHtml += '<tr class="mout" height="20" align="center">';
                        sHtml += '<td width="250" class="ButtonList" colspan="4">作业情况</td>';
                        sHtml += '<td width="250" class="ButtonList" colspan="4">心得情况</td>';
                        sHtml += '<td width="120" class="ButtonList" colspan="2">发贴情况</td>';
                        sHtml += '<td width="60" class="ButtonList">留言情况</td>';
                        sHtml += '</tr>';
                        sHtml += '<tr class="mout" height="20" align="center">';
                        sHtml += '<td>未交作业</td>';
                        sHtml += '<td>未改作业</td>';
                        sHtml += '<td>已改作业</td>';
                        sHtml += '<td>作业总数</td>';
                        sHtml += '<td>未交心得</td>';
                        sHtml += '<td>未改心得</td>';
                        sHtml += '<td>已改心得</td>';
                        sHtml += '<td>心得总数</td>';
                        sHtml += '<td>发贴数量</td>';
                        sHtml += '<td>回贴数量</td>';
                        sHtml += '<td>留言数量</td>';
                        sHtml += '</tr>';
                        sHtml += '<tr class="mout" height="20" align="center">';
                        sHtml += '<td>' + (parseInt(rArr[0]) - parseInt(rArr[1]) - parseInt(rArr[2])) + '</td>';
                        sHtml += '<td>' + rArr[1] + '</td>';
                        sHtml += '<td>' + rArr[2] + '</td>';
                        sHtml += '<td>' + rArr[0] + '</td>';
                        sHtml += '<td>' + (parseInt(rArr[3]) - parseInt(rArr[4]) - parseInt(rArr[5])) + '</td>';
                        sHtml += '<td>' + rArr[4] + '</td>';
                        sHtml += '<td>' + rArr[5] + '</td>';
                        sHtml += '<td>' + rArr[3] + '</td>';
                        sHtml += '<td>' + rArr[6] + '</td>';
                        sHtml += '<td>' + rArr[7] + '</td>';
                        sHtml += '<td>' + rArr[8] + '</td>';
                        sHtml += '</tr>';
                        sHtml += '</table>';
                        $("#sModalPersonnelDataDivStr").append(sHtml);
                    }
                }
            },
            error: function() {
                Loading("出现异常，请刷新！");
            }
        });
    }
}