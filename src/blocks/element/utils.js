export const convertInlineStyleStringToObject = ( styleString ) => {
	return styleString.split( ';' ).reduce( ( acc, style ) => {
		const [ key, value ] = style.split( ':' ).map( ( s ) => s.trim() );

		if ( key && value ) {
			const camelCaseKey = key.replace( /-([a-z])/g, ( g ) => g[ 1 ].toUpperCase() );
			acc[ camelCaseKey ] = value;
		}

		return acc;
	}, {} );
};
