/* eslint-disable quotes */
import buildCSS from '../../../utils/build-css';
import valueWithUnit from '../../../utils/value-with-unit';
import shorthandCSS from '../../../utils/shorthand-css';

const { Component } = wp.element;
const { applyFilters } = wp.hooks;

export default class TabletCSS extends Component {
	render() {
		const {
			attributes,
		} = this.props;

		const {
			uniqueId,
			removeText,
			letterSpacingTablet,
			fontSizeTablet,
			fontSizeUnit,
			marginTopTablet,
			marginRightTablet,
			marginBottomTablet,
			marginLeftTablet,
			marginUnit,
			paddingTopTablet,
			paddingRightTablet,
			paddingBottomTablet,
			paddingLeftTablet,
			paddingUnit,
			borderSizeTopTablet,
			borderSizeRightTablet,
			borderSizeBottomTablet,
			borderSizeLeftTablet,
			borderRadiusTopRightTablet,
			borderRadiusBottomRightTablet,
			borderRadiusBottomLeftTablet,
			borderRadiusTopLeftTablet,
			borderRadiusUnit,
			iconPaddingTopTablet,
			iconPaddingRightTablet,
			iconPaddingBottomTablet,
			iconPaddingLeftTablet,
			iconPaddingUnit,
			iconSizeTablet,
			iconSizeUnit,
		} = attributes;

		let cssObj = [];

		cssObj[ '.block-editor-block-list__block a.gb-button-' + uniqueId ] = [ {
			'padding': shorthandCSS( paddingTopTablet, paddingRightTablet, paddingBottomTablet, paddingLeftTablet, paddingUnit ), // eslint-disable-line quote-props
			'border-radius': shorthandCSS( borderRadiusTopLeftTablet, borderRadiusTopRightTablet, borderRadiusBottomRightTablet, borderRadiusBottomLeftTablet, borderRadiusUnit ),
			'font-size': valueWithUnit( fontSizeTablet, fontSizeUnit ),
			'letter-spacing': valueWithUnit( letterSpacingTablet, 'em' ),
			'margin': shorthandCSS( marginTopTablet, marginRightTablet, marginBottomTablet, marginLeftTablet, marginUnit ), // eslint-disable-line quote-props
		} ];

		if ( borderSizeTopTablet || borderSizeRightTablet || borderSizeBottomTablet || borderSizeLeftTablet ) {
			cssObj[ '.block-editor-block-list__block a.gb-button-' + uniqueId ].push( {
				'border-width': shorthandCSS( borderSizeTopTablet, borderSizeRightTablet, borderSizeBottomTablet, borderSizeLeftTablet, 'px' ),
				'border-style': 'solid',
			} );
		}

		cssObj[ '.block-editor-block-list__block a.gb-button-' + uniqueId + ' .gb-icon' ] = [ {
			'padding': ! removeText ? shorthandCSS( iconPaddingTopTablet, iconPaddingRightTablet, iconPaddingBottomTablet, iconPaddingLeftTablet, iconPaddingUnit ) : false, // eslint-disable-line quote-props
			'font-size': valueWithUnit( iconSizeTablet, iconSizeUnit ),
		} ];

		cssObj = applyFilters( 'generateblocks.editor.tabletCSS', cssObj, this.props, 'button' );

		return (
			<style>{ buildCSS( cssObj ) }</style>
		);
	}
}
/* eslint-enable quotes */
