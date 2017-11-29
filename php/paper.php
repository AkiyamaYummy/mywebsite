<?php
$type = $_GET["type"];
$res = array();
if($type == "get_file_list"){
    $res = getFileList("../papers","/papers");
    echo json_encode($res);
}

function getFileList($dir,$dirToSend){
    $res = array();
    if (is_dir($dir) && $dh = opendir($dir)) {
        while (($file = readdir($dh)) !== false)
            $res[$file] = $dirToSend . "/" . $file;
        closedir($dh);
    }
    return $res;
}
?>