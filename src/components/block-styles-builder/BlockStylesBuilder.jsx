import { StylesBuilder, SEARCH_STORAGE_KEY } from '@edge22/styles-builder';
import { defaultAtRules } from '@edge22/block-styles';

import { useBlockStyles } from '@hooks/useBlockStyles';

export function BlockStylesBuilder( { selector, setAttributes, shortcuts, onStyleChange } ) {
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
	} = useBlockStyles();

	const defaultSearch = sessionStorage.getItem( SEARCH_STORAGE_KEY ?? 'gbp-styles-builder-search' ) ?? '';

	return (
		<StylesBuilder
			currentSelector={ selector }
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
			defaultSearch={ defaultSearch }
		/>
	);
}
