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
			borderSizeTopTablet,
			borderSizeRightTablet,
			borderSizeBottomTablet,
			borderSizeLeftTablet,
			borderRadiusTopRightTablet,
			borderRadiusBottomRightTablet,
			borderRadiusBottomLeftTablet,
			borderRadiusTopLeftTablet,
			iconPaddingTopTablet,
			iconPaddingRightTablet,
			iconPaddingBottomTablet,
			iconPaddingLeftTablet,
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
			'padding-top': paddingTopTablet,
			'padding-right': paddingRightTablet,
			'padding-bottom': paddingBottomTablet,
			'padding-left': paddingLeftTablet,
			'border-top-left-radius': borderRadiusTopLeftTablet,
			'border-top-right-radius': borderRadiusTopRightTablet,
			'border-bottom-right-radius': borderRadiusBottomRightTablet,
			'border-bottom-left-radius': borderRadiusBottomLeftTablet,
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
				'border-top-width': borderSizeTopTablet,
				'border-right-width': borderSizeRightTablet,
				'border-bottom-width': borderSizeBottomTablet,
				'border-left-width': borderSizeLeftTablet,
				'border-style': 'solid',
			} );
		}

		cssObj[ selector + ' .gb-icon' ] = [ {
			'padding-top': ! removeText ? iconPaddingTopTablet : false,
			'padding-right': ! removeText ? iconPaddingRightTablet : false,
			'padding-bottom': ! removeText ? iconPaddingBottomTablet : false,
			'padding-left': ! removeText ? iconPaddingLeftTablet : false,
			'font-size': valueWithUnit( iconSizeTablet, iconSizeUnit ),
		} ];

		cssObj = applyFilters( 'generateblocks.editor.tabletCSS', cssObj, this.props, 'button' );

		return (
			<style>{ buildCSS( cssObj ) }</style>
		);
	}
}
/* eslint-enable quotes */
