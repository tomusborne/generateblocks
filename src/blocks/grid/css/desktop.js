import buildCSS from '../../../utils/build-css';
import valueWithUnit from '../../../utils/value-with-unit';

const { Component } = wp.element;
const { applyFilters } = wp.hooks;

export default class DesktopCSS extends Component {
	render() {
		const {
			attributes,
		} = this.props;

		const {
			uniqueId,
			horizontalGap,
			verticalGap,
			verticalAlignment,
			horizontalAlignment,
		} = attributes;

		let cssObj = [];

		cssObj[ '.gb-grid-wrapper-' + uniqueId + ' > .block-editor-inner-blocks > .block-editor-block-list__layout' ] = [ {
			'align-items': verticalAlignment,
			'justify-content': horizontalAlignment,
			'margin-left': '-' + ( horizontalGap / 2 ) + 'px',
			'margin-right': '-' + ( horizontalGap / 2 ) + 'px',
		} ];

		cssObj[ '.gb-grid-wrapper-' + uniqueId + ' > .block-editor-inner-blocks > .block-editor-block-list__layout > .wp-block' ] = [ {
			'padding-left': ( horizontalGap / 2 ) + 'px',
			'padding-right': ( horizontalGap / 2 ) + 'px',
			'margin-bottom': valueWithUnit( verticalGap, 'px' ),
		} ];

		cssObj = applyFilters( 'generateblocks.editor.desktopCSS', cssObj, this.props, 'grid' );

		return (
			<style>{ buildCSS( cssObj ) }</style>
		);
	}
}
