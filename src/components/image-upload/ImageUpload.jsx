import { __ } from '@wordpress/i18n';
import { BaseControl, Button, TextControl } from '@wordpress/components';
import { MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
import { Stack } from '@edge22/components';
import { DynamicTagDropdown } from '../../dynamic-tags';
import './editor.scss';

export function ImageUpload( {
	label = __( 'Image', 'generateblocks' ),
	value,
	onInsert,
	onSelectImage,
	showInput = true,
	previewUrl = '',
	allowDynamicTags = false,
} ) {
	return (
		<BaseControl
			label={ label }
			id=""
		>
			<Stack
				className="gb-image-upload-stack"
				layout="flex"
				direction="horizontal"
				gap="5px"
				wrap={ false }
			>
				{ !! showInput && (
					<TextControl
						value={ value }
						onChange={ ( newValue ) => onInsert( newValue ) }
						style={ { marginBottom: 0 } }
					/>
				) }

				{ !! previewUrl && (
					<img
						src={ previewUrl }
						alt=""
						style={ { width: 'auto', height: '32px', objectFit: 'cover' } }
					/>
				) }

				<MediaUploadCheck>
					<MediaUpload
						onSelect={ ( media ) => onSelectImage( media ) }
						allowedTypes={ [ 'image' ] }
						render={ ( { open } ) => (
							<Button
								onClick={ open }
								variant="secondary"
								size="compact"
							>
								{ __( 'Browse', 'generateblocks' ) }
							</Button>
						) }
					/>
				</MediaUploadCheck>

				{ allowDynamicTags && (
					<DynamicTagDropdown
						onInsert={ ( newValue ) => onInsert( newValue ) }
					/>
				) }
			</Stack>
		</BaseControl>
	);
}
