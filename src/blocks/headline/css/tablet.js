import buildCSS from '../../../utils/build-css';
import LayoutCSS from '../../../extend/inspector-control/controls/layout/components/LayoutCSS';
import FlexChildCSS from '../../../extend/inspector-control/controls/flex-child-panel/components/FlexChildCSS';
import SizingCSS from '../../../extend/inspector-control/controls/sizing/components/SizingCSS';
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
			clientId,
		} = this.props;

		const {
			uniqueId,
			element,
			removeText,
			displayTablet,
			inlineWidthTablet,
			iconStyles,
		} = attributes;

		const selector = element + '.gb-headline-' + uniqueId;
		let cssObj = [];

		TypographyCSS( cssObj, '.editor-styles-wrapper ' + selector, attributes.typography, 'Tablet' );
		SpacingCSS( cssObj, '.editor-styles-wrapper ' + selector, attributes.spacing, 'Tablet' );
		BorderCSS( cssObj, '.editor-styles-wrapper ' + selector, attributes.borders, 'Tablet' );
		LayoutCSS( cssObj, '.editor-styles-wrapper ' + selector, attributes, 'Tablet' );
		SizingCSS( cssObj, '.editor-styles-wrapper ' + selector, attributes, 'Tablet' );
		FlexChildCSS( cssObj, '.editor-styles-wrapper ' + selector, attributes, 'Tablet' );

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

		if ( inlineWidthTablet ) {
			cssObj[ '.gb-is-root-block[data-block="' + clientId + '"]' ] = [ {
				display: displayTablet,
			} ];
		}

		cssObj = applyFilters( 'generateblocks.editor.tabletCSS', cssObj, this.props, 'text' );

		return (
			<style>{ buildCSS( cssObj ) }</style>
		);
	}
}
