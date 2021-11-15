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
			uniqueId,
			horizontalGapTablet,
			verticalGapTablet,
			verticalAlignmentTablet,
			horizontalAlignmentTablet,
			isQueryLoop,
		} = attributes;

		let cssObj = [];

		const gridSelector = isQueryLoop ? '.gb-grid-wrapper-' + uniqueId : '.gb-grid-wrapper-' + uniqueId + ' > .block-editor-inner-blocks > .block-editor-block-list__layout';
		const gridItemSelector = isQueryLoop ? gridSelector + ' > .block-editor-inner-blocks' : gridSelector + ' > .wp-block';

		cssObj[ gridItemSelector ] = [ {
			'align-items': 'inherit' !== verticalAlignmentTablet ? verticalAlignmentTablet : null,
			'justify-content': 'inherit' !== horizontalAlignmentTablet ? horizontalAlignmentTablet : null,
			'margin-left': horizontalGapTablet || 0 === horizontalGapTablet ? '-' + ( horizontalGapTablet / 2 ) + 'px' : null,
			'margin-right': horizontalGapTablet || 0 === horizontalGapTablet ? '-' + ( horizontalGapTablet / 2 ) + 'px' : null,
		} ];

		cssObj[ gridItemSelector ] = [ {
			'padding-left': horizontalGapTablet || 0 === horizontalGapTablet ? ( horizontalGapTablet / 2 ) + 'px' : null,
			'padding-right': horizontalGapTablet || 0 === horizontalGapTablet ? ( horizontalGapTablet / 2 ) + 'px' : null,
			'margin-bottom': verticalGapTablet || 0 === verticalGapTablet ? valueWithUnit( verticalGapTablet, 'px' ) : null,
		} ];

		cssObj = applyFilters( 'generateblocks.editor.tabletCSS', cssObj, this.props, 'grid' );

		return (
			<style>{ buildCSS( cssObj ) }</style>
		);
	}
}
