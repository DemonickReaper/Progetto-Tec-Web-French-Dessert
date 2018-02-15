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
    if($myusername==$row['username']&&$mypassword==$row['password']){ //controlla se username e psw corrispondano
        $data=[$myusername];
        $_SESSION['datauser']=implode($data);
        $_SESSION['error']=2; //stato 2: utente loggato
        $bool=true;
        header('location: index.php');
    }
}
if($bool==false){
  $_SESSION['error']=1;
  header('location: loginp.php');
}
$db->close();
?>
