import {
	BlockContextProvider,
	useInnerBlocksProps,
	__experimentalUseBlockPreview as useBlockPreview, // eslint-disable-line @wordpress/no-unsafe-wp-apis
	store as blockEditorStore,
} from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
import { useSelect } from '@wordpress/data';
import { Spinner } from '@wordpress/components';
import { store as coreStore } from '@wordpress/core-data';
import { memo, useEffect, useMemo, useState } from '@wordpress/element';

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

export function LoopInnerBlocksRenderer( props ) {
	const {
		clientId,
		context,
	} = props;
	const query = context[ 'generateblocks/query' ] || {};

	const normalizedQuery = useMemo( () => {
		return normalizeRepeatableArgs( removeEmpty( query ) );
	}, [ JSON.stringify( query ) ] );

	const { data, isResolvingData, hasResolvedData } = useSelect( ( select ) => {
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
		};
	}, [ JSON.stringify( normalizedQuery ) ] );

	const contextCallback = ( post ) => ( {
		postType: post.type,
		postId: post.id,
	} );
	const hasData = useMemo( () => !! ( hasResolvedData && data?.length, [ hasResolvedData, data ] ) );
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
		{},
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

	const dataContexts = useMemo( () => {
		if ( hasData && Array.isArray( data ) ) {
			return data.map( ( item ) => ( contextCallback( item ) ) );
		}

		return [];
	}, [ data, hasData ] );

	if ( isResolvingData ) {
		return ( <Spinner /> );
	}

	if ( hasResolvedData && ! hasData ) {
		return ( <h5>{ __( 'No results found.', 'generateblocks' ) }</h5> );
	}

	return dataContexts && dataContexts.map( ( postContext ) => (
		<BlockContextProvider key={ postContext.postId } value={ postContext }>
			{ postContext.postId === dataContexts[ 0 ]?.postId
				? innerBlocksProps.children
				: (
					<MemoizedBlockPreview blocks={ innerBlockData } />
				)
			}
		</BlockContextProvider>
	) );
}
