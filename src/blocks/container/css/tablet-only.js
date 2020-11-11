/* eslint-disable quotes */
import buildCSS from '../../../utils/build-css';

const { Component } = wp.element;
const { applyFilters } = wp.hooks;

export default class TabletOnlyCSS extends Component {
	render() {
		const {
			attributes,
			clientId,
		} = this.props;

		const {
			removeVerticalGapTablet,
		} = attributes;

		let cssObj = [];

		if ( removeVerticalGapTablet ) {
			cssObj[ '.block-editor-block-list__layout > #block-' + clientId ] = [ {
				'margin-bottom': '0px !important',
			} ];
		}

		cssObj = applyFilters( 'generateblocks.editor.tabletOnlyCSS', cssObj, this.props, 'container' );

		return (
			<style>{ buildCSS( cssObj ) }</style>
		);
	}
}
/* eslint-enable quotes */
