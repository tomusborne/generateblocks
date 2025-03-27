import { applyFilters } from '@wordpress/hooks';
import { __ } from '@wordpress/i18n';
import { useMemo } from '@wordpress/element';

import {
	StylesBuilder,
	getStylesObject,
	deleteStylesObjectKey,
	updateStylesObjectKey,
	getPreviewWidth,
} from '@edge22/styles-builder';
import {
	TABS_STORAGE_KEY,
} from '@edge22/block-styles';
import { useBlockStyles } from '@hooks/useBlockStyles';

export function BlockStylesBuilder( { attributes, setAttributes, shortcuts, onStyleChange, name } ) {
	const {
		atRule,
		setAtRule,
		nestedRule,
		setNestedRule,
		setDeviceType,
		getPreviewDevice,
		setGlobalStyle,
		cancelEditGlobalStyle,
		currentStyle,
	} = useBlockStyles();

	const allowCustomAdvancedSelector = applyFilters(
		'generateblocks.editor.allowCustomAdvancedSelector',
		false,
		{ name }
	);

	const allowCustomAtRule = applyFilters(
		'generateblocks.editor.allowCustomAtRule',
		false,
		{ name }
	);

	const { styles, globalClasses = [] } = attributes;
	const currentStyles = getStylesObject( styles, atRule, nestedRule );
	const selectorShortcuts = useMemo( () => {
		if ( shortcuts.selectorShortcuts && Object.keys( shortcuts.selectorShortcuts ).length ) {
			return shortcuts.selectorShortcuts;
		}

		return {
			default: {
				items: [
					{ label: 'Hover', value: '&:hover' },
					{ label: 'Hover & Focus', value: '&:is(:hover, :focus)' },
					{ label: 'Links', value: 'a' },
					{ label: 'Hovered links', value: 'a:hover' },
				],
			},
			interactions: {
				label: __( 'Interactions', 'generateblocks' ),
				items: [
					{ label: 'Hover', value: '&:hover' },
					{ label: 'Focus', value: '&:focus' },
					{ label: 'Hover & Focus', value: '&:is(:hover, :focus)' },
				],
			},
			links: {
				label: __( 'Links', 'generateblocks' ),
				items: [
					{ label: 'Links', value: 'a' },
					{ label: 'Hovered links', value: 'a:hover' },
					{ label: 'Hovered & focused links', value: 'a:is(:hover, :focus)' },
					{ label: 'Visited links', value: 'a:visited' },
				],
			},
			pseudoElements: {
				label: __( 'Pseudo Elements', 'generateblocks' ),
				items: [
					{ label: 'Before', value: '&:before' },
					{ label: 'After', value: '&:after' },
				],
			},
		};
	}, [ shortcuts ] );

	return (
		<StylesBuilder
			currentSelector={ currentStyle?.selector }
			styles={ currentStyles }
			allStyles={ styles }
			onDeleteStyle={ ( property, nestedRuleValue ) => {
				const newStyles = deleteStylesObjectKey( styles, property, nestedRuleValue );
				setAttributes( { styles: newStyles } );
			} }
			nestedRule={ nestedRule }
			atRule={ atRule }
			onStyleChange={ ( property, value = null ) => onStyleChange( property, value, atRule, nestedRule ) }
			onNestedRuleChange={ ( value ) => setNestedRule( value ) }
			onAtRuleChange={ ( value ) => {
				setAtRule( value );
				const previewWidth = getPreviewWidth( value );
				const previewDevice = getPreviewDevice( previewWidth );

				if ( previewDevice ) {
					setDeviceType( previewDevice );
				}
			} }
			onUpdateKey={ ( oldKey, newKey, nestedRuleValue ) => {
				const newStyles = updateStylesObjectKey( styles, oldKey, newKey, nestedRuleValue );
				setAttributes( { styles: newStyles } );
			} }
			selectorShortcuts={ selectorShortcuts }
			visibleSelectors={ shortcuts.visibleShortcuts }
			onEditStyle={ setGlobalStyle }
			cancelEditStyle={ cancelEditGlobalStyle }
			setLocalTab={ ( tab ) => {
				sessionStorage.setItem( TABS_STORAGE_KEY, tab );
			} }
			scope="local"
			allowCustomAdvancedSelector={ allowCustomAdvancedSelector }
			allowCustomAtRule={ allowCustomAtRule }
			appliedGlobalStyles={ globalClasses }
		/>
	);
}
