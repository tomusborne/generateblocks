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

export default class TabletCSS extends Component {
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

		TypographyCSS( cssObj, selector, attributes.typography, 'Tablet' );
		SpacingCSS( cssObj, selector, attributes.spacing, 'Tablet' );
		BorderCSS( cssObj, selector, attributes.borders, 'Tablet' );
		LayoutCSS( cssObj, selector, attributes, 'Tablet' );
		SizingCSS( cssObj, selector, attributes, 'Tablet' );
		FlexChildCSS( cssObj, selector, attributes, 'Tablet' );

		cssObj[ selector + ' .gb-icon' ] = [ {
			'padding-top': ! removeText ? iconStyles?.paddingTopTablet : null,
			'padding-right': ! removeText ? iconStyles?.paddingRightTablet : null,
			'padding-bottom': ! removeText ? iconStyles?.paddingBottomTablet : null,
			'padding-left': ! removeText ? iconStyles?.paddingLeftTablet : null,
		} ];

		cssObj[ selector + ' .gb-icon svg' ] = [ {
			width: iconStyles?.widthTablet,
			height: iconStyles?.heightTablet,
		} ];

		cssObj = applyFilters( 'generateblocks.editor.tabletCSS', cssObj, this.props, 'button' );

		return (
			<style>{ buildCSS( cssObj ) }</style>
		);
	}
}
