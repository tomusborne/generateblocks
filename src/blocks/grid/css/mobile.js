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
			uniqueId,
			horizontalGapMobile,
			verticalGapMobile,
			verticalAlignmentMobile,
			horizontalAlignmentMobile,
			isQueryLoop,
		} = attributes;

		let cssObj = [];

		const gridSelector = isQueryLoop ? '.gb-grid-wrapper-' + uniqueId : '.gb-grid-wrapper-' + uniqueId + ' > .block-editor-inner-blocks > .block-editor-block-list__layout';
		const gridItemSelector = isQueryLoop ? gridSelector + ' > .block-editor-inner-blocks' : gridSelector + ' > .wp-block';

		cssObj[ gridSelector ] = [ {
			'align-items': 'inherit' !== verticalAlignmentMobile ? verticalAlignmentMobile : null,
			'justify-content': 'inherit' !== horizontalAlignmentMobile ? horizontalAlignmentMobile : null,
			'margin-left': horizontalGapMobile || 0 === horizontalGapMobile ? '-' + ( horizontalGapMobile / 2 ) + 'px' : null,
			'margin-right': horizontalGapMobile || 0 === horizontalGapMobile ? '-' + ( horizontalGapMobile / 2 ) + 'px' : null,
		} ];

		cssObj[ gridItemSelector ] = [ {
			'padding-left': horizontalGapMobile || 0 === horizontalGapMobile ? ( horizontalGapMobile / 2 ) + 'px' : null,
			'padding-right': horizontalGapMobile || 0 === horizontalGapMobile ? ( horizontalGapMobile / 2 ) + 'px' : null,
			'margin-bottom': verticalGapMobile || 0 === verticalGapMobile ? valueWithUnit( verticalGapMobile, 'px' ) : null,
		} ];

		cssObj = applyFilters( 'generateblocks.editor.mobileCSS', cssObj, this.props, 'grid' );

		return (
			<style>{ buildCSS( cssObj ) }</style>
		);
	}
}
