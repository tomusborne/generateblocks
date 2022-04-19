import useTaxonomy from './taxonomies/useTaxonomy';
import { useDispatch, useSelector } from 'react-redux';
import { selectObject } from '../store/data/selectors';
import { useEffect } from '@wordpress/element';
import { fetchManyRecords } from '../store/data/actions';

export default function useTaxonomyRecords( taxSlug, query = {}, options = {} ) {
	const dispatch = useDispatch();
	const taxonomy = useTaxonomy( taxSlug );
	const taxonomyRecords = useSelector( selectObject( taxonomy?.rest_base ) ) || [];

	useEffect( () => {
		if ( !! taxonomy?.rest_base ) {
			dispatch( fetchManyRecords( { kind: taxonomy?.rest_base, query, ...options } ) );
		}
	}, [ JSON.stringify( query ), !! taxonomy ] );

	const taxonomies = Object.values( taxonomyRecords?.entities || {} );
	const isResolving = 'pending' === taxonomyRecords?.status;

	return { taxonomies, isResolving };
}

