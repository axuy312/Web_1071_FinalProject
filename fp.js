var score = 0;//遊戲分數
//var countTime = 0;//遊戲開始的時間計時
var songStart = null;//遊戲是否開始
var keyArrNumS = 0;//讀取短鍵map的指標
var keyArrNumLBegin = 0;//讀取長鍵map的指標
var shortKey = [0, 1];//短鍵map
var longKey = [0, 0, 1];//長鍵map
var keyTopValue = new Array();//鍵離頂部的高度
var interval = new Array();//按鍵動化 落下
var order = new Array();//按鍵落下順序
var ordernum = [0, 0, 0, 0];////按鍵落下順序鍵位置
for (var i = 0; i < 4; i++) {
    order[i] = new Array();//初始化每個order
}
var miss = [];//miss 判定鍵
var good = [];//good 判定鍵
var inside = [];//判定是否在長條壓下 做中途放開 miss判定
var ifKeyDown = [0, 0, 0, 0];//按鍵位置判定是否壓下(1)及長壓(2)
var pressing = [0, 0, 0, 0];//判定長壓迴圈是否存在
//歌曲名
//var songMap = ["Day of dush-1", "Crescent Moon", "Kiss you Baby", "KPKS-1", "KPKS-2", "crack", "day of dush-2", "paranoia", "PM-1", "PM-2", "天之弱"];//歌曲名
var songMap = ["Day of dush", "Crescent Moon", "Kiss you Baby"];
//
var songMapData = ["Day_of_dush", "Crescent_Moon", "Kiss_you_Baby", "KPKS-1", "KPKS-2", "crack", "day_of_dush-2", "paranoia", "PM-1", "PM-2", "天之弱"];
var songMapKey = [["DOD短鍵", "DOD長鍵"], ["csm長鍵", "csm短鍵"], ["KYB長鍵", "KYB短鍵"], ["temp", "tempL"], ["temp", "tempL"], ["temp", "tempL"], ["temp", "tempL"], ["temp", "tempL"], ["temp", "tempL"], ["temp", "tempL"], ["temp", "tempL"], ["temp", "tempL"]];//"長鍵","短鍵"
var photol = ["DOD-2", "crescent moon", "kiss you baby", "KPKS-1", "KPKS-2", "crack", "day of dush", "paranoia", "PM-1", "PM-2", "天之弱"];
var songStop = 0;//歌曲是否暫停 
//var delay = 0;
var selfInterval = 0;
var debugValue = 0;
var accInterval = 0;

var combo = 0;
var comboInterval = 0;

