/**
 * Returns the state of given object kind.
 *
 * @param kind The object kind to retrieve.
 * @returns {Object} The object state.
 */
export const selectObject = ( kind ) => ( ( state ) => ( state?.generateBlocks?.data[ kind ] ) );
