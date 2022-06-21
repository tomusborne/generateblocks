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

	if ( ! dispatch( 'core/edit-post' ) ) {
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
		setLocalDeviceType( previewDeviceType );
	}, [ previewDeviceType ] );

	const setDeviceType = ( type ) => {
		if ( generateBlocksInfo && generateBlocksInfo.syncResponsivePreviews ) {
			setPreviewDeviceType( type );
		}

		setLocalDeviceType( type );
	};

	return [ localDeviceType, setDeviceType ];
};
