import { __ } from '@wordpress/i18n';
import { BaseControl, Button, TextControl, useBaseControlProps } from '@wordpress/components';
import { MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
import { Stack } from '@edge22/components';
import { DynamicTagModal } from '../../dynamic-tags';
import './editor.scss';

export function ImageUpload( {
	label = __( 'Image', 'generateblocks' ),
	value,
	onInsert,
	onSelectImage,
	showInput = true,
	previewUrl = '',
	allowDynamicTags = false,
	onInsertDynamicTag,
	context,
	sizeSlug = null,
} ) {
	const { baseControlProps, controlProps } = useBaseControlProps( {
		label,
	} );

	return (
		<BaseControl { ...baseControlProps }>
			<Stack
				className="gb-image-upload-stack"
				layout="flex"
				direction="horizontal"
				gap="5px"
				wrap={ false }
			>
				{ !! showInput && (
					<TextControl
						{ ...controlProps }
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
						onSelect={ ( media ) => onSelectImage( media, sizeSlug ) }
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

				{ allowDynamicTags && (
					<DynamicTagModal
						onInsert={ ( newValue ) => onInsertDynamicTag( newValue ) }
						selectedText={ value?.startsWith( '{{' ) ? value : '' }
						context={ context }
					/>
				) }
			</Stack>
		</BaseControl>
	);
}
