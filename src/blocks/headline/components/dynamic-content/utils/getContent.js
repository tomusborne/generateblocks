import { __ } from '@wordpress/i18n';
import { dateI18n } from '@wordpress/date';

/**
 * Returns the post content
 *
 * @param {Object} record The post object
 * @param {Object} options Options to retrieve the correct content
 * @returns {string} The content
 */
export default ( record, options ) => {
	switch ( options.contentType ) {
		case 'post-title':
			return getPostTitle( record );

		case 'post-excerpt':
			return getPostExcerpt( record );

		case 'post-date-published':
			return getPostDate( record, options.siteDateFormat, 'published' );

		case 'post-date-updated':
			return getPostDate( record, options.siteDateFormat, 'updated' );

		case 'author-email':
		case 'author-name':
		case 'author-nickname':
		case 'author-first-name':
		case 'author-last-name':
			return getPostAuthor( record?.author, options.contentType );

		default:
			return __( `Content type "${ options.contentType }" is not supported.`, 'generateblocks' );
	}
};

/**
 * Return the post title
 *
 * @param {Object} record The post object
 * @returns {string} The post title
 */
const getPostTitle = ( record ) => record?.title?.raw || __( 'No post title.', 'generateblocks' );

/**
 * Returns the post excerpt
 *
 * @param {Object} record The post object
 * @returns {string} The post excerpt
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
 * @param {Object} record The post object
 * @param {string} siteDateFormat The global site date format
 * @param {string} dateType The date type
 * @returns {string} The post date
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
 * @param {Object} record Author object
 * @param contentType The author content type
 * @returns {string} THe content
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
