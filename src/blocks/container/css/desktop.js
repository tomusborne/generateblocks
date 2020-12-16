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
			clientId,
		} = this.props;

		const {
			removeVerticalGap,
		} = attributes;

		let cssObj = [];

		cssObj[ '.block-editor-block-list__layout > #block-' + clientId ] = [ {
			'margin-bottom': removeVerticalGap ? '0px !important' : false,
		} ];

		cssObj = applyFilters( 'generateblocks.editor.desktopCSS', cssObj, this.props, 'container' );

		return (
			<style>{ buildCSS( cssObj ) }</style>
		);
	}
}
/* eslint-enable quotes */
