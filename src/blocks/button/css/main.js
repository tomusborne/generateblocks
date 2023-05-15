/* eslint-disable quotes */
import buildCSS from '../../../utils/build-css';
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
import TypographyCSS from '../../../extend/inspector-control/controls/typography/components/TypographyCSS';
import BorderCSS from '../../../extend/inspector-control/controls/borders/BorderCSS';

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
			borderColor,
			borderColorOpacity,
			gradient,
			gradientDirection,
			gradientColorOne,
			gradientColorOneOpacity,
			gradientColorStopOne,
			gradientColorTwo,
			gradientColorTwoOpacity,
			gradientColorStopTwo,
			hasButtonContainer,
			backgroundColorCurrent,
			textColorCurrent,
			iconStyles,
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
			'font-family': fontFamily + fontFamilyFallbackValue,
			'border-color': hexToRGBA( borderColor, borderColorOpacity ),
		} ];

		TypographyCSS( cssObj, selector, { ...attributes.typography, fontFamilyFallback } );
		SpacingCSS( cssObj, selector, attributes.spacing );
		BorderCSS( cssObj, selector, attributes.borders );
		LayoutCSS( cssObj, selector, attributes );
		SizingCSS( cssObj, selector, attributes );
		FlexChildCSS( cssObj, selector, attributes );

		const currentSelector = sprintf(
			'%1$s[data-button-is-current], %1$s[data-button-is-current]:hover, %1$s[data-button-is-current]:active, %1$s[data-button-is-current]:focus',
			selector
		);

		cssObj[ currentSelector ] = [ {
			'background-color': backgroundColorCurrent,
			color: textColorCurrent,
			'border-top-color': attributes.borders?.borderTopColorCurrent,
			'border-right-color': attributes.borders?.borderRightColorCurrent,
			'border-bottom-color': attributes.borders?.borderBottomColorCurrent,
			'border-left-color': attributes.borders?.borderLeftColorCurrent,
		} ];

		cssObj[ selector + ':hover, ' + selector + ':focus, ' + selector + ':active' ] = [ {
			'background-color': hexToRGBA( backgroundColorHover, backgroundColorHoverOpacity ),
			'color': textColorHover, // eslint-disable-line quote-props
			'border-top-color': attributes.borders?.borderTopColorHover,
			'border-right-color': attributes.borders?.borderRightColorHover,
			'border-bottom-color': attributes.borders?.borderBottomColorHover,
			'border-left-color': attributes.borders?.borderLeftColorHover,
		} ];

		cssObj[ selector + ' .gb-icon' ] = [ {
			'padding-top': ! removeText ? iconStyles?.paddingTop : null,
			'padding-right': ! removeText ? iconStyles?.paddingRight : null,
			'padding-bottom': ! removeText ? iconStyles?.paddingBottom : null,
			'padding-left': ! removeText ? iconStyles?.paddingLeft : null,
		} ];

		cssObj[ selector + ' .gb-icon svg' ] = [ {
			width: iconStyles?.width,
			height: iconStyles?.height,
		} ];

		cssObj = applyFilters( 'generateblocks.editor.mainCSS', cssObj, this.props, 'button' );

		return (
			<style>{ buildCSS( cssObj ) }</style>
		);
	}
}
/* eslint-enable quotes */
