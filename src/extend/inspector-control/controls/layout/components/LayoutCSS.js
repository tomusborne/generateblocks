import addToCSS from '../../../../../utils/add-to-css';

export default function LayoutCSS( css, selector, attributes, device = '' ) {
	const styles = {
		'z-index': attributes[ 'zindex' + device ],
	};

	if ( ! attributes.useInnerContainer ) {
		styles.display = attributes[ 'display' + device ];
		styles[ 'flex-direction' ] = attributes[ 'flexDirection' + device ];
		styles[ 'flex-wrap' ] = attributes[ 'flexWrap' + device ];
		styles[ 'align-items' ] = attributes[ 'alignItems' + device ];
		styles[ 'justify-content' ] = attributes[ 'justifyContent' + device ];
		styles[ 'column-gap' ] = attributes[ 'columnGap' + device ];
		styles[ 'row-gap' ] = attributes[ 'rowGap' + device ];
		styles.order = attributes[ 'order' + device ];
		styles.position = attributes[ 'position' + device ];
		styles[ 'overflow-x' ] = attributes[ 'overflowX' + device ];
		styles[ 'overflow-y' ] = attributes[ 'overflowY' + device ];
	}

	return (
		addToCSS( css, selector, styles )
	);
}
