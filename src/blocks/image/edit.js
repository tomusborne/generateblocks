import './editor.scss';
import InspectorControls from './components/InspectorControls';
import ImageContentRenderer from './components/ImageContentRenderer';
import { compose } from '@wordpress/compose';
import withDynamicContent from '../../extend/dynamic-content/hoc/withDynamicContent';
import { withUniqueId } from '../../hoc';
import { useDeviceType } from '../../hooks';
import ComponentCSS from './components/ComponentCSS';
import { useEntityProp, store as coreStore } from '@wordpress/core-data';
import { useSelect, useDispatch } from '@wordpress/data';
import {
	BlockControls,
	MediaReplaceFlow,
} from '@wordpress/block-editor';
import { MenuItem } from '@wordpress/components';
import { store as noticesStore } from '@wordpress/notices';
import { __ } from '@wordpress/i18n';

function ImageEdit( props ) {
	const {
		attributes,
		setAttributes,
		ContentRenderer = ImageContentRenderer,
		context,
	} = props;

	const {
		isDynamicContent,
		dynamicSource,
		contentType,
		mediaId,
		url,
	} = attributes;

	const [ deviceType ] = useDeviceType( 'Desktop' );
	const postType = 'post-type' === dynamicSource ? attributes.postType : context.postType;
	const postId = 'post-type' === dynamicSource ? attributes.postId : context.postId;
	const [ featuredImage, setFeaturedImage ] = useEntityProp( 'postType', postType, 'featured_media', postId );
	const dynamicImageId = 'featured-image' === contentType ? featuredImage : false; // Needs ID for other types.

	const media = useSelect( ( select ) => {
		return dynamicImageId && select( coreStore ).getMedia( dynamicImageId, { context: 'view' } );
	}, [ dynamicImageId ] );

	const imageUrl = isDynamicContent ? media?.source_url : url;
	const isDescendentOfQueryLoop = !! context[ 'generateblocks/query' ];

	const onSelectImage = ( value ) => {
		if ( isDynamicContent && 'featured-image' === contentType && value?.id ) {
			setFeaturedImage( value.id );
		}

		if ( ! isDynamicContent ) {
			setAttributes( {
				mediaId: value?.id,
				url: value?.url,
			} );
		}
	};

	const { createErrorNotice } = useDispatch( noticesStore );
	const onUploadError = ( message ) => {
		createErrorNotice( message[ 2 ], { type: 'snackbar' } );
	};

	const hasStaticImage = !! mediaId && ! isDynamicContent;
	const hasFeaturedImage = !! isDynamicContent && 'featured-image' === contentType && 'current-post' === dynamicSource;

	return (
		<>
			<InspectorControls
				attributes={ attributes }
				setAttributes={ setAttributes }
				deviceType={ deviceType }
			/>

			{ ( hasStaticImage || ( hasFeaturedImage && ! isDescendentOfQueryLoop ) ) &&
				<BlockControls group="other">
					<MediaReplaceFlow
						mediaId={ mediaId }
						mediaURL={ imageUrl }
						allowedTypes={ [ 'image' ] }
						accept="image/*"
						onSelect={ onSelectImage }
						onError={ onUploadError }
					>
						<MenuItem onClick={ () => {
							if ( isDynamicContent && 'featured-image' === contentType ) {
								setFeaturedImage( 0 );
							}

							if ( ! isDynamicContent ) {
								setAttributes( {
									mediaId: '',
									url: '',
								} );
							}
						} }>
							{ __( 'Reset' ) }
						</MenuItem>
					</MediaReplaceFlow>
				</BlockControls>
			}

			<ComponentCSS { ...props } deviceType={ deviceType } />

			<ContentRenderer
				{ ...props }
				media={ media }
				onSelectImage={ onSelectImage }
				onUploadError={ onUploadError }
			/>
		</>
	);
}

export default compose(
	withDynamicContent,
	withUniqueId,
)( ImageEdit );
