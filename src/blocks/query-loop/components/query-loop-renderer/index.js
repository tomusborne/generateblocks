import { useEffect, useState } from '@wordpress/element';
import { useDispatch, useSelect } from '@wordpress/data';
import useQueryLoopData from '../../hooks/useQueryLoopData';
import LoopRenderer from './LoopRenderer';
import { normalizeRepeatableArgs, removeEmpty } from './utils';
import { getColumnsFromLayout } from '../../../grid/components/LayoutSelector';
import { createBlock } from '@wordpress/blocks';

const getDefaultInnerBlock = ( uniqueId ) => {
	const attributes = getColumnsFromLayout( '100', uniqueId )[ 0 ];
	const containerInnerBlocks = [
		createBlock( 'generateblocks/headline', {
			isDynamicContent: true,
		} ),
		createBlock( 'generateblocks/headline', {
			isDynamicContent: true,
			element: 'p',
			contentType: 'post-date',
		} ),
	];

	return createBlock(
		'generateblocks/container',
		Object.assign( {}, attributes, { isQueryLoop: true } ),
		containerInnerBlocks
	);
};

export default function QueryLoopRenderer( props ) {
	const { clientId, uniqueId, attributes } = props;
	const [ templateLock, setTemplateLock ] = useState( false );
	const { query } = attributes;

	const { insertBlocks } = useDispatch( 'core/block-editor' );

	const innerBlocks = useSelect( ( select ) => {
		return select( 'core/block-editor' )?.getBlocks( clientId );
	}, [] );

	const { data, hasData, isResolvingData, hasResolvedData } = useQueryLoopData( [
		'postType',
		query.post_type || 'post',
		normalizeRepeatableArgs( removeEmpty( query ) ),
	] );

	useEffect( () => {
		if ( hasData && ! innerBlocks.length ) {
			insertBlocks( getDefaultInnerBlock( uniqueId ), 0, clientId, false );
			setTemplateLock( 'all' );
		}
	}, [ hasData, innerBlocks ] );

	return (
		<LoopRenderer
			data={ data }
			hasData={ hasData }
			isResolvingData={ isResolvingData }
			hasResolvedData={ hasResolvedData }
			templateLock={ templateLock }
			innerBlocks={ innerBlocks }
			contextCallback={ ( post ) => ( {
				postType: post.type,
				postId: post.id,
			} ) }
		/>
	);
}
