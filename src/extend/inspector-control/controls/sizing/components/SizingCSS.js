import addToCSS from '../../../../../utils/add-to-css';
import sizingValue from '../../../../../utils/sizingValue';
import valueWithUnit from '../../../../../utils/value-with-unit';

export default function SizingCSS( css, selector, attributes, device = '' ) {
	const {
		sizing,
	} = attributes;

	const styles = {
		width: sizingValue( 'width' + device, sizing ),
		height: sizingValue( 'height' + device, sizing ),
		'min-width': sizingValue( 'min-width' + device, sizing ),
		'min-height': sizingValue( 'minHeight' + device, sizing ),
		'max-width': sizingValue( 'maxWidth' + device, sizing ) || 'unset',
		'max-height': sizingValue( 'maxHeight' + device, sizing ),
	};

	if ( attributes.useInnerContainer ) {
		delete styles[ 'max-width' ];
	} else if ( attributes.useGlobalContainerWidth && ! device ) {
		styles[ 'max-width' ] = generateBlocksInfo.globalContainerWidth;
	}

	if ( attributes.isGrid ) {
		delete styles.width;
		delete styles[ 'min-width' ];
		delete styles[ 'max-width' ];
	}

	if ( ! attributes.isGrid ) {
		styles[ 'flex-grow' ] = attributes[ 'flexGrow' + device ];
		styles[ 'flex-shrink' ] = attributes[ 'flexShrink' + device ];
		styles[ 'flex-basis' ] = isNaN( attributes[ 'flexBasis' + device ] )
			? attributes[ 'flexBasis' + device ]
			: valueWithUnit( attributes[ 'flexBasis' + device ], attributes[ 'flexBasisUnit' + device ] );
	}

	return (
		addToCSS( css, selector, styles )
	);
}
