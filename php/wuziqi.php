<?php
ignore_user_abort(true);
set_time_limit(0);

$host = '120.78.194.94';
$port = '9506';
$null = NULL;


//创建tcp socket
$socket = socket_create(AF_INET, SOCK_STREAM, SOL_TCP);
socket_set_option($socket, SOL_SOCKET, SO_REUSEADDR, 1);
socket_bind($socket, 0, $port);

//监听端口
socket_listen($socket);

//连接的client socket 列表
$clients = array($socket);

//设置一个死循环,用来监听连接 ,状态
$lastPost = "";
while (true) {
    $changed = $clients;
    socket_select($changed, $null, $null, 0, 10);
    //如果有新的连接
    if (in_array($socket, $changed)) {
        //接受并加入新的socket连接
        $socket_new = socket_accept($socket);
        array_push($clients,$socket_new);
        //通过socket获取数据执行handshake
        $header = socket_read($socket_new, 1024);
        perform_handshaking($header, $socket_new, $host, $port);
        //获取client ip 编码json数据,并发送通知
        socket_getpeername($socket_new, $ip);
        $found_socket = array_search($socket, $changed);
        unset($changed[$found_socket]);
    }
    //轮询 每个client socket 连接
    foreach ($changed as $changed_socket) {
        //如果有client数据发送过来
        while(socket_recv($changed_socket, $buf, 1024, 0) >= 1) {
            //解码发送过来的数据
            $received_text = unmask($buf);
            $tst_msg = json_decode($received_text);
            dealMessage($tst_msg,$changed_socket);
            break 2;
        }
        //检查offline的client
        $buf = @socket_read($changed_socket,1024,PHP_NORMAL_READ);
        if ($buf === false) {
            $found_socket = array_search($changed_socket, $clients);
            //print_r("\r\nDEL : \r\n");
            //print_r($changed_socket);
            unset($clients[$found_socket]);
            //socket_getpeername($changed_socket, $ip);
        }
    }
}
// 关闭监听的socket
socket_close($sock);
//处理信息
$freeSocketStr = NULL;
$socketPair = array();
$uid_socket = array();
$uid_step = array();
$uid_win = array();
$uid_boards = array();
function delEnd($str){
    global $socketPair,$uid_socket,$uid_step,$uid_win,$uid_boards;
    $pairStr = $socketPair[$str];
    print_r("........................................\r\n");
    print_r("DEL : ".$str."\r\n".$pairStr."\r\n");
    print_r("........................................\r\n");
    if($uid_win[$str] == -1) {
        print_r("Should break.\r\n");
        send_message(mask(json_encode(
            array("type" => "break"))),
            $uid_socket[$pairStr]);
    }
    if(strcmp($str,$pairStr) > 0){
        $temp = $str;$str = $pairStr;$pairStr = $temp;
    }
    unset($socketPair[$str]); unset($socketPair[$pairStr]);
    unset($uid_step[$str]); unset($uid_step[$pairStr]);
    unset($uid_win[$str]); unset($uid_win[$pairStr]);
    unset($uid_boards[$str]);
    unset($uid_socket[$str]); unset($uid_socket[$pairStr]);
}
function judge($str){
    global $uid_boards;
    $jArr = array(array(-1,0),array(0,-1),array(-1,-1),array(-1,1));
    $board = $uid_boards[$str];$conArr = array();
    for($k = 0; $k < 4; $k ++){
        for($i = 0; $i < 15; $i ++){
            for($j = 0; $j < 15; $j ++){
                $key = $i."-".$j;
                $lastKey = ($i+$jArr[$k][0])."-".($j+$jArr[$k][1]);
                if(array_key_exists($key,$board)){
                    if(array_key_exists($lastKey,$board)&&$board[$key]==$board[$lastKey]) {
                        $conArr[$key] = $conArr[$lastKey] + 1;
                        if($conArr[$key] >= 5)return $board[$key];
                    }else $conArr[$key] = 1;
                    //print_r("EXIST : ".$i." ".$j." ".$conArr[$key]."\r\n");
                    //$theMax = max($theMax,$conArr[$key]);
                }
            }
        }
    }
    //print_r("theMax : ".$theMax."\r\n");
    return -1;
}
function drop($str,$pairStr,$i,$j){
    global $uid_win,$uid_step,$uid_socket,$uid_boards;
    print_r($str." ".$i." ".$j."\r\n");
    if(strcmp($str,$pairStr) > 0){
        $temp = $str;$str = $pairStr;$pairStr = $temp;
    }
    if($uid_boards==NULL || !array_key_exists($str,$uid_boards))
        $uid_boards[$str] = array();
    $uid_boards[$str][$i."-".$j] = $uid_step[$str];
    $uid_step[$str] = $uid_step[$pairStr] = ($uid_step[$str]+1)%2;
    $res = judge($str);
    if($res >= 0){
        $uid_win[$str] = $uid_win[$pairStr] = $res;
        send_message(mask(json_encode(
            array("type" => "end","winside" => $res))),
            $uid_socket[$pairStr]);
        send_message(mask(json_encode(
            array("type" => "end","winside" => $res))),
            $uid_socket[$str]);
        delEnd($str);
    }
}
function dealMessage($msg,$sourSocket){
    //print_r("MSG : \r\n");
    //print_r($msg);
    //print_r("\r\n");
    if($msg == NULL) return;
    global $freeSocketStr,$socketPair,$uid_socket,$uid_step,$uid_win;
    $str = $msg->username;
    if($msg->type == "start") {
        $uid_socket[$str] = $sourSocket;
        //print_r("UID_SOCKET : \r\n");
        //print_r($uid_socket);
        if ($freeSocketStr == NULL){
            $freeSocketStr = $str;
            return;
        } else {
            $socketPair[$str] = $freeSocketStr;
            $socketPair[$freeSocketStr] = $str;
            $uid_step[$freeSocketStr] = $uid_step[$str] = 1;
            $uid_win[$freeSocketStr] = $uid_win[$str] = -1;
            send_message(mask(json_encode(
                array("type"=>"start","side"=>"0","step"=>"1"))),$sourSocket);
            send_message(mask(json_encode(
                array("type"=>"start","side"=>"1","step"=>"1"))),$uid_socket[$freeSocketStr]);
            print_r("Game should start BETWEEN\r\n".$str." AND ".$freeSocketStr."\r\n");
            $freeSocketStr = NULL;
        }
    }else if($msg->type == "drop"){
        if(array_key_exists($str,$socketPair)) {
            if($uid_step[$str] != $msg->step) {
                //print_r("error : Drop confusion.");
                return;
            }
            //print_r("Should drop.\r\n");
            send_message(mask(json_encode(
                array("type" => "drop", "i" => $msg->i,"j" => $msg->j,"step"=>$uid_step[$str]))),
                $uid_socket[$socketPair[$str]]);
            drop($str,$socketPair[$str],$msg->i,$msg->j);
        } else {
            //print_r("error : Could not find pairing object.");
            return;
        }
    }else if($msg->type == "end"){
        $str = $msg->username;
        print_r("STR TO DEL : ".$str."\r\n");
        //array_search($changed_socket, $uid_socket);
        if($str == $freeSocketStr)$freeSocketStr = NULL;
        else delEnd($str);
    }
}
//发送消息的方法
function send_message($msg,$tarSocket){
    @socket_write($tarSocket,$msg,strlen($msg));
}
//解码数据
function unmask($text) {
    $length = ord($text[1]) & 127;
    if($length == 126) {
        $masks = substr($text, 4, 4);
        $data = substr($text, 8);
    }
    elseif($length == 127) {
        $masks = substr($text, 10, 4);
        $data = substr($text, 14);
    }
    else {
        $masks = substr($text, 2, 4);
        $data = substr($text, 6);
    }
    $text = "";
    for ($i = 0; $i < strlen($data); ++$i) {
        $text .= $data[$i] ^ $masks[$i%4];
    }
    return $text;
}
//编码数据
function mask($text){
    $b1 = 0x80 | (0x1 & 0x0f);
    $length = strlen($text);
    if($length <= 125)
        $header = pack('CC', $b1, $length);
    elseif($length > 125 && $length < 65536)
        $header = pack('CCn', $b1, 126, $length);
    elseif($length >= 65536)
        $header = pack('CCNN', $b1, 127, $length);
    return $header.$text;
}
//握手的逻辑
function perform_handshaking($receved_header,$client_conn, $host, $port){
    $headers = array();
    $lines = preg_split("/\r\n/", $receved_header);
    foreach($lines as $line) {
        $line = chop($line);
        if(preg_match('/\A(\S+): (.*)\z/', $line, $matches)) {
            $headers[$matches[1]] = $matches[2];
        }
    }
    $secKey = $headers['Sec-WebSocket-Key'];
    $secAccept = base64_encode(pack('H*', sha1($secKey . '258EAFA5-E914-47DA-95CA-C5AB0DC85B11')));
    $upgrade  = "HTTP/1.1 101 Web Socket Protocol Handshake\r\n" .
        "Upgrade: websocket\r\n" .
        "Connection: Upgrade\r\n" .
        "WebSocket-Origin: $host\r\n" .
        "WebSocket-Location: ws://$host:$port/demo/shout.php\r\n".
        "Sec-WebSocket-Accept:$secAccept\r\n\r\n";
    socket_write($client_conn,$upgrade,strlen($upgrade));
}