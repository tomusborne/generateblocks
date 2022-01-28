import { __, sprintf } from '@wordpress/i18n';
import { useSelect } from '@wordpress/data';
import { store as coreStore, useEntityProp } from '@wordpress/core-data';
import getContent from '../utils/getContent';

export default ( context, attributes ) => {
	const { postId, postType } = attributes.dynamicSource === 'current-post' ? context : attributes;

	if ( ! postType ) {
		return __( 'Select source post type', 'generateblocks' );
	}

	if ( postType && ! postId ) {
		return __( 'Select source post', 'generateblocks' );
	}

	const record = useSelect( ( select ) => {
		const { getEntityRecord, getEntityRecords, getUser } = select( coreStore );
		const postRecord = getEntityRecord( 'postType', postType, postId );
		const author = getUser( postRecord?.author );
		const comments = getEntityRecords( 'root', 'comment', { post: postId } );

		return Object.assign( {}, postRecord, { author, comments } );
	}, [ postType, postId ] );

	if ( ! record ) {
		return sprintf(
			// translators: %1$s: post ID, %2$s: post type.
			__( 'Post of id #%1$s and post type %2$s was not found.', 'generateblocks' ),
			postId,
			postType
		);
	}

	const [ siteFormat ] = useEntityProp( 'root', 'site', 'date_format' );

	return getContent( record, {
		contentType: attributes.contentType,
		dateType: attributes.dateType,
		dateReplacePublished: attributes.dateReplacePublished,
		metaFieldName: attributes.metaFieldName,
		siteDateFormat: siteFormat,
		noCommentsText: attributes.noCommentsText,
		singleCommentText: attributes.singleCommentText,
		multipleCommentsText: attributes.multipleCommentsText,
		postType,
	} );
};
