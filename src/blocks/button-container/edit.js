/**
 * Block: Button Container
 */

import classnames from 'classnames';
import DimensionsControl from '../../components/dimensions/';
import ResponsiveTabs from '../../components/responsive-tabs';
import getIcon from '../../utils/get-icon';
import MainCSS from './css/main.js';
import DesktopCSS from './css/desktop.js';
import TabletCSS from './css/tablet.js';
import TabletOnlyCSS from './css/tablet-only.js';
import MobileCSS from './css/mobile.js';
import PanelArea from '../../components/panel-area/';
import getAllUniqueIds from '../../utils/get-all-unique-ids';

import {
	__,
} from '@wordpress/i18n';

import {
	Tooltip,
	Button,
	ToggleControl,
	ToolbarGroup,
	ToolbarButton,
	TextControl,
} from '@wordpress/components';

import {
	Fragment,
	Component,
} from '@wordpress/element';

import {
	InspectorControls,
	InnerBlocks,
	AlignmentToolbar,
	BlockControls,
	InspectorAdvancedControls,
} from '@wordpress/block-editor';

import {
	createBlock,
	cloneBlock,
} from '@wordpress/blocks';

import {
	applyFilters,
} from '@wordpress/hooks';

import {
	withSelect,
	withDispatch,
} from '@wordpress/data';

import {
	compose,
} from '@wordpress/compose';

/**
 * Regular expression matching invalid anchor characters for replacement.
 *
 * @type {RegExp}
 */
