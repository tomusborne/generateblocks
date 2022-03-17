import ImagePlaceholder from './ImagePlaceholder';
import { BlockControls, MediaReplaceFlow, useBlockProps } from '@wordpress/block-editor';
import classnames from 'classnames';
import { applyFilters } from '@wordpress/hooks';
import RootElement from '../../../components/root-element';
import Element from '../../../components/element';
import { MenuItem } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

export default function ImageContentRenderer( props ) {
	const {
		attributes,
		setAttributes,
		name,
		clientId,
		context,
		onSelectImage,
		onUploadError,
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

	const imgAttributes = {
		className: `gb-image-${ uniqueId }`,
		title: titleText,
	};

	const hasStaticImage = !! mediaId && ! isDynamicContent;
	const hasFeaturedImage = !! isDynamicContent && 'featured-image' === contentType && 'current-post' === dynamicSource;

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
						<MenuItem onClick={ () => {

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

			<RootElement name={ name } clientId={ clientId }>
				<Element tagName="figure" htmlAttrs={ blockProps }>
					{ ( !! imageUrl )
						? <img src={ imageUrl } alt={ altText } { ...imgAttributes } />
						: <ImagePlaceholder { ...props } />
					}
				</Element>
			</RootElement>
		</>
	);
}
