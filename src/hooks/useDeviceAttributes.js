import { useDeviceType } from './index';
import { useMemo } from '@wordpress/element';

export default function useDeviceAttributes( attributes, setAttributes ) {
	const [ device ] = useDeviceType();

	const deviceAttributes = useMemo( () => (
		Object
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
			}, { desktop: {}, tablet: {}, mobile: {} } )
	), [ JSON.stringify( attributes ) ] );

	const tabletSetAttributes = useMemo( () => ( attrs = {} ) => {
		const tabletAttrs = Object.entries( attrs ).reduce( ( result, [ key, value ] ) => {
			result[ key + 'Tablet' ] = value;

			return result;
		}, {} );

		setAttributes( tabletAttrs );
	}, [ setAttributes ] );

	const mobileSetAttributes = useMemo( () => ( attrs = {} ) => {
		const mobileAttrs = Object.entries( attrs ).reduce( ( result, [ key, value ] ) => {
			result[ key + 'Mobile' ] = value;

			return result;
		}, {} );

		setAttributes( mobileAttrs );
	}, [ setAttributes ] );

	const deviceSetAttributes = {
		desktop: setAttributes,
		tablet: tabletSetAttributes,
		mobile: mobileSetAttributes,
	};

	const activeDevice = device.toLowerCase();

	return [ deviceAttributes[ activeDevice ], deviceSetAttributes[ activeDevice ] ];
}

