import { useReducer } from '@wordpress/element';
import { unionBy, orderBy } from 'lodash';

const defaultState = {
	query: {},
	records: [],
	isLoading: false,
};

function init( initialState ) {
	return Object.assign( {}, defaultState, initialState );
}

function recordsReducer( state, action ) {
	const newState = { ...state };

	switch ( action.type ) {
		case 'SET_RECORDS':
			return Object.assign( {}, newState, {
				records: orderBy(
					unionBy( newState.records, action.payload, 'id' ),
					( post ) => ( post.date ),
					[ 'desc' ]
				),
			} );

		case 'SET_QUERY':
			return Object.assign( {}, newState, {
				query: Object.assign( {}, newState.query, action.payload ),
			} );

		case 'SET_IS_LOADING':
			return Object.assign( {}, newState, {
				isLoading: action.payload,
			} );

		case 'RESET':
			return Object.assign( {}, newState, { records: [] } );

		default:
			return newState;
	}
}

export default function useRecordsReducer( initialState = defaultState ) {
	const [ state, dispatch ] = useReducer( recordsReducer, initialState, init );

	return {
		records: state.records,
		setRecords: ( payload = [] ) => ( dispatch( { type: 'SET_RECORDS', payload } ) ),
		query: state.query,
		setQuery: ( payload = {} ) => ( dispatch( { type: 'SET_QUERY', payload } ) ),
		isLoading: state.isLoading,
		setIsLoading: ( payload = false ) => ( dispatch( { type: 'SET_IS_LOADING', payload } ) ),
		reset: () => ( dispatch( { type: 'RESET' } ) ),
	};
}
