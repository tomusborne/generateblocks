import './editor.scss';
import ImageContentRenderer from './components/ImageContentRenderer';
import { compose } from '@wordpress/compose';
import withDynamicContent from '../../extend/dynamic-content/hoc/withDynamicContent';
import { withUniqueId } from '../../hoc';
import { useDeviceType } from '../../hooks';
import ComponentCSS from './components/ComponentCSS';
import { useDispatch } from '@wordpress/data';
import { store as noticesStore } from '@wordpress/notices';
import InspectorControls from './components/InspectorControls';
import { useEntityProp } from '@wordpress/core-data';

function ImageEdit( props ) {
	const {
		attributes,
		setAttributes,
		context,
		ContentRenderer = ImageContentRenderer,
	} = props;

	const { isDynamicContent, contentType } = attributes;
	const [ deviceType ] = useDeviceType( 'Desktop' );
	const { createErrorNotice } = useDispatch( noticesStore );
	const postType = 'post-type' === attributes.dynamicSource ? attributes.postType : context.postType;
	const postId = 'post-type' === attributes.dynamicSource ? attributes.postId : context.postId;

	const [ featuredImage, setFeaturedImage ] = useEntityProp( 'postType', postType, 'featured_media', postId );

	const onSelectImage = ( image ) => {
		if ( isDynamicContent && 'featured-image' === contentType && image?.id ) {
			setFeaturedImage( image.id );
		}

		if ( ! isDynamicContent ) {
			setAttributes( {
				mediaId: image?.id,
				mediaUrl: image?.url,
				alt: image?.alt,
				title: image?.title,
				caption: image?.caption,
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
		} );
	};

	return (
		<>
			<InspectorControls
				attributes={ attributes }
				setAttributes={ setAttributes }
				deviceType={ deviceType }
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
