import { BlockControls } from '@wordpress/block-editor';
import { ToolbarButton, ToolbarGroup } from '@wordpress/components';
import getIcon from '../../../utils/get-icon';
import { __ } from '@wordpress/i18n';
import { createBlock } from '@wordpress/blocks';
import { useDispatch } from '@wordpress/data';

export default ( { uniqueId, clientId } ) => {
	const { insertBlocks } = useDispatch( 'core/block-editor' );

	return (
		<BlockControls>
			<ToolbarGroup>
				<ToolbarButton
					className="gblocks-block-control-icon gblocks-add-grid-item"
					icon={ getIcon( 'addContainer' ) }
					label={ __( 'Add Grid Item', 'generateblocks' ) }
					onClick={ () => {
						insertBlocks(
							createBlock( 'generateblocks/container', {
								isGrid: true,
								gridId: uniqueId,
								paddingTop: generateBlocksStyling.container.gridItemPaddingTop || '',
								paddingRight: generateBlocksStyling.container.gridItemPaddingRight || '',
								paddingBottom: generateBlocksStyling.container.gridItemPaddingBottom || '',
								paddingLeft: generateBlocksStyling.container.gridItemPaddingLeft || '',
								width: 50,
								widthMobile: 100,
							} ),
							undefined,
							clientId
						);
					} }
					showTooltip
				/>
			</ToolbarGroup>
		</BlockControls>
	);
};
