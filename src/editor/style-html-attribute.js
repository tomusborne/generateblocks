import { addFilter } from '@wordpress/hooks';
import { replaceTags } from '../dynamic-tags/utils';

const cache = {};

function getCacheKey( clientId, context ) {
	const {
		'generateblocks/loopIndex': loopIndex,
		postId,
	} = context;

	let key = '';

	if ( loopIndex ) {
		key += `${ loopIndex }_`;
	}

	if ( postId ) {
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
			return cache[ style ];
		}

		const replacements = await replaceTags( { content: style, context, clientId } );

		if ( ! replacements.length ) {
			return style;
		}

		// Cache the result.
		cache[ clientId ][ style ] = replacements;

		const withReplacements = replacements.reduce( ( acc, { original, replacement, fallback } ) => {
			if ( ! replacement ) {
				return acc.replaceAll( original, fallback );
			}

			return acc.replaceAll( original, replacement );
		}, style );

		return withReplacements ? withReplacements : style;
	}
);
