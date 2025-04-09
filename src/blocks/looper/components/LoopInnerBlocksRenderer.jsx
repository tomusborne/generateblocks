import {
	BlockContextProvider,
	useInnerBlocksProps,
	__experimentalUseBlockPreview as useBlockPreview, // eslint-disable-line @wordpress/no-unsafe-wp-apis
	store as blockEditorStore,
} from '@wordpress/block-editor';
import { useSelect } from '@wordpress/data';
import { Spinner } from '@wordpress/components';
import { memo, useEffect, useMemo, useState } from '@wordpress/element';
import { applyFilters } from '@wordpress/hooks';
import apiFetch from '@wordpress/api-fetch';

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

function useWpQuery( shouldRequest = true, { query, attributes, selectedBlock, context, queryType } ) {
	const { currentPostId, currentPostAuthor } = useSelect( ( select ) => {
		const { getCurrentPost } = select( 'core/editor' );
		const currentPost = getCurrentPost ? getCurrentPost() : null;
		return {
			currentPostId: currentPost?.id,
			currentPostAuthor: currentPost?.author,
		};
	} );

	const {
		isAdminUser = false,
	} = gbPermissions ?? {};

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

		const { queryLoopEditorPostsCap = 50 } = generateBlocksEditor;

		if ( args.posts_per_page > queryLoopEditorPostsCap ) {
			args.posts_per_page = queryLoopEditorPostsCap;
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
						context,
						queryType,
						block: selectedBlock,
						postId: currentPostId,
						authorId: currentPostAuthor,
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
	}, [ query, currentPostId, currentPostAuthor ] );

	const result = { data, isResolvingData: isLoading, hasResolvedData: data?.length > 0 };

	return shouldRequest ? result : null;
}

export function LoopInnerBlocksRenderer( props ) {
	const {
		clientId,
		attributes,
		isSelected,
	} = props;

	const context = applyFilters( 'generateblocks.editor.preview.context', props.context, { props } );

	const {
		'generateblocks/query': query = {},
		'generateblocks/queryType': queryType = 'WP_Query',
		'generateblocks/queryId': queryId = null,
	} = context;
	let dataState = {
		data: null,
		isResolvingData: true,
		hasResolvedData: false,
		queryParams: [],
	};
	const { getSelectedBlock } = useSelect( blockEditorStore );
	const selectedBlock = getSelectedBlock();
	const wpQuery = useWpQuery( 'WP_Query' === queryType, { query, context, queryType, attributes, selectedBlock } );

	const otherQuery = applyFilters( 'generateblocks.editor.looper.query', null, {
		query,
		queryType,
		context,
		props,
		useWpQuery,
		selectedBlock,
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
	const [ previewId, setPreviewId ] = useState( {
		[ queryId ]: null,
	} );

	const innerBlocksProps = useInnerBlocksProps(
		{},
		{
			renderAppender: () => ! innerBlocks.length ? (
				<BlockAppender
					clientId={ clientId }
					isSelected={ isSelected }
					attributes={ attributes }
				/>
			) : false,
			blockContext: {
				...context,
				'generateblocks/loopPreviewId': previewId,
			},
		}
	);

	const loopItemsContext = useMemo( () => {
		if ( hasResolvedData && data?.length ) {
			let { posts_per_page: perPage = 10, offset = 0 } = query;

			// Ensure the params are a valid integer for comparison.
			perPage = parseInt( perPage, 10 );
			offset = parseInt( offset, 10 );

			if ( perPage < 0 ) {
				perPage = data.length;
			}

			const items = 'WP_Query' !== queryType
				? data.slice(
					offset > -1 ? offset : 0,
					offset > -1 ? offset + perPage : perPage
				) : data;

			const result = items.map( ( item, index ) => {
				const { ID = null, id = null, post_type: postType = 'post' } = item;

				// Remove any disallowed or hidden keys
				for ( const itemKey in item ) {
					if ( DISALLOWED_KEYS.includes( itemKey ) || itemKey.startsWith( '_' ) ) {
						delete item[ itemKey ];
					}
				}

				return {
					postType,
					postId: id ? id : ID,
					'generateblocks/loopItem': item,
					'generateblocks/loopIndex': index + 1, // Preview doesn't support pagination so this index is correct.
					'generateblocks/loopPreviewId': previewId,
					'generateblocks/hasLoopItems': true,
					'generateblocks/setLoopPreviewId': setPreviewId,
				};
			} );

			return result;
		}

		// If no data found, return limited context for the preview loop item.
		return [ {
			postId: applyFilters( 'generateblocks.editor.looper.fallback.postId', 0, props ),
			postType: applyFilters( 'generateblocks.editor.looper.fallback.postType', 'post', props ),
			'generateblocks/loopItem': {
				ID: 0,
			},
			'generateblocks/loopIndex': 1,
			'generateblocks/loopPreviewId': previewId,
			'generateblocks/setLoopPreviewId': setPreviewId,
			'generateblocks/hasLoopItems': false,
		} ];
	}, [ data, hasResolvedData, query?.posts_per_page, query?.offset, previewId, queryId ] );

	if ( isResolvingData ) {
		return ( <Spinner /> );
	}

	return loopItemsContext.map( ( loopItemContext, index ) => {
		// Include index in case the postId is the same for all loop items.
		const contextId = loopItemContext?.postId ?? loopItemContext?.[ 'generateblocks/loopIndex' ] ?? index;
		const key = `${ contextId }-${ index }`;
		let isActive = 0 === index;

		if ( previewId[ queryId ] ) {
			const previewIdInt = parseInt( previewId[ queryId ], 10 );

			if ( previewIdInt ) {
				isActive = contextId ? contextId === previewIdInt : false;
			}
		}
		return (
			<BlockContextProvider
				key={ key }
				value={ loopItemContext }
			>
				{ isActive && innerBlocksProps.children }
				<MemoizedBlockPreview
					blocks={ innerBlocks }
					isHidden={ isActive }
				/>
			</BlockContextProvider>
		);
	} );
}