var visibility = 0;
///* 背景切換動畫用
var runBgInterval = 0;
var startEffectInterval = 0;
var bgOpacity = 0;
var selectSong = -1;//做為新的選歌選被背景的Index
var resultSelectSong = -1;
var bgScale = 1;
var selectOverInterval = 0;
var selectOutInterval = 0;
//*/
var haveSelect = 0;
var isReselect = 0;
var textInput = 0;
function debug() {																	//debug
    var bug = document.body.querySelectorAll("p");
    bug[0].innerHTML = selfInterval;
}
///*可以取代
google.load("jquery", "1");
function loadSong() {//進入網頁 讀取歌曲
    for (var i in songMap) {
        document.body.innerHTML += "<div id = 'selectedSong" + i + "' class = 'selectedSong' style = 'top : " +
            (i * 70 + 100) + "px;' onclick = 'start(" + i + ")' onmouseover = 'assignSong(" + i + ")'><div id = 'songText'>" + songMap[i] + "</div></div>"
        ///*圖片、Key位置更新
        photol[i] = "background\\" + photol[i] + ".png";
        songMapKey[i][0] = "keyData\\" + songMapKey[i][0] + ".js";
        songMapKey[i][1] = "keyData\\" + songMapKey[i][1] + ".js";
        //*/
    }
    /*
    var debug = window.setInterval("debug()",500);//debug
    //*/
}
//*/
function start(songnum/*第幾首歌*/) {													//按下div歌曲
    if (!songStart && resultSelectSong == -1) {
        if (!runBgInterval && !startEffectInterval) {
            bgOpacity = 0.5;
            bgScale = 1;
            startEffectInterval = window.setInterval("startEffect()", 50);
        }
        var openFile = document.head.querySelectorAll("script");
        //var pauseborder = document.getElementById( "pause" );
        if (!selfInterval) {
            openFile[0].src = songMapKey[songnum][0];
            openFile[1].src = songMapKey[songnum][1];
            var fun = "start(" + songnum + ")";
            selfInterval = window.setInterval(fun, 100);
        }
        else if (selfInterval) {
            shortKey = shortKeyMap();
            longKey = longKeyMap();
            var a = document.getElementById("b");//取得遊戲界面div
            var b = document.getElementById("playmusic");
            //初始化
            $("#name").html("");
            clearInterval(textInput);
            isReselect = 0;
            a.innerHTML = "<div></div>";
            score = 0;
            keyArrNumS = 0;
            countTime = 0;
            keyArrNumLBegin = 0;
            ordernum = [0, 0, 0, 0];
            songStop = 0;
            combo = 0;
            var comboShow = document.getElementById("combo");
            comboShow.innerHTML = "";
            //pauseborder.style = "border : solid 0px black;background-color:rgba(0,0,0,0)";
            //pauseborder.innerHTML = "";
            b.innerHTML = " <audio src='" + "music\\" + songMap[songnum] + ".wav'" + " autoplay=true id = 'player'> ";//放歌
            //*/
            //音量
            var c = document.getElementById("player");
            c.volume = 0.2;//考慮做成變數
            //*/
            songStart = window.setInterval("run()", 10);//歌曲開始
            openFile[0].src = "";
            openFile[1].src = "";
            window.clearInterval(selfInterval);
            selfInterval = 0;
        }
    }
}
function run() {																	//讀取按鍵
    ///*
    var c = document.getElementById("player");
    if (songStop && haveSelect == 1) {
        //document.getElementById("p").innerHTML += haveSelect;
        songStop = 0;
        cleanSelection();
        c.play(1);
        return;
    }
    //*/
    var innumber = 0;//讀取按鍵數
    var a = document.getElementById("b");//取得遊戲界面div
    //score
    var c = document.getElementById("score");
    c.innerHTML = "<h1>" + score + "</h1>";
    //*/
    var c = document.getElementById("player");
    var countTime = c.currentTime * 1000;
    while (shortKey[keyArrNumS] - 1100 <= countTime) {//讀取短鍵時間
        innumber = keyArrNumLBegin / 3 + keyArrNumS / 2 + 1;//兩個加總取得鍵數
        a.innerHTML += "<div style = 'top : 20px;' class = 'b" + shortKey[keyArrNumS + 1] + "'></div>";//寫入div
        ordernum[shortKey[keyArrNumS + 1] - 1] += 1;
        //宣告替代變數
        var key = shortKey[keyArrNumS + 1] - 1;
        var keyOrder = ordernum[shortKey[keyArrNumS + 1] - 1];
        //*/
        //初使化
        keyTopValue[innumber] = shortKey[keyArrNumS] - 1100;
        order[key][keyOrder] = 1;
        //*/
        var fun = "keyS(" + innumber + "," + key + "," + keyOrder + ")";//傳入的function
        interval[innumber] = window.setInterval(fun, 10);//按鍵回圈
        keyArrNumS++; keyArrNumS++;
    }
    while (longKey[keyArrNumLBegin] - 1100 <= countTime) {
        innumber = keyArrNumLBegin / 3 + keyArrNumS / 2 + 1;//兩個加總取得鍵數
        a.innerHTML += "<div style = 'top : 20px;' class = 'b" + longKey[keyArrNumLBegin + 2] + "'></div>";//寫入div
        ordernum[longKey[keyArrNumLBegin + 2] - 1] += 1;//在不同排的按鍵數
        //宣告替代變數
        var key = longKey[keyArrNumLBegin + 2] - 1;
        var keyOrder = ordernum[longKey[keyArrNumLBegin + 2] - 1];
        //*/
        //初使化
        keyTopValue[innumber] = longKey[keyArrNumLBegin] - 1100;
        miss[innumber] = 0;
        good[innumber] = 0;
        inside[innumber] = 0;
        order[key][keyOrder] = 1;
        //*/
        var fun = "keyL(" + innumber + "," + (longKey[keyArrNumLBegin + 1] - 1100) +
            "," + key + "," + keyOrder + ")";//傳入的function
        interval[innumber] = window.setInterval(fun, 10);//按鍵回圈
        keyArrNumLBegin++; keyArrNumLBegin++; keyArrNumLBegin++;
    }
    if (c.ended) {
        window.clearInterval(songStart);//結束回圈
        //歸零
        songStart = null;
        keyArrNumS = 0;
        countTime = 0;
        keyArrNumLBegin = 0;
        ordernum = [0, 0, 0, 0];
        //*/
		resultSelectSong = selectSong;
        $("#name").html("<div id = 'nameDiv'><p style = 'fontFamily : sorceListFace'>Name: </p><input onkeydown = 'lenTest()' onkeyup = 'lenTest()' type = 'text' id = 'inputName' placeholder = '禁用符號 : - or /' style = 'width : 170px'></br></br><input type = 'button' value = '送出' onclick = 'inputNameF()'></div>");
        textInput = setInterval("lenTest()", 10);
        return;
    }
}
function lenTest() {
    var textLength = 0;
    var name = $("#inputName").val();
    $("#inputName").val(name.substring(0, 20));
    var name = $("#inputName").val();
    for (var i = 0; i < name.length; i++) {
        if (name.charCodeAt(i) > 256) {
            textLength += 2;
        } else {
            textLength++;
        }
        if (textLength > 20) {
            $("#inputName").val(name.substring(0, i));
            break;
        }
    }
    $("#inputName").val(name.replace('/',''));
    $("#inputName").val(name.replace('-',''));
    //$("#debug").html(textLength);
}
function inputNameF() {
    var name = $("#inputName").val();
    $.ajax({
        url: "inputData.php",
        data: {
            songname: songMapData[resultSelectSong],
            name: name,
            score: score,
        },
        type: "POST",
        datatype: "html",
        success: function (out) {
            if (out == 1) {
				resultSelectSong = -1;
                clearInterval(textInput);
                $("#name").html("");
                scoreList();
            }
            else {
                alert("失敗");
            }
        },
        error: function () {
            alert("失敗");
        }
    });

}

