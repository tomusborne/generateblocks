import buildCSS from '../../../utils/build-css';
import valueWithUnit from '../../../utils/value-with-unit';

const { Component } = wp.element;
const { applyFilters } = wp.hooks;

export default class TabletCSS extends Component {
	render() {
		const {
			attributes,
		} = this.props;

		const {
			uniqueId,
			horizontalGapTablet,
			verticalGapTablet,
			verticalAlignmentTablet,
			horizontalAlignmentTablet,
		} = attributes;

		let cssObj = [];

		cssObj[ '.gb-grid-wrapper-' + uniqueId + ' > .block-editor-inner-blocks > .block-editor-block-list__layout' ] = [ {
			'align-items': 'inherit' !== verticalAlignmentTablet ? verticalAlignmentTablet : null,
			'justify-content': 'inherit' !== horizontalAlignmentTablet ? horizontalAlignmentTablet : null,
			'margin-left': '-' + ( horizontalGapTablet / 2 ) + 'px',
			'margin-right': '-' + ( horizontalGapTablet / 2 ) + 'px',
		} ];

		cssObj[ '.gb-grid-wrapper-' + uniqueId + ' > .block-editor-inner-blocks > .block-editor-block-list__layout > .wp-block' ] = [ {
			'padding-left': ( horizontalGapTablet / 2 ) + 'px',
			'padding-right': ( horizontalGapTablet / 2 ) + 'px',
			'margin-bottom': valueWithUnit( verticalGapTablet, 'px' ),
		} ];

		cssObj = applyFilters( 'generateblocks.editor.tabletCSS', cssObj, this.props, 'grid' );

		return (
			<style>{ buildCSS( cssObj ) }</style>
		);
	}
}
