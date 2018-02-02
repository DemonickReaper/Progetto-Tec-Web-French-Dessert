<?php

$object = file_get_contents('php://input');


//$object = $_POST['data'];
//$object = '{"permissions":{"read":[],"update":[],"delete":[],"admin":[]},"user":"fff","ranges":[{"start":"/div[1]/p[1]/small[1]","startOffset":1,"end":"/div[1]/p[1]","endOffset":99}],"quote":"rench pronunciation: ​[makaʁɔ̃]) is a sweet meringue-based","text":"sadfsadf","uri":2005216}';
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
    $read = implode(',',$read);
    if($read === ''){
      $read = 'NULL';
    }
    $update = implode(',',$update);
    $delete = implode(',',$delete);
    $admin = implode(',',$admin);
    $pageid = $rows['uri'];
    $start = $rows['ranges'][0]['start'];
    $startOffset = $rows['ranges'][0]['startOffset'];
    $end = $rows['ranges'][0]['end'];
    $endOffset = $rows['ranges'][0]['endOffset'];
    $text = $rows['text'];
    $user = $rows['user'];
    $sql = "INSERT INTO ANNOTATIONS (pageid,startt,endd,startOffset,endOffset,textt,user,readd,updatee,deletee,adminn) VALUES (".$pageid.",'".$start."','".$end."',".$startOffset.",".$endOffset.",'".$text."','".$user."','".$read."','".$update."','".$delete."','".$admin."');";
    echo $sql;
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