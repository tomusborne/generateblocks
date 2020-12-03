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
			'margin-left': horizontalGapMobile || 0 === horizontalGapMobile ? '-' + ( horizontalGapMobile / 2 ) + 'px' : null,
			'margin-right': horizontalGapMobile || 0 === horizontalGapMobile ? '-' + ( horizontalGapMobile / 2 ) + 'px' : null,
		} ];

		cssObj[ '.gb-grid-wrapper-' + uniqueId + ' > .block-editor-inner-blocks > .block-editor-block-list__layout > .wp-block' ] = [ {
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
