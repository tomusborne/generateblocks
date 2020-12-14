/**
 * Turn hex values to RGBA.
 *
 * @param {string} hex the color hex.
 * @param {number} alpha the alpha number.
 * @return {string} rgba color.
 */
export default function hexToRGBA( hex, alpha ) {
	if ( ! hex ) {
		return '';
	}

	/**
	 * Detect CSS variables in form of var(--color) and get their current
	 * values from the :root selector.
	 */
	if ( hex.indexOf( 'var(' ) > -1 ) {
		let variableName = hex.match('--[a-zA-Z0-9]*')[0]

		hex = window.getComputedStyle( document.documentElement )
			.getPropertyValue( variableName ) || '#fff'

		if ( hex.indexOf( 'rgb' ) > -1) {
			const rgba = hex.replace( /^rgba?\(|\s+|\)$/g, '' ).split( ',' );

			hex = `#${(
				( 1 << 24 ) +
				( parseInt( rgba[ 0 ] ) << 16 ) +
				( parseInt( rgba[ 1 ] ) << 8 ) +
				parseInt( rgba[ 2 ] )
			)
				.toString( 16 )
				.slice( 1 )}`;
		}
	}


	if ( ! alpha && 0 !== alpha ) {
		return hex;
	}

	hex = hex.replace( '#', '' );
	const r = parseInt( hex.length === 3 ? hex.slice( 0, 1 ).repeat( 2 ) : hex.slice( 0, 2 ), 16 );
	const g = parseInt( hex.length === 3 ? hex.slice( 1, 2 ).repeat( 2 ) : hex.slice( 2, 4 ), 16 );
	const b = parseInt( hex.length === 3 ? hex.slice( 2, 3 ).repeat( 2 ) : hex.slice( 4, 6 ), 16 );
	return 'rgba(' + r + ', ' + g + ', ' + b + ', ' + alpha + ')';
}
