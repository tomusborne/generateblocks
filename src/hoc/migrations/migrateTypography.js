import isNumeric from '../../utils/is-numeric';
import wasBlockJustInserted from '../../utils/was-block-just-inserted';
import isBlockVersionLessThan from '../../utils/check-block-version';

function buildTypographyAttributes( { attributesToMigrate, attributes, defaults } ) {
	function unitValue( name ) {
		if ( 'fontSize' === name ) {
			return attributes.fontSizeUnit;
		}

		if ( 'lineHeight' === name ) {
			return attributes.lineHeightUnit;
		}

		if ( 'letterSpacing' === name ) {
			return 'em';
		}
	}

	const newAttributes = {};
	const oldAttributes = {};

	[ '', 'Tablet', 'Mobile' ].forEach( ( device ) => {
		attributesToMigrate.forEach( ( attribute ) => {
			const oldValue = attributes[ attribute + device ];

			if ( oldValue || isNumeric( oldValue ) ) {
				const unit = unitValue( attribute );

				if ( isNumeric( oldValue ) && unit ) {
					newAttributes[ attribute + device ] = oldValue + unit;
				} else if ( 'alignment' === attribute ) {
					newAttributes[ 'textAlign' + device ] = oldValue;
				} else {
					newAttributes[ attribute + device ] = oldValue;
				}

				oldAttributes[ attribute + device ] = defaults[ attribute + device ]?.default
					? defaults[ attribute + device ].default
					: '';

				if ( attribute.startsWith( 'fontSize' ) ) {
					oldAttributes.fontSizeUnit = defaults.fontSizeUnit.default;
				}

				if ( attribute.startsWith( 'lineHeight' ) ) {
					oldAttributes.lineHeightUnit = defaults.lineHeightUnit.default;
				}
			}
		} );
	} );

	return { newAttributes, oldAttributes };
}

// Migrate typography controls.
// @since 1.8.0.
export default function migrateTypography( { blockVersion, defaults, attributesToMigrate = [] } ) {
	return function( attrs, existingAttrs ) {
		if ( ! wasBlockJustInserted( existingAttrs ) && isBlockVersionLessThan( existingAttrs.blockVersion, blockVersion ) ) {
			const newTypography = buildTypographyAttributes( {
				attributesToMigrate,
				attributes: existingAttrs,
				defaults,
			} );

			if (
				Object.keys( newTypography.newAttributes ).length &&
				Object.keys( newTypography.oldAttributes ).length
			) {
				attrs = {
					...attrs,
					typography: {
						...existingAttrs.typography,
						...attrs.typography,
						...newTypography.newAttributes,
					},
					...newTypography.oldAttributes,
				};
			}
		}

		return attrs;
	};
}
