import { useReducer } from '@wordpress/element';

const ADD_QUERY_PARAMETER = 'add_query_parameter';
const REMOVE_QUERY_PARAMETER = 'remove_query_parameter';

const queryReducer = function( queryState, action ) {
	switch ( action.type ) {
		case ADD_QUERY_PARAMETER:
			return Object.assign( {}, queryState, action.payload );

		case REMOVE_QUERY_PARAMETER:
			const { [ action.payload ]: removedKey, ...newQueryState } = queryState; // eslint-disable-line no-unused-vars
			return newQueryState;

		default:
			throw new Error( `queryReducer does not support action type "${ action.type }".` );
	}
};

export default ( initialQueryState = {} ) => {
	const [ state, dispatch ] = useReducer( queryReducer, initialQueryState );

	return {
		queryState: state,
		setParameter: ( key, value ) => ( dispatch( { type: ADD_QUERY_PARAMETER, payload: { [ key ]: value } } ) ),
		insertParameters: ( payload ) => ( dispatch( { type: ADD_QUERY_PARAMETER, payload } ) ),
		removeParameter: ( payload ) => ( dispatch( { type: REMOVE_QUERY_PARAMETER, payload } ) ),
	};
};
