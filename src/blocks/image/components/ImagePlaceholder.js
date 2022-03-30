import { Path, SVG } from '@wordpress/primitives';
import { MediaPlaceholder } from '@wordpress/block-editor';
import { Button, Placeholder } from '@wordpress/components';
import { upload } from '@wordpress/icons';
import { __ } from '@wordpress/i18n';

export default function ImagePlaceholder( props ) {
	const {
		onSelectImage,
		onUploadError,
		attributes,
		canUploadImage,
	} = props;

	const {
		isDynamicContent,
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
		onSelect={ onSelectImage }
		accept="image/*"
		allowedTypes={ [ 'image' ] }
		onError={ onUploadError }
		placeholder={ ( content ) => {
			return (
				<Placeholder className="block-editor-media-placeholder">
					{ placeholderIllustration }
					{ content }
				</Placeholder>
			);
		} }
		mediaLibraryButton={ ( { open } ) => {
			return (
				<Button
					icon={ upload }
					variant="primary"
					label={
						! isDynamicContent
							? __( 'Add an image', 'generateblocks' )
							: __( 'Add a featured image', 'generateblocks' )
					}
					showTooltip
					tooltipPosition="top center"
					onClick={ () => {
						open();
					} }
				/>
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
