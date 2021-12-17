import { useSelect } from '@wordpress/data';
import { store as coreStore } from '@wordpress/core-data';

export default ( taxonomy ) => (
	useSelect( ( select ) => {
		const {
			getEntityRecords,
			isResolving,
		} = select( coreStore );

		const entityParams = [ 'taxonomy', taxonomy, { per_page: -1 } ];

		return {
			taxonomies: getEntityRecords( ...entityParams ) || [],
			isResolving: isResolving( 'getEntityRecords', entityParams ),
		};
	}, [ taxonomy ] )
);
