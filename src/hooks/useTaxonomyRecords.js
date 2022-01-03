import { useSelect } from '@wordpress/data';
import { store as coreStore } from '@wordpress/core-data';

function removeNamespace( query, namespace ) {
	return Object.keys( query ).reduce( ( result, key ) => {
		const newKey = key.replace( namespace, '' );
		return Object.assign( {}, result, { [ newKey ]: query[ key ] } )
	}, {} );
}

export default ( taxonomy = 'category', query = { per_page: -1 } ) => (
	useSelect( ( select ) => {
		const {
			getEntityRecords,
			isResolving,
			hasFinishedResolution,
		} = select( coreStore );

		const entityParams = [ 'taxonomy', taxonomy, removeNamespace( query, 'term_') ];

		const data = getEntityRecords( ...entityParams ) || [];
		const hasResolvedData = hasFinishedResolution( 'getEntityRecords', entityParams );

		return {
			data,
			taxonomies: data,
			isResolving: isResolving( 'getEntityRecords', entityParams ),
			hasResolvedData,
			hasData: !! ( hasResolvedData && data?.length ),
		};
	}, [ taxonomy, JSON.stringify( query ) ] )
);
