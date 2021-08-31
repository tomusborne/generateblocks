/**
 * Turn hex values to RGBA.
 *
 * @param {string} hex   the color hex.
 * @param {number} alpha the alpha number.
 * @return {string} rgba color.
 */
export default function hexToRGBA( hex, alpha ) {
	if ( ! hex ) {
		return '';
	}

	if ( ! alpha && 0 !== alpha ) {
		return hex;
	}

	if ( 1 === alpha || ! hex.startsWith( '#' ) ) {
		return hex;
	}

	hex = hex.replace( '#', '' );
	const r = parseInt( hex.length === 3 ? hex.slice( 0, 1 ).repeat( 2 ) : hex.slice( 0, 2 ), 16 );
	const g = parseInt( hex.length === 3 ? hex.slice( 1, 2 ).repeat( 2 ) : hex.slice( 2, 4 ), 16 );
	const b = parseInt( hex.length === 3 ? hex.slice( 2, 3 ).repeat( 2 ) : hex.slice( 4, 6 ), 16 );
	return 'rgba(' + r + ', ' + g + ', ' + b + ', ' + alpha + ')';
}
