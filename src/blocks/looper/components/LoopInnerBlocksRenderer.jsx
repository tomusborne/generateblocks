import {
	BlockContextProvider,
	useInnerBlocksProps,
	__experimentalUseBlockPreview as useBlockPreview, // eslint-disable-line @wordpress/no-unsafe-wp-apis
	store as blockEditorStore,
} from '@wordpress/block-editor';
import { useSelect } from '@wordpress/data';
import { Spinner } from '@wordpress/components';
import { memo, useEffect, useMemo, useState } from '@wordpress/element';
import { applyFilters, addAction } from '@wordpress/hooks';
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
						postId: currentPost?.id,
						authorId: currentPost?.author,
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
		attributes,
		isSelected,
	} = props;

	const context = applyFilters( 'generateblocks.editor.preview.context', props.context, { props } );

	const currentPostId = useSelect( ( select ) => {
		const { postId } = context;
		if ( postId ) {
			return parseInt( postId, 10 );
		}

		const { getCurrentPostId } = select( 'core/editor' );

		return getCurrentPostId ? getCurrentPostId() : null;
	}, [ context ] );

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
	const wpQuery = useWpQuery( 'WP_Query' === queryType, { query, context, queryType, attributes, selectedBlock } );

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
	const [ previewId, setPreviewId ] = useState();

	addAction(
		'generateblocks.editor.loopItem.togglePreview',
		'generateblocks/looper/togglePreview',
		setPreviewId
	);

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

			const items = data.slice(
				offset > -1 ? offset : 0,
				offset > -1 ? offset + perPage : perPage
			);

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
				};
			} );

			// If no preview ID is set, use the first item as the preview.
			if ( undefined === previewId ) {
				setPreviewId( result[ 0 ]?.postId ?? 0 );
			}

			return result;
		}

		const postId = applyFilters( 'generateblocks.editor.looper.fallback.postId', currentPostId, props );

		// If no preview ID is set, use the first item as the preview.
		if ( undefined === previewId ) {
			setPreviewId( postId );
		}

		// If no data found, return limited context for the preview loop item.
		return [ {
			postId,
			postType: applyFilters( 'generateblocks.editor.looper.fallback.postType', 'post', props ),
			'generateblocks/loopItem': {
				ID: postId,
			},
			'generateblocks/loopIndex': 1,
			'generateblocks/loopPreviewId': previewId,
			'generateblocks/hasLoopItems': false,
		} ];
	}, [ data, hasResolvedData, query?.posts_per_page, query?.offset, previewId ] );

	if ( isResolvingData ) {
		return ( <Spinner /> );
	}

	return loopItemsContext.map( ( loopItemContext, index ) => {
		// Include index in case the postId is the same for all loop items.
		const contextId = loopItemContext?.postId ?? loopItemContext?.[ 'generateblocks/loopIndex' ] ?? index;
		const key = `${ contextId }-${ index }`;
		const previewIdInt = parseInt( previewId, 10 );
		let isActive = 0 === index;

		if ( previewIdInt ) {
			isActive = contextId ? contextId === previewIdInt : false;
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
