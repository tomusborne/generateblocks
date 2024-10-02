import { applyFilters } from '@wordpress/hooks';

import { StylesBuilder } from '@edge22/styles-builder';
import { defaultAtRules, TABS_STORAGE_KEY } from '@edge22/block-styles';
import { useBlockStyles } from '@hooks/useBlockStyles';

export function BlockStylesBuilder( { setAttributes, shortcuts, onStyleChange } ) {
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

	return (
		<StylesBuilder
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
				setDeviceType( getPreviewDevice( value, deviceType ) );
			} }
			onUpdateKey={ ( oldKey, newKey ) => {
				updateKey( oldKey, newKey );

				const updatedStyles = getStyles();
				setAttributes( { styles: updatedStyles } );
			} }
			defaultAtRules={ defaultAtRules }
			selectorShortcuts={ shortcuts.selectorShortcuts }
			visibleSelectors={ shortcuts.visibleShortcuts }
			onEditStyle={ setGlobalStyle }
			cancelEditStyle={ cancelEditGlobalStyle }
			setLocalTab={ ( tab ) => {
				sessionStorage.setItem( TABS_STORAGE_KEY, tab );
			} }
			scope="local"
		/>
	);
}
