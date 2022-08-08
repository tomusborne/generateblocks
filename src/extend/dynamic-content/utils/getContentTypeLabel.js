import { __, sprintf } from '@wordpress/i18n';

/**
 * Returns the post meta label field label.
 *
 * @param {string} metaFieldName The meta field name.
 * @return {string} The meta field label.
 */
function getPostMetaLabel( metaFieldName ) {
	return !! metaFieldName
		? sprintf( 'Post meta: %s', metaFieldName )
		: __( 'Post meta', 'generateblocks' );
}

/**
 * Return the correct label for the content types.
 *
 * @param {Object} attributes   The block attributes.
 * @param {string} defaultLabel Default label.
 * @return {string} The content type label.
 */
export default function getContentTypeLabel( attributes, defaultLabel ) {
	const {
		useDynamicData,
		dynamicContentType,
		dynamicLinkType,
		isCaption,
		metaFieldName,
	} = attributes;

	if ( useDynamicData ) {
		const labels = {
			'post-title': __( 'Post title', 'generateblocks' ),
			'post-excerpt': __( 'Post excerpt', 'generateblocks' ),
			'post-date': __( 'Post date', 'generateblocks' ),
			'post-meta': getPostMetaLabel( metaFieldName ),
			'author-email': __( 'Author email', 'generateblocks' ),
			'author-name': __( 'Author name', 'generateblocks' ),
			'author-nickname': __( 'Author nickname', 'generateblocks' ),
			'author-first-name': __( 'Author first name', 'generateblocks' ),
			'author-last-name': __( 'Author last name', 'generateblocks' ),
			'author-meta': __( 'Author meta', 'generateblocks' ),
			'pagination-numbers': __( 'Page numbers', 'generateblocks' ),
			caption: __( 'Caption', 'generateblocks' ),
			terms: __( 'List of terms', 'generateblocks' ),
			'comments-number': __( 'Comments number', 'generateblocks' ),
		};

		const linkLabels = {
			'single-post': __( 'Single post', 'generateblocks' ),
			'author-archives': __( 'Author archives', 'generateblocks' ),
			'comments-area': __( 'Comments area', 'generateblocks' ),
			'post-meta': getPostMetaLabel( metaFieldName ),
			'previous-posts': __( 'Previous posts', 'generateblocks' ),
			'next-posts': __( 'Next posts', 'generateblocks' ),
			'term-archives': __( 'Term archives', 'generateblocks' ),
			'pagination-prev': __( 'Previous page', 'generateblocks' ),
			'pagination-next': __( 'Next page', 'generateblocks' ),
		};

		if ( Object.keys( labels ).includes( dynamicContentType ) ) {
			return labels[ dynamicContentType ];
		}

		if ( Object.keys( linkLabels ).includes( dynamicLinkType ) ) {
			return linkLabels[ dynamicLinkType ];
		}

		return __( 'Dynamic content', 'generateblocks' );
	}

	if ( isCaption ) {
		return __( 'Caption', 'generateblocks' );
	}

	return defaultLabel;
}
