import buildCSS from '../../../utils/build-css';
import valueWithUnit from '../../../utils/value-with-unit';
import shorthandCSS from '../../../utils/shorthand-css';
import hexToRGBA from '../../../utils/hex-to-rgba';
import LayoutCSS from '../../../extend/inspector-control/controls/layout/components/LayoutCSS';
import FlexChildCSS from '../../../extend/inspector-control/controls/flex-child-panel/components/FlexChildCSS';
import SizingCSS from '../../../extend/inspector-control/controls/sizing/components/SizingCSS';
import SpacingCSS from '../../../extend/inspector-control/controls/spacing/components/SpacingCSS';

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
			clientId,
		} = this.props;

		const {
			uniqueId,
			element,
			alignment,
			backgroundColor,
			backgroundColorOpacity,
			textColor,
			linkColor,
			linkColorHover,
			borderColor,
			borderColorOpacity,
			highlightTextColor,
			fontFamily,
			fontFamilyFallback,
			fontWeight,
			fontSize,
			fontSizeUnit,
			textTransform,
			lineHeight,
			lineHeightUnit,
			letterSpacing,
			paddingTop,
			paddingRight,
			paddingBottom,
			paddingLeft,
			paddingUnit,
			borderSizeTop,
			borderSizeRight,
			borderSizeBottom,
			borderSizeLeft,
			borderRadiusTopRight,
			borderRadiusBottomRight,
			borderRadiusBottomLeft,
			borderRadiusTopLeft,
			borderRadiusUnit,
			iconColor,
			iconColorOpacity,
			iconPaddingTop,
			iconPaddingRight,
			iconPaddingBottom,
			iconPaddingLeft,
			iconPaddingUnit,
			iconSize,
			iconSizeUnit,
			removeText,
			display,
			inlineWidth,
		} = attributes;

		let fontFamilyFallbackValue = '';

		if ( fontFamily && fontFamilyFallback ) {
			fontFamilyFallbackValue = ', ' + fontFamilyFallback;
		}

		const selector = element + '.gb-headline-' + uniqueId;

		let cssObj = [];

		cssObj[ '.editor-styles-wrapper ' + selector ] = [ {
			color: textColor,
			'font-family': fontFamily + fontFamilyFallbackValue,
			'font-weight': fontWeight,
			'text-transform': textTransform,
			'text-align': alignment,
			'font-size': valueWithUnit( fontSize, fontSizeUnit ),
			'line-height': valueWithUnit( lineHeight, lineHeightUnit ),
			'letter-spacing': valueWithUnit( letterSpacing, 'em' ),
		} ];

		SpacingCSS( cssObj, '.editor-styles-wrapper ' + selector, attributes );
		LayoutCSS( cssObj, '.editor-styles-wrapper ' + selector, attributes );
		SizingCSS( cssObj, '.editor-styles-wrapper ' + selector, attributes );
		FlexChildCSS( cssObj, '.editor-styles-wrapper ' + selector, attributes );

		cssObj[ '.editor-styles-wrapper .gb-container ' + selector ] = [ {
			color: textColor,
		} ];

		cssObj[ '.editor-styles-wrapper ' + selector ].push( {
			'background-color': hexToRGBA( backgroundColor, backgroundColorOpacity ),
			'color': textColor, // eslint-disable-line quote-props
			'padding': shorthandCSS( paddingTop, paddingRight, paddingBottom, paddingLeft, paddingUnit ), // eslint-disable-line quote-props
			'border-radius': shorthandCSS( borderRadiusTopLeft, borderRadiusTopRight, borderRadiusBottomRight, borderRadiusBottomLeft, borderRadiusUnit ),
			'border-color': hexToRGBA( borderColor, borderColorOpacity ),
		} );

		if ( borderSizeTop || borderSizeRight || borderSizeBottom || borderSizeLeft ) {
			cssObj[ '.editor-styles-wrapper ' + selector ].push( {
				'border-width': shorthandCSS( borderSizeTop, borderSizeRight, borderSizeBottom, borderSizeLeft, 'px' ),
				'border-style': 'solid',
			} );
		}

		cssObj[ '.editor-styles-wrapper ' + selector + ' a' ] = [ {
			color: linkColor,
		} ];

		cssObj[ '.editor-styles-wrapper ' + selector + ' a:hover' ] = [ {
			color: linkColorHover,
		} ];

		cssObj[ selector + ' .gb-icon' ] = [ {
			'padding': ! removeText ? shorthandCSS( iconPaddingTop, iconPaddingRight, iconPaddingBottom, iconPaddingLeft, iconPaddingUnit ) : false, // eslint-disable-line quote-props
			'color': hexToRGBA( iconColor, iconColorOpacity ), // eslint-disable-line quote-props
		} ];

		cssObj[ selector + ' .gb-icon svg' ] = [ {
			'width': valueWithUnit( iconSize, iconSizeUnit ), // eslint-disable-line quote-props
			'height': valueWithUnit( iconSize, iconSizeUnit ), // eslint-disable-line quote-props
		} ];

		cssObj[ selector + ' .gb-highlight' ] = [ {
			'color': highlightTextColor, // eslint-disable-line quote-props
		} ];

		if ( inlineWidth ) {
			cssObj[ '.gb-is-root-block[data-block="' + clientId + '"]' ] = [ {
				display,
			} ];
		}

		cssObj = applyFilters( 'generateblocks.editor.mainCSS', cssObj, this.props, 'headline' );

		return (
			<style>{ buildCSS( cssObj ) }</style>
		);
	}
}
