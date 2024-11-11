import {
	BlockContextProvider,
	useInnerBlocksProps,
	__experimentalUseBlockPreview as useBlockPreview, // eslint-disable-line @wordpress/no-unsafe-wp-apis
	store as blockEditorStore,
} from '@wordpress/block-editor';
import { useSelect } from '@wordpress/data';
import { Spinner } from '@wordpress/components';
import { store as coreStore } from '@wordpress/core-data';
import { memo, useEffect, useMemo, useState } from '@wordpress/element';
import { applyFilters } from '@wordpress/hooks';
import apiFetch from '@wordpress/api-fetch';

import { useDebouncedCallback } from 'use-debounce';

const DISALLOWED_KEYS = [ 'post_password', 'password' ];

function BlockPreview( { blocks, isHidden } ) {
	const style = {
		display: isHidden ? 'none' : undefined,
	};

	const blockPreviewProps = useBlockPreview( {
		blocks,
		props: {
			style,
			className: 'gb-loop-preview',
		},
	} );

	return isHidden ? <div { ...blockPreviewProps } /> : blockPreviewProps.children;
}

const MemoizedBlockPreview = memo( BlockPreview );

function setIsBlockPreview( innerBlocks, contextPostId = '' ) {
	return innerBlocks.map( ( block ) => {
		const { clientId = '' } = block;

		const activeBlock = document.getElementById( `block-${ clientId }` );

		const isActiveBlock = activeBlock
			? activeBlock?.dataset?.contextPostId === contextPostId
			: false;

		if ( isActiveBlock ) {
			return block;
		}

		const newInnerBlocks = setIsBlockPreview( block.innerBlocks );
		const attributes = Object.assign( {}, block.attributes, { isBlockPreview: true } );

		return Object.assign( {}, block, { attributes, innerBlocks: newInnerBlocks } );
	} );
}

function useWpQuery( shouldRequest = true, query, attributes, block ) {
	const canUser = useSelect( ( select ) => shouldRequest ? select( coreStore ).canUser : null, [] );

	const [ data, setData ] = useState( [] );
	const [ isLoading, setIsLoading ] = useState( true );

	useEffect( () => {
		if ( ! shouldRequest ) {
			return;
		}

		const args = {
			...query,
			post_type: query.post_type || 'post',
		};

		if ( ! canUser( 'update', 'settings' ) ) {
			args.post_status = 'publish';
		}

		async function fetchPosts() {
			setIsLoading( true );

			try {
				const response = await apiFetch( {
					path: '/generateblocks/v1/get-wp-query',
					method: 'POST',
					data: {
						args,
						attributes,
						block,
					},
				} );

				const { posts = [] } = response;
				setData( posts );
			} catch ( error ) {
				console.error( 'Error fetching post record:', error ); // eslint-disable-line no-console
			} finally {
				setIsLoading( false );
			}
		}

		fetchPosts();
	}, [ query ] );

	const result = { data, isResolvingData: isLoading, hasResolvedData: data?.length > 0 };

	return shouldRequest ? result : null;
}

