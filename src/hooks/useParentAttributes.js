import { store as blockEditorStore } from '@wordpress/block-editor';
import { useSelect } from '@wordpress/data';

export default function useParentAttributes( clientId ) {
	const {
		getBlockParents,
		getBlocksByClientId,
	} = useSelect( ( select ) => select( blockEditorStore ), [] );

	const parentBlockId = getBlockParents( clientId, true );

	if ( ! parentBlockId?.[ 0 ] ) {
		return {};
	}

	const parentAttributes = getBlocksByClientId( parentBlockId[ 0 ] )?.[ 0 ]?.attributes;

	if ( ! parentAttributes ) {
		return {};
	}

	return { ...parentAttributes };
}
