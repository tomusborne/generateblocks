/**
 * Applies the context to the attributes.
 *
 * @param {Object} context    The block context.
 * @param {Object} attributes The block attributes.
 * @return {Object} The attributes.
 */
export default function applyContext( context, attributes ) {
	if ( attributes.dynamicSource === 'current-post' ) {
		if ( attributes.isCaption ) {
			if ( 'undefined' !== typeof context[ 'generateblocks/dynamicImage' ] ) {
				context.postId = context[ 'generateblocks/dynamicImage' ];
				context.postType = 'attachment';
			} else {
				// Set the static post ID for the dynamic headline.
				context.postId = attributes.postId;
				context.postType = 'attachment';
			}
		}

		return Object.assign( {}, attributes, context );
	}

	return attributes;
}