export function LoopInnerBlocksRenderer( props ) {
	const {
		clientId,
		context,
		attributes,
	} = props;

	const {
		'generateblocks/query': query = {},
		'generateblocks/queryType': queryType = 'WP_Query',
	} = context;
	let dataState = {
		data: null,
		isResolvingData: true,
		hasResolvedData: false,
		queryParams: [],
	};
	const { getSelectedBlock } = useSelect( blockEditorStore );
	const wpQuery = useWpQuery( 'WP_Query' === queryType, query, attributes, getSelectedBlock() );

	const otherQuery = applyFilters( 'generateblocks.editor.looper.query', null, {
		query,
		queryType,
		context,
		props,
	} );

	if ( null !== wpQuery ) {
		dataState = ( { ...wpQuery } );
	} else if ( null !== otherQuery && null === wpQuery ) {
		dataState = ( { ...otherQuery } );
	} else {
		dataState = {
			data: [],
			isResolvingData: false,
			hasResolvedData: false,
		};
	}

	const {
		data,
		isResolvingData,
		hasResolvedData,
	} = dataState;

	const innerBlocks = useSelect( ( select ) => {
		return select( 'core/block-editor' )?.getBlocks( clientId );
	}, [] );
	const [ innerBlockData, setInnerBlockData ] = useState( [] );
	const [ activeBlockContextId, setActiveBlockContextId ] = useState();

	useEffect( () => {
		setInnerBlockData( setIsBlockPreview( innerBlocks ) );
	}, [ getSelectedBlock ] );

	const debounced = useDebouncedCallback( () => {
		setInnerBlockData( setIsBlockPreview( innerBlocks ) );
	}, 10 );

	const debounceBlocks = [
		'core/paragraph',
		'core/heading',
		'core/button',
		'generateblocks/text',
	];

	const innerBlocksProps = useInnerBlocksProps(
		{},
		{
			renderAppender: false,
			blockContext: context,
		},
		innerBlockData
	);
	useEffect( () => {
		function handleToggle( e ) {
			const target = e.target.closest( '.gb-block-preview__toggle' );

			if ( target ) {
				const contextId = target?.dataset?.contextPostId ?? '';
				setActiveBlockContextId( contextId );

				setInnerBlockData(
					setIsBlockPreview( innerBlocks, contextId )
				);
			}
		}

		document.addEventListener( 'click', handleToggle );

		return () => {
			document.removeEventListener( 'click', handleToggle );
		};
	}, [ innerBlocks, activeBlockContextId ] );

	useEffect( () => {
		const selectedBlock = getSelectedBlock();

		if (
			debounceBlocks.includes( selectedBlock?.name ) &&
			! selectedBlock?.attributes?.useDynamicData &&
			! selectedBlock?.attributes?.dynamicContentType
		) {
			// Only debounce if we're using a RichText component.
			debounced();
		} else {
			setInnerBlockData( setIsBlockPreview( innerBlocks ) );
		}
	}, [ JSON.stringify( innerBlocks ) ] );

	const loopItemsContext = useMemo( () => {
		if ( hasResolvedData && Array.isArray( data ) ) {
			let perPage = query?.posts_per_page ?? 10;

			if ( -1 === perPage ) {
				perPage = data.length;
			}

			const items = data.slice( 0, perPage );

			return items.map( ( item, index ) => {
				const { ID = null, id = null, type = 'post' } = item;

				// Remove any disallowed or hidden keys
				for ( const itemKey in item ) {
					if ( DISALLOWED_KEYS.includes( itemKey ) || itemKey.startsWith( '_' ) ) {
						delete item[ itemKey ];
					}
				}

				return {
					postType: type,
					postId: id ? id : ID,
					'generateblocks/loopItem': item,
					'generateblocks/loopIndex': index + 1, // Preview doesn't support pagination so this index is correct.
				};
			} );
		}

		// If no data found, return limited context for the preview loop item.
		return [ {
			postType: applyFilters( 'generateblocks.editor.looper.fallback.postType', 'post', props ),
			postId: applyFilters( 'generateblocks.editor.looper.fallback.postId', 0, props ),
			'generateblocks/loopItem': {
				ID: 0,
			},
			'generateblocks/loopIndex': 1,
		} ];
	}, [ data, hasResolvedData, query?.per_page ] );

	if ( isResolvingData ) {
		return ( <Spinner /> );
	}

	return hasResolvedData ? loopItemsContext.map( ( loopItemContext, index ) => {
		// Include index in case the postId is the same for all loop items.
		const key = `${ loopItemContext.postId }-${ index }`;
		const isActive = loopItemContext.postId ===
			( parseInt( activeBlockContextId, 10 ) || loopItemsContext[ 0 ]?.postId );

		return (
			<BlockContextProvider
				key={ key }
				value={ loopItemContext }
			>
				{ isActive && innerBlocksProps.children }
				<MemoizedBlockPreview
					blocks={ innerBlockData }
					isHidden={ isActive }
				/>
			</BlockContextProvider>
		);
	} ) : innerBlocksProps.children;
}
