import { useSelect, useDispatch } from '@wordpress/data';
import { useDeviceType, getPreviewDevice, useCurrentAtRule } from '@edge22/block-styles';

import { currentStyleStore, stylesStore, atRuleStore, nestedRuleStore } from '../store/block-styles';

export function useBlockStyles() {
	const { getStyles } = useSelect( stylesStore );
	const { setStyles } = useDispatch( stylesStore );
	const { addStyle, deleteStyle, updateKey } = useDispatch( stylesStore );
	const atRule = useSelect( ( select ) => select( atRuleStore ).getAtRule() );
	const { setAtRule } = useDispatch( atRuleStore );
	const nestedRule = useSelect( ( select ) => select( nestedRuleStore ).getNestedRule() );
	const { setNestedRule } = useDispatch( nestedRuleStore );
	const currentAtRule = useCurrentAtRule();
	const { setCurrentStyle } = useDispatch( currentStyleStore );
	const currentStyle = useSelect( ( select ) => select( currentStyleStore ).currentStyle() );
	const { deviceType, setDeviceType } = useDeviceType();

	return {
		setStyles,
		getStyles,
		addStyle,
		deleteStyle,
		atRule,
		nestedRule,
		setAtRule,
		currentAtRule,
		setNestedRule,
		setDeviceType,
		deviceType,
		updateKey,
		setCurrentStyle,
		currentStyle,
		getPreviewDevice,
	};
}
