var topButtonListLocations = new Array(
    "index.html",
    "article.html",
    "wuziqi.html",
    "papers.html",
    ""
);
function mainShellOnload() {
    var wrapper = document.getElementById("loadMask");
    document.body.removeChild(wrapper);
}
function mainPanelTopButtonListOnclice(i){
    if(i >= 4)return;
    window.location = topButtonListLocations[i];
}
var returnTopStep = 0;
var RETURNTOP_LENGTH = 13,RETUENTOP_ONEFRAME_TIME = 2;
function returnTop() {
    //window.scrollTo(0,0);
    var scroll = getScroll();
    var nowTop = scroll.y,nowLeft = scroll.x;
    returnTopStep = Math.floor(nowTop/RETURNTOP_LENGTH);
    setTimeout("returnTopRun("+nowLeft+")",100);
}
function returnTopRun(nowLeft){
    window.scrollTo(nowLeft,RETURNTOP_LENGTH*returnTopStep);
    if(returnTopStep == 0)return;
    returnTopStep --;
    setTimeout("returnTopRun("+nowLeft+")",RETUENTOP_ONEFRAME_TIME);
}
function getScroll(){
    var scrollTop = 0,scrollLeft = 0;
    if(document.documentElement&&document.documentElement.scrollTop)
        scrollTop=document.documentElement.scrollTop;
    else if(document.body)
        scrollTop=document.body.scrollTop;
    if(document.documentElement&&document.documentElement.scrollLeft)
        scrollLeft=document.documentElement.scrollLeft;
    else if(document.body)
        scrollLeft=document.body.scrollLeft;
    return {x:scrollLeft,y:scrollTop};
}
function getClient() {
    var clientTop = 0,clientLeft = 0;
    if(document.documentElement&&document.documentElement.clientTop)
        clientTop=document.documentElement.clientTop;
    else if(document.body)
        clientTop=document.body.clientTop;
    if(document.documentElement&&document.documentElement.clientLeft)
        clientLeft=document.documentElement.clientLeft;
    else if(document.body)
        clientLeft=document.body.clientLeft;
    return {x:clientLeft,y:clientTop};
}