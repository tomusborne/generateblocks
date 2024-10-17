import { useSelect } from '@wordpress/data';
import { store as coreStore } from '@wordpress/core-data';

export function useUsers( makeRequest = true ) {
	return useSelect( ( select ) => {
		const {
			isResolving,
			getEntityRecords,
			hasFinishedResolution,
		} = select( coreStore );

		if ( ! makeRequest ) {
			return { record: null, isLoading: false };
		}

		const params = [ 'root', 'user', { per_page: -1 } ];

		const records = getEntityRecords( ...params );

		const isLoading = (
			! hasFinishedResolution( 'getEntityRecord', params ) ||
			isResolving( 'getEntityRecord', params )
		);

		return {
			records,
			isLoading,
		};
	}, [ makeRequest ] );
}
