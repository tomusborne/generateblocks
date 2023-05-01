import { useEffect } from '@wordpress/element';
import isBlockVersionLessThan from '../utils/check-block-version';
import wasBlockJustInserted from '../utils/was-block-just-inserted';
import MigrateDimensions from './migrations/migrateDimensions';

export default ( WrappedComponent ) => {
	return ( props ) => {
		const {
			attributes,
			setAttributes,
		} = props;

		const {
			blockVersion,
		} = attributes;

		useEffect( () => {
			// This block used to be static. Set it to dynamic by default from now on.
			if ( 'undefined' === typeof attributes.isDynamic || ! attributes.isDynamic ) {
				setAttributes( { isDynamic: true } );
			}

			// Set our responsive stack and fill options if set on desktop.
			// @since 1.4.0.
			if ( 'undefined' === typeof attributes.blockVersion || attributes.blockVersion < 2 ) {
				if ( attributes.stack || attributes.fillHorizontalSpace ) {
					if ( attributes.stack ) {
						setAttributes( {
							stackTablet: true,
							stackMobile: true,
						} );
					}

					if ( attributes.fillHorizontalSpace ) {
						setAttributes( {
							fillHorizontalSpaceTablet: true,
							fillHorizontalSpaceMobile: true,
						} );
					}
				}
			}
		}, [] );

		// Merge dimensions with their units.
		// @since 1.8.0.
		useEffect( () => {
			if ( ! wasBlockJustInserted( attributes ) && isBlockVersionLessThan( attributes.blockVersion, 3 ) ) {
				const newDimensions = MigrateDimensions( {
					attributesToMigrate: [
						'marginTop',
						'marginRight',
						'marginBottom',
						'marginLeft',
					],
					attributes,
				} );

				if ( Object.keys( newDimensions ).length ) {
					setAttributes( newDimensions );
				}
			}
		}, [] );

		// Update block version flag if it's out of date.
		useEffect( () => {
			// Update block version flag if it's out of date.
			if ( isBlockVersionLessThan( blockVersion, 3 ) ) {
				setAttributes( { blockVersion: 3 } );
			}
		}, [] );

		return ( <WrappedComponent { ...props } /> );
	};
};
