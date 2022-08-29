import { useSelect } from '@wordpress/data';
import { store as coreStore } from '@wordpress/core-data';
import useRecordsReducer from './useRecordsReducer';
import { useEffect } from '@wordpress/element';
import { isUndefined } from 'lodash';

/**
 * Returns list of authors.
 *
 * @param {Object} query The query params.
 * @return {{isResolving: boolean, records: Object}} The result set.
 */
export default function useAuthors( query = {} ) {
	return useSelect( ( select ) => {
		const {
			getEntityRecords,
			isResolving,
		} = select( coreStore );

		const queryParams = Object.assign( {
			per_page: -1,
			who: 'authors',
		}, query );

		// We have to check for undefined "include" here and delete it
		// because somehow core does not return results if hasOwnProperty( 'include' ) returns true
		if ( queryParams.hasOwnProperty( 'include' ) && isUndefined( queryParams.include ) ) {
			delete queryParams.include;
		}

		const entityParams = [ 'root', 'user', queryParams ];

		return {
			records: getEntityRecords( ...entityParams ) || [],
			isResolving: isResolving( 'getEntityRecords', entityParams ),
		};
	}, [ JSON.stringify( query ) ] );
}

/**
 * Return author records persisting previous calls.
 *
 * @param {Object} queryParams The query params.
 * @return {{isLoading: boolean, records: Object}} The result set.
 */
export function usePersistentAuthors( queryParams = {} ) {
	const {
		records,
		setRecords,
		query,
		setQuery,
		isLoading,
		setIsLoading,
	} = useRecordsReducer( { query: queryParams } );

	useEffect( () => {
		setQuery( queryParams );
		setIsLoading( true );
	}, [ JSON.stringify( queryParams ) ] );

	const { records: authors, isResolving } = useAuthors( query );

	useEffect( () => {
		setIsLoading( isResolving );
	}, [ isResolving ] );

	useEffect( () => {
		setRecords( authors );
		setIsLoading( false );
	}, [ JSON.stringify( authors ) ] );

	return {
		records,
		isLoading,
	};
}
