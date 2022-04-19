import { useDispatch, useSelector } from 'react-redux';
import useType from './useType';
import { selectObject } from '../store/data/selectors';
import { useEffect } from '@wordpress/element';
import { fetchManyRecords } from '../store/data/actions';

/**
 * Return the records for a given post type
 *
 * @param postType The post type.
 * @param query The query parameters.
 * @param options Extra options to pass for the action (used inside the store).
 *
 * @returns {object} An object of records ({ id: record }).
 */
export default function usePostTypeRecords( postType, query, options = {} ) {
	const dispatch = useDispatch();
	const type = useType( postType );
	const postTypeData = useSelector( selectObject( type?.rest_base ) ) || [];

	useEffect( () => {
		if ( !! type?.rest_base ) {
			dispatch( fetchManyRecords( { kind: type?.rest_base, query, ...options } ) );
		}
	}, [ JSON.stringify( query ), !! type ] );

	const records = Object.values( postTypeData?.entities || {} );
	const isResolving = 'pending' === postTypeData?.status;

	return { records, isResolving };
}
