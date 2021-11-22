import { useSelect } from '@wordpress/data';
import { store as coreStore } from '@wordpress/core-data';

export default ( postType ) => (
	useSelect( ( select ) => {
		const { getEntityRecords } = select( coreStore );

		return getEntityRecords( 'postType', postType, { per_page: -1 } )
	}, [ postType ] )
);
