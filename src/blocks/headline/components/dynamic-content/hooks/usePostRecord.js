import { useSelect } from '@wordpress/data';
import { store as coreStore } from '@wordpress/core-data';

export default function usePostRecord( postType, postId ) {
	return useSelect( ( select ) => {
		const { getEntityRecord, getEntityRecords, getUser } = select( coreStore );
		const postRecord = getEntityRecord( 'postType', postType, postId );
		const author = getUser( postRecord?.author );
		const comments = getEntityRecords( 'root', 'comment', { post: postId } );

		return postRecord
			? Object.assign( {}, postRecord, { author, comments } )
			: undefined;
	}, [ postType, postId ] );
}
