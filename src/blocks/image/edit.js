import './editor.scss';
import ImageContentRenderer from './components/ImageContentRenderer';
import { compose } from '@wordpress/compose';
import withDynamicContent from '../../extend/dynamic-content/hoc/withDynamicContent';
import { withDeviceType, withUniqueId } from '../../hoc';
import ComponentCSS from './components/ComponentCSS';
import { useDispatch, useSelect } from '@wordpress/data';
import { useEffect, useState } from '@wordpress/element';
import { store as noticesStore } from '@wordpress/notices';
import ImageSettingsControls from './components/inspector-controls/ImageSettingsControl';
import { InspectorAdvancedControls, store as blockEditorStore } from '@wordpress/block-editor';
import { useEntityProp } from '@wordpress/core-data';
import { getBlobByURL, isBlobURL, revokeBlobURL } from '@wordpress/blob';
import HTMLAnchor from '../../components/html-anchor';
import { pick } from 'lodash';
import { withBlockContext } from '../../block-context';
import GenerateBlocksInspectorControls from '../../extend/inspector-control';
import { applyFilters } from '@wordpress/hooks';
import getDeviceType from '../../utils/get-device-type';

function ImageEdit( props ) {
	const {
		attributes,
		setAttributes,
		context,
		ContentRenderer = ImageContentRenderer,
	} = props;

	const {
		useDynamicData,
		dynamicContentType,
		sizeSlug,
		mediaId,
		mediaUrl,
		anchor,
	} = attributes;

	const deviceType = getDeviceType();
	const { createErrorNotice } = useDispatch( noticesStore );
	const [ temporaryURL, setTemporaryURL ] = useState();
	const postType = 'post-type' === attributes.dynamicSource ? attributes.postType : context.postType;
	const postId = 'post-type' === attributes.dynamicSource ? attributes.postId : context.postId;
	const [ featuredImage ] = useEntityProp( 'postType', postType, 'featured_media', postId );
	const isTemporaryImage = ( id, url ) => ! id && isBlobURL( url );

	const { mediaUpload } = useSelect( ( select ) => {
		const { getSettings } = select( blockEditorStore );
		return pick( getSettings(), [ 'imageDefaultSize', 'mediaUpload' ] );
	}, [] );

	const onSelectImage = ( image ) => {
		if ( ! image || ! image.url ) {
			setAttributes( {
				mediaUrl: undefined,
				mediaId: undefined,
				title: undefined,
				alt: undefined,
			} );

			return;
		}

		if ( isBlobURL( image.url ) ) {
			setTemporaryURL( image.url );
			return;
		}

		setTemporaryURL();

		if (
			!! image &&
			(
				! useDynamicData ||
				(
					!! useDynamicData &&
					! dynamicContentType
				)
			)
		) {
			const imageUrl = ( image?.sizes && image?.sizes[ sizeSlug ]?.url ) || image?.url;

			setAttributes( {
				mediaId: image?.id,
				mediaUrl: imageUrl,
				alt: image?.alt,
				title: image?.title,
			} );
		}
	};

	const onSelectURL = ( newURL ) => {
		if ( newURL !== mediaUrl ) {
			setAttributes( {
				mediaUrl: newURL,
				mediaId: undefined,
				title: '',
				alt: '',
			} );
		}
	};

	const onUploadError = ( message ) => {
		createErrorNotice( message[ 2 ], { type: 'snackbar' } );
	};

	const onResetImage = () => {
		setAttributes( {
			mediaId: undefined,
			mediaUrl: '',
			alt: '',
			title: '',
			width: '',
			widthTablet: '',
			widthMobile: '',
			height: '',
			heightTablet: '',
			heightMobile: '',
		} );
	};

	useEffect( () => {
		if ( ! sizeSlug ) {
			setAttributes( { sizeSlug: 'full' } );
		}
	}, [] );

	let isTemp = isTemporaryImage( mediaId, mediaUrl );

	// Upload a temporary image on mount.
	useEffect( () => {
		if ( ! isTemp ) {
			return;
		}

		const file = getBlobByURL( mediaUrl );

		if ( file ) {
			mediaUpload( {
				filesList: [ file ],
				onFileChange: ( [ img ] ) => {
					onSelectImage( img );
				},
				allowedTypes: [ 'image' ],
				onError: ( message ) => {
					isTemp = false;
					onUploadError( message );
				},
			} );
		}
	}, [] );

	// If an image is temporary, revoke the Blob url when it is uploaded (and is
	// no longer temporary).
	useEffect( () => {
		if ( isTemp ) {
			setTemporaryURL( mediaUrl );
			return;
		}
		revokeBlobURL( temporaryURL );
	}, [ isTemp, mediaUrl ] );

	return (
		<>
			<GenerateBlocksInspectorControls
				attributes={ attributes }
				setAttributes={ setAttributes }
			>
				{ applyFilters( 'generateblocks.editor.settingsPanel', undefined, { ...props, device: deviceType } ) }

				<ImageSettingsControls
					attributes={ attributes }
					setAttributes={ setAttributes }
					deviceType={ deviceType }
				/>
			</GenerateBlocksInspectorControls>

			<InspectorAdvancedControls>
				<HTMLAnchor { ...props } anchor={ anchor } />
			</InspectorAdvancedControls>

			<ComponentCSS { ...props } deviceType={ deviceType } />

			<ContentRenderer
				{ ...props }
				temporaryURL={ temporaryURL }
				featuredImage={ featuredImage }
				onSelectImage={ onSelectImage }
				onSelectURL={ onSelectURL }
				onUploadError={ onUploadError }
				onResetImage={ onResetImage }
				deviceType={ deviceType }
			/>
		</>
	);
}

export default compose(
	withDeviceType,
	withBlockContext,
	withDynamicContent,
	withUniqueId,
)( ImageEdit );
