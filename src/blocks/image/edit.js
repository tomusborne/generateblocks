import './editor.scss';
import ImageContentRenderer from './components/ImageContentRenderer';
import { compose } from '@wordpress/compose';
import withDynamicContent from '../../extend/dynamic-content/hoc/withDynamicContent';
import { withUniqueId } from '../../hoc';
import { useDeviceType } from '../../hooks';
import ComponentCSS from './components/ComponentCSS';
import { useDispatch, useSelect } from '@wordpress/data';
import { useEffect } from '@wordpress/element';
import { store as noticesStore } from '@wordpress/notices';
import InspectorControls from './components/InspectorControls';
import { useEntityProp, store as coreStore } from '@wordpress/core-data';
import getImageSizes from '../../utils/get-image-sizes';

function ImageEdit( props ) {
	const {
		attributes,
		setAttributes,
		context,
		ContentRenderer = ImageContentRenderer,
	} = props;

	const {
		isDynamicContent,
		contentType,
		mediaId,
		sizeSlug,
		dynamicImage,
	} = attributes;

	const [ deviceType ] = useDeviceType( 'Desktop' );
	const { createErrorNotice } = useDispatch( noticesStore );
	const postType = 'post-type' === attributes.dynamicSource ? attributes.postType : context.postType;
	const postId = 'post-type' === attributes.dynamicSource ? attributes.postId : context.postId;

	const [ featuredImage, setFeaturedImage ] = useEntityProp( 'postType', postType, 'featured_media', postId );

	/**
	 * Returning dynamicImage isn't working here.
	 * Can test by seeing if width/height are updated when changing sizes.
	 */
	const imageData = useSelect( ( select ) => {
		const { getMedia } = select( coreStore );

		const newMediaId = isDynamicContent ? dynamicImage : mediaId;
		return newMediaId && getMedia( newMediaId, { context: 'view' } );
	}, [ isDynamicContent, mediaId, dynamicImage ] );

	const onSelectImage = ( image ) => {
		if ( isDynamicContent && 'featured-image' === contentType && image?.id ) {
			setFeaturedImage( image.id );

			setAttributes( {
				width: image?.sizes[ sizeSlug ]?.width,
				height: image?.sizes[ sizeSlug ]?.height,
			} );
		}

		if ( ! isDynamicContent ) {
			setAttributes( {
				mediaId: image?.id,
				mediaUrl: image?.url,
				alt: image?.alt,
				title: image?.title,
				caption: image?.caption,
				width: image?.sizes[ sizeSlug ]?.width,
				height: image?.sizes[ sizeSlug ]?.height,
			} );
		}
	};

	const onUploadError = ( message ) => {
		createErrorNotice( message[ 2 ], { type: 'snackbar' } );
	};

	const onResetImage = () => {
		if ( isDynamicContent && 'featured-image' === contentType ) {
			setFeaturedImage( 0 );
		}

		setAttributes( {
			mediaId: undefined,
			mediaUrl: '',
			alt: '',
			title: '',
			caption: '',
			width: undefined,
			height: undefined,
		} );
	};

	useEffect( () => {
		if ( ! sizeSlug ) {
			setAttributes( { sizeSlug: 'full' } );
		}
	}, [] );

	return (
		<>
			<InspectorControls
				attributes={ attributes }
				setAttributes={ setAttributes }
				deviceType={ deviceType }
				imageSizes={ getImageSizes() }
				imageData={ imageData }
			/>

			<ComponentCSS { ...props } deviceType={ deviceType } />

			<ContentRenderer
				{ ...props }
				onSelectImage={ onSelectImage }
				onUploadError={ onUploadError }
				onResetImage={ onResetImage }
			/>
		</>
	);
}

export default compose(
	withDynamicContent,
	withUniqueId,
)( ImageEdit );
