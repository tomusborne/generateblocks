import { __ } from '@wordpress/i18n';
import { BaseControl, Button, TextControl } from '@wordpress/components';
import { MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
import { Stack } from '@edge22/components';
import { DynamicTagDropdown } from '../../dynamic-tags';
import './editor.scss';

export function ImageUpload( { url, onInsert, onSelectImage } ) {
	return (
		<BaseControl
			label={ __( 'Image', 'generateblocks' ) }
			id=""
		>
			<Stack
				className="gb-image-upload-stack"
				layout="flex"
				direction="horizontal"
				gap="2"
				wrap={ false }
			>
				<TextControl
					value={ url }
					onChange={ ( value ) => onInsert( value ) }
					style={ { marginBottom: 0 } }
				/>

				<MediaUploadCheck>
					<MediaUpload
						onSelect={ ( media ) => onSelectImage( media ) }
						allowedTypes={ [ 'image' ] }
						render={ ( { open } ) => (
							<Button
								onClick={ open }
								variant="secondary"
							>
								{ __( 'Browse', 'generateblocks' ) }
							</Button>
						) }
					/>
				</MediaUploadCheck>

				<DynamicTagDropdown
					onInsert={ ( value ) => onInsert( value ) }
				/>
			</Stack>
		</BaseControl>
	);
}
