var timer = null,
maxtime = 10 * 60,
nsTimer = 15,
ErrStr = '温馨提示：\n\n',
nPlayMode = '',
nPlayName = '',
thisPlayer, BBSEditor;
function CountDown() {
    if (maxtime >= 0) {
        var accounting = function() {
            minutes = Math.floor(maxtime / 60);
            seconds = Math.floor(maxtime % 60);
            $("#NowTimer").html("<span style='color:#FF0000'>" + minutes + "</span> 分 <span style='color:#FF0000'>" + seconds + "</span> 秒"); --maxtime;
        };
		
        switch (nPlayMode.toLowerCase()) {
        case 'ori':
            if (thisPlayer) {
                if (thisPlayer.getState() == 'PLAYING') accounting();
            }
            break;
        case 'qvod':
            if ($('#QvodPlayer')[0] || $('#QvodPlayer2')[0]) {
                if (!$.browser.msie) QvodPlayer = $("#QvodPlayer2")[0];
                if (QvodPlayer.PlayState == 3) accounting();
            }
            break;
        case 'bd':
            if ($('#BaiduPlayer')[0]) {
                if (BaiduPlayer.IsPlaying()) accounting();
            }
            break;
		case 'wmp':
            if ($('#MediaPlayer')[0] || $('#MediaPlayer2')[0]) {
                if (!$.browser.msie) MediaPlayer = $("#MediaPlayer2")[0];
                if (MediaPlayer.playState == 3) accounting();
            }
        default:
            accounting();
            break;
        }

    } else {
        clearInterval(timer);
        timer = null;
        switch (nPlayMode.toLowerCase()) {
        case 'ori':
            if (thisPlayer) thisPlayer.pause();
            break;
        case 'qvod':
            if ($('#QvodPlayer')[0] || $('#QvodPlayer2')[0]) {
                if (!$.browser.msie) QvodPlayer = $("#QvodPlayer2")[0];
                if (QvodPlayer.PlayState == 3) QvodPlayer.Pause();
            }
            break;
        case 'bd':
            if ($('#BaiduPlayer')[0]) BaiduPlayer.Play();
            break;
		case 'wmp':
            if ($('#MediaPlayer')[0] || $('#MediaPlayer2')[0]) {
                if (!$.browser.msie) MediaPlayer = $("#MediaPlayer2")[0];
                if (MediaPlayer.playState == 3) accounting();
            }
        default:
            accounting();
            break;
        }

        $("#RecordBut").attr("disabled", false);
        $("#hideBut").attr("disabled", true);
        $("#TimerDiv").show();
    }
}

function setPartition() {
    clearInterval(timer);
    timer = null;
    nsTimer = parseInt($('input[name=ChangeTimer]:checked').val());
    maxtime = nsTimer * 60;
    $("#RecordBut").attr("disabled", true);
    $("#hideBut").attr("disabled", false);
    timer = setInterval(CountDown, 1000);
}

