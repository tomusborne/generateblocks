import getIcon from '../../utils/get-icon';

/**
 * WordPress Dependencies
 */
import {
	__,
} from '@wordpress/i18n';

import {
	addFilter,
} from '@wordpress/hooks';

import {
	Fragment,
} from '@wordpress/element';

import {
	BlockControls,
	BlockAlignmentToolbar,
} from '@wordpress/block-editor';

import {
	ToolbarGroup,
	ToolbarButton,
} from '@wordpress/components';

import {
	createHigherOrderComponent,
} from '@wordpress/compose';

import {
	cloneBlock,
} from '@wordpress/blocks';

const hasWideAlignSupport = generateBlocksInfo.hasWideAlignSupport;
const WIDE_ALIGNMENTS = [ 'wide', 'full' ];

/**
 * Add controls to the Container block toolbar.
 *
 * @param {Function} BlockEdit Block edit component.
 *
 * @return {Function} BlockEdit Modified block edit component.
 */
const withAdvancedControls = createHigherOrderComponent( ( BlockEdit ) => {
	return ( props ) => {
		const {
			name,
			attributes,
			isSelected,
			clientId,
			setAttributes,
		} = props;

		const {
			isGrid,
			align,
		} = attributes;

		let parentGridId = false;

		if ( typeof wp.data.select( 'core/block-editor' ).getBlockParentsByBlockName === 'function' ) {
			parentGridId = wp.data.select( 'core/block-editor' ).getBlockParentsByBlockName( clientId, 'generateblocks/grid', true )[ 0 ];
		} else {
			parentGridId = wp.data.select( 'core/block-editor' ).getBlockRootClientId( clientId );
		}

		return (
			<Fragment>
				{ isSelected && isGrid && parentGridId && 'generateblocks/container' === name &&
					<BlockControls>
						<ToolbarGroup>
							<ToolbarButton
								className="gblocks-block-control-icon gblocks-add-grid-item"
								icon={ getIcon( 'addContainer' ) }
								label={ __( 'Duplicate Grid Item', 'generateblocks' ) }
								onClick={ () => {
									const thisBlock = wp.data.select( 'core/block-editor' ).getBlocksByClientId( clientId )[ 0 ];
									const clonedBlock = cloneBlock( thisBlock );

									wp.data.dispatch( 'core/block-editor' ).insertBlocks( clonedBlock, undefined, parentGridId );
								} }
								showTooltip
							/>
						</ToolbarGroup>

						<ToolbarGroup>
							<ToolbarButton
								className="gblocks-block-control-icon"
								icon={ getIcon( 'grid' ) }
								label={ __( 'Select Parent Grid', 'generateblocks' ) }
								onClick={ () => {
									wp.data.dispatch( 'core/block-editor' ).selectBlock( parentGridId );
								} }
								showTooltip
							/>
						</ToolbarGroup>
					</BlockControls>
				}

				{ isSelected && hasWideAlignSupport && ! isGrid && 'generateblocks/container' === name &&
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
	};
}, 'withAdvancedControls' );

addFilter(
	'editor.BlockEdit',
	'generateblocks/container-block-controls',
	withAdvancedControls
);

