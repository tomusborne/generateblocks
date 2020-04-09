import buildCSS from '../../../utils/build-css';
import flexboxAlignment from '../../../utils/flexbox-alignment';
import valueWithUnit from '../../../utils/value-with-unit';
import shorthandCSS from '../../../utils/shorthand-css';
import hexToRGBA from '../../../components/color-picker/hex-to-rgba';

const { Component } = wp.element;

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
			element,
			alignment,
			backgroundColor,
			backgroundColorOpacity,
			textColor,
			linkColor,
			linkColorHover,
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
			inlineWidth,
		} = attributes;

		let fontFamilyFallbackValue = '',
			marginBottomValue = '';

		if ( fontFamily && fontFamilyFallback ) {
			fontFamilyFallbackValue = ', ' + fontFamilyFallback;
		}

		if ( marginBottom ) {
			marginBottomValue = marginBottom + marginUnit;
		} else if ( typeof generateBlocksStyling.headline !== 'undefined' ) {
			if ( 'p' === element ) {
				marginBottomValue = generateBlocksStyling.headline.paragraphMargin;
			} else if ( 'h1' === element ) {
				marginBottomValue = generateBlocksStyling.headline.h1Margin;
			} else if ( 'h2' === element ) {
				marginBottomValue = generateBlocksStyling.headline.h2Margin;
			} else if ( 'h3' === element ) {
				marginBottomValue = generateBlocksStyling.headline.h3Margin;
			} else if ( 'h4' === element ) {
				marginBottomValue = generateBlocksStyling.headline.h4Margin;
			} else if ( 'h5' === element ) {
				marginBottomValue = generateBlocksStyling.headline.h5Margin;
			} else if ( 'h6' === element ) {
				marginBottomValue = generateBlocksStyling.headline.h6Margin;
			}
		}

		let cssObj = [];

		cssObj[ '.editor-styles-wrapper .gb-headline-' + uniqueId ] = [ {
			'font-family' : fontFamily + fontFamilyFallbackValue,
			'font-weight' : fontWeight,
			'text-transform' : textTransform,
			'text-align' : alignment,
			'font-size' : valueWithUnit( fontSize, fontSizeUnit ),
			'line-height': valueWithUnit( lineHeight, lineHeightUnit ),
			'letter-spacing' : valueWithUnit( letterSpacing, 'em' ),
		} ];

		cssObj[ '.gb-headline-wrapper-' + uniqueId ] = [ {
			'flex-direction': icon && 'above' === iconLocation ? 'column' : false,
			'justify-content': flexboxAlignment( alignment ),
			'text-align': alignment,
			'align-items': 'inline' === iconLocation ? iconVerticalAlignment : flexboxAlignment( alignment ),
		} ];

		let headlineStyleSelector = '.editor-styles-wrapper .gb-headline-' + uniqueId;

		if ( icon ) {
			headlineStyleSelector = '.gb-headline-wrapper-' + uniqueId;
		}

		cssObj[ headlineStyleSelector ].push( {
			'background-color': hexToRGBA( backgroundColor, backgroundColorOpacity ),
			'color': textColor,
			'display': inlineWidth ? 'inline-flex' : false,
			'margin': shorthandCSS( marginTop, marginRight, marginBottomValue, marginLeft, marginUnit ) + ' !important',
			'margin-bottom': marginBottomValue + ' !important', // The unit changes depending on the element if no value exists.
			'padding': shorthandCSS( paddingTop, paddingRight, paddingBottom, paddingLeft, paddingUnit ),
		} );

		if ( borderSizeTop || borderSizeRight || borderSizeBottom || borderSizeLeft ) {
			cssObj[ headlineStyleSelector ].push( {
				'border-width' : shorthandCSS( borderSizeTop, borderSizeRight, borderSizeBottom, borderSizeLeft, 'px' ),
				'border-style' : 'solid',
				'border-color' : hexToRGBA( borderColor, borderColorOpacity )
			} );
		}

		cssObj[ '.editor-styles-wrapper .gb-headline-' + uniqueId + ' a' ] = [ {
			'color' : linkColor,
		} ];

		cssObj[ '.gb-headline-wrapper-' + uniqueId + ' .gb-icon' ] = [ {
			'padding': shorthandCSS( iconPaddingTop, iconPaddingRight, iconPaddingBottom, iconPaddingLeft, iconPaddingUnit ),
			'align-self': icon && 'above' === iconLocation ? flexboxAlignment( alignment ) : false,
			'color': hexToRGBA( iconColor, iconColorOpacity ),
			'font-size': valueWithUnit( fontSize, fontSizeUnit ),
			'display': icon && 'above' === iconLocation ? 'unset' : false
		} ];

		cssObj[ '.gb-headline-wrapper-' + uniqueId + ' .gb-icon svg' ] = [ {
			'width': valueWithUnit( iconSize, 'em' ),
			'height': valueWithUnit( iconSize, 'em' )
		} ];

		cssObj[ '.gb-headline-` + uniqueId + ` .gb-highlight' ] = [ {
			'color': highlightTextColor
		} ];

		cssObj[ '#block-' + clientId ] = [ {
			'display': inlineWidth ? 'inline-flex' : false
		} ];

		return (
			<style>{ buildCSS( cssObj ) }</style>
		);
	}
}
