import { BlockControls, MediaReplaceFlow } from '@wordpress/block-editor';
import { MenuItem, ToolbarGroup, ToolbarButton } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import LinkControl from '../../../components/link-control';
import { useDispatch } from '@wordpress/data';
import { createBlock } from '@wordpress/blocks';
import { useInnerBlocksCount } from '../../../hooks';
import getIcon from '../../../utils/get-icon';
import AlignmentControls from './AlignmentControls';

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
		deviceType,
	} = props;

	const { mediaId, caption } = attributes;

	const { insertBlocks } = useDispatch( 'core/block-editor' );
	const innerBlocksCount = useInnerBlocksCount( clientId );

	return (
		<BlockControls>
			<AlignmentControls
				attributes={ attributes }
				setAttributes={ setAttributes }
				deviceType={ deviceType }
			/>

			{ 0 === innerBlocksCount &&
				<ToolbarGroup>
					<ToolbarButton
						className="gblocks-add-new-button"
						icon={ getIcon( 'caption' ) }
						label={ __( 'Add Caption', 'generateblocks' ) }
						onClick={ () => {
							insertBlocks( createBlock( 'generateblocks/headline', {
								element: 'figcaption',
								content: caption,
								isCaption: true,
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
