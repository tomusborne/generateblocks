/* eslint-disable quotes */
import buildCSS from '../../../utils/build-css';
import valueWithUnit from '../../../utils/value-with-unit';

const { Component } = wp.element;
const { applyFilters } = wp.hooks;

export default class MobileCSS extends Component {
	render() {
		const {
			attributes,
			clientId,
			media,
		} = this.props;

		const {
			uniqueId,
			isGrid,
			widthMobile,
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
			removeVerticalGap,
			removeVerticalGapTablet,
			removeVerticalGapMobile,
			alignmentMobile,
			fontSizeMobile,
			fontSizeUnit,
			orderMobile,
			shapeDividers,
			bgImage,
			bgOptions,
			featuredImageBg,
		} = attributes;

		let hasBgImage = false;

		if ( bgImage || ( featuredImageBg && media ) ) {
			hasBgImage = true;
		}

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
			'width': valueWithUnit( widthMobile, '%' ), // eslint-disable-line quote-props
			'order': orderMobile, // eslint-disable-line quote-props
		} ];

		let gridAttributes = false;
		let parentBlock = false;
		let parentBlockId = false;

		if ( typeof wp.data.select( 'core/block-editor' ).getBlockParents === 'function' ) {
			parentBlockId = wp.data.select( 'core/block-editor' ).getBlockParents( clientId, true )[ 0 ];

			if ( parentBlockId ) {
				parentBlock = wp.data.select( 'core/block-editor' ).getBlocksByClientId( parentBlockId );

				if ( parentBlock && 'generateblocks/grid' === parentBlock[ 0 ].name ) {
					gridAttributes = parentBlock[ 0 ].attributes;
				}
			}
		}

		if ( removeVerticalGapMobile ) {
			if ( ! removeVerticalGapTablet ) {
				cssObj[ '.block-editor-block-list__layout > #block-' + clientId ] = [ {
					'margin-bottom': '0px !important',
				} ];
			}
		} else if ( removeVerticalGapTablet || removeVerticalGap ) {
			if ( gridAttributes ) {
				if ( 'undefined' !== typeof gridAttributes.verticalGapMobile && gridAttributes.verticalGapMobile ) {
					cssObj[ '.block-editor-block-list__layout > #block-' + clientId ] = [ {
						'margin-bottom': valueWithUnit( gridAttributes.verticalGapMobile, 'px' ),
					} ];
				} else if ( 'undefined' !== typeof gridAttributes.verticalGapTablet && gridAttributes.verticalGapTablet ) {
					cssObj[ '.block-editor-block-list__layout > #block-' + clientId ] = [ {
						'margin-bottom': valueWithUnit( gridAttributes.verticalGapTablet, 'px' ),
					} ];
				} else if ( 'undefined' !== typeof gridAttributes.verticalGap && gridAttributes.verticalGap ) {
					cssObj[ '.block-editor-block-list__layout > #block-' + clientId ] = [ {
						'margin-bottom': valueWithUnit( gridAttributes.verticalGap, 'px' ),
					} ];
				}
			}
		}

		if ( shapeDividers.length ) {
			shapeDividers.map( ( location, index ) => {
				const shapeNumber = index + 1;

				cssObj[ '.gb-container-' + uniqueId + ' > .gb-shapes .gb-shape-' + shapeNumber + ' svg' ] = [ {
					height: valueWithUnit( shapeDividers[ index ].heightMobile, 'px' ),
					width: valueWithUnit( shapeDividers[ index ].widthMobile, '%' ),
				} ];
			} );
		}

		if ( hasBgImage && 'fixed' === bgOptions.attachment ) {
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
