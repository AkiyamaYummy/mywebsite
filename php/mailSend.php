<?php
require_once "Smtp.class.php";

if(smtpSendMail("smtpmessage.txt",$_POST)){
    echo '<h1 style="color: darkred">SEND&nbsp;SUCCESS!</h1>';
}else echo '<h1 style="color: darkblue">SEND&nbsp;FAIL!</h1>';

function smtpSendMail($MESSAGE_FILE_PATH,$mailArr){
    $INPUT_MESSAGE =
        json_decode(getFileText($MESSAGE_FILE_PATH),true);
    $smtpserver = $INPUT_MESSAGE["smtp_server"]; //SMTP服务器
    $smtpserverport = 25;//SMTP服务器端口
    $smtpusermail = $INPUT_MESSAGE["smtp_user_mail"];//邮箱
    $smtpuser = $INPUT_MESSAGE["smtp_user_name"];//帐号
    $smtppass = $INPUT_MESSAGE["smtp_password"];//密码

    $smtpemailto = $mailArr["mail_to"];//收件人
    $mailtitle = $mailArr["mail_title"];//主题
    if(array_key_exists("mail_content_type",$mailArr) && $mailArr["mail_content_type"] == "from_file")
        $mailcontent = getFileText($mailArr["mail_content_file_path"]);
    else $mailcontent = $mailArr["mail_content"];
    $mailtype = $mailArr["mail_type"];//邮件格式 HTML/TXT

    $smtp = new Smtp($smtpserver,$smtpserverport,true,$smtpuser,$smtppass);
    $smtp->debug = true;//是否显示发送的调试信息
    $state = $smtp->sendmail(
        $smtpemailto,$smtpusermail,$mailtitle,$mailcontent,$mailtype);
    return ($state!="");
}
function getFileText($filePath){
    $res = NULL;
    if(file_exists($filePath)) {
        $res = file_get_contents($filePath);
    }
    return $res;
}
?>