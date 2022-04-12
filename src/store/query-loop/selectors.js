/**
 * Returns the query loop data.
 * 
 * @param uniqueId The block uniqueId attribute.
 * @param kind The post type endpoint (posts, pages).
 * @returns {function(*): *[]} The array of posts.
 */
export const selectQueryLoopData = ( uniqueId, kind ) => ( ( state ) => {
	const ids = state?.generateBlocks?.queryLoop[ uniqueId ]?.ids || [];

	const posts = state?.generateBlocks?.data[kind]?.entities || {};

	return ids.map( ( id ) => ( posts[ id ] ) );
} );

/**
 * Return the request status of query loop data.
 *
 * @param uniqueId The block uniqueId attribute.
 * @returns {function(*)} The request status.
 */
export const selectQueryLoopDataStatus = ( uniqueId ) => ( ( state ) => (
	state?.generateBlocks?.queryLoop[ uniqueId ]?.status || 'idle'
) );
