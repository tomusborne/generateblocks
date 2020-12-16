/* eslint-disable quotes */
import buildCSS from '../../../utils/build-css';

import {
	Component,
} from '@wordpress/element';

import {
	applyFilters,
} from '@wordpress/hooks';

export default class TabletOnlyCSS extends Component {
	render() {
		let cssObj = [];

		cssObj = applyFilters( 'generateblocks.editor.tabletOnlyCSS', cssObj, this.props, 'button' );

		return (
			<style>{ buildCSS( cssObj ) }</style>
		);
	}
}
/* eslint-enable quotes */
