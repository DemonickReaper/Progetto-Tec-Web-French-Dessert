<?php 
session_start();
$pageid = $_GET["uri"];
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

  $sql1 = "SELECT * FROM ANNOTATIONS WHERE user = '" . $username . "' AND pageid ='" . $pageid . "';";

  $res = $db->query($sql1);

  $sql2 = "SELECT COUNT(*) FROM ANNOTATIONS WHERE user = '" . $username . "' AND pageid ='" . $pageid . "';";

  $total = $db->query($sql2);


  if (!$res) {
    echo $db->lastErrorMsg();
  } else {
    $rows = array();
    $ranges = array();
    $total = $total->fetchArray(SQLITE3_ASSOC);
    $rows['total'] = $total['COUNT(*)'];
    $i = 0;
    while ($row = $res->fetchArray(SQLITE3_ASSOC)) {
      $ranges[$i]['start'] = $row['start'];
      $ranges[$i]['end'] = $row['end'];
      $ranges[$i]['startOffset'] = $row['startOffset'];
      $ranges[$i]['endOffset'] = $row['endOffset'];
      $rows['rows'][$i]['text'] = $row['text'];
      $rows['rows'][$i]['id'] = $row['id'];
      $rows['rows'][$i]['user'] = $row['user'];    
      $rows['rows'][$i]['ranges'] =  $ranges;
      $i++;
    } 
    $jsonObject = json_encode($rows);
    header('Content-Type: application/json');
    echo $jsonObject;
  }
  $db->close();
}
?>

