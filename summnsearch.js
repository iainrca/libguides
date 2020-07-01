$(document).ready(function() {
	
	$('#promodupe').html( $('#promo').html( ) );
	
	$('#summon form input[type=radio][name=limit]').change(function() {
		updateHiddenFacet( );
	});

	updateHiddenFacet( );


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
