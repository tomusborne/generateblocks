import { useDispatch, useSelect } from '@wordpress/data';
import { getColumnsFromLayout } from './LayoutSelector';
import { useState, useMemo, useEffect } from '@wordpress/element';
import { BlockContextProvider, BlockPreview, InnerBlocks } from '@wordpress/block-editor';
import useQueryLoopData from '../hooks/useQueryLoopData';
import { createBlock } from '@wordpress/blocks';

const getDefaultInnerBlock = ( uniqueId ) => {
	const attributes = getColumnsFromLayout( '100', uniqueId )[ 0 ];
	const containerInnerBlocks = [
		createBlock( 'core/post-title' ),
		createBlock( 'core/post-date' ),
	];

	return createBlock(
		'generateblocks/container',
		Object.assign( {}, attributes, { isQueryLoop: true } ),
		containerInnerBlocks
	);
};

export default ( props ) => {
	const { clientId, uniqueId } = props;
	const [ activeContext, setActiveContext ] = useState();
	const [ templateLock, setTemplateLock ] = useState( false );

	const { insertBlocks } = useDispatch( 'core/block-editor' );

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

	useEffect( () => {
		if ( hasData && ! innerBlocks.length ) {
			insertBlocks( getDefaultInnerBlock( uniqueId ), 0, clientId, false );
			setTemplateLock( 'all' );
		}
	}, [ hasData, innerBlocks ] );

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
					? <InnerBlocks { ...props } templateLock={ templateLock } />
					: <div className={ 'block-editor-inner-blocks' }>
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
