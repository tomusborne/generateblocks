import { ToolbarGroup, ToolbarButton } from '@wordpress/components';
import { addFilter, applyFilters } from '@wordpress/hooks';
import { __ } from '@wordpress/i18n';
import { useSelect, useDispatch } from '@wordpress/data';
import { createBlock, cloneBlock } from '@wordpress/blocks';
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
			getBlockParents,
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
		const parentBlockId = getBlockParents( clientId, true );
		const parentBlocks = getBlocksByClientId( parentBlockId );
		const parentBlock = parentBlocks ? parentBlocks[ 0 ] : null;
		const showAppender = applyFilters( 'generateblocks.editor.showButtonAppender', true, props );
		let showContainerWrappers = true;

		if ( 'generateblocks/container' === parentBlock?.name && 'button-container' === parentBlock?.attributes.variantRole ) {
			showContainerWrappers = false;
		}

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

		const iconPostfix = () => {
			if ( 'generateblocks/button' === name ) {
				return '-button';
			}

			return '';
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

		if ( showContainerWrappers ) {
			if ( 'generateblocks/button' !== name ) {
				buttons = <>
					{ buttons }
					<ToolbarButton
						icon={ getIcon( 'add-to-container' + iconPostfix() ) }
						label={ __( 'Add to Container', 'generateblocks' ) }
						onClick={ () => onConvertToContainer( '' ) }
					/>
				</>;
			}

			if ( 'generateblocks/button' === name || blocksSelection.length > 1 ) {
				buttons = <>
					{ buttons }
					<ToolbarButton
						icon={ getIcon( 'add-to-row' + iconPostfix() ) }
						label={ __( 'Add to Row', 'generateblocks' ) }
						onClick={ () => onConvertToContainer( 'row' ) }
					/>
				</>;
			}

			if ( blocksSelection.length > 1 ) {
				buttons = <>
					{ buttons }
					<ToolbarButton
						icon={ getIcon( 'add-to-stack' + iconPostfix() ) }
						label={ __( 'Add to Stack', 'generateblocks' ) }
						onClick={ () => onConvertToContainer( 'stack' ) }
					/>
				</>;
			}
		}

		if ( 'generateblocks/button' === name && showAppender && parentBlock && 'button-container' === parentBlock?.attributes.variantRole ) {
			buttons = <>
				{ buttons }
				<ToolbarButton
					className="gblocks-add-new-button"
					icon={ getIcon( 'add-button' ) }
					label={ __( 'Add Button', 'generateblocks' ) }
					onClick={ () => {
						const thisBlock = getBlocksByClientId( clientId )[ 0 ];

						const clonedBlock = cloneBlock(
							thisBlock,
							{
								uniqueId: '',
							}
						);

						insertBlocks( clonedBlock, undefined, parentBlockId[ 0 ] );
					} }
					showTooltip
				/>
			</>;
		}

		if ( 'button-container' === variantRole && showAppender ) {
			buttons = <>
				{ buttons }
				<ToolbarButton
					className="gblocks-add-new-button"
					icon={ getIcon( 'add-button' ) }
					label={ __( 'Add Button', 'generateblocks' ) }
					onClick={ () => {
						const thisBlock = getBlocksByClientId( clientId )[ 0 ];

						if ( thisBlock ) {
							const childBlocks = thisBlock.innerBlocks;
							const keys = Object.keys( childBlocks );
							const lastKey = keys[ keys.length - 1 ];

							if ( typeof childBlocks[ lastKey ] !== 'undefined' ) {
								const blockToCopyId = childBlocks[ lastKey ].clientId;

								if ( blockToCopyId ) {
									const blockToCopy = getBlocksByClientId( blockToCopyId )[ 0 ];

									const clonedBlock = cloneBlock(
										blockToCopy,
										{
											uniqueId: '',
										}
									);

									insertBlocks( clonedBlock, undefined, clientId );
								}
							} else if ( 0 === childBlocks.length ) {
								insertBlocks( createBlock( 'generateblocks/button', generateBlocksStyling.button ), undefined, clientId );
							}
						}
					} }
					showTooltip
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
