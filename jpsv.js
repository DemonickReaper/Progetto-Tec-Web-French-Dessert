$(document).ready(function (){
	
	var wApi = localStorage.getItem("wApi"); //recupero i dati della query fatti sul altra pagina
	var wikiApi = JSON.parse(wApi);			// converto i dati recuperati (stringa) in un oggetto json 
	var pinned = false;
	var showRef = true;
	var showEl = true;
	var i = 0;
	//pid = new Array(50);
	var ann = new Annotator(document.body);

	for (var pageId in wikiApi.query.pages){ //stampa la lista dei risultati della ricerca
		if (wikiApi.query.pages.hasOwnProperty(pageId)) {
			//pid[i] = wikiApi.query.pages[pageId].pageid;
			//i++;
			$('#tableList').append('<tr class="blockList"><td class="col-xs-4"><h3><a href="visual.html" id="'+
			wikiApi.query.pages[pageId].pageid+'" class="resultList">'+ wikiApi.query.pages[pageId].title +
			'</a></h3></td><td class="col-xs-8"><p>' +
			wikiApi.query.pages[pageId].extract + '</p></td></tr></div>');
		};
	};

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
		var wikiApi = JSON.stringify(apiResult);
		localStorage.setItem("wApi",wikiApi);
		window.location.href = "visual.html";	
}

	$('#tableList').on('click','.resultList', function(e) {//quando si clicca su un risultato avvia la chiamata per ottenre la pagina
		e.preventDefault();
		pageId = this.id;
		$.ajax({
						url: 'https://en.wikipedia.org/w/api.php?',
						data: {action: 'parse', pageid: pageId, prop: 'text', format: 'json'},
						dataType: 'jsonp',
						success: titleClickedResult,	
						error: function() {alert('errore');}
				
		});
	});	

	function titleClickedResult (apiResult) { //carica il contenuto della pagina wikipedia sul nostro sito
		var str = apiResult.parse['text']['*'];
		var title = apiResult.parse.title;
		$('#pageTitle').html(title);
		$('.row').html('<div id ="index" class="col-xs-3 sidebar-outer"></div><div id="contentP" class="col-xs-5">'+
		str+'</div><div id="tableP"class="col-xs-4"></div>');
		$('#tableP').append('<button id="pin" type="button" class ="btn btn-primary">Pin</button>');
		$('#tableP').append($('table[class~="infobox"]')[0]);
		$('#index').append($('#toc'));
		$('#testo .mw-editsection').remove();
		$('.mw-editsection').remove();
		//$('ul').addClass('list-group-item list-group-item-action');
		$('li').addClass('list-group-item list-group-item-action');
		$('table').addClass('table');
		$('#toc a').click(function(e){//cosi va, non so cosa faccia ma va bene così
			if ( window.history.replaceState ) {
				var url = window.location.href;
				var value = url.substring(0, url.lastIndexOf('/') + 1);
				window.history.pushState("blog", "Blog", value );
		  	}
		});
		/////////////da qui partono gli script riguardanti la pagina di wikipedia caricata //////////////////////////////////// 
		$('li ul').remove(); //rimuove le sottoliste per problemi di visualizzazione risconstrati
		$('div.navbox').fadeOut();//nasconde
		$('.reflist').fadeOut();
		$('.image').each(function(img) {
			$(this).parent().append($(this).children()[0]);
			$(this).remove();
		});
		
		$('#testo a').on('click', function(e) {//se si clicca su un link chiama ricorsivamente la funzione che apre una nuova pagina wikipedia
			e.preventDefault();
			var getTitle = this.title;
			$.ajax({
				url: 'https://en.wikipedia.org/w/api.php?',
				data: {action: 'parse', page: getTitle, prop: 'text', format: 'json'},
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
					'height': '88vh'
				});
				pinned = true;
				$('#pin').html('UnPin');
			}
			else {
				$('#tableP').css({
					'position':'absolute',				
					'overflow-y':'visible',
					'height': '100vh'
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
	}
		/////////////FINE degli script riguardanti la pagina di wikipedia caricata //////////////////////////////////// 
});

