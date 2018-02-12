<?php

$object = file_get_contents('php://input');
$rows = json_decode($object,true);

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
  $read = $rows['permissions']['read'];
  $update = $rows['permissions']['update'];
  $delete = $rows['permissions']['delete'];
  $admin = $rows['permissions']['admin'];
  $read = implode(',', $read);
  if ($read === '') {
    $read = 'NULL';
  }
  $update = implode(',', $update);
  $delete = implode(',', $delete);
  $admin = implode(',', $admin);
  $pageid = $rows['uri'];
  $start = $rows['ranges'][0]['start'];
  $startOffset = $rows['ranges'][0]['startOffset'];
  $end = $rows['ranges'][0]['end'];
  $endOffset = $rows['ranges'][0]['endOffset'];
  $text = $rows['text'];
  $user = $rows['user'];
  $sql = "INSERT INTO ANNOTATIONS (pageid,startt,endd,startOffset,endOffset,textt,user,readd,updatee,deletee,adminn) VALUES (" . $pageid . ",'" . $start . "','" . $end . "'," . $startOffset . "," . $endOffset . ",'" . $text . "','" . $user . "','" . $read . "','" . $update . "','" . $delete . "','" . $admin . "');";
  echo $sql;
  $db->query($sql);

  $sql = "SELECT MAX(id) FROM ANNOTATIONS";
  $res = $db->query($sql);
  $resu = $res->fetchArray(SQLITE3_ASSOC);
  $id = $resu['MAX(id)'];

  $db->close();

  header("HTTP/1.1 303 See Other");
  header("Location: http://home/web/site1804/html/server/annotations/read.php?id=" . $id);
}
?>