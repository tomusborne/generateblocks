import { useDeviceType } from './index';
import { useMemo } from '@wordpress/element';
import isObject from 'lodash/isObject';

/**
 * List of attributes that are device related.
 *
 * @type {string[]}
 */
const attributesWithDevice = [
	'flexGrow',
	'flexShrink',
	'flexBasis',
	'order',
	'iconLocation',
	'display',
	'flexDirection',
	'flexWrap',
	'alignItems',
	'justifyContent',
	'columnGap',
	'rowGap',
	'position',
	'overflowX',
	'overflowY',
	'zindex',
	'marginTop',
	'marginRight',
	'marginBottom',
	'marginLeft',
	'paddingTop',
	'paddingRight',
	'paddingBottom',
	'paddingLeft',
	'borderSizeTop',
	'borderSizeRight',
	'borderSizeBottom',
	'borderSizeLeft',
	'borderRadiusTopRight',
	'borderRadiusBottomRight',
	'borderRadiusBottomLeft',
	'borderRadiusTopLeft',
	'inlineWidth',
	'stack',
	'fillHorizontalSpace',
	'alignment',
	'textAlign',
	'fontSize',
	'lineHeight',
	'letterSpacing',
	'width',
	'height',
	'minHeight',
	'maxHeight',
	'minWidth',
	'maxWidth',
	'verticalAlignment',
	'removeVerticalGap',
	'horizontalGap',
	'verticalGap',
	'verticalAlignment',
	'horizontalAlignment',
];

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
			}

			if ( isObject( value ) ) {
				const valueDeviceKeys = splitAttributes( value );

				deviceKeys.desktop[ key ] = valueDeviceKeys.desktop;
				deviceKeys.tablet[ key ] = valueDeviceKeys.tablet;
				deviceKeys.mobile[ key ] = valueDeviceKeys.mobile;
			} else {
				deviceKeys.desktop[ key ] = value;

				if ( ! attributesWithDevice.includes( key ) ) {
					deviceKeys.tablet[ key ] = value;
					deviceKeys.mobile[ key ] = value;
				}
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
		if ( attributesWithDevice.includes( key ) ) {
			result[ key + device ] = value;
			return result;
		}

		if ( isObject( value ) ) {
			result[ key ] = addDeviceToAttributes( value, device );
		} else {
			result[ key ] = value;
		}

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
	const deviceName = 'Desktop' !== device
		? device
		: '';

	const deviceAttributes = useMemo( () => (
		splitAttributes( attributes )
	), [ JSON.stringify( attributes ) ] );

	const setDeviceAttributes = useMemo( () => ( attrs = {}, objName = '' ) => {
		if ( objName ) {
			setAttributes( {
				[ objName ]: {
					...attributes[ objName ],
					...addDeviceToAttributes( attrs, deviceName ),
				},
			} );

			return;
		}

		setAttributes( addDeviceToAttributes( attrs, deviceName ) );
	}, [ deviceName, setAttributes, JSON.stringify( attributes ) ] );

	const activeDevice = device.toLowerCase();

	return [ deviceAttributes[ activeDevice ], setDeviceAttributes ];
}
