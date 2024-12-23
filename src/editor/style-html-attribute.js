import { addFilter } from '@wordpress/hooks';
import { replaceTags } from '../dynamic-tags/utils';

const cache = {};

function getCacheKey( clientId, context ) {
	const {
		'generateblocks/loopIndex': loopIndex,
		'generateblocks/loopPreviewId': previewId,
		postId,
	} = context;

	let key = '';

	if ( loopIndex ) {
		key += `${ loopIndex }_`;
	}

	if ( previewId ) {
		key += `${ previewId }_`;
	} else if ( postId ) {
		key += `${ postId }_`;
	}

	key += clientId;

	return key;
}

addFilter(
	'generateblocks.editor.htmlAttributes.style',
	'generateblocks/styleWithReplacements',
	async( style, props ) => {
		const { context, clientId } = props;

		// Check if any replacements need to be made
		if ( ! style.includes( '{{' ) || ! style ) {
			return style;
		}

		const blockCacheKey = getCacheKey( clientId, context );

		// Prime the cache for this block.
		if ( ! cache[ blockCacheKey ] ) {
			cache[ blockCacheKey ] = {};
		}

		// Get the cached result if available.
		if ( cache[ clientId ][ style ] ) {
			console.log( 'Using cached data', cache[ clientId ][ style ] );
			return cache[ style ];
		}

		const replacements = await replaceTags( style, context );

		if ( ! replacements.length ) {
			return style;
		}

		// Cache the result.
		cache[ clientId ][ style ] = replacements;
		console.log( 'Cache miss, setting data', cache[ clientId ][ style ] );

		const withReplacements = replacements.reduce( ( acc, { original, replacement, fallback } ) => {
			if ( ! replacement ) {
				return acc.replaceAll( original, fallback );
			}

			return acc.replaceAll( original, replacement );
		}, style );

		return withReplacements ? withReplacements : style;
	}
);
