import { useEffect } from '@wordpress/element';
import wasBlockJustInserted from '../utils/was-block-just-inserted';
import isBlockVersionLessThan from '../utils/check-block-version';
import hasNumericValue from '../utils/has-numeric-value';

export default ( WrappedComponent ) => {
	return ( props ) => {
		const {
			attributes,
			setAttributes,
		} = props;

		useEffect( () => {
			if ( ! attributes.isDynamic ) {
				setAttributes( { isDynamic: true } );
			}

			// Set our old defaults as static values.
			// @since 1.4.0.
			if ( ! wasBlockJustInserted( attributes ) && isBlockVersionLessThan( attributes.blockVersion, 2 ) ) {
				const legacyDefaults = generateBlocksLegacyDefaults.v_1_4_0.gridContainer;

				const newAttrs = {};

				const hasGlobalStyle = attributes.useGlobalStyle && attributes.globalStyleId;

				if ( ! hasGlobalStyle && ! hasNumericValue( attributes.horizontalGap ) ) {
					newAttrs.horizontalGap = legacyDefaults.horizontalGap;
				}

				if ( Object.keys( newAttrs ).length > 0 ) {
					setAttributes( newAttrs );
				}
			}

			if ( isBlockVersionLessThan( attributes.blockVersion, 2 ) ) {
				setAttributes( { blockVersion: 2 } );
			}
		}, [] );

		return ( <WrappedComponent { ...props } /> );
	};
};
