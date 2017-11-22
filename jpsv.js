$(document).ready(function (){
//window.onload = function(){
	var pageId = localStorage.getItem("pagId");
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
		$('#testo').html('<p>'+str+'</p>');
		$('#testo .mw-editsection').remove();
		$('.mw-editsection').remove();
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
	}
});

