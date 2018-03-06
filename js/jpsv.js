$(document).ready(function (){
			
	var pinned = false; //verifica che il tasto "pin" sia stao premuto o meno
	var showRef = true; //verifica che il tasto "show/hide" nella sezione References sia stao premuto o meno
	var showEl = true; //verifica che il tasto "show/hide" nella sezione External links sia stao premuto o meno
	var showSeal = true; //verifica che il tasto "show/hide" nella sezione See other sia stao premuto o meno
	var findCate = false; //verifica se la pagina in cui ci si trova fa parte o meno del nostro topic "french dessert"
	var mapCheck = false;   //verificano se la relativa api é presente in un riquadro visibile della pagina corrente
	var instaCheck = false;
	var crossCheck = false;
	var charCheck = false; //

	var lat; // latitudine, utilizzata dall'api di google maps
	var lg; //longitudine, , utilizzata dall'api di google maps
	
	var popCheck = 0; //contatori
	var lastScrollTop = 0;
	var i = 0;
	var j = 0;
	var borderCheck = 0; //utilizzata per creare id procedurali
	var backup = new Array(); //array in cui vengono salavate le pagine  prima di passare a quelle successive
	var firstTime = true; //conrollo necessario per capire se si proviene dalla homepage o meno

	jQuery.fn.spectragram.accessData = { //token di accesso per instagram
		accessToken: '6905758419.e029fea.b95cf1b2cf4b4188b5e494fb3ec5a166',
		clientID: '6905758419'
	};
	
	if(firstTime===true) {
		var wApi = localStorage.getItem("wApi");
		if(wApi === '{"batchcomplete":""}') { //verifica che la ricerca delle pagine abbia trovato almeno un risultato
			$('#tableList').append('<h1 id="queryError">There were no results matching the query :( </h1>'); 
			$('#queryError').css({"background-color":"white","padding-left":"15%","font-weight":"bold",});
			$('#maps,#instagram,#skip2,#chart,#skip').fadeOut();
		}
		else {
			var wikiApi = JSON.parse(wApi);
			firstTime = false;
			if (wikiApi.query !== undefined) {//verifica se si tratta di una ricerca di pagine 
				queryResult(wikiApi);
			}
			else {                           //o se si tratta della pagina da caricare (nel caso in cui si sia arrivati qui tramite un dolce nella homepage)
				titleClickedResult (wikiApi);
			}
		}
		
	}

	function queryResult(apiResult){//passa l'oggetto json ottenuto come stringa
		
		var wikiApi = apiResult;

		for (var pageId in wikiApi.query.pages){ //stampa la lista dei risultati della ricerca
			if (wikiApi.query.pages.hasOwnProperty(pageId)) {
				$('#tableList').append('<tr class="blockList"><td class="col-xs-4 titleBlock"><h3><a href="visual.php" id="'+
				wikiApi.query.pages[pageId].pageid+'" class="resultList">'+ wikiApi.query.pages[pageId].title +
				'</a></h3></td><td class="col-xs-8 textBlock"><p>' +
				wikiApi.query.pages[pageId].extract + '</p></td></tr></div>');
			};
		};	
		$('#maps,#instagram,#skip2,#chart,#skip').fadeOut(); //chiude i riquadri delle varie api
}

	$('#tableList').on('click','.resultList', function(e) {//quando si clicca su un risultato avvia la chiamata per ottenre la pagina
		e.preventDefault();
		pageId = this.id;
		$.ajax({
					url: 'https://en.wikipedia.org/w/api.php?',
					data: {action: 'parse', pageid: pageId, prop: 'text|categories', format: 'json'},
					dataType: 'jsonp',
					success: titleClickedResult,	
					error: function() {alert('The loading of the page is failed');}			
		});
	});	

	function titleClickedResult (apiResult) { //carica il contenuto della pagina wikipedia sul nostro sito

		var wikiApi = apiResult; //inizializzazione variabili accessorie 
		var str = wikiApi.parse['text']['*'];
		var title = wikiApi.parse.title;
		var pageId = wikiApi.parse.pageid;
		var user = $('#user').text();

		$('#maps,#instagram,#skip2,#chart,#skip').fadeIn();	//rende visibili i bottoni delle api sulla navbar
		$('#maps').parent().show();
		$('#maps').show();

		$('#title').html(title); //carica il titolo 

		j = 0;
		findCate = false;

		for(var cate  in apiResult.parse.categories){ //controlla tutte le categorie con cui é indicizzata la pagina wikipedia
			cate = apiResult.parse.categories[j]['*'];
			j++;
			if (cate ==='French_desserts' ||cate === 'French_confectionery'||cate === 'French_pastries') { //se la pagina appartiene al nostro topic
				findCate = true;
				$('#title').css({"color":"pink","font-family":"Roboto Slab","text-shadow":"-1px 0 black, 0 2px black, 2px 0 black, 0 -1px black"});
				$('#wikiPage').css({"font-family":"Roboto Slab","font-size":"16px"});	
				$('#home').after('<li class="active barBar barBarLight" id="cros"><a href="#">Crossref</a></li>');
			}	
		}

		if(findCate === false) { //se la pagina non appartiene al nostro topic
			$('#title').css({"color":"black","font-family":"Raleway","text-shadow":"none"});
			$('#wikiPage').css({"font-family":"Raleway","font-size":"16px"});
			$('#cros').remove();
		}
		
		if ($(str).find('table[class~="infobox"]').length > 0 && $(str).find('#toc').length > 0) { //controlla che nella pagina wikipedia caricata ci siano le sezioni infobox e index prima di stamparle
			$('#wikiPage').html('<div id ="index" class="col-xs-2 sidebar-outer"></div><div id="contentP" class="col-xs-6">' +
				str + '</div><div id="tableP"class="col-xs-3"></div>');
			$('#tableP').append('<button id="pin" type="button" class ="btn btn-primary">Pin</button>');
			$('#tableP').append($('table[class~="infobox"]')[0]);
		}
		else { 
			if ($(str).find('#toc').length > 0) {//controlla che nella pagina wikipedia caricata ci sia la sezione index
				$('#wikiPage').html('<div id ="index" class="col-xs-2 sidebar-outer"></div><div id="contentP" class="col-xs-9">' +	str + '</div>');
			} else {
				if ($(str).find('table[class~="infobox"]').length > 0) {//controlla che nella pagina caricata ci sia la sezione infobox
					$('#wikiPage').html('<div id="contentP" class="col-xs-8">'+ str +'</div><div id="tableP"class="col-xs-3"></div>');
					$('#tableP').append('<button id="pin" type="button" class ="btn btn-primary">Pin</button>');
					$('#tableP').append($('table[class~="infobox"]')[0]);
				}
				else {//nel caso in cui non ci siano ne index ne infobox
					$('#wikiPage').html('<div id="contentP" class="col-xs-11">'+ str + '</div>');
				}
			}
		}

		$('#index').append($('#toc'));
		
		/////////////da qui partono gli script riguardanti la pagina di wikipedia caricata //////////////////////////////////// 
		
		if($('.latitude').length){ //converte i valori di latitudine e longitudine nella pagina wikipedia caricata in valori formattati per le api di google maps
			lat = $('.latitude')[0];
			lg = $('.longitude')[0];
			lat = $(lat).text();
			lg = $(lg).text();
			
			var parts = lat.split(/[^\d\w]+/);
			var parts2 = lg.split(/[^\d\w]+/);
		
			if (parts[2] === 'N' ||parts[2] === 'S' ){
			
				lat = ConvertDMToDD(parts[0], parts[1], parts[2]);
			}
			else {
				if(parts[1] === 'N' ||parts[1] === 'S' ){
					lat = ConvertDToDD(parts[0], parts[1]);
				}
				else{
					lat = ConvertDMSToDD(parts[0], parts[1], parts[2], parts[3]);
				}
			}
			if (parts2[2] === 'E' ||parts2[2] === 'W' ){
				lg = ConvertDMToDD(parts2[0], parts2[1], parts2[2]);
			}
			else {
				if(parts2[1] === 'E' ||parts2[1] === 'W' ) {
					lg = ConvertDToDD(parts2[0], parts2[1]);
				}
				else {
					lg = ConvertDMSToDD(parts2[0], parts2[1], parts2[2], parts2[3]);
				}	
			}
			function ConvertDToDD(degrees, direction) {
				degrees = parseFloat(degrees);
				var dd = degrees;
		
				if (direction === "S" || direction === "W") {
					dd = dd * -1;
				} // non fa niente per N o E
				return dd;
			}
			function ConvertDMToDD(degrees, minutes, direction) {
				degrees = parseFloat(degrees);
				minutes = parseFloat(minutes);
				var dd = degrees + minutes/60;
		
				if (direction === "S" || direction === "W") {
					dd = dd * -1;
				} // non fa niente per N o E
				return dd;
			}
			function ConvertDMSToDD(degrees, minutes, seconds, direction) {
				degrees = parseFloat(degrees);
				minutes = parseFloat(minutes);
				seconds = parseFloat(seconds);
				var dd = degrees + minutes/60 + seconds/(60*60);

				if (direction === "S" || direction === "W") {
					dd = dd * -1;
				} 
				return dd;
			}
		lat = parseFloat(lat); //inizializza i valori di latitudine e longitudine
		lg = parseFloat(lg);	

		///////////////////////////////////////////// inizio api meteo /////////////////////////////////////

		/* l'api del meteo entra in funzione solo se nella pagina attuale sono presenti coordinate geografiche*/

		var weatherKey = '31dc4d7ad84588c4'; //token api meteo
			
		$.ajax({
			url: 'http://api.wunderground.com/api/'+weatherKey+'/forecast/geolookup/conditions/q/'+lat+','+lg+'.json',
			success: weatherSuccess,
			error: function() {alert('Impossible to load weather information');}
		});

		///////////////////////////////////////////// fine api meteo /////////////////////////////////////
	}
	else { //nel caso non ci siano coordinate geografiche nasconde il bottone maps sulla navabar
		$('#maps').parent().hide();
		$('#maps').hide();
	}
		$('#testo .mw-editsection').remove(); //formattazioni della pagina
		$('.mw-editsection').remove();
		$('h2').parent('.toctitle').html('<h2>Index</h2>');
		$('li').addClass('list-group-item list-group-item-action');
		$('table').addClass('table');

		window.onpopstate = function () { //questa funzione permette sia di far funzionare la cronologia delle pagina e sia di poter utilizzare gli # link interni alla pagina senza creare conflitti
			var hashSplit = window.location.href.split('#')[1];
			if (popCheck > 0 && (hashSplit === 'Next' || hashSplit === undefined)) {
				popCheck--;
				$('#mapRow').remove(); //elimina dalla pagina la finestra di google maps
				$('#instaRow').remove(); //elimina dalla pagina la finestra di Instagram
				$('#crosRow').remove(); //elimina dalla pagina la finestra di Crossref
				$('#myChart').remove(); //elimina dalla pagina la finestra di Chart.js
				$('#weatherInfo').remove(); //elimina dalla pagina la finestra del meteo
				instaCheck = false;
				chartCheck = false;
				mapCheck = false;
				crossCheck = false;
				titleClickedResult(backup.pop());
			}
		}
	
		$(document).scrollTop(0);
		$('li ul').remove(); //rimuove le sottoliste per problemi di visualizzazione risconstrati
		$('div.navbox').fadeOut();//nasconde external link
		$('.reflist').fadeOut();//nasconde references
		$('.plainlinks').next('ul').fadeOut();//nasconde see also
		$('.plainlist').next('ul').fadeOut();//nasconde see also
		$('#See_also').next('ul').fadeOut();//nasconde see also
		$('.plainlinks').fadeOut();//nasconde see also
		$('.plainlist').fadeOut();//nasconde see also
		$('img').css({"border":"2px solid #254e72"});
		
		$('a[class="extiw"]').each(function(index){ //rimuove i collegamenti a wiktionary
			$(this).parent().append($(this).text());
			$(this).remove();
		})

		$('.wikitable,#contentP .infobox,#contentP .navbox').each(function(){ //impedisce alle tabelle di fuoriuscire dal paragrafo
			$(this).before('<div id="wikiT'+borderCheck+'" class="wikiT"></div>');
			$(this).appendTo('#wikiT'+borderCheck);
			borderCheck++;
		})
		

		$('.image').each(function(img) { //elimina tutti i collegamenti ipertestuali delle foto
			$(this).parent().append($(this).children()[0]);
			$(this).remove();
		});
		
		if (!($('.toccolours').length)) {//verifica la presenza della tabella "storia della popolazione" nella pagina attuale sulla quale si basa chart.js
			$('#chart').fadeOut();
		}

		$('.reference').remove();

		$(window).scroll(function(event){ //bottone che permette di tornare in cima alla pagina
			var st = $(this).scrollTop();
			if (st > lastScrollTop){
				$('#tocButton').remove();
			} else {
			   $('#titleBar').append('<button id="tocButton" type="button" class ="btn btn-outline-primary"><a href="#title"><span id="arrown" class="glyphicon glyphicon-chevron-up"></span><a></button>');

			}
			lastScrollTop = st;
		 });
		
		jQuery(function ($) { //funzione che inizializza annotator con i suoi plugins store e permissions
			$('#contentP').annotator()
			.annotator('setupPlugins', {}, {
				Store: {
					annotationData: {
						uri: pageId,
					},
					loadFromSearch: {
						uri: pageId
					},
					prefix: 'server',
					urls: {
						create: '/annotations/create.php',
						update: '/annotations/update.php?id=:id',
						destroy: '/annotations/delete.php?id=:id',
						search: '/annotations/index.php'
					}
				},
				Permissions: {
					user: user,
					permissions: {
						'read': [user],
						'update': [user],
						'delete': [user],
						'admin': [user],
					},
					showEditPermissionsCheckbox: false
				},
				Tags: false,
				Filter: false,
				Unsupported: false,
				Auth: false,
				AnnotateItPermissions: false
			})
		});

		$('#contentP a,#tableP a').not('.annotator-save,.annotator-cancel').on('click', function(e) {//se si clicca su un link chiama ricorsivamente la funzione che apre una nuova pagina wikipedia
			e.preventDefault();
			backup.push(apiResult); //aggiunge gli oggetti jsonp delle pagine in un array di oggetti
			window.history.pushState('forward', null, './#Next'); //aggiunge indirizzi fittizzi di pagine alla history
			popCheck ++; //contatore pagine 'lasciate indietro'
			var getTitle = this.title;
			$('#mapRow').remove(); //elimina dalla pagina la finestra di google maps
			$('#instaRow').remove(); //elimina dalla pagina la finestra di Instagram
			$('#crosRow').remove(); //elimina dalla pagina la finestra di Crossref
			$('#myChart').remove(); //elimina dalla pagina la finestra di Chart.js
			$('#weatherInfo').remove(); //elimina dalla pagina la finestra del meteo
			instaCheck = false;
			chartCheck = false;
			mapCheck = false;
			crossCheck = false;
			$.ajax({ //chiamata ajax alla nuova pagina cliccata
				url: 'https://en.wikipedia.org/w/api.php?',
				data: {action: 'parse', page: getTitle, prop: 'text|categories', format: 'json'},
				dataType: 'jsonp',
				success: titleClickedResult,	
				error: function() {alert('The loading of the page is failed');}
			});		
		});

		
		// TASTO PIN sulla tabella di destra
		$('#pin').click(function(e){
			if (pinned === false) {
				$('#tableP').css({
					'position':'fixed',
					'overflow-y':'auto',
					'height': '70vh',
					'margin-left':'75%'
				});
				pinned = true;
				$('#pin').html('UnPin');
			}
			else {
				$('#tableP').css({
					'position':'static',				
					'overflow-y':'scroll',
					'height': '100vh',
					'margin-left':'0'
				});
				pinned = false;
				$('#pin').html('Pin');
			}
		})
		// FINE tasto pin //////////

		// INIZIO tasto show per la sezione references /////////////

		$('#References').html('References\t');
		$('#References').append('<button id="showRef" type="button" class ="btn btn-primary">Show</button>');
		$('#showRef').click(function(e){
			if (showRef === false) {
				$('.reflist').fadeOut();
				showRef = true;
				$('#showRef').html('Show');
			}
			else {
				$('.reflist').fadeIn();
				showRef = false;
				$('#showRef').html('Hide');
			}
		});
		//FINE tasto show per la sezione references////////////

		// INIZIO tasto show per la sezione references /////////////
		$('#External_links').html('External links\t');
		$('#External_links').append('<button id="showEl" type="button" class ="btn btn-primary">Show</button>');
		$('#showEl').click(function(e){
			if (showEl === false) {
				$('div.navbox').fadeOut();
				showEl = true;
				$('#showEl').html('Show');
			}
			else {
				$('div.navbox').fadeIn();
				showEl = false;
				$('#showEl').html('Hide');
			}
		});
		//FINE tasto show per la sezione references////////////

		// INIZIO tasto show per la sezione see also /////////////

		$('#See_also').html('See also\t');
		$('#See_also').append('<button id="showSeal" type="button" class ="btn btn-primary">Show</button>');
		$('#showSeal').click(function(e){
			if (showSeal === false) {
				$('.plainlinks').next('ul').fadeOut();
				$('.plainlist').next('ul').fadeOut();
				$('#See_also').next('ul').fadeOut();
				$('.plainlinks').fadeOut();
				$('.plainlist').fadeOut();
				showSeal = true;
				$('#showSeal').html('Show');
			}
			else {
				$('.plainlinks').next('ul').fadeIn();
				$('#See_also').next('ul').fadeIn();
				$('.plainlist').next('ul').fadeIn();
				$('.plainlinks').fadeIn();
				$('.plainlist').fadeIn();
				showSeal = false;
				$('#showSeal').html('Hide');
			}
		});
		//FINE tasto show per la sezione see also////////////

	} /////////////FINE degli script riguardanti la pagina di wikipedia caricata //////////////////////////////////// 

		///////////////////////////api Maps inizio //////////////////////////////////////////////////////////////////////////////

	$('#maps').click(function(e){
		e.preventDefault();
		$('#maps').parent().show();
		$('#maps').show();
		if($('.latitude').length){
		if(mapCheck === false) {
			mapCheck = true;
			var k = 0;
			$('#navbarBar').append('<div class="row" id="mapRow"><div id="map" class="col-xs-12"> </div>');
			var area;
			var coordinates = new google.maps.LatLng(lat, lg);
			var markers = [];
			var locations = [
				{ lat:  lat, lg: lg, label: $(title).text()}
			];
			area = $('#map')[0];
			var plan = new google.maps.Map(area,{ //visualizza l'area circostante le coordinate utilizzate
				zoom: 15,
				center: coordinates,
				mapTypeId: google.maps.MapTypeId.ROADMAP
			});		
				markers[k] = new google.maps.Marker({ //aggiunge il puntatore nelle coordinate presenti nella pagina wikipedia
					position: new google.maps.LatLng(locations[k].lat,locations[k].lg),
					map: plan,
					title: locations[k].label
				});
		}
		else {
			mapCheck = false;
			$('#mapRow').remove();
		}
		}
	})

///////////////////////////api Maps fine //////////////////////////////////////////////////////////////////////////////

///////////////////////////api Instagram inizio //////////////////////////////////////////////////////////////////////////////
	$('#instagram,#skip').click(function(e){
		e.preventDefault();
	
		if($(this).attr('id')==='skip'){
			instaCheck = false;
			$('#instaRow').remove();
		}
		if(instaCheck === false){
			instaCheck = true;
			$('#navbarBar').append('<div class="row" id="instaRow"><div id="insta" class="col-xs-11"> </div></div>');
			var searchTag = $(title).text();//viene utilizzato il titolo della pagina come hashtag da ricercare
			searchTag = searchTag.replace(/[^a-z,0-9]+/gi, ''); //formattazione del titolo per rimuovere gli spazi
			$('#insta').spectragram('getRecentTagged',{//viene utilizzato spectragram.js per effetturare le chiamate all'api di instagram
					query: searchTag,
					wrapEachWith: ''
				})
		}
		else {
			instaCheck = false;
			$('#instaRow').remove();
		}
	})
///////////////////////////api Instagram fine //////////////////////////////////////////////////////////////////////////////


////////////////////////////////////////////////////////////api Crossref inizio ////////////////////////

	$('#cros').click(function (e) {
		e.preventDefault();
		if(crossCheck === false){
			crossCheck = true;
			var searchTag = $(title).text(); //viene utilizzato il titolo della pagina come tag di ricerca su crossref
			searchTag = searchTag.toLowerCase();

			function crossSuccess (apiResult) {
				var authComplete = false;
				var j = 0;
				var authorFn = [];
				var authorLn = [];
				authorFn[0] = 'unknown'; //se gli autori dell'articolo crossref sono assenti vengono sostituiti da unknown
				authorLn[0] = 'unknown';
				for(var i=0;i<10;i++){
					var doi = apiResult.message.items[i].DOI;
					var title = apiResult.message.items[i].title[0];
					var date = apiResult.message.items[i].created['date-time'];
					var correctDate = date.substring(0,10);
					while(authComplete == false) { 
						if(typeof apiResult.message.items[i].author !== 'undefined') {
							if(typeof apiResult.message.items[i].author[j] !== 'undefined'){
								authorFn[j] = apiResult.message.items[i].author[j].given;
								authorLn[j] = apiResult.message.items[i].author[j].family;
								j++;
							}
							else {
								authComplete = true;			
							}
						}  	
						else {
							authComplete = true;
						}	
					}
					if(j === 0 ) {	
						authorFn[j] = 'unknown';
						authorLn[j] = 'unknown';
						j++;
					}
					if (authorFn[j-1] === undefined){
						authorFn[j-1] = 'unknown';
						authorLn[j-1] = 'unknown';
					}
					authComplete = false;
					$('#navbarBar').append('<div class="row" id="crosRow"><div id="crossRef" class="col-xs-12"></div></div>');
					var crossAppend = '<div class="crc"><table class="table cross"><tr><td>Title:</td><td>'+title+'</td></tr><tr><td>Link:</td><td><a href="https://doi.org/'+doi+'">'+doi+'</a></td></tr><tr><td>Authors:</td><td>';
					while(j > 0) {	
						crossAppend = crossAppend+authorFn[j-1]+'\xa0'+authorLn[j-1]+'\xa0\xa0\xa0';
						j--;
					}
					$('#crossRef').append(crossAppend+'</td></tr><tr><td>Publication:</td><td>'+correctDate+'</td></tr></table></div>');
					
					$('.crc').css({"width":"90%","margin-left":"5%","position":"relative","background-color":"rgb(172, 223, 243)","border":"2px solid #254e72","margin-bottom":"10px","font-family":"Roboto Slab"})
					$('.crc td:nth-child(odd)').css({"width":"7%","font-weight":"bold"})
				}
			}	
			$.ajax({
				url: 'http://api.crossref.org/works?query='+searchTag+'+french+dessert',
				data: {select: 'DOI,title,created,author', sort: 'relevance',rows: '10'},
				success: crossSuccess,	
				error: function() {alert('Impossible to load crossref articles');}
			});
	
		}
		else {
			$('#crosRow').remove();
			crossCheck = false;
		}
	})
//////////////////////////////////////////////////// api crossref FINE ///////////////////////////////////////////////////////////////////////


////////////////////////////////////////////////////// api chart.js Inizio ///////////////////////////////////////
	$('#chart').click(function (e) {
		e.preventDefault();
		if (charCheck == false) {
			charCheck = true;
			$('#navbarBar').append('<div id="chartContainer" class="col-xs-11"><canvas id="myChart" height="400px" width="1900"></canvas></div>');
			$('#chartContainer').css({ "margin-bottom": "2%" });
			$('#myChart').css({ "margin-bottom": "0.5%" });
			var ctx = document.getElementById("myChart").getContext('2d');
			var population = [];
			var labelsA = [];
			var i = 0;
			var isLabel = true; //smista le etichette dai valori della popolazione
			$('.toccolours th,.toccolours td').each(function () { //cattura tutte le informazioni dalle tabelle sulla popolazione e le smista in 2 variabili
				var a = this;
				a = $(a).text().replace(/,/g, '');
				if (isFinite(String(a)) && a !== '') {
					if (isLabel === true) {
						if (a < 2019) {
							isLabel = false;
							labelsA[i] = a;
							i++;
						}
					}
					else {
						isLabel = true;
						population[i - 1] = a;
					}
				}
			})
			var myChart = new Chart(ctx, {
				type: 'bar',
				data: {
					labels: labelsA,
					datasets: [{
						label: 'Historical population',
						data: population,
						backgroundColor: [
							'rgba(255, 99, 132, 0.2)',
							'rgba(54, 162, 235, 0.2)',
							'rgba(255, 206, 86, 0.2)',
							'rgba(75, 192, 192, 0.2)',
							'rgba(153, 102, 255, 0.2)',
							'rgba(220, 20, 60, 0.2)',
							'rgba(255, 182, 193, 0.2)',
							'rgba(218, 112, 214, 0.2)',
							'rgba(255, 0, 255, 0.2)',
							'rgba(128, 0, 128, 0.2)',
							'rgba(75, 0, 130, 0.2)',
							'rgba(125, 38, 205, 0.2)',
							'rgba(72, 61, 139, 0.2)',
							'rgba(132, 112, 55, 0.2)',
							'rgba(0, 0, 255, 0.2)',
							'rgba(135, 206, 255, 0.2)',
							'rgba(0, 199, 140, 0.2)',
							'rgba(0, 201, 87, 0.2)',
							'rgba(0, 255, 0, 0.2)',
							'rgba(238, 238, 0, 0.2)',
							'rgba(255, 165, 0, 0.2)',
							'rgba(139, 90, 0, 0.2)',
							'rgba(238, 207, 161, 0.2)'
						],
						borderColor: [
							'rgba(255,99,132,1)',
							'rgba(54, 162, 235, 1)',
							'rgba(255, 206, 86, 1)',
							'rgba(75, 192, 192, 1)',
							'rgba(153, 102, 255, 1)',
							'rgba(220, 20, 60, 1)',
							'rgba(255, 182, 193, 1)',
							'rgba(218, 112, 214, 1)',
							'rgba(255, 0, 255, 1)',
							'rgba(128, 0, 128, 1)',
							'rgba(75, 0, 130, 1)',
							'rgba(125, 38, 205, 1)',
							'rgba(72, 61, 139, 1)',
							'rgba(132, 112, 55, 1)',
							'rgba(0, 0, 255, 1)',
							'rgba(135, 206, 255, 1)',
							'rgba(0, 199, 140, 1)',
							'rgba(0, 201, 87, 1)',
							'rgba(0, 255, 0, 1)',
							'rgba(238, 238, 0, 1)',
							'rgba(255, 165, 0, 1)',
							'rgba(139, 90, 0, 1)',
							'rgba(238, 207, 161, 1)'
						],
						borderWidth: 1
					}]
				},
				options: {
					tooltips: {
						callbacks: { //aggiunge le virgole ogni 3 cifre decimali ai tooltip
							label: function (tooltipItem, data) {
								return Number(tooltipItem.yLabel).toFixed(0).replace(/./g, function (c, i, a) {
									return i > 0 && c !== "." && (a.length - i) % 3 === 0 ? "," + c : c;
								});
							}
						}
					},
					scales: {
						xAxes: [{
							ticks: {}
						}],
						yAxes: [{ //aggiunge le virgole ogni 3 cifre decimali al asse y
							ticks: {
								beginAtZero: true,
								userCallback: function (value, index, values) {
									value = value.toString();
									value = value.split(/(?=(?:...)*$)/);
									value = value.join('.');
									return value;
								}
							}
						}]
					}
				}
			});
		}
		else {
			charCheck = false;
			$('#chartContainer').remove();
		}
	})
	////////////// fine api chart.js ////////////////////////////////////////

	////////////////////// inizio api Weather underground ///////////////////////////////
	
	function weatherSuccess (apiResult) {
		var days = apiResult.forecast.simpleforecast.forecastday;

		var weatherString1 = '<div id="weatherInfo" class="col-xs-12"><table id="weatherTable" class="col-xs-9"><tr><th colspan="6">Weather forecast</th></tr><tr><th colspan="2" class="col-xs-3">'+days[0].date.weekday+'</th><th colspan="2" class="col-xs-3">'+days[1].date.weekday+'</th><th colspan="2" class="col-xs-3">'+days[2].date.weekday+'</th></tr>';
		weatherString1 = weatherString1+'<tr><td class="col-xs-1.5">'+days[0].conditions+'</td><td class="col-xs-1.5"><img src="'+days[0].icon_url+'"></td><td class="col-xs-1.5">'+days[1].conditions+'</td><td class="col-xs-1.5"><img src="'+days[1].icon_url+'"></td><td class="col-xs-1.5">'+days[2].conditions+'</td><td class="col-xs-1.5"><img src="'+days[2].icon_url+'"></td></tr>';
		weatherString1 = weatherString1+'<tr><td colspan="2" class="col-xs-3">Max:'+days[0].high.celsius+'* <br>Min:'+days[0].low.celsius+'*</td><td colspan="2" class="col-xs-3" id="med">Max:'+days[1].high.celsius+'* <br>Min:'+days[1].low.celsius+'*</td><td colspan="2" class="col-xs-3">Max:'+days[2].high.celsius+'* <br>Min:'+days[2].low.celsius+'*</td></tr></table></div></div>';
		$('#weatherString').append(weatherString1);
	}
		//////////////////////  fine api Weather underground /////////////////////////

}); //fine document ready




