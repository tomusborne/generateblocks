/**
 * Block: Buttons
 */

import classnames from 'classnames';
import ColorPicker from '../../components/color-picker';
import hexToRGBA from '../../components/color-picker/hex-to-rgba';
import IconPicker from '../../components/icon-picker';
import URLInput from '../../components/url-input';
import DimensionsControl from '../../components/dimensions/';
import TypographyControls from '../../components/typography';
import GradientControl from '../../components/gradient/';
import ResponsiveTabs from '../../components/responsive-tabs';
import getIcon from '../../utils/get-icon';
import DesktopCSS from './css/desktop.js';
import sanitizeSVG from '../../utils/sanitize-svg';

const { __ } = wp.i18n; // Import __() from wp.i18n
const {
	PanelBody,
	TabPanel,
	BaseControl,
	TextControl,
	RangeControl,
	SelectControl,
	ToggleControl,
	Toolbar,
	Tooltip,
	Button,
} = wp.components;

const {
	Fragment,
	Component
} = wp.element;

const {
	InspectorControls,
	InspectorAdvancedControls,
	RichText,
	BlockControls,
} = wp.blockEditor;

const {
	cloneBlock,
} = wp.blocks;

const ELEMENT_ID_REGEX = /[\s#]/g;
const gbButtonIds = [];

class GenerateBlockButton extends Component {
	constructor() {
		super( ...arguments );

		this.state = {
            selectedDevice: 'desktop',
        };
	}

	componentDidMount() {
		let id = this.props.clientId.substr( 2, 9 ).replace( '-', '' );

		if ( ! this.props.attributes.uniqueId ) {
			this.props.setAttributes( {
				uniqueId: id,
			} );

			gbButtonIds.push( id );
		} else if ( gbButtonIds.includes( this.props.attributes.uniqueId ) ) {
			this.props.setAttributes( {
				uniqueId: id,
			} );

			gbButtonIds.push( id );
		} else {
			gbButtonIds.push( this.props.attributes.uniqueId );
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
            selectedDevice,
        } = this.state;

		const {
			uniqueId,
			elementId,
			cssClasses,
			text,
			url,
			target,
			relNoFollow,
			relSponsored,
			icon,
			iconLocation,
			customIcon,
			removeText,
			ariaLabel,
			backgroundColor,
			backgroundColorOpacity,
			textColor,
			backgroundColorHover,
			backgroundColorHoverOpacity,
			textColorHover,
			showAdvancedTypography,
			fontFamily,
			fontFamilyFallback,
			fontWeight,
			googleFont,
			textTransform,
			letterSpacing,
			letterSpacingTablet,
			letterSpacingMobile,
			fontSize,
			fontSizeTablet,
			fontSizeMobile,
			fontSizeUnit,
			marginTop,
			marginRight,
			marginBottom,
			marginLeft,
			marginUnit,
			marginSyncUnits,
			marginTopTablet,
			marginRightTablet,
			marginBottomTablet,
			marginLeftTablet,
			marginTopMobile,
			marginRightMobile,
			marginBottomMobile,
			marginLeftMobile,
			paddingTop,
			paddingRight,
			paddingBottom,
			paddingLeft,
			paddingUnit,
			paddingSyncUnits,
			paddingTopTablet,
			paddingRightTablet,
			paddingBottomTablet,
			paddingLeftTablet,
			paddingTopMobile,
			paddingRightMobile,
			paddingBottomMobile,
			paddingLeftMobile,
			borderSizeTop,
			borderSizeRight,
			borderSizeBottom,
			borderSizeLeft,
			borderSizeSyncUnits,
			borderSizeTopTablet,
			borderSizeRightTablet,
			borderSizeBottomTablet,
			borderSizeLeftTablet,
			borderSizeTopMobile,
			borderSizeRightMobile,
			borderSizeBottomMobile,
			borderSizeLeftMobile,
			borderRadiusTopRight,
			borderRadiusBottomRight,
			borderRadiusBottomLeft,
			borderRadiusTopLeft,
			borderRadiusUnit,
			borderRadiusSyncUnits,
			borderRadiusTopRightTablet,
			borderRadiusBottomRightTablet,
			borderRadiusBottomLeftTablet,
			borderRadiusTopLeftTablet,
			borderRadiusTopRightMobile,
			borderRadiusBottomRightMobile,
			borderRadiusBottomLeftMobile,
			borderRadiusTopLeftMobile,
			borderColor,
			borderColorOpacity,
			borderColorHover,
			borderColorHoverOpacity,
			gradient,
			gradientDirection,
			gradientColorOne,
			gradientColorOneOpacity,
			gradientColorStopOne,
			gradientColorTwo,
			gradientColorTwoOpacity,
			gradientColorStopTwo,
			iconPaddingTop,
			iconPaddingRight,
			iconPaddingBottom,
			iconPaddingLeft,
			iconPaddingTopTablet,
			iconPaddingRightTablet,
			iconPaddingBottomTablet,
			iconPaddingLeftTablet,
			iconPaddingTopMobile,
			iconPaddingRightMobile,
			iconPaddingBottomMobile,
			iconPaddingLeftMobile,
			iconPaddingUnit,
			iconPaddingSyncUnits,
			iconSize,
			iconSizeTablet,
			iconSizeMobile,
		} = attributes;

		jQuery( '.gb-button' ).on( 'click', function( e ) {
			e.preventDefault();
		} );

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

		const googleFontsAttr = ':100,100italic,200,200italic,300,300italic,400,400italic,500,500italic,600,600italic,700,700italic,800,800italic,900,900italic';

		return (
			<Fragment>
				<BlockControls>
					<Toolbar>
						<Tooltip text={ __( 'Add Button', 'generateblocks' ) }>
							<Button
								className="gblocks-add-new-button"
								icon={ 'insert' }
								onClick={ () => {
									let parentBlockId = false;

									if ( typeof wp.data.select( 'core/block-editor' ).getBlockParentsByBlockName === "function" ) {
										parentBlockId = wp.data.select( 'core/block-editor' ).getBlockParentsByBlockName( clientId, 'generateblocks/button-container', true )[ 0 ];
									} else {
										parentBlockId = wp.data.select( 'core/block-editor' ).getBlockRootClientId( clientId );
									}

									const thisBlock = wp.data.select( 'core/block-editor' ).getBlocksByClientId( clientId )[ 0 ];
									const clonedBlock = cloneBlock( thisBlock );

									wp.data.dispatch( 'core/block-editor' ).insertBlocks( clonedBlock, undefined, parentBlockId );
								} }
							/>
						</Tooltip>
					</Toolbar>
				</BlockControls>

				<InspectorControls>
					<ResponsiveTabs { ...this.props }
						selectedDevice={ selectedDevice }
						onClick={ ( device ) => {
							this.setState( {
								selectedDevice: device,
							} );
						} }
					/>

					{ ! removeText &&
						<PanelBody
							title={ __( 'Typography', 'generateblocks' ) }
							initialOpen={ true }
							icon={ getIcon( 'typography' ) }
							className={ 'gblocks-panel-label' }
							>

								{ 'desktop' === selectedDevice && (
									<Fragment>
										<TypographyControls { ...this.props }
											showFontFamily={ true }
											showFontWeight={ true }
											showTextTransform={ true }
											showFontSize={ true }
											showLetterSpacing={ true }
											defaultFontSize={ generateBlocksDefaults.button.fontSize }
											defaultFontSizeUnit={ generateBlocksDefaults.button.fontSizeUnit }
											defaultLetterSpacing={ generateBlocksDefaults.button.letterSpacing }
										/>
									</Fragment>
								) }

								{ 'tablet' === selectedDevice && (
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

								{ 'mobile' === selectedDevice && (
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
						</PanelBody>
					}

					<PanelBody
						title={ __( 'Spacing', 'generateblocks' ) }
						initialOpen={ false }
						icon={ getIcon( 'spacing' ) }
						className={ 'gblocks-panel-label' }
						>

							{ 'desktop' === selectedDevice && (
								<Fragment>
									<DimensionsControl { ...this.props }
										type={ 'padding' }
										label={ __( 'Padding', 'generateblocks' ) }
										attrTop={ 'paddingTop' }
										attrRight={ 'paddingRight' }
										attrBottom={ 'paddingBottom' }
										attrLeft={ 'paddingLeft' }
										attrUnit={ 'paddingUnit' }
										attrSyncUnits={ 'paddingSyncUnits' }
									/>

									<DimensionsControl { ...this.props }
										type={ 'margin' }
										label={ __( 'Margin', 'generateblocks' ) }
										attrTop={ 'marginTop' }
										attrRight={ 'marginRight' }
										attrBottom={ 'marginBottom' }
										attrLeft={ 'marginLeft' }
										attrUnit={ 'marginUnit' }
										attrSyncUnits={ 'marginSyncUnits' }
									/>

									<DimensionsControl { ...this.props }
										type={ 'padding' }
										label={ __( 'Border Size', 'generateblocks' ) }
										attrTop={ 'borderSizeTop' }
										attrRight={ 'borderSizeRight' }
										attrBottom={ 'borderSizeBottom' }
										attrLeft={ 'borderSizeLeft' }
										attrSyncUnits={ 'borderSizeSyncUnits' }
										displayUnit={ 'px' }
									/>

									<DimensionsControl { ...this.props }
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
									/>
								</Fragment>
							) }

							{ 'tablet' === selectedDevice && (
								<Fragment>
									<DimensionsControl { ...this.props }
										type={ 'padding' }
										label={ __( 'Padding', 'generateblocks' ) }
										attrTop={ 'paddingTopTablet' }
										attrRight={ 'paddingRightTablet' }
										attrBottom={ 'paddingBottomTablet' }
										attrLeft={ 'paddingLeftTablet' }
										attrUnit={ 'paddingUnit' }
										attrSyncUnits={ 'paddingSyncUnits' }
									/>

									<DimensionsControl { ...this.props }
										type={ 'margin' }
										label={ __( 'Margin', 'generateblocks' ) }
										attrTop={ 'marginTopTablet' }
										attrRight={ 'marginRightTablet' }
										attrBottom={ 'marginBottomTablet' }
										attrLeft={ 'marginLeftTablet' }
										attrUnit={ 'marginUnit' }
										attrSyncUnits={ 'marginSyncUnits' }
									/>

									<DimensionsControl { ...this.props }
										type={ 'padding' }
										label={ __( 'Border Size', 'generateblocks' ) }
										attrTop={ 'borderSizeTopTablet' }
										attrRight={ 'borderSizeRightTablet' }
										attrBottom={ 'borderSizeBottomTablet' }
										attrLeft={ 'borderSizeLeftTablet' }
										attrSyncUnits={ 'borderSizeSyncUnits' }
										displayUnit={ 'px' }
									/>

									<DimensionsControl { ...this.props }
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
									/>
								</Fragment>
							) }

							{ 'mobile' === selectedDevice && (
								<Fragment>
									<DimensionsControl { ...this.props }
										type={ 'padding' }
										label={ __( 'Padding', 'generateblocks' ) }
										attrTop={ 'paddingTopMobile' }
										attrRight={ 'paddingRightMobile' }
										attrBottom={ 'paddingBottomMobile' }
										attrLeft={ 'paddingLeftMobile' }
										attrUnit={ 'paddingUnit' }
										attrSyncUnits={ 'paddingSyncUnits' }
									/>

									<DimensionsControl { ...this.props }
										type={ 'padding' }
										label={ __( 'Margin', 'generateblocks' ) }
										attrTop={ 'marginTopMobile' }
										attrRight={ 'marginRightMobile' }
										attrBottom={ 'marginBottomMobile' }
										attrLeft={ 'marginLeftMobile' }
										attrUnit={ 'marginUnit' }
										attrSyncUnits={ 'marginSyncUnits' }
									/>

									<DimensionsControl { ...this.props }
										type={ 'padding' }
										label={ __( 'Border Size', 'generateblocks' ) }
										attrTop={ 'borderSizeTopMobile' }
										attrRight={ 'borderSizeRightMobile' }
										attrBottom={ 'borderSizeBottomMobile' }
										attrLeft={ 'borderSizeLeftMobile' }
										attrSyncUnits={ 'borderSizeSyncUnits' }
										displayUnit={ 'px' }
									/>

									<DimensionsControl { ...this.props }
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
									/>
								</Fragment>
							) }
					</PanelBody>

					{ 'desktop' === selectedDevice &&
						<PanelBody
							title={ __( 'Colors', 'generateblocks' ) }
							initialOpen={ false }
							icon={ getIcon( 'colors' ) }
							className={ 'gblocks-panel-label' }
							>
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
																	backgroundColor: nextBackgroundColor
																} )
															}
															onOpacityChange={ ( value ) =>
																setAttributes( {
																	backgroundColorOpacity: value
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
																	textColor: nextTextColor
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
																	borderColor: value
																} )
															}
															onOpacityChange={ ( value ) =>
																setAttributes( {
																	borderColorOpacity: value
																} )
															}
														/>
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
																	backgroundColorHover: nextBackgroundColorHover
																} )
															}
															onOpacityChange={ ( value ) =>
																setAttributes( {
																	backgroundColorHoverOpacity: value
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
																	textColorHover: nextTextColorHover
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
																	borderColorHover: value
																} )
															}
															onOpacityChange={ ( value ) =>
																setAttributes( {
																	borderColorHoverOpacity: value
																} )
															}
														/>
													</Fragment>
												) }
											</div>
										);
									}
								}
							</TabPanel>
						</PanelBody>
					}

					{ 'desktop' === selectedDevice &&
						<PanelBody
							title={ __( 'Background Gradient' ) }
							initialOpen={ false }
							icon={ getIcon( 'gradients' ) }
							className={ 'gblocks-panel-label' }
						>
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
						</PanelBody>
					}

					<PanelBody
						title={ __( 'Icon', 'generateblocks' ) }
						initialOpen={ false }
						icon={ getIcon( 'icons' ) }
						className={ 'gblocks-panel-label' }
						>

						{ 'desktop' === selectedDevice &&
							<IconPicker { ...this.props }
								attrIcon={ 'icon' }
								attrIconLocation={ 'iconLocation' }
								attrRemoveText={ 'removeText' }
								attrAriaLabel={ 'ariaLabel' }
								locationOptions={ [
									{ label: __( 'Left', 'generateblocks' ), value: 'left' },
									{ label: __( 'Right', 'generateblocks' ), value: 'right' },
								] }
							/>
						}

						{ 'desktop' === selectedDevice && (
							<Fragment>
								{ ! removeText ? (
									<Fragment>
										<DimensionsControl { ...this.props }
											type={ 'padding' }
											label={ __( 'Padding', 'generateblocks' ) }
											attrTop={ 'iconPaddingTop' }
											attrRight={ 'iconPaddingRight' }
											attrBottom={ 'iconPaddingBottom' }
											attrLeft={ 'iconPaddingLeft' }
											attrUnit={ 'iconPaddingUnit' }
											attrSyncUnits={ 'iconPaddingSyncUnits' }
										/>

										<RangeControl
											label={ __( 'Icon Size', 'generateblocks' ) }
											value={ iconSize ? iconSize : '' }
											onChange={ ( value ) => setAttributes( {
												iconSize: value
											} ) }
											min={ .1 }
											max={ 15 }
											step={ .1 }
											initialPosition={ generateBlocksDefaults.headline.iconSize }
											allowReset={ true }
										/>
									</Fragment>
								) : (
									<Fragment>
										<DimensionsControl { ...this.props }
											type={ 'padding' }
											label={ __( 'Padding', 'generateblocks' ) }
											attrTop={ 'paddingTop' }
											attrRight={ 'paddingRight' }
											attrBottom={ 'paddingBottom' }
											attrLeft={ 'paddingLeft' }
											attrUnit={ 'paddingUnit' }
											attrSyncUnits={ 'paddingSyncUnits' }
										/>

										<TypographyControls { ...this.props }
											showFontSize={ true }
											disableAdvancedToggle={ true }
											defaultFontSize={ generateBlocksDefaults.button.fontSize }
											defaultFontSizeUnit={ generateBlocksDefaults.button.fontSizeUnit }
										/>
									</Fragment>
								) }
							</Fragment>
						) }

						{ 'tablet' === selectedDevice &&
							<Fragment>
								{ ! removeText ? (
									<Fragment>
										<DimensionsControl { ...this.props }
											type={ 'padding' }
											label={ __( 'Padding', 'generateblocks' ) }
											attrTop={ 'iconPaddingTopTablet' }
											attrRight={ 'iconPaddingRightTablet' }
											attrBottom={ 'iconPaddingBottomTablet' }
											attrLeft={ 'iconPaddingLeftTablet' }
											attrUnit={ 'iconPaddingUnit' }
											attrSyncUnits={ 'iconPaddingSyncUnits' }
										/>

										<RangeControl
											label={ __( 'Icon Size', 'generateblocks' ) }
											value={ iconSizeTablet || '' }
											onChange={ ( value ) => setAttributes( {
												iconSizeTablet: value
											} ) }
											min={ .1 }
											max={ 15 }
											step={ .1 }
											initialPosition={ generateBlocksDefaults.headline.iconSizeTablet }
											allowReset={ true }
										/>
									</Fragment>
								) : (
									<Fragment>
										<DimensionsControl { ...this.props }
											type={ 'padding' }
											label={ __( 'Padding', 'generateblocks' ) }
											attrTop={ 'paddingTopTablet' }
											attrRight={ 'paddingRightTablet' }
											attrBottom={ 'paddingBottomTablet' }
											attrLeft={ 'paddingLeftTablet' }
											attrUnit={ 'paddingUnit' }
											attrSyncUnits={ 'paddingSyncUnits' }
										/>

										<TypographyControls { ...this.props }
											device={ 'Tablet' }
											showFontSize={ true }
											disableAdvancedToggle={ true }
											defaultFontSize={ generateBlocksDefaults.button.fontSizeTablet }
											defaultFontSizeUnit={ generateBlocksDefaults.button.fontSizeUnit }
										/>
									</Fragment>
								) }
							</Fragment>
						}

						{ 'mobile' === selectedDevice && (
							<Fragment>
								{ ! removeText ? (
									<Fragment>
										<DimensionsControl { ...this.props }
											type={ 'padding' }
											label={ __( 'Padding', 'generateblocks' ) }
											attrTop={ 'iconPaddingTopMobile' }
											attrRight={ 'iconPaddingRightMobile' }
											attrBottom={ 'iconPaddingBottomMobile' }
											attrLeft={ 'iconPaddingLeftMobile' }
											attrUnit={ 'iconPaddingUnit' }
											attrSyncUnits={ 'iconPaddingSyncUnits' }
										/>

										<RangeControl
											label={ __( 'Icon Size', 'generateblocks' ) }
											value={ iconSizeMobile ? iconSizeMobile : '' }
											onChange={ ( value ) => setAttributes( {
												iconSizeMobile: value
											} ) }
											min={ .1 }
											max={ 15 }
											step={ .1 }
											initialPosition={ generateBlocksDefaults.headline.iconSizeMobile }
											allowReset={ true }
										/>
									</Fragment>
								) : (
									<Fragment>
										<DimensionsControl { ...this.props }
											type={ 'padding' }
											label={ __( 'Padding', 'generateblocks' ) }
											attrTop={ 'paddingTopMobile' }
											attrRight={ 'paddingRightMobile' }
											attrBottom={ 'paddingBottomMobile' }
											attrLeft={ 'paddingLeftMobile' }
											attrUnit={ 'paddingUnit' }
											attrSyncUnits={ 'paddingSyncUnits' }
										/>

										<TypographyControls { ...this.props }
											device={ 'Mobile' }
											showFontSize={ true }
											disableAdvancedToggle={ true }
											defaultFontSize={ generateBlocksDefaults.button.fontSizeMobile }
											defaultFontSizeUnit={ generateBlocksDefaults.button.fontSizeUnit }
										/>
									</Fragment>
								) }
							</Fragment>
						) }
					</PanelBody>

					{ 'desktop' === selectedDevice &&
						<PanelBody
							title={ __( 'Advanced', 'generateblocks' ) }
							initialOpen={ false }
							icon={ getIcon( 'advanced' ) }
							className={ 'gblocks-panel-label' }
						>
							<TextControl
								label={ __( 'Element ID', 'generateblocks' ) }
								value={ elementId }
								onChange={ ( elementId ) => {
									elementId = elementId.replace( ELEMENT_ID_REGEX, '-' );
									setAttributes( { elementId } );
								} }
							/>

							<TextControl
								label={ __( 'CSS Classes', 'generateblocks' ) }
								value={ cssClasses }
								onChange={ ( cssClasses ) => { setAttributes( { cssClasses } ) } }
							/>
						</PanelBody>
					}

					<PanelBody
						title={ __( 'Documentation', 'generateblocks' ) }
						icon={ getIcon( 'documentation' ) }
						initialOpen={ false }
						className={ 'gblocks-panel-label' }
					>
						<p>{ __( 'Need help with this block?', 'generateblocks' ) }</p>
						<a href="https://docs.generateblocks.com/collection/buttons/" target="_blank" rel="noreferrer noopener">{ __( 'Visit our documentation', 'generateblocks' ) }</a>
					</PanelBody>
				</InspectorControls>

				<DesktopCSS { ...this.props } />

				{ fontFamily && googleFont &&
					<link
						rel="stylesheet"
						href={ `https://fonts.googleapis.com/css?family=` + fontFamily.replace( / /g, '+' ) + googleFontsAttr }
					/>
				}

				<a
					id={ !! elementId ? elementId : undefined }
					className={ classnames( {
						'gb-button': true,
						[`gb-button-${ uniqueId }`]: true,
						[`${ cssClasses }`]: '' !== cssClasses
					} ) }
					href={ !! url ? url : undefined }
					target={ !! target ? '_blank' : undefined }
					rel={ relAttributes && relAttributes.length > 0 ? relAttributes.join( ' ' ) : undefined }
					aria-label={ !! removeText && !! ariaLabel ? ariaLabel : undefined }
				>
					{ icon && 'left' === iconLocation &&
						<span
							className="gb-icon"
							dangerouslySetInnerHTML={ { __html: sanitizeSVG( icon ) } }
						/>
					}
					{ ! removeText &&
						<span className={ 'button-text' }>
							<RichText
								placeholder={ __( 'Add text…', 'generateblocks' ) }
								value={ text }
								onChange={ ( value ) => setAttributes( { text: value } ) }
								allowedFormats={ [ 'core/bold', 'core/italic', 'core/strikethrough' ] }
								isSelected={ isSelected }
								keepPlaceholderOnFocus
							/>
						</span>
					}
					{ icon && 'right' === iconLocation &&
						<span
							className="gb-icon"
							dangerouslySetInnerHTML={ { __html: sanitizeSVG( icon ) } }
						/>
					}
				</a>
				{ isSelected &&
                    <URLInput
                        url={ url }
                        target={ target }
                        relNoFollow={ relNoFollow }
						relSponsored={ relSponsored }
                        onChange={ ( data ) => {
                            setAttributes( data );
                        } }
                        autoFocus={ false }
                        className="gblocks-component-url-input-float"
                    />
                }
			</Fragment>
		);
	}
}

export default ( GenerateBlockButton );
