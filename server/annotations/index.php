<?php 
session_start();
var_dump($_GET["uri"]);

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
    echo "Opened database successfully\n";
  }

  $sql = "SELECT * FROM ANNOTATIONS WHERE user = " . $username . "AND pageid =". $pageid .";";

  $ret = $db->exec($sql);

  if (!$ret) {
    echo $db->lastErrorMsg();
  } else {
    var_dump($ret);
    $jsonObject = json_encode($ret);
    echo  $jsonObject;
  }
  $db->close();
}
?>