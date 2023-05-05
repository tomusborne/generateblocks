import addToCSS from '../../../../../utils/add-to-css';

export default function SpacingCSS( css, selector, attributes, device = '' ) {
	const fallback = '' === device ? '0' : '';

	const styles = {
		'margin-top': attributes[ 'marginTop' + device ],
		'margin-right': attributes[ 'marginRight' + device ] || fallback,
		'margin-bottom': attributes[ 'marginBottom' + device ],
		'margin-left': attributes[ 'marginLeft' + device ] || fallback,
	};

	return (
		addToCSS( css, selector, styles )
	);
}
