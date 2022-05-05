import {
	BlockContextProvider,
	InnerBlocks,
	__experimentalUseBlockPreview as useBlockPreview, // eslint-disable-line @wordpress/no-unsafe-wp-apis
} from '@wordpress/block-editor';
import { Spinner } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { memo, useMemo, useState } from '@wordpress/element';

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
		display: isHidden ? 'none' : undefined,
	};

	return (
		<div
			{ ...blockPreviewProps }
			className={ 'block-editor-inner-blocks' }
			tabIndex={ 0 }
			// eslint-disable-next-line jsx-a11y/no-noninteractive-element-to-interactive-role
			role={ 'button' }
			onClick={ handleOnClick }
			onKeyPress={ handleOnClick }
			style={ style }
		/>
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

export default function LoopRenderer( props ) {
	const {
		data,
		hasData,
		isResolvingData,
		hasResolvedData,
		templateLock,
		contextCallback,
		innerBlocks,
	} = props;

	const [ activeContextId, setActiveContextId ] = useState();

	const containerHasInnerBlocks = (
		!! innerBlocks[ 0 ] &&
		'generateblocks/container' === innerBlocks[ 0 ]?.name &&
		innerBlocks[ 0 ]?.innerBlocks.length > 0
	);

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

	return (
		dataContexts &&
		dataContexts.map( ( postContext ) => (
			<BlockContextProvider key={ postContext.postId } value={ postContext }>

				{ postContext.postId === ( activeContextId || dataContexts[ 0 ]?.postId )
					? ( <InnerBlocks { ...props } templateLock={ templateLock } /> )
					: null
				}

				{ containerHasInnerBlocks &&
					<MemoizedBlockPreview
						blocks={ setIsBlockPreview( innerBlocks ) }
						contextId={ postContext.postId }
						setActiveContextId={ setActiveContextId }
						isHidden={ postContext.postId === ( activeContextId || dataContexts[ 0 ]?.postId ) }
					/>
				}

			</BlockContextProvider>
		) ) );
}
