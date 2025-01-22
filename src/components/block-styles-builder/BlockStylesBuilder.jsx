import { applyFilters } from '@wordpress/hooks';
import { useMemo } from '@wordpress/element';

import {
	StylesBuilder,
	defaultAtRules,
	getStylesObject,
	deleteStylesObjectKey,
	updateStylesObjectKey,
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
		deviceType,
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
	const computedStyleDeps = useMemo( () => {
		const deps = {
			globalClasses,
		};

		return JSON.stringify( deps );
	}, [ globalClasses ] );

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
				setDeviceType( getPreviewDevice( value, deviceType, defaultAtRules ) );
			} }
			onUpdateKey={ ( oldKey, newKey, nestedRuleValue ) => {
				const newStyles = updateStylesObjectKey( styles, oldKey, newKey, nestedRuleValue );
				setAttributes( { styles: newStyles } );
			} }
			selectorShortcuts={ shortcuts.selectorShortcuts }
			visibleSelectors={ shortcuts.visibleShortcuts }
			onEditStyle={ setGlobalStyle }
			cancelEditStyle={ cancelEditGlobalStyle }
			setLocalTab={ ( tab ) => {
				sessionStorage.setItem( TABS_STORAGE_KEY, tab );
			} }
			scope="local"
			allowCustomAdvancedSelector={ allowCustomAdvancedSelector }
			allowCustomAtRule={ allowCustomAtRule }
			computedStyleDeps={ computedStyleDeps }
		/>
	);
}
