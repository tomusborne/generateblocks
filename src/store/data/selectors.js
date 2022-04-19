import _ from 'lodash';

/**
 * Returns the state of given object kind.
 *
 * @param kind The object kind to retrieve.
 *
 * @returns {Object} The object state.
 */
export const selectObject = ( kind ) => ( ( state ) => ( state?.generateBlocks?.data[ kind ] ) );

/**
 * Returns the state of a given object kind record.
 *
 * @param kind The object kind.
 * @param id   The record id.
 *
 * @returns {Object|undefined} The record state.
 */
export const selectObjectRecord = ( kind, id ) => ( ( state ) => {
	const object = selectObject( kind )( state );

	return object?.entities[ id ];
} );

/**
 * Returns state of given relation between two objects kind.
 *
 * @param relationKind The relation kind. (eg. posts)
 * @param kind The related kind (eg. comments)
 * @param id The record id of relationKind (eg. postId)
 */
export const selectRecordsFromRelation = ( relationKind, kind, id ) => ( ( state ) => {
	const relationKey = `${ relationKind }-${ kind }`;
	const relation = ( state?.generateBlocks?.data?.relations && state?.generateBlocks?.data?.relations[ relationKey ] );
	const ids = !! relation && Array.isArray( relation[ id ] ) ? relation[ id ] : [];
	const object = selectObject( kind )( state ) || {};

	return Object.values( _.pick( object?.entities, ids ) );
} );
