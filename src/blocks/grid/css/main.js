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
			useLegacyRowGap,
		} = attributes;

		let cssObj = [];

		const gridSelector = isQueryLoop
			? '.gb-post-template-' + uniqueId + ' > .gb-post-template-wrapper'
			: '.gb-grid-wrapper-' + uniqueId + ' > .block-editor-inner-blocks > .block-editor-block-list__layout';

		const gridItemSelector = isQueryLoop
			? gridSelector + ' > .block-editor-inner-blocks'
			: gridSelector + ' > .gb-grid-column';

		cssObj[ gridSelector ] = [ {
			'align-items': verticalAlignment,
			'justify-content': horizontalAlignment,
			'margin-left': horizontalGap || 0 === horizontalGap ? '-' + horizontalGap + 'px' : null,
			'row-gap': ! useLegacyRowGap ? valueWithUnit( verticalGap, 'px' ) : '',
		} ];

		cssObj[ gridItemSelector ] = [ {
			'padding-left': valueWithUnit( horizontalGap, 'px' ),
			'margin-bottom': !! useLegacyRowGap ? valueWithUnit( verticalGap, 'px' ) : '',
		} ];

		cssObj = applyFilters( 'generateblocks.editor.mainCSS', cssObj, this.props, 'grid' );

		return (
			<style>{ buildCSS( cssObj ) }</style>
		);
	}
}
