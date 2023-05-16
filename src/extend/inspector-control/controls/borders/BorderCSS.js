import addToCSS from '../../../../utils/add-to-css';

export default function BorderCSS( css, selector, attributes, device = '' ) {
	const styles = {
		'border-top-width': attributes[ 'borderTopWidth' + device ],
		'border-right-width': attributes[ 'borderRightWidth' + device ],
		'border-bottom-width': attributes[ 'borderBottomWidth' + device ],
		'border-left-width': attributes[ 'borderLeftWidth' + device ],
		'border-top-style': attributes[ 'borderTopStyle' + device ],
		'border-right-style': attributes[ 'borderRightStyle' + device ],
		'border-bottom-style': attributes[ 'borderBottomStyle' + device ],
		'border-left-style': attributes[ 'borderLeftStyle' + device ],
		'border-top-color': attributes[ 'borderTopColor' + device ],
		'border-right-color': attributes[ 'borderRightColor' + device ],
		'border-bottom-color': attributes[ 'borderBottomColor' + device ],
		'border-left-color': attributes[ 'borderLeftColor' + device ],
		'border-top-left-radius': attributes[ 'borderTopLeftRadius' + device ],
		'border-top-right-radius': attributes[ 'borderTopRightRadius' + device ],
		'border-bottom-right-radius': attributes[ 'borderBottomRightRadius' + device ],
		'border-bottom-left-radius': attributes[ 'borderBottomLeftRadius' + device ],
	};

	return (
		addToCSS( css, selector, styles )
	);
}

export function BorderCSSColor( css, selector, attributes, state = '' ) {
	const styles = {
		'border-top-color': attributes[ 'borderTopColor' + state ],
		'border-right-color': attributes[ 'borderRightColor' + state ],
		'border-bottom-color': attributes[ 'borderBottomColor' + state ],
		'border-left-color': attributes[ 'borderLeftColor' + state ],
	};

	return (
		addToCSS( css, selector, styles )
	);
}
