import { applyFilters } from '@wordpress/hooks';

import { StylesBuilder, defaultAtRules } from '@edge22/styles-builder';
import { TABS_STORAGE_KEY } from '@edge22/block-styles';
import { useBlockStyles } from '@hooks/useBlockStyles';

export function BlockStylesBuilder( { attributes, setAttributes, shortcuts, onStyleChange, name } ) {
	const {
		getStyles,
		deleteStyle,
		atRule,
		setAtRule,
		nestedRule,
		setNestedRule,
		setDeviceType,
		getPreviewDevice,
		updateKey,
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

	return (
		<StylesBuilder
			key={ attributes?.globalClasses }
			currentSelector={ currentStyle?.selector }
			styles={ getStyles( atRule, nestedRule ) }
			allStyles={ getStyles() }
			onDeleteStyle={ ( property ) => {
				deleteStyle( property );

				const updatedStyles = getStyles();
				setAttributes( { styles: updatedStyles } );
			} }
			nestedRule={ nestedRule }
			atRule={ atRule }
			onStyleChange={ ( property, value = null ) => onStyleChange( property, value, atRule, nestedRule ) }
			onNestedRuleChange={ ( value ) => setNestedRule( value ) }
			onAtRuleChange={ ( value ) => {
				setAtRule( value );
				setDeviceType( getPreviewDevice( value, deviceType, defaultAtRules ) );
			} }
			onUpdateKey={ ( oldKey, newKey ) => {
				updateKey( oldKey, newKey );

				const updatedStyles = getStyles();
				setAttributes( { styles: updatedStyles } );
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
		/>
	);
}
