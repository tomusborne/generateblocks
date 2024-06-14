import buildCSS from '../../../utils/build-css';
import hexToRGBA from '../../../utils/hex-to-rgba';
import LayoutCSS from '../../../extend/inspector-control/controls/layout/components/LayoutCSS';
import FlexChildCSS from '../../../extend/inspector-control/controls/flex-child-panel/components/FlexChildCSS';
import SizingCSS from '../../../extend/inspector-control/controls/sizing/components/SizingCSS';
import SpacingCSS from '../../../extend/inspector-control/controls/spacing/components/SpacingCSS';
import TypographyCSS from '../../../extend/inspector-control/controls/typography/components/TypographyCSS';

import {
	Component,
} from '@wordpress/element';

import {
	applyFilters,
} from '@wordpress/hooks';
import BorderCSS from '../../../extend/inspector-control/controls/borders/BorderCSS';

export default class MainCSS extends Component {
	render() {
		const attributes = applyFilters( 'generateblocks.editor.cssAttrs', this.props.attributes, this.props );

		const {
			clientId,
		} = this.props;

		const {
			uniqueId,
			element,
			backgroundColor,
			backgroundColorOpacity,
			textColor,
			linkColor,
			linkColorHover,
			highlightTextColor,
			fontFamilyFallback,
			iconColor,
			iconColorOpacity,
			removeText,
			display,
			inlineWidth,
			iconStyles,
		} = attributes;

		const selector = element + '.gb-headline-' + uniqueId;

		let cssObj = [];

		cssObj[ '.editor-styles-wrapper ' + selector ] = [ {
			color: textColor,
		} ];

		TypographyCSS( cssObj, '.editor-styles-wrapper ' + selector, { ...attributes.typography, fontFamilyFallback } );
		SpacingCSS( cssObj, '.editor-styles-wrapper ' + selector, attributes.spacing );
		BorderCSS( cssObj, '.editor-styles-wrapper ' + selector, attributes.borders );
		LayoutCSS( cssObj, '.editor-styles-wrapper ' + selector, attributes );
		SizingCSS( cssObj, '.editor-styles-wrapper ' + selector, attributes );
		FlexChildCSS( cssObj, '.editor-styles-wrapper ' + selector, attributes );

		cssObj[ '.editor-styles-wrapper .gb-container ' + selector ] = [ {
			color: textColor,
		} ];

		cssObj[ '.editor-styles-wrapper ' + selector ].push( {
			'background-color': hexToRGBA( backgroundColor, backgroundColorOpacity ),
			'color': textColor, // eslint-disable-line quote-props
		} );

		cssObj[ '.editor-styles-wrapper ' + selector + ' a' ] = [ {
			color: linkColor,
		} ];

		cssObj[ '.editor-styles-wrapper ' + selector + ' a:hover' ] = [ {
			color: linkColorHover,
		} ];

		cssObj[ selector + ' .gb-icon' ] = [ {
			'padding-top': ! removeText ? iconStyles?.paddingTop : null,
			'padding-right': ! removeText ? iconStyles?.paddingRight : null,
			'padding-bottom': ! removeText ? iconStyles?.paddingBottom : null,
			'padding-left': ! removeText ? iconStyles?.paddingLeft : null,
			'color': hexToRGBA( iconColor, iconColorOpacity ), // eslint-disable-line quote-props
		} ];

		cssObj[ selector + ' .gb-icon svg' ] = [ {
			width: iconStyles?.width,
			height: iconStyles?.height,
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
