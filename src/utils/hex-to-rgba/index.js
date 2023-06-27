import { colord } from 'colord';

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

	return colord( hex ).alpha( alpha ).toRgbString();
}
