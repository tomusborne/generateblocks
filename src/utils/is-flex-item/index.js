export default function isFlexItem( props ) {
	const {
		device,
		display,
		displayTablet,
		displayMobile,
	} = props;

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
