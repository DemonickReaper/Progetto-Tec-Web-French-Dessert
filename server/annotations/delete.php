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
  } else {
    //echo "Opened database successfully\n";
  }

  $sql = "DELETE FROM ANNOTATIONS WHERE id = " . $id . ";";
  $res = $db->query($sql);
  $db->close();

  header("HTTP/1.0 204 NO CONTENT");
}
?>