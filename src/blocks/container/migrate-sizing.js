export default function MigrateSizing( { attributes, setAttributes } ) {
	const sizingAttributes = {};
	const oldAttributes = {};

	// Only migrate these if we're an active Grid item.
	if ( attributes.isGrid ) {
		if ( attributes.width ) {
			sizingAttributes.width = attributes.width + '%';
			oldAttributes.width = '';
		}

		if ( attributes.widthTablet || attributes.autoWidthTablet ) {
			sizingAttributes.widthTablet = attributes.autoWidthTablet ? 'auto' : attributes.widthTablet + '%';
			oldAttributes.widthTablet = '';
			oldAttributes.autoWidthTablet = false;
		}

		if ( attributes.widthMobile || attributes.autoWidthMobile ) {
			sizingAttributes.widthMobile = attributes.autoWidthMobile ? 'auto' : attributes.widthMobile + '%';
			oldAttributes.widthMobile = '';
			oldAttributes.autoWidthMobile = false;
		}
	}

	if ( attributes.minHeight ) {
		sizingAttributes.minHeight = attributes.minHeight + attributes.minHeightUnit;
		oldAttributes.minHeight = false;
		oldAttributes.minHeightUnit = 'px';
	}

	if ( attributes.minHeightTablet ) {
		sizingAttributes.minHeightTablet = attributes.minHeightTablet + attributes.minHeightUnitTablet;
		oldAttributes.minHeightTablet = false;
		oldAttributes.minHeightUnitTablet = 'px';
	}

	if ( attributes.minHeightMobile ) {
		sizingAttributes.minHeightMobile = attributes.minHeightMobile + attributes.minHeightUnitMobile;
		oldAttributes.minHeightMobile = false;
		oldAttributes.minHeightUnitMobile = 'px';
	}

	if ( Object.keys( oldAttributes ).length || Object.keys( sizingAttributes ).length ) {
		setAttributes( {
			...oldAttributes,
			sizing: {
				...attributes.sizing,
				...sizingAttributes,
			},
		} );
	}
}
