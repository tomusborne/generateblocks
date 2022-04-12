import { useDispatch, useSelector } from 'react-redux';
import useType from './useType';
import { selectObject } from '../store/data/selectors';
import { useEffect } from '@wordpress/element';
import { fetchManyRecords } from '../store/data/actions';

export default function usePostTypeRecords( postType, query, options = {} ) {
	const dispatch = useDispatch();
	const type = useType( postType );
	const postTypeData = useSelector( selectObject( type?.rest_base ) ) || [];

	useEffect( () => {
		if ( !! type?.rest_base ) {
			dispatch( fetchManyRecords( { kind: type?.rest_base, query, ...options } ) );
		}
	}, [ JSON.stringify( query ), !! type ] );

	return Object.values( postTypeData?.entities || {} );
}
