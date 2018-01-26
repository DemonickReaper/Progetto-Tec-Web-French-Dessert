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
					echo "Welcome <b>".$_SESSION['datauser'] ."!</b>&nbsp"."<a href=\"logout.php\"><b>Logout</b></a>";
			  	} 
			  	else { 
					echo "<a href=\"login.html\"><b>Login</b></a>&nbsp"."Go to Login Page"; 
			 	 }
			 	 ?>  
      			</div>
				<div class="col-xs-7" id="navbarvis">
				<ul class="nav navbar-nav navbar-right">
					<li class="active barBar barBarLight" id="home"><a href="main.php">Home Page</a></li>
					<li class="active barBar barBarLight"><a href="" id="maps">Maps</a></li>
					<li class="active barBar barBarLight"id="instaNavbar"><a href="" id="instagram">Instagram</a></li>
					<li class="active barBar" id="instaSkipNavbar"><button type="button" class="btn btn-outline-primary" id="skip"><span class="glyphicon glyphicon-refresh" id="skip2"></span></button></li>
					<li class="active barBar barBarLight"  id="chartButton"><a href="" id="chart">Charts</a></li>
					<li class="active barBar barBarLight" ><a href="" id="Undefined">Undefined</a></li>
					<li class="active barBar" ><form class="navbar-form" role="search">
		  					<input class="form-control" placeholder="Search" name="srch-term" id="searchTerm" type="text">
							<button class="btn btn-default" id="search" type="button"><i class="glyphicon glyphicon-search"></i></button>
		 				</form>
			 		</li>
		  		</ul>
		 		</div>
						</div>
			</div>
			
			<div class="row"id="wikiPage">
					<table id="tableList" class="table"></table>
			</div>		
		</div>
		<script src="http://code.jquery.com/jquery.js"></script>
		<script src="js/bootstrap.min.js"></script>
		<script type="text/javascript" src="js/spectragram.js"></script>
		<script src="js/jps.js"></script>
		<script src="js/jpsv.js"></script>		
		<script src="js/ann/annotator.min.js"></script>
		<script src="js/ann/annotator.auth.min.js"></script>
		<script src="js/ann/annotator.document.min.js"></script>
		<script src="js/ann/annotator.filter.min.js"></script>
		<script src="js/ann/annotator.kitchensink.min.js"></script>
		<script src="js/ann/annotator.markdown.min.js"></script>	
		<script src="js/ann/annotator.permissions.min.js"></script>
		<script src="js/ann/annotator.tags.min.js"></script>
		<script src="js/ann/annotator.unsupported.min.js"></script>
		<script src="js/Chart.js"></script>
		<script src="js/ann/coffeescript.js"></script>
		<script src="js/ann/store.js"></script>
		<script type="text/coffeescript">
window.onerror = (msg, file, line) ->

  alert(msg + ' ' + file + ' ' + line)



jQuery.ajaxSetup async: false



modules = jQuery.trim """

offline offline/store

"""

modules = modules.split(/\s+/)



run = (file, source) ->

  filename = file.replace /coffee$/, "js"

  compiled = "#{CoffeeScript.compile(source)}\n//@ sourceURL=#{filename}"

  eval(compiled)



sources = ("./src/#{script}.coffee" for script in modules)

requests = jQuery.map sources, (script) ->

  jQuery.get script, jQuery.proxy(run, this, script)



jQuery.when.apply(jQuery, requests).done ->

  content = jQuery("#content").annotator()

  content.annotator 'addPlugin', 'Offline',

	online:  -> jQuery("#status").text("Online")

	offline: -> jQuery("#status").text("Offline")



  window.annotator = content.data('annotator')



jQuery("#clear-storage").click ->

  window.annotator.plugins.Offline.store.clear() if window.annotator

</script>
	</BODY>
</HTML>