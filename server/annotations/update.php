<?php
$id = $_GET['id'];
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
    }
    $pageid = $rows['uri']; //smista l'annotazione nei vari attributi del database
    $start = $rows['ranges'][0]['start'];
    $startOffset = $rows['ranges'][0]['startOffset'];
    $end = $rows['ranges'][0]['end'];
    $endOffset = $rows['ranges'][0]['endOffset'];
    $text = $rows['text'];
    $user = $rows['user'];
    $read = $rows['permissions']['read'];
    $update = $rows['permissions']['update'];
    $delete = $rows['permissions']['delete'];
    $admin = $rows['permissions']['admin'];
    $read = implode(',',$read);
    if($read === ''){
      $read = 'NULL';
    }
    $update = implode(',',$update);
    $delete = implode(',',$delete);
    $admin = implode(',',$admin);
    $sql = "UPDATE ANNOTATIONS 
    SET pageid=".$pageid.",startt='".$start."',endd='".$end."',startOffset=".$startOffset.",endOffset=".$endOffset.",textt='".$text."',user='".$user."',readd='".$read."',updatee='".$update."',deletee='".$delete."',adminn='".$admin."'
    WHERE id = " . $id . ";"; //sostituisce i nuovi campi prelevati dall'annotazione all'interno del database
    echo $sql;
    $db->query($sql);
    $db->close();

    header("HTTP/1.1 303 See Other");
    header("Location: http://site1804.web.cs.unibo.it/server/annotations/read.php?id=".$id);
}
?>