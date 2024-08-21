import { useMemo } from '@wordpress/element';
import { useSelect } from '@wordpress/data';
import { store as editorStore } from '@wordpress/editor';
import { defaultAtRules, mapDevices } from '../utils/defaultAtRules.js';

export function useCurrentAtRule() {
	const {
		deviceType,
	} = useSelect( ( select ) => {
		const {
			getDeviceType,
		} = select( editorStore );

		return {
			deviceType: getDeviceType(),
		};
	}, [] );
	const currentAtRule = useMemo( () => {
		if ( ! deviceType || 'Desktop' === deviceType ) {
			return '';
		}

		const currentId = mapDevices[ deviceType ];
		return defaultAtRules.find( ( rule ) => rule.id === currentId )?.value ?? '';
	}, [ deviceType ] );

	return currentAtRule;
}
