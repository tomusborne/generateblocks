import { BlockControls } from '@wordpress/block-editor';
import { ToolbarButton, ToolbarGroup } from '@wordpress/components';
import getIcon from '../../../utils/get-icon';
import { __ } from '@wordpress/i18n';
import { createBlocksFromInnerBlocksTemplate } from '@wordpress/blocks';
import { useDispatch } from '@wordpress/data';

export default ( { clientId } ) => {
	const { insertBlocks } = useDispatch( 'core/block-editor' );

	const DEFAULT_BUTTON_ATTRIBUTES = {
		useDynamicData: true,
		isPagination: true,
		paginationOptions: {
			endSize: 1,
			midSize: 2,
			forceReload: false,
		},
	};

	const PAGINATION_TEMPLATE = [
		'generateblocks/container', {
			marginTop: '20',
			variantRole: 'button-container',
			display: 'flex',
			isPagination: true,
			tagName: 'nav',
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

	const NO_RESULTS_TEMPLATE = [
		'generateblocks/container', {
			variantRole: 'no-results',
		},
		[
			[
				'generateblocks/headline',
				{
					placeholder: __( 'Content added here will show when the loop has no results to display.', 'generateblocks' ),
					element: 'p',
				},
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
				<ToolbarButton
					icon={ getIcon( 'addContainer' ) }
					label={ __( 'Add No Results Found Message', 'generateblocks' ) }
					onClick={ () => {
						insertBlocks( createBlocksFromInnerBlocksTemplate( [ NO_RESULTS_TEMPLATE ] ), undefined, clientId );
					} }
					showTooltip
				/>
			</ToolbarGroup>
		</BlockControls>
	);
};
