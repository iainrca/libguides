var chatbox = 'twitter';

$(document).ready(function() {
	
	$('#promodupe').html( $('#promo').html( ) );
	
	$('#summon form input[type=radio][name=limit]').change(function() {
		updateHiddenFacet( );
	});

	updateOpeningHours('init');
	updateLibraryNews( );
	updateHiddenFacet( );
//	updateCarousel( );
	$('#myCarousel .carousel').carousel({ interval: 10000 });

	setTimeout(function() { 
		console.log('MYREADING = '+myReading);
		if( myReading == 1 ) {
			$('#summon form').append('<input type="hidden" name="myreading" value="1">');
		}
	}, 2000);
	
});



function updateHiddenFacet( ) {
	var limit = $('#summon form input[name=limit]:checked').val( );
	if( limit == 'books' )			{ $('#facetfield').html('<input type="hidden" name="fvf" value="ContentType,Book / eBook,f" />'); }
	else if( limit == 'articles' )	{ $('#facetfield').html('<input type="hidden" name="fvf" value="ContentType,Journal Article,f" />'); }
	else							{ $('#facetfield').html(''); }
}


function updateOpeningHours( action ) {
	console.log('updateOpeningHours: '+action);
	setTimeout(function() { updateOpeningHours('refresh'); }, 600000);

	$.ajax({
		url: '/files/webpages/openinghours.json',
		cache: false,
		type: 'GET',
		dataType: 'json',
		success: function(data) {
			if( !libraryClosed ) {
				$('#openinghours1').html(data.line1);
				$('#openinghours2').html(data.line2);
				$('#openinghours3').html(data.line3);
				if( data.colour == 'red' ) {
					$('#openinghours1').addClass('libraryclosed');
					$('#openinghours2').addClass('libraryclosed');
				}
				else {
					$('#openinghours1').addClass('libraryopen');
					$('#openinghours2').addClass('libraryopen');
				}
			}
			if( action == 'init' ) {
// DISABLED DURING COVID19
//				if( data.currentCode != 'ST' && screenWidth > 459 ) { chatbox = 'oclc'; }
//				if( data.box == 'oclc' && screenWidth > 459 )       { chatbox = 'oclc'; }
				updateChatbox( chatbox );
			}
		},
		error: function (textStatus, errorThrown) {
			console.log('error fetching opening hours');
			if( action == 'init' ) { updateChatbox( chatbox ); }
		}
	});
}


function updateChatbox( type ) {
	console.log('updating chatbox to '+chatbox);
	$('#chatbox').html('<a class="twitter-timeline" data-height="400" data-link-color="#0d5de8" href="https://twitter.com/hudlib?ref_src=twsrc%5Etfw">Tweets by hudlib</a> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>');
	
//	if( type == 'twitter' ) {
//		$('#chatbox').html('<a class="twitter-timeline" data-height="400" data-link-color="#0d5de8" href="https://twitter.com/hudlib?ref_src=twsrc%5Etfw">Tweets by hudlib</a> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>');
//	}
//	if( type == 'oclc' ) {
//		$('#chatbox').html('<div class="qpchatwidget"></div>');
//		$('.qpchatwidget').attr('qwidgetno','1');
//		$('head').append('<script id="qp.bootstrap" qwidgetno="1" type="text/javascript" src="https://www.questionpoint.org/crs/js/qwidget/qp.bootstrap.js?langcode=1&amp;instid=10714&amp;skin=blue&amp;size=fill" charset="utf-8"></script>');
//	}
}


function updateLibraryNews( ) {
	$.ajax({
		url: '/files/webpages/librarynews.json',
		cache: false,
		type: 'GET',
		dataType: 'json',
		success: function(data) {
			var newsHTML1 = '...';
			var newsHTML2 = '...';
			if( data.news.length ) {
				newsHTML1 = '';
				newsHTML2 = '';
				for (var n in data.news) {
					newsHTML1 += '<li><a class="openblank" href="'+data.news[n].url+'" data-toggle="popovernews" data-content="'+data.news[n].extract+'">'+data.news[n].title+'</a>';
					newsHTML2 += '<li><a class="openblank" href="'+data.news[n].url+'" title"'+data.news[n].extract+'">'+data.news[n].title+'</a>';
				}
				newsHTML1 += '<li><a class="openblank" href="https://library.hud.ac.uk/blogs/er/">...more news</a></li>';
				newsHTML2 += '<li><a class="openblank" href="https://library.hud.ac.uk/blogs/er/">...more news</a></li>';
			}
			else {
				newsHTML1 = '<li><a class="openblank" href="https://library.hud.ac.uk/blogs/er/">Library E-Resources Blog</a></li>';
				newsHTML2 = '<li><a class="openblank" href="https://library.hud.ac.uk/blogs/er/">Library E-Resources Blog</a></li>';
			}
			$('ul#librarynews1').html(newsHTML1);
			$('ul#librarynews2').html(newsHTML2);
			$('[data-toggle="popovernews"]').popover( { trigger:'hover', placement:'right' } );
			console.log('updating library news');
		},
		error: function (textStatus, errorThrown) {
			console.log('error fetching library news');
		}
	});
}

function updateCarousel( ) {
console.log('updateCarousel( )');
	$.ajax({
		url: '/files/webpages/carousel.json',
		cache: false,
		type: 'GET',
		dataType: 'json',
		success: function(data) {
			$('#myCarousel').html(data.html);
			setTimeout(function(){
				$('#myCarousel .carousel').carousel({ interval: 10000 });
			}, 300);
		},
		error: function (textStatus, errorThrown) {
			console.log('error fetching library news');
		}
	});
}
