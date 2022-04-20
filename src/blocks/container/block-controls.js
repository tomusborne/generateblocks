import getIcon from '../../utils/get-icon';

/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { addFilter } from '@wordpress/hooks';
import { Fragment } from '@wordpress/element';
import { BlockControls, BlockAlignmentToolbar } from '@wordpress/block-editor';
import { ToolbarGroup, ToolbarButton } from '@wordpress/components';
import { createHigherOrderComponent } from '@wordpress/compose';
import { cloneBlock, getBlockSupport } from '@wordpress/blocks';
import { useDispatch, useSelect } from '@wordpress/data';

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
		} = attributes;

		let parentGridId = false;

		if ( typeof getBlockParentsByBlockName === 'function' ) {
			parentGridId = getBlockParentsByBlockName( clientId, 'generateblocks/grid', true )[ 0 ];
		} else {
			parentGridId = getBlockRootClientId( clientId );
		}

		/**
		 * We don't define "align" support in block registration as we don't want it enabled for grid items.
		 * This allows us to enable support for regular non-grid item Containers.
		 */
		const hasAlignmentSupport = getBlockSupport( '', 'align', true ) && ! isGrid;

		return (
			<Fragment>
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
