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

  $sql = "SELECT * FROM ANNOTATIONS WHERE id = " . $id . ";";
  $res = $db->query($sql);

  $rows = array();
  $ranges = array();
  $row = $res->fetchArray(SQLITE3_ASSOC);
  $i = 0;

  $rows['id'] = $row['id'];
  $rows['text'] = $row['text'];
  $rows['uri'] = $row['pageid'];
  $rows['permissions']['read'] = $row['read'];
  $rows['permissions']['update'] = $row['update'];
  $rows['permissions']['delete'] = $row['delete'];
  $rows['permissions']['admin'] = $row['admin'];
  $ranges[$i]['start'] = $row['start'];
  $ranges[$i]['end'] = $row['end'];
  $ranges[$i]['startOffset'] = $row['startOffset'];
  $ranges[$i]['endOffset'] = $row['endOffset'];
  $rows['ranges'] = $ranges;
  $rows['user'] = $row['user'];

  $jsonObject = json_encode($rows);
  header('Content-Type: application/json');
  echo $jsonObject;

  $db->close();
}
?>