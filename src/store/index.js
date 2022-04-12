import { combineReducers, configureStore } from '@reduxjs/toolkit';
import dataReducer from './data/slice';
import queryLoopReducer from './query-loop/slice';

const rootReducer = combineReducers( {
	data: dataReducer,
	queryLoop: queryLoopReducer,
} );

export default configureStore({
	reducer: {
		generateBlocks: rootReducer,
	},
});

