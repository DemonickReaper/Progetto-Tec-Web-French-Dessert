<?php
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
   }


?>

 <?php 
    $username=$_REQUEST['username']; 
    $password=$_REQUEST['password']; 
   
   $sql =<<<EOF
      INSERT INTO LOGIN (USERNAME,PASSWORD)
      VALUES ('$username', '$password'); 
EOF;

   $ret = $db->exec($sql);
   if(!$ret){
    echo $db->lastErrorMsg();
   } else {
    echo "Registration successfully\n";
   }
   $db->close();
   unset($db);
?>

<!DOCTYPE html>
<html>
<body>
<a href="login.html">Torna al Login</a>
</body>
</html>