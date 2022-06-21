import { BlockControls } from '@wordpress/block-editor';
import { ToolbarButton, ToolbarGroup } from '@wordpress/components';
import getIcon from '../../../utils/get-icon';
import { __ } from '@wordpress/i18n';
import { createBlocksFromInnerBlocksTemplate } from '@wordpress/blocks';
import { useDispatch, useSelect } from '@wordpress/data';

export default ( { clientId } ) => {
	const { insertBlocks } = useDispatch( 'core/block-editor' );
	const {
		getBlock,
	} = useSelect( ( select ) => select( 'core/block-editor' ), [] );
	const { selectBlock } = useDispatch( 'core/block-editor' );

	const thisBlock = getBlock( clientId );
	const gridBlock = thisBlock ? thisBlock?.innerBlocks[ 0 ] : false;
	const containerBlock = thisBlock ? thisBlock?.innerBlocks[ 0 ]?.innerBlocks[ 0 ] : false;

	const DEFAULT_BUTTON_ATTRIBUTES = {
		useDynamicData: true,
		isPagination: true,
	};

	const PAGINATION_TEMPLATE = [
		'generateblocks/button-container', {
			isPagination: true,
		},
		[
			[
				'generateblocks/button',
				Object.assign( {}, DEFAULT_BUTTON_ATTRIBUTES, generateBlocksStyling.button, {
					text: __( 'Previous', 'generateblocks' ),
					dynamicLinkType: 'pagination-prev',
					dynamicLinkRemoveIfEmpty: true,
				} ),
			],
			[
				'generateblocks/button',
				Object.assign( {}, DEFAULT_BUTTON_ATTRIBUTES, generateBlocksStyling.button, {
					text: __( '1 2 … 10', 'generateblocks' ),
					dynamicContentType: 'pagination-numbers',
				} ),
			],
			[
				'generateblocks/button',
				Object.assign( {}, DEFAULT_BUTTON_ATTRIBUTES, generateBlocksStyling.button, {
					text: __( 'Next', 'generateblocks' ),
					dynamicLinkType: 'pagination-next',
					dynamicLinkRemoveIfEmpty: true,
				} ),
			],
		],
	];

	return (
		<BlockControls>
			{ ( !! gridBlock || !! containerBlock ) &&
				<ToolbarGroup>
					{ !! gridBlock &&
						<ToolbarButton
							icon={ getIcon( 'grid' ) }
							label={ __( 'Open Grid', 'generateblocks' ) }
							onClick={ () => {
								selectBlock( gridBlock.clientId );
							} }
							showTooltip
						/>
					}

					{ !! containerBlock &&
						<ToolbarButton
							icon={ getIcon( 'container' ) }
							label={ __( 'Open Container', 'generateblocks' ) }
							onClick={ () => {
								selectBlock( containerBlock.clientId );
							} }
							showTooltip
						/>
					}
				</ToolbarGroup>
			}

			<ToolbarGroup>
				<ToolbarButton
					icon={ getIcon( 'add-pagination' ) }
					label={ __( 'Add Pagination', 'generateblocks' ) }
					onClick={ () => {
						insertBlocks( createBlocksFromInnerBlocksTemplate( [ PAGINATION_TEMPLATE ] ), undefined, clientId );
					} }
					showTooltip
				/>
			</ToolbarGroup>
		</BlockControls>
	);
};
