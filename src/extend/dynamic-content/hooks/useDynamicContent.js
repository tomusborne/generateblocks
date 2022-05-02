import { __, sprintf } from '@wordpress/i18n';
import { useEntityProp } from '@wordpress/core-data';
import getContent from '../utils/getContent';
import usePostRecord from './usePostRecord';

function getExtraLoad( contentType, attributes ) {
	const load = [];
	let loadOptions = {};

	if ( contentType.startsWith( 'author-' ) ) {
		load.push( 'author' );
	}

	if ( 'terms' === contentType ) {
		load.push( 'terms' );
		loadOptions = Object.assign( {}, loadOptions, { taxonomy: attributes.termTaxonomy } );
	}

	if ( 'comments-number' === contentType ) {
		load.push( 'comments' );
	}

	return { load, loadOptions };
}

export default ( attributes, name ) => {
	const { postId, postType } = attributes;

	if ( ! postType ) {
		return __( 'Post type not selected.', 'generateblocks' );
	}

	if ( postType && ! postId ) {
		return __( 'Post source not selected.', 'generateblocks' );
	}

	const [ siteFormat ] = useEntityProp( 'root', 'site', 'date_format' );

	const { load, loadOptions } = getExtraLoad( attributes.dynamicContentType, attributes );
	const { record, isLoading } = usePostRecord( postType, postId, load, loadOptions );

	if ( 'generateblocks/image' === name && ! record ) {
		return undefined;
	}

	if ( isLoading ) {
		return __( 'Loading…', 'generateblocks' );
	}

	if ( ! record ) {
		return sprintf(
			// translators: %1$s: post ID, %2$s: post type.
			__( 'Post of id #%1$s and post type %2$s was not found.', 'generateblocks' ),
			postId,
			postType
		);
	}

	const contentAttributes = Object.assign( {}, attributes, { dateFormat: siteFormat } );
	const forceEmptyMessage = 'generateblocks/image' === name;

	return getContent( attributes.dynamicContentType, record, contentAttributes, forceEmptyMessage );
};
