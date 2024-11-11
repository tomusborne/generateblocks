import { MediaPlaceholder } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
import getIcon from '../../../utils/get-icon';

export function ImagePlaceholder( props ) {
	const {
		onSelectImage,
		onSelectURL,
		onUploadError,
		uniqueId,
	} = props;

	const placeholder = <MediaPlaceholder
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
	/>;

	return <div
		className="gblocks-image__placeholder"
		data-gb-id={ uniqueId }
	>
		{ placeholder }
	</div>;
}
