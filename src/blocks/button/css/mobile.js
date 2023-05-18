/* eslint-disable quotes */
import buildCSS from '../../../utils/build-css';
import LayoutCSS from '../../../extend/inspector-control/controls/layout/components/LayoutCSS';
import SizingCSS from '../../../extend/inspector-control/controls/sizing/components/SizingCSS';
import FlexChildCSS from '../../../extend/inspector-control/controls/flex-child-panel/components/FlexChildCSS';
import SpacingCSS from '../../../extend/inspector-control/controls/spacing/components/SpacingCSS';
import TypographyCSS from '../../../extend/inspector-control/controls/typography/components/TypographyCSS';

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
			paddingTopMobile,
			paddingRightMobile,
			paddingBottomMobile,
			paddingLeftMobile,
			borderSizeTopMobile,
			borderSizeRightMobile,
			borderSizeBottomMobile,
			borderSizeLeftMobile,
			borderRadiusTopRightMobile,
			borderRadiusBottomRightMobile,
			borderRadiusBottomLeftMobile,
			borderRadiusTopLeftMobile,
			hasButtonContainer,
			iconStyles,
		} = attributes;

		const containerSelector = !! hasButtonContainer ? '.gb-button-wrapper ' : '';
		let selector = '.gb-button-' + uniqueId;
		selector = '.editor-styles-wrapper ' + containerSelector + selector;

		let cssObj = [];

		cssObj[ selector ] = [ {
			'padding-top': paddingTopMobile,
			'padding-right': paddingRightMobile,
			'padding-bottom': paddingBottomMobile,
			'padding-left': paddingLeftMobile,
			'border-top-left-radius': borderRadiusTopLeftMobile,
			'border-top-right-radius': borderRadiusTopRightMobile,
			'border-bottom-right-radius': borderRadiusBottomRightMobile,
			'border-bottom-left-radius': borderRadiusBottomLeftMobile,
		} ];

		TypographyCSS( cssObj, selector, attributes.typography, 'Mobile' );
		SpacingCSS( cssObj, selector, attributes, 'Mobile' );
		LayoutCSS( cssObj, selector, attributes, 'Mobile' );
		SizingCSS( cssObj, selector, attributes, 'Mobile' );
		FlexChildCSS( cssObj, selector, attributes, 'Mobile' );

		if ( borderSizeTopMobile || borderSizeRightMobile || borderSizeBottomMobile || borderSizeLeftMobile ) {
			cssObj[ selector ].push( {
				'border-top-width': borderSizeTopMobile,
				'border-right-width': borderSizeRightMobile,
				'border-bottom-width': borderSizeBottomMobile,
				'border-left-width': borderSizeLeftMobile,
				'border-style': 'solid',
			} );
		}

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
