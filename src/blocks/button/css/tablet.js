/* eslint-disable quotes */
import buildCSS from '../../../utils/build-css';
import valueWithUnit from '../../../utils/value-with-unit';
import LayoutCSS from '../../../extend/inspector-control/controls/layout/components/LayoutCSS';
import SizingCSS from '../../../extend/inspector-control/controls/sizing/components/SizingCSS';
import FlexChildCSS from '../../../extend/inspector-control/controls/flex-child-panel/components/FlexChildCSS';
import SpacingCSS from '../../../extend/inspector-control/controls/spacing/components/SpacingCSS';

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
			uniqueId,
			removeText,
			letterSpacingTablet,
			fontSizeTablet,
			fontSizeUnit,
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
			hasButtonContainer,
			alignmentTablet,
		} = attributes;

		const containerSelector = !! hasButtonContainer ? '.gb-button-wrapper ' : '';
		let selector = '.gb-button-' + uniqueId;
		selector = '.editor-styles-wrapper ' + containerSelector + selector;

		let cssObj = [];

		cssObj[ selector ] = [ {
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
			'text-align': alignmentTablet,
		} ];

		SpacingCSS( cssObj, selector, attributes, 'Tablet' );
		LayoutCSS( cssObj, selector, attributes, 'Tablet' );
		SizingCSS( cssObj, selector, attributes, 'Tablet' );
		FlexChildCSS( cssObj, selector, attributes, 'Tablet' );

		if ( borderSizeTopTablet || borderSizeRightTablet || borderSizeBottomTablet || borderSizeLeftTablet ) {
			cssObj[ selector ].push( {
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
			'font-size': valueWithUnit( iconSizeTablet, iconSizeUnit ),
		} ];

		cssObj = applyFilters( 'generateblocks.editor.tabletCSS', cssObj, this.props, 'button' );

		return (
			<style>{ buildCSS( cssObj ) }</style>
		);
	}
}
/* eslint-enable quotes */
