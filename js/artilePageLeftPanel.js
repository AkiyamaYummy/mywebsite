var messageDemo = {
    title:"珍爱生命，远离赌博",
    author:"yummy",
    channel:"漫谈区",
    time:"2017/11/20",
    introduction:"失足少女自述心路历程",
    cover:"pics/aritcalPage/covers/coverdemo.png"
}
var blockIni = 10,blockTot = 31,blockCon = 0,minDif = 100;
function articleLeftPanelInit() {
    for(var i=0;i<blockIni;i++){
        articleLeftPanel.appendChild(getAritleBlock(messageDemo));
        picLoad(blockCon);
        blockCon ++;
    }
}
function checkScroll() {
    var scroll = getScroll(),client = getClient();
    var scroolBottom = body.offsetHeight-scroll.y-window.screen.availHeight;
    if(scroolBottom <= minDif)addAritleBlock();
}
function addAritleBlock() {
    if(blockCon >= blockTot)return;
    var blockConOld = blockCon;
    for(var i=0;i<blockConOld;i++){
        if(blockCon >= blockTot) break;
        articleLeftPanel.appendChild(getAritleBlock(messageDemo));
        picLoad(blockCon);
        blockCon ++;
    }
}
function getAritleBlock(bloMessage) {
    var res = document.createElement("div");
    res.setAttribute("class","artileTitleDisplay");
    var t1 = document.createElement("a1");
    t1.innerHTML = bloMessage.title;
    var t2 = document.createElement("a2");
    t2.innerHTML = bloMessage.channel+"&nbsp;"+bloMessage.author+"&nbsp;"+bloMessage.time;
    var t3 = document.createElement("a3");
    t3.innerHTML = bloMessage.introduction;
    var pic = document.createElement("pic");
    pic.setAttribute("id","artileCover"+blockCon);
    pic.style.backgroundImage = "url('"+bloMessage.cover+"')";
    pic.style.opacity = 0;
    res.appendChild(t1);
    res.appendChild(t2);
    res.appendChild(t3);
    res.appendChild(pic);
    return res;
}
var picLoadFrame = 40,msPerFrame = 10;
function picLoad(eleid) {
    var ele = document.getElementById("artileCover"+eleid);
    var opNow = parseFloat(ele.style.opacity);
    if(opNow >= 1)return;
    var opnext = Math.pow(Math.sqrt(opNow)+1/picLoadFrame,2);
    ele.style.opacity = opnext;
    setTimeout("picLoad("+eleid+")",msPerFrame);
}