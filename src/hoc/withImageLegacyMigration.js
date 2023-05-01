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

		// Merge dimensions with their units.
		// @since 1.8.0.
		useEffect( () => {
			if ( ! wasBlockJustInserted( attributes ) && isBlockVersionLessThan( attributes.blockVersion, 2 ) ) {
				const newDimensions = MigrateDimensions( {
					attributesToMigrate: [
						'paddingTop',
						'paddingRight',
						'paddingBottom',
						'paddingLeft',
						'marginTop',
						'marginRight',
						'marginBottom',
						'marginLeft',
						'borderSizeTop',
						'borderSizeRight',
						'borderSizeBottom',
						'borderSizeLeft',
						'borderRadiusTopRight',
						'borderRadiusBottomRight',
						'borderRadiusBottomLeft',
						'borderRadiusTopLeft',
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
			if ( isBlockVersionLessThan( blockVersion, 2 ) ) {
				setAttributes( { blockVersion: 2 } );
			}
		}, [] );

		return ( <WrappedComponent { ...props } /> );
	};
};
