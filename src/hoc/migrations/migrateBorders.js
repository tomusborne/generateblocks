import isNumeric from '../../utils/is-numeric';
import wasBlockJustInserted from '../../utils/was-block-just-inserted';
import isBlockVersionLessThan from '../../utils/check-block-version';
import { addToAttrsObject } from './utils';
import hexToRGBA from '../../utils/hex-to-rgba';

/**
 * Build an object with new migrated attributes and old attributes reverted to defaults.
 *
 * @param {Object} Props                     Function props.
 * @param {Array}  Props.attributesToMigrate The attributes we want to migrate.
 * @param {Object} Props.attributes          The existing block attributes.
 * @param {Object} Props.defaults            The block defaults.
 * @return {Object} New attributes.
 * @since 1.8.0
 */
function buildBorderAttributes( { attributesToMigrate = [], attributes, defaults } ) {
	function unitValue( name ) {
		if ( name.startsWith( 'borderSize' ) ) {
			return 'px';
		}

		if ( name.startsWith( 'borderRadius' ) ) {
			return attributes.borderRadiusUnit;
		}
	}

	const newAttributes = {};
	const oldAttributes = {};

	[ '', 'Tablet', 'Mobile' ].forEach( ( device ) => {
		attributesToMigrate.forEach( ( attribute ) => {
			const oldValue = attributes[ attribute + device ];

			if ( isNumeric( oldValue ) ) {
				let attributeName = attribute;

				switch ( attribute ) {
					case 'borderSizeTop':
						attributeName = 'borderTopWidth';
						break;

					case 'borderSizeRight':
						attributeName = 'borderRightWidth';
						break;

					case 'borderSizeBottom':
						attributeName = 'borderBottomWidth';
						break;

					case 'borderSizeLeft':
						attributeName = 'borderLeftWidth';
						break;

					case 'borderRadiusTopLeft':
						attributeName = 'borderTopLeftRadius';
						break;

					case 'borderRadiusTopRight':
						attributeName = 'borderTopRightRadius';
						break;

					case 'borderRadiusBottomRight':
						attributeName = 'borderBottomRightRadius';
						break;

					case 'borderRadiusBottomLeft':
						attributeName = 'borderBottomLeftRadius';
						break;
				}

				if ( attributeName ) {
					newAttributes[ attributeName + device ] = oldValue + unitValue( attribute );

					if ( attributeName.includes( 'Width' ) ) {
						// We used to manually use "solid" is a borderWidth existed.
						newAttributes[ attributeName.replace( 'Width', 'Style' ) + device ] = 'solid';

						if ( attributes.borderColor ) {
							newAttributes[ attributeName.replace( 'Width', 'Color' ) + device ] = hexToRGBA( attributes.borderColor, attributes.borderColorOpacity );
							oldAttributes.borderColor = defaults.borderColor?.default;
							oldAttributes.borderColorOpacity = defaults.borderColorOpacity?.default;
						}

						if ( attributes.borderColorHover ) {
							newAttributes[ attributeName.replace( 'Width', 'ColorHover' ) + device ] = hexToRGBA( attributes.borderColorHover, attributes.borderColorHoverOpacity );
							oldAttributes.borderColorHover = defaults.borderColorHover?.default;
							oldAttributes.borderColorHoverOpacity = defaults.borderColorHoverOpacity?.default;
						}

						if ( attributes.borderColorCurrent ) {
							newAttributes[ attributeName.replace( 'Width', 'ColorCurrent' ) + device ] = attributes.borderColorCurrent;
							oldAttributes.borderColorCurrent = defaults.borderColorCurrent?.default;
						}
					}

					oldAttributes[ attribute + device ] = defaults[ attribute + device ]?.default
						? defaults[ attribute + device ].default
						: '';

					if ( attribute.startsWith( 'borderRadius' ) ) {
						oldAttributes.borderRadiusUnit = defaults.borderRadiusUnit.default;
					}
				}
			}
		} );
	} );

	return { newAttributes, oldAttributes };
}

/**
 * Build a borders object to be used by setAttributes with our new attributes.
 *
 * @param {Object} Props                      Function props.
 * @param {number} Props.blockVersionLessThan The version blocks should be less than for this to run.
 * @param {Object} Props.defaults             The block defaults.
 * @param {Array}  Props.attributesToMigrate  The attributes we want to migrate.
 * @return {Object} New attributes.
 * @since 1.8.0
 */
export default function migrateBorders( { blockVersionLessThan, defaults, attributesToMigrate = [] } ) {
	return function( attrs, existingAttrs ) {
		if ( ! wasBlockJustInserted( existingAttrs ) && isBlockVersionLessThan( existingAttrs.blockVersion, blockVersionLessThan ) ) {
			const newSpacing = buildBorderAttributes( {
				attributesToMigrate,
				attributes: existingAttrs,
				defaults,
			} );

			attrs = addToAttrsObject( {
				attrs,
				attributeName: 'borders',
				existingAttrs: existingAttrs.borders,
				newAttrs: newSpacing.newAttributes,
				oldAttrs: newSpacing.oldAttributes,
			} );
		}

		return attrs;
	};
}
