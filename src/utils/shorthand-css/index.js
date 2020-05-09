export default function shorthandCSS( top, right, bottom, left, unit ) {
	if ( '' === top && '' === right && '' === bottom && '' === left ) {
		return;
	}

	top = ( parseFloat( top ) != 0 && '' !== top ) ? parseFloat( top ) + unit + ' ' : '0 '; // eslint-disable-line eqeqeq
	right = ( parseFloat( right ) != 0 && '' !== right ) ? parseFloat( right ) + unit + ' ' : '0 '; // eslint-disable-line eqeqeq
	bottom = ( parseFloat( bottom ) != 0 && '' !== bottom ) ? parseFloat( bottom ) + unit + ' ' : '0 '; // eslint-disable-line eqeqeq
	left = ( parseFloat( left ) != 0 && '' !== left ) ? parseFloat( left ) + unit + ' ' : '0 '; // eslint-disable-line eqeqeq

	if ( right === left ) {
		left = '';

		if ( top === bottom ) {
			bottom = '';

			if ( top === right ) {
				right = '';
			}
		}
	}

	const output = top + right + bottom + left;

	return output.trim();
}
