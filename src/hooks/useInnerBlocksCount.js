import { useSelect } from '@wordpress/data';

export default ( clientId ) => {
	const block = useSelect( ( select ) => {
		return select( 'core/block-editor' ).getBlock( clientId );
	} );

	return block ? block.innerBlocks.length : 0;
};
