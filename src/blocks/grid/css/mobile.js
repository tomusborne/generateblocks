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

		const gridSelector = isQueryLoop
			? '.gb-post-template-' + uniqueId + ' > .gb-post-template-wrapper'
			: '.gb-grid-wrapper-' + uniqueId + ' > .block-editor-inner-blocks > .block-editor-block-list__layout';

		const gridItemSelector = isQueryLoop
			? gridSelector + ' > .block-editor-inner-blocks'
			: gridSelector + ' > .gb-grid-column';

		cssObj[ gridSelector ] = [ {
			'align-items': 'inherit' !== verticalAlignmentMobile ? verticalAlignmentMobile : null,
			'justify-content': 'inherit' !== horizontalAlignmentMobile ? horizontalAlignmentMobile : null,
			'margin-left': horizontalGapMobile || 0 === horizontalGapMobile ? '-' + horizontalGapMobile + 'px' : null,
		} ];

		cssObj[ gridItemSelector ] = [ {
			'padding-left': valueWithUnit( horizontalGapMobile, 'px' ),
			'margin-bottom': verticalGapMobile || 0 === verticalGapMobile ? valueWithUnit( verticalGapMobile, 'px' ) : null,
		} ];

		cssObj = applyFilters( 'generateblocks.editor.mobileCSS', cssObj, this.props, 'grid' );

		return (
			<style>{ buildCSS( cssObj ) }</style>
		);
	}
}
