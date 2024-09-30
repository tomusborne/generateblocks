import { useSelect } from '@wordpress/data';
import { store as coreStore } from '@wordpress/core-data';

import { applyFilters } from '@wordpress/hooks';

export function useUserRecord( { userId } ) {
	return useSelect( ( select ) => {
		const {
			isResolving,
			getEntityRecord,
			hasFinishedResolution,
		} = select( coreStore );

		if ( ! userId ) {
			return { record: null, isLoading: false };
		}

		// Get the user entity record.
		const params = applyFilters(
			'generateblocks.editor.dynamicTags.user-request-params',
			[ 'root', 'user', userId ]
		);

		const record = getEntityRecord( ...params );

		const isLoading = (
			! hasFinishedResolution( 'getEntityRecord', params ) ||
			isResolving( 'getEntityRecord', params )
		);

		return {
			record: applyFilters(
				'generateblocks.editor.dynamicTags.userRecord',
				record
			),
			isLoading,
		};
	} );
}