function ShowTimer(options) {
    options = $.extend({
        LogID: 0,
        TItemID: 0,
        CourseID: 0,
        LID: 0,
        UserName: '',
        Length: 0,
        sLook: 0,
        thisTime: '',
        sNotify: ''
    },
    options);

    if ($("#TimerDiv")[0]) $("#TimerDiv").remove();
    $("body").append('<div id="TimerDiv"><table align="center" width="370" height="99%" border="0" cellspacing="0" cellpadding="0"><tr><td align="right" width="130">本次开始观看时间：</td><td align="left" style="color:#F00" id="StartTime" width="240">' + options.thisTime + '</td></tr><tr><td align="right" width="130">已经登记的观看时长：</td><td align="left" width="240"><span style="color:#FF0000; margin-left:0px;" id="RecordTime">' + options.sLook + '</span>分钟</td></tr><tr><td align="right" width="130">离下次登记时间还有：</td><td align="left" width="240" id="NowTimer"></td></tr><tr><td align="right" width="130">设定时长间隔：</td><td align="left" style="cursor:pointer"><input type="radio" id="ChangeTimer1" name="ChangeTimer" value="1"><label for="ChangeTimer1">1分钟</label>&nbsp;<input type="radio" id="ChangeTimer5" name="ChangeTimer" value="5"><label for="ChangeTimer5">5分钟</label>&nbsp;<input type="radio" id="ChangeTimer10" name="ChangeTimer" value="10"><label for="ChangeTimer10">10分钟</label>&nbsp;<input type="radio" id="ChangeTimer15" name="ChangeTimer" value="15"><label for="ChangeTimer15">15分钟</label></td></tr><tr><td align="center" height="20" colspan="2"><span style="color:#F00" id="string">' + options.sNotify + '</span></td></tr><tr><td colspan="2" align="center"><input type="button" id="RecordBut" value="登记观看时长" disabled="disabled" />&nbsp;&nbsp;<input type="button" id="hideBut" value="隐藏计时器" onclick="HideTimer()" /></td></tr></table></div>');
    $("#TimerDiv").css({
        "position": "absolute",
        "z-index": "999",
        "width": "380px",
        "height": "180px",
        "background-color": "#FFF",
        "border": "#FF0000 1px solid"
    });

    $('#RecordBut').click(function() {
        if (options.LogID > 0 && options.TItemID > 0 && options.CourseID > 0 && options.LID > 0 && options.UserName != '') {
            $("#RecordBut").attr("disabled", true);
            $('#string').html('正在记录观看时长，请稍候...');
            //alert("/Ajax/Lesson.do?action=Register&LogID=" + options.LogID + "&TItemID=" + options.TItemID + "&LID=" + options.LID + "&UserName=" + options.UserName + "&Length=" + options.Length + "&sTimer=" + nsTimer);
            $.ajax({
                type: "POST",
                url: "/Ajax/Lesson.do?action=Register",
                data: {
                    LogID: options.LogID,
                    TItemID: options.TItemID,
                    CourseID: options.CourseID,
                    LID: options.LID,
                    UserName: options.UserName,
                    Length: options.Length,
                    sTimer: nsTimer
                },
                success: function(data) {
                    var IsUser = data.split("{@&}");
                    if (IsUser[1] != "0") {
                        alert(IsUser[0]);
                        location.href = GetURL(1) + "//" + GetURL(2) + "/Service/?URL=" + encodeURIComponent(GetURL(0));
                    } else {
                        if (IsUser[0] != "null" && IsUser[0] != "") {
                            var BArray = IsUser[0].split("{*}");
                            if (BArray[1] != "0") {
                                var reg = new RegExp("({n})", "g");
                                alert(BArray[0].replace(reg, "\n"));
                                Close("");
                            } else {
                                var BArr = BArray[0].split("{#}");
                                ShowTimer({
                                    LogID: options.LogID,
                                    TItemID: options.TItemID,
                                    CourseID: options.CourseID,
                                    LID: options.LID,
                                    UserName: options.UserName,
                                    Length: options.Length,
                                    sLook: BArr[1],
                                    thisTime: options.thisTime,
                                    sNotify: BArr[0]
                                });
        switch (nPlayMode.toLowerCase()) {
        case 'ori':
            if (thisPlayer) thisPlayer.play();
            break;
        case 'qvod':
            if ($('#QvodPlayer')[0] || $('#QvodPlayer2')[0]) {
                if (!$.browser.msie) QvodPlayer = $("#QvodPlayer2")[0];
                QvodPlayer.Play();
            }
            break;
        case 'bd':
            if ($('#BaiduPlayer')[0]) BaiduPlayer.Play();
            break;
		case 'wmp':
            if ($('#MediaPlayer')[0] || $('#MediaPlayer2')[0]) {
                if (!$.browser.msie) MediaPlayer = $("#MediaPlayer2")[0];
                MediaPlayer.Play();
            }
        }
                            }
                        } else {
                            alert("WL参数错误，请重试，如果依旧可联系客服！");
                            Close("");
                        }
                    }
                    CloseDiv("LoadingDiv");
                },
                error: function() {
                    Loading("出现异常，请刷新！");
                }
            });

        } else {
            alert("W参数错误，请重试，如果依旧可联系客服！");
            Close("");
        }

    });

    switch (nsTimer) {
    case 1:
    case "1":
        $("#ChangeTimer1").attr('checked', true);
        break;
    case 5:
    case "5":
        $("#ChangeTimer5").attr('checked', true);
        break;
    case 10:
    case "10":
        $("#ChangeTimer10").attr('checked', true);
        break;
    default:
        $("#ChangeTimer15").attr('checked', true);
        break;
    }

    $('input[name=ChangeTimer]').click(function() {
        clearInterval(timer);
        timer = null;
        nsTimer = parseInt($(this).val());
        maxtime = nsTimer * 60;
        $("#RecordBut").attr("disabled", true);
        $("#hideBut").attr("disabled", false);
        timer = setInterval(CountDown, 1000);
    });

    var sRnd = parseInt(10 * Math.random());
    switch (parseInt(sRnd % 4)) {
    case 1:
        $("#TimerDiv").css({
            "right":
            "0px",
            "top": "0px"
        });
        break;
    case 2:
        $("#TimerDiv").css({
            "right":
            "0px",
            "bottom": "0px"
        });
        break;
    case 3:
        $("#TimerDiv").css({
            "left":
            "0px",
            "bottom": "0px"
        });
        break;
    case 0:
        $("#TimerDiv").css({
            "left":
            "0px",
            "top": "0px"
        });
        break;
    }

    $("#TimerDiv").easydrag();

    if (parseInt(options.Length) > 0 && parseInt(options.sLook) >= parseInt(options.Length)) {
        $("#RecordBut").attr("disabled", true);
        $("#hideBut").attr("disabled", true);
        $('input[name=ChangeTimer]').attr("disabled", true);
        setTimeout(function() {
            $('#string').html('此课件观看时长已满足！');
        },
        2000);
    } else {

        if (timer == null) {
            maxtime = parseInt($('input[name=ChangeTimer]:checked').val()) * 60;
            timer = setInterval("CountDown()", 1000);
        }
    }
}

