import { dispatch, useSelect } from '@wordpress/data';
import { useEffect } from '@wordpress/element';
import useLocalStorageState from 'use-local-storage-state';

export default ( initialDeviceType = 'Desktop' ) => {
	const [ localDeviceType, setLocalDeviceType ] = useLocalStorageState(
		'generateblocksDeviceType', {
			ssr: true,
			defaultValue: initialDeviceType,
		}
	);

	const setPreviewDeviceType = ( deviceType ) => {
		const { setDeviceType } = dispatch( 'core/editor' ) || {};

		if ( 'function' === typeof setDeviceType ) {
			return setDeviceType( deviceType );
		}

		const { __experimentalSetPreviewDeviceType: experimentalSetPreviewDeviceType } = dispatch( 'core/edit-post' );

		if ( 'function' === typeof experimentalSetPreviewDeviceType ) {
			return experimentalSetPreviewDeviceType( deviceType );
		}
	};

	const previewDeviceType = useSelect( ( select ) => {
		const { getDeviceType } = select( 'core/editor' ) || {};

		if ( 'function' === typeof getDeviceType ) {
			return getDeviceType();
		}

		const {
			__experimentalGetPreviewDeviceType: experimentalGetPreviewDeviceType,
		} = select( 'core/edit-post' );

		if ( 'function' === typeof experimentalGetPreviewDeviceType ) {
			return experimentalGetPreviewDeviceType();
		}

		return undefined;
	}, [] );

	if (
		undefined === previewDeviceType || // core/editor and/or core/edit-post must not be available.
		( generateBlocksInfo && ! generateBlocksInfo.syncResponsivePreviews )
	) {
		const setDeviceType = ( type ) => {
			setLocalDeviceType( type );
		};

		// If we don't have the necessary functions, or sync previews are turned off, return the local states here.
		return [ localDeviceType, setDeviceType ];
	}

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
