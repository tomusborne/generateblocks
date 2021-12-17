import { useMemo, useState } from '@wordpress/element';
import { Spinner } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { BlockContextProvider, BlockPreview, InnerBlocks } from '@wordpress/block-editor';

export default function LoopRenderer( props ) {
	const {
		data,
		hasData,
		isResolvingData,
		hasResolvedData,
		innerBlocks,
		templateLock,
		contextCallback
	} = props;

	const [ activeContext, setActiveContext ] = useState();

	const dataContexts = useMemo(
		() =>
			hasData && data.map( ( item ) => contextCallback( item ) ),
		[ data, hasData ]
	);

	if ( isResolvingData ) {
		return (<Spinner />);
	}

	if ( hasResolvedData && ! hasData ) {
		return (<h5>{ __( 'No results found.', 'generateblocks' ) }</h5>);
	}

	return (
		dataContexts &&
		dataContexts.map( ( itemContext ) => (
			<BlockContextProvider
				key={ itemContext.id }
				value={ itemContext }
			>
				{ itemContext === ( activeContext || dataContexts[ 0 ] )
					? <InnerBlocks { ...props } templateLock={ templateLock } />
					: <div className={ 'block-editor-inner-blocks' }>
						<BlockPreview
							blocks={ innerBlocks }
							__experimentalLive
							__experimentalOnClick={ () => setActiveContext( itemContext ) }
						/>
					</div>
				}
			</BlockContextProvider>
		) ) );
}
