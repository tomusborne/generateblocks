import isNumeric from '../../utils/is-numeric';
import wasBlockJustInserted from '../../utils/was-block-just-inserted';
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
function buildIconSizingAttributes( { attributes, defaults } ) {
	const newAttributes = {};
	const oldAttributes = {};

	[ '', 'Tablet', 'Mobile' ].forEach( ( device ) => {
		const oldValue = attributes[ 'iconSize' + device ];

		if ( oldValue || isNumeric( oldValue ) ) {
			newAttributes[ 'width' + device ] = oldValue + attributes.iconSizeUnit;
			newAttributes[ 'height' + device ] = oldValue + attributes.iconSizeUnit;
			oldAttributes[ 'iconSize' + device ] = defaults[ 'iconSize' + device ]?.default
				? defaults[ 'iconSize' + device ].default
				: '';
			oldAttributes.iconSizeUnit = defaults.iconSizeUnit.default;
		}
	} );

	return { newAttributes, oldAttributes };
}

/**
 * Build an iconStyles object with icon sizing to be used by setAttributes with our new attributes.
 *
 * @param {Object} Props                      Function props.
 * @param {number} Props.blockVersionLessThan The version blocks should be less than for this to run.
 * @param {Object} Props.defaults             The block defaults.
 * @return {Object} New attributes.
 * @since 1.8.0
 */
export default function migrateIconSizing( { blockVersionLessThan, defaults } ) {
	return function( attrs, existingAttrs ) {
		if ( ! wasBlockJustInserted( existingAttrs ) && isBlockVersionLessThan( existingAttrs.blockVersion, blockVersionLessThan ) ) {
			const newSizing = buildIconSizingAttributes( {
				attributes: existingAttrs,
				defaults,
			} );

			attrs = addToAttrsObject( {
				attrs,
				attributeName: 'iconStyles',
				existingAttrs: existingAttrs.iconStyles,
				newAttrs: newSizing.newAttributes,
				oldAttrs: newSizing.oldAttributes,
			} );
		}

		return attrs;
	};
}
