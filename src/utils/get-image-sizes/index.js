import { useSelect } from '@wordpress/data';
import { store as blockEditorStore } from '@wordpress/block-editor';

export default () => (
	useSelect( ( select ) => {
		const {
			getSettings,
		} = select( blockEditorStore );

		const sizes = getSettings().imageSizes || [];
		return sizes.map( ( size ) => ( { value: size.slug, label: size.name } ) );
	}, [] )
);
