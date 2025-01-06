import { useState, useEffect, useMemo } from '@wordpress/element';
import { useSelect } from '@wordpress/data';
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

export function withDynamicTag( WrappedComponent ) {
	return ( ( props ) => {
		const {
			context,
			attributes,
			clientId,
			isSelected,
		} = props;

		const {
			content,
			htmlAttributes,
			tagName,
		} = attributes;

		const [ dynamicTagValue, setDynamicTagValue ] = useState( '' );
		const [ contentMode, setContentMode ] = useState( 'edit' );
		const previewEnabled = 'enabled' === generateBlocksEditor?.dynamicTagsPreview;
		const isSavingPost = useSelect( ( select ) => select( 'core/editor' ).isSavingPost() );
		const blockCacheKey = getCacheKey( clientId, context );

		if ( ! cache[ blockCacheKey ] ) {
			cache[ blockCacheKey ] = {};
		}

		const contentValue = useMemo( () => {
			if ( 'img' === tagName ) {
				return htmlAttributes?.src;
			}

			if ( content?.originalHTML ) {
				return content.originalHTML;
			}

			return content?.text ?? content;
		}, [ tagName, htmlAttributes?.src, content ] );

		useEffect( () => {
			if ( ! previewEnabled && 'preview' === contentMode ) {
				setContentMode( 'edit' );
			}
		}, [ previewEnabled, contentMode ] );

		useEffect( () => {
			if ( ! contentValue || ! contentValue.includes( '{{' ) || ! previewEnabled ) {
				setDynamicTagValue( false );
				return;
			}

			if ( 'edit' === contentMode && 'img' !== tagName ) {
				setDynamicTagValue( false );
				return;
			}

			if ( cache[ blockCacheKey ][ contentValue ] ) {
				setDynamicTagValue( cache[ blockCacheKey ][ contentValue ] );
				return;
			}

			async function fetchData() {
				const response = await replaceTags( { content: contentValue, context, clientId } );

				setDynamicTagValue( response );

				// Cache the response.
				cache[ blockCacheKey ][ contentValue ] = response;
			}

			fetchData();
		}, [
			contentValue,
			contentMode,
			context,
			tagName,
			isSavingPost,
			blockCacheKey,
			isSelected,
		] );

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
