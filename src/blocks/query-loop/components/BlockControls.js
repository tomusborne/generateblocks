import { BlockControls } from '@wordpress/block-editor';
import { ToolbarButton, ToolbarGroup } from '@wordpress/components';
import getIcon from '../../../utils/get-icon';
import { __ } from '@wordpress/i18n';
import { createBlocksFromInnerBlocksTemplate } from '@wordpress/blocks';
import { useDispatch } from '@wordpress/data';

export default ( { clientId } ) => {
	const { insertBlocks } = useDispatch( 'core/block-editor' );

	const DEFAULT_BUTTON_ATTRIBUTES = {
		isDynamicContent: true,
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
				} ),
			],
			[
				'generateblocks/button',
				Object.assign( {}, DEFAULT_BUTTON_ATTRIBUTES, generateBlocksStyling.button, {
					text: __( '1 2 … 10', 'generateblocks' ),
					contentType: 'pagination-numbers',
				} ),
			],
			[
				'generateblocks/button',
				Object.assign( {}, DEFAULT_BUTTON_ATTRIBUTES, generateBlocksStyling.button, {
					text: __( 'Next', 'generateblocks' ),
					dynamicLinkType: 'pagination-next',
				} ),
			],
		],
	];

	return (
		<BlockControls>
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
