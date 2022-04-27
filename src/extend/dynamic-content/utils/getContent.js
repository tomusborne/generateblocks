import { __, sprintf } from '@wordpress/i18n';
import { dateI18n } from '@wordpress/date';

/**
 * The content type selectors map.
 *
 * @type {Object}
 */
const contentTypeSelectors = {
	'post-title': getPostTitle,
	'post-excerpt': getPostExcerpt,
	'post-date': getPostDate,
	'post-meta': getPostMetaValue,
	'author-meta': getAuthorMetaValue,
	'author-email': getAuthorEmail,
	'author-name': getAuthorName,
	'author-nickname': getAuthorNickname,
	'author-first-name': getAuthorFirstName,
	'author-last-name': getAuthorLastName,
	'comments-number': getPostCommentsNumber,
	'pagination-numbers': getPaginationNumbers,
	'featured-image': getPostFeaturedImage,
	terms: getPostTerms,
	'author-avatar': getAuthorAvatar,
	caption: getCaption,
	'alt-text': getAltText,
	description: getDescription,
};

/**
 * Returns the record content by type.
 *
 * @param {string} dynamicContentType The content type to select.
 * @param {Object} record      The post object.
 * @param {Object} attributes  The dynamic content attributes.
 * @param {Boolean} emptyNotFoundMessage If the message should be undefined.
 * @return {string} The selected content.
 */
export default function getContent( dynamicContentType, record, attributes, emptyNotFoundMessage = false ) {
	const contentSelector = contentTypeSelectors[ dynamicContentType ];

	if ( contentSelector && 'function' === typeof contentSelector ) {
		return contentSelector( record, attributes, emptyNotFoundMessage );
	}

	return contentTypeNotSupported( record, attributes, emptyNotFoundMessage );
}

/**
 * Returns message for not supported content types.
 *
 * @param {Object} record     The post object.
 * @param {Object} attributes The dynamic content attributes.
 * @param {Boolean} emptyNotFoundMessage If the message should be undefined.
 * @return {string} Text for non-supported content.
 */
function contentTypeNotSupported( record, attributes, emptyNotFoundMessage ) {
	return ! emptyNotFoundMessage ? sprintf(
		// translators: %s: Content type.
		__( 'Content type %s is not supported.', 'generateblocks' ),
		attributes.dynamicContentType
	) : undefined;
}

/**
 * Return the post title.
 *
 * @param {Object} record The post object.
 * @return {string} The post title.
 */
function getPostTitle( record ) {
	return record.title.raw || __( 'No post title.', 'generateblocks' );
}

/**
 * Returns the post excerpt.
 *
 * @param {Object} record     The post object.
 * @param {Object} attributes The dynamic content attributes.
 * @return {string} The post excerpt.
 */
