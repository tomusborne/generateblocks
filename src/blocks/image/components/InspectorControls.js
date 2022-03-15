import { InspectorControls } from '@wordpress/block-editor';
import MediaUploadControl from '../../../components/media-upload-control';

export default function ImageInspectorControls( props ) {
	const { attributes, setAttributes } = props;

	return (
		<InspectorControls>
			<MediaUploadControl
				url={ attributes.url }
				id={ attributes.mediaId }
				onSelect={ ( media ) => {
					setAttributes( {
						mediaId: media?.id,
						url: media?.url,
					} );
				} }
				onChange={ ( newUrl ) => {
					setAttributes( { url: newUrl } );
				} }
				onClose={ () => {} }
			/>
		</InspectorControls>
	);
}
