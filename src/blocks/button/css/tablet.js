/* eslint-disable quotes */
import buildCSS from '../../../utils/build-css';
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
			url,
			uniqueId,
			removeText,
			letterSpacingTablet,
			fontSizeTablet,
			fontSizeUnit,
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
			iconPaddingTopTablet,
			iconPaddingRightTablet,
			iconPaddingBottomTablet,
			iconPaddingLeftTablet,
			iconPaddingUnit,
			iconSizeTablet,
			iconSizeUnit,
		} = attributes;

		let selector = 'a.gb-button-' + uniqueId;

		if ( ! url ) {
			selector = '.gb-button-' + uniqueId;
		}

		let cssObj = [];

		cssObj[ '.block-editor-block-list__block ' + selector ] = [ {
			'padding-top': valueWithUnit( paddingTopTablet, paddingUnit ),
			'padding-right': valueWithUnit( paddingRightTablet, paddingUnit ),
			'padding-bottom': valueWithUnit( paddingBottomTablet, paddingUnit ),
			'padding-left': valueWithUnit( paddingLeftTablet, paddingUnit ),
			'border-top-left-radius': valueWithUnit( borderRadiusTopLeftTablet, borderRadiusUnit ),
			'border-top-right-radius': valueWithUnit( borderRadiusTopRightTablet, borderRadiusUnit ),
			'border-bottom-right-radius': valueWithUnit( borderRadiusBottomRightTablet, borderRadiusUnit ),
			'border-bottom-left-radius': valueWithUnit( borderRadiusBottomLeftTablet, borderRadiusUnit ),
			'font-size': valueWithUnit( fontSizeTablet, fontSizeUnit ),
			'letter-spacing': valueWithUnit( letterSpacingTablet, 'em' ),
			'margin-top': valueWithUnit( marginTopTablet, marginUnit ),
			'margin-right': valueWithUnit( marginRightTablet, marginUnit ),
			'margin-bottom': valueWithUnit( marginBottomTablet, marginUnit ),
			'margin-left': valueWithUnit( marginLeftTablet, marginUnit ),
		} ];

		if ( borderSizeTopTablet || borderSizeRightTablet || borderSizeBottomTablet || borderSizeLeftTablet ) {
			cssObj[ '.block-editor-block-list__block ' + selector ].push( {
				'border-top-width': valueWithUnit( borderSizeTopTablet, 'px' ),
				'border-right-width': valueWithUnit( borderSizeRightTablet, 'px' ),
				'border-bottom-width': valueWithUnit( borderSizeBottomTablet, 'px' ),
				'border-left-width': valueWithUnit( borderSizeLeftTablet, 'px' ),
				'border-style': 'solid',
			} );
		}

		cssObj[ '.block-editor-block-list__block ' + selector + ' .gb-icon' ] = [ {
			'padding-top': ! removeText ? valueWithUnit( iconPaddingTopTablet, iconPaddingUnit ) : false,
			'padding-right': ! removeText ? valueWithUnit( iconPaddingRightTablet, iconPaddingUnit ) : false,
			'padding-bottom': ! removeText ? valueWithUnit( iconPaddingBottomTablet, iconPaddingUnit ) : false,
			'padding-left': ! removeText ? valueWithUnit( iconPaddingLeftTablet, iconPaddingUnit ) : false,
			'font-size': valueWithUnit( iconSizeTablet, iconSizeUnit ),
		} ];

		cssObj = applyFilters( 'generateblocks.editor.tabletCSS', cssObj, this.props, 'button' );

		return (
			<style>{ buildCSS( cssObj ) }</style>
		);
	}
}
/* eslint-enable quotes */
