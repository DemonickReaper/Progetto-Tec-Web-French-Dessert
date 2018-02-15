  $(document).ready(function(){
		pid = new Array(50);
		var pageId;

		$('#search').bind('startSearch',function(e) {//chiamata a wikipedia per ottenere un elenco di pagine inerenti alla chiave "searchTerm"
		e.preventDefault();
		var searchTerm = $('#searchTerm').val();
			$.ajax({
				url: 'http://en.wikipedia.org/w/api.php',
				type:'GET',
				async: 'true',
                data: { action: 'query', generator: 'search', gsrsearch: searchTerm, format: 'json',gsrlimit: '20',prop: 'info|extracts',inprop: 'url',exintro: '1', exlimit: '20', exchars: '300' },
                dataType: 'jsonp',
				success: queryResult,
				error: queryError
            });
		});
		
		$('.linkList').bind('startLoad',function(e) {//chiamata a wikipedia per ottenere la pagina del dolce cliccato sulla homepage
			e.preventDefault();
			$.ajax({
				url: 'https://en.wikipedia.org/w/api.php?',
				data: {action: 'parse', pageid: pageId, prop: 'text|categories', format: 'json'},
				dataType: 'jsonp',
				success: queryResult,	
				error: function() {alert('Error to load this sweet');}
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
	
		$('.linkList').click(function(e){ //avvia la ricerca se premuto il tasto con il dolce
			e.preventDefault();
			pageId = $(this).attr('href');
			$('.linkList').trigger('startLoad');
		});

		function queryResult(apiResult){//carica l'elenco dei risultati sul nostro sito
			var wikiApi = JSON.stringify(apiResult);
			localStorage.setItem("wApi",wikiApi);
			window.location.href = "visual.php";
	}
		function queryError(){ 
			var wikiApi = '';
			localStorage.setItem("wApi",wikiApi);
			window.location.href = "visual.php";
		}
	}); //fine document ready	
