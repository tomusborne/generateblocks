import { useDispatch, useSelect } from '@wordpress/data';
import useLocalStorageState from 'use-local-storage-state';

export default ( initialDeviceType = 'Desktop' ) => {
	if ( ! generateBlocksInfo || ! generateBlocksInfo.syncResponsivePreviews ) {
		return useLocalStorageState(
			'generateblocksDeviceType',
			{ defaultValue: initialDeviceType },
		);
	}

	const {
		__experimentalSetPreviewDeviceType: setPreviewDeviceType = () => {},
	} = useDispatch( 'core/edit-post' );

	const previewDeviceType = useSelect( ( select ) => {
		const {
			__experimentalGetPreviewDeviceType: experimentalGetPreviewDeviceType = () => false,
		} = select( 'core/edit-post' );

		return experimentalGetPreviewDeviceType();
	}, [] );

	return [ previewDeviceType, setPreviewDeviceType ];
};
