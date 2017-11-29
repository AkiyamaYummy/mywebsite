var nodes = new Array(),R = 100,nodeCon = 12;
var X = new Array(),Y = new Array(),Z = new Array();
var ANGLE_INIT = [
    [90,26.565,26.565,26.565,26.565,26.565,-26.565,-26.565,-26.565,-26.565,-26.565,-90],
    [0,0,72,144,216,288,36,108,180,252,324,0]
];
var rotateX = 2,rotateY = 1,msPerFrame = 50;
var anglePerFrame = Math.PI/180,angleMax = Math.PI/12;
var fontSizeDif = 10,fontSizeBase = 15;
var silenceR = 10;
function tagBallInit() {
    for(var i=0;i<nodeCon;i++){
        nodes[i] = document.createElement("a");
        nodes[i].innerHTML = "示例标签";
        ANGLE_INIT[0][i] *= (Math.PI/180);
        ANGLE_INIT[1][i] *= (Math.PI/180);
        posiInit(i);
        setNodePosi(i);
        document.getElementById("tagBall").appendChild(nodes[i]);
    }
    setTimeout("rotateProcess()",msPerFrame);
}
function catchSignal(e) {
    var mousePosi = getMousePosi(e);
    var panelPosi = getElePosi(tagBallCatcher);
    var difX = mousePosi.x-panelPosi.x-R;
    var difY = -(mousePosi.y-panelPosi.y-R);
    var difR = Math.sqrt(difX*difX+difY*difY);
    if(difR < silenceR)anglePerFrame = 0;
    else if(difR > R)return;
    else anglePerFrame = angleMax*(difR-silenceR)/(R-silenceR);
    rotateX = -difY; rotateY = -difX;
}
function setNodePosi(i) {
    var nodeh = nodes[i].offsetHeight;
    var nodew = nodes[i].offsetWidth;
    nodes[i].style.left = (R-X[i]-nodew/2)+"px";
    nodes[i].style.top = (R-Y[i]-nodeh/2)+"px";
    var o = (Z[i]+R)/2/R;
    nodes[i].style.opacity = Math.min(o+0.3,1);
    nodes[i].style.fontSize = (fontSizeDif*o+fontSizeBase)+"px";
}
function rotateProcess() {
    for(var i=0;i<nodeCon;i++)
        rotateNextStep(i);
    setTimeout("rotateProcess()",msPerFrame);
}
function posiInit(i) {
    var RR = R*cos(ANGLE_INIT[0][i]);
    X[i] = RR*cos(ANGLE_INIT[1][i]);
    Y[i] = RR*sin(ANGLE_INIT[1][i]);
    Z[i] = R*sin(ANGLE_INIT[0][i]);
}
function rotateNextStep(i) {
    var hypo = Math.sqrt(rotateX*rotateX+rotateY*rotateY);
    var x = rotateX/hypo,y = rotateY/hypo,z = 0;
    var c = cos(anglePerFrame),s = sin(anglePerFrame);
    var old_x = X[i],old_y = Y[i],old_z = Z[i];
    var new_x = (x*x*(1-c)+c)*old_x+(x*y*(1-c)-z*s)*old_y+(x*z*(1-c)+y*s)*old_z;
    var new_y = (y*x*(1-c)+z*s)*old_x+(y*y*(1-c)+c)*old_y+(y*z*(1-c)-x*s)*old_z;
    var new_z = (x*z*(1-c)-y*s)*old_x+(y*z*(1-c)+x*s)*old_y+(z*z*(1-c)+c)*old_z;
    X[i] = new_x; Y[i] = new_y; Z[i] = new_z;
    setNodePosi(i);
}
function getMousePosi(e) {
    var scroll = getScroll(),client = getClient();
    return {
        x:e.clientX+scroll.x-client.x,
        y:e.clientY+scroll.y-client.y
    };
}
function getElePosi(ele) {
    var res = {x:0,y:0};
    ele = ele.offsetParent;
    while(ele) {
        res.x += ele.offsetLeft;
        res.y += ele.offsetTop;
        ele = ele.offsetParent;
    }
    return res;
}
function cos(a) {
    return Math.cos(a);
}
function sin(a) {
    return Math.sin(a);
}