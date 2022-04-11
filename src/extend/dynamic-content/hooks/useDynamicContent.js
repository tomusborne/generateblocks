import { __, sprintf } from '@wordpress/i18n';
import { useEntityProp } from '@wordpress/core-data';
import getContent from '../utils/getContent';
import usePostRecord from './usePostRecord';

export default ( attributes ) => {
	const { postId, postType } = attributes;

	if ( ! postType ) {
		return __( 'Post type not selected.', 'generateblocks' );
	}

	if ( postType && ! postId ) {
		return __( 'Post source not selected.', 'generateblocks' );
	}

	const [ siteFormat ] = useEntityProp( 'root', 'site', 'date_format' );

	const recordLoad = 'terms' === attributes.contentType ? [ 'terms' ] : [];
	const recordLoadOptions = 'terms' === attributes.contentType ? { taxonomy: attributes.termTaxonomy } : {};

	const record = usePostRecord( postType, postId, recordLoad, recordLoadOptions );

	if ( ! record ) {
		return sprintf(
			// translators: %1$s: post ID, %2$s: post type.
			__( 'Post of id #%1$s and post type %2$s was not found.', 'generateblocks' ),
			postId,
			postType
		);
	}

	const contentAttributes = Object.assign( {}, attributes, { dateFormat: siteFormat } );

	return getContent( attributes.contentType, record, contentAttributes );
};
