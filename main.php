<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>French Dessert</title>

    <!-- Bootstrap -->
    <link href="css/bootstrap.min.css" rel="stylesheet" media="screen">
	<link href="css/filehome.css" rel="stylesheet">
    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
      <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
    <![endif]-->
  </head>
  <body>
  <div class="container-fluid" id ="container">
    <!--
    <div class="col-xs-12" id="header">
  	<img src="" id= "headim" alt="">
	</div>#header-->
	<div class="row">
    <h1 id="title">FRENCH DESSERT</h1>
  </div>
  <div class="col-xs-3">
      <?php 
      session_start();
      if (isset($_SESSION['datauser']) && $_SESSION['datauser'] == true) { 
        echo "Welcome <b>".$_SESSION['datauser'] ."!</b>"; 
        echo "<br><a href=\"logout.php\"><b>Logout</b></a>";
      } 
      else { 
        echo "<br><a href=\"login.html\"><b>Login</b><br></a>";
        echo "Go to Login Page."; 
      }
      ?>  
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
      <ul class="nav navbar-nav navbar-right">
          <li class="active"><a href="main.php">Home Page</a></li>
          <li><a href="login.html">Login </a></li>
         <li>
          <form class="navbar-form" role="search">
      <input class="form-control" placeholder="Search" name="srch-term" id="searchTerm" type="text">
        <button class="btn btn-default" id="search" type="button"><i class="glyphicon glyphicon-search"></i></button>
     </form>
         </li>
      </ul>
     </div>
    </nav>
  </div><!--#navigation-->

	<div class="row" id="page1">
		<div class="col-xs-3" id="link">
      <dl>
        <dt id="list"><a href="3488569" class="linkList"><img src="img\link\charlotte1.jpg" id="imglist" alt=""></a></dt><!--Charlotte -->
        <dt id="list"><a href="1072540" class="linkList"><img src="img\link\mill2.jpg" id="imglist" alt=""></a></dt><!--Mille-Feuille -->
        <dt id="list"><a href="2005216" class="linkList"><img src="img\link\maca3.jpg" id="imglist" alt=""></a></dt><!--Macaron -->
        <dt id="list"><a href="23882016" class="linkList"><img src="img\link\opera4.jpg" id="imglist" alt=""></a></dt><!--Opera cake -->
        <dt id="list"><a href="697505" class="linkList"><img src="img\link\profi5.jpg" id="imglist" alt=""></a></dt><!--Profiterole -->
        <dt id="list"><a href="20151" class="linkList"><img src="img\link\mou6.jpg" id="imglist" alt=""></a></dt><!--Mousse -->
        <dt id="list"><a href="15076873" class="linkList"><img src="img\link\pot7.jpg" id="imglist" alt=""></a></dt><!--Pot de creme -->
        <dt id="list"><a href="10429299" class="linkList"><img src="img\link\cali8.jpg" id="imglist" alt=""></a></dt><!--Calisson -->
        <dt id="list"><a href="3239869" class="linkList"><img src="img\link\claf9.jpg" id="imglist" alt=""></a></dt><!--Clafoutis -->
        <dt id="list"><a href="26388185" class="linkList"><img src="img\link\flau10.jpg" id="imglist" alt=""></a></dt><!--Flaugnarde -->
        <dt id="list"><a href="8249186" class="linkList"><img src="img\link\cust11.jpg" id="imglist" alt=""></a></dt><!--Custard Tart -->
        <dt id="list"><a href="11908954" class="linkList"><img src="img\link\dac12.jpg" id="imglist" alt=""></a></dt><!--Marjolaine Dacquoise-->
        <dt id="list"><a href="16884570" class="linkList"><img src="img\link\norm13.jpg" id="imglist" alt=""></a></dt><!--Norman Tart -->
        <dt id="list"><a href="288042" class="linkList"><img src="img\link\croq14.jpg" id="imglist" alt=""></a></dt><!--Croquembouche -->
        <dt id="list"><a href="8603844" class="linkList"><img src="img\link\mend15.jpg" id="imglist" alt=""></a></dt><!--Mendiant -->
        <dt id="list"><a href="17829638" class="linkList"><img src="img\link\poir16.jpg" id="imglist" alt=""></a></dt><!--Poire belle Helene -->
        <dt id="list"><a href="32187580" class="linkList"><img src="img\link\crem17.jpg" id="imglist" alt=""></a></dt><!--Creme brule -->
        <dt id="list"><a href="4236804" class="linkList"><img src="img\link\yul18.jpg" id="imglist" alt=""></a></dt><!--Yule log -->
        <dt id="list"><a href="3634201" class="linkList"><img src="img\link\floa19.jpg" id="imglist" alt=""></a></dt><!--Floating Island -->
        <dt id="list"><a href="49345428" class="linkList"><img src="img\link\conv20.jpg" id="imglist" alt=""></a></dt><!--Conversation Tart -->
      </dl>
    </div><!--#link-->	
	  	<div class="col-xs-9" id="bio">
      </div>
     <div class="col-xs-9" id="photo">
      <img src="img/pasthome.jpg" id= "photo" alt="imghome"></div><!--#photo-->
		</div>
	</div>

    <!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>
    <!-- Include all compiled plugins (below), or include individual files as needed -->
    <script src="http://code.jquery.com/jquery.js"></script>
    <script src="js/bootstrap.min.js"></script>
    <script src="js/jps.js" async></script> 
  </body>
</html>