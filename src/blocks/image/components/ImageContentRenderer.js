import ImagePlaceholder from './ImagePlaceholder';
import { useBlockProps } from '@wordpress/block-editor';
import { useEntityProp, store as coreStore } from '@wordpress/core-data';
import { useSelect } from '@wordpress/data';
import { useEffect } from '@wordpress/element';

export default function ImageContentRenderer( props ) {
	const { context, attributes, setAttributes } = props;
	const blockProps = useBlockProps();
	const postType = 'post-type' === attributes.dynamicSource ? attributes.postType : context.postType;
	const postId = 'post-type' === attributes.dynamicSource ? attributes.postId : context.postId;

	const [ featuredImage ] = useEntityProp( 'postType', postType, 'featured_media', postId );

	const media = useSelect( ( select ) => {
		return featuredImage && select( coreStore ).getMedia( featuredImage, { context: 'view' } );
	}, [ featuredImage ] );

	const imageUrl = attributes.isDynamicContent ? media?.source_url : attributes.url;

	useEffect( () => {
		setAttributes( {
			contentType: attributes.isDynamicContent ? 'featured-image' : '',
		} );
	}, [ attributes.isDynamicContent ] );

	return (
		<figure { ...blockProps }>
			{ ( imageUrl )
				? <img src={ imageUrl } alt="" />
				: <ImagePlaceholder />
			}
		</figure>
	);
}
