/* eslint-disable quotes */
import buildCSS from '../../../utils/build-css';
import LayoutCSS from '../../../extend/inspector-control/controls/layout/components/LayoutCSS';
import SizingCSS from '../../../extend/inspector-control/controls/sizing/components/SizingCSS';
import FlexChildCSS from '../../../extend/inspector-control/controls/flex-child-panel/components/FlexChildCSS';
import SpacingCSS from '../../../extend/inspector-control/controls/spacing/components/SpacingCSS';
import TypographyCSS from '../../../extend/inspector-control/controls/typography/components/TypographyCSS';
import BorderCSS from '../../../extend/inspector-control/controls/borders/BorderCSS';

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
			uniqueId,
			removeText,
			hasButtonContainer,
			iconStyles,
		} = attributes;

		const containerSelector = !! hasButtonContainer ? '.gb-button-wrapper ' : '';
		let selector = '.gb-button-' + uniqueId;
		selector = '.editor-styles-wrapper ' + containerSelector + selector;

		let cssObj = [];

		TypographyCSS( cssObj, selector, attributes.typography, 'Mobile' );
		SpacingCSS( cssObj, selector, attributes.spacing, 'Mobile' );
		BorderCSS( cssObj, selector, attributes.borders, 'Mobile' );
		LayoutCSS( cssObj, selector, attributes, 'Mobile' );
		SizingCSS( cssObj, selector, attributes, 'Mobile' );
		FlexChildCSS( cssObj, selector, attributes, 'Mobile' );

		cssObj[ selector + ' .gb-icon' ] = [ {
			'padding-top': ! removeText ? iconStyles?.paddingTopMobile : null,
			'padding-right': ! removeText ? iconStyles?.paddingRightMobile : null,
			'padding-bottom': ! removeText ? iconStyles?.paddingBottomMobile : null,
			'padding-left': ! removeText ? iconStyles?.paddingLeftMobile : null,
		} ];

		cssObj[ selector + ' .gb-icon svg' ] = [ {
			width: iconStyles?.widthMobile,
			height: iconStyles?.heightMobile,
		} ];

		cssObj = applyFilters( 'generateblocks.editor.mobileCSS', cssObj, this.props, 'button' );

		return (
			<style>{ buildCSS( cssObj ) }</style>
		);
	}
}
/* eslint-enable quotes */
