import {
	createSlice,
	createEntityAdapter,
} from '@reduxjs/toolkit';

import {
	fetchOneRecord,
	fetchManyRecords,
} from './actions';

export const idAdapter = createEntityAdapter();
const slugAdapter = createEntityAdapter( {
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

function isFulfilledAction( action ) {
	return (
		action.type.endsWith( 'fetchMany/fulfilled' ) ||
		action.type.endsWith( 'fetchOne/fulfilled' )
	);
}

function getAdapter( kind ) {
	return (
		'types' === kind
		|| 'taxonomies' === kind
	) ? slugAdapter : idAdapter;
}

export const dataSlice = createSlice( {
	name: 'generateBlocks/data',

	initialState: {
		loadedObjects: [],
		relations: {},
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
				const adapterMethod = !! action?.meta?.arg?.setAll
					? getAdapter( key ).setAll
					: getAdapter( key ).setMany;

				adapterMethod( state[ key ], action?.payload );
				state[ key ].status = 'idle';
			} )

			.addMatcher( isFulfilledAction, ( state, action ) => {
				const kind = action?.meta?.arg?.kind;
				const relationKind = action?.meta?.arg?.relationKind;
				const relationId = action?.meta?.arg?.relationId;
				const hasRelation = action?.meta?.arg?.hasRelation || false;
				const relationKey = `${ relationKind }-${ kind }`;

				if ( hasRelation ) {
					state.relations = {
						...state.relations,
						[ relationKey ]: {
							...state?.relations[ relationKey ],
							[ relationId ]: action?.payload?.map( ( item ) => ( item.id ) ),
						},
					};
				}
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
