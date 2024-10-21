import { BlockControls } from '@wordpress/block-editor';
import { createBlocksFromInnerBlocksTemplate } from '@wordpress/blocks';
import { ToolbarGroup, ToolbarButton } from '@wordpress/components';
import { useDispatch } from '@wordpress/data';
import { __ } from '@wordpress/i18n';

import getIcon from '@utils/get-icon';
import { PAGINATION_TEMPLATE, NO_RESULTS_TEMPLATE } from '../templates';

const paginationIcon = getIcon( 'pagination' );
const noResultsIcon = getIcon( 'no-results' );

export function QueryToolbar( { clientId } ) {
	const { insertBlocks } = useDispatch( 'core/block-editor' );
	return (
		<BlockControls>
			<ToolbarGroup>
				<ToolbarButton
					icon={ paginationIcon }
					label={ __( 'Add Pagination', 'generateblocks' ) }
					onClick={ () => {
						insertBlocks( createBlocksFromInnerBlocksTemplate( [ PAGINATION_TEMPLATE ] ), undefined, clientId );
					} }
					showTooltip
				/>
				<ToolbarButton
					icon={ noResultsIcon }
					label={ __( 'Add No Results', 'generateblocks' ) }
					onClick={ () => {
						insertBlocks( createBlocksFromInnerBlocksTemplate( [ NO_RESULTS_TEMPLATE ] ), undefined, clientId );
					} }
					showTooltip
				/>
			</ToolbarGroup>
		</BlockControls>
	);
}
