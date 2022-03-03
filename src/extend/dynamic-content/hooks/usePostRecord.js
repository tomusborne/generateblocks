import { useSelect } from '@wordpress/data';
import { store as coreStore, useEntityProp } from '@wordpress/core-data';

export default function usePostRecord( postType, postId, load = [], options = {} ) {
	const [ featuredImage ] = useEntityProp( 'postType', postType, 'featured_media', postId );

	return useSelect( ( select ) => {
		let terms = [];
		let media = {};
		const { getEntityRecord, getEntityRecords, getUser, getMedia } = select( coreStore );
		const postRecord = getEntityRecord( 'postType', postType, postId );
		const author = getUser( postRecord?.author );
		const comments = getEntityRecords( 'root', 'comment', { post: postId } );

		if ( load.includes( 'featured-image' ) && postRecord ) {
			media = getMedia( featuredImage, { context: 'view' } );
		}

		if ( load.includes( 'terms' ) && postRecord ) {
			terms = getEntityRecords( 'taxonomy', options.taxonomy, { post: postId } );
		}

		return postRecord
			? Object.assign( {}, postRecord, { author, comments, terms, media } )
			: undefined;
	}, [ postType, postId, load.join(), JSON.stringify( options ) ] );
}
