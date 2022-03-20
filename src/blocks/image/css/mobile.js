import buildCSS from '../../../utils/build-css';

import { applyFilters } from '@wordpress/hooks';
import shorthandCSS from '../../../utils/shorthand-css';
import valueWithUnit from '../../../utils/value-with-unit';

export default function MobileCSS( props ) {
	const attributes = applyFilters( 'generateblocks.editor.cssAttrs', props.attributes, props );

	const {
		uniqueId,
		paddingTopMobile,
		paddingRightMobile,
		paddingBottomMobile,
		paddingLeftMobile,
		paddingUnit,
		marginTopMobile,
		marginRightMobile,
		marginBottomMobile,
		marginLeftMobile,
		marginUnit,
		borderSizeTopMobile,
		borderSizeRightMobile,
		borderSizeBottomMobile,
		borderSizeLeftMobile,
		borderRadiusTopRightMobile,
		borderRadiusBottomRightMobile,
		borderRadiusBottomLeftMobile,
		borderRadiusTopLeftMobile,
		borderRadiusUnit,
		borderColor,
		objectFit,
		objectFitTablet,
		objectFitMobile,
		widthMobile,
		heightMobile,
	} = attributes;

	let cssObj = [];

	cssObj[ '.editor-styles-wrapper .gb-block-image-' + uniqueId ] = [ {
		margin: shorthandCSS( marginTopMobile, marginRightMobile, marginBottomMobile, marginLeftMobile, marginUnit ),
		padding: shorthandCSS( paddingTopMobile, paddingRightMobile, paddingBottomMobile, paddingLeftMobile, paddingUnit ),
	} ];

	cssObj[ '.editor-styles-wrapper .gb-image-' + uniqueId ] = [ {
		'border-radius': shorthandCSS( borderRadiusTopLeftMobile, borderRadiusTopRightMobile, borderRadiusBottomRightMobile, borderRadiusBottomLeftMobile, borderRadiusUnit ),
		'border-color': borderColor,
		width: ( objectFit || objectFitTablet || objectFitMobile ) ? valueWithUnit( widthMobile, 'px' ) : null,
		height: ( objectFit || objectFitTablet || objectFitMobile ) ? valueWithUnit( heightMobile, 'px' ) : null,
		'object-fit': objectFitMobile,
	} ];

	if ( borderSizeTopMobile || borderSizeRightMobile || borderSizeBottomMobile || borderSizeLeftMobile ) {
		cssObj[ '.editor-styles-wrapper .gb-image-' + uniqueId ].push( {
			'border-width': shorthandCSS( borderSizeTopMobile, borderSizeRightMobile, borderSizeBottomMobile, borderSizeLeftMobile, 'px' ),
			'border-style': 'solid',
		} );
	}

	cssObj = applyFilters( 'generateblocks.editor.mobileCSS', cssObj, props, 'image' );

	return (
		<style>{ buildCSS( cssObj ) }</style>
	);
}
