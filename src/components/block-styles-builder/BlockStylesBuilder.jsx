import { StylesBuilder } from '@edge22/styles-builder';

import { useBlockStyles } from '@hooks/useBlockStyles';
import { defaultAtRules } from '@utils/defaultAtRules';

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
		/>
	);
}
