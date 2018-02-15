<?php
 session_start();
 if (isset($_SESSION['error'])){
 if($_SESSION['error']==1) //stato 1: utente o psw errati
 {
  $message = "Username and/or Password incorrect.\\nTry again.";
  echo "<script type='text/javascript'>alert('$message');</script>";
  unset($_SESSION['error']);
 }
}
 if (isset($_SESSION['error'])){
 if($_SESSION['error']==2) //stato 2: utente loggato
 {
  $message = "Already logged, logout and try again";
  echo "<script type='text/javascript'>alert('$message');</script>";
 ?>
 <script type="text/javascript">
  window.location.href='index.php';
  </script> 
 <?php
 }
}
 if (isset($_SESSION['error'])){
  if($_SESSION['error']==3) //stato 3: utente già esistente
  {
   $message = "This user already exist, try again";
   echo "<script type='text/javascript'>alert('$message');</script>";
   unset($_SESSION['error']);
   }
}
if (isset($_SESSION['error'])){
  if($_SESSION['error']==4) //stato 4: registrazione effettuata con successo
  {
   $message = "Registration successfully, \\nNow you can login";
   echo "<script type='text/javascript'>alert('$message');</script>";
   unset($_SESSION['error']);
   }
}
?>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>French Dessert</title>
    <link href="https://fonts.googleapis.com/css?family=Raleway" rel="stylesheet">
    <link href="css/bootstrap.min.css" rel="stylesheet" media="screen">
	<link href="css/filelog.css" rel="stylesheet">
  </head>
  <body>
  <div class="container-fluid" id ="container">
  <div class="row">
    <h1 id="title">FRENCH DESSERT</h1>
  </div>
  <div class="col-xs-3">

    </div>
	<div class="col-xs-12" id="navigation">
		<nav class="navbar navbar-inverse" role="navigation">
     <!--Logo e pulsante per barra ridimensionata -->
     <div class="navbar-header">
        <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-ex1-collapse">
          <span class="sr-only">Espandi barra di navigazione</span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </button>
      </div>
  
     <!--Elementi della barra -->
     <div class="col-xs-5" id="titlebar">French Dessert</div>
     <div class="collapse navbar-collapse navbar-ex1-collapse">
      <ul class="nav navbar-nav navbar-right" id="navBar1">
          <li class="barBarLight barBar" id="logbar"><a href="#">Login</a></li> 
        <li class="barBarLight barBar"><a href="index.php">Home Page</a></li>
         
         <li>
          <form class="navbar-form" role="search">
      <input class="form-control" placeholder="Search" name="srch-term" id="searchTerm" type="text">
        <button class="btn btn-default barBarLight" id="search" type="button"><i class="glyphicon glyphicon-search"></i></button>
     </form>
         </li>
      </ul>
     </div>
    </nav>
	</div><!--#navigation close-->

  <div class="col-xs-9" id="log"> 
    <div class="row">
  <div class="col-md-12" >
     <div class="panel panel-login"id="loginBox">
       <div class="panel-heading">
         <div class="row">
           <div class="col-xs-6">
             <a href="#" class="active" id="login-form-link">Login</a>
           </div>
           <div class="col-xs-6">
            <a href="#" class="active" id="register-form-link">Register</a>
          </div>
         </div>
         <hr>
       </div>
       <div class="panel-body">
         <div class="row">
           <div class="col-lg-12">
             <form id="login-form" action="login.php" method="post" role="form" style="display: block;"> 
               <div class="form-group">
                 <input type="text" name="username" id="usernamel" tabindex="1" class="form-control" placeholder="Username" value="">
               </div>
               <div class="form-group">
                 <input type="password" name="password" id="passwordl" tabindex="2" class="form-control" placeholder="Password">
               </div>
                <div class="form-group">
                 <div class="row">
                   <div class="col-sm-6 col-sm-offset-3"> <!-- pulsante login attiva login form -> action -->
                     <input type="submit" name="login-submit" id="login-submit" tabindex="4" class="form-control btn btn-login" value="Log In">
                   </div>
                 </div>
               </div>
             </form>
             <form id="register-form" action="insert.php" method="post" role="form" style="display: none;">
               <div class="form-group">
                 <input type="text" name="username" id="usernamer" tabindex="1" class="form-control" placeholder="Username">
               </div>
                 <div class="form-group">
                 <input type="password" name="password" id="passwordr" tabindex="2" class="form-control" placeholder="Password">
               </div>
                 <div class="form-group">
                 <div class="row">
                   <div class="col-sm-6 col-sm-offset-3"> <!--pulsante registrazione register form -> action -->
                     <input type="submit" name="register-submit" id="register-submit" tabindex="4" class="form-control btn btn-register" value="Register Now">
                   </div>
                 </div>
               </div>
             </form>
           </div>
         </div>
       </div>
     </div>
   </div>
  </div>
  </div>
    <!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>
    <!-- Include all compiled plugins (below), or include individual files as needed -->
    <script src="http://code.jquery.com/jquery.js"></script>
    <script src="js/bootstrap.min.js"></script>
    <script src="js/jps.js" async></script> 
    <script src="js/login.js" async></script> 
  </body>
</html>