function keyS(m, key, keyOrder) {														//短鍵落下迴圈
    var border = document.getElementById("b").querySelectorAll("div");//取得自己的div
    var c = document.getElementById("player");
    var countTime = c.currentTime * 1000;
    if (songStop) {
        if (selfInterval || isReselect) {
            window.clearInterval(interval[m]);//結束回圈
            //歸零
            interval[m] = 0;
            order[key][keyOrder] = 0;
            border[m].style = "border : solid black 0px; top : 600px; height : 0px;";
            return;
        }
        return;
    }
    var keyTop = parseInt((countTime - keyTopValue[m]) / 10) * 5;
    border[m].style.top = keyTop;//高度更新
    if (keyTop > 600) {//超過邊框
        window.clearInterval(interval[m])//停止迴圈;
        //歸零
        interval[m] = 0;
        order[key][keyOrder] = 0;
        border[m].style = "border : solid black 0px; top : 600px; height : 0px;";
        //*/
        var acc = document.getElementById("acc");
        acc.innerHTML = "<h2 style = 'color : red;'>Miss</h2>";
        combo = 0;
        var comboShow = document.getElementById("combo");
        comboShow.innerHTML = "";
        visibility = 10;
        if (!accInterval) {
            accInterval = window.setInterval("accTime()", 100);
        }
    }
    else if (keyTop > 500 && !order[key][keyOrder - 1]) {	//在這個位置時
        if (ifKeyDown[key] == 1) {								//如果按鍵按下
            ifKeyDown[key] = 2;//把按鍵設為長按  才不會重複判定
            score += 100;//加分
            window.clearInterval(interval[m]);//結束回圈
            //歸零
            interval[m] = 0;
            order[key][keyOrder] = 0;
            border[m].style = "border : solid black 0px; top : 600px; height : 0px;";
            //*/
            var acc = document.getElementById("acc");
            acc.innerHTML = "<h2 style = 'color : blue;'>Perfect</h2>";
            combo += 1;
            var comboShow = document.getElementById("combo");
            comboShow.innerHTML = combo;
            if (!comboInterval) {
                comboInterval = window.setInterval("comboEffect()", 1000);
            }
                visibility = 10;
            if (!accInterval) {
                accInterval = window.setInterval("accTime()", 100);
            }
        }
    }
    else if (keyTop > 450 && !order[key][keyOrder - 1]) {
        if (ifKeyDown[key] == 1) {
            ifKeyDown[key] = 2;
            score += 50;
            window.clearInterval(interval[m]);
            interval[m] = 0;
            order[key][keyOrder] = 0;
            border[m].style = "border : solid black 0px; top : 600px; height : 0px;";
            var acc = document.getElementById("acc");
            acc.innerHTML = "<h2 style = 'color : green;'>Good</h2>";
            combo += 1;
            var comboShow = document.getElementById("combo");
            comboShow.innerHTML = combo;
            if (!comboInterval) {
                comboInterval = window.setInterval("comboEffect()", 1000);
            }
            visibility = 10;
            if (!accInterval) {
                accInterval = window.setInterval("accTime()", 100);
            }
        }
    }
    else if (keyTop > 400 && !order[key][keyOrder - 1]) {
        if (ifKeyDown[key] == 1) {
            ifKeyDown[key] = 2;
            window.clearInterval(interval[m]);
            interval[m] = 0;
            order[key][keyOrder] = 0;
            border[m].style = "border : solid black 0px; top : 600px; height : 0px;";
            var acc = document.getElementById("acc");
            acc.innerHTML = "<h2 style = 'color : red;'>Miss</h2>";
            combo = 0;
            var comboShow = document.getElementById("combo");
            comboShow.innerHTML = "";
            visibility = 10;
            if (!accInterval) {
                accInterval = window.setInterval("accTime()", 100);
            }
        }
    }
}
function keyL(m, secKeyTime, key, keyOrder) {										//長鍵落下回圈
    var border = document.getElementById("b").querySelectorAll("div");//取得自己的div
    var acc = document.getElementById("acc");
    var c = document.getElementById("player");
    var countTime = c.currentTime * 1000;
    var keyButton = parseInt(parseInt(countTime - keyTopValue[m]) / 10) * 5;
    var keyTop = parseInt(parseInt(countTime - secKeyTime) / 10) * 5;
    if (songStop) {
        if (selfInterval || isReselect) {
            window.clearInterval(interval[m]);//結束回圈
            //歸零
            interval[m] = 0;
            order[key][keyOrder] = 0;
            border[m].style = "border : solid black 0px; top : 600px; height : 0px;";
            return;
        }
        return;
    }
    //miss
    if (inside[m] && keyTop < 450) {//如果按下過的條件下 長度在40以上
        if (!ifKeyDown[key]) {							//按鍵放開
            var acc = document.getElementById("acc");
            acc.innerHTML = "<h2 style = 'color : red'>Miss</h2>";
            combo = 0;
            var comboShow = document.getElementById("combo");
            comboShow.innerHTML = "";
            visibility = 10;
            if (!accInterval) {
                accInterval = window.setInterval("accTime()", 100);
            }
            else {
                window.clearInterval(accInterval);
                accInterval = window.setInterval("accTime()", 100);
            }
            miss[m] = 1;
            border[m].style.backgroundColor = "gray";
        }
    }
    //*/
    //no miss
    else if (inside[m] && keyTop > 450) {//如果按下過的條件下 長度在40內
        if (!ifKeyDown[key]) {						 //按鍵放開
            window.clearInterval(interval[m]);//結束回圈
            //歸零
            interval[m] = 0;
            order[key][keyOrder] = 0;
            border[m].style = "border : solid black 0px; top : 600px; height : 0px;";
            //*/
        }
    }
    //*/
    if (keyTop <= 0 && keyButton < 600) {//按鍵長度時間判定 還在長度內
        border[m].style.height = keyButton;//長度更新
    }
    else if (keyTop > 20) {//如果超過長度時間
        border[m].style.top = keyTop;//高度更新
    }
    if (keyTop + parseInt(border[m].style.height) >= 600) {//如果底部超過遊戲界面
        if (keyTop <= 0) {
            border[m].style.height = 600 - 20;//高度更新
        }
        else {
            border[m].style.height = 600 - keyTop;
        }
        miss[m] = 1;
        order[key][keyOrder] = 0;
        border[m].style.backgroundColor = "gray";
        var acc = document.getElementById("acc");
        acc.innerHTML = "<h2 style = 'color : red;'>Miss</h2>";
        combo = 0;
        var comboShow = document.getElementById("combo");
        comboShow.innerHTML = "";
        visibility = 10;
        if (!accInterval) {
            accInterval = window.setInterval("accTime()", 100);
        }
        else {
            window.clearInterval(accInterval);
            accInterval = window.setInterval("accTime()", 100);
        }
    }
    else if (keyButton > 500 && !good[m] && !miss[m] && !order[key][keyOrder - 1]) {//前一項結束
        if (ifKeyDown[key] == 1) {//如果按鍵按下
            var acc = document.getElementById("acc");
            acc.innerHTML = "<h2 style = 'color : blue;'>Perfect</h2>";
            combo += 1;
            var comboShow = document.getElementById("combo");
            comboShow.innerHTML = combo;
            if (!comboInterval) {
                comboInterval = window.setInterval("comboEffect()", 1000);
            }
            visibility = 10;
            if (!accInterval) {
                accInterval = window.setInterval("accTime()", 100);
            }
            else {
                window.clearInterval(accInterval);
                accInterval = window.setInterval("accTime()", 100);
            }
            ifKeyDown[key] = 2;
            score += 100;
            order[key][keyOrder] = 0;
            inside[m] = 1;
            border[m].style.backgroundColor = "black";
        }
        else if (ifKeyDown[key] == 2 && inside[m]) {//如果長按 且按鍵有在時間內按下
            score += 10;
            if (keyTop <= 0) {
                border[m].style.height = 550 - 20;//高度更新
            }
            else {
                border[m].style.height = 550 - keyTop;
            }
            if (keyTop > 550) {//如果長度為0
                window.clearInterval(interval[m]);//結束回圈
                //歸零
                interval[m] = 0;
                order[key][keyOrder] = 0;
                border[m].style = "border : solid black 0px; top : 600px; height : 0px;";
                //*/
                return;
            }
        }
    }
    else if (keyButton > 450 && !miss[m] && !order[key][keyOrder - 1]) {
        if (ifKeyDown[key] == 1) {//如果按鍵按下
            var acc = document.getElementById("acc");
            acc.innerHTML = "<h2 style = 'color : green;'>Good</h2>";
            combo += 1;
            var comboShow = document.getElementById("combo");
            comboShow.innerHTML = combo;
            if (!comboInterval) {
                comboInterval = window.setInterval("comboEffect()", 1000);
            }
            visibility = 10;
            if (!accInterval) {
                accInterval = window.setInterval("accTime()", 100);
            }
            else {
                window.clearInterval(accInterval);
                accInterval = window.setInterval("accTime()", 100);
            }
            ifKeyDown[key] = 2;
            score += 50;
            good[m] = 1;
            order[key][keyOrder] = 0;
            inside[m] = 1;
            border[m].style.backgroundColor = "black";
        }
        else if (ifKeyDown[key] == 2) {//如果長按 且按鍵有在時間內按下
            score += 5;
            //同上
            if (keyTop <= 0) {
                border[m].style.height = 550 - 20;//高度更新
            }
            else {
                border[m].style.height = 550 - keyTop;
            }
            if (keyTop > 550) {
                window.clearInterval(interval[m]);
                interval[m] = 0;
                order[key][keyOrder] = 0;
                border[m].style = "border : solid black 0px; top : 600px; height : 0px;";
                return;
            }
            //*/
        }
    }
    else if (keyButton > 400 && !miss[m] && !order[key][keyOrder - 1]) {//如果太早按
        if (ifKeyDown[key] == 1) {
            var acc = document.getElementById("acc");
            acc.innerHTML = "<h2 style = 'color : red;'>Miss</h2>";
            combo = 0;
            var comboShow = document.getElementById("combo");
            comboShow.innerHTML = "";
            visibility = 10;
            if (!accInterval) {
                accInterval = window.setInterval("accTime()", 100);
            }
            else {
                window.clearInterval(accInterval);
                accInterval = window.setInterval("accTime()", 100);
            }
            miss[m] = 1;
            order[key][keyOrder] = 0;
            border[m].style.backgroundColor = "gray";
        }
    }
    if (keyTop >= 600) {//如果結束
        window.clearInterval(interval[m]);//結束回圈
        //歸零
        interval[m] = 0;
        order[key][keyOrder] = 0;
        border[m].style = "border : solid black 0px; top : 600px; height : 0px;";
        //*/
        return;
    }
}

