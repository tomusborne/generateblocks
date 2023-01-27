/* eslint-disable quotes */
import buildCSS from '../../../utils/build-css';
import valueWithUnit from '../../../utils/value-with-unit';
import SizingCSS from '../../../extend/inspector-control/controls/sizing/components/SizingCSS';
import LayoutCSS from '../../../extend/inspector-control/controls/layout/components/LayoutCSS';
import FlexChildCSS from '../../../extend/inspector-control/controls/flex-child-panel/components/FlexChildCSS';
import SpacingCSS from '../../../extend/inspector-control/controls/spacing/components/SpacingCSS';

import {
	Component,
} from '@wordpress/element';

import {
	applyFilters,
} from '@wordpress/hooks';
import sizingValue from '../../../utils/sizingValue';

export default class TabletCSS extends Component {
	render() {
		const attributes = applyFilters( 'generateblocks.editor.cssAttrs', this.props.attributes, this.props );

		const {
			uniqueId,
			isGrid,
			flexGrowTablet,
			flexShrinkTablet,
			flexBasisTablet,
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
			verticalAlignmentTablet,
			alignmentTablet,
			fontSizeTablet,
			fontSizeUnit,
			orderTablet,
			shapeDividers,
			bgImage,
			bgOptions,
			gridId,
			useInnerContainer,
			sizing,
		} = attributes;

		let cssObj = [];
		cssObj[ '.editor-styles-wrapper .gb-container-' + uniqueId ] = [ {
			'border-top-left-radius': valueWithUnit( borderRadiusTopLeftTablet, borderRadiusUnit ),
			'border-top-right-radius': valueWithUnit( borderRadiusTopRightTablet, borderRadiusUnit ),
			'border-bottom-right-radius': valueWithUnit( borderRadiusBottomRightTablet, borderRadiusUnit ),
			'border-bottom-left-radius': valueWithUnit( borderRadiusBottomLeftTablet, borderRadiusUnit ),
			'text-align': alignmentTablet,
			'font-size': valueWithUnit( fontSizeTablet, fontSizeUnit ),
		} ];

		SpacingCSS( cssObj, '.editor-styles-wrapper .gb-container-' + uniqueId, attributes, 'Tablet' );
		SizingCSS( cssObj, '.editor-styles-wrapper .gb-container-' + uniqueId, attributes, 'Tablet' );
		LayoutCSS( cssObj, '.editor-styles-wrapper .gb-container-' + uniqueId, attributes, 'Tablet' );
		FlexChildCSS( cssObj, '.editor-styles-wrapper .gb-container-' + uniqueId, attributes, 'Tablet' );

		if ( ! useInnerContainer ) {
			cssObj[ '.editor-styles-wrapper .gb-container-' + uniqueId ].push( {
				'padding-top': valueWithUnit( paddingTopTablet, paddingUnit ),
				'padding-right': valueWithUnit( paddingRightTablet, paddingUnit ),
				'padding-bottom': valueWithUnit( paddingBottomTablet, paddingUnit ),
				'padding-left': valueWithUnit( paddingLeftTablet, paddingUnit ),
			} );
		}

		if ( borderSizeTopTablet || borderSizeRightTablet || borderSizeBottomTablet || borderSizeLeftTablet ) {
			cssObj[ '.editor-styles-wrapper .gb-container-' + uniqueId ].push( {
				'border-top-width': valueWithUnit( borderSizeTopTablet, 'px' ),
				'border-right-width': valueWithUnit( borderSizeRightTablet, 'px' ),
				'border-bottom-width': valueWithUnit( borderSizeBottomTablet, 'px' ),
				'border-left-width': valueWithUnit( borderSizeLeftTablet, 'px' ),
				'border-style': 'solid',
			} );
		}

		if ( useInnerContainer ) {
			cssObj[ '.gb-container-' + uniqueId + ' > .gb-inside-container' ] = [ {
				'padding-top': valueWithUnit( paddingTopTablet, paddingUnit ),
				'padding-right': valueWithUnit( paddingRightTablet, paddingUnit ),
				'padding-bottom': valueWithUnit( paddingBottomTablet, paddingUnit ),
				'padding-left': valueWithUnit( paddingLeftTablet, paddingUnit ),
				'width': sizingValue( 'minHeightTablet', sizing ) && ! isGrid ? '100%' : false, // eslint-disable-line quote-props
			} ];

			if ( sizingValue( 'minHeightTablet', sizing ) && ! isGrid ) {
				cssObj[ '.editor-styles-wrapper .gb-container-' + uniqueId ].push( {
					'display': 'flex', // eslint-disable-line quote-props
					'flex-direction': 'row',
					'align-items': 'inherit' !== verticalAlignmentTablet ? verticalAlignmentTablet : null,
				} );
			}

			if ( isGrid && 'inherit' !== verticalAlignmentTablet ) {
				cssObj[ '.editor-styles-wrapper .gb-container-' + uniqueId ].push( {
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
			cssObj[ '.gb-container-' + uniqueId + ':before' ] = [ {
				'border-top-left-radius': valueWithUnit( borderRadiusTopLeftTablet, borderRadiusUnit ),
				'border-top-right-radius': valueWithUnit( borderRadiusTopRightTablet, borderRadiusUnit ),
				'border-bottom-right-radius': valueWithUnit( borderRadiusBottomRightTablet, borderRadiusUnit ),
				'border-bottom-left-radius': valueWithUnit( borderRadiusBottomLeftTablet, borderRadiusUnit ),
			} ];
		}

		if ( shapeDividers.length ) {
			shapeDividers.forEach( ( location, index ) => {
				const shapeNumber = index + 1;

				cssObj[ '.gb-container-' + uniqueId + ' > .gb-shapes .gb-shape-' + shapeNumber + ' svg' ] = [ {
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
