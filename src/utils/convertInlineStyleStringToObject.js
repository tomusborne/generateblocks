export function convertInlineStyleStringToObject( styleString ) {
	return styleString.split( ';' ).reduce( ( acc, style ) => {
		const colonIndex = style.indexOf( ':' );
		if ( colonIndex === -1 ) {
			return acc;
		} // Skip if there's no colon

		let key = style.slice( 0, colonIndex ).trim();
		const value = style.slice( colonIndex + 1 ).trim();

		if ( key && value ) {
			if ( key.startsWith( '--' ) ) {
				// It's a CSS custom property, keep the original format
				acc[ key ] = value;
			} else {
				// For regular CSS properties, convert to camelCase
				key = key.replace( /-([a-z])/g, ( g ) => g[ 1 ].toUpperCase() );
				acc[ key ] = value;
			}
		}

		return acc;
	}, {} );
}
