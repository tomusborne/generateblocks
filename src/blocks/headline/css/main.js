import buildCSS from '../../../utils/build-css';
import flexboxAlignment from '../../../utils/flexbox-alignment';
import valueWithUnit from '../../../utils/value-with-unit';
import shorthandCSS from '../../../utils/shorthand-css';
import hexToRGBA from '../../../utils/hex-to-rgba';

import {
	Component,
} from '@wordpress/element';

import {
	applyFilters,
} from '@wordpress/hooks';

export default class MainCSS extends Component {
	render() {
		const attributes = applyFilters( 'generateblocks.editor.cssAttrs', this.props.attributes, this.props );

		const {
			clientId,
		} = this.props;

		const {
			uniqueId,
			element,
			alignment,
			backgroundColor,
			backgroundColorOpacity,
			textColor,
			linkColor,
			borderColor,
			borderColorOpacity,
			highlightTextColor,
			fontFamily,
			fontFamilyFallback,
			fontWeight,
			fontSize,
			fontSizeUnit,
			textTransform,
			lineHeight,
			lineHeightUnit,
			letterSpacing,
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
			icon,
			iconColor,
			iconColorOpacity,
			iconLocation,
			iconVerticalAlignment,
			iconPaddingTop,
			iconPaddingRight,
			iconPaddingBottom,
			iconPaddingLeft,
			iconPaddingUnit,
			iconSize,
			iconSizeUnit,
			inlineWidth,
			removeText,
		} = attributes;

		let fontFamilyFallbackValue = '',
			inlineWidthValue = 'inline-block';

		if ( fontFamily && fontFamilyFallback ) {
			fontFamilyFallbackValue = ', ' + fontFamilyFallback;
		}

		const selector = element + '.gb-headline-' + uniqueId;

		let cssObj = [];

		cssObj[ '.editor-styles-wrapper ' + selector ] = [ {
			color: textColor,
			'font-family': fontFamily + fontFamilyFallbackValue,
			'font-weight': fontWeight,
			'text-transform': textTransform,
			'text-align': alignment,
			'font-size': valueWithUnit( fontSize, fontSizeUnit ),
			'line-height': valueWithUnit( lineHeight, lineHeightUnit ),
			'letter-spacing': valueWithUnit( letterSpacing, 'em' ),
			display: !! icon ? 'flex' : false,
			'align-items': 'inline' === iconLocation ? flexboxAlignment( iconVerticalAlignment ) : flexboxAlignment( alignment ),
			'justify-content': flexboxAlignment( alignment ),
			'flex-direction': icon && 'above' === iconLocation ? 'column' : false,
		} ];

		cssObj[ '.editor-styles-wrapper .gb-container ' + selector ] = [ {
			color: textColor,
		} ];

		if ( icon ) {
			inlineWidthValue = 'inline-flex';
		}

		cssObj[ '.editor-styles-wrapper ' + selector ].push( {
			'background-color': hexToRGBA( backgroundColor, backgroundColorOpacity ),
			'color': textColor, // eslint-disable-line quote-props
			'display': inlineWidth ? inlineWidthValue : false, // eslint-disable-line quote-props
			'margin-top': valueWithUnit( marginTop, marginUnit ),
			'margin-right': valueWithUnit( marginRight, marginUnit ),
			'margin-bottom': valueWithUnit( marginBottom, marginUnit ),
			'margin-left': valueWithUnit( marginLeft, marginUnit ),
			'padding': shorthandCSS( paddingTop, paddingRight, paddingBottom, paddingLeft, paddingUnit ), // eslint-disable-line quote-props
			'border-radius': shorthandCSS( borderRadiusTopLeft, borderRadiusTopRight, borderRadiusBottomRight, borderRadiusBottomLeft, borderRadiusUnit ),
			'border-color': hexToRGBA( borderColor, borderColorOpacity ),
		} );

		if ( borderSizeTop || borderSizeRight || borderSizeBottom || borderSizeLeft ) {
			cssObj[ '.editor-styles-wrapper ' + selector ].push( {
				'border-width': shorthandCSS( borderSizeTop, borderSizeRight, borderSizeBottom, borderSizeLeft, 'px' ),
				'border-style': 'solid',
			} );
		}

		cssObj[ '.editor-styles-wrapper ' + selector + ' a' ] = [ {
			'color': linkColor, // eslint-disable-line quote-props
		} ];

		cssObj[ selector + ' .gb-icon' ] = [ {
			'padding': ! removeText ? shorthandCSS( iconPaddingTop, iconPaddingRight, iconPaddingBottom, iconPaddingLeft, iconPaddingUnit ) : false, // eslint-disable-line quote-props
			'align-self': icon && 'above' === iconLocation ? flexboxAlignment( alignment ) : false,
			'color': hexToRGBA( iconColor, iconColorOpacity ), // eslint-disable-line quote-props
			'display': icon && 'above' === iconLocation ? 'inline' : false, // eslint-disable-line quote-props
		} ];

		cssObj[ selector + ' .gb-icon svg' ] = [ {
			'width': valueWithUnit( iconSize, iconSizeUnit ), // eslint-disable-line quote-props
			'height': valueWithUnit( iconSize, iconSizeUnit ), // eslint-disable-line quote-props
		} ];

		cssObj[ selector + ' .gb-highlight' ] = [ {
			'color': highlightTextColor, // eslint-disable-line quote-props
		} ];

		cssObj[ '#block-' + clientId ] = [ {
			'display': inlineWidth ? 'inline-flex' : false, // eslint-disable-line quote-props
		} ];

		cssObj = applyFilters( 'generateblocks.editor.mainCSS', cssObj, this.props, 'headline' );

		return (
			<style>{ buildCSS( cssObj ) }</style>
		);
	}
}
