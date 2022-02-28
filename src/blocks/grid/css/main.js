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
		} = attributes;

		let cssObj = [];

		const gridSelectors = [
			'.gb-post-template-' + uniqueId + ' > .gb-post-template-wrapper',
			'.gb-grid-wrapper-' + uniqueId + ':not(.gb-is-query-wrapper) > .block-editor-inner-blocks > .block-editor-block-list__layout',
		];

		cssObj[ gridSelectors.join( ',' ) ] = [ {
			'align-items': verticalAlignment,
			'justify-content': horizontalAlignment,
			'margin-left': horizontalGap || 0 === horizontalGap ? '-' + horizontalGap + 'px' : null,
		} ];

		const gridItemSelectors = [
			'.gb-post-template-' + uniqueId + ' > .gb-post-template-wrapper > .block-editor-inner-blocks',
			'.gb-grid-wrapper-' + uniqueId + ':not(.gb-is-query-wrapper) > .block-editor-inner-blocks > .block-editor-block-list__layout > .gb-grid-column',
		];

		cssObj[ gridItemSelectors.join( ',' ) ] = [ {
			'padding-left': valueWithUnit( horizontalGap, 'px' ),
			'margin-bottom': valueWithUnit( verticalGap, 'px' ),
		} ];

		cssObj = applyFilters( 'generateblocks.editor.mainCSS', cssObj, this.props, 'grid' );

		return (
			<style>{ buildCSS( cssObj ) }</style>
		);
	}
}
