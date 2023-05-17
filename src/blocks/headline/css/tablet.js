import buildCSS from '../../../utils/build-css';
import LayoutCSS from '../../../extend/inspector-control/controls/layout/components/LayoutCSS';
import FlexChildCSS from '../../../extend/inspector-control/controls/flex-child-panel/components/FlexChildCSS';
import SizingCSS from '../../../extend/inspector-control/controls/sizing/components/SizingCSS';
import SpacingCSS from '../../../extend/inspector-control/controls/spacing/components/SpacingCSS';
import TypographyCSS from '../../../extend/inspector-control/controls/typography/components/TypographyCSS';

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
			removeText,
			displayTablet,
			inlineWidthTablet,
			iconStyles,
		} = attributes;

		const selector = element + '.gb-headline-' + uniqueId;
		let cssObj = [];

		cssObj[ '.editor-styles-wrapper ' + selector ] = [ {
			'padding-top': paddingTopTablet,
			'padding-right': paddingRightTablet,
			'padding-bottom': paddingBottomTablet,
			'padding-left': paddingLeftTablet,
			'border-top-left-radius': borderRadiusTopLeftTablet,
			'border-top-right-radius': borderRadiusTopRightTablet,
			'border-bottom-right-radius': borderRadiusBottomRightTablet,
			'border-bottom-left-radius': borderRadiusBottomLeftTablet,
		} ];

		TypographyCSS( cssObj, '.editor-styles-wrapper ' + selector, attributes.typography, 'Tablet' );
		SpacingCSS( cssObj, '.editor-styles-wrapper ' + selector, attributes, 'Tablet' );
		LayoutCSS( cssObj, '.editor-styles-wrapper ' + selector, attributes, 'Tablet' );
		SizingCSS( cssObj, '.editor-styles-wrapper ' + selector, attributes, 'Tablet' );
		FlexChildCSS( cssObj, '.editor-styles-wrapper ' + selector, attributes, 'Tablet' );

		if ( borderSizeTopTablet || borderSizeRightTablet || borderSizeBottomTablet || borderSizeLeftTablet ) {
			cssObj[ '.editor-styles-wrapper ' + selector ].push( {
				'border-top-width': borderSizeTopTablet,
				'border-right-width': borderSizeRightTablet,
				'border-bottom-width': borderSizeBottomTablet,
				'border-left-width': borderSizeLeftTablet,
				'border-style': 'solid',
			} );
		}

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
