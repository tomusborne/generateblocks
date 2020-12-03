import buildCSS from '../../../utils/build-css';

const { Component } = wp.element;
const { applyFilters } = wp.hooks;

export default class TabletOnlyCSS extends Component {
	render() {
		let cssObj = [];

		cssObj = applyFilters( 'generateblocks.editor.tabletOnlyCSS', cssObj, this.props, 'grid' );

		return (
			<style>{ buildCSS( cssObj ) }</style>
		);
	}
}
