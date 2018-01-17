$(document).ready(function (){
			
	var pinned = false;
	var showRef = true;
	var showEl = true;
	var showSeal = true;
	var findCate = false;
	var popb = false;
	var mapCheck = false;
	var instaCheck = false;

	var lat;
	var lg;
	
	var popCheck = 0;
	var i = 0;
	var j = 0;
	var iii = 0;
	var popback = 0;
	var backup = new Array();
	var ann = new Annotator(document.body);
	var firstTime = true; //conrollo necessario a capire se si proviene dalla homepage o meno

	jQuery.fn.spectragram.accessData = {
		accessToken: '6905758419.e029fea.b95cf1b2cf4b4188b5e494fb3ec5a166',
		clientID: '6905758419'
	};
	
	if(firstTime==true) {
		var wApi = localStorage.getItem("wApi");
		var wikiApi = JSON.parse(wApi);
		firstTime = false;
		if (wikiApi.query !== undefined) {
			queryResult(wikiApi);
		}
		else {
			titleClickedResult (wikiApi);
		}
	}


	$('#search').bind('startSearch',function(e) {//chiamata a wikipedia per ottenere un elenco di pagine inerenti alla chiave "searchTerm", aggiunta anche qui per via della navbar sempre presente
	e.preventDefault();
	var searchTerm = $('#searchTerm').val();    
		$.ajax({
			url: 'http://en.wikipedia.org/w/api.php',
			type:'GET',
			async: 'true',
			data: { action: 'query', generator: 'search', gsrsearch: searchTerm, format: 'json',srlimit: '10',prop: 'info|extracts',inprop: 'url',exintro: '1', exlimit: '20', exchars: '300' },
			dataType: 'jsonp',
			success: queryResult
		});
	});
	
	$('#search').click(function(e){ //avvia la ricerca se premuto il tasto con la lente di ingrandimento
		e.preventDefault();
		$('#search').trigger('startSearch');
	});

	$('#searchTerm').keypress(function(e){//avvia la ricerca se premuto il tasto invio della tastiera
		var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
		if(key == 13){
			e.preventDefault();
			$('#search').trigger('startSearch');
		}
	});

	function queryResult(apiResult){//passa l'oggetto json ottenuto come stringa, sempre in questa pagina, da decidere se modificare
		
		var wikiApi = apiResult;

		for (var pageId in wikiApi.query.pages){ //stampa la lista dei risultati della ricerca
			if (wikiApi.query.pages.hasOwnProperty(pageId)) {
				$('#tableList').append('<tr class="blockList"><td class="col-xs-4 titleBlock"><h3><a href="visual.html" id="'+
				wikiApi.query.pages[pageId].pageid+'" class="resultList">'+ wikiApi.query.pages[pageId].title +
				'</a></h3></td><td class="col-xs-8 textBlock"><p>' +
				wikiApi.query.pages[pageId].extract + '</p></td></tr></div>');
			};
		};	
}

	$('#tableList').on('click','.resultList', function(e) {//quando si clicca su un risultato avvia la chiamata per ottenre la pagina
		e.preventDefault();
		pageId = this.id;
		$.ajax({
					url: 'https://en.wikipedia.org/w/api.php?',
					data: {action: 'parse', pageid: pageId, prop: 'text|categories', format: 'json'},
					dataType: 'jsonp',
					success: titleClickedResult,	
					error: function() {alert('errore');}
				
		});
	});	

	function titleClickedResult (apiResult) { //carica il contenuto della pagina wikipedia sul nostro sito

		var wikiApi = apiResult;
		var str = wikiApi.parse['text']['*'];
		var title = wikiApi.parse.title;
		

		
		$('#maps').parent().show();
		$('#maps').show();

		$('#title').html(title);
		j = 0;
		findCate = false;
		for(var cate  in apiResult.parse.categories){
			cate = apiResult.parse.categories[j]['*'];
			j++;
			if (cate =='French_desserts' ||cate == 'French_confectionery'||cate == 'French_pastries') { //se la pagina appartiene al nostro tag
				$('#title').css({"color":"pink","font-family":"Roboto Slab","text-shadow":"1px 1 black, 1 1px black, 1px 1 black, 1 1px black"});
				$('body').css({"font-family":"Roboto Slab","font-size":"16px"});
				findCate = true;
				$('#home').after('<li class="active barBar" id="cros"><a href="#">Crossref</a></li>');
			}	
		}
		if(findCate == false) { //se la pagina non appartiene al nostro tag
			$('#title').css({"color":"black","font-family":"Raleway","text-shadow":"none"});
			$('body').css({"font-family":"Raleway","font-size":"16px"});
			$('#cros').remove();
		}
		
		if($(str).find('table[class~="infobox"]').length > 0){
		$('#wikiPage').html('<div id ="index" class="col-xs-2 sidebar-outer"></div><div id="contentP" class="col-xs-6">'+
		str+'</div><div id="tableP"class="col-xs-3"></div>');
		$('#tableP').append('<button id="pin" type="button" class ="btn btn-primary">Pin</button>');
		$('#tableP').append($('table[class~="infobox"]')[0]);
		}
	
		else {
			$('#wikiPage').html('<div id ="index" class="col-xs-2 sidebar-outer"></div><div id="contentP" class="col-xs-9">'+
			str+'</div>');
		}

	
	
		$('#index').append($('#toc'));
		$('#index').append('<button id="tocButton" type="button" class ="btn btn-outline-primary"><a href="#title"><span id="arrown" class="glyphicon glyphicon-chevron-up"></span><a></button>');
		
		if($('.latitude').length){
			lat = $('.latitude')[0];
			lg = $('.longitude')[0];
			lat = $(lat).text();
			lg = $(lg).text();
			
			var parts = lat.split(/[^\d\w]+/);
			var parts2 = lg.split(/[^\d\w]+/);
		
			if (parts[2] == 'N' ||parts[2] == 'S' ){
			
				lat = ConvertDMToDD(parts[0], parts[1], parts[2]);
			}
			else {
				if(parts[1] == 'N' ||parts[1] == 'S' ){
					lat = ConvertDToDD(parts[0], parts[1]);
				}
				else{
					lat = ConvertDMSToDD(parts[0], parts[1], parts[2], parts[3]);
				}
			}
			if (parts2[2] == 'E' ||parts2[2] == 'W' ){
				lg = ConvertDMToDD(parts2[0], parts2[1], parts2[2]);
			}
			else {
				if(parts2[1] == 'E' ||parts2[1] == 'W' ) {
					lg = ConvertDToDD(parts2[0], parts2[1]);
				}
				else {
					lg = ConvertDMSToDD(parts2[0], parts2[1], parts2[2], parts2[3]);
				}	
			}
			function ConvertDToDD(degrees, direction) {
				degrees = parseFloat(degrees);
				var dd = degrees;
		
				if (direction == "S" || direction == "W") {
					dd = dd * -1;
				} // Don't do anything for N or E
				return dd;
			}
			function ConvertDMToDD(degrees, minutes, direction) {
				degrees = parseFloat(degrees);
				minutes = parseFloat(minutes);
				var dd = degrees + minutes/60;
		
				if (direction == "S" || direction == "W") {
					dd = dd * -1;
				} // Don't do anything for N or E
				return dd;
			}
			function ConvertDMSToDD(degrees, minutes, seconds, direction) {
				degrees = parseFloat(degrees);
				minutes = parseFloat(minutes);
				seconds = parseFloat(seconds);
				var dd = degrees + minutes/60 + seconds/(60*60);

				if (direction == "S" || direction == "W") {
					dd = dd * -1;
				} // Don't do anything for N or E
				return dd;
			}
		lat = parseFloat(lat);
		lg = parseFloat(lg);	
	}
	else {
		$('#maps').parent().hide();
		$('#maps').hide();
	}
		$('#testo .mw-editsection').remove();
		$('.mw-editsection').remove();
		$('h2').parent('.toctitle').html('<h2>Index</h2>');
		$('li').addClass('list-group-item list-group-item-action');
		$('table').addClass('table');
			
			window.onpopstate =  function() { //questa funzione permette sia di far funzionare la cronologia delle pagina e sia di poter utilizzare gli # link interni alla pagina senza creare conflitti
				var hashSplit = window.location.href.split('#')[1];
				if(popCheck > 0 && (hashSplit ==='Next' || hashSplit === undefined)){
					popCheck--;
					titleClickedResult(backup.pop());
				}		
			}
			
			
		/////////////da qui partono gli script riguardanti la pagina di wikipedia caricata //////////////////////////////////// 
		$(document).scrollTop(0);
		$('li ul').remove(); //rimuove le sottoliste per problemi di visualizzazione risconstrati
		$('div.navbox').fadeOut();//nasconde external link
		$('.reflist').fadeOut();//nasconde references
		$('.plainlinks').next('ul').fadeOut();//nasconde see also
		$('.plainlist').next('ul').fadeOut();//nasconde see also
		$('#See_also').next('ul').fadeOut();
		$('.plainlinks').fadeOut();//nasconde see also
		$('.plainlist').fadeOut();//nasconde see also
		$('.image').each(function(img) {
			$(this).parent().append($(this).children()[0]);
			$(this).remove();
		});
		

		$('#contentP a,#tableP a').on('click', function(e) {//se si clicca su un link chiama ricorsivamente la funzione che apre una nuova pagina wikipedia
			e.preventDefault();
			backup.push(apiResult); //aggiunge gli oggetti jsonp delle pagine in un arrey di oggetti
			window.history.pushState('forward', null, './#Next'); //aggiunge indirizzi fittizzi di pagine alla history
			popCheck ++; //contatore pagine 'lasciate indietro'
			var getTitle = this.title;
			$('#mapRow').remove();
			$('#instaRow').remove();
			instaCheck = false;
			$.ajax({
				url: 'https://en.wikipedia.org/w/api.php?',
				data: {action: 'parse', page: getTitle, prop: 'text|categories', format: 'json'},
				dataType: 'jsonp',
				success: titleClickedResult,	
				error: function() {alert('errore');}
			});		
		});

		
		// TASTO PIN sulla tabella di destra
		$('#pin').click(function(e){
			if (pinned == false) {
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
					'overflow-y':'visible',
					'height': '200vh',
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
			if (showRef == false) {
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
			if (showEl == false) {
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
			if (showSeal == false) {
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




	}
		/////////////FINE degli script riguardanti la pagina di wikipedia caricata //////////////////////////////////// 

		///////////////////////////api Maps inizio //////////////////////////////////////////////////////////////////////////////
	$('#maps').click(function(e){
		e.preventDefault();
		$('#maps').parent().show();
		$('#maps').show();
		if($('.latitude').length){
		if(mapCheck == false) {
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
			var plan = new google.maps.Map(area,{
				zoom: 15,
				center: coordinates,
				mapTypeId: google.maps.MapTypeId.ROADMAP
			});
			
				markers[k] = new google.maps.Marker({
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
		//$('#insta').after('<div class="col-xs-12"><button type="button" class="btn btn-outline-primary" id="skip"><span class="glyphicon glyphicon-chevron-right"></span></div>');
	
		if($(this).attr('id')=='skip'){
			instaCheck = false;
			$('#instaRow').remove();
		}
		if(instaCheck == false){
			instaCheck = true;

			$('#navbarBar').append('<div class="row" id="instaRow"><div id="insta" class="col-xs-12"> </div></div>');
		
			var searchTag = $(title).text();
			searchTag = searchTag.replace(/[^a-z,0-9]+/gi, '');
			console.log(searchTag)
			$('#insta').spectragram('getRecentTagged',{
					query: searchTag,
					wrapEachWith: ''
				})
		}
		else {
			instaCheck = false;
			$('#instaRow').remove();
		}
	})
///////////////////////////api Instagram inizio //////////////////////////////////////////////////////////////////////////////


////////////////////////////////////////////////////////////api Crossref inizio ////////////////////////

	$('#cros').click(function () {
		var searchTag = $(title).text();
		searchTag = searchTag.toLowerCase();

		function crossSuccess (apiResult) {
			var authComplete = false;
			var j = 0;
			var authorFn = [];
			var authorLn = [];
			authorFn[0] = 'unknown';
			authorLn[0] = 'unknown';
			console.log('vivo')
			for(var i=0;i<20;i++){
				var doi = apiResult.message.items[i].DOI;
				var title = apiResult.message.items[i].title[0];
				while(authComplete == false) {
					if(typeof apiResult.message.items[i].author !== 'undefined') {
						if(typeof apiResult.message.items[i].author[j] !== 'undefined'){
							authorFn[j] = apiResult.message.items[i].author[j].given;
							authorLn[j] = apiResult.message.items[i].author[j].family;
							console.log(authorFn[j])
							console.log(authorLn[j])	
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

				authComplete = false;
				$('#navbarBar').append('<div class="row" id="crosRow"><div id="crossRef" class="col-xs-12"></div></div>');
				$('#crossRef').append(
					'<table><tr><td>Title:</td><td>'+title+'</td></tr><tr><td>Doi:</td><td>'+doi+'</td></tr><tr><td>Authors:</td><td>');
				while(j > 0) {
					$('#crossRef').append(authorFn[j-1]+' '+authorLn[j-1]+'<br>');
					j--;
				}
				$('#crossRef').append('</td></tr></table><br>');
			
			}
		}
		
		$.ajax({
			url: 'http://api.crossref.org/works?query='+searchTag+'+french+dessert',
			data: {select: 'DOI,title,author', sort: 'relevance'},
			success: crossSuccess,	
			error: function() {alert('errore');}
		});
	
		
	})





}); //fine document ready


// https://api.instagram.com/v1/tags/rome/media/recent?access_token=6905758419.e029fea.b95cf1b2cf4b4188b5e494fb3ec5a166

