import { useSelect } from '@wordpress/data';
import { store as coreStore } from '@wordpress/core-data';

import { applyFilters } from '@wordpress/hooks';

export function useTermRecord( { termId, taxonomy } ) {
	return useSelect( ( select ) => {
		const {
			isResolving,
			getEntityRecord,
			hasFinishedResolution,
		} = select( coreStore );

		if ( ! termId || ! taxonomy ) {
			return { record: null, isLoading: false };
		}

		// Get the term entity record.
		const params = applyFilters(
			'generateblocks.editor.dynamicTags.term-request-params',
			[ 'taxonomy', taxonomy, termId ]
		);

		const record = getEntityRecord( ...params );

		const isLoading = (
			! hasFinishedResolution( 'getEntityRecord', params ) ||
			isResolving( 'getEntityRecord', params )
		);

		return {
			record: applyFilters(
				'generateblocks.editor.dynamicTags.termRecord',
				record
			),
			isLoading,
		};
	} );
}
