import buildCSS from '../../../utils/build-css';
import shorthandCSS from '../../../utils/shorthand-css';
import flexboxAlignment from '../../../utils/flexbox-alignment';

const { Component } = wp.element;

export default class DesktopCSS extends Component {
	constructor( props ) {
		super( ...arguments );
	}

	render() {
		const {
			attributes,
			clientId,
		} = this.props;

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
			'display': fillHorizontalSpace ? 'block' : false,
			'margin': shorthandCSS( marginTop, marginRight, marginBottom, marginLeft, marginUnit ),
			'justify-content': flexboxAlignment( alignment ),
			'flex-direction': stack ? 'column' : false,
			'align-items': stack ? flexboxAlignment( alignment ) : false,
		} ];

		cssObj[ '.gb-button-wrapper-' + uniqueId + ' > .block-editor-inner-blocks > .block-editor-block-list__layout' ] = [ {
			'flex-direction': stack ? 'column' : false,
		} ];

		if ( fillHorizontalSpace ) {
			cssObj[ '.gb-button-wrapper-' + uniqueId + ' > .block-editor-inner-blocks > .block-editor-block-list__layout > .wp-block' ] = [ {
				'flex': '1',
			} ];

			cssObj[ '.gb-button-wrapper-' + uniqueId + ' > .components-button' ] = [ {
				'background': '#fff',
				'border': '1px solid #ddd',
				'margin-top': '10px',
			} ];
		}

		if ( stack && fillHorizontalSpace ) {
			cssObj[ '.gb-button-wrapper-' + uniqueId + ' > .block-editor-inner-blocks > .block-editor-block-list__layout > .wp-block' ] = [ {
				'width': '100% !important',
				'box-sizing': 'border-box',
			} ];
		}

		return (
			<style>{ buildCSS( cssObj ) }</style>
		);
	}
}
