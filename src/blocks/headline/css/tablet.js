import buildCSS from '../../../utils/build-css';
import flexboxAlignment from '../../../utils/flexbox-alignment';
import valueWithUnit from '../../../utils/value-with-unit';
import shorthandCSS from '../../../utils/shorthand-css';

const { Component } = wp.element;
const { applyFilters } = wp.hooks;

export default class TabletCSS extends Component {
	render() {
		const {
			attributes,
			clientId,
		} = this.props;

		const {
			uniqueId,
			element,
			alignmentTablet,
			fontSizeTablet,
			fontSizeUnit,
			lineHeightTablet,
			lineHeightUnit,
			letterSpacingTablet,
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
			icon,
			iconLocationTablet,
			iconVerticalAlignmentTablet,
			iconPaddingTopTablet,
			iconPaddingRightTablet,
			iconPaddingBottomTablet,
			iconPaddingLeftTablet,
			iconPaddingUnit,
			iconSizeTablet,
			iconSizeUnit,
			inlineWidthTablet,
			removeText,
		} = attributes;

		let marginBottomValue = '',
			fontSizeValue = '',
			inlineWidthValue = 'inline-block';

		if ( marginBottomTablet ) {
			marginBottomValue = marginBottomTablet + marginUnit;
		} else if ( typeof generateBlocksStyling.headline !== 'undefined' && ! removeText ) {
			if ( typeof generateBlocksStyling.headline[ attributes.element ].marginBottomTablet !== 'undefined' && ! isNaN( generateBlocksStyling.headline[ attributes.element ].marginBottomTablet ) ) {
				marginBottomValue = generateBlocksStyling.headline[ element ].marginBottomTablet + generateBlocksStyling.headline[ element ].marginUnit;
			}
		}

		if ( fontSizeTablet ) {
			fontSizeValue = fontSizeTablet + fontSizeUnit;
		} else if ( typeof generateBlocksStyling.headline !== 'undefined' && ! removeText ) {
			if ( typeof generateBlocksStyling.headline[ attributes.element ].fontSizeTablet !== 'undefined' && generateBlocksStyling.headline[ attributes.element ].fontSizeTablet ) {
				fontSizeValue = generateBlocksStyling.headline[ element ].fontSizeTablet + generateBlocksStyling.headline[ element ].fontSizeUnit;
			}
		}

		let cssObj = [];

		cssObj[ '.editor-styles-wrapper .gb-headline-' + uniqueId ] = [ {
			'text-align': alignmentTablet,
			'font-size': fontSizeValue,
			'line-height': valueWithUnit( lineHeightTablet, lineHeightUnit ),
			'letter-spacing': valueWithUnit( letterSpacingTablet, 'em' ),
		} ];

		cssObj[ '.gb-headline-wrapper-' + uniqueId ] = [ {
			'flex-direction': icon && 'above' === iconLocationTablet ? 'column' : false,
			'justify-content': flexboxAlignment( alignmentTablet ),
			'text-align': alignmentTablet,
			'align-items': 'inline' === iconLocationTablet ? flexboxAlignment( iconVerticalAlignmentTablet ) : flexboxAlignment( alignmentTablet ),
			'font-size': fontSizeValue,
		} ];

		let headlineStyleSelector = '.editor-styles-wrapper .gb-headline-' + uniqueId;

		if ( icon ) {
			headlineStyleSelector = '.gb-headline-wrapper-' + uniqueId;
			inlineWidthValue = 'inline-flex';
		}

		cssObj[ headlineStyleSelector ].push( {
			'display': inlineWidthTablet ? inlineWidthValue : false, // eslint-disable-line quote-props
			'margin': shorthandCSS( marginTopTablet, marginRightTablet, marginBottomValue, marginLeftTablet, marginUnit ) + ' !important', // eslint-disable-line quote-props
			'margin-bottom': marginBottomValue + ' !important', // The unit changes depending on the element if no value exists.
			'padding': shorthandCSS( paddingTopTablet, paddingRightTablet, paddingBottomTablet, paddingLeftTablet, paddingUnit ), // eslint-disable-line quote-props
		} );

		if ( borderSizeTopTablet || borderSizeRightTablet || borderSizeBottomTablet || borderSizeLeftTablet ) {
			cssObj[ headlineStyleSelector ].push( {
				'border-width': shorthandCSS( borderSizeTopTablet, borderSizeRightTablet, borderSizeBottomTablet, borderSizeLeftTablet, 'px' ),
				'border-style': 'solid',
			} );
		}

		cssObj[ '.gb-headline-wrapper-' + uniqueId + ' .gb-icon' ] = [ {
			'padding': ! removeText ? shorthandCSS( iconPaddingTopTablet, iconPaddingRightTablet, iconPaddingBottomTablet, iconPaddingLeftTablet, iconPaddingUnit ) : false, // eslint-disable-line quote-props
			'align-self': icon && 'above' === iconLocationTablet ? flexboxAlignment( alignmentTablet ) : false,
			'display': icon && 'above' === iconLocationTablet ? 'inline' : false, // eslint-disable-line quote-props
		} ];

		cssObj[ '.gb-headline-wrapper-' + uniqueId + ' .gb-icon svg' ] = [ {
			'width': valueWithUnit( iconSizeTablet, iconSizeUnit ), // eslint-disable-line quote-props
			'height': valueWithUnit( iconSizeTablet, iconSizeUnit ), // eslint-disable-line quote-props
		} ];

		cssObj[ '#block-' + clientId ] = [ {
			'display': inlineWidthTablet ? 'inline-flex' : false, // eslint-disable-line quote-props
		} ];

		cssObj = applyFilters( 'generateblocks.editor.tabletCSS', cssObj, this.props, 'headline' );

		return (
			<style>{ buildCSS( cssObj ) }</style>
		);
	}
}
