import buildCSS from '../../../utils/build-css';
import flexboxAlignment from '../../../utils/flexbox-alignment';
import valueWithUnit from '../../../utils/value-with-unit';

import {
	Component,
} from '@wordpress/element';

import {
	applyFilters,
} from '@wordpress/hooks';

export default class TabletCSS extends Component {
	render() {
		const attributes = applyFilters( 'generateblocks.editor.cssAttrs', this.props.attributes, this.props );

		const {
			clientId,
		} = this.props;

		const {
			uniqueId,
			element,
			alignmentTablet,
			fontSizeTablet,
			fontSizeUnit,
			lineHeightTablet,
			lineHeightUnit,
			letterSpacingTablet,
			marginTopTablet,
			marginRightTablet,
			marginBottomTablet,
			marginLeftTablet,
			marginUnit,
			paddingTopTablet,
			paddingRightTablet,
			paddingBottomTablet,
			paddingLeftTablet,
			paddingUnit,
			borderSizeTopTablet,
			borderSizeRightTablet,
			borderSizeBottomTablet,
			borderSizeLeftTablet,
			borderRadiusTopRightTablet,
			borderRadiusBottomRightTablet,
			borderRadiusBottomLeftTablet,
			borderRadiusTopLeftTablet,
			borderRadiusUnit,
			icon,
			iconLocationTablet,
			iconVerticalAlignmentTablet,
			iconPaddingTopTablet,
			iconPaddingRightTablet,
			iconPaddingBottomTablet,
			iconPaddingLeftTablet,
			iconPaddingUnit,
			iconSizeTablet,
			iconSizeUnit,
			inlineWidthTablet,
			removeText,
		} = attributes;

		const selector = element + '.gb-headline-' + uniqueId;
		let inlineWidthValue = 'inline-block';
		let cssObj = [];

		cssObj[ '.editor-styles-wrapper ' + selector ] = [ {
			'text-align': alignmentTablet,
			'font-size': valueWithUnit( fontSizeTablet, fontSizeUnit ),
			'line-height': valueWithUnit( lineHeightTablet, lineHeightUnit ),
			'letter-spacing': valueWithUnit( letterSpacingTablet, 'em' ),
			display: !! icon ? 'flex' : false,
			'align-items': 'inline' === iconLocationTablet ? flexboxAlignment( iconVerticalAlignmentTablet ) : flexboxAlignment( alignmentTablet ),
			'justify-content': flexboxAlignment( alignmentTablet ),
			'flex-direction': icon && 'above' === iconLocationTablet ? 'column' : false,
			'margin-top': valueWithUnit( marginTopTablet, marginUnit ) + ' !important',
			'margin-right': valueWithUnit( marginRightTablet, marginUnit ) + ' !important',
			'margin-bottom': valueWithUnit( marginBottomTablet, marginUnit ) + ' !important',
			'margin-left': valueWithUnit( marginLeftTablet, marginUnit ) + ' !important',
			'padding-top': valueWithUnit( paddingTopTablet, paddingUnit ),
			'padding-right': valueWithUnit( paddingRightTablet, paddingUnit ),
			'padding-bottom': valueWithUnit( paddingBottomTablet, paddingUnit ),
			'padding-left': valueWithUnit( paddingLeftTablet, paddingUnit ),
			'border-top-left-radius': valueWithUnit( borderRadiusTopLeftTablet, borderRadiusUnit ),
			'border-top-right-radius': valueWithUnit( borderRadiusTopRightTablet, borderRadiusUnit ),
			'border-bottom-right-radius': valueWithUnit( borderRadiusBottomRightTablet, borderRadiusUnit ),
			'border-bottom-left-radius': valueWithUnit( borderRadiusBottomLeftTablet, borderRadiusUnit ),
		} ];

		if ( icon ) {
			inlineWidthValue = 'inline-flex';

			cssObj[ '.editor-styles-wrapper ' + selector ].push( {
				'display': inlineWidthTablet ? inlineWidthValue : false, // eslint-disable-line quote-props
			} );
		}

		if ( borderSizeTopTablet || borderSizeRightTablet || borderSizeBottomTablet || borderSizeLeftTablet ) {
			cssObj[ '.editor-styles-wrapper ' + selector ].push( {
				'border-top-width': valueWithUnit( borderSizeTopTablet, 'px' ),
				'border-right-width': valueWithUnit( borderSizeRightTablet, 'px' ),
				'border-bottom-width': valueWithUnit( borderSizeBottomTablet, 'px' ),
				'border-left-width': valueWithUnit( borderSizeLeftTablet, 'px' ),
				'border-style': 'solid',
			} );
		}

		cssObj[ selector + ' .gb-icon' ] = [ {
			'padding-top': ! removeText ? valueWithUnit( iconPaddingTopTablet, iconPaddingUnit ) : false,
			'padding-right': ! removeText ? valueWithUnit( iconPaddingRightTablet, iconPaddingUnit ) : false,
			'padding-bottom': ! removeText ? valueWithUnit( iconPaddingBottomTablet, iconPaddingUnit ) : false,
			'padding-left': ! removeText ? valueWithUnit( iconPaddingLeftTablet, iconPaddingUnit ) : false,
			'align-self': icon && 'above' === iconLocationTablet ? flexboxAlignment( alignmentTablet ) : false,
			'display': icon && 'above' === iconLocationTablet ? 'inline' : false, // eslint-disable-line quote-props
		} ];

		cssObj[ selector + ' .gb-icon svg' ] = [ {
			'width': valueWithUnit( iconSizeTablet, iconSizeUnit ), // eslint-disable-line quote-props
			'height': valueWithUnit( iconSizeTablet, iconSizeUnit ), // eslint-disable-line quote-props
		} ];

		cssObj[ '#block-' + clientId ] = [ {
			'display': inlineWidthTablet ? 'inline-flex' : false, // eslint-disable-line quote-props
		} ];

		cssObj = applyFilters( 'generateblocks.editor.tabletCSS', cssObj, this.props, 'text' );

		return (
			<style>{ buildCSS( cssObj ) }</style>
		);
	}
}
