$(document).ready(function (){
//window.onload = function(){
	var pageId = localStorage.getItem("pagId");
	var pinned = false;
	var showRef = true;
	var showEl = true;
	$.ajax({
						url: 'https://en.wikipedia.org/w/api.php?',
						data: {action: 'parse', pageid: pageId, prop: 'text', format: 'json'},
						dataType: 'jsonp',
						success: titleClickedResult,	
						error: function() {alert('errore');}
				
					});	
//		};
	function titleClickedResult (apiResult) { //carica il contenuto della pagina wikipedia sul nostro sito
		var str = apiResult.parse['text']['*'];
		var title = apiResult.parse.title;
		$('#pageTitle').html(title);
		$('#testo').html('<div class="row"><div id="contentP" class="col-md-8">'+str+'</div><div id="tableP"class="col-md-4"></div></div>');
		$('#tableP').append('<button id="pin" type="button" class ="btn btn-primary">Pin</button>');
		$('#tableP').append($('table[class~="infobox"]')[0]);
		$('#testo .mw-editsection').remove();
		$('.mw-editsection').remove();
		//$('ul').addClass('list-group-item list-group-item-action');
		$('li').addClass('list-group-item list-group-item-action');
		$('table').addClass('table');
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
	}
});

