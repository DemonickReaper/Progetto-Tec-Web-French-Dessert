<?php
   session_start(); //apro la sessione
   class MyDB extends SQLite3
   {
      function __construct()
      {
         $this->open('log.db');
      }
   }
   $db = new MyDB();
   if(!$db){
      echo $db->lastErrorMsg();
   } else {
      echo "Opened database successfully\n";
      echo "<br>";
   }
$myusername=$_REQUEST['username']; 
$mypassword=$_REQUEST['password'];
   $sql =<<<EOF
      SELECT * from LOGIN;
EOF;

$ret = $db->query($sql);
$bool=false;
$datauser=0;
while($row = $ret->fetchArray(SQLITE3_ASSOC) ){
    echo "USERNAME: = ". $row['USERNAME'] . "\n";
    echo "PASSWORD: = ". $row['PASSWORD'] . "\n";
    echo "<br>";
    if($myusername==$row['USERNAME']&&$mypassword==$row['PASSWORD']){
        echo "Login effettuato con successo";
        echo "<br>";
        //$_SESSION['datauser']++;
        $data=[$myusername];
        $_SESSION['datauser']=$data;
        $bool=true;
    }
}
if($bool==false){
    echo "Attenzione username o password errati"; 
    //torna alla pagina dando errore di connessione
}

$db->close();
?>

<!DOCTYPE html>
<html
<body>
<a href="main.php">Torna alla Home</a>
</body>
</html>