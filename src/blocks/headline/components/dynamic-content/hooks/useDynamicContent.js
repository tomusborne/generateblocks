import { __ } from '@wordpress/i18n';
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
		const { getEntityRecord, getUser } = select( coreStore );
		const postRecord = getEntityRecord( 'postType', postType, postId );
		const author = getUser( postRecord?.author );

		return Object.assign( {}, postRecord, { author } );
	}, [ postType, postId ] );

	if ( ! record ) {
		return __( 'Post was not found.', 'generateblocks' );
	}

	const [ siteFormat ] = useEntityProp( 'root', 'site', 'date_format' );

	return getContent( record, {
		contentType: attributes.contentType,
		siteDateFormat: siteFormat,
		postType,
	} );
};
