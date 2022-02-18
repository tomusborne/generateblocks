/**
 * Applies the context to the attributes.
 *
 * @param {Object} context    The block context.
 * @param {Object} attributes The block attributes.
 * @return {Object} The attributes.
 */
export default function applyContext( context, attributes ) {
	if ( attributes.dynamicSource === 'current-post' ) {
		return Object.assign( {}, attributes, context );
	}

	return attributes;
}
