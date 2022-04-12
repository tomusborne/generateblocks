import { combineReducers, configureStore } from '@reduxjs/toolkit';
import dataSlice from './data/slice';

const rootReducer = combineReducers( {
	data: dataSlice,
} );

export default configureStore({
	reducer: {
		generateBlocks: rootReducer,
	},
});

