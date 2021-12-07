import { useSelect } from '@wordpress/data';
import { store as coreStore } from '@wordpress/core-data';

export default () => (
	useSelect( ( select ) => {
		const { getEntityRecords } = select( coreStore );

		return getEntityRecords( 'taxonomy', 'category', { per_page: -1 } ) || [];
	}, [] )
);
