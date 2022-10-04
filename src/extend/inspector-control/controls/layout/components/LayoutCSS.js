import addToCSS from '../../../../../utils/add-to-css';

export default function LayoutCSS( css, selector, attributes, device = '' ) {
	return (
		addToCSS( css, selector, {
			display: attributes[ 'display' + device ],
			'flex-direction': attributes[ 'flexDirection' + device ],
			'flex-wrap': attributes[ 'flexWrap' + device ],
			'align-items': attributes[ 'alignItems' + device ],
			'justify-content': attributes[ 'justifyContent' + device ],
		} )
	);
}