function keyDown(e) {
    var border = document.getElementById("a").querySelectorAll("div");															//如果按鍵被按下
    if (e.which == 40) {//方向鍵下
        if (!runBgInterval && !songStart && !selfInterval) {
            if (selectSong != -1) {
                document.images[0].src = photol[selectSong];
            }
            if (++selectSong == songMap.length) {
                selectSong = 0;
            }
            for (var i in songMap) {
                if (i < selectSong) {
                    document.getElementById("selectedSong" + i).setAttribute("style", "width : 400px; height : 60px; margin-left : -710px; top : " + (i * 70 + 100) + "px;");
                    document.getElementById("selectedSong" + i).innerHTML = "<div id = 'songText' style = 'font-size : 25x; line-height:20px; width : 370px;'>" + songMap[i] + "</div>"
                }
                else if (i == selectSong) {
                    document.getElementById("selectedSong" + i).setAttribute("style", "width : 500px; height : 80px; margin-left : -810px; top : " + (i * 70 + 100) + "px;");
                    document.getElementById("selectedSong" + i).innerHTML = "<div id = 'songText' style = 'font-size : 40px; line-height:30px; width : 470px;'>" + songMap[i] + "</div>"
                }
                else {
                    document.getElementById("selectedSong" + i).setAttribute("style", "width : 400px; height : 60px; margin-left : -710px; top : " + (i * 70 + 120) + "px;");
                    document.getElementById("selectedSong" + i).innerHTML = "<div id = 'songText' style = 'font-size : 25px; line-height:20px; width : 370px;'>" + songMap[i] + "</div>"
                }
            }
            bgOpacity = 0;
            bgScale = 2;
            runBgInterval = window.setInterval("updateBg()", 30);
            document.getElementById("backBG").setAttribute("style", "display : block;");
            scoreList();//分數表
        }
    }
    else if (e.which == 38) {//方向鍵上
        if (!runBgInterval && !songStart && !selfInterval) {
            if (selectSong != -1) {
                document.images[0].src = photol[selectSong];
            }
            if (--selectSong == -1) {
                selectSong = songMap.length - 1;
            }
            for (var i in songMap) {
                if (i < selectSong) {
                    document.getElementById("selectedSong" + i).setAttribute("style", "width : 400px; height : 60px; margin-left : -710px; top : " + (i * 70 + 100) + "px;");
                    document.getElementById("selectedSong" + i).innerHTML = "<div id = 'songText' style = 'font-size : 25x; line-height:20px; width : 370px;'>" + songMap[i] + "</div>"
                }
                else if (i == selectSong) {
                    document.getElementById("selectedSong" + i).setAttribute("style", "width : 500px; height : 80px; margin-left : -810px; top : " + (i * 70 + 100) + "px;");
                    document.getElementById("selectedSong" + i).innerHTML = "<div id = 'songText' style = 'font-size : 40px; line-height:30px; width : 470px;'>" + songMap[i] + "</div>"
                }
                else {
                    document.getElementById("selectedSong" + i).setAttribute("style", "width : 400px; height : 60px; margin-left : -710px; top : " + (i * 70 + 120) + "px;");
                    document.getElementById("selectedSong" + i).innerHTML = "<div id = 'songText' style = 'font-size : 25px; line-height:20px; width : 370px;'>" + songMap[i] + "</div>"
                }
            }
            bgOpacity = 0;
            bgScale = 2;
            runBgInterval = window.setInterval("updateBg()", 30);
            document.getElementById("backBG").setAttribute("style", "display : block;");
            scoreList();//分數表
        }
    }
    else if (e.which == 13) {//迴車鍵

        if (selectSong != -1 && !songStart) {
            start(selectSong);
        }
    }
    else if (parseInt(e.which) == 68) {//如果是D鍵
        border[0].style.backgroundColor = "black";
        if (ifKeyDown[0] != 2) {//如果沒有長按
            ifKeyDown[0] = 1;
            if (!pressing[0]) {//防呆
                pressing[0] = window.setInterval("press(0)", 100);//秒後判定為長按
            }
        }
    }
    else if (parseInt(e.which) == 70) {//如果是F鍵
        border[1].style.backgroundColor = "black";
        if (ifKeyDown[1] != 2) {//如果沒有長按
            ifKeyDown[1] = 1;
            if (!pressing[1]) {//防呆
                pressing[1] = window.setInterval("press(1)", 100);//秒後判定為長按
            }
        }
    }
    else if (parseInt(e.which) == 74) {//如果是J鍵
        border[2].style.backgroundColor = "black";
        if (ifKeyDown[2] != 2) {//如果沒有長按
            ifKeyDown[2] = 1;
            if (!pressing[2]) {//防呆
                pressing[2] = window.setInterval("press(2)", 100);//秒後判定為長按
            }
        }
    }
    else if (parseInt(e.which) == 75) {//如果是K鍵
        border[3].style.backgroundColor = "black";
        if (ifKeyDown[3] != 2) {//如果沒有長按
            ifKeyDown[3] = 1;
            if (!pressing[3]) {//防呆
                pressing[3] = window.setInterval("press(3)", 100);//秒後判定為長按
            }
        }
    }
    else if (parseInt(e.which) == 27) {//如果是ESC鍵
        var c = document.getElementById("player");
        if (songStop && songStart && !selfInterval && haveSelect == 1) { //如果暫停且歌曲沒結束
            run();
            songStart = window.setInterval("run()", 10);
            //delay = window.setInterval("delayFun()",10);
        }
        else if (songStart && !selfInterval && haveSelect == 0) {
            songStop = 1;
            c.pause(1);
            window.clearInterval(songStart);
            songStart = 1;
            addSelection();
        }
    }
}

