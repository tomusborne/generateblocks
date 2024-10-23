import { useSelect } from '@wordpress/data';
import { store as coreStore } from '@wordpress/core-data';

export function useTaxonomies( postType ) {
	return useSelect( ( select ) => {
		const { getTaxonomies } = select( coreStore );

		const args = { per_page: -1 };

		if ( postType ) {
			args.type = postType;
		}

		return getTaxonomies( args ) || [];
	}, [] );
}
