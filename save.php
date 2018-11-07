<?php
$rand1 = $_GET['rand1'];
$rand2 = $_GET['rand2'];
$rand3 = $_GET['rand3'];
$array = array("rand1"=>$rand1,"rand2"=>$rand2,"rand3"=>$rand3);
$data = "save.json";
$fileopen = fopen($data,"r");
$filedecode = json_decode(fread($fileopen,filesize($data)));
for($i=0;$i<count($filedecode);$i++){
	if(count($filedecode)!=0){
		array_splice($filedecode,0);
	}
}
$filedecode[] = $array;
$fileencode = json_encode($filedecode);
fclose($fileopen);
$fileopenX = fopen($data,"w");
fwrite($fileopenX,$fileencode);
fclose($fileopenX);
?>