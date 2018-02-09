<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>French Dessert</title>

    <!-- Bootstrap -->
    <link href="https://fonts.googleapis.com/css?family=Raleway" rel="stylesheet">
    <link href="css/bootstrap.min.css" rel="stylesheet" media="screen">
    <link href="css/filehome.css" rel="stylesheet">
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
     <div class="col-xs-3" id="titlebar">French Dessert</div>
     <div class="col-xs-2" id="lognav">
     <?php 
    session_start();
    if (isset($_SESSION['datauser']) && $_SESSION['datauser'] == true) {
      echo "Welcome <b>" . $_SESSION['datauser'] . "!</b>&nbsp" . "<a href=\"logout.php\" id=\"linklog\"><b>Logout</b></a>";
    } else {
      echo "Go to&nbsp"."<a href=\"loginp.php\" id=\"linklog\">Login Page</a>&nbsp";
    }
    ?>  
      </div>
     <div class="collapse navbar-collapse navbar-ex1-collapse">
      <ul class="nav navbar-nav navbar-right" id="navBar1">
    <?php
     if (isset($_SESSION['error'])){
      if($_SESSION['error']==2) {
        ?>
        <li class="barBarLight barBar" id="logbar"><a href="logout.php">Logout </a></li><?php
      }
    }
      else
      {
      ?><li class="barBarLight barBar" id="logbar"><a href="loginp.php">Login </a></li><?php
      }?>
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
  </div><!--#navigation-->

	<div class="row" id="page1">
		<div class="col-xs-12" id="link">
      <dl>
        <dt id="list"><a href="3488569" class="linkList"><img src="img\link\charlotte1.jpg" id="imglist" alt=""></a><!--Charlotte -->
        <a href="1072540" class="linkList"><img src="img\link\mill2.jpg" id="imglist" alt=""></a><!--Mille-Feuille -->
        <a href="2005216" class="linkList"><img src="img\link\maca3.jpg" id="imglist" alt=""></a><!--Macaron -->
        <a href="23882016" class="linkList"><img src="img\link\opera4.jpg" id="imglist" alt=""></a></dt><!--Opera cake -->
        <dt id="list"><a href="697505" class="linkList"><img src="img\link\profi5.jpg" id="imglist" alt=""></a><!--Profiterole -->
        <a href="20151" class="linkList"><img src="img\link\mou6.jpg" id="imglist" alt=""></a><!--Mousse -->
        <a href="15076873" class="linkList"><img src="img\link\pot7.jpg" id="imglist" alt=""></a><!--Pot de creme -->
        <a href="10429299" class="linkList"><img src="img\link\cali8.jpg" id="imglist" alt=""></a></dt><!--Calisson -->
        <dt id="list"><a href="3239869" class="linkList"><img src="img\link\claf9.jpg" id="imglist" alt=""></a><!--Clafoutis -->
        <a href="26388185" class="linkList"><img src="img\link\flau10.jpg" id="imglist" alt=""></a><!--Flaugnarde -->
        <a href="8249186" class="linkList"><img src="img\link\cust11.jpg" id="imglist" alt=""></a><!--Custard Tart -->
        <a href="11908954" class="linkList"><img src="img\link\dac12.jpg" id="imglist" alt=""></a></dt><!--Marjolaine Dacquoise-->
        <dt id="list"><a href="16884570" class="linkList"><img src="img\link\norm13.jpg" id="imglist" alt=""></a><!--Norman Tart -->
        <a href="288042" class="linkList"><img src="img\link\croq14.jpg" id="imglist" alt=""></a><!--Croquembouche -->
        <a href="8603844" class="linkList"><img src="img\link\mend15.jpg" id="imglist" alt=""></a><!--Mendiant -->
       <a href="17829638" class="linkList"><img src="img\link\poir16.jpg" id="imglist" alt=""></a></dt><!--Poire belle Helene -->
        <dt id="list"><a href="32187580" class="linkList"><img src="img\link\crem17.jpg" id="imglist" alt=""></a><!--Creme brule -->
        <a href="4236804" class="linkList"><img src="img\link\yul18.jpg" id="imglist" alt=""></a><!--Yule log -->
        <a href="3634201" class="linkList"><img src="img\link\floa19.jpg" id="imglist" alt=""></a><!--Floating Island -->
       <a href="49345428" class="linkList"><img src="img\link\conv20.jpg" id="imglist" alt=""></a></dt><!--Conversation Tart -->
      </dl>
    </div><!--#link-->	
	  <!--	<div class="col-xs-9" id="bio">
      </div>
     <div class="col-xs-9" id="photo">
      <img src="img/pasthome.jpg" id= "photo" alt="imghome"></div>
		</div>-->
	</div>

    <!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>
    <!-- Include all compiled plugins (below), or include individual files as needed -->
    <script src="http://code.jquery.com/jquery.js"></script>
    <script src="js/bootstrap.min.js"></script>
    <script src="js/jps.js" async></script> 
  </body>
</html>