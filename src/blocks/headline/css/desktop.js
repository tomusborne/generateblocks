import buildCSS from '../../../utils/build-css';
import flexboxAlignment from '../../../utils/flexbox-alignment';
import valueWithUnit from '../../../utils/value-with-unit';
import shorthandCSS from '../../../utils/shorthand-css';
import hexToRGBA from '../../../components/color-picker/hex-to-rgba';

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
			iconSizeUnit,
			inlineWidth,
			removeText,
		} = attributes;

		let fontFamilyFallbackValue = '',
			marginBottomValue = '',
			fontSizeValue = '';

		if ( fontFamily && fontFamilyFallback ) {
			fontFamilyFallbackValue = ', ' + fontFamilyFallback;
		}

		if ( marginBottom ) {
			marginBottomValue = marginBottom + marginUnit;
		} else if ( typeof generateBlocksStyling.headline !== 'undefined' && ! removeText ) {
			if ( typeof generateBlocksStyling.headline[ attributes.element ].marginBottom !== 'undefined' && ! isNaN( generateBlocksStyling.headline[ attributes.element ].marginBottom ) ) {
				marginBottomValue = generateBlocksStyling.headline[ element ].marginBottom + generateBlocksStyling.headline[ element ].marginUnit;
			}
		}

		if ( fontSize ) {
			fontSizeValue = fontSize + fontSizeUnit;
		} else if ( typeof generateBlocksStyling.headline !== 'undefined' && ! removeText ) {
			if ( typeof generateBlocksStyling.headline[ attributes.element ].fontSize !== 'undefined' && generateBlocksStyling.headline[ attributes.element ].fontSize ) {
				fontSizeValue = generateBlocksStyling.headline[ element ].fontSize + generateBlocksStyling.headline[ element ].fontSizeUnit;
			}
		}

		let cssObj = [];

		cssObj[ '.editor-styles-wrapper .gb-headline-' + uniqueId ] = [ {
			'color': textColor,
			'font-family' : fontFamily + fontFamilyFallbackValue,
			'font-weight' : fontWeight,
			'text-transform' : textTransform,
			'text-align' : alignment,
			'font-size' : fontSizeValue,
			'line-height': valueWithUnit( lineHeight, lineHeightUnit ),
			'letter-spacing' : valueWithUnit( letterSpacing, 'em' ),
		} ];

		cssObj[ '.editor-styles-wrapper .gb-container .gb-headline-' + uniqueId ] = [ {
			'color': textColor,
		} ];

		cssObj[ '.gb-headline-wrapper-' + uniqueId ] = [ {
			'flex-direction': icon && 'above' === iconLocation ? 'column' : false,
			'justify-content': flexboxAlignment( alignment ),
			'text-align': alignment,
			'align-items': 'inline' === iconLocation ? flexboxAlignment( iconVerticalAlignment ) : flexboxAlignment( alignment ),
			'font-size' : fontSizeValue,
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
			'padding': ! removeText ? shorthandCSS( iconPaddingTop, iconPaddingRight, iconPaddingBottom, iconPaddingLeft, iconPaddingUnit ) : false,
			'align-self': icon && 'above' === iconLocation ? flexboxAlignment( alignment ) : false,
			'color': hexToRGBA( iconColor, iconColorOpacity ),
			'display': icon && 'above' === iconLocation ? 'unset' : false
		} ];

		cssObj[ '.gb-headline-wrapper-' + uniqueId + ' .gb-icon svg' ] = [ {
			'width': valueWithUnit( iconSize, iconSizeUnit ),
			'height': valueWithUnit( iconSize, iconSizeUnit )
		} ];

		cssObj[ '.gb-headline-' + uniqueId + ' .gb-highlight' ] = [ {
			'color': highlightTextColor
		} ];

		cssObj[ '#block-' + clientId ] = [ {
			'display': inlineWidth ? 'inline-flex' : false
		} ];

		cssObj = applyFilters( 'generateblocks.editor.desktopCSS', cssObj, 'headline', this.props );

		return (
			<style>{ buildCSS( cssObj ) }</style>
		);
	}
}
