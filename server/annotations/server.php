<?php 
$data = file_get_contents('php:../../visual.php');
$arr = json_decode($data);
print_r($arr);
echo $arr["id"];
?> 
