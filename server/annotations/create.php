<?php

$object = $_POST;
$rows = json_decode($object);
session_start();

if (isset($_SESSION['datauser']) && $_SESSION['datauser'] == true) {
    $username = $_SESSION['datauser'];
    class MyDB extends SQLite3
    {
      function __construct()
      {
        $this->open('../progetto.db');
      }
    }
    $db = new MyDB();
    if (!$db) {
      echo $db->lastErrorMsg();
    } else {
      //echo "Opened database successfully\n";
    }
    $pageid = $rows['uri'];
    $start = $rows['ranges'][0]['start'];
    $startOffset = $rows['ranges'][0]['startOffset'];
    $end = $rows['ranges'][0]['end'];
    $endOffset = $rows['ranges'][0]['endOffset'];
    $text = $rows['text'];
    $user = $user['user'];
    $sql = "INSERT INTO ANNOTATIONS (pageid,start,end,startOffset,endOffset,text,user) VALUES (".$pageid.",'".$start."','".$end."',".$startOffset.",".$endOffset.",'".$text."','".$user."');";
    $db->query($sql);

    $sql = "SELECT MAX(id) FROM ANNOTATIONS";
    $res = $db->query($sql);
    $resu = $res->fetchArray(SQLITE3_ASSOC);
    $id = $resu['MAX(id)'];

    $db->close();

    header("HTTP/1.1 303 See Other");
    header("Location: http://localhost/Progetto-qualcosa-che-si-mangia/server/annotations/read.php?id=".$id);
}
?>