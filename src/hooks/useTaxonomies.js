import { useSelect } from '@wordpress/data';
import { store as coreStore } from '@wordpress/core-data';

export function useTaxonomies() {
	return useSelect( ( select ) => {
		const { getTaxonomies } = select( coreStore );

		const args = { per_page: -1 };

		/**
		 * Certain post types are excluded from this behavior since they are "pattern-like" and might display in a different
		 * content type than the one being edited.
		 */
		const excludedPostTypes = [ 'gp_elements', 'wp_block' ];

		const taxonomies = getTaxonomies( args ) || [];

		return taxonomies.filter( ( taxonomy ) => {
			return ! taxonomy.types.some( ( type ) => {
				return excludedPostTypes.includes( type );
			} );
		} );
	}, [] );
}