function HideTimer() {
    ShowModal("ConfirmDiv", "<table border=\"0\" align=\"center\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\" height=\"100%\" bordercolor=\"#008DF6\" bgcolor=\"#FFFFFF\" style=\"border:#008DF6 1px solid\"><tr><td align=\"center\" valign=\"middle\"><span style=\"color:#FF0000\">你确定要关闭计时器吗？</span><br>注：关闭后，当系统计时满<span style=\"color:#FF0000\">" + nsTimer + "</span>分钟后会重新出现！</td></tr><tr><td align=\"center\" valign=\"middle\"><input type=\"button\" value=\" 确 定 \" onclick=\"$('#TimerDiv').hide();CloseShowModal('ConfirmDiv', 1, true, '')\">&nbsp;&nbsp;&nbsp;&nbsp;<input type=\"button\" value=\" 取 消 \" onclick=\"CloseShowModal('ConfirmDiv', 1, true, '')\"></td></tr></table>", 280, 90, -500, 0, false, "null");
    $("#TimerDiv").css({
        "z-index": "998"
    });

    $("#ConfirmDiv").css({
        "marginLeft": $("#TimerDiv").css('margin-left'),
        "left": $("#TimerDiv").css('left'),
        "top": $("#TimerDiv").css('top')
    });

}

function ClearRecord(sTItemID, sID, sUser) {
    if (sTItemID != null && sID != null && sUser != null) {
        $.ajax({
            type: "POST",
            url: "/Ajax/Lesson.do?action=ClearRecord&nID=" + sID,
            data: {
                TItemID: sTItemID,
                id: sID,
                UserName: sUser
            }
        });
    }
}

