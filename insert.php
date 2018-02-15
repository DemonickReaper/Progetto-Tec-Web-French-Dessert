<?php
   session_start();
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
    if(($_REQUEST['username']!="") && ($_REQUEST['password']!="")){
    $username=$_REQUEST['username']; 
    $password=$_REQUEST['password']; 
    
    $sql=<<<EOF
      SELECT * FROM LOGIN
EOF;
$ret = $db->query($sql);
while($row = $ret->fetchArray(SQLITE3_ASSOC) ){
      if($username==$row['username']){ //verifica se esiste già un utente registrato con quell'username
            $_SESSION['error']=3; //stato 3: utente già registrato
            header('location: loginp.php');
      }
      else{
    $sql1 =<<<EOF
      INSERT INTO LOGIN (username,password)
      VALUES ('$username', '$password'); 
EOF;
      }
}
    }
    else{
      $_SESSION['error']=1;
      header('location: loginp.php');
    }


   $ret = $db->exec($sql1);
   if(!$ret){
    echo $db->lastErrorMsg();
   } else {
    $_SESSION['error']=4; // stato 4: registrazione effettuata con successo 
   }
   $db->close();
   unset($db);
   header('location: loginp.php');
?>
