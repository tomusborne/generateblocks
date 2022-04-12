import buildCSS from '../../../utils/build-css';

import { applyFilters } from '@wordpress/hooks';
import shorthandCSS from '../../../utils/shorthand-css';
import valueWithUnit from '../../../utils/value-with-unit';

export default function TabletCSS( props ) {
	const attributes = applyFilters( 'generateblocks.editor.cssAttrs', props.attributes, props );

	const {
		uniqueId,
		paddingTopTablet,
		paddingRightTablet,
		paddingBottomTablet,
		paddingLeftTablet,
		paddingUnit,
		marginTopTablet,
		marginRightTablet,
		marginBottomTablet,
		marginLeftTablet,
		marginUnit,
		borderSizeTopTablet,
		borderSizeRightTablet,
		borderSizeBottomTablet,
		borderSizeLeftTablet,
		borderRadiusTopRightTablet,
		borderRadiusBottomRightTablet,
		borderRadiusBottomLeftTablet,
		borderRadiusTopLeftTablet,
		borderRadiusUnit,
		borderColor,
		objectFit,
		objectFitTablet,
		widthTablet,
		heightTablet,
	} = attributes;

	let cssObj = [];

	cssObj[ '.editor-styles-wrapper .gb-block-image-' + uniqueId ] = [ {
		margin: shorthandCSS( marginTopTablet, marginRightTablet, marginBottomTablet, marginLeftTablet, marginUnit ),
		padding: shorthandCSS( paddingTopTablet, paddingRightTablet, paddingBottomTablet, paddingLeftTablet, paddingUnit ),
	} ];

	cssObj[ '.editor-styles-wrapper .gb-image-' + uniqueId ] = [ {
		'border-radius': shorthandCSS( borderRadiusTopLeftTablet, borderRadiusTopRightTablet, borderRadiusBottomRightTablet, borderRadiusBottomLeftTablet, borderRadiusUnit ),
		'border-color': borderColor,
		width: ( objectFit || objectFitTablet ) ? valueWithUnit( widthTablet, 'px' ) : null,
		height: ( objectFit || objectFitTablet ) ? valueWithUnit( heightTablet, 'px' ) : null,
		'object-fit': objectFitTablet,
	} ];

	if ( borderSizeTopTablet || borderSizeRightTablet || borderSizeBottomTablet || borderSizeLeftTablet ) {
		cssObj[ '.editor-styles-wrapper .gb-image-' + uniqueId ].push( {
			'border-width': shorthandCSS( borderSizeTopTablet, borderSizeRightTablet, borderSizeBottomTablet, borderSizeLeftTablet, 'px' ),
			'border-style': 'solid',
		} );
	}

	cssObj = applyFilters( 'generateblocks.editor.tabletCSS', cssObj, props, 'image' );

	return (
		<style>{ buildCSS( cssObj ) }</style>
	);
}
