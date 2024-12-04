import {
	BlockContextProvider,
	useInnerBlocksProps,
	__experimentalUseBlockPreview as useBlockPreview, // eslint-disable-line @wordpress/no-unsafe-wp-apis
	store as blockEditorStore,
} from '@wordpress/block-editor';
import { useSelect } from '@wordpress/data';
import { Spinner } from '@wordpress/components';
import { memo, useEffect, useMemo, useState, Children } from '@wordpress/element';
import { applyFilters } from '@wordpress/hooks';
import apiFetch from '@wordpress/api-fetch';

import { useDebouncedCallback } from 'use-debounce';

import { BlockAppender } from '@components/index';

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

function setIsBlockPreview( innerBlocks, contextPostId = null ) {
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
	const currentPost = useSelect( ( select ) => {
		const { getCurrentPost } = select( 'core/editor' );

		return getCurrentPost ? getCurrentPost() : null;
	} );

	const {
		isAdminUser = false,
	} = gbPermissions; // eslint-disable-line

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

		/**
		 * Filter post_status based on user role.
		 *
		 * TODO - Expand this in the future to handle custom user roles and other advanced use cases.
		 */
		if ( ! isAdminUser ) {
			if ( Array.isArray( args?.post_status ) ) {
				const disallowedStatuses = [ 'private', 'draft', 'trash' ];
				args.post_status = args.post_status.filter( ( status ) => ! disallowedStatuses.includes( status ) );
			} else {
				args.post_status = 'publish';
			}
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
						currentPost,
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
	}, [ query, currentPost ] );

	const result = { data, isResolvingData: isLoading, hasResolvedData: data?.length > 0 };

	return shouldRequest ? result : null;
}

export function LoopInnerBlocksRenderer( props ) {
	const {
		clientId,
		context,
		attributes,
		isSelected,
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
	const selectedBlock = getSelectedBlock();
	const wpQuery = useWpQuery( 'WP_Query' === queryType, query, attributes, selectedBlock );

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
			renderAppender: () => (
				<BlockAppender
					clientId={ clientId }
					isSelected={ isSelected }
					attributes={ attributes }
				/>
			),
			blockContext: context,
		},
		innerBlockData
	);

	const {
		children: innerBlocksChildren,
		...otherInnerBlocksProps
	} = innerBlocksProps;

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
	}, [ JSON.stringify( innerBlocks ), selectedBlock ] );

	const loopItemsContext = useMemo( () => {
		if ( hasResolvedData && Array.isArray( data ) ) {
			let perPage = query?.posts_per_page
				? query?.posts_per_page
				: 10;

			if ( '-1' === perPage?.toString() ) {
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
		const contextId = loopItemContext?.postId ?? loopItemContext?.[ 'generateblocks/loopIndex' ] ?? index;
		const firstContextId = loopItemsContext[ 0 ]?.postId ?? loopItemsContext[ 0 ]?.[ 'generateblocks/loopIndex' ] ?? 0;
		const key = `${ contextId }-${ index }`;
		const activeId = parseInt( activeBlockContextId, 10 );
		const isActive = contextId ? contextId === ( activeId || firstContextId ) : false;

		return (
			<BlockContextProvider
				key={ key }
				value={ loopItemContext }
			>
				{ ( isActive && Children.count( innerBlocksChildren ) )
					? innerBlocksChildren
					: (
						<div { ...otherInnerBlocksProps } />
					) }
				<MemoizedBlockPreview
					blocks={ innerBlockData }
					isHidden={ isActive }
				/>
			</BlockContextProvider>
		);
	} ) : innerBlocksChildren;
}
