import buildCSS from '../../../utils/build-css';
import { applyFilters } from '@wordpress/hooks';
import shorthandCSS from '../../../utils/shorthand-css';

export default function MainCSS( props ) {
	const attributes = applyFilters( 'generateblocks.editor.cssAttrs', props.attributes, props );

	const {
		uniqueId,
		paddingTop,
		paddingRight,
		paddingBottom,
		paddingLeft,
		paddingUnit,
		marginTop,
		marginRight,
		marginBottom,
		marginLeft,
		marginUnit,
		borderSizeTop,
		borderSizeRight,
		borderSizeBottom,
		borderSizeLeft,
		borderRadiusTopRight,
		borderRadiusBottomRight,
		borderRadiusBottomLeft,
		borderRadiusTopLeft,
		borderRadiusUnit,
		borderColor,
		objectFit,
		width,
		height,
		alignment,
	} = attributes;

	let cssObj = [];

	const floats = {
		floatLeft: 'left',
		floatRight: 'right',
		floatNone: 'none',
	};

	cssObj[ '.editor-styles-wrapper .gb-block-image-' + uniqueId ] = [ {
		margin: shorthandCSS( marginTop, marginRight, marginBottom, marginLeft, marginUnit ),
		padding: shorthandCSS( paddingTop, paddingRight, paddingBottom, paddingLeft, paddingUnit ),
		'text-align': ! alignment.startsWith( 'float' ) ? alignment : null,
		float: alignment.startsWith( 'float' ) ? floats[ alignment ] : 'none',
		position: alignment.startsWith( 'float' ) ? 'relative' : null,
		'z-index': alignment.startsWith( 'float' ) ? '22' : null,
	} ];

	cssObj[ '.editor-styles-wrapper .gb-image-' + uniqueId ] = [ {
		'border-radius': shorthandCSS( borderRadiusTopLeft, borderRadiusTopRight, borderRadiusBottomRight, borderRadiusBottomLeft, borderRadiusUnit ),
		'border-color': borderColor,
		width,
		height,
		'object-fit': objectFit,
	} ];

	if ( borderSizeTop || borderSizeRight || borderSizeBottom || borderSizeLeft ) {
		cssObj[ '.editor-styles-wrapper .gb-image-' + uniqueId ].push( {
			'border-width': shorthandCSS( borderSizeTop, borderSizeRight, borderSizeBottom, borderSizeLeft, 'px' ),
			'border-style': 'solid',
		} );
	}

	cssObj = applyFilters( 'generateblocks.editor.mainCSS', cssObj, props, 'image' );

	return (
		<style>{ buildCSS( cssObj ) }</style>
	);
}
