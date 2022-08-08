import { useSelect } from '@wordpress/data';
import { store as coreStore } from '@wordpress/core-data';
import { applyFilters } from '@wordpress/hooks';

export default ( postType ) => (
	useSelect( ( select ) => {
		const {
			getEntityRecords,
			isResolving,
		} = select( coreStore );

		const queryArgs = applyFilters(
			'generateblocks.editor.hooks.usePostTypeRecordsQueryArgs',
			{ per_page: -1 }
		);

		const entityParams = [ 'postType', postType, queryArgs ];

		return {
			records: getEntityRecords( ...entityParams ) || [],
			isResolving: isResolving( 'getEntityRecords', entityParams ),
		};
	}, [ postType ] )
);
