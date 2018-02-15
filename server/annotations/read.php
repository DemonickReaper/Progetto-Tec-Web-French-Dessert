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

  $sql = "SELECT * FROM ANNOTATIONS WHERE id = " . $id . ";";
  $res = $db->query($sql);

  $rows = array();
  $ranges = array();
  $row = $res->fetchArray(SQLITE3_ASSOC);
  $i = 0;

  $rows['id'] = $row['id'];
  $rows['text'] = $row['textt'];
  $rows['uri'] = $row['pageid'];
  $read = $row['readd'];
  $read = explode(',', $read);
  $update = $row['updatee'];
  $update = explode(',', $update);
  $delete = $row['deletee'];
  $delete = explode(',', $delete);
  $admin = $row['adminn'];
  $admin = explode(',', $admin);
  $rows['permissions']['read'] = $read;
  $rows['permissions']['update'] = $update;
  $rows['permissions']['delete'] = $delete;
  $rows['permissions']['admin'] = $admin;
  $ranges[$i]['start'] = $row['startt'];
  $ranges[$i]['end'] = $row['endd'];
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