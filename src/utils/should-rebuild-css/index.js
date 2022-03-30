const objectsEqual = ( o1, o2 ) =>
	'object' === typeof o1 && Object.keys( o1 ).length > 0
		? Object.keys( o1 ).length === Object.keys( o2 ).length && Object.keys( o1 ).every( ( p ) => objectsEqual( o1[ p ], o2[ p ] ) )
		: o1 === o2;

const arraysEqual = ( a1, a2 ) => a1.length === a2.length && a1.every( ( o, idx ) => objectsEqual( o, a2[ idx ] ) );

function compareAttributes( prevAttributes, nextAttributes ) {
	return Object.keys( prevAttributes ).every( ( key ) => {
		if ( Array.isArray( prevAttributes[ key ] ) ) {
			return arraysEqual( prevAttributes[ key ], nextAttributes[ key ] );
		} else if ( 'object' === typeof prevAttributes[ key ] ) {
			return objectsEqual( prevAttributes[ key ], nextAttributes[ key ] );
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
