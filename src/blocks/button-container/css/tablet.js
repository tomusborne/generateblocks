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
			stackTablet,
			fillHorizontalSpaceTablet,
		} = attributes;

		let cssObj = [];

		cssObj[ '.gb-button-wrapper-' + uniqueId ] = [ {
			'display': fillHorizontalSpaceTablet ? 'block' : false, // eslint-disable-line quote-props
			'margin-top': valueWithUnit( marginTopTablet, marginUnit ),
			'margin-right': valueWithUnit( marginRightTablet, marginUnit ),
			'margin-bottom': valueWithUnit( marginBottomTablet, marginUnit ),
			'margin-left': valueWithUnit( marginLeftTablet, marginUnit ),
			'justify-content': flexboxAlignment( alignmentTablet ),
			'flex-direction': stackTablet ? 'column' : false,
			'align-items': stackTablet ? flexboxAlignment( alignmentTablet ) : false,
		} ];

		cssObj[ '.gb-button-wrapper-' + uniqueId + ' > .block-editor-inner-blocks > .block-editor-block-list__layout' ] = [ {
			'flex-direction': stackTablet ? 'column' : false,
			'align-items': stackTablet ? flexboxAlignment( alignmentTablet ) : false,
		} ];

		if ( fillHorizontalSpaceTablet ) {
			cssObj[ '.gb-button-wrapper-' + uniqueId + ' > .block-editor-inner-blocks > .block-editor-block-list__layout > .wp-block' ] = [ {
				'flex': '1', // eslint-disable-line quote-props
			} ];

			cssObj[ '.gb-button-wrapper-' + uniqueId + ' > .components-button' ] = [ {
				'background': '#fff', // eslint-disable-line quote-props
				'border': '1px solid #ddd', // eslint-disable-line quote-props
				'margin-top': '10px',
			} ];
		}

		if ( stackTablet && fillHorizontalSpaceTablet ) {
			cssObj[ '.gb-button-wrapper-' + uniqueId + ' > .block-editor-inner-blocks > .block-editor-block-list__layout > .wp-block' ] = [ {
				'width': '100% !important', // eslint-disable-line quote-props
				'box-sizing': 'border-box',
			} ];
		}

		cssObj = applyFilters( 'generateblocks.editor.tabletCSS', cssObj, this.props, 'button-container' );

		return (
			<style>{ buildCSS( cssObj ) }</style>
		);
	}
}
