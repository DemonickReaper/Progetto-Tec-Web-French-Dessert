<?php

$object = file_get_contents('php://input'); //riceve l'annotazione
$rows = json_decode($object,true);

session_start();

if (isset($_SESSION['datauser']) && $_SESSION['datauser'] == true) {//verifica che l'utente abbia effettuato il login
  $username = $_SESSION['datauser'];

  class MyDB extends SQLite3 //apre il database
  {
    function __construct()
    {
      $this->open('../progetto.db');
    }
  }
  $db = new MyDB();
  if (!$db) {
    echo $db->lastErrorMsg();
  } 
  $read = $rows['permissions']['read']; //smista l'annotazione nei vari attributi del database
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
  //aggiunge la riga dell annotazione nel database
  $sql = "INSERT INTO ANNOTATIONS (pageid,startt,endd,startOffset,endOffset,textt,user,readd,updatee,deletee,adminn) VALUES (" . $pageid . ",'" . $start . "','" . $end . "'," . $startOffset . "," . $endOffset . ",'" . $text . "','" . $user . "','" . $read . "','" . $update . "','" . $delete . "','" . $admin . "');";
  echo $sql;
  $db->query($sql);

  $sql = "SELECT MAX(id) FROM ANNOTATIONS";
  $res = $db->query($sql);
  $resu = $res->fetchArray(SQLITE3_ASSOC);
  $id = $resu['MAX(id)'];

  $db->close();

  header("HTTP/1.1 303 See Other");
  header("Location: http://site1804.web.cs.unibo.it/server/annotations/read.php?id=" . $id);
}
?>