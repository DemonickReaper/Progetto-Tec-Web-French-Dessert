<?php
   session_start(); //apro la sessione
   class MyDB extends SQLite3
   {
      function __construct()
      {
         $this->open('server/progetto.db');
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
   $sql1 =<<<EOF
      SELECT * from LOGIN;
EOF;

$ret = $db->query($sql1);
$bool=false;
$datauser=0;
while($row = $ret->fetchArray(SQLITE3_ASSOC) ){
    echo "USERNAME: = ". $row['username'] . "\n";
    echo "PASSWORD: = ". $row['password'] . "\n";
    echo "<br>";
    if($myusername==$row['username']&&$mypassword==$row['password']){
        echo "Login effettuato con successo";
        echo "<br>";
        //$_SESSION['datauser']++;
        $data=[$myusername];
        $_SESSION['datauser']=implode($data);
        echo $_SESSION['datauser'];
        $bool=true;
        header('location: main.php');
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
<a href="login.html">Ritenta Login</a>
</body>
</html>