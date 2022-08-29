import { isUndefined } from 'lodash';
import { useSelect } from '@wordpress/data';
import { store as coreStore } from '@wordpress/core-data';
import { useEffect } from '@wordpress/element';
import useRecordsReducer from './useRecordsReducer';

/**
 * Return records for a given taxonomy.
 *
 * @param {string} taxonomy The taxonomy.
 * @param {Object} query    The query params.
 * @return {{isResolving: boolean, records: Object}} The result set.
 */
export default function useTaxonomyRecords( taxonomy, query = {} ) {
	return useSelect( ( select ) => {
		const {
			getEntityRecords,
			isResolving,
		} = select( coreStore );

		const queryParams = Object.assign( { per_page: -1 }, query );

		// We have to check for undefined "include" here and delete it
		// because somehow core does not return results if hasOwnProperty( 'include' ) returns true
		if ( queryParams.hasOwnProperty( 'include' ) && isUndefined( queryParams.include ) ) {
			delete queryParams.include;
		}

		const entityParams = [ 'taxonomy', taxonomy, queryParams ];

		return {
			records: getEntityRecords( ...entityParams ) || [],
			isResolving: isResolving( 'getEntityRecords', entityParams ),
		};
	}, [ taxonomy, JSON.stringify( query ) ] );
}

/**
 * Return records for a given taxonomy but persisting previous calls.
 *
 * @param {string} taxonomy The taxonomy.
 * @param {Object} params   The query params to retrieve the records.
 * @return {{records: Object, isLoading: boolean}} The result set.
 */
export function usePersistentTaxonomyRecords( taxonomy, params = {} ) {
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
	}, [ taxonomy ] );

	useEffect( () => {
		setQuery( params );
	}, [ JSON.stringify( params ) ] );

	const { records: data, isResolving } = useTaxonomyRecords( taxonomy, query );

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