function getPostExcerpt( record, attributes ) {
	const {
		raw: rawExcerpt,
		rendered: renderedExcerpt,
		protected: isProtected,
	} = record?.excerpt;

	const {
		raw: rawContent,
		rendered: renderedContent,
	} = record?.content;

	if ( isProtected || ( ! rawContent && ! renderedContent ) ) {
		return __( 'No post excerpt.', 'generateblocks' );
	}

	const buildExcerptFromContent = ( text ) => text
		.replace( ( /  |\r\n|\n|\r/gm ), ' ' ) // Remove new lines and tabs.
		.split( ' ' ).filter( ( word ) => '' !== word ) // Create array of words.
		.splice( 0, ( attributes.excerptLength - 1 ) ) // Trim array to excerpt length (minus 1 as arrays start at 0).
		.join( ' ' ); // Turn array back into string.

	// Create an excerpt with HTML markup so we can see if the More tag exists
	// within our excerpt length.
	const excerptWithMarkup = buildExcerptFromContent( renderedContent );
	const hasMoreTag = excerptWithMarkup.includes( '<!--more-->' );

	// Remove markup from our content.
	const renderedText = ( text ) => new window.DOMParser().parseFromString( text, 'text/html' );
	const excerptDocument = renderedText( renderedExcerpt );
	const contentDocument = renderedText( renderedContent );
	const readMoreDocument = renderedText( generateBlocksInfo.excerptMore );
	const strippedExcerptContent = excerptDocument.body.textContent || excerptDocument.body.innerText || '';
	const strippedRenderedContent = contentDocument.body.textContent || contentDocument.body.innerText || '';
	let strippedExcerptMore = readMoreDocument.body.textContent || readMoreDocument.body.innerText || '';
	strippedExcerptMore = strippedExcerptMore.replace( '...', '…' );

	// Use excerpt if we have a more tag.
	let excerpt = hasMoreTag
		? strippedExcerptContent
		: strippedRenderedContent;

	// Use manual excerpt if it's set.
	excerpt = rawExcerpt.trim() ? rawExcerpt : excerpt;

	// Check if we have a read more link by default.
	const hasReadMore = excerpt.includes( strippedExcerptMore ) || ( ! hasMoreTag && ! rawExcerpt.trim() );

	// Remove more text from excerpt so it doesn't count towards our excerpt length.
	excerpt = hasReadMore
		? excerpt.replace( strippedExcerptMore, '' )
		: excerpt;

	// Create an excerpt from the content.
	if ( ! rawExcerpt.trim() && ! hasMoreTag ) {
		excerpt = buildExcerptFromContent( excerpt );
	}

	// Re-add more text to excerpt.
	if ( hasReadMore ) {
		if ( ! attributes.useDefaultMoreLink ) {
			excerpt += ' ... ' + '<a href="#">' + attributes.customMoreLinkText + '</a>';
		} else {
			excerpt += generateBlocksInfo.excerptMore;
		}
	}

	return excerpt;
}

/**
 * Returns the post date.
 *
 * @param {Object} record     The post object.
 * @param {Object} attributes The dynamic content attributes.
 * @return {string} The post date.
 */
function getPostDate( record, attributes ) {
	let dateType = attributes.dateType;

	if ( 'published' === dateType && attributes.dateReplacePublished ) {
		dateType = 'updated';
	}

	if ( ! record.date ) {
		return __( 'No post date.', 'generateblocks' );
	}

	const dateContent = dateType === 'updated' ? record.modified : record.date;

	return dateI18n( attributes.dateFormat || 'F j, Y', dateContent, '' );
}

/**
 * Check if value is string or number.
 *
 * @param {*} value The value to check.
 * @return {boolean} Whether a value is a string or a number.
 */
function isStringOrNumber( value ) {
	return typeof value === 'string' || typeof value === 'number';
}

/**
 * Returns the meta value of given key.
 *
 * @param {string} metaField        The meta field name.
 * @param {Object} metaValues       The post meta values.
 * @param {Object} customMetaValues The custom meta values.
 * @param {Boolean} emptyNotFoundMessage If the message should be undefined.
 * @return {string} The meta value.
 */
const getMetaValue = ( metaField, metaValues, customMetaValues, emptyNotFoundMessage = false ) => {
	if ( metaValues && metaValues[ metaField ] ) {
		return isStringOrNumber( metaValues[ metaField ] )
			? metaValues[ metaField ]
			: ( ! emptyNotFoundMessage ? __( 'Meta value not supported.', 'generateblocks' ) : undefined );
	}

	if ( customMetaValues && customMetaValues[ metaField ] ) {
		return isStringOrNumber( customMetaValues[ metaField ] )
			? customMetaValues[ metaField ]
			: ( ! emptyNotFoundMessage ? __( 'Meta value not supported.', 'generateblocks' ) : undefined );
	}

	return ! emptyNotFoundMessage ? __( 'No meta value.', 'generateblocks' ) : undefined;
};

/**
 * Returns the post meta values.
 *
 * @param {Object} record     The post object.
 * @param {Object} attributes The dynamic content attributes.
 * @param {Boolean} emptyNotFoundMessage If the message should be undefined.
 * @return {string} The post meta value.
 */
function getPostMetaValue( record, attributes, emptyNotFoundMessage = false ) {
	return getMetaValue( attributes.metaFieldName, record.meta, record.acf, emptyNotFoundMessage );
}

/**
 * Returns the author meta values.
 *
 * @param {Object} record     The post object.
 * @param {Object} attributes The dynamic content attributes.
 * @return {string} The author meta value.
 */
