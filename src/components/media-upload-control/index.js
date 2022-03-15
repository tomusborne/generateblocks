import './styles.scss';
import { BaseControl, Button, TextControl, Tooltip } from '@wordpress/components';
import { MediaUpload } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';

function MediaLibraryButton( { onClick } ) {
	return (
		<Tooltip text={ __( 'Open the Media Library', 'generateblocks' ) }>
			<Button onClick={ onClick } className="is-primary">
				{ __( 'Browse', 'generateblocks' ) }
			</Button>
		</Tooltip>
	);
}

export default function MediaUploadControl( { id, url, onSelect, onChange, onClose } ) {
	return (
		<div className={ 'generateblocks-media-upload-control-wrapper' }>

			<BaseControl label={ __( 'Image url', 'generateblocks' ) } />

			<div className={ 'generateblocks-media-upload-control' }>

				<TextControl
					type={ 'text' }
					value={ url }
					placeholder={ __( 'Browse your image', 'generateblocks' ) }
					onChange={ onChange }
				/>

				<MediaUpload
					title={ __( 'Select image', 'generateblocks' ) }
					onSelect={ onSelect }
					onClose={ onClose }
					allowedTypes={ [ 'image' ] }
					value={ id }
					modalClass="editor-gb-media-upload-modal"
					render={ ( { open } ) => (
						<MediaLibraryButton onClick={ open } />
					) }
				/>

			</div>
		</div>
	);
}
