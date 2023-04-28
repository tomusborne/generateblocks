import { ToolbarGroup, ToolbarButton } from '@wordpress/components';
import { addFilter } from '@wordpress/hooks';
import { __ } from '@wordpress/i18n';
import { useSelect, useDispatch } from '@wordpress/data';
import { createBlock } from '@wordpress/blocks';
import { createHigherOrderComponent } from '@wordpress/compose';
import { BlockControls } from '@wordpress/block-editor';
import getIcon from '../../../utils/get-icon';
import useInnerBlocksCount from '../../../hooks/useInnerBlocksCount';
import InsertInnerContainerOnboard from '../../../components/onboard-popover/onboards/insert-inner-container-onboard';
import { isEmpty } from 'lodash';

const withToolbarAppenders = createHigherOrderComponent( ( BlockEdit ) => {
	return ( props ) => {
		const {
			name,
			attributes,
		} = props;

		const {
			variantRole,
			useInnerContainer,
		} = attributes;

		const {
			getBlocksByClientId,
			getSelectedBlockClientIds,
			getBlockRootClientId,
		} = useSelect( ( select ) => select( 'core/block-editor' ), [] );

		const {
			replaceBlocks,
			insertBlocks,
		} = useDispatch( 'core/block-editor' );

		const clientIds = getSelectedBlockClientIds();
		const clientId = clientIds.length ? clientIds[ 0 ] : props.clientId;
		const innerBlocksCount = useInnerBlocksCount( clientId );
		const blocksSelection = getBlocksByClientId( clientIds );
		const hasParentBlock = getBlockRootClientId( clientId );

		const onConvertToContainer = ( layout = '' ) => {
			if ( ! blocksSelection.length ) {
				return;
			}

			const newChildBlocks = blocksSelection.map( ( block ) => {
				return createBlock(
					block.name,
					block.attributes,
					block.innerBlocks
				);
			} );

			const containerAttributes = {};

			if ( 'row' === layout ) {
				containerAttributes.display = 'flex';
				containerAttributes.flexDirection = 'row';
			}

			if ( 'stack' === layout ) {
				containerAttributes.display = 'flex';
				containerAttributes.flexDirection = 'column';
			}

			const newBlocks = createBlock(
				'generateblocks/container',
				containerAttributes,
				newChildBlocks
			);

			if ( ! isEmpty( newBlocks ) ) {
				replaceBlocks( clientIds, newBlocks );
			}
		};

		let buttons = '';

		if (
			'generateblocks/container' === name &&
			! hasParentBlock &&
			0 === innerBlocksCount &&
			'' === variantRole &&
			! useInnerContainer &&
			1 === clientIds.length
		) {
			buttons = <>
				{ buttons }
				<ToolbarButton
					icon={ getIcon( 'section' ) }
					label={ __( 'Add Inner Container', 'generateblocks' ) }
					onClick={ () => {
						insertBlocks(
							createBlock( 'generateblocks/container', {
								useGlobalMaxWidth: true,
								marginLeft: 'auto',
								marginRight: 'auto',
							} ),
							undefined,
							clientId
						);
					} }
					showTooltip
				/>
				<InsertInnerContainerOnboard />
			</>;
		}

		buttons = <>
			{ buttons }
			<ToolbarButton
				icon={ getIcon( 'add-to-container' ) }
				label={ __( 'Add to Container', 'generateblocks' ) }
				onClick={ () => onConvertToContainer( '' ) }
			/>
		</>;

		if ( blocksSelection.length > 1 ) {
			buttons = <>
				{ buttons }
				<ToolbarButton
					icon={ getIcon( 'add-to-row' ) }
					label={ __( 'Add to Row', 'generateblocks' ) }
					onClick={ () => onConvertToContainer( 'row' ) }
				/>
			</>;
		}

		if ( blocksSelection.length > 1 ) {
			buttons = <>
				{ buttons }
				<ToolbarButton
					icon={ getIcon( 'add-to-stack' ) }
					label={ __( 'Add to Stack', 'generateblocks' ) }
					onClick={ () => onConvertToContainer( 'stack' ) }
				/>
			</>;
		}

		return (
			<>
				{ !! buttons &&
					<BlockControls group="parent">
						<ToolbarGroup>
							{ buttons }
						</ToolbarGroup>
					</BlockControls>
				}

				<BlockEdit { ...props } />
			</>
		);
	};
}, 'withToolbarAppenders' );

addFilter(
	'editor.BlockEdit',
	'generateblocks/blockControls/toolbarAppenders',
	withToolbarAppenders
);
