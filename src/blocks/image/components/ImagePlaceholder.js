import { Path, SVG } from '@wordpress/primitives';
import { MediaPlaceholder } from '@wordpress/block-editor';
import { Button } from '@wordpress/components';
import { upload } from '@wordpress/icons';
import { __ } from '@wordpress/i18n';

export default function ImagePlaceholder( props ) {
	const {
		onSelectImage,
		onUploadError,
		attributes,
	} = props;

	const {
		isDynamicContent,
		contentType,
		dynamicSource,
	} = attributes;

	return (
		<>
			{
				(
					isDynamicContent &&
					(
						'featured-image' !== contentType ||
						'current-post' !== dynamicSource
					)
				) &&
				<div className="wp-block-post-featured-image__placeholder">
					<SVG
						className="components-placeholder__illustration"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 60 60"
						preserveAspectRatio="none"
					>
						<Path vectorEffect="non-scaling-stroke" d="M60 60 0 0" />
					</SVG>
				</div>
			}

			{ (
				! isDynamicContent ||
				(
					isDynamicContent &&
					'featured-image' === contentType &&
					'current-post' === dynamicSource
				)
			) &&
				<MediaPlaceholder
					onSelect={ onSelectImage }
					accept="image/*"
					allowedTypes={ [ 'image' ] }
					onError={ onUploadError }
					mediaLibraryButton={ ( { open } ) => {
						return (
							<Button
								icon={ upload }
								variant="primary"
								label={ __( 'Add a featured image' ) }
								showTooltip
								tooltipPosition="top center"
								onClick={ () => {
									open();
								} }
							/>
						);
					} }
				/>
			}
		</>
	);
}
