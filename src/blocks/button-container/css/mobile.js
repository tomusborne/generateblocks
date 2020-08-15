import buildCSS from '../../../utils/build-css';
import shorthandCSS from '../../../utils/shorthand-css';
import flexboxAlignment from '../../../utils/flexbox-alignment';

const { Component } = wp.element;
const { applyFilters } = wp.hooks;

export default class MobileCSS extends Component {
	render() {
		const {
			attributes,
		} = this.props;

		const {
			uniqueId,
			alignmentMobile,
			marginTopMobile,
			marginRightMobile,
			marginBottomMobile,
			marginLeftMobile,
			marginUnit,
			stackMobile,
			fillHorizontalSpaceMobile,
		} = attributes;

		let cssObj = [];

		cssObj[ '.gb-button-wrapper-' + uniqueId ] = [ {
			'display': fillHorizontalSpaceMobile ? 'block' : false, // eslint-disable-line quote-props
			'margin': shorthandCSS( marginTopMobile, marginRightMobile, marginBottomMobile, marginLeftMobile, marginUnit ), // eslint-disable-line quote-props
			'justify-content': flexboxAlignment( alignmentMobile ),
			'flex-direction': stackMobile ? 'column' : false,
			'align-items': stackMobile ? flexboxAlignment( alignmentMobile ) : false,
		} ];

		cssObj[ '.gb-button-wrapper-' + uniqueId + ' > .block-editor-inner-blocks > .block-editor-block-list__layout' ] = [ {
			'flex-direction': stackMobile ? 'column' : false,
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
