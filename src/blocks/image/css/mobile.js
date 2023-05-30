import buildCSS from '../../../utils/build-css';
import { applyFilters } from '@wordpress/hooks';
import shorthandCSS from '../../../utils/shorthand-css';
import SpacingCSS from '../../../extend/inspector-control/controls/spacing/components/SpacingCSS';
import BorderCSS from '../../../extend/inspector-control/controls/borders/BorderCSS';

export default function MobileCSS( props ) {
	const attributes = applyFilters( 'generateblocks.editor.cssAttrs', props.attributes, props );

	const {
		uniqueId,
		borderColor,
		objectFitMobile,
		widthMobile,
		heightMobile,
		alignment,
		alignmentTablet,
		alignmentMobile,
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

	let float = alignmentMobile.startsWith( 'float' ) ? floats[ alignmentMobile ] : null;

	if (
		alignmentMobile &&
		! float &&
		(
			alignmentTablet.startsWith( 'float' ) ||
			alignment.startsWith( 'float' )
		)
	) {
		// We have a mobile alignment and tablet/desktop is set to float, so let's disable it.
		float = 'none';
	}

	cssObj[ '.editor-styles-wrapper .gb-block-image-' + uniqueId ] = [ {
		'text-align': ! alignmentMobile.startsWith( 'float' ) ? alignmentMobile : null,
		float,
		position: float && 'none' !== float ? 'relative' : null,
		'z-index': float && 'none' !== float ? '22' : null,
	} ];

	SpacingCSS( cssObj, '.editor-styles-wrapper .gb-block-image-' + uniqueId, attributes.spacing, 'Mobile' );

	cssObj[ '.editor-styles-wrapper .gb-image-' + uniqueId ] = [ {
		'border-color': borderColor,
		width: widthMobile,
		height: heightMobile,
		'object-fit': objectFitMobile,
	} ];

	BorderCSS( cssObj, '.editor-styles-wrapper .gb-image-' + uniqueId, attributes.borders, 'Mobile' );

	cssObj[ '.editor-styles-wrapper .gb-image-' + uniqueId + ' + .components-placeholder__illustration' ] = [ {
		'border-radius': shorthandCSS( borderTopLeftRadiusTablet, borderTopRightRadiusTablet, borderBottomRightRadiusTablet, borderBottomLeftRadiusTablet ),
	} ];

	cssObj = applyFilters( 'generateblocks.editor.mobileCSS', cssObj, props, 'image' );

	return (
		<style>{ buildCSS( cssObj ) }</style>
	);
}
