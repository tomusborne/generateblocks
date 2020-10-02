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

		let inlineWidthValue = 'inline-block';
		let cssObj = [];

		cssObj[ '.editor-styles-wrapper .gb-headline-' + uniqueId ] = [ {
			'text-align': alignmentMobile,
			'font-size': valueWithUnit( fontSizeMobile, fontSizeUnit ),
			'line-height': valueWithUnit( lineHeightMobile, lineHeightUnit ),
			'letter-spacing': valueWithUnit( letterSpacingMobile, 'em' ),
			display: !! icon ? 'flex' : false,
			'align-items': 'inline' === iconLocationMobile ? flexboxAlignment( iconVerticalAlignmentMobile ) : flexboxAlignment( alignmentMobile ),
			'justify-content': flexboxAlignment( alignmentMobile ),
			'flex-direction': icon && 'above' === iconLocationMobile ? 'column' : false,
			'margin-top': valueWithUnit( marginTopMobile, marginUnit ) + ' !important',
			'margin-right': valueWithUnit( marginRightMobile, marginUnit ) + ' !important',
			'margin-bottom': valueWithUnit( marginBottomMobile, marginUnit ) + ' !important',
			'margin-left': valueWithUnit( marginLeftMobile, marginUnit ) + ' !important',
			'padding-top': valueWithUnit( paddingTopMobile, paddingUnit ),
			'padding-right': valueWithUnit( paddingRightMobile, paddingUnit ),
			'padding-bottom': valueWithUnit( paddingBottomMobile, paddingUnit ),
			'padding-left': valueWithUnit( paddingLeftMobile, paddingUnit ),
		} ];

		if ( icon ) {
			inlineWidthValue = 'inline-flex';

			cssObj[ '.editor-styles-wrapper .gb-headline-' + uniqueId ].push( {
				'display': inlineWidthMobile ? inlineWidthValue : false, // eslint-disable-line quote-props
			} );
		}

		if ( borderSizeTopMobile || borderSizeRightMobile || borderSizeBottomMobile || borderSizeLeftMobile ) {
			cssObj[ '.editor-styles-wrapper .gb-headline-' + uniqueId ].push( {
				'border-top-width': valueWithUnit( borderSizeTopMobile, 'px' ),
				'border-right-width': valueWithUnit( borderSizeRightMobile, 'px' ),
				'border-bottom-width': valueWithUnit( borderSizeBottomMobile, 'px' ),
				'border-left-width': valueWithUnit( borderSizeLeftMobile, 'px' ),
				'border-style': 'solid',
			} );
		}

		cssObj[ '.gb-headline-' + uniqueId + ' .gb-icon' ] = [ {
			'padding-top': ! removeText ? valueWithUnit( iconPaddingTopMobile, iconPaddingUnit ) : false,
			'padding-right': ! removeText ? valueWithUnit( iconPaddingRightMobile, iconPaddingUnit ) : false,
			'padding-bottom': ! removeText ? valueWithUnit( iconPaddingBottomMobile, iconPaddingUnit ) : false,
			'padding-left': ! removeText ? valueWithUnit( iconPaddingLeftMobile, iconPaddingUnit ) : false,
			'align-self': icon && 'above' === iconLocationMobile ? flexboxAlignment( alignmentMobile ) : false,
			'display': icon && 'above' === iconLocationMobile ? 'inline' : false, // eslint-disable-line quote-props
		} ];

		cssObj[ '.gb-headline-' + uniqueId + ' .gb-icon svg' ] = [ {
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
