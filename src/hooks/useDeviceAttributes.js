import { useDeviceType } from './index';
import { useMemo } from '@wordpress/element';

/**
 * Given an object of attributes will split by device.
 *
 * @param {Object} attributes The block attributes.
 *
 * @return {{tablet: {}, desktop: {}, mobile: {}}} The device attributes.
 */
export function splitAttributes( attributes ) {
	return Object
		.entries( attributes )
		.reduce( ( deviceKeys, [ key, value ] ) => {
			if ( key.includes( 'Tablet' ) ) {
				deviceKeys.tablet[ key.replace( 'Tablet', '' ) ] = value;
			} else if ( key.includes( 'Mobile' ) ) {
				deviceKeys.mobile[ key.replace( 'Mobile', '' ) ] = value;
			} else {
				deviceKeys.desktop[ key ] = value;
			}

			return deviceKeys;
		}, { desktop: {}, tablet: {}, mobile: {} } );
}

/**
 * Given an object of attributes it will add the device suffix.
 *
 * @param {Object} attrs  The device attributes.
 * @param {string} device The device name, capitalized.
 *
 * @return {Object} The block attributes.
 */
export function addDeviceToAttributes( attrs, device = 'Tablet' ) {
	return Object.entries( attrs ).reduce( ( result, [ key, value ] ) => {
		result[ key + device ] = value;

		return result;
	}, {} );
}

/**
 * Hook to handle device attributes and setAttributes.
 *
 * @param {Object}   attributes    The block attributes.
 * @param {Function} setAttributes The block setAttributes function.
 *
 * @return {Array} The device attributes and set function.
 */
export default function useDeviceAttributes( attributes, setAttributes ) {
	const [ device ] = useDeviceType();

	const deviceAttributes = useMemo( () => (
		splitAttributes( attributes )
	), [ JSON.stringify( attributes ) ] );

	const tabletSetAttributes = useMemo( () => ( attrs = {} ) => {
		setAttributes( addDeviceToAttributes( attrs, 'Tablet' ) );
	}, [ setAttributes ] );

	const mobileSetAttributes = useMemo( () => ( attrs = {} ) => {
		setAttributes( addDeviceToAttributes( attrs, 'Mobile' ) );
	}, [ setAttributes ] );

	const deviceSetAttributes = {
		desktop: setAttributes,
		tablet: tabletSetAttributes,
		mobile: mobileSetAttributes,
	};

	const activeDevice = device.toLowerCase();

	return [ deviceAttributes[ activeDevice ], deviceSetAttributes[ activeDevice ] ];
}

