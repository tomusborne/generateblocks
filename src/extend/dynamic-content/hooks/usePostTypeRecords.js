import { useSelect } from '@wordpress/data';
import { store as coreStore } from '@wordpress/core-data';

export default ( postType ) => (
	useSelect( ( select ) => {
		const {
			getEntityRecords,
			isResolving,
		} = select( coreStore );

		const entityParams = [ 'postType', postType, { per_page: -1 } ];

		return {
			records: getEntityRecords( ...entityParams ) || [],
			isResolving: isResolving( 'getEntityRecords', entityParams ),
		};
	}, [ postType ] )
);
