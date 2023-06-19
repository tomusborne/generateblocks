import { Fragment } from '@wordpress/element';

export default ( { fontFamily, googleFont, googleFontVariants, isBlockPreview } ) => {
	if ( isBlockPreview ) {
		return null;
	}

	if ( ! fontFamily ) {
		return null;
	}

	if ( generateBlocksInfo.disableGoogleFonts ) {
		return null;
	}

	const gFontsUrl = 'https://fonts.googleapis.com/css?family=';
	const googleFontsAttr = googleFontVariants ? `:${ googleFontVariants }` : '';
	const href = gFontsUrl + fontFamily.replace( / /g, '+' ) + googleFontsAttr;

	return (
		<Fragment>
			{ fontFamily && googleFont && <link rel="stylesheet" href={ href } /> }
		</Fragment>
	);
};
