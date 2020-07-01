function updateHiddenFacet( ) {
	var limit = $('#summon form input[name=limit]:checked').val( );
	if( limit == 'books' )			{ $('#facetfield').html('<input type="hidden" name="fvf" value="ContentType,Book / eBook,f" />'); }
	else if( limit == 'articles' )	{ $('#facetfield').html('<input type="hidden" name="fvf" value="ContentType,Journal Article,f" />'); }
	else							{ $('#facetfield').html(''); }
}