import apiFetch from '@wordpress/api-fetch';

export async function replaceTags( content, context = {} ) {
	// Define an async function to fetch data
	try {
		const response = await apiFetch( {
			path: '/generateblocks/v1/dynamic-tag-replacements',
			method: 'POST',
			data: {
				content,
				context,
			},
		} );

		return response;
	} catch ( error ) {
		console.error( 'Error fetching data:', error ); // eslint-disable-line no-console
		return '';
	}
}
