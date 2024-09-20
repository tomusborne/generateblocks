import { useSelect } from '@wordpress/data';
import { store as coreStore } from '@wordpress/core-data';
import { applyFilters } from '@wordpress/hooks';

export function usePostRecord( { postType, postId, load = [], options = {} } ) {
	return useSelect( ( select ) => {
		const {
			getUser,
			isResolving,
			getEntityRecord,
			getEntityRecords,
			hasFinishedResolution,
		} = select( coreStore );

		// Post data fetching.
		const params = applyFilters(
			'generateblocks.editor.dynamicTags.post-request-params',
			[ 'postType', postType, postId ]
		);
		console.log( { params } );

		let postRecord = getEntityRecord( ...params );

		const postRecordIsLoading = (
			! hasFinishedResolution( 'getEntityRecord', params ) ||
			isResolving( 'getEntityRecord', params )
		);

		// Author data fetching.
		let authorIsLoading = false;

		if ( load.includes( 'author' ) && ! postRecordIsLoading && !! postRecord ) {
			const authorParams = applyFilters(
				'generateblocks.editor.dynamicTags.author-request-params',
				[ postRecord.author ]
			);
			console.log( { authorParams } );
			const author = getUser( ...authorParams );

			authorIsLoading = (
				! hasFinishedResolution( 'getUser', authorParams ) ||
				isResolving( 'getUser', authorParams )
			);

			if ( ! authorIsLoading && !! author ) {
				postRecord = Object.assign( {}, postRecord, { author } );
			}
		}

		// Comments data fetching.
		let commentsIsLoading = false;

		if ( load.includes( 'comments' ) && ! postRecordIsLoading && !! postRecord ) {
			const commentsParams = applyFilters(
				'generateblocks.editor.dynamicTags.comments-request-params',
				[ 'root', 'comment', { post: postId } ]
			);
			const comments = getEntityRecords( ...commentsParams );

			commentsIsLoading = (
				! hasFinishedResolution( 'getEntityRecords', commentsParams ) ||
				isResolving( 'getEntityRecords', commentsParams )
			);

			if ( ! commentsIsLoading && !! comments ) {
				postRecord = Object.assign( {}, postRecord, { comments } );
			}
		}

		// Terms data fetching.
		let termsIsLoading = false;

		if ( load.includes( 'terms' ) && ! postRecordIsLoading && !! postRecord ) {
			const termParams = applyFilters(
				'generateblocks.editor.dynamicTags.terms-request-params',
				[ 'taxonomy', options.taxonomy, { post: postId } ]
			);
			const terms = getEntityRecords( ...termParams );

			termsIsLoading = (
				! hasFinishedResolution( 'getEntityRecords', termParams ) ||
				isResolving( 'getEntityRecords', termParams )
			);

			if ( ! termsIsLoading && !! terms ) {
				postRecord = Object.assign( {}, postRecord, { terms } );
			}
		}

		return {
			record: applyFilters(
				'generateblocks.editor.dynamicTags.postRecord',
				postRecord
			),
			isLoading: ( postRecordIsLoading || authorIsLoading || commentsIsLoading || termsIsLoading ),
		};
	}, [ postType, postId, load.join(), JSON.stringify( options ) ] );
}
