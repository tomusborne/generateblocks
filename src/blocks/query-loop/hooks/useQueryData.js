import { useDispatch, useSelector } from 'react-redux';
import useType from '../../../hooks/useType';
import { selectQueryLoopData, selectQueryLoopDataStatus } from '../../../store/query-loop/selectors';
import { useEffect } from '@wordpress/element';
import { fetchManyRecords } from '../../../store/data/actions';

export default function useQueryData( uniqueId, postType, query ) {
	const dispatch = useDispatch();
	const type = useType( postType );
	const data = useSelector( selectQueryLoopData( uniqueId, type?.rest_base ) ) || [];
	const dataStatus = useSelector( selectQueryLoopDataStatus( uniqueId ) );

	useEffect( () => {
		if ( !! type?.rest_base ) {
			dispatch( fetchManyRecords( { kind: type?.rest_base, query, uniqueId } ) );
		}
	}, [ JSON.stringify( query ), !! type ] );

	return {
		data,
		status: dataStatus,
	};
}
