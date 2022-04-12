import { useDispatch, useSelector } from 'react-redux';
import { selectObject } from '../store/data/selectors';
import { useMemo } from '@wordpress/element';
import { fetchManyRecords } from '../store/data/actions';

export default function useType( slug ) {
	const dispatch = useDispatch();
	const types = useSelector( selectObject( 'types' ) );

	return useMemo( () => {
		if ( ! types ) {
			dispatch( fetchManyRecords( { kind: 'types', query: { per_page: -1 } } ) );
		}

		return !! types ? types?.entities[ slug ] : undefined;
	}, [ !! types, slug, types?.status ] );
}
