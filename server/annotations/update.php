<?php
$id = $_GET['id'];
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
    $pageid = $rows['uri'];
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
    WHERE id = " . $id . ";";
    echo $sql;
    $db->query($sql);
    $db->close();

    header("HTTP/1.1 303 See Other");
    header("Location: http://localhost/Progetto-qualcosa-che-si-mangia/server/annotations/read.php?id=".$id);
}
?>