function accTime() {
    var acc = document.getElementById("acc");
    acc.style.opacity = visibility / 10;
    visibility -= 1;
    if (!visibility) {
        window.clearInterval(accInterval);
        accInterval = 0;
        acc.style.opacity = 0;
    }
}

function keyUP(e) {																	//按鍵放開
    var border = document.getElementById("a").querySelectorAll("div");
    if (parseInt(e.which) == 68) {
        border[0].style.backgroundColor = "rgba(0,0,0,0)";
        ifKeyDown[0] = 0;
    }
    if (parseInt(e.which) == 70) {
        border[1].style.backgroundColor = "rgba(0,0,0,0)";
        ifKeyDown[1] = 0;
    }
    if (parseInt(e.which) == 74) {
        border[2].style.backgroundColor = "rgba(0,0,0,0)";
        ifKeyDown[2] = 0;
    }
    if (parseInt(e.which) == 75) {
        border[3].style.backgroundColor = "rgba(0,0,0,0)";
        ifKeyDown[3] = 0;
    }
}
function press(m) {
    if (ifKeyDown[m]) {
        ifKeyDown[m] = 2;
    }
    window.clearInterval(pressing[m]);
    pressing[m] = 0;
}

function updateBg() {																//背景更新
    document.images[1].src = photol[selectSong];
    document.getElementById("frontBG").setAttribute("style", "transform : scale(" + bgScale + "); opacity : " + bgOpacity + ";");
    document.getElementById("backBG").setAttribute("style", "opacity : " + (0.5 - bgOpacity) + ";");
    //document.getAttention
    bgOpacity += 0.05;
    bgScale -= 0.1;
    if (bgScale <= 1) {
        document.getElementById("backBG").setAttribute("style", "opacity : 0; display : none;");
        document.getElementById("frontBG").setAttribute("style", "transform : scale(1); opacity : 0.5;");
        window.clearInterval(runBgInterval);
        runBgInterval = 0;
    }
}

