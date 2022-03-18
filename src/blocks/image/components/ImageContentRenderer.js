import ImagePlaceholder from './ImagePlaceholder';
import { BlockControls, MediaReplaceFlow, useBlockProps } from '@wordpress/block-editor';
import classnames from 'classnames';
import { applyFilters } from '@wordpress/hooks';
import RootElement from '../../../components/root-element';
import Element from '../../../components/element';
import { MenuItem } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import Image from './Image';

export default function ImageContentRenderer( props ) {
	const {
		attributes,
		setAttributes,
		name,
		clientId,
		context,
		onSelectImage,
		onUploadError,
		onResetImage,
		isSelected,
	} = props;

	const {
		uniqueId,
		isDynamicContent,
		anchor,
		contentType,
		dynamicSource,
		mediaId,
		featuredImage, // Injected by DynamicRenderer
	} = attributes;

	const isDescendentOfQueryLoop = !! context[ 'generateblocks/query' ];

	const imageUrl = isDynamicContent ? featuredImage?.source_url : attributes.url;
	const altText = isDynamicContent ? featuredImage?.alt_text : attributes.alt;
	const titleText = isDynamicContent ? featuredImage?.title?.rendered : attributes.title;
	const captionText = isDynamicContent ? featuredImage?.caption?.rendered : attributes.caption;

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

	const hasStaticImage = !! mediaId && ! isDynamicContent;
	const hasFeaturedImage = !! isDynamicContent && 'featured-image' === contentType && 'current-post' === dynamicSource;
	const imageProps = {
		src: imageUrl,
		alt: altText,
		title: titleText,
		caption: captionText,
		className: `gb-image-${ uniqueId }`,
		isDynamic: !! isDynamicContent,
		setAttributes,
		isSelected,
	};

	return (
		<>
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
						<MenuItem onClick={ onResetImage }>
							{ __( 'Reset' ) }
						</MenuItem>
					</MediaReplaceFlow>
				</BlockControls>
			}

			<RootElement name={ name } clientId={ clientId }>
				<Element tagName="figure" htmlAttrs={ blockProps }>
					{ ( !! imageUrl )
						? <Image { ...imageProps } />
						: <ImagePlaceholder { ...props } />
					}
				</Element>
			</RootElement>
		</>
	);
}
