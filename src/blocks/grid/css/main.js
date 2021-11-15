import buildCSS from '../../../utils/build-css';
import valueWithUnit from '../../../utils/value-with-unit';

import {
	Component,
} from '@wordpress/element';

import {
	applyFilters,
} from '@wordpress/hooks';

export default class MainCSS extends Component {
	render() {
		const attributes = applyFilters( 'generateblocks.editor.cssAttrs', this.props.attributes, this.props );

		const {
			uniqueId,
			horizontalGap,
			verticalGap,
			verticalAlignment,
			horizontalAlignment,
			isQueryLoop,
		} = attributes;

		let cssObj = [];

		const gridSelector = isQueryLoop ? '.gb-grid-wrapper-' + uniqueId : '.gb-grid-wrapper-' + uniqueId + ' > .block-editor-inner-blocks > .block-editor-block-list__layout';
		const gridItemSelector = isQueryLoop ? gridSelector + ' > .block-editor-inner-blocks' : gridSelector + ' > .wp-block';

		cssObj[ gridItemSelector ] = [ {
			'align-items': verticalAlignment,
			'justify-content': horizontalAlignment,
			'margin-left': '-' + ( horizontalGap / 2 ) + 'px',
			'margin-right': '-' + ( horizontalGap / 2 ) + 'px',
		} ];

		cssObj[ gridItemSelector ] = [ {
			'padding-left': ( horizontalGap / 2 ) + 'px',
			'padding-right': ( horizontalGap / 2 ) + 'px',
			'margin-bottom': valueWithUnit( verticalGap, 'px' ),
		} ];

		cssObj = applyFilters( 'generateblocks.editor.mainCSS', cssObj, this.props, 'grid' );

		return (
			<style>{ buildCSS( cssObj ) }</style>
		);
	}
}
