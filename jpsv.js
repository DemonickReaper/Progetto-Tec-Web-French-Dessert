$(document).ready(function (){
			
	var pinned = false;
	var showRef = true;
	var showEl = true;
	var showSeal = true;
	var findCate = false;
	var popb = false;


	var popCheck = 0;

	var i = 0;
	var j = 0;
	var iii = 0;
	var popback = 0;
	var backup = new Array();
	var ann = new Annotator(document.body);
	var firstTime = true; //conrollo necessario a capire se si proviene dalla homepage o meno
	
	if(firstTime==true) {
		firstTime = false;
		queryResult(undefined);
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
		if(apiResult!==undefined){
			var wikiApi = JSON.stringify(apiResult);
			localStorage.setItem("wApi",wikiApi);
		}
		var wApi = localStorage.getItem("wApi");//recupero i dati della query fatti sul altra pagina
		var wikiApi = JSON.parse(wApi); // converto i dati recuperati (stringa) in un oggetto json 

		for (var pageId in wikiApi.query.pages){ //stampa la lista dei risultati della ricerca
			if (wikiApi.query.pages.hasOwnProperty(pageId)) {
				$('#tableList').append('<tr class="blockList"><td class="col-xs-4"><h3><a href="visual.html" id="'+
				wikiApi.query.pages[pageId].pageid+'" class="resultList">'+ wikiApi.query.pages[pageId].title +
				'</a></h3></td><td class="col-xs-8"><p>' +
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
		var str = apiResult.parse['text']['*'];
		var title = apiResult.parse.title;

		$('#titleBar').html(title);
		j = 0;
		findCate = false;
		for(var cate  in apiResult.parse.categories){
			cate = apiResult.parse.categories[j]['*'];
			j++;
			if (cate =='French_desserts' ||cate == 'French_confectionery'||cate == 'French_pastries') { //se la pagina appartiene al nostro tag
				$('#titleBar').css({"color":"pink"});
				$('body').css({"font-family":"georgia"});
				findCate = true;
			}	
		}
		if(findCate == false) { //se la pagina non appartiene al nostro tag
			$('#titleBar').css({"color":"white"});
			$('body').css({"font-family":"verdana"});
		}
		
		if($(str).find('table[class~="infobox"]').length > 0){
		$('#wikiPage').html('<div id ="index" class="col-xs-2 sidebar-outer"></div><div id="contentP" class="col-xs-7">'+
		str+'</div><div id="tableP"class="col-xs-3"></div>');
		$('#tableP').append('<button id="pin" type="button" class ="btn btn-primary">Pin</button>');
		$('#tableP').append($('table[class~="infobox"]')[0]);
		}
	
		else {
			$('#wikiPage').html('<div id ="index" class="col-xs-2 sidebar-outer"></div><div id="contentP" class="col-xs-10">'+
			str+'</div>');
		}
		$('#index').append($('#toc'));
		$('#index').append('<button id="tocButton" type="button" class ="btn btn-outline-primary"><a href="#titleBar"><span id="arrown" class="glyphicon glyphicon-chevron-up"></span><a></button>');
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
					'height': '88vh',
					'margin-left':'75%'
				});
				pinned = true;
				$('#pin').html('UnPin');
			}
			else {
				$('#tableP').css({
					'position':'static',				
					'overflow-y':'visible',
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
});

