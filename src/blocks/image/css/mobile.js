import buildCSS from '../../../utils/build-css';
import { applyFilters } from '@wordpress/hooks';
import shorthandCSS from '../../../utils/shorthand-css';
import SpacingCSS from '../../../extend/inspector-control/controls/spacing/components/SpacingCSS';

export default function MobileCSS( props ) {
	const attributes = applyFilters( 'generateblocks.editor.cssAttrs', props.attributes, props );

	const {
		uniqueId,
		paddingTopMobile,
		paddingRightMobile,
		paddingBottomMobile,
		paddingLeftMobile,
		paddingUnit,
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
		objectFitMobile,
		widthMobile,
		heightMobile,
		alignment,
		alignmentTablet,
		alignmentMobile,
	} = attributes;

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
		padding: shorthandCSS( paddingTopMobile, paddingRightMobile, paddingBottomMobile, paddingLeftMobile, paddingUnit ),
		'text-align': ! alignmentMobile.startsWith( 'float' ) ? alignmentMobile : null,
		float,
		position: float && 'none' !== float ? 'relative' : null,
		'z-index': float && 'none' !== float ? '22' : null,
	} ];

	SpacingCSS( cssObj, '.editor-styles-wrapper .gb-block-image-' + uniqueId, attributes, 'Mobile' );

	cssObj[ '.editor-styles-wrapper .gb-image-' + uniqueId ] = [ {
		'border-radius': shorthandCSS( borderRadiusTopLeftMobile, borderRadiusTopRightMobile, borderRadiusBottomRightMobile, borderRadiusBottomLeftMobile, borderRadiusUnit ),
		'border-color': borderColor,
		width: widthMobile,
		height: heightMobile,
		'object-fit': objectFitMobile,
	} ];

	cssObj[ '.editor-styles-wrapper .gb-image-' + uniqueId + ' + .components-placeholder__illustration' ] = [ {
		'border-radius': shorthandCSS( borderRadiusTopLeftMobile, borderRadiusTopRightMobile, borderRadiusBottomRightMobile, borderRadiusBottomLeftMobile, borderRadiusUnit ),
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
