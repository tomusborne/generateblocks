import isNumeric from '../../utils/is-numeric';
import wasBlockJustInserted from '../../utils/was-block-just-inserted';
import isBlockVersionLessThan from '../../utils/check-block-version';

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

// Migrate old icon sizing.
// @since 1.8.0.
export default function migrateIconSizing( { blockVersion, defaults } ) {
	return function( attrs, existingAttrs ) {
		if ( ! wasBlockJustInserted( existingAttrs ) && isBlockVersionLessThan( existingAttrs.blockVersion, blockVersion ) ) {
			const newSizing = buildIconSizingAttributes( {
				attributes: existingAttrs,
				defaults,
			} );

			if (
				Object.keys( newSizing.newAttributes ).length &&
				Object.keys( newSizing.oldAttributes ).length
			) {
				attrs = {
					iconStyles: {
						...existingAttrs.iconStyles,
						...attrs.iconStyles,
						...newSizing.newAttributes,
					},
					...newSizing.oldAttributes,
				};
			}
		}

		return attrs;
	};
}
