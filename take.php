<?php
$data = "save.json";
$fileopen = fopen($data,"r");
$jsondecode = json_decode(fread($fileopen,filesize($data)));
echo $jsondecode[0]->rand1.','.$jsondecode[0]->rand2.','.$jsondecode[0]->rand3;
?>