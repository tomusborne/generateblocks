import { useEffect } from '@wordpress/element';
import hasNumericValue from '../utils/has-numeric-value';
import wasBlockJustInserted from '../utils/was-block-just-inserted';
import isBlockVersionLessThan from '../utils/check-block-version';

export default ( WrappedComponent ) => {
	return ( props ) => {
		const {
			attributes,
			setAttributes,
		} = props;

		useEffect( () => {
			// This block used to be static. Set it to dynamic by default from now on.
			if ( 'undefined' === typeof attributes.isDynamic || ! attributes.isDynamic ) {
				setAttributes( { isDynamic: true } );
			}

			// Set our inner z-index if we're using a gradient overlay or pseudo background.
			// @since 1.4.0.
			if ( 'undefined' === typeof attributes.blockVersion || attributes.blockVersion < 2 ) {
				let updateOldZindex =
					attributes.gradient && 'pseudo-element' === attributes.gradientSelector &&
					! hasNumericValue( attributes.innerZindex );

				if ( ! updateOldZindex ) {
					updateOldZindex = !! attributes.bgImage && 'undefined' !== typeof attributes.bgOptions.selector && 'pseudo-element' === attributes.bgOptions.selector;
				}

				if ( ! updateOldZindex ) {
					updateOldZindex = 'undefined' !== typeof attributes.useAdvBackgrounds && attributes.useAdvBackgrounds;
				}

				if ( updateOldZindex ) {
					setAttributes( { innerZindex: 1 } );
				}
			}

			// Set our old defaults as static values.
			// @since 1.4.0.
			if ( ! wasBlockJustInserted( attributes ) && isBlockVersionLessThan( attributes.blockVersion, 2 ) ) {
				const legacyDefaults = generateBlocksLegacyDefaults.v_1_4_0.container;
				const useGlobalStyle = 'undefined' !== typeof attributes.useGlobalStyle && attributes.useGlobalStyle;

				const newAttrs = {};
				const items = [];

				if ( ! useGlobalStyle ) {
					items.push(
						'paddingTop',
						'paddingRight',
						'paddingBottom',
						'paddingLeft',
					);
				}

				if ( attributes.isGrid ) {
					items.push(
						'width',
						'widthMobile',
					);
				}

				if ( attributes.gradient ) {
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

			// Attribute defaults added to an object late don't get defaults.
			// @since 1.1.2
			if ( 'undefined' === typeof attributes.bgOptions.selector ) {
				setAttributes( {
					bgOptions: {
						...attributes.bgOptions,
						selector: 'element',
					},
				} );
			}

			if ( 'undefined' === typeof attributes.bgOptions.opacity ) {
				setAttributes( {
					bgOptions: {
						...attributes.bgOptions,
						opacity: 1,
					},
				} );
			}

			// Update block version flag if it's out of date.
			if ( isBlockVersionLessThan( attributes.blockVersion, 2 ) ) {
				setAttributes( { blockVersion: 2 } );
			}
		}, [] );

		return ( <WrappedComponent { ...props } /> );
	};
};