function Broadcast(options) {
    options = $.extend({
        TItemID: 0,
        CourseID: 0,
        CategoryID: 0,
        LID: 0,
        id: 0,
        UserName: ''
    },
    options);

    //alert("/Ajax/Lesson.do?action=Broadcast&TItemID=" + options.TItemID + "&CourseID=" + options.CourseID + "&CategoryID=" + options.CategoryID + "&LID=" + options.LID + "&id=" + options.id + "&UserName=" + options.UserName);

    $.ajax({
        type: "POST",
        url: "/Ajax/Lesson.do?action=Broadcast",
        data: {
            TItemID: options.TItemID,
            CourseID: options.CourseID,
            CategoryID: options.CategoryID,
            LID: options.LID,
            id: options.id,
            UserName: options.UserName
        },
        success: function(data) {
            var IsUser = data.split("{@&}");
            if (IsUser[1] != "0") {
                alert(IsUser[0]);
                location.href = GetURL(1) + "//" + GetURL(2) + "/Service/?URL=" + encodeURIComponent(GetURL(0));
            } else {
                if (IsUser[0] != "null" && IsUser[0] != "") {
                    var BArr = IsUser[0].split("{*}");
                    if (BArr[1] != "0") {
                        var reg = new RegExp("({n})", "g");
                        alert(BArr[0].replace(reg, "\n"));
                        Close("");
                    } else {
                        var sArr = BArr[0].split("{#}");
                        var uArr = sArr[0].split("{&}");
                        if (uArr[3] == '') uArr[3] = 'Ori';
                        PlayMode = uArr[3];

                        CutOver(PlayMode, uArr[0], uArr[1], uArr[2]);

                        if (MyUser == "STUDENT") {
                            ShowTimer({
                                LogID: sArr[1],
                                TItemID: options.TItemID,
                                CourseID: options.CourseID,
                                LID: options.id,
                                UserName: options.UserName,
                                Length: sArr[4],
                                sLook: sArr[2],
                                thisTime: sArr[3],
                                sNotify: ''
                            });
                        }

                        //未外链课件PPT显示
                        if (PlayMode.toLowerCase() != 'frame') {
                            $('#PPT').html('');
                            if ($.trim(uArr[4]) != '') {
                                var PPTArr = uArr[4].split('|');
                                for (var PPTI = parseInt(PPTArr[1]); PPTI <= parseInt(PPTArr[2]); PPTI++) {
                                    $('#PPT').append('<div align="left" style="width:290px;height:24px; cursor:pointer" rel="' + PPTArr[0] + String(PPTI) + '.jpg">PPT ' + PPTI + '</div>');
                                }
                                $("#LPPTIMG").LoadImage({
                                    "src": $('#PPT div:first').attr('rel'),
                                    "imgId": "LPPTIMG",
                                    "parentId": "LPPT"
                                });

                                $('#PPT div:first').css('background', '#E4F143');

                                $('#PPT div').click(function() {
                                    if ($("#LPPTIMG").attr('src') != $(this).attr('rel')) {
                                        $("#LPPTIMG").LoadImage({
                                            "src": $(this).attr('rel'),
                                            "imgId": "LPPTIMG",
                                            "parentId": "LPPT"
                                        });
                                        $('#PPT div').css('background', '');
                                        $(this).css('background', '#E4F143');
                                    }
                                });

                                $("#LPPTIMG").mousedown(function(e) {
                                    e.click();
                                }).bind('contextmenu',
                                function(e) {
                                    return false;
                                });
                            }
                        }

                    }
                } else {
                    alert("WL参数错误！");
                    Close("");
                }
            }
            CloseDiv("LoadingDiv");
        },
        error: function() {
            Loading("出现异常，请刷新！");
        }
    });
}

