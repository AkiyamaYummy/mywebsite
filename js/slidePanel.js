var MAXDISPLAY = 5,INTERVAL = 2000,SPEED = 500,FRAME = 20;
var PICHEIGHT = 300,PICWIDTH = 705,SWIHEIGHT = 8,SWIWIDTH = 40;
var displayPics = new Array(),picSwitchButtons = new Array();
var rank = 0,step,wait;
var nextrank,target = -1,slideTimer;
function slideInit() {
    for(var i=0;i<MAXDISPLAY;i++) {
        displayPics[i] = document.getElementById("displayPic" + i);
        picSwitchButtons[i] =
            document.getElementById("picSwitchButton" + i);
    }
    displayPics[rank].style.display = "inline";
    wait = 1;
    buttonPrint(rank,"grey");
    picSwitchButtons[rank].style.width = SWIWIDTH+"px";
    slideTimer = setTimeout(slide0,INTERVAL);
}
function slide0() {
    wait = 0;
    nextrank = (rank+1)%MAXDISPLAY;
    displayPics[nextrank].style.display = "inline";
    displayPics[nextrank].style.marginLeft = PICWIDTH+"px";
    step = 0;
    buttonPrint(rank,"white");
    buttonPrint(nextrank,"grey");
    slide1();
}
function slide1() {
    displayPics[rank].style.marginLeft = -PICWIDTH*step/FRAME+"px";
    displayPics[nextrank].style.marginLeft =
        PICWIDTH*(FRAME-step)/FRAME+"px";
    picSwitchButtons[rank].style.width
        = (SWIWIDTH-SWIHEIGHT)*(FRAME-step)/FRAME+SWIHEIGHT+"px";
    picSwitchButtons[nextrank].style.width
        = SWIWIDTH-(SWIWIDTH-SWIHEIGHT)*(FRAME-step)/FRAME+"px";
    step ++;
    if(step >= FRAME+1)slide2();
    else slideTimer = setTimeout(slide1,SPEED/FRAME);
}
function slide2() {
    displayPics[rank].style.display = "none";
    rank = nextrank;
    if(rank == target){
        INTERVAL = 2000; SPEED = 500; FRAME = 20;
        target = -1;
    }
    wait = 1;
    slideTimer = setTimeout(slide0,INTERVAL);
}
function switchPic(_r) {
    if(wait != 1||rank != _r){
        INTERVAL = 0; SPEED = 125; FRAME = 5;
        step = 0;
        target = _r;
    }
    if(wait == 1){
        window.clearTimeout(slideTimer);
        slideTimer = setTimeout(slide0, INTERVAL);
    }
}
function buttonPrint(_r,color) {
    if(_r == nextrank)color = "grey";
    picSwitchButtons[_r].style.background = color;
}