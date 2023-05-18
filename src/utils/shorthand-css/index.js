import isNumeric from '../is-numeric';

function value( num, unit ) {
	return isNumeric( num ) && unit
		? parseFloat( num ) + unit
		: num;
}

export default function shorthandCSS( top, right, bottom, left, unit ) {
	if ( '' === top && '' === right && '' === bottom && '' === left ) {
		return;
	}

	top = ( top != 0 && '' !== top ) ? value( top, unit ) + ' ' : '0 '; // eslint-disable-line eqeqeq
	right = ( right != 0 && '' !== right ) ? value( right, unit ) + ' ' : '0 '; // eslint-disable-line eqeqeq
	bottom = ( bottom != 0 && '' !== bottom ) ? value( bottom, unit ) + ' ' : '0 '; // eslint-disable-line eqeqeq
	left = ( left != 0 && '' !== left ) ? value( left, unit ) + ' ' : '0 '; // eslint-disable-line eqeqeq

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
