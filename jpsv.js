$(document).ready(function (){

	var wApi = localStorage.getItem("wApi");
	var wikiApi = JSON.parse(wApi);
	var pinned = false;
	var showRef = true;
	var showEl = true;
	var i = 0;
	//$('#prova').empty();
	console.log(wikiApi['query']);
	for (var pageId in wikiApi.query.pages){
		if (wikiApi.query.pages.hasOwnProperty(pageId)) {
			pid[i] = wikiApi.query.pages[pageId].pageid;
			i++;
			$('#prova').append('<div><h3><a href="visual.html" id="'+wikiApi.query.pages[pageId].pageid+'" class="resultList">'+ wikiApi.query.pages[pageId].title +'</a></h3><p>' +
			wikiApi.query.pages[pageId].extract + '</p></div>');
			console.log(wikiApi.query.pages[pageId].pageid);
		};
	};
	$('#prova').on('click','.resultList', function(e) {
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
		$('.row').html('<div id ="index" class="col-xs-3 sidebar-outer"></div><div id="contentP" class="col-xs-5">'+str+'</div><div id="tableP"class="col-xs-4"></div>');
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
		$('li ul').remove();
		$('div.navbox').fadeOut();
		$('.reflist').fadeOut();
		$('#testo a').on('click', function(e) {
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
		//////////////////////////////////////////////////////////
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
		////////////////////////////////////////////////////////////
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
		/*$('#toc a').click(function(e){
			e.preventDefault();
			/*var url = window.location.href;
			var value = url.substring(0, url.lastIndexOf('/') + 1);
			window.history.replaceState("blog", "Blog", value );
			var value = this.href;
			window.history.replaceState("blog", "Blog", value);
		});*/
	}
});

