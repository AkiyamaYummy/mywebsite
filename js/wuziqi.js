var nodeArr = new Array();
var side = 1,isol = 0,olside,olgame = 0,uid,winside = -1;
var zh = new Array("零","一","二","三","四","五","六","七"
    ,"八","九","十","十一","十二","十三","十四","十五");
var LINE_COLOR="black",CHESSMAN1_COLOR="black",CHESSMAN2_COLOR="white";
var wsurl = "ws://120.78.194.94:9506/php/wuziqi.php",mainws = null;
function wuziqibodyBeforeUnload() {
    if(isol == 0)return;
    send({"type":"end","username":uid});
}
function wuziqiInit() {
    for(var i = 0; i < 15; i++) {
        nodeArr[i] = new Array();
        for (var j = 0; j < 15; j++) {
            var newNodeM = getNewNodeM(i,j);
            var newNodeB = getNewNodeB(i,j);
            //newNode.innerHTML = i + "-" + j;
            nodeArr[i][j] = -1;
            newNodeB.appendChild(newNodeM);
            checkerboard.appendChild(newNodeB);
        }
    }
    newBroadMessage("欢迎来到这里进行五子棋的游玩。"
        +"请好好下棋，不要搞事。注意素质，"
        +"联机下棋半途尽量不要关闭页面或刷新页面。");
}
function getNewNodeM(i,j) {
    var newNode = document.createElement("div");
    newNode.setAttribute("class", "nodeM");
    newNode.setAttribute("id", i+"-"+j);
    newNode.setAttribute("onmouseover","nodeOnMouseOver("+i+","+j+")");
    newNode.setAttribute("onmouseout","nodeOnMouseOut("+i+","+j+")");
    newNode.setAttribute("onclick","nodeOnClick("+i+","+j+")");
    return newNode;
}
function getNewNodeB(i,j) {
    var newNode = document.createElement("div");
    var ML = new Array(1,21,1,21),TL = new Array(1,1,21,21);
    var BW = new Array("0 1px 1px 0"
        ,"0 0 1px 1px"
        ,"1px 1px 0 0"
        ,"1px 0 0 1px");
    if(i == 14)BW[2] = BW[3] = "1px 0 0 0";
    if(j == 0) BW[0] = BW[2] = "0 1px 0 0";
    if(i == 0) BW[0] = BW[1] = "0 0 1px 0";
    if(j == 14)BW[1] = BW[3] = "0 0 0 1px";
    if(i == 0&&j == 0)  BW[0] = "0";
    if(i == 0&&j == 14) BW[1] = "0";
    if(i == 14&&j == 0) BW[2] = "0";
    if(i == 14&&j == 14)BW[3] = "0";
    newNode.setAttribute("class", "nodeB");
    for(var i=0;i<4;i++){
        var nbc = document.createElement("div");
        nbc.setAttribute("class", "sublo");
        nbc.style.marginLeft = ML[i]+"px";
        nbc.style.marginTop = TL[i]+"px";
        nbc.style.borderWidth = BW[i];
        nbc.style.borderColor = LINE_COLOR;
        newNode.appendChild(nbc);
    }
    return newNode;
}
function post(URL, PARAMS) {
    var temp = document.createElement("form");
    temp.action = URL;
    temp.method = "post";
    temp.style.display = "none";
    for (var x in PARAMS) {
        var opt = document.createElement("textarea");
        opt.name = x;
        opt.value = PARAMS[x];
        // alert(opt.name)
        temp.appendChild(opt);
    }
    document.body.appendChild(temp);
    temp.submit();
    return temp;
}
function nodeOnMouseOver(i,j) {
    var idStr = i+"-"+j;
    if(nodeArr[i][j] >= 0)return;
    document.getElementById(idStr).style.border="3px solid red";
}
function nodeOnMouseOut(i,j) {
    var idStr = i+"-"+j;
    if(nodeArr[i][j] >= 0)return;
    document.getElementById(idStr).style.border="";
}
function check() {
    var jArr = new Array(),bArr = new Array();
    jArr[0] = new Array(-1,0);
    jArr[1] = new Array(0,-1);
    jArr[2] = new Array(-1,-1);
    jArr[3] = new Array(-1,1);
    for(var i=0;i<15;i++)bArr[i] = new Array();
    for(var k = 0; k < 4; k++) {
        for (var i = 0; i < 15; i++)
            for (var j = 0; j < 15; j++) {
                if(nodeArr[i][j] < 0||i+jArr[k][0] < 0||j+jArr[k][1] < 0||i+jArr[k][0] > 14)
                    bArr[i][j] = 1;
                else if(nodeArr[i][j] == nodeArr[i+jArr[k][0]][j+jArr[k][1]])
                    bArr[i][j] = bArr[i+jArr[k][0]][j+jArr[k][1]]+1;
                else bArr[i][j] = 1;
                if(bArr[i][j] >= 5) return nodeArr[i][j];
            }
    }
    return -1;
}
function send(json) {
    try{
        mainws.send(JSON.stringify(json));
    } catch(ex) {
        alert(ex.name+"->"+ex.message);
        console.log(ex);
    }
}
function reInit() {
    side = 1;isol = 0;olgame = 0;
}
function showRes(res) {
    if(res == -1)return;
    newBroadMessage("五子连珠,"+(res==1?"黑胜!":"白胜!"));
    result.innerHTML = "五子连珠,"+(res==1?"黑胜!":"白胜!");
    winside = res;
    reInit();
}
function clearBoard() {
    for (var i = 0; i < 15; i++) {
        for (var j = 0; j < 15; j++) {
            nodeArr[i][j] = -1;
            var idStr = i + "-" + j, ele = document.getElementById(idStr);
            ele.style.background = "";
            ele.style.borderRadius = "";
            ele.style.border = "";
        }
    }
    result.innerHTML = "";
    reInit(); winside = -1;
}
function newBroadMessage(str) {
    broadcast.innerHTML
        = "<p>"+str+"</p>"+broadcast.innerHTML;
}
function MessageBroadOnload() {
    newBroadMessage("欢迎来到这里进行五子棋的游玩."
        +"请好好下棋,不要搞事.注意素质,"
        +"联机下棋半途尽量不要关闭页面或刷新页面.");
}
function nodeOnClick(i,j) {
    if(olgame&&side != olside)return;
    if(winside >= 0||nodeArr[i][j] >= 0)return;
    drop(i,j);
}
function drop(i,j) {
    //alert(idStr+","+i+","+j);
    var idStr = i+"-"+j;
    nodeArr[i][j] = side;
    var ele = document.getElementById(idStr);
    ele.style.background=(side==1?CHESSMAN1_COLOR:CHESSMAN2_COLOR);
    ele.style.borderRadius="200px";
    ele.style.border="";
    newBroadMessage((side==1?"黑 ":"白 ")+zh[i+1]+"行 "+zh[j+1]+"列");
    if(olgame == 0){
        showRes(check());
        side = (side+1)%2;
    } else if(olside == side) {
        send({"type":"drop","username":uid,"i":i,"j":j,"step":olside});
        side = (olside + 1) % 2;
    }
}
function linkStart() {
    if(!window.WebSocket) {
        newBroadMessage("十分抱歉,您的浏览器不支持联机对局功能!");
        alert("十分抱歉,您的浏览器不支持联机对局功能!");
        return;
    }else if (isol == 1) return;
    isol = 1;
    var date = (new Date()).getTime();
    uid = md5_code(date+"_"+Math.floor(Math.random()*1000000)
        +"_"+Math.floor(Math.random()*1000000));
    mainws = new WebSocket(wsurl);
    mainws.onopen = wsOpen; mainws.onerror = wsError;
    mainws.onmessage = wsMessage; mainws.onclose = wsClose;
}
function wsOpen(event) {
    //alert("open");
    send({"type":"start","username":uid});
    newBroadMessage("正在为您匹配对手,请稍后.");
}
function wsMessage(event) {
    var data = JSON.parse(event.data);
    //alert(data.type);
    if(data.type == "start"){
        clearBoard();
        olgame = 1; isol = 1;
        side = 1; olside = parseInt(data.side);
        newBroadMessage("匹配成功,您执"+(data.side==1?"黑":"白")+"子.");
        newBroadMessage("请执黑子的玩家,先手落子.");
        //alert("start!" + " " + olside);
    }else if(data.type == "end"){
        showRes(parseInt(data.winside));
        mainws.close();
        olgame = isol = 0;
    }else if(data.type == "break"){
        mainws.close();
        newBroadMessage("很遗憾,您的对手强行退出了游戏!");
        alert("很遗憾,您的对手强行退出了游戏!");
        olgame = isol = 0; winside = 3;
    }else if(data.type == "drop"){
        //alert("drop! "+data.i+" "+data.j);
        drop(parseInt(data.i),parseInt(data.j));
        side = olside;
    }
}
function wsClose(event) {
    //clearBoard();
}
function wsError(event) {
    //alert("error : "+event.data);
}