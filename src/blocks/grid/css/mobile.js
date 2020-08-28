import buildCSS from '../../../utils/build-css';
import valueWithUnit from '../../../utils/value-with-unit';

const { Component } = wp.element;
const { applyFilters } = wp.hooks;

export default class MobileCSS extends Component {
	render() {
		const {
			attributes,
		} = this.props;

		const {
			uniqueId,
			horizontalGapMobile,
			verticalGapMobile,
			verticalAlignmentMobile,
			horizontalAlignmentMobile,
		} = attributes;

		let cssObj = [];

		cssObj[ '.gb-grid-wrapper-' + uniqueId + ' > .block-editor-inner-blocks > .block-editor-block-list__layout' ] = [ {
			'align-items': 'inherit' !== verticalAlignmentMobile ? verticalAlignmentMobile : null,
			'justify-content': 'inherit' !== horizontalAlignmentMobile ? horizontalAlignmentMobile : null,
			'margin-left': '-' + ( horizontalGapMobile / 2 ) + 'px',
			'margin-right': '-' + ( horizontalGapMobile / 2 ) + 'px',
		} ];

		cssObj[ '.gb-grid-wrapper-' + uniqueId + ' > .block-editor-inner-blocks > .block-editor-block-list__layout > .wp-block' ] = [ {
			'padding-left': ( horizontalGapMobile / 2 ) + 'px',
			'padding-right': ( horizontalGapMobile / 2 ) + 'px',
			'margin-bottom': valueWithUnit( verticalGapMobile, 'px' ),
		} ];

		cssObj = applyFilters( 'generateblocks.editor.mobileCSS', cssObj, this.props, 'grid' );

		return (
			<style>{ buildCSS( cssObj ) }</style>
		);
	}
}
