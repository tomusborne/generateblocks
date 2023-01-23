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

		const {
			hasIcon,
			icon,
			hasUrl,
			url,
			blockVersion,
			gradient,
			useGlobalStyle,
		} = attributes;

		useEffect( () => {
			if ( ! hasIcon && icon ) {
				setAttributes( { hasIcon: true } );
			}

			if ( ! hasUrl ) {
				setAttributes( { hasUrl: ( !! url ) } );
			}

			// Set our layout attributes for old Button blocks.
			// @since 1.7.0
			if ( ! wasBlockJustInserted( attributes ) && isBlockVersionLessThan( blockVersion, 3 ) && ! useGlobalStyle ) {
				setAttributes( {
					display: 'inline-flex',
					alignItems: 'center',
					justifyContent: 'center',
					alignment: 'center',
				} );
			}

			// Set our old defaults as static values.
			// @since 1.4.0.
			if ( ! wasBlockJustInserted( attributes ) && isBlockVersionLessThan( blockVersion, 2 ) ) {
				const legacyDefaults = generateBlocksLegacyDefaults.v_1_4_0.button;

				const newAttrs = {};
				const items = [];

				if ( gradient ) {
					items.push(
						'gradientDirection',
						'gradientColorOne',
						'gradientColorOneOpacity',
						'gradientColorTwo',
						'gradientColorTwoOpacity'
					);
				}

				items.forEach( ( item ) => {
					if ( ! hasNumericValue( attributes[ item ] ) ) {
						newAttrs[ item ] = legacyDefaults[ item ];
					}
				} );

				if ( Object.keys( newAttrs ).length > 0 ) {
					setAttributes( newAttrs );
				}
			}

			// Update block version flag if it's out of date.
			if ( isBlockVersionLessThan( blockVersion, 3 ) ) {
				setAttributes( { blockVersion: 3 } );
			}
		}, [] );

		return ( <WrappedComponent { ...props } /> );
	};
};
