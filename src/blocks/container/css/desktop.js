/* eslint-disable quotes */
import buildCSS from '../../../utils/build-css';

import {
	Component,
} from '@wordpress/element';

import {
	applyFilters,
} from '@wordpress/hooks';

export default class DesktopCSS extends Component {
	render() {
		const attributes = applyFilters( 'generateblocks.editor.cssAttrs', this.props.attributes, this.props );

		const {
			uniqueId,
			removeVerticalGap,
		} = attributes;

		let cssObj = [];

		cssObj[ '.gb-grid-column-' + uniqueId ] = [ {
			'margin-bottom': removeVerticalGap ? '0px !important' : false,
		} ];

		cssObj = applyFilters( 'generateblocks.editor.desktopCSS', cssObj, this.props, 'container' );

		return (
			<style>{ buildCSS( cssObj ) }</style>
		);
	}
}
/* eslint-enable quotes */
