<?php
echo "<head><title>File Upload - ".$_FILES["file"]["name"]."</title></head>";
header("Content-Type: text/html;charset=utf-8");
$dir = "../papers/";
$succPic = "<img src='../pics/paperuploadPage/succ.png' />";
$failPic = "<img src='../pics/paperuploadPage/fail.png' />";
$successStr = $succPic."<br/>"."Upload success."."<br/>";
$fairStr = $failPic."<br/>"."Upload failed."."<br/>";
$typeArr = array("application/pdf");
$ok = false;
foreach($typeArr as $typeStr)
    if($_FILES["file"]["type"] == $typeStr){
        $ok = true; break;
    }
if(!$ok){
    echo $fairStr.$_FILES["file"]["name"]."<br/>";
    echo "The system does not accept this file type.";
    return;
} else if($_FILES["file"]["size"]/1024/1024 > 20){
    echo $fairStr.$_FILES["file"]["name"]."<br/>";
    echo "This file is too big to upload.";
    return;
} else if($_FILES["file"]["error"] > 0){
    echo $fairStr.$_FILES["file"]["name"]."<br/>";
    echo "Error : ".$_FILES["file"]["error"];
    return;
}
if(file_exists($dir.$_FILES["file"]["name"])){
    echo $fairStr.$_FILES["file"]["name"]."<br/>";
    echo "This file name already exists.";
    return;
}
echo $successStr;
echo "Upload: " . $_FILES["file"]["name"] . "<br />";
echo "Type: " . $_FILES["file"]["type"] . "<br />";
echo "Size: " . ($_FILES["file"]["size"] / 1024) . " Kb<br />";
echo "Temp file: " . $_FILES["file"]["tmp_name"] . "<br />";

move_uploaded_file($_FILES["file"]["tmp_name"],
    $dir.$_FILES["file"]["name"]);
echo "<a href='../papers.html'>Check it</a>";
?>