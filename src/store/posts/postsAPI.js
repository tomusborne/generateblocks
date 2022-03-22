import apiFetch from '@wordpress/api-fetch';

export function fetchPosts( postType = 'posts' ) {
	return apiFetch( { path: '/wp/v2/' + postType } );
}
