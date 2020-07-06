/* eslint-disable quotes */
import buildCSS from '../../../utils/build-css';
import valueWithUnit from '../../../utils/value-with-unit';
import shorthandCSS from '../../../utils/shorthand-css';
import hexToRGBA from '../../../utils/hex-to-rgba';

const { Component } = wp.element;
const { applyFilters } = wp.hooks;

export default class DesktopCSS extends Component {
	render() {
		const {
			attributes,
		} = this.props;

		const {
			uniqueId,
			removeText,
			backgroundColor,
			backgroundColorOpacity,
			textColor,
			backgroundColorHover,
			backgroundColorHoverOpacity,
			textColorHover,
			fontFamily,
			fontFamilyFallback,
			fontWeight,
			textTransform,
			letterSpacing,
			fontSize,
			fontSizeUnit,
			marginTop,
			marginRight,
			marginBottom,
			marginLeft,
			marginUnit,
			paddingTop,
			paddingRight,
			paddingBottom,
			paddingLeft,
			paddingUnit,
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
			borderColorHover,
			borderColorHoverOpacity,
			gradient,
			gradientDirection,
			gradientColorOne,
			gradientColorOneOpacity,
			gradientColorStopOne,
			gradientColorTwo,
			gradientColorTwoOpacity,
			gradientColorStopTwo,
			iconPaddingTop,
			iconPaddingRight,
			iconPaddingBottom,
			iconPaddingLeft,
			iconPaddingUnit,
			iconSize,
			iconSizeUnit,
		} = attributes;

		let fontFamilyFallbackValue = '',
			backgroundImageValue,
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

		if ( gradient ) {
			backgroundImageValue = 'linear-gradient(' + gradientDirection + 'deg, ' + hexToRGBA( gradientColorOne, gradientColorOneOpacity ) + gradientColorStopOneValue + ', ' + hexToRGBA( gradientColorTwo, gradientColorTwoOpacity ) + gradientColorStopTwoValue + ');';
		}

		if ( fontFamily && fontFamilyFallback ) {
			fontFamilyFallbackValue = ', ' + fontFamilyFallback;
		}

		let cssObj = [];

		cssObj[ '.block-editor-block-list__block a.gb-button-' + uniqueId ] = [ {
			'background-color': hexToRGBA( backgroundColor, backgroundColorOpacity ),
			'background-image': backgroundImageValue,
			'color': textColor, // eslint-disable-line quote-props
			'padding': shorthandCSS( paddingTop, paddingRight, paddingBottom, paddingLeft, paddingUnit ), // eslint-disable-line quote-props
			'border-radius': shorthandCSS( borderRadiusTopLeft, borderRadiusTopRight, borderRadiusBottomRight, borderRadiusBottomLeft, borderRadiusUnit ),
			'font-family': fontFamily + fontFamilyFallbackValue,
			'font-weight': fontWeight,
			'text-transform': textTransform,
			'font-size': valueWithUnit( fontSize, fontSizeUnit ),
			'letter-spacing': valueWithUnit( letterSpacing, 'em' ),
			'margin': shorthandCSS( marginTop, marginRight, marginBottom, marginLeft, marginUnit ), // eslint-disable-line quote-props
		} ];

		if ( borderSizeTop || borderSizeRight || borderSizeBottom || borderSizeLeft ) {
			cssObj[ '.block-editor-block-list__block a.gb-button-' + uniqueId ].push( {
				'border-width': shorthandCSS( borderSizeTop, borderSizeRight, borderSizeBottom, borderSizeLeft, 'px' ),
				'border-style': 'solid',
				'border-color': hexToRGBA( borderColor, borderColorOpacity ),
			} );
		}

		cssObj[ `.block-editor-block-list__block a.gb-button-` + uniqueId + `:hover,
		.block-editor-block-list__block a.gb-button-` + uniqueId + `:focus,
		.block-editor-block-list__block a.gb-button-` + uniqueId + `:active` ] = [ {
			'background-color': hexToRGBA( backgroundColorHover, backgroundColorHoverOpacity ),
			'color': textColorHover, // eslint-disable-line quote-props
			'border-color': hexToRGBA( borderColorHover, borderColorHoverOpacity ),
		} ];

		cssObj[ '.block-editor-block-list__block a.gb-button-' + uniqueId + ' .gb-icon' ] = [ {
			'padding': ! removeText ? shorthandCSS( iconPaddingTop, iconPaddingRight, iconPaddingBottom, iconPaddingLeft, iconPaddingUnit ) : false, // eslint-disable-line quote-props
			'font-size': valueWithUnit( iconSize, iconSizeUnit ),
		} ];

		cssObj = applyFilters( 'generateblocks.editor.desktopCSS', cssObj, this.props, 'button' );

		return (
			<style>{ buildCSS( cssObj ) }</style>
		);
	}
}
/* eslint-enable quotes */