function CutOver(PlayMode, vURL, qURL, bURL, PlayName) {
    if (nPlayMode != PlayMode) {
        if (nPlayMode != '' && nPlayName != '') {
            ShowModal('TempDiv', '<table border="0" align="center" cellpadding="0" cellspacing="0" width="100%" height="100%" bordercolor="#008DF6" bgcolor="#FFFFFF" style="border:#008DF6 1px solid"><tr><td align="center" valign="middle" id="StuStr">&nbsp;<img src="/images/loading_16x16.gif" width="16" height="16">&nbsp;正切换到"<span style="color:#f00">' + PlayName + '播放器</span>"中，请稍候...<br>你原先所使用的是"<span style="color:#f00">' + nPlayName + '播放器</span>"' + ((nPlayMode != 'Ori') ? '，为了避免影响系统运行速度，请在任务右下角"<span style="color:#f00">' + nPlayName + '播放器</span>"图标点击鼠标"右键"，点击"完全退出"': '') + '！<br><input type="button" id="IKnow" name="IKnow" value="我知道了" onclick="CloseShowModal(\'TempDiv\', 1, true, \'\')"</td></tr></table>', 270, 65, 50, 100, false, 'null');
            window.setTimeout(function() {
                CloseShowModal("TempDiv", 1, true, "");
            },
            60000);
        }

        var PlayModeHTML = '';
        if (vURL == null || vURL == '' || typeof(vURL) == 'undefined') vURL = '';
        if (qURL == null || qURL == '' || typeof(qURL) == 'undefined') qURL = '';
        if (bURL == null || bURL == '' || typeof(bURL) == 'undefined') bURL = '';
		if (qURL == '' && bURL == '') PlayMode = 'Ori';
        nPlayMode = PlayMode;
        //if (vURL != '') PlayModeHTML += '&nbsp;&nbsp;&nbsp;&nbsp;<a href="javascript:void(0)" id="Ori" onclick="CutOver(\'Ori\', \'' + vURL + '\', \'' + qURL + '\', \'' + bURL + '\', \'FLASH\')">FLASH</a>';
        if (qURL != '') PlayModeHTML += '&nbsp;&nbsp;&nbsp;&nbsp;<a href="javascript:void(0)" id="Qvod" onclick="CutOver(\'Qvod\', \'' + vURL + '\', \'' + qURL + '\', \'' + bURL + '\', \'快播\')">快播播放</a>';
        if (bURL != '') PlayModeHTML += '&nbsp;&nbsp;&nbsp;&nbsp;<a href="javascript:void(0)" id="BD" onclick="CutOver(\'BD\', \'' + vURL + '\', \'' + qURL + '\', \'' + bURL + '\', \'百度影音\')">百度影音播放</a>';
        $('#PlayModeDiv').html(PlayModeHTML);

        if (!$("#LessonBody")[0]) {
            var PlayDivName = "SelName",
            PlayDivWidth = "600",
            PlayDivHeight = "500";
        } else {
            var PlayDivName = "LessonBody",
            PlayDivWidth = "331",
            PlayDivHeight = "250";
        }

        switch (PlayMode.toLowerCase()) {
        case "qvod":
            nPlayName = '快播';
            $('#' + PlayDivName).qvod({
                PlayerArea: PlayDivName,
                width: PlayDivWidth,
                height: PlayDivHeight,
                AutoPlay: "true",
                QvodUrl: qURL
            });
            break;
        case "bd":
            nPlayName = '百度影音';
            Player.Xbdyy(PlayDivName, bURL);
            break;
        case "frame":
            nPlayName = '网页';
            ShowModal('TempDiv', '<table border="0" align="center" cellpadding="0" cellspacing="0" width="100%" height="100%" bordercolor="#008DF6" bgcolor="#FFFFFF" style="border:#008DF6 1px solid"><tr><td align="center" valign="middle" id="StuStr">&nbsp;<img src="/images/loading_16x16.gif" width="16" height="16">&nbsp;分析课件信息并加载中，请稍候...</td></tr></table>', 280, 25, 0, 100, false, 'null');
            window.setTimeout(function() {
                CloseShowModal("TempDiv", 1, true, "");
            },
            3000);
            $("body").html('<div id="SelName" style="width:100%; height:' + $(window).height() + '; display:block"><iframe name="LessonFrame" id="LessonFrame" width="100%" height="' + $(window).height() + '" frameborder="0" style="width:100%; height:' + $(window).height() + '" scrolling="auto" src="' + vURL + '"></iframe></div>');
            break;
		case "wmp":
            nPlayName = 'Media Player';
		    $('#' + PlayDivName).html('<object id="MediaPlayer" width="331" height="250" classid="CLSID:6BF52A52-394A-11d3-B153-00C04F79FAA6" type="application/x-oleobject"><param name="ShowPositionControls" value="0" /><param name="AutoStart" value="0" /><param name="EnableContextMenu" value="0"><param name="URL" value="' + vURL + '" /><embed id="MediaPlayer2" width="331" height="250" src="' + vURL + '" type="application/x-mplayer2" autostart="0" EnableContextMenu="0"></embed></object>');
			break;
        default:
            nPlayName = 'Flash';
            $('#' + PlayDivName).html('<div id="jwplayerDiv"></div>');
            thisPlayer = jwplayer('jwplayerDiv').setup({
                flashplayer: '/js/jwplayer/player.swf?autostart=true',
                file: vURL,
                controlbar: 'bottom',
                width: PlayDivWidth,
                height: PlayDivHeight,
                dock: false
            });
            break;
        }
    }
}

