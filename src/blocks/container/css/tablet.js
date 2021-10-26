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
			clientId,
		} = this.props;

		const {
			uniqueId,
			isGrid,
			widthTablet,
			autoWidthTablet,
			flexGrowTablet,
			flexShrinkTablet,
			flexBasisTablet,
			flexBasisUnit,
			minHeightTablet,
			minHeightUnitTablet,
			paddingTopTablet,
			paddingRightTablet,
			paddingBottomTablet,
			paddingLeftTablet,
			paddingUnit,
			marginTopTablet,
			marginRightTablet,
			marginBottomTablet,
			marginLeftTablet,
			marginUnit,
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
		} = attributes;

		let cssObj = [];
		cssObj[ '.gb-container-' + uniqueId ] = [ {
			'border-top-left-radius': valueWithUnit( borderRadiusTopLeftTablet, borderRadiusUnit ),
			'border-top-right-radius': valueWithUnit( borderRadiusTopRightTablet, borderRadiusUnit ),
			'border-bottom-right-radius': valueWithUnit( borderRadiusBottomRightTablet, borderRadiusUnit ),
			'border-bottom-left-radius': valueWithUnit( borderRadiusBottomLeftTablet, borderRadiusUnit ),
			'margin-top': valueWithUnit( marginTopTablet, marginUnit ),
			'margin-right': valueWithUnit( marginRightTablet, marginUnit ),
			'margin-bottom': valueWithUnit( marginBottomTablet, marginUnit ),
			'margin-left': valueWithUnit( marginLeftTablet, marginUnit ),
			'text-align': alignmentTablet,
			'font-size': valueWithUnit( fontSizeTablet, fontSizeUnit ),
			'min-height': valueWithUnit( minHeightTablet, minHeightUnitTablet ),
		} ];

		if ( borderSizeTopTablet || borderSizeRightTablet || borderSizeBottomTablet || borderSizeLeftTablet ) {
			cssObj[ '.gb-container-' + uniqueId ].push( {
				'border-top-width': valueWithUnit( borderSizeTopTablet, 'px' ),
				'border-right-width': valueWithUnit( borderSizeRightTablet, 'px' ),
				'border-bottom-width': valueWithUnit( borderSizeBottomTablet, 'px' ),
				'border-left-width': valueWithUnit( borderSizeLeftTablet, 'px' ),
				'border-style': 'solid',
			} );
		}

		if ( minHeightTablet && ! isGrid ) {
			cssObj[ '.gb-container-' + uniqueId ].push( {
				'display': 'flex', // eslint-disable-line quote-props
				'flex-direction': 'row',
				'align-items': 'inherit' !== verticalAlignmentTablet ? verticalAlignmentTablet : null,
			} );
		}

		if ( isGrid && 'inherit' !== verticalAlignmentTablet ) {
			cssObj[ '.gb-container-' + uniqueId ].push( {
				'display': 'flex', // eslint-disable-line quote-props
				'flex-direction': 'column',
				'height': '100%', // eslint-disable-line quote-props
				'justify-content': verticalAlignmentTablet,
			} );
		}

		cssObj[ '.gb-container-' + uniqueId + ' > .gb-inside-container' ] = [ {
			'padding-top': valueWithUnit( paddingTopTablet, paddingUnit ),
			'padding-right': valueWithUnit( paddingRightTablet, paddingUnit ),
			'padding-bottom': valueWithUnit( paddingBottomTablet, paddingUnit ),
			'padding-left': valueWithUnit( paddingLeftTablet, paddingUnit ),
			'width': minHeightTablet && ! isGrid ? '100%' : false, // eslint-disable-line quote-props
		} ];

		cssObj[ '.gb-grid-wrapper > div > .block-editor-block-list__layout > #block-' + clientId ] = [ {
			width: ! autoWidthTablet ? valueWithUnit( widthTablet, '%' ) : 'auto',
			'flex-grow': flexGrowTablet,
			'flex-shrink': flexShrinkTablet,
			'flex-basis': isNaN( flexBasisTablet ) ? flexBasisTablet : valueWithUnit( flexBasisTablet, flexBasisUnit ),
			order: orderTablet,
		} ];

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
