import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';

import {
	useSelector,
	useDispatch,
	Provider,
} from 'react-redux';

import store from '../store';
import {
	setStatus,
	fetchPostsAsync,
	selectPosts,
	selectStatus,
} from '../store/posts/postsSlice';
import { useEffect } from '@wordpress/element';

function BlockEdit() {
	const posts = useSelector( selectPosts );
	const status = useSelector( selectStatus )

	const dispatch = useDispatch();

	// useEffect( () => {
	// 	dispatch( fetchPostsAsync( 'posts' ) );
	// }, [] );

	return (
		<>
			<span>{ status }</span>
			<button onClick={ () => { dispatch( fetchPostsAsync( 'posts' ) ) } }>CLick me</button>
			{ !! posts &&
				<ul>
					{ posts.map( ( post ) => (
						<li>{ post?.title?.rendered }</li>
					) ) }
				</ul>
			}
		</>
	);
}

registerBlockType( 'generateblocks/redux', {
	apiVersion: 2,
	title: __( 'Redux', 'generateblocks' ),
	description: __( 'Redux block.', 'generateblocks' ),
	category: 'generateblocks',
	attributes: { },
	edit: ( props ) => (
		<Provider store={ store }>
			<BlockEdit { ...props } />
		</Provider>
	),
	save: () => null,
} );
