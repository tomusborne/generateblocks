import { useDispatch, useSelector } from 'react-redux';
import { selectObject } from '../../store/data/selectors';
import { useMemo } from '@wordpress/element';
import { fetchManyRecords } from '../../store/data/actions';

export default function useTaxonomy( slug ) {
	const dispatch = useDispatch();
	const taxonomies = useSelector( selectObject( 'taxonomies' ) );

	return useMemo( () => {
		if ( ! taxonomies ) {
			dispatch( fetchManyRecords( { kind: 'taxonomies', query: { per_page: -1 } } ) );
		}

		return !! taxonomies ? taxonomies?.entities[ slug ] : undefined;
	}, [ !! taxonomies, slug, taxonomies?.status ] );
}
