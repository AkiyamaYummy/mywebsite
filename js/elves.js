var ele,mousePosiX = -1,mousePosiY = -1,FLOOR_HEIGHT = 0,RIGHT_DIF = 50;
var elvesTimer = null,wallRight,wallBottom;
var leftBase,topBase;
function elvesInit() {
    ele = document.getElementById("elves");
    ele.setAttribute("onmousedown","eleOnMouseDown(event)");
    ele.setAttribute("onmouseup","eleOnMouseUp(event)");
    body.setAttribute("onmousemove","bodyOnMouseMove(event)");
    resizeInit();
    window.onresize = "resizeInit()";
}
function resizeInit() {
    ele.style.left = "";
    ele.style.top = "";
    ele.style.right = RIGHT_DIF+"px";
    ele.style.bottom = FLOOR_HEIGHT+"px";
    leftBase = ele.offsetLeft;
    topBase = ele.offsetTop
    wallRight = ele.offsetLeft+RIGHT_DIF;
    wallBottom = ele.offsetTop+FLOOR_HEIGHT;
}
function eleOnMouseDown(e) {
    var left = e.clientX,top = e.clientY;
    mousePosiX = left;mousePosiY = top;
    if(elvesTimer != null)clearTimeout(elvesTimer);
    elvesTimer = null;
    lastTime = (new Date()).getTime();
    lastTopPosi = ele.offsetTop;
    lastLeftPosi = ele.offsetLeft;
}
var lastTime = -1,timeDif,vecLeft,vecTop,movePointCon = 0;
var lastLeftPosi,lastTopPosi;
function bodyOnMouseMove(e) {
    var left = e.clientX,top = e.clientY;
    //alert(left+" "+top);
    if(mousePosiX!=-1 || mousePosiY!=-1){
        eleMove(left-mousePosiX,top-mousePosiY);
        mousePosiX = left;mousePosiY = top;
        if((movePointCon++)%5 == 0) {
            var timeNow = (new Date()).getTime();
            var leftPosi = ele.offsetLeft, topPosi = ele.offsetTop;
            vecLeft = leftPosi - lastLeftPosi;
            vecTop = topPosi - lastTopPosi;
            timeDif = timeNow - lastTime;
            lastLeftPosi = leftPosi;
            lastTopPosi = topPosi;
            lastTime = timeNow;
        }
    }
}
var backFrame = 20,msPerFrameToBack = 5,lOneStep,tOneStep;
var acceleration = 0.05,collisionLoss = 0.2,slideLoss = 0.1;
var stopSpeed = 3;
function eleOnMouseUp(e) {
    mousePosiX = mousePosiY = -1;
    /*
    lOneStep = (leftBase-ele.offsetLeft)/backFrame;
    tOneStep = (topBase-ele.offsetTop)/backFrame;
    var lFlag = ele.offsetLeft-topBase,tFlag = ele.offsetTop-topBase;
    elvesTimer = setTimeout("elvesBackThread("+lFlag+","+tFlag+")",msPerFrameToBack);
    */
    vecLeft *= (msPerFrameToBack/timeDif);
    vecTop *= (msPerFrameToBack/timeDif);
    elvesTimer = setTimeout("elvesThrowThread()",msPerFrameToBack);
}
function elvesThrowThread() {
    if(vecLeft==0 && vecTop==0)return;
    var downVec = acceleration*msPerFrameToBack;
    eleMove(vecLeft,vecTop);
    vecTop += downVec;
    var topNow = ele.offsetTop,leftNow = ele.offsetLeft;
    if(topNow>=wallBottom)vecTop = -vecTop*(1-collisionLoss);
    if(topNow<=0){
        vecTop = Math.abs(vecTop);
        //alert(vecTop+" "+vecLeft);
    }
    if(leftNow<=0 || leftNow>=wallRight)vecLeft = -vecLeft*(1-collisionLoss);
    if(topNow>=wallBottom && Math.abs(vecTop)<=stopSpeed){
        vecTop = 0; ele.style.top = wallBottom+"px";
        if(Math.abs(vecLeft) <= slideLoss)vecLeft = 0;
        else vecLeft = (vecLeft>0?1:-1)*(Math.abs(vecLeft)-slideLoss);
    }
    elvesTimer = setTimeout("elvesThrowThread()",msPerFrameToBack);
}
function elvesBackThread(lFlag,tFlag) {
    if((ele.offsetTop-topBase)*tFlag<=0 || (ele.offsetLeft-leftBase)*lFlag<=0) {
        ele.style.left = "";
        ele.style.top = "";
        ele.style.right = RIGHT_DIF+"px";
        ele.style.bottom = FLOOR_HEIGHT+"px";
        return;
    }
    eleMove(lOneStep,tOneStep);
    elvesTimer = setTimeout("elvesBackThread("+lFlag+","+tFlag+")",msPerFrameToBack);
}
function eleMove(lmove,tmove) {
    var theLeft = Math.max(Math.min(ele.offsetLeft+lmove,wallRight),0);
    var theTop = Math.max(Math.min(ele.offsetTop+tmove,wallBottom),0);
    ele.style.left = theLeft+"px";
    ele.style.top = theTop+"px";
}