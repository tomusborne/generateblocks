import buildCSS from '../../../utils/build-css';
import flexboxAlignment from '../../../utils/flexbox-alignment';
import valueWithUnit from '../../../utils/value-with-unit';

const { Component } = wp.element;
const { applyFilters } = wp.hooks;

export default class MobileCSS extends Component {
	render() {
		const {
			attributes,
			clientId,
		} = this.props;

		const {
			uniqueId,
			element,
			alignmentMobile,
			fontSizeMobile,
			fontSizeUnit,
			lineHeightMobile,
			lineHeightUnit,
			letterSpacingMobile,
			marginTopMobile,
			marginRightMobile,
			marginBottomMobile,
			marginLeftMobile,
			marginUnit,
			paddingTopMobile,
			paddingRightMobile,
			paddingBottomMobile,
			paddingLeftMobile,
			paddingUnit,
			borderSizeTopMobile,
			borderSizeRightMobile,
			borderSizeBottomMobile,
			borderSizeLeftMobile,
			icon,
			iconLocationMobile,
			iconVerticalAlignmentMobile,
			iconPaddingTopMobile,
			iconPaddingRightMobile,
			iconPaddingBottomMobile,
			iconPaddingLeftMobile,
			iconPaddingUnit,
			iconSizeMobile,
			iconSizeUnit,
			inlineWidthMobile,
			removeText,
		} = attributes;

		let marginBottomValue = '',
			fontSizeValue = '',
			inlineWidthValue = 'inline-block';

		if ( marginBottomMobile ) {
			marginBottomValue = marginBottomMobile + marginUnit;
		} else if ( typeof generateBlocksStyling.headline !== 'undefined' && ! removeText ) {
			if ( typeof generateBlocksStyling.headline[ attributes.element ].marginBottomMobile !== 'undefined' && ! isNaN( generateBlocksStyling.headline[ attributes.element ].marginBottomMobile ) ) {
				marginBottomValue = generateBlocksStyling.headline[ element ].marginBottomMobile + generateBlocksStyling.headline[ element ].marginUnit;
			}
		}

		if ( fontSizeMobile ) {
			fontSizeValue = fontSizeMobile + fontSizeUnit;
		} else if ( typeof generateBlocksStyling.headline !== 'undefined' && ! removeText ) {
			if ( typeof generateBlocksStyling.headline[ attributes.element ].fontSizeMobile !== 'undefined' && generateBlocksStyling.headline[ attributes.element ].fontSizeMobile ) {
				fontSizeValue = generateBlocksStyling.headline[ element ].fontSizeMobile + generateBlocksStyling.headline[ element ].fontSizeUnit;
			}
		}

		let cssObj = [];

		cssObj[ '.editor-styles-wrapper .gb-headline-' + uniqueId ] = [ {
			'text-align': alignmentMobile,
			'font-size': fontSizeValue,
			'line-height': valueWithUnit( lineHeightMobile, lineHeightUnit ),
			'letter-spacing': valueWithUnit( letterSpacingMobile, 'em' ),
		} ];

		cssObj[ '.gb-headline-wrapper-' + uniqueId ] = [ {
			'flex-direction': icon && 'above' === iconLocationMobile ? 'column' : false,
			'justify-content': flexboxAlignment( alignmentMobile ),
			'text-align': alignmentMobile,
			'align-items': 'inline' === iconLocationMobile ? flexboxAlignment( iconVerticalAlignmentMobile ) : flexboxAlignment( alignmentMobile ),
			'font-size': fontSizeValue,
		} ];

		let headlineStyleSelector = '.editor-styles-wrapper .gb-headline-' + uniqueId;

		if ( icon ) {
			headlineStyleSelector = '.gb-headline-wrapper-' + uniqueId;
			inlineWidthValue = 'inline-flex';
		}

		cssObj[ headlineStyleSelector ].push( {
			'display': inlineWidthMobile ? inlineWidthValue : false, // eslint-disable-line quote-props
			'margin-top': valueWithUnit( marginTopMobile, marginUnit ) + ' !important',
			'margin-right': valueWithUnit( marginRightMobile, marginUnit ) + ' !important',
			'margin-bottom': marginBottomValue + ' !important',
			'margin-left': valueWithUnit( marginLeftMobile, marginUnit ) + ' !important',
			'padding-top': valueWithUnit( paddingTopMobile, paddingUnit ),
			'padding-right': valueWithUnit( paddingRightMobile, paddingUnit ),
			'padding-bottom': valueWithUnit( paddingBottomMobile, paddingUnit ),
			'padding-left': valueWithUnit( paddingLeftMobile, paddingUnit ),
		} );

		if ( borderSizeTopMobile || borderSizeRightMobile || borderSizeBottomMobile || borderSizeLeftMobile ) {
			cssObj[ headlineStyleSelector ].push( {
				'border-top-width': valueWithUnit( borderSizeTopMobile, 'px' ),
				'border-right-width': valueWithUnit( borderSizeRightMobile, 'px' ),
				'border-bottom-width': valueWithUnit( borderSizeBottomMobile, 'px' ),
				'border-left-width': valueWithUnit( borderSizeLeftMobile, 'px' ),
				'border-style': 'solid',
			} );
		}

		cssObj[ '.gb-headline-wrapper-' + uniqueId + ' .gb-icon' ] = [ {
			'padding-top': ! removeText ? valueWithUnit( iconPaddingTopMobile, iconPaddingUnit ) : false,
			'padding-right': ! removeText ? valueWithUnit( iconPaddingRightMobile, iconPaddingUnit ) : false,
			'padding-bottom': ! removeText ? valueWithUnit( iconPaddingBottomMobile, iconPaddingUnit ) : false,
			'padding-left': ! removeText ? valueWithUnit( iconPaddingLeftMobile, iconPaddingUnit ) : false,
			'align-self': icon && 'above' === iconLocationMobile ? flexboxAlignment( alignmentMobile ) : false,
			'display': icon && 'above' === iconLocationMobile ? 'inline' : false, // eslint-disable-line quote-props
		} ];

		cssObj[ '.gb-headline-wrapper-' + uniqueId + ' .gb-icon svg' ] = [ {
			'width': valueWithUnit( iconSizeMobile, iconSizeUnit ), // eslint-disable-line quote-props
			'height': valueWithUnit( iconSizeMobile, iconSizeUnit ), // eslint-disable-line quote-props
		} ];

		cssObj[ '#block-' + clientId ] = [ {
			'display': inlineWidthMobile ? 'inline-flex' : false, // eslint-disable-line quote-props
		} ];

		cssObj = applyFilters( 'generateblocks.editor.mobileCSS', cssObj, this.props, 'headline' );

		return (
			<style>{ buildCSS( cssObj ) }</style>
		);
	}
}
