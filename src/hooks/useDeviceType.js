import { useDispatch, useSelect, dispatch } from '@wordpress/data';
import { useEffect } from '@wordpress/element';
import useLocalStorageState from 'use-local-storage-state';

export default ( initialDeviceType = 'Desktop' ) => {
	const [ localDeviceType, setLocalDeviceType ] = useLocalStorageState(
		'generateblocksDeviceType', {
			ssr: true,
			defaultValue: initialDeviceType,
		}
	);

	if ( ! dispatch( 'core/edit-post' ) || ( generateBlocksInfo && ! generateBlocksInfo.syncResponsivePreviews ) ) {
		const setDeviceType = ( type ) => {
			setLocalDeviceType( type );
		};

		return [ localDeviceType, setDeviceType ];
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

	useEffect( () => {
		if ( previewDeviceType !== localDeviceType ) {
			setLocalDeviceType( previewDeviceType );
		}
	}, [ previewDeviceType ] );

	const setDeviceType = ( type ) => {
		setPreviewDeviceType( type );
		setLocalDeviceType( type );
	};

	// Here we are anticipating the return of the correct device value, instead of waiting another update from the useEffect above.
	// This avoids attributes with old values when changing devices using the core buttons.
	if ( previewDeviceType !== localDeviceType ) {
		return [ previewDeviceType, setDeviceType ];
	}

	return [ localDeviceType, setDeviceType ];
};
