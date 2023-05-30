import isNumeric from '../../utils/is-numeric';
import isBlockVersionLessThan from '../../utils/check-block-version';
import { addToAttrsObject } from './utils';

/**
 * Build an object with new migrated attributes and old attributes reverted to defaults.
 *
 * @param {Object} Props            Function props.
 * @param {Object} Props.attributes The existing block attributes.
 * @param {Object} Props.defaults   The block defaults.
 * @return {Object} New attributes.
 * @since 1.8.0
 */
function buildPaddingAttributes( { attributes, defaults = {} } ) {
	const newAttributes = {};
	const oldAttributes = {};
	const attributesToMigrate = [ 'iconPaddingTop', 'iconPaddingRight', 'iconPaddingBottom', 'iconPaddingLeft' ];

	[ '', 'Tablet', 'Mobile' ].forEach( ( device ) => {
		attributesToMigrate.forEach( ( attribute ) => {
			const oldValue = attributes[ attribute + device ];

			if ( attributes.hasIcon && isNumeric( oldValue ) ) {
				let newAttributeName = '';

				switch ( attribute ) {
					case 'iconPaddingTop':
						newAttributeName = 'paddingTop';
						break;

					case 'iconPaddingRight':
						newAttributeName = 'paddingRight';
						break;

					case 'iconPaddingBottom':
						newAttributeName = 'paddingBottom';
						break;

					case 'iconPaddingLeft':
						newAttributeName = 'paddingLeft';
						break;
				}

				if ( newAttributeName ) {
					newAttributes[ newAttributeName + device ] = oldValue + attributes.iconPaddingUnit;

					if ( Object.keys( defaults ).length ) {
						oldAttributes[ attribute + device ] = defaults[ attribute + device ]?.default
							? defaults[ attribute + device ].default
							: '';
						oldAttributes.iconPaddingUnit = defaults.iconPaddingUnit.default;
					}
				}
			}
		} );
	} );

	return { newAttributes, oldAttributes };
}

/**
 * Build an iconStyles padding object to be used by setAttributes with our new attributes.
 *
 * @param {Object} Props                      Function props.
 * @param {number} Props.blockVersionLessThan The version blocks should be less than for this to run.
 * @param {Object} Props.defaults             The block defaults.
 * @return {Object} New attributes.
 * @since 1.8.0
 */
export default function migrateIconPadding( { blockVersionLessThan, defaults = {} } ) {
	return function( attrs, existingAttrs ) {
		if ( isBlockVersionLessThan( existingAttrs.blockVersion, blockVersionLessThan ) ) {
			const newPadding = buildPaddingAttributes( {
				attributes: { ...existingAttrs, ...attrs },
				defaults,
			} );

			attrs = addToAttrsObject( {
				attrs,
				attributeName: 'iconStyles',
				existingAttrs: existingAttrs.iconStyles,
				newAttrs: newPadding.newAttributes,
				oldAttrs: newPadding.oldAttributes,
			} );
		}

		return attrs;
	};
}
