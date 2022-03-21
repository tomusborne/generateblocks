function objectsEqual( o1, o2 ) {
	return Object.keys( o1 ).length === Object.keys( o2 ).length && Object.keys( o1 ).every( ( p ) => o1[ p ] === o2[ p ] );
}

function compareAttributes( prevAttributes, nextAttributes ) {
	return Object.keys( prevAttributes ).every( ( key ) => {
		if (
			Array.isArray( prevAttributes[ key ] ) &&
			'object' === typeof prevAttributes[ key ][ 0 ] &&
			Array.isArray( nextAttributes[ key ] ) &&
			'object' === typeof nextAttributes[ key ][ 0 ]
		) {
			return objectsEqual( prevAttributes[ key ][ 0 ], nextAttributes[ key ][ 0 ] );
		} else if ( Array.isArray( prevAttributes[ key ] ) ) {
			return prevAttributes[ key ].length === nextAttributes[ key ].length;
		}

		return prevAttributes[ key ] === nextAttributes[ key ];
	} );
}

export default function shouldRebuildCSS( prevProps, nextProps ) {
	return (
		prevProps.deviceType === nextProps.deviceType &&
		prevProps.clientId === nextProps.clientId &&
		compareAttributes( prevProps.attributes, nextProps.attributes )
	);
}
