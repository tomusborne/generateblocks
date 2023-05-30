import addToCSS from '../../../../../utils/add-to-css';

export default function TypographyCSS( css, selector, attributes, device = '' ) {
	const fontFamilyValues = [ attributes.fontFamily, attributes.fontFamilyFallback ].filter( ( v ) => v );
	const fontFamily = fontFamilyValues.join( ', ' );

	const styles = {
		'font-family': fontFamily,
		'font-size': attributes[ 'fontSize' + device ],
		'line-height': attributes[ 'lineHeight' + device ],
		'letter-spacing': attributes[ 'letterSpacing' + device ],
		'font-weight': attributes[ 'fontWeight' + device ],
		'text-transform': attributes[ 'textTransform' + device ],
		'text-align': attributes[ 'textAlign' + device ],
	};

	return (
		addToCSS( css, selector, styles )
	);
}
