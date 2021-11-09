import { Fragment } from '@wordpress/element';

export default ( { fontFamily, googleFont, googleFontVariants } ) => {
	const gFontsUrl = 'https://fonts.googleapis.com/css?family=';
	const googleFontsAttr = googleFontVariants ? `:${ googleFontVariants }` : '';
	const href = gFontsUrl + fontFamily.replace( / /g, '+' ) + googleFontsAttr;

	return (
		<Fragment>
			{ fontFamily && googleFont && <link rel="stylesheet" href={ href } /> }
		</Fragment>
	);
};
