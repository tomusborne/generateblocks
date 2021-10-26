import buildCSS from '../../../utils/build-css';
import flexboxAlignment from '../../../utils/flexbox-alignment';

import {
	Component,
} from '@wordpress/element';

import {
	applyFilters,
} from '@wordpress/hooks';

export default class TabletOnlyCSS extends Component {
	render() {
		const attributes = applyFilters( 'generateblocks.editor.cssAttrs', this.props.attributes, this.props );

		const {
			uniqueId,
			alignmentTablet,
			stackTablet,
			fillHorizontalSpaceTablet,
		} = attributes;

		let cssObj = [];

		cssObj[ '.gb-button-wrapper-' + uniqueId ] = [ {
			display: fillHorizontalSpaceTablet ? 'block' : false,
			'flex-direction': stackTablet ? 'column' : false,
			'align-items': stackTablet ? flexboxAlignment( alignmentTablet ) : false,
		} ];

		cssObj[ '.gb-button-wrapper-' + uniqueId + ' > .block-editor-inner-blocks > .block-editor-block-list__layout' ] = [ {
			'flex-direction': stackTablet ? 'column' : false,
			'align-items': stackTablet ? flexboxAlignment( alignmentTablet ) : false,
		} ];

		if ( fillHorizontalSpaceTablet ) {
			cssObj[ '.gb-button-wrapper-' + uniqueId + ' > .block-editor-inner-blocks > .block-editor-block-list__layout > .wp-block' ] = [ {
				flex: '1',
			} ];

			cssObj[ '.gb-button-wrapper-' + uniqueId + ' > .components-button' ] = [ {
				background: '#fff',
				border: '1px solid #ddd',
				'margin-top': '10px',
			} ];
		}

		if ( stackTablet && fillHorizontalSpaceTablet ) {
			cssObj[ '.gb-button-wrapper-' + uniqueId + ' > .block-editor-inner-blocks > .block-editor-block-list__layout > .wp-block' ] = [ {
				width: '100% !important',
				'box-sizing': 'border-box',
			} ];
		}

		cssObj = applyFilters( 'generateblocks.editor.tabletOnlyCSS', cssObj, this.props, 'button-container' );

		return (
			<style>{ buildCSS( cssObj ) }</style>
		);
	}
}
