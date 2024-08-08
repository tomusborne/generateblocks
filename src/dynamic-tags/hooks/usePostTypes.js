import { useSelect } from '@wordpress/data';
import { store as coreStore } from '@wordpress/core-data';

export function usePostTypes() {
	return (
		useSelect( ( select ) => {
			const { getPostTypes } = select( coreStore );

			return getPostTypes( { per_page: -1 } ) || [];
		}, [] )
	);
}
