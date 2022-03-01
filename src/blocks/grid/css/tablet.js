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

		const gridSelector = isQueryLoop
			? '.gb-post-template-' + uniqueId + ' > .gb-post-template-wrapper'
			: '.gb-grid-wrapper-' + uniqueId + ' > .block-editor-inner-blocks > .block-editor-block-list__layout';

		const gridItemSelector = isQueryLoop
			? gridSelector + ' > .block-editor-inner-blocks'
			: gridSelector + ' > .gb-grid-column';

		cssObj[ gridSelector ] = [ {
			'align-items': 'inherit' !== verticalAlignmentTablet ? verticalAlignmentTablet : null,
			'justify-content': 'inherit' !== horizontalAlignmentTablet ? horizontalAlignmentTablet : null,
			'margin-left': horizontalGapTablet || 0 === horizontalGapTablet ? '-' + horizontalGapTablet + 'px' : null,
		} ];

		cssObj[ gridItemSelector ] = [ {
			'padding-left': valueWithUnit( horizontalGapTablet, 'px' ),
			'margin-bottom': verticalGapTablet || 0 === verticalGapTablet ? valueWithUnit( verticalGapTablet, 'px' ) : null,
		} ];

		cssObj = applyFilters( 'generateblocks.editor.tabletCSS', cssObj, this.props, 'grid' );

		return (
			<style>{ buildCSS( cssObj ) }</style>
		);
	}
}
