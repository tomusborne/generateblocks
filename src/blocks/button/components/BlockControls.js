import { ToolbarButton, ToolbarGroup } from '@wordpress/components';
import getIcon from '../../../utils/get-icon';
import { __ } from '@wordpress/i18n';
import { cloneBlock } from '@wordpress/blocks';
import { BlockControls } from '@wordpress/block-editor';
import { useDispatch, useSelect } from '@wordpress/data';

export default ( { clientId } ) => {
	const { insertBlocks } = useDispatch( 'core/block-editor' );
	const {
		getBlockParentsByBlockName,
		getBlockRootClientId,
		getBlocksByClientId,
	} = useSelect( ( select ) => select( 'core/block-editor' ), [] );

	return (
		<BlockControls>
			<ToolbarGroup>
				<ToolbarButton
					className="gblocks-add-new-button"
					icon={ getIcon( 'insert' ) }
					label={ __( 'Add Button', 'generateblocks' ) }
					onClick={ () => {
						let parentBlockId = false;

						if ( typeof getBlockParentsByBlockName === 'function' ) {
							parentBlockId = getBlockParentsByBlockName( clientId, 'generateblocks/button-container', true )[ 0 ];
						} else {
							parentBlockId = getBlockRootClientId( clientId );
						}

						const thisBlock = getBlocksByClientId( clientId )[ 0 ];

						const clonedBlock = cloneBlock(
							thisBlock,
							{
								uniqueId: '',
							}
						);

						insertBlocks( clonedBlock, undefined, parentBlockId );
					} }
					showTooltip
				/>
			</ToolbarGroup>
		</BlockControls>
	);
};
