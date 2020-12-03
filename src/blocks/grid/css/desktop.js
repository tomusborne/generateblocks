import buildCSS from '../../../utils/build-css';

const { Component } = wp.element;
const { applyFilters } = wp.hooks;

export default class DesktopCSS extends Component {
	render() {
		let cssObj = [];

		cssObj = applyFilters( 'generateblocks.editor.desktopCSS', cssObj, this.props, 'grid' );

		return (
			<style>{ buildCSS( cssObj ) }</style>
		);
	}
}
