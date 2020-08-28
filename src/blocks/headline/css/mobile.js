import buildCSS from '../../../utils/build-css';
import flexboxAlignment from '../../../utils/flexbox-alignment';
import valueWithUnit from '../../../utils/value-with-unit';
import shorthandCSS from '../../../utils/shorthand-css';

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
			'margin': shorthandCSS( marginTopMobile, marginRightMobile, marginBottomValue, marginLeftMobile, marginUnit ) + ' !important', // eslint-disable-line quote-props
			'margin-bottom': marginBottomValue + ' !important', // The unit changes depending on the element if no value exists.
			'padding': shorthandCSS( paddingTopMobile, paddingRightMobile, paddingBottomMobile, paddingLeftMobile, paddingUnit ), // eslint-disable-line quote-props
		} );

		if ( borderSizeTopMobile || borderSizeRightMobile || borderSizeBottomMobile || borderSizeLeftMobile ) {
			cssObj[ headlineStyleSelector ].push( {
				'border-width': shorthandCSS( borderSizeTopMobile, borderSizeRightMobile, borderSizeBottomMobile, borderSizeLeftMobile, 'px' ),
				'border-style': 'solid',
			} );
		}

		cssObj[ '.gb-headline-wrapper-' + uniqueId + ' .gb-icon' ] = [ {
			'padding': ! removeText ? shorthandCSS( iconPaddingTopMobile, iconPaddingRightMobile, iconPaddingBottomMobile, iconPaddingLeftMobile, iconPaddingUnit ) : false, // eslint-disable-line quote-props
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
