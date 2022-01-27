import { useSelect } from '@wordpress/data';
import { store as coreStore } from '@wordpress/core-data';

export default () => (
	useSelect( ( select ) => {
		const { getTaxonomies } = select( coreStore );

		return getTaxonomies( { per_page: -1 } ) || [];
	}, [] )
);
