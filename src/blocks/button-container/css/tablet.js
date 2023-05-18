import buildCSS from '../../../utils/build-css';
import flexboxAlignment from '../../../utils/flexbox-alignment';
import SpacingCSS from '../../../extend/inspector-control/controls/spacing/components/SpacingCSS';

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
		} = attributes;

		let cssObj = [];

		cssObj[ '.editor-styles-wrapper .gb-button-wrapper-' + uniqueId ] = [ {
			'justify-content': flexboxAlignment( alignmentTablet ),
		} ];

		SpacingCSS( cssObj, '.editor-styles-wrapper .gb-button-wrapper-' + uniqueId, attributes.spacing, 'Tablet' );

		cssObj[ '.gb-button-wrapper-' + uniqueId + ' > .block-editor-inner-blocks > .block-editor-block-list__layout' ] = [ {
			'justify-content': flexboxAlignment( alignmentTablet ),
		} ];

		cssObj = applyFilters( 'generateblocks.editor.tabletCSS', cssObj, this.props, 'button-container' );

		return (
			<style>{ buildCSS( cssObj ) }</style>
		);
	}
}
