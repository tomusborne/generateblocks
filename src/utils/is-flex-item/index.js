export default function isFlexItem( props ) {
	const {
		device,
		display,
		displayTablet,
		displayMobile,
		computedStyles = { display: '' },
	} = props;

	// Check for a computed value if one is provided
	const { display: computedValue = '' } = computedStyles;

	// If the computed style is flex, we can assume it's a flex item.
	if ( 'flex' === computedValue ) {
		return true;
	}

	// Check local attributes to determine if a flex item
	let flexItem = false;

	if ( 'Desktop' === device && display.includes( 'flex' ) ) {
		flexItem = true;
	}

	if ( 'Tablet' === device ) {
		if (
			( displayTablet && displayTablet.includes( 'flex' ) ) ||
			( ! displayTablet && display.includes( 'flex' ) )
		) {
			flexItem = true;
		}
	}

	if ( 'Mobile' === device ) {
		if (
			( displayMobile && displayMobile.includes( 'flex' ) ) ||
			( ! displayMobile && displayTablet && displayTablet.includes( 'flex' ) ) ||
			( ! displayMobile && ! displayTablet && display.includes( 'flex' ) )
		) {
			flexItem = true;
		}
	}

	return flexItem;
}
