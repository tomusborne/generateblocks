import addToCSS from '../../../../../utils/add-to-css';
import sizingValue from '../../../../../utils/sizingValue';

export default function SizingCSS( css, selector, attributes, device = '' ) {
	const {
		sizing,
	} = attributes;

	const styles = {
		width: sizingValue( 'width' + device, sizing ),
		height: sizingValue( 'height' + device, sizing ),
		'min-width': sizingValue( 'minWidth' + device, sizing ),
		'min-height': sizingValue( 'minHeight' + device, sizing ),
		'max-width': sizingValue( 'maxWidth' + device, sizing ),
		'max-height': sizingValue( 'maxHeight' + device, sizing ),
	};

	if ( attributes.useInnerContainer ) {
		delete styles[ 'max-width' ];
	} else if ( attributes.useGlobalMaxWidth && ! device ) {
		styles[ 'max-width' ] = generateBlocksInfo.globalContainerWidth;
	}

	if ( attributes.isGrid ) {
		delete styles.width;
		delete styles[ 'min-width' ];
		delete styles[ 'max-width' ];
	}

	return (
		addToCSS( css, selector, styles )
	);
}
