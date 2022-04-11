import { BlockControls, MediaReplaceFlow } from '@wordpress/block-editor';
import { MenuItem, ToolbarGroup, ToolbarButton } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import LinkControl from '../../../components/link-control';
import { postExcerpt } from '@wordpress/icons';
import { useDispatch } from '@wordpress/data';
import { createBlock } from '@wordpress/blocks';
import { useInnerBlocksCount } from '../../../hooks';

export default function ImageBlockControls( props ) {
	const {
		attributes,
		setAttributes,
		onSelectImage,
		onUploadError,
		onResetImage,
		imageUrl,
		canUploadImage,
		clientId,
	} = props;

	const { mediaId, caption, isDynamicContent } = attributes;

	const { insertBlocks } = useDispatch( 'core/block-editor' );
	const innerBlocksCount = useInnerBlocksCount( clientId );

	return (
		<BlockControls>
			{ 0 === innerBlocksCount &&
				<ToolbarGroup>
					<ToolbarButton
						className="gblocks-add-new-button"
						icon={ postExcerpt }
						label={ __( 'Add Button', 'generateblocks' ) }
						onClick={ () => {
							insertBlocks( createBlock( 'generateblocks/headline', {
								element: 'figcaption',
								content: caption,
								isCaption: true,
								isDynamicContent: !! isDynamicContent,
								contentType: !! isDynamicContent ? 'caption' : null,
							} ), undefined, clientId );
						} }
						showTooltip
					/>
				</ToolbarGroup>
			}

			{ !! imageUrl &&
				<ToolbarGroup>
					<LinkControl
						attributes={ attributes }
						setAttributes={ setAttributes }
					/>
				</ToolbarGroup>
			}

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
		</BlockControls>
	);
}
