import getIcon from '../../utils/get-icon';

/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { addFilter } from '@wordpress/hooks';
import { Fragment } from '@wordpress/element';
import { BlockControls } from '@wordpress/block-editor';
import { ToolbarGroup, ToolbarButton } from '@wordpress/components';
import { createHigherOrderComponent } from '@wordpress/compose';
import { cloneBlock } from '@wordpress/blocks';
import { useDispatch, useSelect } from '@wordpress/data';

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
		} = props;

		const {
			isGrid,
			isQueryLoopItem,
		} = attributes;

		let parentGridId = false;

		if ( typeof getBlockParentsByBlockName === 'function' ) {
			parentGridId = getBlockParentsByBlockName( clientId, 'generateblocks/grid', true )[ 0 ];
		} else {
			parentGridId = getBlockRootClientId( clientId );
		}

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
