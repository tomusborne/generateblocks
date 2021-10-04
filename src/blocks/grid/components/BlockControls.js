import { BlockControls } from '@wordpress/block-editor';
import { ToolbarButton, ToolbarGroup } from '@wordpress/components';
import getIcon from '../../../utils/get-icon';
import {__} from '@wordpress/i18n';
import { createBlock } from '@wordpress/blocks';

export default ( { uniqueId, clientId,  } ) => {
	return (
		<BlockControls>
			<ToolbarGroup>
				<ToolbarButton
					className="gblocks-block-control-icon gblocks-add-grid-item"
					icon={ getIcon( 'addContainer' ) }
					label={ __( 'Add Grid Item', 'generateblocks' ) }
					onClick={ () => {
						wp.data.dispatch( 'core/block-editor' ).insertBlocks(
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
