import { ToolbarButton, ToolbarGroup, Dropdown, ToggleControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { cloneBlock, createBlock } from '@wordpress/blocks';
import { BlockControls, URLInput, AlignmentToolbar } from '@wordpress/block-editor';
import { useDispatch, useSelect } from '@wordpress/data';
import { link, plus } from '@wordpress/icons';
import { applyFilters } from '@wordpress/hooks';
import getIcon from '../../../utils/get-icon';
import isFlexItem from '../../../utils/is-flex-item';
import getAttribute from '../../../utils/get-attribute';
import typographyOptions from '../../../extend/inspector-control/controls/typography/options';
import getDeviceType from '../../../utils/get-device-type';

export default ( props ) => {
	const {
		attributes,
		clientId,
		setAttributes,
	} = props;

	const { insertBlocks, replaceBlocks } = useDispatch( 'core/block-editor' );
	const {
		getBlockParentsByBlockName,
		getBlocksByClientId,
		getBlockAttributes,
		getSelectedBlockClientIds,
		getBlock,
	} = useSelect( ( select ) => select( 'core/block-editor' ), [] );

	const {
		url,
		target,
		relNoFollow,
		relSponsored,
		useDynamicData,
		dynamicLinkType,
		display,
		displayTablet,
		displayMobile,
		buttonType,
	} = attributes;

	const POPOVER_PROPS = {
		className: 'block-editor-block-settings-menu__popover',
		position: 'bottom right',
	};

	const deviceType = getDeviceType();
	const hasDynamicLink = useDynamicData && dynamicLinkType;
	const showAppender = applyFilters( 'generateblocks.editor.showButtonAppender', true, props );
	const showButtonContainer = applyFilters( 'generateblocks.editor.showButtonContainerControl', true, props );
	const showButtonLinkControl = applyFilters( 'generateblocks.editor.showButtonLinkControl', 'link' === buttonType, props );
	let containerId = false;
	const buttonContainerId = getBlockParentsByBlockName( clientId, 'generateblocks/button-container', true )[ 0 ];
	const containerVariantId = getBlockParentsByBlockName( clientId, 'generateblocks/container', true )[ 0 ];

	if ( buttonContainerId ) {
		containerId = buttonContainerId;
	} else if ( containerVariantId ) {
		const containerAttributes = getBlockAttributes( containerVariantId );

		if ( 'button-container' === containerAttributes.variantRole ) {
			containerId = containerVariantId;
		}
	}

	return (
		<>
			<BlockControls>
				{ !! showButtonContainer && ! containerId &&
					<ToolbarGroup>
						<ToolbarButton
							icon={ getIcon( 'button-container' ) }
							label={ __( 'Add to Button Container', 'generateblocks' ) }
							onClick={ () => {
								const selectedBlockIds = getSelectedBlockClientIds();

								const selectedBlocks = selectedBlockIds.map( ( blockId ) => {
									const block = getBlock( blockId );

									return createBlock(
										block.name,
										block.attributes,
										block.innerBlocks
									);
								} );

								const groupedBlocks = createBlock(
									'generateblocks/container',
									{
										display: 'flex',
										variantRole: 'button-container',
									},
									selectedBlocks
								);

								replaceBlocks( selectedBlockIds, groupedBlocks );
							} }
							showTooltip
						/>
					</ToolbarGroup>
				}

				<ToolbarGroup>
					{ showAppender && containerId &&
						<ToolbarButton
							className="gblocks-add-new-button"
							icon={ plus }
							label={ __( 'Add Button', 'generateblocks' ) }
							onClick={ () => {
								const thisBlock = getBlocksByClientId( clientId )[ 0 ];

								const clonedBlock = cloneBlock(
									thisBlock,
									{
										uniqueId: '',
									}
								);

								insertBlocks( clonedBlock, undefined, containerId );
							} }
							showTooltip
						/>
					}
				</ToolbarGroup>

				{ ! isFlexItem( { device: deviceType, display, displayTablet, displayMobile } ) &&
					<AlignmentToolbar
						value={ getAttribute( 'alignment', { attributes, deviceType } ) }
						onChange={ ( value ) => {
							setAttributes( {
								[ getAttribute( 'alignment', { attributes, deviceType }, true ) ]: value,
							} );
						} }
						alignmentControls={ typographyOptions.alignments }
					/>
				}

				<ToolbarGroup>
					{ ( ! useDynamicData || hasDynamicLink ) && showButtonLinkControl &&
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
									{ ! useDynamicData &&
										<URLInput
											className={ 'gblocks-button-link' }
											value={ url }
											onChange={ ( value ) => {
												setAttributes( {
													url: value,
													hasUrl: !! value,
												} );
											} }
										/>
									}

									{ !! useDynamicData &&
										<div style={ {
											width: '300px',
											'font-style': 'italic',
											'margin-bottom': ( !! dynamicLinkType ? '15px' : '0' ),
										} }>
											{ __( 'This button is using a dynamic link.', 'generateblocks' ) }
										</div>
									}

									{ applyFilters( 'generateblocks.editor.urlInputMoreOptions', '', attributes ) }

									{ ( !! url || hasDynamicLink ) &&
										<>
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
					}
				</ToolbarGroup>
			</BlockControls>
		</>
	);
};
