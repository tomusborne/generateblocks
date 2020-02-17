import getIcon from '../../utils/get-icon'

/**
 * WordPress Dependencies
 */
const {
	__
} = wp.i18n;

const {
	addFilter
} = wp.hooks;

const {
	Fragment
} = wp.element;

const {
	BlockControls,
} = wp.blockEditor;

const {
	Toolbar,
	Tooltip,
	Button,
} = wp.components;

const {
	createHigherOrderComponent
} = wp.compose;

const {
	cloneBlock,
} = wp.blocks;

/**
 * Add mobile visibility controls on Advanced Block Panel.
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
		} = props;

		const {
			isGrid,
		} = attributes;

		return (
			<Fragment>
				{ isGrid && isSelected && 'generateblocks/container' === name &&
					<BlockControls>
						<Toolbar>
							<Tooltip text={ __( 'Duplicate Grid Item', 'generateblocks' ) }>
								<Button
									className="gblocks-block-control-icon gblocks-add-grid-item"
									icon={ getIcon( 'addContainer' ) }
									onClick={ () => {
										const parentGridId = wp.data.select( 'core/block-editor' ).getBlockParentsByBlockName( clientId, 'generateblocks/grid', true )[ 0 ];
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
										const parentGridId = wp.data.select( 'core/block-editor' ).getBlockParentsByBlockName( clientId, 'generateblocks/grid', true )[ 0 ];

										wp.data.dispatch( 'core/block-editor' ).selectBlock( parentGridId );
									} }
								/>
							</Tooltip>
						</Toolbar>
					</BlockControls>
				}

				<BlockEdit {...props} />
			</Fragment>
		);
	};
}, 'withAdvancedControls');

addFilter(
	'editor.BlockEdit',
	'generateblocks/container-block-controls',
	withAdvancedControls
);
