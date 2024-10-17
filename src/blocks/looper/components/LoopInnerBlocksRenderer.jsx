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

import { useDebouncedCallback } from 'use-debounce';

import { normalizeRepeatableArgs, removeEmpty } from '@utils/index';

function BlockPreview( { blocks } ) {
	const blockPreviewProps = useBlockPreview( {
		blocks,
	} );

	return blockPreviewProps.children;
}

const MemoizedBlockPreview = memo( BlockPreview );

function setIsBlockPreview( innerBlocks ) {
	return innerBlocks.map( ( block ) => {
		const newInnerBlocks = setIsBlockPreview( block.innerBlocks );
		const attributes = Object.assign( {}, block.attributes, { isBlockPreview: true } );

		return Object.assign( {}, block, { attributes, innerBlocks: newInnerBlocks } );
	} );
}

function useWpQuery( shouldRequest = true, query ) {
	const normalizedQuery = useMemo( () => {
		return normalizeRepeatableArgs( removeEmpty( query ) );
	}, [ JSON.stringify( query ) ] );

	return useSelect( ( select ) => {
		if ( ! shouldRequest ) {
			return null;
		}
		const {
			getEntityRecords,
			isResolving,
			hasFinishedResolution,
			canUser,
		} = select( coreStore );

		/**
		 * Include capabilities check for 'update' and 'settings'
		 * to determine if the user can update settings.
		 */
		const queryParams = [
			'postType',
			query.post_type || 'post',
			canUser( 'update', 'settings' )
				? normalizedQuery
				: {
					...normalizedQuery,
					status: 'publish',
				},
		];

		return {
			data: getEntityRecords( ...queryParams ),
			isResolvingData: isResolving( 'getEntityRecords', queryParams ),
			hasResolvedData: hasFinishedResolution( 'getEntityRecords', queryParams ),
			queryParams,
		};
	}, [ JSON.stringify( normalizedQuery ) ] );
}

export function LoopInnerBlocksRenderer( props ) {
	const {
		clientId,
		context,
	} = props;
	const {
		'generateblocks/query': query = {},
		'generateblocks/queryType': queryType = 'WP_Query',
	} = context;
	const [ dataState, setDataState ] = useState( {
		data: [],
		isResolvingData: true,
		hasResolvedData: false,
		queryParams: [],
	} );

	const wpQuery = useWpQuery( 'WP_Query' === queryType, query );

	useEffect( () => {
		if ( null !== wpQuery ) {
			setDataState( { ...wpQuery } );
		}
	}, [ wpQuery ] );

	const otherQuery = applyFilters( 'generateblocks.editor.looper.query', null, {
		query,
		queryType,
		context,
		props,
	} );

	useEffect( () => {
		if ( null !== wpQuery ) {
			setDataState( { ...wpQuery } );
		} else if ( null !== otherQuery && null === wpQuery ) {
			setDataState( { ...otherQuery } );
		} else {
			setDataState( {
				data: [],
				isResolvingData: false,
				hasResolvedData: true,
				queryParams: [],
			} );
		}
	}, [ otherQuery, wpQuery ] );

	const {
		data,
		isResolvingData,
		hasResolvedData,
	} = dataState;
	const hasData = ! isResolvingData && hasResolvedData && data?.length;
	const innerBlocks = useSelect( ( select ) => {
		return select( 'core/block-editor' )?.getBlocks( clientId );
	}, [] );

	const { getSelectedBlock } = useSelect( blockEditorStore );
	const [ innerBlockData, setInnerBlockData ] = useState( [] );

	useEffect( () => {
		setInnerBlockData( setIsBlockPreview( innerBlocks ) );
	}, [] );

	const debounced = useDebouncedCallback( () => {
		setInnerBlockData( setIsBlockPreview( innerBlocks ) );
	}, 10 );

	const debounceBlocks = [
		'core/paragraph',
		'core/heading',
		'core/button',
		'generateblocks/headline',
		'generateblocks/button',
	];

	const innerBlocksProps = useInnerBlocksProps(
		{},
		{
			renderAppender: false,
		},
		innerBlockData
	);

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
		if ( hasData && Array.isArray( data ) ) {
			let perPage = query?.per_page ?? 10;

			if ( -1 === perPage ) {
				perPage = data.length;
			}

			const items = data.slice( 0, perPage );

			return items.map( ( item, index ) => {
				const { ID = null, id = null, type = 'post' } = item;
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
	}, [ data, hasData, query?.per_page ] );

	if ( isResolvingData || ! hasResolvedData ) {
		return ( <Spinner /> );
	}

	return hasResolvedData ? loopItemsContext.map( ( loopItemContext, index ) => {
		// Include index in case the postId is the same for all loop items.
		const key = `${ loopItemContext.postId }-${ index }`;

		return (
			<BlockContextProvider
				key={ key }
				value={ loopItemContext }
			>
				{ 0 === index
					? innerBlocksProps.children
					: (
						<MemoizedBlockPreview blocks={ innerBlockData } />
					)
				}
			</BlockContextProvider>
		);
	} ) : innerBlocksProps.children;
}
