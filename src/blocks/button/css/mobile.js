/* eslint-disable quotes */
import buildCSS from '../../../utils/build-css';
import valueWithUnit from '../../../utils/value-with-unit';
import shorthandCSS from '../../../utils/shorthand-css';

const { Component } = wp.element;
const { applyFilters } = wp.hooks;

export default class MobileCSS extends Component {
	render() {
		const {
			attributes,
		} = this.props;

		const {
			uniqueId,
			removeText,
			letterSpacingMobile,
			fontSizeMobile,
			fontSizeUnit,
			marginTopMobile,
			marginRightMobile,
			marginBottomMobile,
			marginLeftMobile,
			marginUnit,
			paddingTopMobile,
			paddingRightMobile,
			paddingBottomMobile,
			paddingLeftMobile,
			paddingUnit,
			borderSizeTopMobile,
			borderSizeRightMobile,
			borderSizeBottomMobile,
			borderSizeLeftMobile,
			borderRadiusTopRightMobile,
			borderRadiusBottomRightMobile,
			borderRadiusBottomLeftMobile,
			borderRadiusTopLeftMobile,
			borderRadiusUnit,
			iconPaddingTopMobile,
			iconPaddingRightMobile,
			iconPaddingBottomMobile,
			iconPaddingLeftMobile,
			iconPaddingUnit,
			iconSizeMobile,
			iconSizeUnit,
		} = attributes;

		let cssObj = [];

		cssObj[ '.block-editor-block-list__block a.gb-button-' + uniqueId ] = [ {
			'padding': shorthandCSS( paddingTopMobile, paddingRightMobile, paddingBottomMobile, paddingLeftMobile, paddingUnit ), // eslint-disable-line quote-props
			'border-radius': shorthandCSS( borderRadiusTopLeftMobile, borderRadiusTopRightMobile, borderRadiusBottomRightMobile, borderRadiusBottomLeftMobile, borderRadiusUnit ),
			'font-size': valueWithUnit( fontSizeMobile, fontSizeUnit ),
			'letter-spacing': valueWithUnit( letterSpacingMobile, 'em' ),
			'margin': shorthandCSS( marginTopMobile, marginRightMobile, marginBottomMobile, marginLeftMobile, marginUnit ), // eslint-disable-line quote-props
		} ];

		if ( borderSizeTopMobile || borderSizeRightMobile || borderSizeBottomMobile || borderSizeLeftMobile ) {
			cssObj[ '.block-editor-block-list__block a.gb-button-' + uniqueId ].push( {
				'border-width': shorthandCSS( borderSizeTopMobile, borderSizeRightMobile, borderSizeBottomMobile, borderSizeLeftMobile, 'px' ),
				'border-style': 'solid',
			} );
		}

		cssObj[ '.block-editor-block-list__block a.gb-button-' + uniqueId + ' .gb-icon' ] = [ {
			'padding': ! removeText ? shorthandCSS( iconPaddingTopMobile, iconPaddingRightMobile, iconPaddingBottomMobile, iconPaddingLeftMobile, iconPaddingUnit ) : false, // eslint-disable-line quote-props
			'font-size': valueWithUnit( iconSizeMobile, iconSizeUnit ),
		} ];

		cssObj = applyFilters( 'generateblocks.editor.mobileCSS', cssObj, this.props, 'button' );

		return (
			<style>{ buildCSS( cssObj ) }</style>
		);
	}
}
/* eslint-enable quotes */
