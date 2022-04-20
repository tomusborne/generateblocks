import { Path, SVG } from '@wordpress/primitives';
import { MediaPlaceholder } from '@wordpress/block-editor';
import { Button } from '@wordpress/components';
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

	let placeholder = <MediaPlaceholder
		labels={ {
			title: __( 'Image', 'generateblocks' ),
			instructions: __( 'Choose an image from your media library or add one with a URL.', 'generateblocks' ),
		} }
		icon={ getIcon( 'image' ) }
		onSelect={ onSelectImage }
		onSelectURL={ onSelectURL }
		onError={ onUploadError }
		accept="image/*"
		allowedTypes={ [ 'image' ] }
		mediaLibraryButton={ ( { open } ) => {
			return (
				<Button
					variant="primary"
					onClick={ () => {
						open();
					} }
				>
					{ __( 'Media Library', 'generateblocks' ) }
				</Button>
			);
		} }
	/>;

	if ( ! canUploadImage ) {
		placeholder = placeholderIllustration;
	}

	return <div className="wp-block-post-featured-image__placeholder"
		style={ {
			position: 'relative',
			maxWidth: '100%',
			width,
		} }
	>{ placeholder }</div>;
}
