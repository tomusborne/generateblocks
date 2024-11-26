import { useSelect } from '@wordpress/data';
import { store as coreStore } from '@wordpress/core-data';

export function useTaxonomies( postType ) {
	return useSelect( ( select ) => {
		const { getTaxonomies } = select( coreStore );

		const args = { per_page: -1 };

		/**
		 * Certain post types are excluded from this behavior since they are "pattern-like" and might display in a different
		 * content type than the one being edited.
		 */
		const excludedPostTypes = [ 'gp_elements', 'wp_block' ];

		if ( postType && ! excludedPostTypes.includes( postType ) ) {
			args.types = postType;
		}

		return getTaxonomies( args ) || [];
	}, [ postType ] );
}
