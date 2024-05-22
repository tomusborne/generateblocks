import { useSelect } from '@wordpress/data';
import { store as blockEditorStore } from '@wordpress/block-editor';

export function useBlockParent() {
	const { blockParent } = useSelect( ( select ) => {
		const {
			getBlock,
			getBlockParents,
			getSelectedBlockClientId,
		} = select( blockEditorStore );

		const selectedBlockClientId = getSelectedBlockClientId();
		const parentId = getBlockParents( selectedBlockClientId )?.[ 0 ];
		const parent = getBlock( parentId );

		return {
			blockParent: parent,
		};
	}, [] );

	return blockParent;
}
