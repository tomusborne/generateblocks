import { useMemo, useState, useLayoutEffect } from '@wordpress/element';

import { defaultAtRules, getCss, cleanStylesObject } from '@edge22/styles-builder';
import {
	useAtRuleEffect,
	useStyleSelectorEffect,
	useUpdateEditorCSSEffect,
	useGenerateCSSEffect,
	useSetStyleAttributes,
	buildChangedStylesObject,
	getSelector,
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
		} = useBlockStyles();

		const setStyleAttributes = useSetStyleAttributes( props, { getCss, cleanStylesObject } );

		const [ isPreviewingBlock, setIsPreviewingBlock ] = useState( false );
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

			setStyleAttributes( changedStyles );
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
			styles: frontendStyles,
		} );

		useUpdateEditorCSSEffect( {
			selector,
			getCss,
			styles: frontendStyles,
			isPreviewingBlock,
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
