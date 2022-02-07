import { BlockContextProvider, InnerBlocks } from '@wordpress/block-editor';
import { Spinner } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { memo, useMemo, useState } from '@wordpress/element';
import { __experimentalUseBlockPreview as useBlockPreview, } from '@wordpress/block-editor';

// Locked the first block as active
function BlockPreview( {
	blocks,
	// contextId,
	// setActiveContextId,
} ) {
	const blockPreviewProps = useBlockPreview( {
		blocks,
	} );

	// const handleOnClick = () => { setActiveContextId( contextId ) };

	return (
		<div
			{ ...blockPreviewProps }
			className={ 'block-editor-inner-blocks' }
			// tabIndex={ 0 }
			// eslint-disable-next-line jsx-a11y/no-noninteractive-element-to-interactive-role
			// role={ 'button' }
			// onClick={ handleOnClick }
			// onKeyPress={ handleOnClick }
		/>
	);
}

const MemoizedBlockPreview = memo( BlockPreview );

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
				{ postContext.postId ===
				( activeContextId ||
					dataContexts[ 0 ]?.postId ) ? (
						<InnerBlocks { ...props } templateLock={ templateLock } />
					) :
						<MemoizedBlockPreview
							blocks={ innerBlocks }
							contextId={ postContext.postId }
							setActiveContextId={ setActiveContextId }
						/>
					}
			</BlockContextProvider>
		) ) );
}
