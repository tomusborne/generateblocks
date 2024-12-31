import apiFetch from '@wordpress/api-fetch';
import { applyFilters } from '@wordpress/hooks';

export async function replaceTags( { content, context = {}, clientId } ) {
	// Define an async function to fetch data
	try {
		const response = await apiFetch( {
			path: '/generateblocks/v1/dynamic-tag-replacements',
			method: 'POST',
			data: {
				content,
				context: applyFilters( 'generateblocks.editor.preview.context', context, { content, clientId } ),
				clientId,
			},
		} );

		return response;
	} catch ( error ) {
		console.error( 'Error fetching data:', error ); // eslint-disable-line no-console
		return '';
	}
}

export function parseTag( tagString ) {
	// Match the tag name and parameters inside double curly braces
	const regex = /^\{\{([\w_]+)(?:\s+([\s\S]+))?\}\}$/;
	const match = tagString.match( regex );

	if ( ! match ) {
		return null;
	}

	const [ , tag, paramsString ] = match;
	const params = {};

	if ( paramsString ) {
		// Split parameters by unescaped `|`
		paramsString.split( /(?<!\\)\|/ ).forEach( ( param ) => {
			// Split key:value, respecting escaped `:`
			const [ key, value = true ] = param.split( /(?<!\\):/, 2 );

			params[ key ] = value;
		} );
	}

	return { tag, params };
}

