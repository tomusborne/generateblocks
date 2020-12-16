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
			stack,
			fillHorizontalSpace,
		} = attributes;

		let cssObj = [];

		cssObj[ '.gb-button-wrapper-' + uniqueId ] = [ {
			'display': fillHorizontalSpace ? 'block' : false, // eslint-disable-line quote-props
			'margin': shorthandCSS( marginTop, marginRight, marginBottom, marginLeft, marginUnit ), // eslint-disable-line quote-props
			'justify-content': flexboxAlignment( alignment ),
			'flex-direction': stack ? 'column' : false,
			'align-items': stack ? flexboxAlignment( alignment ) : false,
		} ];

		cssObj[ '.gb-button-wrapper-' + uniqueId + ' > .block-editor-inner-blocks > .block-editor-block-list__layout' ] = [ {
			'flex-direction': stack ? 'column' : false,
			'align-items': stack ? flexboxAlignment( alignment ) : false,
		} ];

		if ( fillHorizontalSpace ) {
			cssObj[ '.gb-button-wrapper-' + uniqueId + ' > .block-editor-inner-blocks > .block-editor-block-list__layout > .wp-block' ] = [ {
				'flex': '1', // eslint-disable-line quote-props
			} ];

			cssObj[ '.gb-button-wrapper-' + uniqueId + ' > .components-button' ] = [ {
				'background': '#fff', // eslint-disable-line quote-props
				'border': '1px solid #ddd', // eslint-disable-line quote-props
				'margin-top': '10px',
			} ];
		}

		if ( stack && fillHorizontalSpace ) {
			cssObj[ '.gb-button-wrapper-' + uniqueId + ' > .block-editor-inner-blocks > .block-editor-block-list__layout > .wp-block' ] = [ {
				'width': '100% !important', // eslint-disable-line quote-props
				'box-sizing': 'border-box',
			} ];
		}

		cssObj = applyFilters( 'generateblocks.editor.mainCSS', cssObj, this.props, 'button-container' );

		return (
			<style>{ buildCSS( cssObj ) }</style>
		);
	}
}
