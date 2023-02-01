import { createHigherOrderComponent } from '@wordpress/compose';
import { Fragment } from '@wordpress/element';
import { InspectorControls, BlockControls } from '@wordpress/block-editor';
import { addFilter, applyFilters } from '@wordpress/hooks';
import { __ } from '@wordpress/i18n';
import { ToolbarGroup, ToolbarButton } from '@wordpress/components';
import { useDispatch, useSelect } from '@wordpress/data';
import { cloneBlock, createBlock } from '@wordpress/blocks';
import { plus } from '@wordpress/icons';

const withButtonContainer = createHigherOrderComponent( ( BlockEdit ) => {
	return ( props ) => {
		const {
			name,
			attributes,
			clientId,
		} = props;

		if ( 'generateblocks/container' !== name ) {
			return <BlockEdit { ...props } />;
		}

		const {
			variantRole,
		} = attributes;

		const { insertBlocks } = useDispatch( 'core/block-editor' );
		const { getBlocksByClientId } = useSelect( ( select ) => select( 'core/block-editor' ), [] );
		const showAppender = applyFilters( 'generateblocks.editor.showButtonAppender', true, props );

		return (
			<Fragment>
				<InspectorControls>
					{ 'button-container' === variantRole &&
						<BlockControls>
							<ToolbarGroup>
								{ !! showAppender &&
									<ToolbarButton
										className="gblocks-add-new-button"
										icon={ plus }
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
								}
							</ToolbarGroup>
						</BlockControls>
					}
				</InspectorControls>

				<BlockEdit { ...props } />
			</Fragment>
		);
	};
}, 'withButtonContainer' );

addFilter(
	'editor.BlockEdit',
	'generateblocks/button-container/InspectorControls',
	withButtonContainer,
);
