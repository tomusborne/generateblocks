import { useMemo } from '@wordpress/element';

import { defaultAtRules, getCss, cleanStylesObject, getPreviewWidth } from '@edge22/styles-builder';
import {
	useAtRuleEffect,
	useStyleSelectorEffect,
	useGenerateCSSEffect,
	useSetStyles,
	buildChangedStylesObject,
	getSelector,
	Style,
	useDecodeStyleKeys,
} from '@edge22/block-styles';

import { useBlockStyles } from '@hooks/useBlockStyles';

export function withStyles( WrappedComponent ) {
	return ( ( props ) => {
		const {
			attributes,
			name,
			setAttributes,
			isSelected,
			clientId,
		} = props;

		const {
			uniqueId,
			styles,
			css,
		} = attributes;

		const {
			atRule,
			deviceType,
			setAtRule,
			currentStyle,
			setCurrentStyle,
			setNestedRule,
		} = useBlockStyles();

		const setStyles = useSetStyles( props, { cleanStylesObject } );

		const selector = useMemo( () => {
			if ( ! uniqueId ) {
				return '';
			}

			return getSelector( name, uniqueId );
		}, [ name, uniqueId ] );

		const frontendStyles = Array.isArray( styles ) ? {} : styles;

		function onStyleChange( property, value = '', atRuleValue = '', nestedRuleValue = '' ) {
			const newStyles = typeof property === 'object'
				? property
				: { [ property ]: value };
			const changedStyles = buildChangedStylesObject( newStyles, atRuleValue, nestedRuleValue );

			setStyles( changedStyles );
		}

		function getStyleValue( property, atRuleValue = '', nestedRuleValue = '' ) {
			if ( nestedRuleValue ) {
				if ( atRuleValue ) {
					return styles?.[ nestedRuleValue ]?.[ atRuleValue ]?.[ property ] ?? '';
				}

				return styles?.[ nestedRuleValue ]?.[ property ] ?? '';
			} else if ( atRuleValue ) {
				return styles?.[ atRuleValue ]?.[ property ] ?? '';
			}

			return styles?.[ property ] ?? '';
		}

		useAtRuleEffect( {
			deviceType,
			atRule,
			setAtRule,
			defaultAtRules,
			isSelected,
			getPreviewWidth,
		} );

		useGenerateCSSEffect( {
			selector,
			styles: frontendStyles,
			setAttributes,
			getCss,
			getSelector,
			isSelected,
			blockCss: css,
			clientId,
		} );

		useStyleSelectorEffect( {
			isSelected,
			currentStyle,
			selector,
			setCurrentStyle,
			setNestedRule,
		} );

		useDecodeStyleKeys( {
			styles,
			setAttributes,
		} );

		return (
			<>
				<Style
					selector={ selector }
					getCss={ getCss }
					styles={ frontendStyles }
					clientId={ clientId }
					name={ name }
				/>
				<WrappedComponent
					{ ...props }
					selector={ selector }
					onStyleChange={ onStyleChange }
					getStyleValue={ getStyleValue }
					styles={ frontendStyles }
				/>
			</>
		);
	} );
}
