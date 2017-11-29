var midItems=new Array(),expanstep=new Array(0,0,0);
var midItemsTitles=new Array();
var expantimers=new Array(),expanact=new Array(1,1,1);
var EXPAN_TIME=100,EXPAN_FRAME=10,EXPAN_PERCENT=20,EXPAN_BLUR=5;
/*
    filter: blur(5px);
    -webkit-filter: blur(5px);
    -moz-filter: blur(5px);
    -ms-filter: blur(5px);
    -o-filter: blur(5px);
    opacity: 0;
    -moz-opacity:0;
 */
function midPanelInit() {
    for(var i=0;i<3;i++) {
        midItems[i] = document.getElementById("midPanelItem" + i);
        midItemsTitles[i] = document.getElementById("midPanelItemTitle" + i);
    }
}
function midItemZoom(i,m) {
    if(expanstep[i]+m<0||expanstep[i]+m>EXPAN_FRAME)
        return;
    if(expanact[i] != m){
        clearTimeout(expantimers[i]);
        expanact[i] = m;
    }
    expanstep[i] += m;
    midItemsTitles[i].style.opacity = expanstep[i]/EXPAN_FRAME;
    midItemsTitles[i].style.mozOpacity = expanstep[i]/EXPAN_FRAME;
    var thispercent = 100+expanstep[i]*EXPAN_PERCENT/EXPAN_FRAME;
    var thisblur = expanstep[i]*EXPAN_BLUR/EXPAN_FRAME;
    var thisblurstr = "blur("+thisblur+"px)";
    midItems[i].style.backgroundSize = thispercent+"%";
    midItems[i].style.filter = thisblurstr;
    midItems[i].style.webkitFilter = thisblurstr;
    midItems[i].style.mozFilter = thisblurstr;
    midItems[i].style.oFilter = thisblurstr;
    expantimers[i] =
        setTimeout("midItemZoom("+i+","+m+")",EXPAN_TIME/EXPAN_FRAME);
}