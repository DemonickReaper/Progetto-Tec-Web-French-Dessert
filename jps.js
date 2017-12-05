  $(document).ready(function(){
		pid = new Array(50);
		$('#search').bind('startSearch',function(e) {//chiamata a wikipedia per ottenere un elenco di pagine inerenti alla chiave "searchTerm"
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
	
		function queryResult(apiResult){//carica l'elenco dei risultati sul nostro sito, IGNORARE LE ZONE COMMENTATE SOTTOSTANTI, sono vecchie versioni o righe per dei test
			var wikiApi = JSON.stringify(apiResult);
			localStorage.setItem("wApi",wikiApi);
			window.location.href = "visual.html";
			/*$('#prova').empty();
			var i=0;
			for (var pageId in apiResult.query.pages){
				if (apiResult.query.pages.hasOwnProperty(pageId)) {
					pid[i] = apiResult.query.pages[pageId].pageid;
					i++;
					$('#prova').append('<div><h3><a href="visual.html" id="'+apiResult.query.pages[pageId].pageid+'" class="resultList">'+ apiResult.query.pages[pageId].title +'</a></h3><p>' +
					apiResult.query.pages[pageId].extract + '</p></div>');
				};
			};*/
			
	}
	
	

	/*	$('#prova').on('click','.resultList', function() { //chiamata a wikipedia per ottenere il contenuto della pagina selezionata tramite"pageid"	
		var getId = this.id;
		localStorage.setItem("pagId",getId);	
		});*/
	});	



//Lavori in corso, chiamate utili e vari esperimenti, in sostanza é da ignorare tutto il commentato qui sotto
	
/*	&generator=search&gsrsearch=dog&format=jsonfm&prop=extracts&prop=info&inprop=url
 
 &list=search&srsearch=dog&format=jsonfm

https://en.wikipedia.org/w/api.php?action=query&generator=search&gsrsearch=dog&format=jsonfm&inprop=url&utf8=1&prop=extracts|info&exintro=1&exlimit=20&exchars=300


for (var i = 0; i < apiResult.query.search.length; i++){
			$('#prova').append('<h3><a href="'+apiResult.query.search">'+apiResult.query.search[i].title
			+'</a></h3><p>'+apiResult.query.search[i].snippet+'</p>');
	
		}

https://en.wikipedia.org/w/api.php?action=parse&pageid=3334943&prop=text 

magnet link esempeio

<sup id=\"cite_ref-micro.magnet.fsu.edu_1-1\" class=\"reference\"><a href=\"#cite_note-micro.magnet.fsu.edu-1\">[1]</a></sup>

*/