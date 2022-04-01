import { ToolbarButton, ToolbarGroup, Dropdown, ToggleControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { cloneBlock } from '@wordpress/blocks';
import { BlockControls, URLInput } from '@wordpress/block-editor';
import { useDispatch, useSelect } from '@wordpress/data';
import { link, plus } from '@wordpress/icons';
import { applyFilters } from '@wordpress/hooks';

export default ( { clientId, attributes, setAttributes } ) => {
	const { insertBlocks } = useDispatch( 'core/block-editor' );
	const {
		getBlockParentsByBlockName,
		getBlockRootClientId,
		getBlocksByClientId,
	} = useSelect( ( select ) => select( 'core/block-editor' ), [] );

	const {
		url,
		target,
		relNoFollow,
		relSponsored,
	} = attributes;

	const POPOVER_PROPS = {
		className: 'block-editor-block-settings-menu__popover',
		position: 'bottom right',
	};

	return (
		<>
			<BlockControls>
				<ToolbarGroup>
					<ToolbarButton
						className="gblocks-add-new-button"
						icon={ plus }
						label={ __( 'Add Button', 'generateblocks' ) }
						onClick={ () => {
							let parentBlockId = false;

							if ( typeof getBlockParentsByBlockName === 'function' ) {
								parentBlockId = getBlockParentsByBlockName( clientId, 'generateblocks/button-container', true )[ 0 ];
							} else {
								parentBlockId = getBlockRootClientId( clientId );
							}

							const thisBlock = getBlocksByClientId( clientId )[ 0 ];

							const clonedBlock = cloneBlock(
								thisBlock,
								{
									uniqueId: '',
								}
							);

							insertBlocks( clonedBlock, undefined, parentBlockId );
						} }
						showTooltip
					/>
				</ToolbarGroup>

				<ToolbarGroup>
					<Dropdown
						contentClassName="gblocks-button-link-dropdown"
						popoverProps={ POPOVER_PROPS }
						renderToggle={ ( { isOpen, onToggle } ) => (
							<ToolbarButton
								icon={ link }
								label={ ! url ? __( 'Add Link', 'generateblocks' ) : __( 'Change Link', 'generateblocks' ) }
								onClick={ onToggle }
								aria-expanded={ isOpen }
								isPressed={ !! url }
							/>
						) }
						renderContent={ () => (
							<>
								<URLInput
									className={ 'gblocks-button-link' }
									value={ url }
									onChange={ ( value ) => {
										setAttributes( {
											url: value,
										} );
									} }
								/>

								{ '' !== url &&
									<>
										{ applyFilters( 'generateblocks.editor.urlInputMoreOptions', '', attributes ) }

										<ToggleControl
											label={ __( 'Open link in a new tab', 'generateblocks' ) }
											checked={ target || '' }
											onChange={ ( value ) => {
												setAttributes( {
													target: value,
												} );
											} }
										/>

										<ToggleControl
											label={ __( 'Add rel="nofollow"', 'generateblocks' ) }
											checked={ relNoFollow || '' }
											onChange={ ( value ) => {
												setAttributes( {
													relNoFollow: value,
												} );
											} }
										/>

										<ToggleControl
											label={ __( 'Add rel="sponsored"', 'generateblocks' ) }
											checked={ relSponsored || '' }
											onChange={ ( value ) => {
												setAttributes( {
													relSponsored: value,
												} );
											} }
										/>
									</>
								}
							</>
						) }
					/>
				</ToolbarGroup>
			</BlockControls>
		</>
	);
};
