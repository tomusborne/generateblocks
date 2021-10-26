import buildCSS from '../../../utils/build-css';
import shorthandCSS from '../../../utils/shorthand-css';
import flexboxAlignment from '../../../utils/flexbox-alignment';

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
			marginTop,
			marginRight,
			marginBottom,
			marginLeft,
			marginUnit,
		} = attributes;

		let cssObj = [];

		cssObj[ '.gb-button-wrapper-' + uniqueId ] = [ {
			'margin': shorthandCSS( marginTop, marginRight, marginBottom, marginLeft, marginUnit ), // eslint-disable-line quote-props
			'justify-content': flexboxAlignment( alignment ),
		} ];

		cssObj[ '.gb-button-wrapper-' + uniqueId + ' > .block-editor-inner-blocks > .block-editor-block-list__layout' ] = [ {
			'justify-content': flexboxAlignment( alignment ),
		} ];

		cssObj = applyFilters( 'generateblocks.editor.mainCSS', cssObj, this.props, 'button-container' );

		return (
			<style>{ buildCSS( cssObj ) }</style>
		);
	}
}
