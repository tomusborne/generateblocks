import buildCSS from '../../../utils/build-css';
import { applyFilters } from '@wordpress/hooks';
import shorthandCSS from '../../../utils/shorthand-css';

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
		objectFitTablet,
		widthTablet,
		heightTablet,
		alignment,
		alignmentTablet,
	} = attributes;

	let cssObj = [];

	const floats = {
		floatLeft: 'left',
		floatRight: 'right',
		floatNone: 'none',
	};

	let float = alignmentTablet.startsWith( 'float' ) ? floats[ alignmentTablet ] : null;

	if (
		alignmentTablet &&
		! float &&
		alignment.startsWith( 'float' )
	) {
		// We have a tablet alignment and desktop is set to float, so let's disable it.
		float = 'none';
	}

	cssObj[ '.editor-styles-wrapper .gb-block-image-' + uniqueId ] = [ {
		margin: shorthandCSS( marginTopTablet, marginRightTablet, marginBottomTablet, marginLeftTablet, marginUnit ),
		padding: shorthandCSS( paddingTopTablet, paddingRightTablet, paddingBottomTablet, paddingLeftTablet, paddingUnit ),
		'text-align': ! alignmentTablet.startsWith( 'float' ) ? alignmentTablet : null,
		float,
		position: float && 'none' !== float ? 'relative' : null,
		'z-index': float && 'none' !== float ? '22' : null,
	} ];

	cssObj[ '.editor-styles-wrapper .gb-image-' + uniqueId ] = [ {
		'border-radius': shorthandCSS( borderRadiusTopLeftTablet, borderRadiusTopRightTablet, borderRadiusBottomRightTablet, borderRadiusBottomLeftTablet, borderRadiusUnit ),
		'border-color': borderColor,
		width: widthTablet,
		height: heightTablet,
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
