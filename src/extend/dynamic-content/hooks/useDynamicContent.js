import { __, sprintf } from '@wordpress/i18n';
import { useEntityProp } from '@wordpress/core-data';
import getContent from '../utils/getContent';
import usePostTypeRecord from '../../../hooks/usePostTypeRecord';

export default ( attributes ) => {
	const { postId, postType, contentType } = attributes;

	if ( ! postType ) {
		return __( 'Post type not selected.', 'generateblocks' );
	}

	if ( postType && ! postId ) {
		return __( 'Post source not selected.', 'generateblocks' );
	}

	const [ siteFormat ] = useEntityProp( 'root', 'site', 'date_format' );

	const relations = [];

	if ( contentType.startsWith( 'author' ) ) {
		relations.push( 'author' );
	}

	if ( contentType.startsWith( 'comments' ) ) {
		relations.push( 'comments' );
	}

	if ( 'terms' === contentType ) {
		relations.push( 'terms.' + attributes.termTaxonomy );
	}

	const { record, status } = usePostTypeRecord( postType, postId, relations );

	if ( 'pending' === status ) {
		return __( 'Loading...', 'generateblocks' );
	}

	if ( ! record && [ 'rejected', 'idle' ].includes( status ) ) {
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
