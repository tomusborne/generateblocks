import { useSelect, useDispatch } from '@wordpress/data';
import { applyFilters } from '@wordpress/hooks';

import { useDeviceType, getPreviewDevice, useCurrentAtRule } from '@edge22/block-styles';
import { defaultAtRules } from '@edge22/styles-builder';

import { currentStyleStore, atRuleStore, nestedRuleStore } from '../store/block-styles';

export function useBlockStyles() {
	const atRule = useSelect( ( select ) => select( atRuleStore ).getAtRule() );
	const { setAtRule } = useDispatch( atRuleStore );
	const nestedRule = useSelect( ( select ) => select( nestedRuleStore ).getNestedRule() );
	const { setNestedRule } = useDispatch( nestedRuleStore );
	const currentAtRule = useCurrentAtRule( defaultAtRules );
	const { setCurrentStyle } = useDispatch( currentStyleStore );
	const currentStyle = useSelect( ( select ) => select( currentStyleStore ).currentStyle() );
	const { deviceType, setDeviceType } = useDeviceType();

	const setGlobalStyle = applyFilters( 'generateblocks.useBlockStyles.setGlobalStyle', () => {} );
	const cancelEditGlobalStyle = applyFilters( 'generateblocks.useBlockStyles.cancelEditGlobalStyle', () => {} );

	return {
		atRule,
		nestedRule,
		setAtRule,
		currentAtRule,
		setNestedRule,
		setDeviceType,
		deviceType,
		setCurrentStyle,
		currentStyle,
		getPreviewDevice,
		setGlobalStyle,
		cancelEditGlobalStyle,
	};
}
