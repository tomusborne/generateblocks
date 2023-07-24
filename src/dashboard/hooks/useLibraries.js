import { isArray, isFunction, isMap, mergeWith } from 'lodash';
import { useCallback, useEffect, useReducer } from '@wordpress/element';
import { addQueryArgs } from '@wordpress/url';
import apiFetch from '@wordpress/api-fetch';

/**
 * Customizer for lodash.mergeWith to concat arrays and Maps.
 *
 * @param {any} objValue The object value.
 * @param {any} srcValue The source object value.
 * @return {Array|Map|undefined} The concatenated arrays, maps or undefined.
 */
function concatArraysCustomizer( objValue, srcValue ) {
	if ( isArray( objValue ) && isArray( srcValue ) ) {
		return objValue.concat( srcValue );
	}

	if ( isMap( objValue ) && isMap( srcValue ) ) {
		return new Map( [ ...objValue, ...srcValue ] );
	}
}

/**
 * Reducer action that deeply merges the payload to the state, arrays ara concatenated.
 *
 * @param {Object} state   The reducer state.
 * @param {Object} payload The action payload.
 * @return {Object} The new state with payload merged.
 */
function reducerMergeAction( state, payload ) {
	return mergeWith( {}, state, payload, concatArraysCustomizer );
}

/**
 * Creates a collection.
 *
 * @param {Array} rawData The raw data from the API.
 * @return {Map} The data collection.
 */
function createCollection( rawData ) {
	return rawData.reduce( ( data, item ) => {
		data.set( item.id, item );

		return data;
	}, new Map() );
}

/**
 * Returns Map values as array.
 *
 * @param {Map} collection The collection to loop.
 * @return {Array} The return.
 */
export function arrayFromCollection( collection ) {
	return Array.from( collection.values() );
}

const REQUEST_INITIALIZED = 'request-initialized';
const REQUEST_FINALIZED = 'request-finalized';
const UPDATE_DATA = 'update-data';
const DELETE_DATA = 'delete-data';
const REQUEST_ERROR = 'request-error';

const initialState = {
	isLoading: false,
	error: false,
	data: new Map(),
};

const setIsLoading = ( isLoading ) => ( {
	type: REQUEST_INITIALIZED,
	payload: { isLoading },
} );

const setData = ( data ) => ( {
	type: REQUEST_FINALIZED,
	payload: { data, isLoading: false },
} );

const updateData = ( id, data ) => ( {
	type: UPDATE_DATA,
	payload: { id, data },
} );

const deleteData = ( id ) => ( {
	type: DELETE_DATA,
	payload: { id },
} );

const setError = ( error ) => ( {
	type: REQUEST_ERROR,
	payload: { error, isLoading: false },
} );

const actionsMap = new Map( [
	[ REQUEST_INITIALIZED, reducerMergeAction ],
	[ REQUEST_FINALIZED, reducerMergeAction ],
	[ REQUEST_ERROR, reducerMergeAction ],
	[
		UPDATE_DATA,
		function( state, payload ) {
			const newState = { ...state };
			const oldData = newState.data.get( payload.id );

			newState.data.set( payload.id, { ...oldData, ...payload.data } );

			return newState;
		},
	],
	[
		DELETE_DATA,
		function( state, payload ) {
			const newState = { ...state };

			newState.data.delete( payload.id );

			return newState;
		},
	],
] );

function reducer( state, action ) {
	if ( ! actionsMap.has( action.type ) ) {
		throw new Error( `Invalid action type: ${ action.type }` );
	}

	const newState = Object.assign( {}, state );
	const actionCallback = actionsMap.get( action.type );

	if ( isFunction( actionCallback ) ) {
		return actionCallback( newState, action.payload );
	}

	throw new Error( `Invalid action callback: ${ action.type }` );
}

export default function useLibraries() {
	const endpoint = 'generateblocks/v1/pattern-library/libraries';
	const saveEndpoint = 'generateblocks/v1/pattern-library/libraries/save';

	const [ state, dispatch ] = useReducer( reducer, initialState, () => initialState );

	const fetchAction = useCallback( ( queryArgs = {} ) => {
		const path = addQueryArgs( endpoint, queryArgs );

		dispatch( setIsLoading( true ) );

		apiFetch( { method: 'GET', path } )
			.then( ( { data } ) => createCollection( data ) )
			.then( ( collection ) => dispatch( setData( collection ) ) )
			.catch( ( { error } ) => dispatch( setError( error ) ) );
	}, [ endpoint ] );

	const updateAction = ( id, data ) => {
		dispatch( updateData( id, data ) );
	};

	const deleteAction = ( id ) => {
		dispatch( deleteData( id ) );
	};

	const saveAction = useCallback( () => {
		dispatch( setIsLoading( true ) );
		const data = arrayFromCollection( state.data );

		apiFetch( { method: 'POST', path: saveEndpoint, data: { data } } )
			.then( () => fetchAction() )
			.catch( ( { error } ) => dispatch( setError( error ) ) );
	}, [ endpoint, JSON.stringify( arrayFromCollection( state.data ) ) ] );

	useEffect( () => {
		fetchAction();
	}, [] );

	return [
		state,
		fetchAction,
		updateAction,
		deleteAction,
		saveAction,
	];
}
