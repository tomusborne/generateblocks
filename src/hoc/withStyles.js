import { useMemo } from '@wordpress/element';

import { defaultAtRules, getCss, cleanStylesObject } from '@edge22/styles-builder';
import {
	useAtRuleEffect,
	useStyleSelectorEffect,
	useGenerateCSSEffect,
	useSetStyles,
	buildChangedStylesObject,
	getSelector,
	Style,
} from '@edge22/block-styles';

import { useBlockStyles } from '@hooks/useBlockStyles';

export function withStyles( WrappedComponent ) {
	return ( ( props ) => {
		const {
			attributes,
			name,
			setAttributes,
			isSelected,
		} = props;

		const {
			uniqueId,
			styles,
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
					return styles?.[ atRuleValue ]?.[ nestedRuleValue ]?.[ property ] ?? '';
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
		} );

		useGenerateCSSEffect( {
			selector,
			styles: frontendStyles,
			setAttributes,
			getCss,
			getSelector,
		} );

		useStyleSelectorEffect( {
			isSelected,
			currentStyle,
			selector,
			setCurrentStyle,
			setNestedRule,
			setAtRule,
			styles: frontendStyles,
		} );

		return (
			<>
				<Style
					selector={ selector }
					getCss={ getCss }
					styles={ frontendStyles }
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
