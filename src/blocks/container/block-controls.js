import getIcon from '../../utils/get-icon';
import useInnerBlocksCount from '../../hooks/useInnerBlocksCount';

/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { addFilter } from '@wordpress/hooks';
import { Fragment } from '@wordpress/element';
import { BlockControls, BlockAlignmentToolbar } from '@wordpress/block-editor';
import { ToolbarGroup, ToolbarButton } from '@wordpress/components';
import { createHigherOrderComponent } from '@wordpress/compose';
import { cloneBlock, getBlockSupport, createBlock } from '@wordpress/blocks';
import { useDispatch, useSelect } from '@wordpress/data';
import InsertInnerContainerOnboard from '../../components/onboard-popover/onboards/insert-inner-container-onboard';

const WIDE_ALIGNMENTS = [ 'wide', 'full' ];

/**
 * Add controls to the Container block toolbar.
 *
 * @param {Function} BlockEdit Block edit component.
 * @return {Function} BlockEdit Modified block edit component.
 */
const withBlockControls = createHigherOrderComponent(
	( BlockEdit ) => ( props ) => {
		if ( 'generateblocks/container' !== props.name ) {
			return <BlockEdit { ...props } />;
		}

		const { insertBlocks } = useDispatch( 'core/block-editor' );
		const {
			getBlockParentsByBlockName,
			getBlockRootClientId,
			getBlocksByClientId,
		} = useSelect( ( select ) => select( 'core/block-editor' ), [] );

		const {
			attributes,
			clientId,
			setAttributes,
		} = props;

		const {
			isGrid,
			isQueryLoopItem,
			align,
			variantRole,
			useInnerContainer,
		} = attributes;

		let parentGridId = false;

		if ( typeof getBlockParentsByBlockName === 'function' ) {
			parentGridId = getBlockParentsByBlockName( clientId, 'generateblocks/grid', true )[ 0 ];
		} else {
			parentGridId = getBlockRootClientId( clientId );
		}

		const hasParentBlock = getBlockRootClientId( clientId );
		const innerBlocksCount = useInnerBlocksCount( clientId );

		/**
		 * We don't define "align" support in block registration as we don't want it enabled for grid items.
		 * This allows us to enable support for regular non-grid item Containers.
		 */
		const hasAlignmentSupport = getBlockSupport( '', 'align', true ) && ! isGrid;

		return (
			<Fragment>
				{ ! hasParentBlock && 0 === innerBlocksCount && '' === variantRole && ! useInnerContainer &&
					<BlockControls>
						<ToolbarGroup>
							<ToolbarButton
								icon={ getIcon( 'section' ) }
								label={ __( 'Insert Inner Container', 'generateblocks' ) }
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
						</ToolbarGroup>
					</BlockControls>
				}

				{ ! isQueryLoopItem && isGrid && parentGridId &&
					<BlockControls>
						<ToolbarGroup>
							<ToolbarButton
								className="gblocks-block-control-icon gblocks-add-grid-item"
								icon={ getIcon( 'addContainer' ) }
								label={ __( 'Duplicate Grid Item', 'generateblocks' ) }
								onClick={ () => {
									const thisBlock = getBlocksByClientId( clientId )[ 0 ];

									const clonedBlock = cloneBlock(
										thisBlock,
										{
											uniqueId: '',
										}
									);

									insertBlocks( clonedBlock, undefined, parentGridId );
								} }
								showTooltip
							/>
						</ToolbarGroup>
					</BlockControls>
				}

				{ hasAlignmentSupport &&
					<BlockControls>
						<BlockAlignmentToolbar
							value={ align }
							onChange={ ( value ) => {
								setAttributes( {
									align: value,
								} );

								if ( 'full' === value ) {
									setAttributes( {
										outerContainer: 'full',
									} );
								}
							} }
							controls={ WIDE_ALIGNMENTS }
						/>
					</BlockControls>
				}

				<BlockEdit { ...props } />
			</Fragment>
		);
	},
	'withBlockControls'
);

addFilter(
	'editor.BlockEdit',
	'generateblocks/container-block-controls',
	withBlockControls
);
