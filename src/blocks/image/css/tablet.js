import buildCSS from '../../../utils/build-css';
import { applyFilters } from '@wordpress/hooks';
import shorthandCSS from '../../../utils/shorthand-css';
import SpacingCSS from '../../../extend/inspector-control/controls/spacing/components/SpacingCSS';
import BorderCSS from '../../../extend/inspector-control/controls/borders/BorderCSS';

export default function TabletCSS( props ) {
	const attributes = applyFilters( 'generateblocks.editor.cssAttrs', props.attributes, props );

	const {
		uniqueId,
		borderColor,
		objectFitTablet,
		widthTablet,
		heightTablet,
		alignment,
		alignmentTablet,
	} = attributes;

	const {
		borderTopLeftRadiusTablet,
		borderTopRightRadiusTablet,
		borderBottomRightRadiusTablet,
		borderBottomLeftRadiusTablet,
	} = attributes.borders;

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
		'text-align': ! alignmentTablet.startsWith( 'float' ) ? alignmentTablet : null,
		float,
		position: float && 'none' !== float ? 'relative' : null,
		'z-index': float && 'none' !== float ? '22' : null,
	} ];

	SpacingCSS( cssObj, '.editor-styles-wrapper .gb-block-image-' + uniqueId, attributes.spacing, 'Tablet' );

	cssObj[ '.editor-styles-wrapper .gb-image-' + uniqueId ] = [ {
		'border-color': borderColor,
		width: widthTablet,
		height: heightTablet,
		'object-fit': objectFitTablet,
	} ];

	BorderCSS( cssObj, '.editor-styles-wrapper .gb-image-' + uniqueId, attributes.borders, 'Tablet' );

	cssObj[ '.editor-styles-wrapper .gb-image-' + uniqueId + ' + .components-placeholder__illustration' ] = [ {
		'border-radius': shorthandCSS( borderTopLeftRadiusTablet, borderTopRightRadiusTablet, borderBottomRightRadiusTablet, borderBottomLeftRadiusTablet ),
	} ];

	cssObj = applyFilters( 'generateblocks.editor.tabletCSS', cssObj, props, 'image' );

	return (
		<style>{ buildCSS( cssObj ) }</style>
	);
}
