import { isEqual } from 'lodash';

function compareAttributes( prevAttributes, nextAttributes ) {
	return Object.keys( prevAttributes ).every( ( key ) => {
		return isEqual( prevAttributes[ key ], nextAttributes[ key ] );
	} );
}

export default function shouldRebuildCSS( prevProps, nextProps ) {
	return (
		prevProps.deviceType === nextProps.deviceType &&
		prevProps.clientId === nextProps.clientId &&
		compareAttributes( prevProps.attributes, nextProps.attributes )
	);
}
