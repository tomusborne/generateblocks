/* eslint-disable quotes */
import buildCSS from '../../../utils/build-css';
import valueWithUnit from '../../../utils/value-with-unit';
import shorthandCSS from '../../../utils/shorthand-css';
import hexToRGBA from '../../../utils/hex-to-rgba';
import LayoutCSS from '../../../extend/inspector-control/controls/layout/components/LayoutCSS';
import SizingCSS from '../../../extend/inspector-control/controls/sizing/components/SizingCSS';
import FlexChildCSS from '../../../extend/inspector-control/controls/flex-child-panel/components/FlexChildCSS';

import {
	Component,
} from '@wordpress/element';

import {
	applyFilters,
} from '@wordpress/hooks';
import SpacingCSS from '../../../extend/inspector-control/controls/spacing/components/SpacingCSS';
import { sprintf } from '@wordpress/i18n';

export default class MainCSS extends Component {
	render() {
		const attributes = applyFilters( 'generateblocks.editor.cssAttrs', this.props.attributes, this.props );

		const {
			uniqueId,
			removeText,
			backgroundColor,
			backgroundColorOpacity,
			textColor,
			backgroundColorHover,
			backgroundColorHoverOpacity,
			textColorHover,
			fontFamily,
			fontFamilyFallback,
			fontWeight,
			textTransform,
			letterSpacing,
			fontSize,
			fontSizeUnit,
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
			borderColor,
			borderColorOpacity,
			borderColorHover,
			borderColorHoverOpacity,
			gradient,
			gradientDirection,
			gradientColorOne,
			gradientColorOneOpacity,
			gradientColorStopOne,
			gradientColorTwo,
			gradientColorTwoOpacity,
			gradientColorStopTwo,
			iconPaddingTop,
			iconPaddingRight,
			iconPaddingBottom,
			iconPaddingLeft,
			iconPaddingUnit,
			iconSize,
			iconSizeUnit,
			hasButtonContainer,
			alignment,
			backgroundColorCurrent,
			textColorCurrent,
			borderColorCurrent,
		} = attributes;

		let fontFamilyFallbackValue = '',
			backgroundImageValue,
			gradientColorStopOneValue = '',
			gradientColorStopTwoValue = '';

		if ( gradient ) {
			if ( gradientColorOne && '' !== gradientColorStopOne ) {
				gradientColorStopOneValue = ' ' + gradientColorStopOne + '%';
			}

			if ( gradientColorTwo && '' !== gradientColorStopTwo ) {
				gradientColorStopTwoValue = ' ' + gradientColorStopTwo + '%';
			}
		}

		if ( gradient ) {
			backgroundImageValue = 'linear-gradient(' + gradientDirection + 'deg, ' + hexToRGBA( gradientColorOne, gradientColorOneOpacity ) + gradientColorStopOneValue + ', ' + hexToRGBA( gradientColorTwo, gradientColorTwoOpacity ) + gradientColorStopTwoValue + ');';
		}

		if ( fontFamily && fontFamilyFallback ) {
			fontFamilyFallbackValue = ', ' + fontFamilyFallback;
		}

		const containerSelector = !! hasButtonContainer ? '.gb-button-wrapper ' : '';
		let selector = '.gb-button-' + uniqueId;
		selector = '.editor-styles-wrapper ' + containerSelector + selector;

		let cssObj = [];

		cssObj[ selector ] = [ {
			'background-color': hexToRGBA( backgroundColor, backgroundColorOpacity ),
			'background-image': backgroundImageValue,
			'color': textColor, // eslint-disable-line quote-props
			'padding': shorthandCSS( paddingTop, paddingRight, paddingBottom, paddingLeft, paddingUnit ), // eslint-disable-line quote-props
			'border-radius': shorthandCSS( borderRadiusTopLeft, borderRadiusTopRight, borderRadiusBottomRight, borderRadiusBottomLeft, borderRadiusUnit ),
			'font-family': fontFamily + fontFamilyFallbackValue,
			'font-weight': fontWeight,
			'text-transform': textTransform,
			'font-size': valueWithUnit( fontSize, fontSizeUnit ),
			'text-align': alignment,
			'letter-spacing': valueWithUnit( letterSpacing, 'em' ),
			'border-color': hexToRGBA( borderColor, borderColorOpacity ),
		} ];

		SpacingCSS( cssObj, selector, attributes );
		LayoutCSS( cssObj, selector, attributes );
		SizingCSS( cssObj, selector, attributes );
		FlexChildCSS( cssObj, selector, attributes );

		if ( borderSizeTop || borderSizeRight || borderSizeBottom || borderSizeLeft ) {
			cssObj[ selector ].push( {
				'border-width': shorthandCSS( borderSizeTop, borderSizeRight, borderSizeBottom, borderSizeLeft, 'px' ),
				'border-style': 'solid',
			} );
		}

		const currentSelector = sprintf(
			'%1$s[data-button-is-current], %1$s[data-button-is-current]:hover, %1$s[data-button-is-current]:active, %1$s[data-button-is-current]:focus',
			selector
		);

		cssObj[ currentSelector ] = [ {
			'background-color': backgroundColorCurrent,
			color: textColorCurrent,
			'border-color': borderColorCurrent,
		} ];

		cssObj[ selector + ':hover, ' + selector + ':focus, ' + selector + ':active' ] = [ {
			'background-color': hexToRGBA( backgroundColorHover, backgroundColorHoverOpacity ),
			'color': textColorHover, // eslint-disable-line quote-props
			'border-color': hexToRGBA( borderColorHover, borderColorHoverOpacity ),
		} ];

		cssObj[ selector + ' .gb-icon' ] = [ {
			'padding': ! removeText ? shorthandCSS( iconPaddingTop, iconPaddingRight, iconPaddingBottom, iconPaddingLeft, iconPaddingUnit ) : false, // eslint-disable-line quote-props
			'font-size': valueWithUnit( iconSize, iconSizeUnit ),
		} ];

		cssObj = applyFilters( 'generateblocks.editor.mainCSS', cssObj, this.props, 'button' );

		return (
			<style>{ buildCSS( cssObj ) }</style>
		);
	}
}
/* eslint-enable quotes */
