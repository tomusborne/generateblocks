import isNumeric from '../../utils/is-numeric';
import wasBlockJustInserted from '../../utils/was-block-just-inserted';
import isBlockVersionLessThan from '../../utils/check-block-version';

function buildPaddingAttributes( { attributes, defaults } ) {
	const newAttributes = {};
	const oldAttributes = {};
	const attributesToMigrate = [ 'iconPaddingTop', 'iconPaddingRight', 'iconPaddingBottom', 'iconPaddingLeft' ];

	[ '', 'Tablet', 'Mobile' ].forEach( ( device ) => {
		attributesToMigrate.forEach( ( attribute ) => {
			const oldValue = attributes[ attribute + device ];

			if ( isNumeric( oldValue ) ) {
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
					oldAttributes[ attribute + device ] = defaults[ attribute + device ]?.default
						? defaults[ attribute + device ].default
						: '';
					oldAttributes.iconPaddingUnit = defaults.iconPaddingUnit.default;
				}
			}
		} );
	} );

	return { newAttributes, oldAttributes };
}

// Migrate old icon padding.
// @since 1.8.0.
export default function migrateIconPadding( { blockVersion, defaults } ) {
	return function( attrs, existingAttrs ) {
		if ( ! wasBlockJustInserted( existingAttrs ) && isBlockVersionLessThan( existingAttrs.blockVersion, blockVersion ) ) {
			const newSizing = buildPaddingAttributes( {
				attributes: existingAttrs,
				defaults,
			} );

			if (
				Object.keys( newSizing.newAttributes ).length &&
				Object.keys( newSizing.oldAttributes ).length
			) {
				attrs = {
					...attrs,
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
