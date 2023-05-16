import isNumeric from '../../utils/is-numeric';

export default function MigrateTypography( { attributesToMigrate, attributes, defaults } ) {
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
