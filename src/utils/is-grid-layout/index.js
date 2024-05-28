export default function isGridLayout( props ) {
	const {
		device,
		display,
		displayTablet,
		displayMobile,
	} = props;

	let gridLayout = false;

	if ( 'Desktop' === device && 'grid' === display ) {
		gridLayout = true;
	}

	if ( 'Tablet' === device ) {
		if (
			( displayTablet && 'grid' === displayTablet ) ||
			( ! displayTablet && 'grid' === display )
		) {
			gridLayout = true;
		}
	}

	if ( 'Mobile' === device ) {
		if (
			( displayMobile && 'grid' === displayMobile ) ||
			( ! displayMobile && displayTablet && 'grid' === displayTablet ) ||
			( ! displayMobile && ! displayTablet && 'grid' === display )
		) {
			gridLayout = true;
		}
	}

	return gridLayout;
}