function assignSong(numSong) {
    if (!runBgInterval && selectSong != numSong && !songStart && !selfInterval) {
        selectSong = numSong;
        //var assignAnimationSetInterval = window.setInterval("assignAnimation()", 30, numSong);
        document.images[0].src = photol[numSong];
        for (var i in songMap) {
            if (i < numSong) {
                document.getElementById("selectedSong" + i).setAttribute("style", "width : 400px; height : 60px; margin-left : -710px; top : " + (i * 70 + 100) + "px;");
                document.getElementById("selectedSong" + i).innerHTML = "<div id = 'songText' style = 'font-size : 25x; line-height:20px; width : 370px;'>" + songMap[i] + "</div>"
            }
            else if (i == numSong) {
                document.getElementById("selectedSong" + i).setAttribute("style", "width : 500px; height : 80px; margin-left : -810px; top : " + (i * 70 + 100) + "px;");
                document.getElementById("selectedSong" + i).innerHTML = "<div id = 'songText' style = 'font-size : 40px; line-height:30px; width : 470px;'>" + songMap[i] + "</div>"
            }
            else {
                document.getElementById("selectedSong" + i).setAttribute("style", "width : 400px; height : 60px; margin-left : -710px; top : " + (i * 70 + 120) + "px;");
                document.getElementById("selectedSong" + i).innerHTML = "<div id = 'songText' style = 'font-size : 25px; line-height:20px; width : 370px;'>" + songMap[i] + "</div>"
            }
        }
        bgOpacity = 0;
        bgScale = 2;
        runBgInterval = window.setInterval("updateBg()", 10);
        document.getElementById("backBG").setAttribute("style", "display : block;");
        scoreList();//分數表
    }
}

