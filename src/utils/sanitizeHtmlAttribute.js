export const sanitizeHtmlAttribute = ( value ) => {
	if ( null === value || undefined === value ) {
		return '';
	}

	let stringValue = '';

	if ( 'object' === typeof value ) {
		try {
			stringValue = JSON.stringify( value );
		} catch ( e ) {
			return '';
		}
	} else {
		stringValue = String( value );
	}

	// Replace characters like &, <, >, " with their HTML entity equivalents
	return stringValue
		.replace( /&/g, '&amp;' )
		.replace( /</g, '&lt;' )
		.replace( />/g, '&gt;' )
		.replace( /"/g, '&quot;' )
		.replace( /'/g, '&#039;' );
};
