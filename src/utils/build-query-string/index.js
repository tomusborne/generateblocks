/**
 * Generates URL-encoded query string using input query data.

 * Copied from core packages/url/src/build-query-string.js
 *
 * @param {Object} data Data to encode.
 * @returns {string} Query string.
 */
export function buildQueryString( data ) {
	let string = '';

	const stack = Object.entries( data );

	let pair;
	while ( ( pair = stack.shift() ) ) {
		let [ key, value ] = pair;

		// Support building deeply nested data, from array or object values.
		const hasNestedData =
			Array.isArray( value ) || ( value && value.constructor === Object );

		if ( hasNestedData ) {
			// Push array or object values onto the stack as composed of their
			// original key and nested index or key, retaining order by a
			// combination of Array#reverse and Array#unshift onto the stack.
			const valuePairs = Object.entries( value ).reverse();
			for ( const [ member, memberValue ] of valuePairs ) {
				stack.unshift( [ `${ key }[${ member }]`, memberValue ] );
			}
		} else if ( value !== undefined ) {
			// Null is treated as special case, equivalent to empty string.
			if ( value === null ) {
				value = '';
			}

			string +=
				'&' + [ key, value ].map( encodeURIComponent ).join( '=' );
		}
	}

	// Loop will concatenate with leading `&`, but it's only expected for all
	// but the first query parameter. This strips the leading `&`, while still
	// accounting for the case that the string may in-fact be empty.
	return string.substr( 1 );
}
