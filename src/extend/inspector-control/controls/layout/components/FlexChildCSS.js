import addToCSS from '../../../../../utils/add-to-css';

export default function FlexChildCSS( css, selector, attributes, device = '' ) {
	if ( attributes.isGrid ) {
		return;
	}

	return (
		addToCSS( css, selector, {
			'flex-grow': attributes[ 'flexGrow' + device ],
			'flex-shrink': attributes[ 'flexShrink' + device ],
			'flex-basis': attributes[ 'flexBasis' + device ],
			order: attributes[ 'order' + device ],
		} )
	);
}