function ShowComment(options) {
    options = $.extend({
        TItemID: 0,
        CourseID: 0,
        CategoryID: 0,
        LSID: 0,
        LID: 0,
        sPSize: 10,
        sPage: 1,
        HTML: 'Messages'
    },
    options);
    $.ajax({
        type: "POST",
        url: "/Ajax/Lesson.do?action=ShowComment",
        data: {
            TItemID: options.TItemID,
            CourseID: options.CourseID,
            CategoryID: options.CategoryID,
            LSID: options.LSID,
            LID: options.LID,
            sPSize: options.sPSize,
            page: options.sPage
        },
        success: function(data) {
            var IsUser = data.split("{@&}");
            if (IsUser[1] != "0") {
                if (IsUser[0] != "") {
                    alert(ErrStr + IsUser[0]);
                    location.href = GetURL(1) + "//" + GetURL(2) + "/Service/?URL=" + encodeURIComponent(GetURL(0));
                }
            } else {
                var reArr = IsUser[0].split("{&*}");
                if (reArr[1] == "0") {
                    if (reArr[0] != 'null' && reArr[0] != '') {
                        $('#' + options.HTML + ' tr:not(:first)').remove();
                        var rArr = reArr[0].split('{P*}');
                        var sArr = rArr[0].split('{|}');
                        for (var i = 0; i < sArr.length; i++) {
                            var tArr = sArr[i].split('[|]');
                            var strname = options.HTML + 'Tr' + i;
                            $('#' + options.HTML).append('<tr id="' + strname + '"><Td width="200" align="center" style="border-right:#CCC 1px solid;border-bottom:#CCC 1px solid; display:none" height="100"><img src="/Lesson/images/photo.jpg" width="60" height="60" border="0" ><br>' + tArr[1] + '<br>' + tArr[2] + '<br>' + tArr[3] + ' ' + tArr[4] + ' ' + tArr[5] + '</Td><Td width="550" align="center" valign="top" style="border-bottom:#CCC 1px solid; display:none; word-break:break-all;"><div align="right" style="margin-right:10px">' + tArr[7] + '</div><div align="left" style="margin-top:5px;margin-left:10px;margin-right:10px; width:545px;word-break:break-all;">' + tArr[6] + '</div></Td></tr>');
                            $('#' + strname + ' td').fadeIn(i * 200);
                        }
                        $('#' + options.HTML).append('<tr><Td align="center" colspan="2" style="border-bottom:#CCC 1px solid" height="40"><div align="left" style="margin-left:10px;margin-right:10px">' + rArr[1] + '</div></Td></tr>');
                        $('#' + options.HTML + ' td div').css('word-break', 'break-all');
                        $('#' + options.HTML + ' tr:not(:last-child):odd').css('background', '#FFF');
                        $('#' + options.HTML + ' tr:not(:last-child):even').css('background', '#e1e8df');
                    }
                } else {
                    alert(ErrStr + reArr[0].replace(/{n}/g, "\n"));
                }
            }
            CloseDiv("LoadingDiv");
        },
        error: function() {
            Loading("出现异常，请刷新！");
        }
    });
}

