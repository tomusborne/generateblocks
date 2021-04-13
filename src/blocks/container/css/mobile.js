/* eslint-disable quotes */
import buildCSS from '../../../utils/build-css';
import valueWithUnit from '../../../utils/value-with-unit';

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
			clientId,
		} = this.props;

		const {
			uniqueId,
			isGrid,
			widthMobile,
			autoWidthMobile,
			flexGrowMobile,
			flexShrinkMobile,
			flexBasisMobile,
			flexBasisUnit,
			minHeightMobile,
			minHeightUnitMobile,
			paddingTopMobile,
			paddingRightMobile,
			paddingBottomMobile,
			paddingLeftMobile,
			paddingUnit,
			marginTopMobile,
			marginRightMobile,
			marginBottomMobile,
			marginLeftMobile,
			marginUnit,
			borderSizeTopMobile,
			borderSizeRightMobile,
			borderSizeBottomMobile,
			borderSizeLeftMobile,
			borderRadiusTopRightMobile,
			borderRadiusBottomRightMobile,
			borderRadiusBottomLeftMobile,
			borderRadiusTopLeftMobile,
			borderRadiusUnit,
			verticalAlignmentMobile,
			removeVerticalGapMobile,
			alignmentMobile,
			fontSizeMobile,
			fontSizeUnit,
			orderMobile,
			shapeDividers,
			bgImage,
			bgOptions,
		} = attributes;

		let cssObj = [];
		cssObj[ '.gb-container-' + uniqueId ] = [ {
			'border-top-left-radius': valueWithUnit( borderRadiusTopLeftMobile, borderRadiusUnit ),
			'border-top-right-radius': valueWithUnit( borderRadiusTopRightMobile, borderRadiusUnit ),
			'border-bottom-right-radius': valueWithUnit( borderRadiusBottomRightMobile, borderRadiusUnit ),
			'border-bottom-left-radius': valueWithUnit( borderRadiusBottomLeftMobile, borderRadiusUnit ),
			'margin-top': valueWithUnit( marginTopMobile, marginUnit ),
			'margin-right': valueWithUnit( marginRightMobile, marginUnit ),
			'margin-bottom': valueWithUnit( marginBottomMobile, marginUnit ),
			'margin-left': valueWithUnit( marginLeftMobile, marginUnit ),
			'text-align': alignmentMobile,
			'font-size': valueWithUnit( fontSizeMobile, fontSizeUnit ),
			'min-height': valueWithUnit( minHeightMobile, minHeightUnitMobile ),
		} ];

		if ( borderSizeTopMobile || borderSizeRightMobile || borderSizeBottomMobile || borderSizeLeftMobile ) {
			cssObj[ '.gb-container-' + uniqueId ].push( {
				'border-top-width': valueWithUnit( borderSizeTopMobile, 'px' ),
				'border-right-width': valueWithUnit( borderSizeRightMobile, 'px' ),
				'border-bottom-width': valueWithUnit( borderSizeBottomMobile, 'px' ),
				'border-left-width': valueWithUnit( borderSizeLeftMobile, 'px' ),
				'border-style': 'solid',
			} );
		}

		if ( 'inherit' !== verticalAlignmentMobile && minHeightMobile && ! isGrid ) {
			cssObj[ '.gb-container-' + uniqueId ].push( {
				'display': 'flex', // eslint-disable-line quote-props
				'flex-direction': 'row',
				'align-items': verticalAlignmentMobile,
			} );
		}

		if ( isGrid && 'inherit' !== verticalAlignmentMobile ) {
			cssObj[ '.gb-container-' + uniqueId ].push( {
				'display': 'flex', // eslint-disable-line quote-props
				'flex-direction': 'column',
				'height': '100%', // eslint-disable-line quote-props
				'justify-content': verticalAlignmentMobile,
			} );
		}

		cssObj[ '.gb-container-' + uniqueId + ' > .gb-inside-container' ] = [ {
			'padding-top': valueWithUnit( paddingTopMobile, paddingUnit ),
			'padding-right': valueWithUnit( paddingRightMobile, paddingUnit ),
			'padding-bottom': valueWithUnit( paddingBottomMobile, paddingUnit ),
			'padding-left': valueWithUnit( paddingLeftMobile, paddingUnit ),
			'width': minHeightMobile && ! isGrid ? '100%' : false, // eslint-disable-line quote-props
		} ];

		cssObj[ '.gb-grid-wrapper > div > .block-editor-block-list__layout > #block-' + clientId ] = [ {
			width: ! autoWidthMobile ? valueWithUnit( widthMobile, '%' ) : 'auto',
			'flex-grow': flexGrowMobile,
			'flex-shrink': flexShrinkMobile,
			'flex-basis': isNaN( flexBasisMobile ) ? flexBasisMobile : valueWithUnit( flexBasisMobile, flexBasisUnit ),
			'order': orderMobile, // eslint-disable-line quote-props
		} ];

		if ( removeVerticalGapMobile ) {
			cssObj[ '.block-editor-block-list__layout > #block-' + clientId ] = [ {
				'margin-bottom': '0px !important',
			} ];
		}

		if ( !! bgImage && 'pseudo-element' === bgOptions.selector ) {
			cssObj[ '.gb-container-' + uniqueId + ':before' ] = [ {
				'border-top-left-radius': valueWithUnit( borderRadiusTopLeftMobile, borderRadiusUnit ),
				'border-top-right-radius': valueWithUnit( borderRadiusTopRightMobile, borderRadiusUnit ),
				'border-bottom-right-radius': valueWithUnit( borderRadiusBottomRightMobile, borderRadiusUnit ),
				'border-bottom-left-radius': valueWithUnit( borderRadiusBottomLeftMobile, borderRadiusUnit ),
			} ];
		}

		if ( shapeDividers.length ) {
			shapeDividers.forEach( ( location, index ) => {
				const shapeNumber = index + 1;

				cssObj[ '.gb-container-' + uniqueId + ' > .gb-shapes .gb-shape-' + shapeNumber + ' svg' ] = [ {
					height: valueWithUnit( shapeDividers[ index ].heightMobile, 'px' ),
					width: valueWithUnit( shapeDividers[ index ].widthMobile, '%' ),
				} ];
			} );
		}

		if ( !! bgImage && 'fixed' === bgOptions.attachment ) {
			if ( 'element' === bgOptions.selector ) {
				cssObj[ '.gb-container-' + uniqueId ].push( {
					'background-attachment': 'initial',
				} );
			}

			if ( 'pseudo-element' === bgOptions.selector ) {
				cssObj[ '.gb-container-' + uniqueId + ':before' ] = [ {
					'background-attachment': 'initial',
				} ];
			}
		}

		cssObj = applyFilters( 'generateblocks.editor.mobileCSS', cssObj, this.props, 'container' );

		return (
			<style>{ buildCSS( cssObj ) }</style>
		);
	}
}
/* eslint-enable quotes */
