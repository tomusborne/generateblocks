import { useDispatch, useSelect } from '@wordpress/data';
import { useState, useEffect } from '@wordpress/element';
import { getDefaultInnerBlock } from './utils';
import PostTypeRenderer from './PostTypeRenderer';

export default function QueryLoopRenderer( props ) {
	const { clientId, uniqueId, attributes } = props;
	const [ hasData, setHasData ] = useState( false );
	const [ templateLock, setTemplateLock ] = useState( false );

	const { insertBlocks } = useDispatch( 'core/block-editor' );

	const innerBlocks = useSelect( ( select ) => {
		return select( 'core/block-editor' )?.getBlocks( clientId );
	}, [] );

	useEffect( () => {
		if ( hasData && ! innerBlocks.length ) {
			insertBlocks( getDefaultInnerBlock( uniqueId ), 0, clientId, false );
			setTemplateLock( 'all' );
		}
	}, [ hasData, innerBlocks ] );

	return (
		<PostTypeRenderer
			query={ attributes.query }
			innerBlocks={ innerBlocks }
			templateLock={ templateLock }
			setHasData={ setHasData }
		/>
	);
};