function scoreList() {
    $.ajax({
        url: "loadscore.php",
        data: {
            songname: songMapData[selectSong],
        },
        type: 'POST',
        success: function (out) {
            //document.getElementById("scoreList").innerHTML = out;
			out = out.split('/');
			var list = document.getElementById("scoreList").querySelectorAll("div");		
			for(var i = 1; i <= 8; i++){
				if (!out[i - 1]){
					list[i].innerHTML = "";
				}
				else{
					list[i].innerHTML = out[i - 1] + "分";
				}
			}
        },
        error: function () {
            alert("Request failed.");
        }
    });
}

function startEffect() {
    //alert(startEffectInterval);
    if (bgScale <= 1.8) {
        document.getElementById("frontBG").setAttribute("style", "transform : scale(" + bgScale + "); opacity : " + bgOpacity + ";");
    }
    else if (bgScale < 2) {
        document.getElementById("frontBG").setAttribute("style", "display : none; opacity : 0;");
    }
    else {
        document.getElementById("frontBG").setAttribute("style", "display : block; transform : scale(1); opacity : 0.5;");
        window.clearInterval(startEffectInterval);
        startEffectInterval = 0;
        return;
    }
    bgScale += 0.1;
    bgOpacity -= 0.05;
}

function selectFunctionOver(functionID) {

    //if(songStop && !isReselect){
    document.getElementById(functionID).setAttribute("style", "transform : scale(1.2); display : block;");
    //}
}

