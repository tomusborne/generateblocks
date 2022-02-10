import { __, sprintf } from '@wordpress/i18n';
import { dateI18n } from '@wordpress/date';

/**
 * Returns the post content
 *
 * @param {Object} record  The post object
 * @param {Object} options Options to retrieve the correct content
 * @return {string} The content
 */
export default ( record, options ) => {
	switch ( options.contentType ) {
		case 'post-title':
			return getPostTitle( record );

		case 'post-excerpt':
			return getPostExcerpt( record );

		case 'post-date':
			let dateType = options.dateType;

			if ( 'published' === dateType && options.dateReplacePublished ) {
				dateType = 'updated';
			}

			return getPostDate( record, options.siteDateFormat, dateType );

		case 'post-meta':
			return getPostMeta( record?.meta, options.metaFieldName );

		case 'author-meta':
			// @todo: Get author meta.
			return __( 'Author meta', 'generateblocks' );

		case 'terms':
			// @todo: Get list of terms.
			return __( 'List of terms', 'generateblocks' );

		case 'author-email':
		case 'author-name':
		case 'author-nickname':
		case 'author-first-name':
		case 'author-last-name':
			return getPostAuthor( record?.author, options.contentType );

		case 'comments-number':
			return getPostCommentsNumber(
				record.comments,
				options.noCommentsText,
				options.singleCommentText,
				options.multipleCommentsText,
			);

		default:
			return sprintf(
				// translators: %s: Content type.
				__( 'Content type %s is not supported.', 'generateblocks' ),
				options.contentType
			);
	}
};

/**
 * Return the post title
 *
 * @param {Object} record The post object
 * @return {string} The post title
 */
const getPostTitle = ( record ) => record?.title?.raw || __( 'No post title.', 'generateblocks' );

/**
 * Returns the post excerpt
 *
 * @param {Object} record The post object
 * @return {string} The post excerpt
 */
const getPostExcerpt = ( record ) => {
	const {
		raw: rawExcerpt,
		rendered: renderedExcerpt,
		protected: isProtected,
	} = record?.excerpt;

	if ( isProtected || ( ! rawExcerpt && ! renderedExcerpt ) ) {
		return __( 'No post excerpt.', 'generateblocks' );
	}

	const document = new window.DOMParser().parseFromString( renderedExcerpt, 'text/html' );
	const strippedRenderedExcerpt = document.body.textContent || document.body.innerText || '';

	return rawExcerpt || strippedRenderedExcerpt;
};

/**
 * Returns the post date
 *
 * @param {Object} record         The post object
 * @param {string} siteDateFormat The global site date format
 * @param {string} dateType       The date type
 * @return {string} The post date
 */
const getPostDate = ( record, siteDateFormat, dateType ) => {
	if ( ! record.date ) {
		return __( 'No post date.', 'generateblocks' );
	}

	const dateContent = dateType === 'updated' ? record?.modified : record?.date;

	return dateI18n( siteDateFormat || 'F j, Y', dateContent, '' );
};

/**
 * Returns the author content
 *
 * @param {Object} record      Author object
 * @param {string} contentType The author content type
 * @return {string} The content
 */
const getPostAuthor = ( record, contentType ) => {
	switch ( contentType ) {
		case 'author-email':
			return record?.email || __( 'No author email', 'generateblocks' );

		case 'author-name':
			return record?.name || __( 'No author name', 'generateblocks' );

		case 'author-nickname':
			return record?.nickname || __( 'No author nickname', 'generateblocks' );

		case 'author-first-name':
			return record?.first_name || __( 'No author first name', 'generateblocks' );

		case 'author-last-name':
			return record?.last_name || __( 'No author last name', 'generateblocks' );

		default:
			return __( 'No author found.', 'generateblocks' );
	}
};

/**
 * Returns the post meta.
 *
 * @param {Object} record Meta object
 * @param {string} metaField The meta field name.
 * @return {string} THe content
 */
const getPostMeta = ( record, metaField ) => {
	if ( record && record[ metaField ] ) {
		return record[ metaField ];
	}

	return __( 'Post meta', 'generateblocks' );
};

const getPostCommentsNumber = ( comments = [], noCommentsText, singleCommentText, multipleCommentsText ) => {
	const noComments = noCommentsText || __( 'No comments', 'generateblocks' );
	const singleComment = singleCommentText || __( '1 comment', 'generateblocks' );
	const multipleComments = multipleCommentsText || __( '% comments', 'generateblocks' );

	if ( Array.isArray( comments ) && comments.length > 0 ) {
		if ( comments.length > 1 ) {
			return multipleComments.replace( '%', String( comments.length ) );
		} else {
			return singleComment;
		}
	} else {
		return noComments;
	}
};
