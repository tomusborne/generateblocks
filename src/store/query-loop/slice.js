import { createSlice } from '@reduxjs/toolkit';
import { fetchManyRecords } from '../data/actions';
import _ from 'lodash';

export const queryLoopSlice = createSlice( {
	name: 'generateblocks/queryLoop',

	initialState: {},

	reducers: {},

	extraReducers: ( builder ) => {
		builder
			.addMatcher(
				( action ) => ( action.type.endsWith( fetchManyRecords.pending ) ),
				( state, action ) => {
					if ( !! action?.meta?.arg?.uniqueId ) {
						state[ action?.meta?.arg?.uniqueId ] = { ids: [], status: 'pending' };
					}
				}
			)
			.addMatcher(
				( action ) => ( action.type.endsWith( fetchManyRecords.fulfilled ) ),
				(state, action) => {
					if ( !! action?.meta?.arg?.uniqueId ) {
						state[ action?.meta?.arg?.uniqueId ] = {
							ids: _.map( action?.payload, 'id' ),
							status: 'fulfilled',
						};
					}
				}
			);
	},
} );

export * from './actions';

export default queryLoopSlice.reducer;
