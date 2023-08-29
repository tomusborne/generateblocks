/* eslint-disable quotes */
import buildCSS from '../../../utils/build-css';
import valueWithUnit from '../../../utils/value-with-unit';
import SizingCSS from '../../../extend/inspector-control/controls/sizing/components/SizingCSS';
import LayoutCSS from '../../../extend/inspector-control/controls/layout/components/LayoutCSS';
import FlexChildCSS from '../../../extend/inspector-control/controls/flex-child-panel/components/FlexChildCSS';
import SpacingCSS from '../../../extend/inspector-control/controls/spacing/components/SpacingCSS';
import TypographyCSS from '../../../extend/inspector-control/controls/typography/components/TypographyCSS';

import {
	Component,
} from '@wordpress/element';

import {
	applyFilters,
} from '@wordpress/hooks';
import sizingValue from '../../../utils/sizingValue';
import BorderCSS from '../../../extend/inspector-control/controls/borders/BorderCSS';
import getEditorSelector from '../../../utils/get-editor-selector';

export default class TabletCSS extends Component {
	render() {
		const attributes = applyFilters( 'generateblocks.editor.cssAttrs', this.props.attributes, this.props );

		const {
			uniqueId,
			isGrid,
			flexGrowTablet,
			flexShrinkTablet,
			flexBasisTablet,
			verticalAlignmentTablet,
			orderTablet,
			shapeDividers,
			bgImage,
			bgOptions,
			gridId,
			useInnerContainer,
			sizing,
		} = attributes;

		const {
			paddingTopTablet,
			paddingRightTablet,
			paddingBottomTablet,
			paddingLeftTablet,
		} = attributes.spacing;

		const {
			borderTopLeftRadiusTablet,
			borderTopRightRadiusTablet,
			borderBottomRightRadiusTablet,
			borderBottomLeftRadiusTablet,
		} = attributes.borders;

		const selector = '.editor-styles-wrapper ' + getEditorSelector(
			'.gb-container-' + uniqueId,
			{ name: this.props.name, attributes }
		);

		let cssObj = [];

		TypographyCSS( cssObj, selector, attributes.typography, 'Tablet' );
		SpacingCSS( cssObj, selector, { ...attributes.spacing, useInnerContainer }, 'Tablet' );
		BorderCSS( cssObj, selector, attributes.borders, 'Tablet' );
		SizingCSS( cssObj, selector, attributes, 'Tablet' );
		LayoutCSS( cssObj, selector, attributes, 'Tablet' );
		FlexChildCSS( cssObj, selector, attributes, 'Tablet' );

		if ( useInnerContainer ) {
			cssObj[ selector + ' > .gb-inside-container' ] = [ {
				'padding-top': paddingTopTablet,
				'padding-right': paddingRightTablet,
				'padding-bottom': paddingBottomTablet,
				'padding-left': paddingLeftTablet,
				'width': sizingValue( 'minHeightTablet', sizing ) && ! isGrid ? '100%' : false, // eslint-disable-line quote-props
			} ];

			if ( sizingValue( 'minHeightTablet', sizing ) && ! isGrid ) {
				cssObj[ selector ].push( {
					'display': 'flex', // eslint-disable-line quote-props
					'flex-direction': 'row',
					'align-items': 'inherit' !== verticalAlignmentTablet ? verticalAlignmentTablet : null,
				} );
			}

			if ( isGrid && 'inherit' !== verticalAlignmentTablet ) {
				cssObj[ selector ].push( {
					'display': 'flex', // eslint-disable-line quote-props
					'flex-direction': 'column',
					'height': '100%', // eslint-disable-line quote-props
					'justify-content': verticalAlignmentTablet,
				} );
			}
		}

		if ( isGrid ) {
			const gridColumnSelectors = [
				'.gb-post-template-' + gridId + ' > .gb-post-template-wrapper > .block-editor-inner-blocks',
				'.gb-grid-wrapper > .block-editor-inner-blocks > .block-editor-block-list__layout > .gb-grid-column-' + uniqueId,
			];

			cssObj[ gridColumnSelectors.join( ',' ) ] = [ {
				width: sizingValue( 'widthTablet', sizing ),
				'flex-grow': flexGrowTablet,
				'flex-shrink': flexShrinkTablet,
				'flex-basis': flexBasisTablet,
				order: orderTablet,
			} ];
		}

		if ( !! bgImage && 'pseudo-element' === bgOptions.selector ) {
			cssObj[ selector + ':before' ] = [ {
				'border-top-left-radius': borderTopLeftRadiusTablet,
				'border-top-right-radius': borderTopRightRadiusTablet,
				'border-bottom-right-radius': borderBottomRightRadiusTablet,
				'border-bottom-left-radius': borderBottomLeftRadiusTablet,
			} ];
		}

		if ( shapeDividers.length ) {
			shapeDividers.forEach( ( location, index ) => {
				const shapeNumber = index + 1;

				cssObj[ selector + ' > .gb-shapes .gb-shape-' + shapeNumber + ' svg' ] = [ {
					height: valueWithUnit( shapeDividers[ index ].heightTablet, 'px' ),
					width: valueWithUnit( shapeDividers[ index ].widthTablet, '%' ),
				} ];
			} );
		}

		cssObj = applyFilters( 'generateblocks.editor.tabletCSS', cssObj, this.props, 'container' );

		return (
			<style>{ buildCSS( cssObj ) }</style>
		);
	}
}
/* eslint-enable quotes */
