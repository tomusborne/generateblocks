import buildCSS from '../../../utils/build-css';
import flexboxAlignment from '../../../utils/flexbox-alignment';
import SpacingCSS from '../../../extend/inspector-control/controls/spacing/components/SpacingCSS';

import {
	Component,
} from '@wordpress/element';

import {
	applyFilters,
} from '@wordpress/hooks';

export default class MainCSS extends Component {
	render() {
		const attributes = applyFilters( 'generateblocks.editor.cssAttrs', this.props.attributes, this.props );

		const {
			uniqueId,
			alignment,
		} = attributes;

		let cssObj = [];

		cssObj[ '.editor-styles-wrapper .gb-button-wrapper-' + uniqueId ] = [ {
			'justify-content': flexboxAlignment( alignment ),
		} ];

		SpacingCSS( cssObj, '.editor-styles-wrapper .gb-button-wrapper-' + uniqueId, attributes.spacing );

		cssObj[ '.gb-button-wrapper-' + uniqueId + ' > .block-editor-inner-blocks > .block-editor-block-list__layout' ] = [ {
			'justify-content': flexboxAlignment( alignment ),
		} ];

		cssObj = applyFilters( 'generateblocks.editor.mainCSS', cssObj, this.props, 'button-container' );

		return (
			<style>{ buildCSS( cssObj ) }</style>
		);
	}
}
