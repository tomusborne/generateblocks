import { useMemo, useState, useLayoutEffect } from '@wordpress/element';

import { defaultAtRules, getCss } from '@edge22/styles-builder';
import {
	useAtRuleEffect,
	useGenerateCSSEffect,
	useStyleSelectorEffect,
	useUpdateEditorCSSEffect,
	useSyncStyles,
} from '@edge22/block-styles';

import { useBlockStyles } from '@hooks/useBlockStyles';

export function getSelector( blockName, uniqueId ) {
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

		const [ isPreviewingBlock, setIsPreviewingBlock ] = useState( false );
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
			let newStyles = { [ property ]: value };

			if ( atRuleValue && nestedRuleValue ) {
				newStyles = {
					[ nestedRuleValue ]: {
						[ atRuleValue ]: {
							[ property ]: value,
						},
					},
				};
			} else if ( atRuleValue && ! nestedRuleValue ) {
				newStyles = {
					[ atRuleValue ]: {
						[ property ]: value,
					},
				};
			} else if ( ! atRuleValue && nestedRuleValue ) {
				newStyles = {
					[ nestedRuleValue ]: {
						[ property ]: value,
					},
				};
			}

			setAttributes( { styles: newStyles } );
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

		useLayoutEffect( () => {
			const queryDocument = document.querySelector( 'iframe[name="editor-canvas"]' )?.contentDocument || document;
			const existingId = queryDocument.querySelector( `.editor-styles-wrapper [data-gb-id="${ uniqueId }"]` );

			if ( existingId ) {
				return;
			}

			// If the block doesn't exist in the document, it's likely that we're previewing it.

			setIsPreviewingBlock( true );
		}, [ uniqueId ] );

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
			css,
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
			getCss,
			styles: frontendStyles,
			isPreviewingBlock,
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

				{ !! isPreviewingBlock && (
					<style>{ css }</style>
				) }
			</>
		);
	} );
}
