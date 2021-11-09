import { useState } from '@wordpress/element';
import { useDispatch, useSelect } from '@wordpress/data';

export default ( initialDeviceType = 'Desktop' ) => {
	if ( ! generateBlocksInfo || ! generateBlocksInfo.syncResponsivePreviews ) {
		return useState( initialDeviceType );
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