$(function() {
    if ($('#Body')[0]) {
        BBSEditor = $('#Body').xheditor({
            tools: 'simple',
            skin: 'o2007silver',
            layerShadow: 5
        });
    }
    $('#SendComment').click(function() {
        $(this).attr('disabled', true).val('提交中，请稍候...');
        var CheckCode = $.trim($('#CheckCode').val()),
        Body = $('#Body').val(),
        isErr = false,
        Json = '{',
        sJson = '';
        $('input[type=hidden]').each(function() {
            if ($(this).val() == '') {
                isErr = true;
            } else {
                Json += $(this).attr('id') + ':' + $(this).val() + ',';
            }
        });

        if (Body.length < 8) {
            $('#BodyStr').css({
                'color': '#F00',
                'font-weight': 'bold'
            }).html("<span style='color:#000'>×</span> 内容不能少于8个字符！");
            isErr = true;
        } else {
            $('#BodyStr').css({
                'color': '#000',
                'font-weight': 'bold'
            }).html("");
            Json += 'Body:"' + escape(Body) + '",'
        }

        var filter = /^\s*[0-9]{6}\s*$/;
        if (!filter.test(CheckCode)) {
            $('#CheckCodeStr').css({
                'color': '#F00',
                'font-weight': 'bold'
            }).html("<span style='color:#000'>×</span> 请输入图片中的6个数字！");
            isErr = true;
        } else {
            $('#CheckCodeStr').css({
                'color': '#000',
                'font-weight': 'bold'
            }).html("√");
            Json += 'CheckCode: "' + CheckCode + '"}';
        }

        if (isErr) {
            $(this).attr('disabled', false).val(' 提 交 ');
        } else {
            $.ajax({
                type: "POST",
                url: "/Ajax/Lesson.do?action=SendComment",
                data: eval('(' + Json + ')'),
                success: function(data) {
                    var IsUser = data.split("{@&}");
                    if (IsUser[1] != "0") {
                        if (IsUser[0] != "") {
                            alert(ErrStr + IsUser[0]);
                            location.href = GetURL(1) + "//" + GetURL(2) + "/Service/?URL=" + encodeURIComponent(GetURL(0));
                        }
                    } else {
                        var reArr = IsUser[0].split("|");
                        ChangeImg();
                        if (reArr[1] == "0") {
                            $('#success').css('color', '#F00').html('（' + reArr[0] + '）');
                            $('#Body').val('');
                            $('#CheckCode').val('');
                            setTimeout(function() {
                                $('#success').html('');
                            },
                            3000);
                            ShowComment({
                                TItemID: $('#TItemID').val(),
                                CourseID: $('#CourseID').val(),
                                CategoryID: $('#CategoryID').val(),
                                LSID: $('#LSID').val(),
                                LID: $('#LID').val()
                            });
                        } else {
                            var sDiv = 'success';
                            if (reArr[0].indexOf('验证码') != -1) {
                                sDiv = 'CheckCodeStr';
                            } else if (reArr[0].indexOf('内容') != -1) {
                                sDiv = 'BodyStr';
                            }
                            $('#' + sDiv).css({
                                'color': '#F00',
                                'font-weight': 'bold'
                            }).html('&nbsp;<span style="color:#000">×</span> ' + reArr[0]);
                        }
                        $('#SendComment').attr('disabled', false).val(' 提 交 ');
                    }
                    CloseDiv("LoadingDiv");
                },
                error: function() {
                    Loading("出现异常，请刷新！");
                }
            });
        }
    });
});