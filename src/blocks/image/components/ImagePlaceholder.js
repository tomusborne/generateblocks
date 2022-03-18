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
		context,
	} = props;

	const {
		isDynamicContent,
		contentType,
		dynamicSource,
	} = attributes;

	const isDescendentOfQueryLoop = !! context[ 'generateblocks/query' ];

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

	let placeholder = <div className="wp-block-post-featured-image__placeholder">
		{ placeholderIllustration }
	</div>;

	const buttonLabel = ! isDynamicContent ? __( 'Add an image', 'generateblocks' ) : __( 'Add a featured image', 'generateblocks' );

	if (
		(
			! isDynamicContent &&
			! isDescendentOfQueryLoop
		) ||
		(
			isDynamicContent &&
			'featured-image' === contentType &&
			'current-post' === dynamicSource &&
			! isDescendentOfQueryLoop
		)
	) {
		placeholder = <MediaPlaceholder
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
						label={ buttonLabel }
						showTooltip
						tooltipPosition="top center"
						onClick={ () => {
							open();
						} }
					/>
				);
			} }
		/>;
	}

	return placeholder;
}
