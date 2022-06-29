import { Path, SVG } from '@wordpress/primitives';
import { MediaPlaceholder } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
import getIcon from '../../../utils/get-icon';

export default function ImagePlaceholder( props ) {
	const {
		onSelectImage,
		onSelectURL,
		onUploadError,
		attributes,
		canUploadImage,
	} = props;

	const {
		width,
		height,
		useDynamicData,
		uniqueId,
	} = attributes;

	const placeholderIllustration = (
		<SVG
			className="components-placeholder__illustration"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 60 60"
			preserveAspectRatio="none"
		>
			<Path vectorEffect="non-scaling-stroke" d="M60 60 0 0" />
		</SVG>
	);

	let placeholderImage = generateBlocksInfo.imagePlaceholders.standard;

	if ( width && width < 500 && width === height ) {
		placeholderImage = generateBlocksInfo.imagePlaceholders.square;
	}

	let placeholder = <MediaPlaceholder
		labels={ {
			title: __( 'Image', 'generateblocks' ),
			instructions: __( 'Choose an image from your media library or add one with a URL.', 'generateblocks' ),
		} }
		icon={ getIcon( 'image' ) }
		onSelect={ onSelectImage }
		onSelectURL={ ! useDynamicData ? onSelectURL : null }
		onError={ onUploadError }
		accept="image/*"
		allowedTypes={ [ 'image' ] }
	/>;

	if ( ! canUploadImage ) {
		placeholder = <>
			<img
				className={ 'gb-image-' + uniqueId }
				src={ placeholderImage }
				alt=""
				width={ width ? width : 1000 }
				height={ height ? height : 650 }
			/>
			{ placeholderIllustration }
		</>;
	}

	return <div
		className="gblocks-image__placeholder"
		style={ { width: ! canUploadImage && width ? width : null } }
	>
		{ placeholder }
	</div>;
}
