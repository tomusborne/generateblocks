import {
	BlockContextProvider,
	useInnerBlocksProps,
	__experimentalUseBlockPreview as useBlockPreview, // eslint-disable-line @wordpress/no-unsafe-wp-apis
	store as blockEditorStore,
} from '@wordpress/block-editor';
import { Spinner } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { memo, useEffect, useMemo, useState } from '@wordpress/element';
import { useSelect } from '@wordpress/data';

import { useDebouncedCallback } from 'use-debounce';

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

export default function LoopRenderer( {
	clientId,
	data,
	hasData,
	isResolvingData,
	hasResolvedData,
	contextCallback,
} ) {
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

	const innerBlocksProps = useInnerBlocksProps( {}, { templateLock: 'all', renderAppender: () => null }, innerBlockData );

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

	const dataContexts = useMemo(
		() =>
			hasData && data.map( ( item ) => ( contextCallback( item ) ) ),
		[ data, hasData ]
	);

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
