import { useSelect } from '@wordpress/data';
import { store as coreStore } from '@wordpress/core-data';
import useRecordsReducer from '../../../hooks/useRecordsReducer';
import { useEffect } from '@wordpress/element';
import { isUndefined } from 'lodash';
import { applyFilters } from '@wordpress/hooks';

/**
 * Return records for a given post but persisting previous calls.
 *
 * @param {string} postType The post type.
 * @param {Object} params   The query params to retrieve the records.
 * @return {{records: Object, isLoading: boolean}} The result set.
 */
export function usePersistentPostRecords( postType, params = {} ) {
	const {
		records,
		setRecords,
		query,
		setQuery,
		isLoading,
		setIsLoading,
		reset,
	} = useRecordsReducer( { query: params } );

	useEffect( () => {
		reset();
	}, [ postType ] );

	useEffect( () => {
		setQuery( params );
	}, [ JSON.stringify( params ) ] );

	const { records: data, isResolving } = usePostTypeRecords( postType, query );

	useEffect( () => {
		setIsLoading( isResolving );
	}, [ isResolving ] );

	useEffect( () => {
		setRecords( data );
	}, [ JSON.stringify( data ) ] );

	return {
		records,
		isLoading,
	};
}

/**
 * Return records for a given post type.
 *
 * @param {string} postType The post type.
 * @param {Object} query    The query params to retrieve the records.
 * @return {{records: Object, isLoading: boolean}} The result set.
 */
export default function usePostTypeRecords( postType, query = {} ) {
	return useSelect( ( select ) => {
		const {
			getEntityRecords,
			isResolving,
		} = select( coreStore );

		const queryParams = Object.assign( { per_page: -1 }, query );

		const queryArgs = applyFilters(
			'generateblocks.editor.hooks.usePostTypeRecordsQueryArgs',
			queryParams
		);

		// We have to check for undefined "include" here and delete it
		// because somehow core does not return results if hasOwnProperty( 'include' ) returns true
		if ( queryArgs.hasOwnProperty( 'include' ) && isUndefined( queryArgs.include ) ) {
			delete queryArgs.include;
		}

		const entityParams = [ 'postType', postType, queryArgs ];

		return {
			records: getEntityRecords( ...entityParams ) || [],
			isResolving: isResolving( 'getEntityRecords', entityParams ),
		};
	}, [ postType, JSON.stringify( query ) ] );
}
