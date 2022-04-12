import {
	createSlice,
	createEntityAdapter,
} from '@reduxjs/toolkit';

import {
	fetchOneRecord,
	fetchManyRecords,
} from './actions';

export const objectAdapter = createEntityAdapter();
const typesAdapter = createEntityAdapter( {
	selectId: ( type ) => ( type.slug ),
} );

function isPendingAction( action ) {
	return (
		action.type.endsWith( 'fetchMany/pending' ) ||
		action.type.endsWith( 'fetchOne/pending' )
	);
}

function isRejectedAction( action ) {
	return (
		action.type.endsWith( 'fetchMany/rejected' ) ||
		action.type.endsWith( 'fetchOne/rejected' )
	);
}

function getAdapter( kind ) {
	return 'types' === kind ? typesAdapter : objectAdapter;
}

export const dataSlice = createSlice( {
	name: 'generateBlocks/data',

	initialState: {
		loadedObjects: [],
	},

	reducers: {},

	extraReducers: ( builder ) => {
		builder

			.addCase( fetchOneRecord.fulfilled, ( state, action ) => {
				const key = action?.meta?.arg?.kind;

				getAdapter( key ).setOne( state[ key ], action.payload );
				state[ key ].status = 'idle';
			} )

			.addCase( fetchManyRecords.fulfilled, ( state, action ) => {
				const key = action?.meta?.arg?.kind;

				getAdapter( key ).setMany( state[ key ], action?.payload );
				state[ key ].status = 'idle';
			} )

			.addMatcher( isPendingAction, ( state, action ) => {
				const key = action?.meta?.arg?.kind;

				if ( ! state?.loadedObjects.includes( key ) ) {
					state?.loadedObjects.push( key );
					state[ key ] = getAdapter( key ).getInitialState( {
						status: 'pending',
					} );
				}
			} )

			.addMatcher( isRejectedAction, ( state, action ) => {
				const key = action?.meta?.arg?.kind;

				state[ key ].status = 'rejected';
				state[ key ].error = action?.error;
			} )
	},

} );

export * from './selectors';
export * from './actions';

export default dataSlice.reducer;
