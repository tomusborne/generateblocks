import { ToolbarButton } from '@wordpress/components';
import { addFilter, applyFilters } from '@wordpress/hooks';
import { __ } from '@wordpress/i18n';
import { useSelect, useDispatch } from '@wordpress/data';
import { createBlock } from '@wordpress/blocks';
import { createHigherOrderComponent } from '@wordpress/compose';
import { BlockControls } from '@wordpress/block-editor';

import { isEmpty } from 'lodash';

import useInnerBlocksCount from '@hooks/useInnerBlocksCount';

function AddInnerContainerIcon() {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" aria-hidden="true" focusable="false">
			<path d="M22.006,22.006L20.665,22.006L20.665,17.629L22.006,17.629L22.006,22.006ZM22.006,14.814L20.665,14.814L20.665,9.185L22.006,9.185L22.006,14.814ZM22.006,6.372L20.672,6.372L20.672,3.328L17.628,3.328L17.628,1.994L21.38,1.994C21.725,1.994 22.006,2.274 22.006,2.619L22.006,6.372ZM6.371,1.994L6.371,3.331L1.994,3.331L1.994,1.994L6.371,1.994ZM14.814,3.331L9.186,3.331L9.186,1.994L14.814,1.994L14.814,3.331Z" style={ { fillOpacity: 0.5 } } />
			<path d="M14,6.5L16.5,6.5L16.5,4L17.5,4L17.5,6.5L20,6.5L20,7.5L17.5,7.5L17.5,10L16.5,10L16.5,7.5L14,7.5L14,6.5Z" />
			<path d="M1.993,9L7.701,9L7.701,10.268L1.993,10.268L1.993,9ZM14.993,13.439L13.725,13.439L13.725,10.268L10.554,10.268L10.554,9L14.359,9C14.709,9 14.993,9.284 14.993,9.634L14.993,13.439ZM13.725,16.292L14.993,16.292L14.993,22L13.725,22L13.725,16.292Z" style={ { fillRule: 'nonzero' } } />
		</svg>
	);
}

function AddOuterContainerIcon() {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" aria-hidden="true" focusable="false">
			<path d="M21.375,22L17.625,22L17.625,20.75L20.75,20.75L20.75,17.625L22,17.625L22,21.375C22,21.72 21.72,22 21.375,22ZM9.188,20.75L14.813,20.75L14.813,22L9.188,22L9.188,20.75ZM6.375,22L2.625,22C2.282,22 2,21.718 2,21.375L2,17.625L3.25,17.625L3.25,20.75L6.375,20.75L6.375,22ZM2,9.187L3.25,9.187L3.25,14.812L2,14.812L2,9.187ZM3.25,6.375L2,6.375L2,2.625C2,2.28 2.28,2 2.625,2L6.375,2L6.375,3.25L3.25,3.25L3.25,6.375ZM9.188,2L14.813,2L14.813,3.25L9.188,3.25L9.188,2ZM22,6.375L20.75,6.375L20.75,3.25L17.625,3.25L17.625,2L21.375,2C21.72,2 22,2.28 22,2.625L22,6.375ZM20.75,9.187L22,9.187L22,14.812L20.75,14.812L20.75,9.187Z" style={ { fillRule: 'nonzero' } } />
			<path d="M14,6.5L16.5,6.5L16.5,4L17.5,4L17.5,6.5L20,6.5L20,7.5L17.5,7.5L17.5,10L16.5,10L16.5,7.5L14,7.5L14,6.5Z" />
		</svg>
	);
}

const withToolbarAppenders = createHigherOrderComponent( ( BlockEdit ) => {
	return ( props ) => {
		const {
			name,
		} = props;

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
		const useV1Blocks = generateBlocksEditor.useV1Blocks;

		if ( useV1Blocks ) {
			return <BlockEdit { ...props } />;
		}

		const onConvertToContainer = () => {
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

			const newBlocks = createBlock(
				'generateblocks/element',
				{},
				newChildBlocks
			);

			if ( ! isEmpty( newBlocks ) ) {
				replaceBlocks( clientIds, newBlocks );
			}
		};

		let buttons = '';

		if (
			'generateblocks/element' === name &&
			! hasParentBlock &&
			0 === innerBlocksCount &&
			1 === clientIds.length
		) {
			buttons = <>
				{ buttons }
				<ToolbarButton
					icon={ AddInnerContainerIcon }
					label={ __( 'Add Inner Container', 'generateblocks' ) }
					onClick={ () => {
						insertBlocks(
							createBlock( 'generateblocks/element', {
								styles: {
									maxWidth: 'var(--gb-container-width)',
									marginLeft: 'auto',
									marginRight: 'auto',
								},
							} ),
							undefined,
							clientId
						);
					} }
					showTooltip
				/>
			</>;
		}

		buttons = <>
			{ buttons }
			<ToolbarButton
				icon={ AddOuterContainerIcon }
				label={ __( 'Add to Container', 'generateblocks' ) }
				onClick={ () => onConvertToContainer( '' ) }
			/>
		</>;

		buttons = applyFilters(
			'generateblocks.editor.toolbarAppenders',
			buttons,
			props
		);

		return (
			<>
				{ !! buttons &&
					<BlockControls group="parent">
						{ buttons }
					</BlockControls>
				}

				<BlockEdit { ...props } />
			</>
		);
	};
}, 'withToolbarAppenders' );

addFilter(
	'editor.BlockEdit',
	'generateblocks/blockControls/containerAppenders',
	withToolbarAppenders
);
