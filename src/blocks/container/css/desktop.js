import buildCSS from '../../../utils/build-css';
import shorthandCSS from '../../../utils/shorthand-css';
import flexboxAlignment from '../../../utils/flexbox-alignment';
import hexToRGBA from '../../../components/color-picker/hex-to-rgba';
import valueWithUnit from '../../../utils/value-with-unit';

const { Component } = wp.element;
const { applyFilters } = wp.hooks;

export default class DesktopCSS extends Component {
	constructor( props ) {
		super( ...arguments );
	}

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
			gradientDirection,
			gradientColorOne,
			gradientColorOneOpacity,
			gradientColorStopOne,
			gradientColorTwo,
			gradientColorTwoOpacity,
			gradientColorStopTwo,
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

		let backgroundImageValue,
			gradientColorStopOneValue = '',
			gradientColorStopTwoValue = '';

		if ( gradient ) {
			if ( gradientColorOne && '' !== gradientColorStopOne ) {
				gradientColorStopOneValue = ' ' + gradientColorStopOne + '%';
			}

			if ( gradientColorTwo && '' !== gradientColorStopTwo ) {
				gradientColorStopTwoValue = ' ' + gradientColorStopTwo + '%';
			}
		}

		if ( bgImage ) {
			backgroundImageValue = 'url(' + bgImage.image.url + ')';

			if ( bgOptions.overlay ) {
				if ( gradient ) {
					backgroundImageValue = 'linear-gradient(' + gradientDirection + 'deg, ' + hexToRGBA( gradientColorOne, gradientColorOneOpacity ) + gradientColorStopOneValue + ', ' + hexToRGBA( gradientColorTwo, gradientColorTwoOpacity ) + gradientColorStopTwoValue + '), url(' + bgImage.image.url + ')';
				} else {
					backgroundImageValue = 'linear-gradient(0deg, ' + hexToRGBA( backgroundColor, backgroundColorOpacity ) + ', ' + hexToRGBA( backgroundColor, backgroundColorOpacity ) + '), url(' + bgImage.image.url + ')';
				}
			}
		} else if ( gradient ) {
			backgroundImageValue = 'linear-gradient(' + gradientDirection + 'deg, ' + hexToRGBA( gradientColorOne, gradientColorOneOpacity ) + gradientColorStopOneValue + ', ' + hexToRGBA( gradientColorTwo, gradientColorTwoOpacity ) + gradientColorStopTwoValue + ');';
		}

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
			'color': textColor,
			'background-image': backgroundImageValue,
			'background-size': bgOptions.size,
			'background-position': bgOptions.position,
			'background-repeat': bgOptions.repeat,
			'background-attachment': bgOptions.attachment,
			'border-radius': shorthandCSS( borderRadiusTopLeft, borderRadiusTopRight, borderRadiusBottomRight, borderRadiusBottomLeft, borderRadiusUnit ),
			'margin': shorthandCSS( marginTop, marginRight, marginBottom, marginLeft, marginUnit ),
			'z-index': zindex,
			'position': zindex ? 'relative' : false,
			'text-align': alignment,
			'font-family': fontFamily + fontFamilyFallbackValue,
			'font-weight': fontWeight,
			'text-transform': textTransform,
			'text-align': alignment,
			'font-size': valueWithUnit( fontSize, fontSizeUnit ),
			'min-height': valueWithUnit( minHeight, minHeightUnit ),
		} ];

		cssObj[ `.editor-styles-wrapper .gb-container-` + uniqueId + ` h1,
			.editor-styles-wrapper .gb-container-` + uniqueId + ` h2,
			.editor-styles-wrapper .gb-container-` + uniqueId + ` h3,
			.editor-styles-wrapper .gb-container-` + uniqueId + ` h4,
			.editor-styles-wrapper .gb-container-` + uniqueId + ` h5,
			.editor-styles-wrapper .gb-container-` + uniqueId + ` h6` ] = [ {
			'color': textColor,
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
				'display': 'flex',
				'flex-direction': 'row',
				'align-items': verticalAlignment,
			} );
		}

		cssObj[ '.gb-container-' + uniqueId + ' a, .gb-container-' + uniqueId + ' a:visited' ] = [ {
			'color': linkColor,
		} ];

		cssObj[ '.gb-container-' + uniqueId + ' a:hover' ] = [ {
			'color': linkColorHover,
		} ];

		cssObj[ '.gb-container-' + uniqueId + ' > .gb-inside-container' ] = [ {
			'padding': shorthandCSS( paddingTop, paddingRight, paddingBottom, paddingLeft, paddingUnit ),
			'width': minHeight && ! isGrid ? '100%' : false,
		} ];

		if ( 'contained' === innerContainer && ! isGrid ) {
			cssObj[ '.gb-container-' + uniqueId + ' > .gb-inside-container' ].push( {
				'max-width': valueWithUnit( containerWidthPreview, 'px' ),
				'margin-left': 'auto',
				'margin-right': 'auto',
			} );
		}

		cssObj[ '.gb-grid-wrapper > div > .block-editor-block-list__layout > #block-' + clientId ] = [ {
			'width': valueWithUnit( width, '%' ),
			'display': 'flex',
			'flex-direction': 'column',
			'margin-left': '0px',
			'margin-right': '0px',
		} ];

		cssObj[ '.gb-grid-wrapper > div > .block-editor-block-list__layout > #block-' + clientId + ' > .gb-grid-column' ] = [ {
			'height': '100%',
		} ];

		cssObj[ '.block-editor-block-list__layout > #block-' + clientId ] = [ {
			'max-width': 'contained' === outerContainer && ! isGrid ? valueWithUnit( containerWidthPreview, 'px' ) : false,
			'margin-bottom': removeVerticalGap ? '0px !important' : false,
		} ];

		cssObj[ '.gb-grid-column > .gb-container-' + uniqueId ] = [ {
			'display': 'flex',
			'flex-direction': 'column',
			'height': '100%',
			'justify-content': verticalAlignment,
		} ];

		cssObj[ `.gb-grid-wrapper > div > .block-editor-block-list__layout > #block-` + clientId + ` > .block-editor-block-list__block-edit,
		.gb-grid-wrapper > div > .block-editor-block-list__layout > #block-` + clientId + ` > .block-editor-block-list__block-edit > [data-block="` + clientId + `"],
		.gb-grid-wrapper > div > .block-editor-block-list__layout > #block-` + clientId + ` > .block-editor-block-list__block-edit > [data-block="` + clientId + `"] > .gb-grid-column` ] = [ {
			'height': '100%',
		} ];

		cssObj[ `#block-` + clientId + `:not(.has-child-selected):not(.is-selected) .block-list-appender:not(:first-child),
		#block-` + clientId + `:not(.has-child-selected):not(.is-selected) .block-editor-block-list__layout > div:not(:first-child) > .block-list-appender` ] = [ {
			'display': 'none',
		} ];

		cssObj = applyFilters( 'generateblocks.editor.desktopCSS', cssObj, 'container', this.props );

		return (
			<style>{ buildCSS( cssObj ) }</style>
		);
	}
}
