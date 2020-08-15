/* eslint-disable quotes */
import buildCSS from '../../../utils/build-css';
import shorthandCSS from '../../../utils/shorthand-css';
import hexToRGBA from '../../../utils/hex-to-rgba';
import valueWithUnit from '../../../utils/value-with-unit';

const { Component } = wp.element;
const { applyFilters } = wp.hooks;

export default class DesktopCSS extends Component {
	render() {
		const {
			attributes,
			clientId,
		} = this.props;

		const {
			uniqueId,
			isGrid,
			width,
			outerContainer,
			innerContainer,
			minHeight,
			minHeightUnit,
			paddingTop,
			paddingRight,
			paddingBottom,
			paddingLeft,
			paddingUnit,
			marginTopTablet,
			marginRightTablet,
			marginBottomTablet,
			marginLeftTablet,
			marginUnit,
			borderSizeTop,
			borderSizeRight,
			borderSizeBottom,
			borderSizeLeft,
			borderRadiusTopRightTablet,
			borderRadiusBottomRightTablet,
			borderRadiusBottomLeftTablet,
			borderRadiusTopLeftTablet,
			borderRadiusUnit,
			verticalAlignment,
			zindex,
			removeVerticalGap,
			alignment,
			fontSize,
			fontSizeUnit,
		} = attributes;

		let cssObj = [];
		cssObj[ '.gb-container-' + uniqueId ] = [ {
			'border-radius': shorthandCSS( borderRadiusTopLeftTablet, borderRadiusTopRightTablet, borderRadiusBottomRightTablet, borderRadiusBottomLeftTablet, borderRadiusUnit ),
			'margin': shorthandCSS( marginTopTablet, marginRightTablet, marginBottomTablet, marginLeftTablet, marginUnit ), // eslint-disable-line quote-props
			'z-index': zindex,
			'text-align': alignment,
			'font-size': valueWithUnit( fontSize, fontSizeUnit ),
			'min-height': valueWithUnit( minHeight, minHeightUnit ),
		} ];

		if ( borderSizeTop || borderSizeRight || borderSizeBottom || borderSizeLeft ) {
			cssObj[ '.gb-container-' + uniqueId ].push( {
				'border-width': shorthandCSS( borderSizeTop, borderSizeRight, borderSizeBottom, borderSizeLeft, 'px' ),
				'border-style': 'solid',
			} );
		}

		if ( minHeight && ! isGrid ) {
			cssObj[ '.gb-container-' + uniqueId ].push( {
				'display': 'flex', // eslint-disable-line quote-props
				'flex-direction': 'row',
				'align-items': verticalAlignment,
			} );
		}

		cssObj[ '.gb-container-' + uniqueId + ' > .gb-inside-container' ] = [ {
			'padding': shorthandCSS( paddingTop, paddingRight, paddingBottom, paddingLeft, paddingUnit ), // eslint-disable-line quote-props
			'width': minHeight && ! isGrid ? '100%' : false, // eslint-disable-line quote-props
		} ];

		if ( 'contained' === innerContainer && ! isGrid ) {
			cssObj[ '.gb-container-' + uniqueId + ' > .gb-inside-container' ].push( {
				'max-width': valueWithUnit( containerWidthPreview, 'px' ),
				'margin-left': 'auto',
				'margin-right': 'auto',
			} );
		}

		cssObj[ '.gb-grid-wrapper > div > .block-editor-block-list__layout > #block-' + clientId ] = [ {
			'width': valueWithUnit( width, '%' ), // eslint-disable-line quote-props
			'display': 'flex', // eslint-disable-line quote-props
			'flex-direction': 'column',
			'margin-left': '0px',
			'margin-right': '0px',
		} ];

		cssObj[ '.gb-grid-wrapper > div > .block-editor-block-list__layout > #block-' + clientId + ' > .gb-grid-column' ] = [ {
			'height': '100%', // eslint-disable-line quote-props
		} ];

		cssObj[ '.block-editor-block-list__layout > #block-' + clientId ] = [ {
			'max-width': 'contained' === outerContainer && ! isGrid ? valueWithUnit( containerWidthPreview, 'px' ) : false,
			'margin-bottom': removeVerticalGap ? '0px !important' : false,
		} ];

		cssObj[ '.gb-grid-column > .gb-container-' + uniqueId ] = [ {
			'display': 'flex', // eslint-disable-line quote-props
			'flex-direction': 'column',
			'height': '100%', // eslint-disable-line quote-props
			'justify-content': verticalAlignment,
		} ];

		cssObj[ `.gb-grid-wrapper > div > .block-editor-block-list__layout > #block-` + clientId + ` > .block-editor-block-list__block-edit,
		.gb-grid-wrapper > div > .block-editor-block-list__layout > #block-` + clientId + ` > .block-editor-block-list__block-edit > [data-block="` + clientId + `"],
		.gb-grid-wrapper > div > .block-editor-block-list__layout > #block-` + clientId + ` > .block-editor-block-list__block-edit > [data-block="` + clientId + `"] > .gb-grid-column` ] = [ {
			'height': '100%', // eslint-disable-line quote-props
		} ];

		cssObj[ `#block-` + clientId + `:not(.has-child-selected):not(.is-selected) .block-list-appender:not(:first-child),
		#block-` + clientId + `:not(.has-child-selected):not(.is-selected) .block-editor-block-list__layout > div:not(:first-child) > .block-list-appender` ] = [ {
			'display': 'none', // eslint-disable-line quote-props
		} ];

		cssObj = applyFilters( 'generateblocks.editor.desktopCSS', cssObj, this.props, 'container' );

		return (
			<style>{ buildCSS( cssObj ) }</style>
		);
	}
}
/* eslint-enable quotes */
