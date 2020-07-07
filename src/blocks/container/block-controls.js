import getIcon from '../../utils/get-icon';

/**
 * WordPress Dependencies
 */
const {
	__,
} = wp.i18n;

const {
	addFilter,
} = wp.hooks;

const {
	Fragment,
} = wp.element;

const {
	BlockControls,
	BlockAlignmentToolbar,
} = wp.blockEditor;

const {
	Toolbar,
	Tooltip,
	Button,
} = wp.components;

const {
	createHigherOrderComponent,
} = wp.compose;

const {
	cloneBlock,
} = wp.blocks;

const hasWideAlignSupport = generateBlocksInfo.hasWideAlignSupport;
const WIDE_ALIGNMENTS = [ 'wide', 'full' ];

/**
 * Add controls to the Container block toolbar.
 *
 * @param {function} BlockEdit Block edit component.
 *
 * @return {function} BlockEdit Modified block edit component.
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
						<Toolbar>
							<Tooltip text={ __( 'Duplicate Grid Item', 'generateblocks' ) }>
								<Button
									className="gblocks-block-control-icon gblocks-add-grid-item"
									icon={ getIcon( 'addContainer' ) }
									onClick={ () => {
										const thisBlock = wp.data.select( 'core/block-editor' ).getBlocksByClientId( clientId )[ 0 ];
										const clonedBlock = cloneBlock( thisBlock );

										wp.data.dispatch( 'core/block-editor' ).insertBlocks( clonedBlock, undefined, parentGridId );
									} }
								/>
							</Tooltip>
						</Toolbar>

						<Toolbar>
							<Tooltip text={ __( 'Select Parent Grid', 'generateblocks' ) }>
								<Button
									className="gblocks-block-control-icon"
									icon={ getIcon( 'grid' ) }
									onClick={ () => {
										wp.data.dispatch( 'core/block-editor' ).selectBlock( parentGridId );
									} }
								/>
							</Tooltip>
						</Toolbar>
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

