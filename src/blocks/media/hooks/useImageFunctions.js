import { store as blockEditorStore } from '@wordpress/block-editor';
import { pick } from 'lodash';
import { useSelect, useDispatch } from '@wordpress/data';
import { store as noticesStore } from '@wordpress/notices';
import { isBlobURL } from '@wordpress/blob';

export function useImageFunctions() {
	const { createErrorNotice } = useDispatch( noticesStore );

	const { mediaUpload } = useSelect( ( select ) => {
		const { getSettings } = select( blockEditorStore );
		return pick( getSettings(), [ 'imageDefaultSize', 'mediaUpload' ] );
	}, [] );

	const onUploadError = ( message ) => {
		createErrorNotice( message[ 2 ], { type: 'snackbar' } );
	};

	const isTemporaryImage = ( url ) => isBlobURL( url );

	return {
		mediaUpload,
		onUploadError,
		isTemporaryImage,
	};
}
