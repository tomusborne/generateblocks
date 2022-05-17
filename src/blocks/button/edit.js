/**
 * Block: Buttons
 */

import classnames from 'classnames';
import ColorPicker from '../../components/color-picker';
import UnitPicker from '../../components/unit-picker';
import IconPicker from '../../components/icon-picker';
import URLInput from '../../components/url-input';
import DimensionsControl from '../../components/dimensions/';
import TypographyControls from '../../components/typography';
import GradientControl from '../../components/gradient/';
import ResponsiveTabs from '../../components/responsive-tabs';
import PanelArea from '../../components/panel-area/';
import getIcon from '../../utils/get-icon';
import MainCSS from './css/main.js';
import DesktopCSS from './css/desktop.js';
import TabletCSS from './css/tablet.js';
import TabletOnlyCSS from './css/tablet-only.js';
import MobileCSS from './css/mobile.js';
import Element from '../../components/element';
import getAllUniqueIds from '../../utils/get-all-unique-ids';
import isBlockVersionLessThan from '../../utils/check-block-version';
import hasNumericValue from '../../utils/has-numeric-value';
import wasBlockJustInserted from '../../utils/was-block-just-inserted';

import {
	__,
} from '@wordpress/i18n';

import {
	TabPanel,
	TextControl,
	ToolbarGroup,
	ToolbarButton,
	Button,
} from '@wordpress/components';

import {
	Fragment,
	Component,
} from '@wordpress/element';

import {
	InspectorControls,
	InspectorAdvancedControls,
	RichText,
	BlockControls,
} from '@wordpress/block-editor';