const ANCHOR_REGEX = /[\s#]/g;

const ALIGNMENT_CONTROLS = [
	{
		icon: 'editor-alignleft',
		title: __( 'Align Buttons Left', 'generateblocks' ),
		align: 'left',
	},
	{
		icon: 'editor-aligncenter',
		title: __( 'Align Buttons Center', 'generateblocks' ),
		align: 'center',
	},
	{
		icon: 'editor-alignright',
		title: __( 'Align Buttons Right', 'generateblocks' ),
		align: 'right',
	},
];

class GenerateButtonContainer extends Component {
	constructor() {
		super( ...arguments );

		this.state = {
			selectedDevice: 'Desktop',
		};

		this.getDeviceType = this.getDeviceType.bind( this );
		this.setDeviceType = this.setDeviceType.bind( this );
	}

	componentDidMount() {
		// Generate a unique ID if none exists or if the same ID exists on this page.
		const allBlocks = wp.data.select( 'core/block-editor' ).getBlocks();
		const uniqueIds = getAllUniqueIds( allBlocks, [], this.props.clientId );

		if ( ! this.props.attributes.uniqueId || uniqueIds.includes( this.props.attributes.uniqueId ) ) {
			this.props.setAttributes( {
				uniqueId: this.props.clientId.substr( 2, 9 ).replace( '-', '' ),
			} );
		}

		const thisBlock = wp.data.select( 'core/block-editor' ).getBlocksByClientId( this.props.clientId )[ 0 ];

		if ( thisBlock ) {
			const childBlocks = thisBlock.innerBlocks;

			if ( 0 === childBlocks.length ) {
				wp.data.dispatch( 'core/block-editor' ).insertBlocks( createBlock( 'generateblocks/button', generateBlocksStyling.button ), undefined, this.props.clientId );
			}
		}

		// This block used to be static. Set it to dynamic by default from now on.
		if ( 'undefined' === typeof this.props.attributes.isDynamic || ! this.props.attributes.isDynamic ) {
			this.props.setAttributes( {
				isDynamic: true,
			} );
		}

		// Set our responsive stack and fill options if set on desktop.
		// @since 1.4.0.
		if ( 'undefined' === typeof this.props.attributes.blockVersion || this.props.attributes.blockVersion < 2 ) {
			if ( this.props.attributes.stack || this.props.attributes.fillHorizontalSpace ) {
				if ( this.props.attributes.stack ) {
					this.props.setAttributes( {
						stackTablet: true,
						stackMobile: true,
					} );
				}

				if ( this.props.attributes.fillHorizontalSpace ) {
					this.props.setAttributes( {
						fillHorizontalSpaceTablet: true,
						fillHorizontalSpaceMobile: true,
					} );
				}
			}
		}

		// Update block version flag if it's out of date.
		const blockVersion = 2;

		if ( 'undefined' === typeof this.props.attributes.blockVersion || this.props.attributes.blockVersion < blockVersion ) {
			this.props.setAttributes( {
				blockVersion,
			} );
		}
	}

	getDeviceType() {
		let deviceType = this.props.deviceType ? this.props.deviceType : this.state.selectedDevice;

		if ( ! generateBlocksInfo.syncResponsivePreviews ) {
			deviceType = this.state.selectedDevice;
		}

		return deviceType;
	}

	setDeviceType( deviceType ) {
		if ( generateBlocksInfo.syncResponsivePreviews && this.props.deviceType ) {
			this.props.setDeviceType( deviceType );
			this.setState( { selectedDevice: deviceType } );
		} else {
			this.setState( { selectedDevice: deviceType } );
		}
	}

	render() {
		const {
			attributes,
			setAttributes,
			clientId,
		} = this.props;

		const {
			uniqueId,
			className,
			anchor,
			alignment,
			alignmentTablet,
			alignmentMobile,
			stack,
			stackTablet,
			stackMobile,
			fillHorizontalSpace,
			fillHorizontalSpaceTablet,
			fillHorizontalSpaceMobile,
		} = attributes;

		let htmlAttributes = {
			className: classnames( {
				'gb-button-wrapper': true,
				[ `gb-button-wrapper-${ uniqueId }` ]: true,
				[ `${ className }` ]: undefined !== className,
			} ),
			id: anchor ? anchor : null,
		};

		htmlAttributes = applyFilters( 'generateblocks.frontend.htmlAttributes', htmlAttributes, 'generateblocks/button-container', attributes );

		return (
			<Fragment>
				<BlockControls>
					<ToolbarGroup>
						<ToolbarButton
							className="gblocks-add-new-button"
							icon={ getIcon( 'insert' ) }
							label={ __( 'Add Button', 'generateblocks' ) }
							onClick={ () => {
								const thisBlock = wp.data.select( 'core/block-editor' ).getBlocksByClientId( clientId )[ 0 ];

								if ( thisBlock ) {
									const childBlocks = thisBlock.innerBlocks;
									const keys = Object.keys( childBlocks );
									const lastKey = keys[ keys.length - 1 ];

									if ( typeof childBlocks[ lastKey ] !== 'undefined' ) {
										const blockToCopyId = childBlocks[ lastKey ].clientId;

										if ( blockToCopyId ) {
											const blockToCopy = wp.data.select( 'core/block-editor' ).getBlocksByClientId( blockToCopyId )[ 0 ];

											const clonedBlock = cloneBlock(
												blockToCopy,
												{
													uniqueId: '',
												}
											);

											wp.data.dispatch( 'core/block-editor' ).insertBlocks( clonedBlock, undefined, clientId );
										}
									} else if ( 0 === childBlocks.length ) {
										wp.data.dispatch( 'core/block-editor' ).insertBlocks( createBlock( 'generateblocks/button', generateBlocksStyling.button ), undefined, clientId );
									}
								}
							} }
							showTooltip
						/>
					</ToolbarGroup>

					{ 'Desktop' === this.getDeviceType() && (
						<AlignmentToolbar
							value={ alignment }
							alignmentControls={ ALIGNMENT_CONTROLS }
							onChange={ ( nextAlign ) => {
								setAttributes( { alignment: nextAlign } );
							} }
						/>
					) }

					{ 'Tablet' === this.getDeviceType() && (
						<AlignmentToolbar
							value={ alignmentTablet }
							alignmentControls={ ALIGNMENT_CONTROLS }
							onChange={ ( value ) => {
								setAttributes( { alignmentTablet: value } );
							} }
						/>
					) }

					{ 'Mobile' === this.getDeviceType() && (
						<AlignmentToolbar
							value={ alignmentMobile }
							alignmentControls={ ALIGNMENT_CONTROLS }
							onChange={ ( value ) => {
								setAttributes( { alignmentMobile: value } );
							} }
						/>
					) }
				</BlockControls>

				<InspectorControls>
					<ResponsiveTabs { ...this.props }
						selectedDevice={ this.getDeviceType() }
						onClick={ ( device ) => {
							this.setDeviceType( device );
						} }
					/>

					<PanelArea { ...this.props }
						title={ __( 'Spacing', 'generateblocks' ) }
						initialOpen={ true }
						icon={ getIcon( 'spacing' ) }
						className={ 'gblocks-panel-label' }
						id={ 'buttonContainerSpacing' }
						state={ this.state }
					>
						{ 'Desktop' === this.getDeviceType() && (
							<Fragment>
								<DimensionsControl { ...this.props }
									device={ this.getDeviceType() }
									type={ 'margin' }
									label={ __( 'Margin', 'generateblocks' ) }
									attrTop={ 'marginTop' }
									attrRight={ 'marginRight' }
									attrBottom={ 'marginBottom' }
									attrLeft={ 'marginLeft' }
									attrUnit={ 'marginUnit' }
									attrSyncUnits={ 'marginSyncUnits' }
									defaults={ generateBlocksDefaults.buttonContainer }
									units={ [ 'px', 'em', '%' ] }
								/>

								<ToggleControl
									label={ __( 'Stack Vertically', 'generateblocks' ) }
									checked={ !! stack }
									onChange={ ( value ) => {
										setAttributes( {
											stack: value,
											stackTablet: !! value && ! stackTablet ? value : stackTablet,
											stackMobile: !! value && ! stackMobile ? value : stackMobile,
										} );
									} }
								/>

								<ToggleControl
									label={ __( 'Fill Horizontal Space', 'generateblocks' ) }
									checked={ !! fillHorizontalSpace }
									onChange={ ( value ) => {
										setAttributes( {
											fillHorizontalSpace: value,
											fillHorizontalSpaceTablet: !! value && ! fillHorizontalSpaceTablet ? value : fillHorizontalSpaceTablet,
											fillHorizontalSpaceMobile: !! value && ! fillHorizontalSpaceMobile ? value : fillHorizontalSpaceMobile,
										} );
									} }
								/>
							</Fragment>
						) }

						{ 'Tablet' === this.getDeviceType() && (
							<Fragment>
								<DimensionsControl { ...this.props }
									device={ this.getDeviceType() }
									type={ 'margin' }
									label={ __( 'Margin', 'generateblocks' ) }
									attrTop={ 'marginTopTablet' }
									attrRight={ 'marginRightTablet' }
									attrBottom={ 'marginBottomTablet' }
									attrLeft={ 'marginLeftTablet' }
									attrUnit={ 'marginUnit' }
									attrSyncUnits={ 'marginSyncUnits' }
									defaults={ generateBlocksDefaults.buttonContainer }
									units={ [ 'px', 'em', '%' ] }
								/>

								<ToggleControl
									label={ __( 'Stack Vertically', 'generateblocks' ) }
									checked={ !! stackTablet }
									onChange={ ( value ) => {
										setAttributes( {
											stackTablet: value,
											stackMobile: !! value && ! stackMobile ? value : stackMobile,
										} );
									} }
								/>

								<ToggleControl
									label={ __( 'Fill Horizontal Space', 'generateblocks' ) }
									checked={ !! fillHorizontalSpaceTablet }
									onChange={ ( value ) => {
										setAttributes( {
											fillHorizontalSpaceTablet: value,
											fillHorizontalSpaceMobile: !! value && ! fillHorizontalSpaceMobile ? value : fillHorizontalSpaceMobile,
										} );
									} }
								/>
							</Fragment>
						) }

						{ 'Mobile' === this.getDeviceType() && (
							<Fragment>
								<DimensionsControl { ...this.props }
									device={ this.getDeviceType() }
									type={ 'margin' }
									label={ __( 'Margin', 'generateblocks' ) }
									attrTop={ 'marginTopMobile' }
									attrRight={ 'marginRightMobile' }
									attrBottom={ 'marginBottomMobile' }
									attrLeft={ 'marginLeftMobile' }
									attrUnit={ 'marginUnit' }
									attrSyncUnits={ 'marginSyncUnits' }
									defaults={ generateBlocksDefaults.buttonContainer }
									units={ [ 'px', 'em', '%' ] }
								/>

								<ToggleControl
									label={ __( 'Stack Vertically', 'generateblocks' ) }
									checked={ !! stackMobile }
									onChange={ ( value ) => {
										setAttributes( {
											stackMobile: value,
										} );
									} }
								/>

								<ToggleControl
									label={ __( 'Fill Horizontal Space', 'generateblocks' ) }
									checked={ !! fillHorizontalSpaceMobile }
									onChange={ ( value ) => {
										setAttributes( {
											fillHorizontalSpaceMobile: value,
										} );
									} }
								/>
							</Fragment>
						) }

						{ applyFilters( 'generateblocks.editor.controls', '', 'buttonContainerSpacing', this.props, this.state ) }
					</PanelArea>

					<PanelArea { ...this.props }
						title={ __( 'Documentation', 'generateblocks' ) }
						icon={ getIcon( 'documentation' ) }
						initialOpen={ false }
						className={ 'gblocks-panel-label' }
						id={ 'buttonContainerDocumentation' }
						state={ this.state }
					>
						<p>{ __( 'Need help with this block?', 'generateblocks' ) }</p>
						<a href="https://docs.generateblocks.com/collection/buttons/" target="_blank" rel="noreferrer noopener">{ __( 'Visit our documentation', 'generateblocks' ) }</a>

						{ applyFilters( 'generateblocks.editor.controls', '', 'buttonContainerDocumentation', this.props, this.state ) }
					</PanelArea>
				</InspectorControls>

				<InspectorAdvancedControls>
					<TextControl
						label={ __( 'HTML Anchor', 'generateblocks' ) }
						help={ __( 'Anchors lets you link directly to a section on a page.', 'generateblocks' ) }
						value={ anchor || '' }
						onChange={ ( nextValue ) => {
							nextValue = nextValue.replace( ANCHOR_REGEX, '-' );
							setAttributes( {
								anchor: nextValue,
							} );
						} } />
				</InspectorAdvancedControls>

				<MainCSS { ...this.props } />

				{ this.props.deviceType &&
					<Fragment>
						{ 'Desktop' === this.props.deviceType &&
							<DesktopCSS { ...this.props } />
						}

						{ ( 'Tablet' === this.props.deviceType || 'Mobile' === this.props.deviceType ) &&
							<TabletCSS { ...this.props } />
						}

						{ 'Tablet' === this.props.deviceType &&
							<TabletOnlyCSS { ...this.props } />
						}

						{ 'Mobile' === this.props.deviceType &&
							<MobileCSS { ...this.props } />
						}
					</Fragment>
				}

				<div
					{ ...htmlAttributes }
				>
					<InnerBlocks
						allowedBlocks={ [ 'generateblocks/button' ] }
						renderAppender={ () => (
							<Tooltip text={ __( 'Add Button', 'generateblocks' ) }>
								<Button
									className="gblocks-add-new-button gblocks-button-container-appender"
									icon={ 'insert' }
									onClick={ () => {
										wp.data.dispatch( 'core/block-editor' ).insertBlocks( createBlock( 'generateblocks/button', generateBlocksStyling.button ), undefined, clientId );
									} }
								/>
							</Tooltip>
						) }
					/>
				</div>
			</Fragment>
		);
	}
}

export default compose( [
	withDispatch( ( dispatch ) => ( {
		setDeviceType( type ) {
			const {
				__experimentalSetPreviewDeviceType: setPreviewDeviceType,
			} = dispatch( 'core/edit-post' ) || false;

			if ( ! setPreviewDeviceType ) {
				return;
			}

			setPreviewDeviceType( type );
		},
	} ) ),
	withSelect( ( select ) => {
		const {
			__experimentalGetPreviewDeviceType: getPreviewDeviceType,
		} = select( 'core/edit-post' ) || false;

		if ( ! getPreviewDeviceType ) {
			return {
				deviceType: null,
			};
		}

		return {
			deviceType: getPreviewDeviceType(),
		};
	} ),
] )( GenerateButtonContainer );
