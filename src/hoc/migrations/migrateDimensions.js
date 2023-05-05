import isNumeric from '../../utils/is-numeric';

export default function MigrateDimensions( { attributesToMigrate, attributes } ) {
	function unitValue( name ) {
		if ( name.startsWith( 'padding' ) ) {
			return attributes.paddingUnit;
		}

		if ( name.startsWith( 'margin' ) ) {
			return attributes.marginUnit;
		}

		if ( name.startsWith( 'borderSize' ) ) {
			return 'px';
		}

		if ( name.startsWith( 'borderRadius' ) ) {
			return attributes.borderRadiusUnit;
		}
	}

	const newAttributes = {};

	[ '', 'Tablet', 'Mobile' ].forEach( ( device ) => {
		attributesToMigrate.forEach( ( dimension ) => {
			const oldValue = attributes[ dimension + device ];

			if ( isNumeric( oldValue ) ) {
				newAttributes[ dimension + device ] = oldValue + unitValue( dimension );
			}
		} );
	} );

	return newAttributes;
}
