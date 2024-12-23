import { useState, useEffect } from '@wordpress/element';
import { useSelect } from '@wordpress/data';
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

export function withDynamicTag( WrappedComponent ) {
	return ( ( props ) => {
		const {
			context,
			attributes,
			clientId,
		} = props;

		const {
			content,
			htmlAttributes,
			tagName,
		} = attributes;

		const [ dynamicTagValue, setDynamicTagValue ] = useState( '' );
		const [ contentMode, setContentMode ] = useState( 'edit' );
		const isSavingPost = useSelect( ( select ) => select( 'core/editor' ).isSavingPost() );
		const blockCacheKey = getCacheKey( clientId, context );

		if ( ! cache[ blockCacheKey ] ) {
			cache[ blockCacheKey ] = {};
		}

		const getContentValue = () => {
			if ( 'img' === tagName ) {
				return htmlAttributes?.src;
			}

			if ( content?.originalHTML ) {
				return content.originalHTML;
			}

			return content?.text ?? content;
		};
		const contentValue = getContentValue();

		useEffect( () => {
			if ( ! contentValue || ! contentValue.includes( '{{' ) ) {
				setDynamicTagValue( false );
				return;
			}

			if ( 'edit' === contentMode && 'img' !== tagName ) {
				setDynamicTagValue( false );
				return;
			}

			console.log( contentMode );

			if ( cache[ blockCacheKey ][ contentValue ] ) {
				console.log( 'Using cached data', cache[ blockCacheKey ][ contentValue ] );
				setDynamicTagValue( cache[ blockCacheKey ][ contentValue ] );
				return;
			}

			async function fetchData() {
				const response = await replaceTags( contentValue, context );

				console.log( 'cache miss, setting cache', cache[ blockCacheKey ][ contentValue ] );

				setDynamicTagValue( response );

				// Cache the response.
				cache[ blockCacheKey ][ contentValue ] = response;
			}

			fetchData();
		}, [ contentValue, contentMode, context, tagName, isSavingPost, blockCacheKey ] );

		return (
			<WrappedComponent
				{ ...props }
				dynamicTagValue={ dynamicTagValue }
				contentMode={ contentMode }
				setContentMode={ setContentMode }
			/>
		);
	} );
}
