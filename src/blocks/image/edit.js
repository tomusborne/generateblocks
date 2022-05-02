import './editor.scss';
import ImageContentRenderer from './components/ImageContentRenderer';
import { compose } from '@wordpress/compose';
import withDynamicContent from '../../extend/dynamic-content/hoc/withDynamicContent';
import { withUniqueId } from '../../hoc';
import { useDeviceType } from '../../hooks';
import ComponentCSS from './components/ComponentCSS';
import { useDispatch } from '@wordpress/data';
import { useEffect } from '@wordpress/element';
import { store as noticesStore } from '@wordpress/notices';
import InspectorControls from './components/InspectorControls';
import { InspectorAdvancedControls } from '@wordpress/block-editor';
import { useEntityProp } from '@wordpress/core-data';
import HTMLAnchor from '../../components/html-anchor';

function ImageEdit( props ) {
	const {
		attributes,
		setAttributes,
		context,
		ContentRenderer = ImageContentRenderer,
	} = props;

	const {
		useDynamicData,
		sizeSlug,
		mediaUrl,
		anchor,
	} = attributes;

	const [ deviceType ] = useDeviceType( 'Desktop' );
	const { createErrorNotice } = useDispatch( noticesStore );
	const postType = 'post-type' === attributes.dynamicSource ? attributes.postType : context.postType;
	const postId = 'post-type' === attributes.dynamicSource ? attributes.postId : context.postId;
	const [ featuredImage ] = useEntityProp( 'postType', postType, 'featured_media', postId );

	const onSelectImage = ( image ) => {
		if ( ! useDynamicData && !! image ) {
			const imageUrl = image?.sizes && image?.sizes[ sizeSlug ]?.url || image?.url;

			setAttributes( {
				mediaId: image?.id,
				mediaUrl: imageUrl,
				alt: image?.alt,
				title: image?.title,
				caption: image?.caption,
				width: undefined,
				height: undefined,
			} );
		}
	};

	const onSelectURL = ( newURL ) => {
		if ( newURL !== mediaUrl ) {
			setAttributes( {
				mediaUrl: newURL,
				mediaId: undefined,
				width: undefined,
				height: undefined,
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
			/>

			<InspectorAdvancedControls>
				<HTMLAnchor { ...props } anchor={ anchor } />
			</InspectorAdvancedControls>

			<ComponentCSS { ...props } deviceType={ deviceType } />

			<ContentRenderer
				{ ...props }
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
	withDynamicContent,
	withUniqueId,
)( ImageEdit );
