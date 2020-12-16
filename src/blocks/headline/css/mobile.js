import buildCSS from '../../../utils/build-css';
import flexboxAlignment from '../../../utils/flexbox-alignment';
import valueWithUnit from '../../../utils/value-with-unit';

import {
	Component,
} from '@wordpress/element';

import {
	applyFilters,
} from '@wordpress/hooks';

export default class MobileCSS extends Component {
	render() {
		const attributes = applyFilters( 'generateblocks.editor.cssAttrs', this.props.attributes, this.props );

		const {
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
			borderRadiusTopRightMobile,
			borderRadiusBottomRightMobile,
			borderRadiusBottomLeftMobile,
			borderRadiusTopLeftMobile,
			borderRadiusUnit,
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

		const selector = element + '.gb-headline-' + uniqueId;
		let inlineWidthValue = 'inline-block';
		let cssObj = [];

		cssObj[ '.editor-styles-wrapper ' + selector ] = [ {
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
			'border-top-left-radius': valueWithUnit( borderRadiusTopLeftMobile, borderRadiusUnit ),
			'border-top-right-radius': valueWithUnit( borderRadiusTopRightMobile, borderRadiusUnit ),
			'border-bottom-right-radius': valueWithUnit( borderRadiusBottomRightMobile, borderRadiusUnit ),
			'border-bottom-left-radius': valueWithUnit( borderRadiusBottomLeftMobile, borderRadiusUnit ),
		} ];

		if ( icon ) {
			inlineWidthValue = 'inline-flex';

			cssObj[ '.editor-styles-wrapper ' + selector ].push( {
				'display': inlineWidthMobile ? inlineWidthValue : false, // eslint-disable-line quote-props
			} );
		}

		if ( borderSizeTopMobile || borderSizeRightMobile || borderSizeBottomMobile || borderSizeLeftMobile ) {
			cssObj[ '.editor-styles-wrapper ' + selector ].push( {
				'border-top-width': valueWithUnit( borderSizeTopMobile, 'px' ),
				'border-right-width': valueWithUnit( borderSizeRightMobile, 'px' ),
				'border-bottom-width': valueWithUnit( borderSizeBottomMobile, 'px' ),
				'border-left-width': valueWithUnit( borderSizeLeftMobile, 'px' ),
				'border-style': 'solid',
			} );
		}

		cssObj[ selector + ' .gb-icon' ] = [ {
			'padding-top': ! removeText ? valueWithUnit( iconPaddingTopMobile, iconPaddingUnit ) : false,
			'padding-right': ! removeText ? valueWithUnit( iconPaddingRightMobile, iconPaddingUnit ) : false,
			'padding-bottom': ! removeText ? valueWithUnit( iconPaddingBottomMobile, iconPaddingUnit ) : false,
			'padding-left': ! removeText ? valueWithUnit( iconPaddingLeftMobile, iconPaddingUnit ) : false,
			'align-self': icon && 'above' === iconLocationMobile ? flexboxAlignment( alignmentMobile ) : false,
			'display': icon && 'above' === iconLocationMobile ? 'inline' : false, // eslint-disable-line quote-props
		} ];

		cssObj[ selector + ' .gb-icon svg' ] = [ {
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