function getAuthorMetaValue( record, attributes ) {
	if ( ! record.author ) {
		return authorNotFound();
	}

	return getMetaValue( attributes.metaFieldName, record.author.meta, record.author.acf );
}

/**
 * Returns author not found.
 *
 * @return {string} Text when author is not found.
 */
function authorNotFound() {
	return __( 'Author not found.', 'generateblocks' );
}

/**
 * Returns the author email.
 *
 * @param {Object} record The post object.
 * @return {string} The author email.
 */
function getAuthorEmail( record ) {
	if ( ! record.author ) {
		return authorNotFound();
	}

	return record.author.email || __( 'No author email.', 'generateblocks' );
}

/**
 * Returns the author name.
 *
 * @param {Object} record The post object.
 * @return {string} The author name.
 */
function getAuthorName( record ) {
	if ( ! record.author ) {
		return authorNotFound();
	}

	return record.author.name || __( 'No author name.', 'generateblocks' );
}

/**
 * Returns the author nickname.
 *
 * @param {Object} record The post object.
 * @return {string} The author nickname.
 */
function getAuthorNickname( record ) {
	if ( ! record.author ) {
		return authorNotFound();
	}

	return record.author.nickname || __( 'No author nickname.', 'generateblocks' );
}

/**
 * Returns the author first name.
 *
 * @param {Object} record The post object.
 * @return {string} The author first name.
 */
function getAuthorFirstName( record ) {
	if ( ! record.author ) {
		return authorNotFound();
	}

	return record.author.first_name || __( 'No author first name.', 'generateblocks' );
}

/**
 * Returns the author last name.
 *
 * @param {Object} record The post object.
 * @return {string} The author first name.
 */
function getAuthorLastName( record ) {
	if ( ! record.author ) {
		return authorNotFound();
	}

	return record.author.last_name || __( 'No author last name.', 'generateblocks' );
}

/**
 * Returns the post comments number.
 *
 * @param {Object} record     The post object.
 * @param {Object} attributes The dynamic content attributes.
 * @return {string} The post comments number.
 */
function getPostCommentsNumber( record, attributes ) {
	const commentsLength = Array.isArray( record.comments ) ? record.comments.length : 0;
	const {
		noCommentsText,
		singleCommentText,
		multipleCommentsText,
	} = attributes;

	if ( commentsLength === 0 ) {
		return noCommentsText;
	}

	if ( commentsLength === 1 ) {
		return singleCommentText;
	}

	return multipleCommentsText.replace( '%', String( commentsLength ) );
}

/**
 * Returns the post terms list.
 *
 * @param {Object} record     The post object.
 * @param {Object} attributes The dynamic content attributes.
 * @return {string} The post terms list.
 */
function getPostTerms( record, attributes ) {
	if ( Array.isArray( record.terms ) && record.terms.length > 0 ) {
		return record.terms
			.map( ( term ) => ( term.name ) )
			.join( attributes.termSeparator );
	}

	return 'No terms';
}

/**
 * Return the pagination numbers.
 *
 * @return {string} The pagination numbers.
 */
function getPaginationNumbers() {
	return __( '1 … 2 3', 'generateblocks' );
}

/**
 * Returns post featured image.
 *
 * @param {Object} record The post object.
 * @return {string} The featured image url.
 */
function getPostFeaturedImage( record ) {
	return record?.featured_media;
}

/**
 * Returns post author avatar.
 *
 * @param {Object} record The post object.
 * @return {Object} The post author avatar.
 */
function getAuthorAvatar( record ) {
	return { source_url: record?.author?.avatar_urls[ 96 ] };
}

/**
 * Returns the caption.
 *
 * @param {Object} record The post object.
 * @return {string} The image caption.
 */
function getCaption( record ) {
	return record?.caption?.raw || __( 'Image caption', 'generateblocks' );
}

/**
 * Returns the alt text.
 *
 * @param {Object} record The post object.
 * @return {string} The image caption.
 */
function getAltText( record ) {
	return record?.alt_text || __( 'Image alt text', 'generateblocks' );
}

/**
 * Returns the description.
 *
 * @param {Object} record The post object.
 * @return {string} The image caption.
 */
function getDescription( record ) {
	return record?.description?.raw || __( 'Image description', 'generateblocks' );
}
