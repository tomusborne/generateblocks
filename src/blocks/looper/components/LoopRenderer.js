import {
	BlockContextProvider,
	useInnerBlocksProps,
	useBlockProps,
	__experimentalUseBlockPreview as useBlockPreview, // eslint-disable-line @wordpress/no-unsafe-wp-apis
	store as blockEditorStore,
} from '@wordpress/block-editor';
import { Spinner } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { createPortal, memo, useEffect, useMemo, useState, useRef } from '@wordpress/element';
import { useSelect } from '@wordpress/data';

import { useDebouncedCallback } from 'use-debounce';

function BlockPreview( {
	blocks,
	contextId,
	setActiveContextId,
	isHidden,
} ) {
	const blockPreviewProps = useBlockPreview( {
		blocks,
	} );

	const handleOnClick = () => setActiveContextId( contextId );

	const style = {
		display: isHidden ? 'none' : 'contents',
	};

	const ref = useRef();
	const target = ref.current ? ref.current.querySelector( '.wp-block' ) : null;

	return (
		<>
			<div
				{ ...blockPreviewProps }
				className={ 'block-editor-inner-blocks wp-block-generateblocks-looper__preview' }
				style={ style }
				ref={ ref }
			/>
			{ target && createPortal(
				<button
					tabIndex={ 0 }
					onClick={ handleOnClick }
					type="button"
					aria-label={ __( 'Select Block', 'generateblocks' ) }
					className="wp-block-generateblocks-looper__preview-toggle"
				/>,
				target
			) }
		</>
	);
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
	templateLock,
	contextCallback,
} ) {
	const innerBlocks = useSelect( ( select ) => {
		return select( 'core/block-editor' )?.getBlocks( clientId );
	}, [] );

	const { getSelectedBlock } = useSelect( blockEditorStore );
	const [ innerBlockData, setInnerBlockData ] = useState( [] );
	const [ activeContextId, setActiveContextId ] = useState();

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

	const blockProps = useBlockProps( { className: 'gb-loop-repeater' } );
	const innerBlocksProps = useInnerBlocksProps( { className: 'gb-loop-repeater__inner', templateLock } );

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

			{ postContext.postId === ( activeContextId || dataContexts[ 0 ]?.postId )
				? ( <div { ...innerBlocksProps } /> )
				: null
			}

			<MemoizedBlockPreview
				blocks={ innerBlockData }
				contextId={ postContext.postId }
				setActiveContextId={ setActiveContextId }
				isHidden={ postContext.postId === ( activeContextId || dataContexts[ 0 ]?.postId ) }
			/>

		</BlockContextProvider>
	) );
}
