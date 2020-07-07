/* eslint-disable quotes */
import buildCSS from '../../../utils/build-css';
import shorthandCSS from '../../../utils/shorthand-css';
import hexToRGBA from '../../../utils/hex-to-rgba';
import valueWithUnit from '../../../utils/value-with-unit';
import getBackgroundImageCSS from '../../../utils/get-background-image';

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
			containerWidth,
			minHeight,
			minHeightUnit,
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
			borderColorOpacity,
			backgroundColor,
			backgroundColorOpacity,
			gradient,
			textColor,
			linkColor,
			linkColorHover,
			bgImage,
			bgOptions,
			verticalAlignment,
			zindex,
			removeVerticalGap,
			alignment,
			fontFamily,
			fontFamilyFallback,
			fontWeight,
			fontSize,
			fontSizeUnit,
			textTransform,
		} = attributes;

		const backgroundImageValue = getBackgroundImageCSS( attributes );

		let containerWidthPreview = containerWidth;

		if ( ! containerWidthPreview ) {
			containerWidthPreview = generateBlocksDefaults.container.containerWidth;
		}

		let fontFamilyFallbackValue = '';

		if ( fontFamily && fontFamilyFallback ) {
			fontFamilyFallbackValue = ', ' + fontFamilyFallback;
		}

		let cssObj = [];
		cssObj[ '.gb-container-' + uniqueId ] = [ {
			'background-color': hexToRGBA( backgroundColor, backgroundColorOpacity ),
			'color': textColor, // eslint-disable-line quote-props
			'border-radius': shorthandCSS( borderRadiusTopLeft, borderRadiusTopRight, borderRadiusBottomRight, borderRadiusBottomLeft, borderRadiusUnit ),
			'margin': shorthandCSS( marginTop, marginRight, marginBottom, marginLeft, marginUnit ), // eslint-disable-line quote-props
			'z-index': zindex,
			'text-align': alignment,
			'font-family': fontFamily + fontFamilyFallbackValue,
			'font-weight': fontWeight,
			'text-transform': textTransform,
			'font-size': valueWithUnit( fontSize, fontSizeUnit ),
			'min-height': valueWithUnit( minHeight, minHeightUnit ),
		} ];

		if ( bgImage && 'element' === bgOptions.selector && backgroundImageValue ) {
			cssObj[ '.gb-container-' + uniqueId ].push( {
				'background-image': backgroundImageValue,
				'background-size': bgOptions.size,
				'background-position': bgOptions.position,
				'background-repeat': bgOptions.repeat,
				'background-attachment': bgOptions.attachment,
			} );
		} else if ( gradient && backgroundImageValue ) {
			cssObj[ '.gb-container-' + uniqueId ].push( {
				'background-image': backgroundImageValue,
			} );
		}

		if ( ( bgImage && 'pseudo-element' === bgOptions.selector ) || zindex ) {
			cssObj[ '.gb-container-' + uniqueId ].push( {
				'position': 'relative', // eslint-disable-line quote-props
			} );
		}

		if ( bgImage && 'pseudo-element' === bgOptions.selector ) {
			cssObj[ '.gb-container-' + uniqueId ].push( {
				'overflow': 'hidden', // eslint-disable-line quote-props
			} );
		}

		cssObj[ `.editor-styles-wrapper .gb-container-` + uniqueId + ` h1,
			.editor-styles-wrapper .gb-container-` + uniqueId + ` h2,
			.editor-styles-wrapper .gb-container-` + uniqueId + ` h3,
			.editor-styles-wrapper .gb-container-` + uniqueId + ` h4,
			.editor-styles-wrapper .gb-container-` + uniqueId + ` h5,
			.editor-styles-wrapper .gb-container-` + uniqueId + ` h6` ] = [ {
			'color': textColor, // eslint-disable-line quote-props
		} ];

		if ( borderSizeTop || borderSizeRight || borderSizeBottom || borderSizeLeft ) {
			cssObj[ '.gb-container-' + uniqueId ].push( {
				'border-width': shorthandCSS( borderSizeTop, borderSizeRight, borderSizeBottom, borderSizeLeft, 'px' ),
				'border-style': 'solid',
				'border-color': hexToRGBA( borderColor, borderColorOpacity ),
			} );
		}

		if ( minHeight && ! isGrid ) {
			cssObj[ '.gb-container-' + uniqueId ].push( {
				'display': 'flex', // eslint-disable-line quote-props
				'flex-direction': 'row',
				'align-items': verticalAlignment,
			} );
		}

		if ( bgImage && 'pseudo-element' === bgOptions.selector ) {
			cssObj[ '.gb-container-' + uniqueId + ':before' ] = [ {
				'content': '""', // eslint-disable-line quote-props
				'background-image': 'url(' + bgImage.image.url + ')',
				'background-repeat': bgOptions.repeat,
				'background-position': bgOptions.position,
				'background-size': bgOptions.size,
				'background-attachment': bgOptions.attachment,
				'z-index': '0',
				'position': 'absolute', // eslint-disable-line quote-props
				'top': '0', // eslint-disable-line quote-props
				'right': '0', // eslint-disable-line quote-props
				'bottom': '0', // eslint-disable-line quote-props
				'left': '0', // eslint-disable-line quote-props
			} ];

			if ( typeof bgOptions.opacity !== 'undefined' && 1 !== bgOptions.opacity ) {
				cssObj[ '.gb-container-' + uniqueId + ':before' ].push( {
					'opacity': bgOptions.opacity, // eslint-disable-line quote-props
				} );
			}
		}

		cssObj[ '.gb-container-' + uniqueId + ' a, .gb-container-' + uniqueId + ' a:visited' ] = [ {
			'color': linkColor, // eslint-disable-line quote-props
		} ];

		cssObj[ '.gb-container-' + uniqueId + ' a:hover' ] = [ {
			'color': linkColorHover, // eslint-disable-line quote-props
		} ];

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

		if ( bgImage && 'pseudo-element' === bgOptions.selector ) {
			cssObj[ '.gb-container-' + uniqueId + ' > .gb-inside-container' ].push( {
				'z-index': '1',
				'position': 'relative', // eslint-disable-line quote-props
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
