export default function isFlexItem( props ) {
	const {
		deviceType,
		attributes,
	} = props;

	const {
		display,
		displayTablet,
		displayMobile,
	} = attributes;

	let flexItem = false;

	if ( 'Desktop' === deviceType && display.includes( 'flex' ) ) {
		flexItem = true;
	}

	if ( 'Tablet' === deviceType ) {
		if (
			( displayTablet && displayTablet.includes( 'flex' ) ) ||
			( ! displayTablet && display.includes( 'flex' ) )
		) {
			flexItem = true;
		}
	}

	if ( 'Mobile' === deviceType ) {
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
