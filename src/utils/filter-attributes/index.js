/**
 * Given an attributes object will return only the allowed attributes
 *
 * @param {Object} attributes  Full block attributes
 * @param {Array}  allowedKeys The allowed attributes
 * @return {Object} The filtered attributes object
 */
export default ( attributes, allowedKeys = [] ) => Object
	.keys( attributes )
	.filter( ( key ) => allowedKeys.includes( key ) )
	.reduce( ( result, key ) => Object.assign( {}, result, { [ key ]: attributes[ key ] } ), {} );
