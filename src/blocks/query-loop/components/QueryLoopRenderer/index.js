import { useDispatch, useSelect } from '@wordpress/data';
import { useState, useEffect } from '@wordpress/element';
import { getDefaultInnerBlock } from './utils';
import PostTypeRenderer from './PostTypeRenderer';
import TaxonomyRenderer from './TaxonomyRenderer';

export default function QueryLoopRenderer( props ) {
	const { clientId, uniqueId, attributes } = props;
	const [ hasData, setHasData ] = useState( false );
	const [ templateLock ] = useState( false );

	const { insertBlocks, replaceInnerBlocks } = useDispatch( 'core/block-editor' );

	const innerBlocks = useSelect( ( select ) => {
		return select( 'core/block-editor' )?.getBlocks( clientId );
	}, [] );

	useEffect( () => {
		replaceInnerBlocks( clientId, getDefaultInnerBlock( uniqueId, attributes.queryType ) );
	}, [ attributes.queryType ] );

	useEffect( () => {
		if ( hasData && ! innerBlocks.length ) {
			insertBlocks( getDefaultInnerBlock( uniqueId, attributes.queryType ), 0, clientId, false );
		}
	}, [ hasData, innerBlocks ] );

	const Renderer = attributes.queryType === 'taxonomy' ? TaxonomyRenderer : PostTypeRenderer;

	return (
		<Renderer
			query={ attributes.query }
			innerBlocks={ innerBlocks }
			templateLock={ templateLock }
			setHasData={ setHasData }
		/>
	);
};
