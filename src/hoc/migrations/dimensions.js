export default function MigrateDimensions( { attributes, setAttributes } ) {
	const dimensionAttributes = [
		'paddingTop',
		'paddingRight',
		'paddingBottom',
		'paddingLeft',
		'marginTop',
		'marginRight',
		'marginBottom',
		'marginLeft',
		'borderSizeTop',
		'borderSizeRight',
		'borderSizeBottom',
		'borderSizeLeft',
		'borderRadiusTopRight',
		'borderRadiusBottomRight',
		'borderRadiusBottomLeft',
		'borderRadiusTopLeft',
	];

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
		dimensionAttributes.forEach( ( dimension ) => {
			const oldValue = attributes[ dimension + device ];

			if ( oldValue && ! isNaN( oldValue ) ) {
				newAttributes[ dimension + device ] = oldValue + unitValue( dimension );
			}
		} );
	} );

	if ( Object.keys( newAttributes ).length ) {
		setAttributes( newAttributes );
	}
}
