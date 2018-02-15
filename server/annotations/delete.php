<?php
session_start();
$id = $_GET['id'];

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

  $sql = "DELETE FROM ANNOTATIONS WHERE id = " . $id . ";"; //verifica la corrispondenza dell'id (univoca per ogni commento)
  $res = $db->query($sql);
  $db->close();

  header("HTTP/1.0 204 NO CONTENT");
}
?>