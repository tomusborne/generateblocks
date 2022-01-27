import buildCSS from '../../../utils/build-css';
import valueWithUnit from '../../../utils/value-with-unit';
import flexboxAlignment from '../../../utils/flexbox-alignment';

import {
	Component,
} from '@wordpress/element';

import {
	applyFilters,
} from '@wordpress/hooks';

export default class TabletCSS extends Component {
	render() {
		const attributes = applyFilters( 'generateblocks.editor.cssAttrs', this.props.attributes, this.props );

		const {
			uniqueId,
			alignmentTablet,
			marginTopTablet,
			marginRightTablet,
			marginBottomTablet,
			marginLeftTablet,
			marginUnit,
		} = attributes;

		let cssObj = [];

		cssObj[ '.editor-styles-wrapper .gb-button-wrapper-' + uniqueId ] = [ {
			'margin-top': valueWithUnit( marginTopTablet, marginUnit ),
			'margin-right': valueWithUnit( marginRightTablet, marginUnit ),
			'margin-bottom': valueWithUnit( marginBottomTablet, marginUnit ),
			'margin-left': valueWithUnit( marginLeftTablet, marginUnit ),
			'justify-content': flexboxAlignment( alignmentTablet ),
		} ];

		cssObj[ '.gb-button-wrapper-' + uniqueId + ' > .block-editor-inner-blocks > .block-editor-block-list__layout' ] = [ {
			'justify-content': flexboxAlignment( alignmentTablet ),
		} ];

		cssObj = applyFilters( 'generateblocks.editor.tabletCSS', cssObj, this.props, 'button-container' );

		return (
			<style>{ buildCSS( cssObj ) }</style>
		);
	}
}
