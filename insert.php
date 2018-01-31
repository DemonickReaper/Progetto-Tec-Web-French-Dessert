<?php
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
   }


?>

 <?php 
    $username=$_REQUEST['username']; 
    $password=$_REQUEST['password']; 
   
   $sql1 =<<<EOF
      INSERT INTO LOGIN (username,password)
      VALUES ('$username', '$password'); 
EOF;

   $ret = $db->exec($sql1);
   if(!$ret){
    echo $db->lastErrorMsg();
   } else {
    echo "Registration successfully\n";
   }
   $db->close();
   unset($db);
   header('location: login.html');
?>

<!DOCTYPE html>
<html>
<body>
<a href="login.html">Torna al Login</a>
</body>
</html>