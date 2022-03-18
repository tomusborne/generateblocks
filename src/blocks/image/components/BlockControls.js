import { BlockControls, MediaReplaceFlow } from '@wordpress/block-editor';
import { MenuItem, ToolbarGroup } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import LinkControl from '../../../components/link-control';

export default function ImageBlockControls( props ) {
	const {
		attributes,
		setAttributes,
		onSelectImage,
		onUploadError,
		onResetImage,
		imageUrl,
		canUploadImage,
	} = props;

	const { mediaId } = attributes;

	return (
		<BlockControls>

			{ !! imageUrl && canUploadImage &&
				<ToolbarGroup>
					<MediaReplaceFlow
						mediaId={ mediaId }
						mediaURL={ imageUrl }
						allowedTypes={ [ 'image' ] }
						accept="image/*"
						onSelect={ onSelectImage }
						onError={ onUploadError }
					>
						<MenuItem onClick={ onResetImage }>
							{ __( 'Reset' ) }
						</MenuItem>
					</MediaReplaceFlow>
				</ToolbarGroup>
			}

			<ToolbarGroup>
				<LinkControl
					attributes={ attributes }
					setAttributes={ setAttributes }
				/>
			</ToolbarGroup>

		</BlockControls>
	);
}
