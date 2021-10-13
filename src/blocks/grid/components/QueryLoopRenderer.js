import { useSelect } from '@wordpress/data';
import { getColumnsFromLayout } from './LayoutSelector';
import { useState, useMemo } from '@wordpress/element';
import { BlockContextProvider, BlockPreview, InnerBlocks } from '@wordpress/block-editor';
import useQueryLoopData from '../hooks/useQueryLoopData';

const getTemplate = ( attributes ) => ( [
	[ 'generateblocks/container', attributes, [
		[ 'core/post-title' ],
	] ]
] );

export default ( props ) => {
	const { clientId, uniqueId } = props;
	const [ activeContext, setActiveContext ] = useState();
	const containerAttributes = getColumnsFromLayout( '100', uniqueId )[0];
	const innerBlocks = useSelect( ( select ) => {
		return select( 'core/block-editor' )?.getBlocks( clientId );
	}, [] );

	const { data, hasData } = useQueryLoopData( [
		'postType',
		'post',
		{
			per_page: -1,
		},
	] );

	const dataContexts = useMemo(
		() =>
			hasData && data.map( ( post ) => ( {
				postType: post.type,
				postId: post.id,
			} ) ),
		[ data, hasData ]
	);

	return (
		dataContexts &&
		dataContexts.map( ( postContext ) => (
			<BlockContextProvider
				key={ postContext.postId }
				value={ postContext }
			>
				{ postContext === ( activeContext || dataContexts[ 0 ] )
					? <InnerBlocks
						{ ...props }
						template={ getTemplate( containerAttributes ) }
					/>
					: <div className={'block-editor-inner-blocks'}>
						<BlockPreview
							blocks={ innerBlocks }
							__experimentalLive
							__experimentalOnClick={ () => setActiveContext( postContext ) }
						/>
					</div>
				}
			</BlockContextProvider>
		) ) );
};
