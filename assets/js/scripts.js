jQuery( document ).ready( function( $ ) {
	$( '#generateblocks-regenerate-css-files-button' ).on( 'click', function( event ) {
		event.preventDefault();
		var $thisButton = $( this );

		$thisButton.removeClass( 'success' ).addClass( 'loading' );

		$.post( ajaxurl, {
			action: 'generateblocks_regenerate_css_files',
			_nonce: $thisButton.data( 'nonce' ),
		} ).done( function() {
			$thisButton.removeClass( 'loading' ).addClass( 'success' );
		} );
	} );
} );