import {
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

class GenerateBlockButton extends Component {
	constructor() {
		super( ...arguments );

		this.state = {
			selectedDevice: 'Desktop',
			fontSizePlaceholder: '17',
		};

		this.getFontSizePlaceholder = this.getFontSizePlaceholder.bind( this );
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

		const tempFontSizePlaceholder = this.getFontSizePlaceholder();

		if ( tempFontSizePlaceholder !== this.state.fontSizePlaceholder ) {
			this.setState( {
				fontSizePlaceholder: tempFontSizePlaceholder,
			} );
		}

		// hasIcon came late, so let's set it on mount if we have an icon.
		if ( ! this.props.attributes.hasIcon && this.props.attributes.icon ) {
			this.props.setAttributes( {
				hasIcon: true,
			} );
		}

		// hasUrl came late, so let's set it if it doesn't exist.
		if ( 'undefined' === typeof this.props.attributes.hasUrl ) {
			if ( ! this.props.attributes.url ) {
				this.props.setAttributes( {
					hasUrl: false,
				} );
			} else {
				this.props.setAttributes( {
					hasUrl: true,
				} );
			}
		}

		// Set our old defaults as static values.
		// @since 1.4.0.
		if (
			! wasBlockJustInserted( this.props.attributes ) &&
			isBlockVersionLessThan( this.props.attributes.blockVersion, 2 )
		) {
			const legacyDefaults = generateBlocksLegacyDefaults.v_1_4_0.button;

			const newAttrs = {};
			const items = [];

			if ( this.props.attributes.gradient ) {
				items.push(
					'gradientDirection',
					'gradientColorOne',
					'gradientColorOneOpacity',
					'gradientColorTwo',
					'gradientColorTwoOpacity'
				);
			}

			items.forEach( ( item ) => {
				if ( ! hasNumericValue( this.props.attributes[ item ] ) ) {
					newAttrs[ item ] = legacyDefaults[ item ];
				}
			} );

			if ( Object.keys( newAttrs ).length > 0 ) {
				this.props.setAttributes( newAttrs );
			}
		}

		// Update block version flag if it's out of date.
		if ( isBlockVersionLessThan( this.props.attributes.blockVersion, 2 ) ) {
			this.props.setAttributes( { blockVersion: 2 } );
		}
	}

	componentDidUpdate() {
		const tempFontSizePlaceholder = this.getFontSizePlaceholder();

		if ( tempFontSizePlaceholder !== this.state.fontSizePlaceholder ) {
			this.setState( {
				fontSizePlaceholder: tempFontSizePlaceholder,
			} );
		}
	}

	getFontSizePlaceholder() {
		let placeholder = '17';
		const buttonId = document.querySelector( '.gb-button-' + this.props.attributes.uniqueId );

		if ( buttonId ) {
			placeholder = parseFloat( window.getComputedStyle( buttonId ).fontSize );
		}

		return placeholder;
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
			isSelected,
			clientId,
		} = this.props;

		const {
			fontSizePlaceholder,
		} = this.state;

		const {
			uniqueId,
			className,
			anchor,
			text,
			url,
			target,
			relNoFollow,
			relSponsored,
			icon,
			iconLocation,
			removeText,
			ariaLabel,
			backgroundColor,
			backgroundColorOpacity,
			textColor,
			backgroundColorHover,
			backgroundColorHoverOpacity,
			textColorHover,
			fontFamily,
			googleFont,
			googleFontVariants,
			borderColor,
			borderColorOpacity,
			borderColorHover,
			borderColorHoverOpacity,
			iconSize,
			iconSizeTablet,
			iconSizeMobile,
			iconSizeUnit,
		} = attributes;

		// Stop the buttons from doing anything in the editor.
		const links = document.querySelectorAll( 'a.gb-button' );

		for ( let i = 0; i < links.length; i++ ) {
			links[ i ].addEventListener( 'click', function( e ) {
				if ( links[ i ].getAttribute( 'href' ) ) {
					links[ i ].removeAttribute( 'href' );
					e.preventDefault();
				}
			}, false );
		}

		const relAttributes = [];

		if ( relNoFollow ) {
			relAttributes.push( 'nofollow' );
		}

		if ( target ) {
			relAttributes.push( 'noopener', 'noreferrer' );
		}

		if ( relSponsored ) {
			relAttributes.push( 'sponsored' );
		}

		let googleFontsAttr = '';

		if ( googleFontVariants ) {
			googleFontsAttr = ':' + googleFontVariants;
		}

		let htmlAttributes = {
			className: classnames( {
				'gb-button': true,
				[ `gb-button-${ uniqueId }` ]: true,
				'gb-button-text': ! icon,
				[ `${ className }` ]: undefined !== className,
			} ),
			href: !! url ? url : null,
			target: !! target ? '_blank' : null,
			rel: relAttributes && relAttributes.length > 0 ? relAttributes.join( ' ' ) : null,
			'aria-label': !! ariaLabel ? ariaLabel : null,
			id: anchor ? anchor : null,
		};

		htmlAttributes = applyFilters( 'generateblocks.frontend.htmlAttributes', htmlAttributes, 'generateblocks/button', attributes );

		return (
			<Fragment>
				<BlockControls>
					<ToolbarGroup>
						<ToolbarButton
							className="gblocks-add-new-button"
							icon={ getIcon( 'insert' ) }
							label={ __( 'Add Button', 'generateblocks' ) }
							onClick={ () => {
								let parentBlockId = false;

								if ( typeof wp.data.select( 'core/block-editor' ).getBlockParentsByBlockName === 'function' ) {
									parentBlockId = wp.data.select( 'core/block-editor' ).getBlockParentsByBlockName( clientId, 'generateblocks/button-container', true )[ 0 ];
								} else {
									parentBlockId = wp.data.select( 'core/block-editor' ).getBlockRootClientId( clientId );
								}

								const thisBlock = wp.data.select( 'core/block-editor' ).getBlocksByClientId( clientId )[ 0 ];

								const clonedBlock = cloneBlock(
									thisBlock,
									{
										uniqueId: '',
									}
								);

								wp.data.dispatch( 'core/block-editor' ).insertBlocks( clonedBlock, undefined, parentBlockId );
							} }
							showTooltip
						/>
					</ToolbarGroup>
				</BlockControls>

				<InspectorControls>
					<ResponsiveTabs { ...this.props }
						selectedDevice={ this.getDeviceType() }
						onClick={ ( device ) => {
							this.setDeviceType( device );
						} }
					/>

					<PanelArea { ...this.props }
						title={ __( 'Typography', 'generateblocks' ) }
						initialOpen={ false }
						icon={ getIcon( 'typography' ) }
						className={ 'gblocks-panel-label' }
						id={ 'buttonTypography' }
						state={ this.state }
						showPanel={ ! removeText || false }
					>

						{ 'Desktop' === this.getDeviceType() && (
							<Fragment>
								<TypographyControls { ...this.props }
									showFontFamily={ true }
									showFontWeight={ true }
									showTextTransform={ true }
									showFontSize={ true }
									showLetterSpacing={ true }
									fontSizePlaceholder={ fontSizePlaceholder }
									defaultFontSize={ generateBlocksDefaults.button.fontSize }
									defaultFontSizeUnit={ generateBlocksDefaults.button.fontSizeUnit }
									defaultLetterSpacing={ generateBlocksDefaults.button.letterSpacing }
								/>
							</Fragment>
						) }

						{ 'Tablet' === this.getDeviceType() && (
							<Fragment>
								<TypographyControls { ...this.props }
									device={ 'Tablet' }
									showFontSize={ true }
									showLetterSpacing={ true }
									disableAdvancedToggle={ true }
									defaultFontSize={ generateBlocksDefaults.button.fontSizeTablet }
									defaultFontSizeUnit={ generateBlocksDefaults.button.fontSizeUnit }
									defaultLetterSpacing={ generateBlocksDefaults.button.letterSpacingTablet }
								/>
							</Fragment>
						) }

						{ 'Mobile' === this.getDeviceType() && (
							<Fragment>
								<TypographyControls { ...this.props }
									device={ 'Mobile' }
									showFontSize={ true }
									showLetterSpacing={ true }
									disableAdvancedToggle={ true }
									defaultFontSize={ generateBlocksDefaults.button.fontSizeMobile }
									defaultFontSizeUnit={ generateBlocksDefaults.button.fontSizeUnit }
									defaultLetterSpacing={ generateBlocksDefaults.button.letterSpacingMobile }
								/>
							</Fragment>
						) }

						{ applyFilters( 'generateblocks.editor.controls', '', 'buttonTypography', this.props, this.state ) }
					</PanelArea>

					<PanelArea { ...this.props }
						title={ __( 'Spacing', 'generateblocks' ) }
						initialOpen={ false }
						icon={ getIcon( 'spacing' ) }
						className={ 'gblocks-panel-label' }
						id={ 'buttonSpacing' }
						state={ this.state }
					>

						{ 'Desktop' === this.getDeviceType() && (
							<Fragment>
								<DimensionsControl { ...this.props }
									device={ this.getDeviceType() }
									type={ 'padding' }
									label={ __( 'Padding', 'generateblocks' ) }
									attrTop={ 'paddingTop' }
									attrRight={ 'paddingRight' }
									attrBottom={ 'paddingBottom' }
									attrLeft={ 'paddingLeft' }
									attrUnit={ 'paddingUnit' }
									attrSyncUnits={ 'paddingSyncUnits' }
									defaults={ generateBlocksDefaults.button }
									units={ [ 'px', 'em', '%' ] }
								/>

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
									defaults={ generateBlocksDefaults.button }
									units={ [ 'px', 'em', '%' ] }
								/>

								<DimensionsControl { ...this.props }
									device={ this.getDeviceType() }
									type={ 'padding' }
									label={ __( 'Border Size', 'generateblocks' ) }
									attrTop={ 'borderSizeTop' }
									attrRight={ 'borderSizeRight' }
									attrBottom={ 'borderSizeBottom' }
									attrLeft={ 'borderSizeLeft' }
									attrSyncUnits={ 'borderSizeSyncUnits' }
									defaults={ generateBlocksDefaults.button }
									units={ [ 'px' ] }
								/>

								<DimensionsControl { ...this.props }
									device={ this.getDeviceType() }
									type={ 'padding' }
									label={ __( 'Border Radius', 'generateblocks' ) }
									attrTop={ 'borderRadiusTopLeft' }
									attrRight={ 'borderRadiusTopRight' }
									attrBottom={ 'borderRadiusBottomRight' }
									attrLeft={ 'borderRadiusBottomLeft' }
									attrUnit={ 'borderRadiusUnit' }
									attrSyncUnits={ 'borderRadiusSyncUnits' }
									labelTop={ __( 'T-Left', 'generateblocks' ) }
									labelRight={ __( 'T-Right', 'generateblocks' ) }
									labelBottom={ __( 'B-Right', 'generateblocks' ) }
									labelLeft={ __( 'B-Left', 'generateblocks' ) }
									defaults={ generateBlocksDefaults.button }
									units={ [ 'px', 'em', '%' ] }
								/>
							</Fragment>
						) }

						{ 'Tablet' === this.getDeviceType() && (
							<Fragment>
								<DimensionsControl { ...this.props }
									device={ this.getDeviceType() }
									type={ 'padding' }
									label={ __( 'Padding', 'generateblocks' ) }
									attrTop={ 'paddingTopTablet' }
									attrRight={ 'paddingRightTablet' }
									attrBottom={ 'paddingBottomTablet' }
									attrLeft={ 'paddingLeftTablet' }
									attrUnit={ 'paddingUnit' }
									attrSyncUnits={ 'paddingSyncUnits' }
									defaults={ generateBlocksDefaults.button }
									units={ [ 'px', 'em', '%' ] }
								/>

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
									defaults={ generateBlocksDefaults.button }
									units={ [ 'px', 'em', '%' ] }
								/>

								<DimensionsControl { ...this.props }
									device={ this.getDeviceType() }
									type={ 'padding' }
									label={ __( 'Border Size', 'generateblocks' ) }
									attrTop={ 'borderSizeTopTablet' }
									attrRight={ 'borderSizeRightTablet' }
									attrBottom={ 'borderSizeBottomTablet' }
									attrLeft={ 'borderSizeLeftTablet' }
									attrSyncUnits={ 'borderSizeSyncUnits' }
									defaults={ generateBlocksDefaults.button }
									units={ [ 'px' ] }
								/>

								<DimensionsControl { ...this.props }
									device={ this.getDeviceType() }
									type={ 'padding' }
									label={ __( 'Border Radius', 'generateblocks' ) }
									attrTop={ 'borderRadiusTopLeftTablet' }
									attrRight={ 'borderRadiusTopRightTablet' }
									attrBottom={ 'borderRadiusBottomRightTablet' }
									attrLeft={ 'borderRadiusBottomLeftTablet' }
									attrUnit={ 'borderRadiusUnit' }
									attrSyncUnits={ 'borderRadiusSyncUnits' }
									labelTop={ __( 'T-Left', 'generateblocks' ) }
									labelRight={ __( 'T-Right', 'generateblocks' ) }
									labelBottom={ __( 'B-Right', 'generateblocks' ) }
									labelLeft={ __( 'B-Left', 'generateblocks' ) }
									defaults={ generateBlocksDefaults.button }
									units={ [ 'px', 'em', '%' ] }
								/>
							</Fragment>
						) }

						{ 'Mobile' === this.getDeviceType() && (
							<Fragment>
								<DimensionsControl { ...this.props }
									device={ this.getDeviceType() }
									type={ 'padding' }
									label={ __( 'Padding', 'generateblocks' ) }
									attrTop={ 'paddingTopMobile' }
									attrRight={ 'paddingRightMobile' }
									attrBottom={ 'paddingBottomMobile' }
									attrLeft={ 'paddingLeftMobile' }
									attrUnit={ 'paddingUnit' }
									attrSyncUnits={ 'paddingSyncUnits' }
									defaults={ generateBlocksDefaults.button }
									units={ [ 'px', 'em', '%' ] }
								/>

								<DimensionsControl { ...this.props }
									device={ this.getDeviceType() }
									type={ 'padding' }
									label={ __( 'Margin', 'generateblocks' ) }
									attrTop={ 'marginTopMobile' }
									attrRight={ 'marginRightMobile' }
									attrBottom={ 'marginBottomMobile' }
									attrLeft={ 'marginLeftMobile' }
									attrUnit={ 'marginUnit' }
									attrSyncUnits={ 'marginSyncUnits' }
									defaults={ generateBlocksDefaults.button }
									units={ [ 'px', 'em', '%' ] }
								/>

								<DimensionsControl { ...this.props }
									device={ this.getDeviceType() }
									type={ 'padding' }
									label={ __( 'Border Size', 'generateblocks' ) }
									attrTop={ 'borderSizeTopMobile' }
									attrRight={ 'borderSizeRightMobile' }
									attrBottom={ 'borderSizeBottomMobile' }
									attrLeft={ 'borderSizeLeftMobile' }
									attrSyncUnits={ 'borderSizeSyncUnits' }
									defaults={ generateBlocksDefaults.button }
									units={ [ 'px' ] }
								/>

								<DimensionsControl { ...this.props }
									device={ this.getDeviceType() }
									type={ 'padding' }
									label={ __( 'Border Radius', 'generateblocks' ) }
									attrTop={ 'borderRadiusTopLeftMobile' }
									attrRight={ 'borderRadiusTopRightMobile' }
									attrBottom={ 'borderRadiusBottomRightMobile' }
									attrLeft={ 'borderRadiusBottomLeftMobile' }
									attrUnit={ 'borderRadiusUnit' }
									attrSyncUnits={ 'borderRadiusSyncUnits' }
									labelTop={ __( 'T-Left', 'generateblocks' ) }
									labelRight={ __( 'T-Right', 'generateblocks' ) }
									labelBottom={ __( 'B-Right', 'generateblocks' ) }
									labelLeft={ __( 'B-Left', 'generateblocks' ) }
									defaults={ generateBlocksDefaults.button }
									units={ [ 'px', 'em', '%' ] }
								/>
							</Fragment>
						) }

						{ applyFilters( 'generateblocks.editor.controls', '', 'buttonSpacing', this.props, this.state ) }
					</PanelArea>

					<PanelArea { ...this.props }
						title={ __( 'Colors', 'generateblocks' ) }
						initialOpen={ false }
						icon={ getIcon( 'colors' ) }
						className={ 'gblocks-panel-label' }
						id={ 'buttonColors' }
						state={ this.state }
					>
						{ 'Desktop' === this.getDeviceType() &&
							<TabPanel className="layout-tab-panel gblocks-control-tabs"
								activeClass="active-tab"
								tabs={ [
									{
										name: 'button-colors',
										title: __( 'Normal', 'generateblocks' ),
										className: 'button-colors',
									},
									{
										name: 'button-colors-hover',
										title: __( 'Hover', 'generateblocks' ),
										className: 'button-colors-hover',
									},
								] }>
								{
									( tab ) => {
										const isNormal = tab.name === 'button-colors';

										return (
											<div>
												{ isNormal ? (
													<Fragment>
														<ColorPicker
															label={ __( 'Background Color', 'generateblocks' ) }
															value={ backgroundColor }
															alpha={ true }
															valueOpacity={ backgroundColorOpacity }
															attrOpacity={ 'backgroundColorOpacity' }
															key={ 'buttonBackgroundColor' }
															onChange={ ( nextBackgroundColor ) =>
																setAttributes( {
																	backgroundColor: nextBackgroundColor,
																} )
															}
															onOpacityChange={ ( value ) =>
																setAttributes( {
																	backgroundColorOpacity: value,
																} )
															}
														/>

														<ColorPicker
															label={ __( 'Text Color', 'generateblocks' ) }
															value={ textColor }
															alpha={ false }
															key={ 'buttonTextColor' }
															onChange={ ( nextTextColor ) =>
																setAttributes( {
																	textColor: nextTextColor,
																} )
															}
														/>

														<ColorPicker
															label={ __( 'Border Color', 'generateblocks' ) }
															value={ borderColor }
															alpha={ true }
															valueOpacity={ borderColorOpacity }
															attrOpacity={ 'borderColorOpacity' }
															key={ 'buttonBorderColor' }
															onChange={ ( value ) =>
																setAttributes( {
																	borderColor: value,
																} )
															}
															onOpacityChange={ ( value ) =>
																setAttributes( {
																	borderColorOpacity: value,
																} )
															}
														/>

														{ applyFilters( 'generateblocks.editor.controls', '', 'buttonColorsNormal', this.props, this.state ) }
													</Fragment>

												) : (

													<Fragment>
														<ColorPicker
															label={ __( 'Background Color', 'generateblocks' ) }
															value={ backgroundColorHover }
															alpha={ true }
															valueOpacity={ backgroundColorHoverOpacity }
															attrOpacity={ 'backgroundColorHoverOpacity' }
															key={ 'buttonBackgroundColorHover' }
															onChange={ ( nextBackgroundColorHover ) =>
																setAttributes( {
																	backgroundColorHover: nextBackgroundColorHover,
																} )
															}
															onOpacityChange={ ( value ) =>
																setAttributes( {
																	backgroundColorHoverOpacity: value,
																} )
															}
														/>

														<ColorPicker
															label={ __( 'Text Color', 'generateblocks' ) }
															value={ textColorHover }
															alpha={ false }
															key={ 'buttonTextColorHover' }
															onChange={ ( nextTextColorHover ) =>
																setAttributes( {
																	textColorHover: nextTextColorHover,
																} )
															}
														/>

														<ColorPicker
															label={ __( 'Border Color', 'generateblocks' ) }
															value={ borderColorHover }
															alpha={ true }
															valueOpacity={ borderColorHoverOpacity }
															attrOpacity={ 'borderColorHoverOpacity' }
															key={ 'buttonBorderColorHover' }
															onChange={ ( value ) =>
																setAttributes( {
																	borderColorHover: value,
																} )
															}
															onOpacityChange={ ( value ) =>
																setAttributes( {
																	borderColorHoverOpacity: value,
																} )
															}
														/>

														{ applyFilters( 'generateblocks.editor.controls', '', 'buttonColorsHover', this.props, this.state ) }
													</Fragment>
												) }
											</div>
										);
									}
								}
							</TabPanel>
						}

						{ applyFilters( 'generateblocks.editor.controls', '', 'buttonColors', this.props, this.state ) }
					</PanelArea>

					<PanelArea { ...this.props }
						title={ __( 'Background Gradient', 'generateblocks' ) }
						initialOpen={ false }
						icon={ getIcon( 'gradients' ) }
						className={ 'gblocks-panel-label' }
						id={ 'buttonBackgroundGradient' }
						state={ this.state }
					>
						{ 'Desktop' === this.getDeviceType() &&
							<GradientControl { ...this.props }
								attrGradient={ 'gradient' }
								attrGradientDirection={ 'gradientDirection' }
								attrGradientColorOne={ 'gradientColorOne' }
								attrGradientColorOneOpacity={ 'gradientColorOneOpacity' }
								attrGradientColorStopOne={ 'gradientColorStopOne' }
								attrGradientColorTwo={ 'gradientColorTwo' }
								attrGradientColorTwoOpacity={ 'gradientColorTwoOpacity' }
								attrGradientColorStopTwo={ 'gradientColorStopTwo' }
								defaultColorOne={ generateBlocksDefaults.button.gradientColorOne }
								defaultColorTwo={ generateBlocksDefaults.button.gradientColorTwo }
							/>
						}

						{ applyFilters( 'generateblocks.editor.controls', '', 'buttonBackgroundGradient', this.props, this.state ) }
					</PanelArea>

					<PanelArea { ...this.props }
						title={ __( 'Icon', 'generateblocks' ) }
						initialOpen={ false }
						icon={ getIcon( 'icons' ) }
						className={ 'gblocks-panel-label' }
						id={ 'buttonIcon' }
						state={ this.state }
						showPanel={ 'Desktop' === this.getDeviceType() || !! icon ? true : false }
					>

						{ 'Desktop' === this.getDeviceType() &&
							<IconPicker { ...this.props }
								attrIcon={ 'icon' }
								attrIconLocation={ 'iconLocation' }
								attrRemoveText={ 'removeText' }
								locationOptions={ [
									{ label: __( 'Left', 'generateblocks' ), value: 'left' },
									{ label: __( 'Right', 'generateblocks' ), value: 'right' },
								] }
							/>
						}

						{ 'Desktop' === this.getDeviceType() && !! icon && (
							<Fragment>
								{ ! removeText &&
									<Fragment>
										<DimensionsControl { ...this.props }
											device={ this.getDeviceType() }
											type={ 'padding' }
											label={ __( 'Padding', 'generateblocks' ) }
											attrTop={ 'iconPaddingTop' }
											attrRight={ 'iconPaddingRight' }
											attrBottom={ 'iconPaddingBottom' }
											attrLeft={ 'iconPaddingLeft' }
											attrUnit={ 'iconPaddingUnit' }
											attrSyncUnits={ 'iconPaddingSyncUnits' }
											defaults={ generateBlocksDefaults.button }
											units={ [ 'px', 'em', '%' ] }
										/>
									</Fragment>
								}

								<UnitPicker
									label={ __( 'Icon Size', 'generateblocks' ) }
									value={ iconSizeUnit }
									units={ [ 'px', 'em' ] }
									onClick={ ( value ) => {
										setAttributes( {
											iconSizeUnit: value,
										} );
									} }
								/>

								<div className="components-base-control components-gblocks-typography-control__inputs">
									<TextControl
										type={ 'number' }
										value={ iconSize || '' }
										step={ 'em' === iconSizeUnit ? .1 : 1 }
										onChange={ ( value ) => {
											setAttributes( {
												iconSize: value,
											} );
										} }
										onBlur={ () => {
											setAttributes( {
												iconSize: parseFloat( iconSize ),
											} );
										} }
										onClick={ ( e ) => {
											// Make sure onBlur fires in Firefox.
											e.currentTarget.focus();
										} }
									/>

									<Button
										isSmall
										isSecondary
										className="components-gblocks-default-number"
										onClick={ () => {
											setAttributes( {
												iconSize: generateBlocksDefaults.button.iconSize,
											} );
										} }
									>
										{ __( 'Reset', 'generateblocks' ) }
									</Button>
								</div>
							</Fragment>
						) }

						{ 'Tablet' === this.getDeviceType() && !! icon &&
							<Fragment>
								{ ! removeText &&
									<Fragment>
										<DimensionsControl { ...this.props }
											device={ this.getDeviceType() }
											type={ 'padding' }
											label={ __( 'Padding', 'generateblocks' ) }
											attrTop={ 'iconPaddingTopTablet' }
											attrRight={ 'iconPaddingRightTablet' }
											attrBottom={ 'iconPaddingBottomTablet' }
											attrLeft={ 'iconPaddingLeftTablet' }
											attrUnit={ 'iconPaddingUnit' }
											attrSyncUnits={ 'iconPaddingSyncUnits' }
											defaults={ generateBlocksDefaults.button }
											units={ [ 'px', 'em', '%' ] }
										/>
									</Fragment>
								}

								<UnitPicker
									label={ __( 'Icon Size', 'generateblocks' ) }
									value={ iconSizeUnit }
									units={ [ 'px', 'em' ] }
									onClick={ ( value ) => {
										setAttributes( {
											iconSizeUnit: value,
										} );
									} }
								/>

								<div className="components-base-control components-gblocks-typography-control__inputs">
									<TextControl
										type={ 'number' }
										value={ iconSizeTablet || '' }
										step={ 'em' === iconSizeUnit ? .1 : 1 }
										placeholder="1"
										onChange={ ( value ) => {
											setAttributes( {
												iconSizeTablet: value,
											} );
										} }
										onBlur={ () => {
											setAttributes( {
												iconSizeTablet: parseFloat( iconSizeTablet ),
											} );
										} }
										onClick={ ( e ) => {
											// Make sure onBlur fires in Firefox.
											e.currentTarget.focus();
										} }
									/>

									<Button
										isSmall
										isSecondary
										className="components-gblocks-default-number"
										onClick={ () => {
											setAttributes( {
												iconSizeTablet: generateBlocksDefaults.button.iconSizeTablet,
											} );
										} }
									>
										{ __( 'Reset', 'generateblocks' ) }
									</Button>
								</div>
							</Fragment>
						}

						{ 'Mobile' === this.getDeviceType() && !! icon && (
							<Fragment>
								{ ! removeText &&
									<Fragment>
										<DimensionsControl { ...this.props }
											device={ this.getDeviceType() }
											type={ 'padding' }
											label={ __( 'Padding', 'generateblocks' ) }
											attrTop={ 'iconPaddingTopMobile' }
											attrRight={ 'iconPaddingRightMobile' }
											attrBottom={ 'iconPaddingBottomMobile' }
											attrLeft={ 'iconPaddingLeftMobile' }
											attrUnit={ 'iconPaddingUnit' }
											attrSyncUnits={ 'iconPaddingSyncUnits' }
											defaults={ generateBlocksDefaults.button }
											units={ [ 'px', 'em', '%' ] }
										/>
									</Fragment>
								}

								<UnitPicker
									label={ __( 'Icon Size', 'generateblocks' ) }
									value={ iconSizeUnit }
									units={ [ 'px', 'em' ] }
									onClick={ ( value ) => {
										setAttributes( {
											iconSizeUnit: value,
										} );
									} }
								/>

								<div className="components-base-control components-gblocks-typography-control__inputs">
									<TextControl
										type={ 'number' }
										value={ iconSizeMobile || '' }
										step={ 'em' === iconSizeUnit ? .1 : 1 }
										placeholder="1"
										onChange={ ( value ) => {
											setAttributes( {
												iconSizeMobile: value,
											} );
										} }
										onBlur={ () => {
											setAttributes( {
												iconSizeMobile: parseFloat( iconSizeMobile ),
											} );
										} }
										onClick={ ( e ) => {
											// Make sure onBlur fires in Firefox.
											e.currentTarget.focus();
										} }
									/>

									<Button
										isSmall
										isSecondary
										className="components-gblocks-default-number"
										onClick={ () => {
											setAttributes( {
												iconSizeMobile: generateBlocksDefaults.button.iconSizeMobile,
											} );
										} }
									>
										{ __( 'Reset', 'generateblocks' ) }
									</Button>
								</div>
							</Fragment>
						) }

						{ applyFilters( 'generateblocks.editor.controls', '', 'buttonIcon', this.props, this.state ) }
					</PanelArea>

					<PanelArea { ...this.props }
						title={ __( 'Documentation', 'generateblocks' ) }
						icon={ getIcon( 'documentation' ) }
						initialOpen={ false }
						className={ 'gblocks-panel-label' }
						id={ 'buttonDocumentation' }
						state={ this.state }
					>
						<p>{ __( 'Need help with this block?', 'generateblocks' ) }</p>
						<a href="https://docs.generateblocks.com/collection/buttons/" target="_blank" rel="noreferrer noopener">{ __( 'Visit our documentation', 'generateblocks' ) }</a>

						{ applyFilters( 'generateblocks.editor.controls', '', 'buttonDocumentation', this.props, this.state ) }
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

					<TextControl
						label={ __( 'ARIA Label', 'generateblocks' ) }
						help={ __( 'Helpful to people using screen readers.', 'generateblocks' ) }
						value={ ariaLabel }
						onChange={ ( value ) => {
							setAttributes( {
								ariaLabel: value,
							} );
						} }
					/>
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

				{ fontFamily && googleFont &&
					<link
						rel="stylesheet"
						href={ 'https://fonts.googleapis.com/css?family=' + fontFamily.replace( / /g, '+' ) + googleFontsAttr }
					/>
				}

				<Element
					tagName={ url ? 'a' : 'span' }
					htmlAttrs={ htmlAttributes }
				>
					{ !! icon &&
						<Fragment>
							{ 'left' === iconLocation &&
								<span
									className="gb-icon"
									dangerouslySetInnerHTML={ { __html: icon } }
								/>
							}

							{ ! removeText &&
								<span className={ 'gb-button-text' }>
									<RichText
										placeholder={ __( 'Add text…', 'generateblocks' ) }
										value={ text }
										onChange={ ( value ) => setAttributes( { text: value } ) }
										allowedFormats={ applyFilters( 'generateblocks.editor.buttonDisableFormatting', false, this.props ) ? [] : [ 'core/bold', 'core/italic', 'core/strikethrough' ] }
									/>
								</span>
							}

							{ 'right' === iconLocation &&
								<span
									className="gb-icon"
									dangerouslySetInnerHTML={ { __html: icon } }
								/>
							}
						</Fragment>
					}

					{ ! icon && ! removeText &&
						<RichText
							placeholder={ __( 'Add text…', 'generateblocks' ) }
							value={ text }
							onChange={ ( value ) => setAttributes( { text: value } ) }
							allowedFormats={ applyFilters( 'generateblocks.editor.buttonDisableFormatting', false, this.props ) ? [] : [ 'core/bold', 'core/italic', 'core/strikethrough' ] }
						/>
					}
				</Element>
				{ isSelected &&
					<URLInput
						url={ url }
						target={ target }
						relNoFollow={ relNoFollow }
						relSponsored={ relSponsored }
						onChange={ ( data ) => {
							setAttributes( data );

							if ( '' !== data.url ) {
								setAttributes( {
									hasUrl: true,
								} );
							} else {
								setAttributes( {
									hasUrl: false,
								} );
							}
						} }
						autoFocus={ false } // eslint-disable-line jsx-a11y/no-autofocus
						className="gblocks-component-url-input-float"
					/>
				}
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
] )( GenerateBlockButton );