function selectFunctionOut(functionID) {
    //if(songStop && !isReselect){
    document.getElementById(functionID).setAttribute("style", "transform : scale(1); display : block;");
    //}
}

function pause() {																	//繼續
    if (songStop && songStart && !selfInterval && haveSelect == 1) {
        run();
        songStart = window.setInterval("run()", 10);
    }
}

function restart() {																	//重新開始
    if (haveSelect == 1) {
        isReselect = 1;
        cleanSelection();
        selfInterval = 0;
        window.clearInterval(songStart);
        songStart = null;
        start(selectSong);
    }
}

function reselect() {																//重選				
    if (haveSelect == 1) {
        cleanSelection();
        isReselect = 1;
        var imageArr = document.body.querySelectorAll("img");
        imageArr[0].src = "background/original_background.png";
        imageArr[1].src = "background/original_background.png";
        for (var i in songMap) {
            document.getElementById("selectedSong" + i).setAttribute("style", "width : 400px; height : 60px; margin-left : -710px; top : " + (i * 70 + 100) + "px;");
            document.getElementById("selectedSong" + i).innerHTML = "<div id = 'songText' style = 'font-size : 25x; line-height:20px; width : 370px;'>" + songMap[i] + "</div>";
        }
        window.clearInterval(songStart);
        songStart = 0;
        selectSong = -1;
    }
}

function addSelection() {
    document.getElementById("selection").innerHTML = '<div id = "pause" onmouseover = "selectFunctionOver(\'pause\')" onmouseout = "selectFunctionOut(\'pause\')" onclick = "pause()" ><h3>Continue</h3></div><div id = "restart" onmouseover = "selectFunctionOver(\'restart\')" onmouseout = "selectFunctionOut(\'restart\')" onclick = "restart()" ><h3>Restart</h3></div><div id = "reselect" onmouseover = "selectFunctionOver(\'reselect\')" onmouseout = "selectFunctionOut(\'reselect\')" onclick = "reselect()" ><h3>Reselect</h3></div>';
    haveSelect = 1;
}

function cleanSelection() {
    haveSelect = 0;
    document.getElementById("selection").innerHTML = "";
}

function comboEffect() {
    window.clearInterval(comboInterval);
    comboInterval = 0;
    document.getElementById("combo").innerHTML = "";
}