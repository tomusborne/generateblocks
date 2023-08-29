import buildCSS from '../../../utils/build-css';
import { applyFilters } from '@wordpress/hooks';
import shorthandCSS from '../../../utils/shorthand-css';
import SpacingCSS from '../../../extend/inspector-control/controls/spacing/components/SpacingCSS';
import BorderCSS from '../../../extend/inspector-control/controls/borders/BorderCSS';
import getEditorSelector from '../../../utils/get-editor-selector';

export default function MainCSS( props ) {
	const attributes = applyFilters( 'generateblocks.editor.cssAttrs', props.attributes, props );

	const {
		uniqueId,
		objectFit,
		width,
		height,
		alignment,
	} = attributes;

	const {
		borderTopLeftRadius,
		borderTopRightRadius,
		borderBottomRightRadius,
		borderBottomLeftRadius,
	} = attributes.spacing;

	const selector = '.editor-styles-wrapper ' + getEditorSelector(
		'.gb-image-' + uniqueId,
		{ name: props.name, attributes }
	);
	let cssObj = [];

	const floats = {
		floatLeft: 'left',
		floatRight: 'right',
		floatNone: 'none',
	};

	cssObj[ '.editor-styles-wrapper .gb-block-image-' + uniqueId ] = [ {
		'text-align': ! alignment.startsWith( 'float' ) ? alignment : null,
		float: alignment.startsWith( 'float' ) ? floats[ alignment ] : 'none',
		position: alignment.startsWith( 'float' ) ? 'relative' : null,
		'z-index': alignment.startsWith( 'float' ) ? '22' : null,
		'max-width': 'unset',
	} ];

	SpacingCSS( cssObj, '.editor-styles-wrapper .gb-block-image-' + uniqueId, attributes.spacing );

	cssObj[ selector ] = [ {
		width,
		height,
		'object-fit': objectFit,
	} ];

	BorderCSS( cssObj, selector, attributes.borders );

	cssObj[ selector + ' + .components-placeholder__illustration' ] = [ {
		'border-radius': shorthandCSS( borderTopLeftRadius, borderTopRightRadius, borderBottomRightRadius, borderBottomLeftRadius ),
	} ];

	cssObj = applyFilters( 'generateblocks.editor.mainCSS', cssObj, props, 'image' );

	return (
		<style>{ buildCSS( cssObj ) }</style>
	);
}
