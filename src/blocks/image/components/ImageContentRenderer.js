import ImagePlaceholder from './ImagePlaceholder';
import { useBlockProps } from '@wordpress/block-editor';
import { useEntityProp, store as coreStore } from '@wordpress/core-data';
import { useSelect } from '@wordpress/data';
import { useEffect } from '@wordpress/element';
import classnames from 'classnames';
import { applyFilters } from '@wordpress/hooks';

export default function ImageContentRenderer( props ) {
	const { context, attributes, setAttributes } = props;
	const { uniqueId, anchor } = attributes;
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

	let htmlAttributes = {
		className: classnames( {
			'gb-block-image': true,
			[ `gb-block-image-${ uniqueId }` ]: true,
		} ),
		id: anchor ? anchor : null,
	};

	htmlAttributes = applyFilters(
		'generateblocks.frontend.htmlAttributes',
		htmlAttributes,
		'generateblocks/image',
		attributes
	);

	const blockProps = useBlockProps( htmlAttributes );

	return (
		<figure { ...blockProps }>
			{ ( !! imageUrl )
				? <img src={ imageUrl } className={ `gb-image-${ uniqueId }` } alt="" />
				: <ImagePlaceholder />
			}
		</figure>
	);
}
