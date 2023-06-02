import buildCSS from '../../../utils/build-css';
import flexboxAlignment from '../../../utils/flexbox-alignment';
import SpacingCSS from '../../../extend/inspector-control/controls/spacing/components/SpacingCSS';

import {
	Component,
} from '@wordpress/element';

import {
	applyFilters,
} from '@wordpress/hooks';

export default class MobileCSS extends Component {
	render() {
		const attributes = applyFilters( 'generateblocks.editor.cssAttrs', this.props.attributes, this.props );

		const {
			uniqueId,
			alignmentMobile,
			stackMobile,
			fillHorizontalSpaceMobile,
		} = attributes;

		let cssObj = [];

		cssObj[ '.editor-styles-wrapper .gb-button-wrapper-' + uniqueId ] = [ {
			'display': fillHorizontalSpaceMobile ? 'block' : false, // eslint-disable-line quote-props
			'justify-content': flexboxAlignment( alignmentMobile ),
			'flex-direction': stackMobile ? 'column' : false,
			'align-items': stackMobile ? flexboxAlignment( alignmentMobile ) : false,
		} ];

		SpacingCSS( cssObj, '.editor-styles-wrapper .gb-button-wrapper-' + uniqueId, attributes.spacing, 'Mobile' );

		cssObj[ '.gb-button-wrapper-' + uniqueId + ' > .block-editor-inner-blocks > .block-editor-block-list__layout' ] = [ {
			'flex-direction': stackMobile ? 'column' : false,
			'align-items': stackMobile ? flexboxAlignment( alignmentMobile ) : false,
			'justify-content': flexboxAlignment( alignmentMobile ),
		} ];

		if ( fillHorizontalSpaceMobile ) {
			cssObj[ '.gb-button-wrapper-' + uniqueId + ' > .block-editor-inner-blocks > .block-editor-block-list__layout > .wp-block' ] = [ {
				'flex': '1', // eslint-disable-line quote-props
			} ];

			cssObj[ '.gb-button-wrapper-' + uniqueId + ' > .components-button' ] = [ {
				'background': '#fff', // eslint-disable-line quote-props
				'border': '1px solid #ddd', // eslint-disable-line quote-props
				'margin-top': '10px',
			} ];
		}

		if ( stackMobile && fillHorizontalSpaceMobile ) {
			cssObj[ '.gb-button-wrapper-' + uniqueId + ' > .block-editor-inner-blocks > .block-editor-block-list__layout > .wp-block' ] = [ {
				'width': '100% !important', // eslint-disable-line quote-props
				'box-sizing': 'border-box',
			} ];
		}

		cssObj = applyFilters( 'generateblocks.editor.mobileCSS', cssObj, this.props, 'button-container' );

		return (
			<style>{ buildCSS( cssObj ) }</style>
		);
	}
}
