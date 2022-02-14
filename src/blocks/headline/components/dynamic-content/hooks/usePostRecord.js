import { useSelect } from '@wordpress/data';
import { store as coreStore } from '@wordpress/core-data';

export default function usePostRecord( postType, postId, load = [], options = {} ) {
	return useSelect( ( select ) => {
		let terms = [];
		const { getEntityRecord, getEntityRecords, getUser } = select( coreStore );
		const postRecord = getEntityRecord( 'postType', postType, postId );
		const author = getUser( postRecord?.author );
		const comments = getEntityRecords( 'root', 'comment', { post: postId } );

		if ( load.includes( 'terms' ) && postRecord ) {
			terms = getEntityRecords( 'taxonomy', options.taxonomy, { post: postId } );
		}

		return postRecord
			? Object.assign( {}, postRecord, { author, comments, terms } )
			: undefined;
	}, [ postType, postId ] );
}
