<HTML>
	<HEAD>
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<!-- Bootstrap -->
		<link href="css/bootstrap.min.css" rel="stylesheet" media="screen">
		<link href="css/visual.css" rel="stylesheet" type="text/css">
		<link href="css/annotator.min.css" rel="stylesheet" type="text/css">
		<link href="https://fonts.googleapis.com/css?family=Merriweather:700i" rel="stylesheet">
		<link href="https://fonts.googleapis.com/css?family=Roboto+Slab" rel="stylesheet">
		<link href="https://fonts.googleapis.com/css?family=Raleway" rel="stylesheet">

		<script type="text/javascript" src="http://maps.googleapis.com/maps/api/js?key=AIzaSyC1RFmDhFHNrAoxNwGny88dnZtvhywPqE0"> </script>
	</HEAD>
	<BODY>
		<div class="container-fluid" id="testo">
			<div class="row">
				<div id="titleSpace">
					<h1 id="title">FRENCH DESSERT</h1>
				</div>
            </div>
           	<div class="row" id="navbarBar">
					<div class="col-xs-12" id="header">
							
						<img src="" id= "headim" alt="">
						  </div><!--#header-->
						  
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
				<div class="col-xs-3" id="titleBar">French Dessert</div>
				<div class="col-xs-2" id="lognav">
  			   <?php 
      			session_start();
      			if (isset($_SESSION['datauser']) && $_SESSION['datauser'] == true) { 
        			echo "Welcome <b>".$_SESSION['datauser'] ."!</b>"; 
        			echo " <a href=\"logout.php\"><b>Logout</b></a>";
      			} 
      			else { 
        			echo " <a href=\"login.html\"><b>Login</b><br></a>";
        			echo "Go to Login Page."; 
     			 }
      			?>  
      			</div>
				<div class="collapse navbar-collapse navbar-ex1-collapse" id="navbarvis">
				<ul class="nav navbar-nav navbar-right">
					<li class="active barBar" id="home"><a href="main.php">Home Page</a></li>
					<li class="active barBar"><a href="" id="maps">Maps</a></li>
					<li class="active barBar"id="instaNavbar"><a href="" id="instagram">Instagram</a></li>
					<li class="active barBar" id="instaSkipNavbar"><button type="button" class="btn btn-outline-primary" id="skip"><span class="glyphicon glyphicon-refresh"></span></button></li>
			 		<li class="barBar">
			  			<form class="navbar-form" role="search">
		  					<input class="form-control" placeholder="Search" name="srch-term" id="searchTerm" type="text">
							<button class="btn btn-default" id="search" type="button"><i class="glyphicon glyphicon-search"></i></button>
		 				</form>
			 		</li>
		  		</ul>
		 		</div>
						</div>
			</div>
			<div class="row">
				<div id="wikiPage">
					<table id="tableList" class="table"></table>
				</div>
			</div>		
		</div>
		<script src="http://code.jquery.com/jquery.js"></script>
		<script src="js/bootstrap.min.js"></script>
		<script type="text/javascript" src="js/spectragram.js"></script>
		<script src="js/jps.js"></script>
		<script src="js/jpsv.js"></script>
		<script src="js/annotator-full.min.js"></script>
		<script src="js/Chart.js"></script>
	</BODY>
</HTML>