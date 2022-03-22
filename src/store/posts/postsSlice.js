import { createEntityAdapter,createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchPosts } from './postsAPI';

const initialState = {
	data: [],
	status: 'idle',
};

const postsAdapter = createEntityAdapter({
	selectId: (post) => post.id,
});

export const fetchPostsAsync = createAsyncThunk(
	'posts/fetchPosts',
	async () => ( await fetchPosts() )
);

export const postsSlice = createSlice( {
	name: 'posts',
	initialState,
	reducers: {
		// Simple reducer function
		setStatus: ( state, action ) => {
			// Safe to mutate data here cause of Immer
			state.status = action.payload;

		},
	},
	extraReducers: ( builder ) => {
		builder
			.addCase( fetchPostsAsync.pending, ( state ) => {
				state.status = 'loading';
			} )
			.addCase( fetchPostsAsync.fulfilled, ( state, action ) => {
				state.status = 'idle';
				state.data = action.payload;
			} )
	},
} );


export const { setStatus } = postsSlice.actions;

export const selectPosts = ( state ) => ( state.posts.data );
export const selectStatus = ( state ) => ( state.posts.status );

export default postsSlice.reducer;
