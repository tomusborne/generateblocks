import { useMemo } from '@wordpress/element';

import { getCss } from '@edge22/styles-builder';
import {
	useAtRuleEffect,
	useGenerateCSSEffect,
	useStyleSelectorEffect,
	useUpdateEditorCSSEffect,
	useSyncStyles,
} from '@edge22/block-styles';

import { useBlockStyles } from '@hooks/useBlockStyles';

function getSelector( blockName, uniqueId ) {
	const selectors = {
		'generateblocks/text': 'text',
		'generateblocks/element': 'element',
		'generateblocks/loop-item': 'loop-item',
		'generateblocks/looper': 'looper',
		'generateblocks/media': 'media',
		'generateblocks/query': 'query',
		'generateblocks/query-page-numbers': 'query-page-numbers',
		'generateblocks/shape': 'shape',
	};

	if ( selectors[ blockName ] ) {
		return `.gb-${ selectors[ blockName ] }-${ uniqueId }`;
	}
}

export function withStyles( WrappedComponent ) {
	return ( ( props ) => {
		const {
			attributes,
			name,
			setAttributes,
			isSelected,
		} = props;

		const {
			css,
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
			setStyles,
			addStyle,
			getStyles,
		} = useBlockStyles();

		const selector = useMemo( () => {
			if ( ! uniqueId ) {
				return '';
			}

			return getSelector( name, uniqueId );
		}, [ name, uniqueId ] );

		const frontendStyles = useMemo( () => {
			if ( Array.isArray( styles ) ) {
				return {};
			}

			return styles;
		}, [ JSON.stringify( styles ) ] );

		function onStyleChange( property, value = '', atRuleValue = '', nestedRuleValue = '' ) {
			addStyle( property, value, atRuleValue, nestedRuleValue );

			const updatedStyles = getStyles();
			setAttributes( { styles: updatedStyles } );
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
		} );

		useGenerateCSSEffect( {
			selector,
			styles: frontendStyles,
			setAttributes,
			getCss,
		} );

		useStyleSelectorEffect( {
			isSelected,
			currentStyle,
			selector,
			setCurrentStyle,
			setNestedRule,
			setAtRule,
			setStyles,
			styles: frontendStyles,
		} );

		useUpdateEditorCSSEffect( {
			selector,
			css,
		} );

		useSyncStyles( {
			isSelected,
			stylesAttribute: frontendStyles,
			styles: getStyles(),
			setStyles,
		} );

		return (
			<>
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
