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
import PanelArea from '../../components/panel-area/';
import getIcon from '../../utils/get-icon';
import DesktopCSS from './css/desktop.js';
import sanitizeSVG from '../../utils/sanitize-svg';

const { __, _x } = wp.i18n; // Import __() from wp.i18n
const {
	TabPanel,
	BaseControl,
	TextControl,
	RangeControl,
	SelectControl,
	ToggleControl,
	Toolbar,
	Tooltip,
	Button,
	ButtonGroup,
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

const {
	applyFilters
} = wp.hooks;

const ELEMENT_ID_REGEX = /[\s#]/g;
const gbButtonIds = [];

class GenerateBlockButton extends Component {
	constructor() {
		super( ...arguments );

		this.getFontSizePlaceholder = this.getFontSizePlaceholder.bind( this );

		this.state = {
            selectedDevice: 'desktop',
			fontSizePlaceholder: '17',
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

		const tempFontSizePlaceholder = this.getFontSizePlaceholder();

		if ( tempFontSizePlaceholder !== this.state.fontSizePlaceholder ) {
			this.setState( {
				fontSizePlaceholder: tempFontSizePlaceholder,
			} );
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

	render() {
		const {
			attributes,
			setAttributes,
			isSelected,
			clientId,
		} = this.props;

		const {
            selectedDevice,
			fontSizePlaceholder,
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
			googleFontVariants,
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
			iconSizeUnit,
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

		let googleFontsAttr = '';

		if ( googleFontVariants ) {
			googleFontsAttr = ':' + googleFontVariants;
		}

		let unitSizes = [
			{
				name: _x( 'Pixel', 'A size unit for CSS markup', 'generateblocks' ),
				unitValue: 'px',
			},
			{
				name: _x( 'Em', 'A size unit for CSS markup', 'generateblocks' ),
				unitValue: 'em',
			},
		];

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

					<PanelArea { ...this.props }
						title={ __( 'Typography', 'generateblocks' ) }
						initialOpen={ false }
						icon={ getIcon( 'typography' ) }
						className={ 'gblocks-panel-label' }
						id={ 'buttonTypography' }
						state={ this.state }
						showPanel={ ! removeText || false }
						>

							{ 'desktop' === selectedDevice && (
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

							{ 'desktop' === selectedDevice && (
								<Fragment>
									<DimensionsControl { ...this.props }
										device={ selectedDevice }
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
										device={ selectedDevice }
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
										device={ selectedDevice }
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
										device={ selectedDevice }
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
										device={ selectedDevice }
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
										device={ selectedDevice }
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
										device={ selectedDevice }
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
										device={ selectedDevice }
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
										device={ selectedDevice }
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
										device={ selectedDevice }
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
										device={ selectedDevice }
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
										device={ selectedDevice }
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

							{ applyFilters( 'generateblocks.editor.controls', '', 'buttonSpacing', this.props, this.state ) }
					</PanelArea>

					<PanelArea { ...this.props }
						title={ __( 'Colors', 'generateblocks' ) }
						initialOpen={ false }
						icon={ getIcon( 'colors' ) }
						className={ 'gblocks-panel-label' }
						id={ 'buttonColors' }
						state={ this.state }
						showPanel={ 'desktop' === selectedDevice || false }
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

													{ applyFilters( 'generateblocks.editor.controls', '', 'buttonColorsNormal', this.props, this.state ) }
												</Fragment>
											) }
										</div>
									);
								}
							}
						</TabPanel>

						{ applyFilters( 'generateblocks.editor.controls', '', 'buttonColors', this.props, this.state ) }
					</PanelArea>

					<PanelArea { ...this.props }
						title={ __( 'Background Gradient' ) }
						initialOpen={ false }
						icon={ getIcon( 'gradients' ) }
						className={ 'gblocks-panel-label' }
						id={ 'buttonBackgroundGradient' }
						state={ this.state }
						showPanel={ 'desktop' === selectedDevice || false }
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

						{ applyFilters( 'generateblocks.editor.controls', '', 'buttonBackgroundGradient', this.props, this.state ) }
					</PanelArea>

					<PanelArea { ...this.props }
						title={ __( 'Icon', 'generateblocks' ) }
						initialOpen={ false }
						icon={ getIcon( 'icons' ) }
						className={ 'gblocks-panel-label' }
						id={ 'buttonIcon' }
						state={ this.state }
						showPanel={ 'desktop' === selectedDevice || !! icon ? true : false }
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

						{ 'desktop' === selectedDevice && !! icon && (
							<Fragment>
								{ ! removeText &&
									<Fragment>
										<DimensionsControl { ...this.props }
											device={ selectedDevice }
											type={ 'padding' }
											label={ __( 'Padding', 'generateblocks' ) }
											attrTop={ 'iconPaddingTop' }
											attrRight={ 'iconPaddingRight' }
											attrBottom={ 'iconPaddingBottom' }
											attrLeft={ 'iconPaddingLeft' }
											attrUnit={ 'iconPaddingUnit' }
											attrSyncUnits={ 'iconPaddingSyncUnits' }
										/>
									</Fragment>
								}

								<div className="components-gblocks-typography-control__header">
									<div className="components-gblocks-typography-control__label components-base-control__label">
										{ __( 'Icon Size', 'generateblocks' ) }
									</div>

									<div className="components-gblocks-control__units">
										<ButtonGroup className="components-gblocks-typography-control__units" aria-label={ __( 'Select Units', 'generateblocks' ) }>
											{ unitSizes.map( ( unit, i ) =>
												/* translators: %s: values associated with CSS syntax, 'Pixel', 'Em', 'Percentage' */
												<Tooltip text={ sprintf( __( '%s Units', 'generateblocks' ), unit.name ) } key={ unit.unitValue }>
													<Button
														key={ unit.unitValue }
														className={ 'components-gblocks-typography-control__units--' + unit.name }
														isSmall
														isPrimary={ iconSizeUnit === unit.unitValue }
														aria-pressed={ iconSizeUnit === unit.unitValue }
														/* translators: %s: values associated with CSS syntax, 'Pixel', 'Em', 'Percentage' */
														aria-label={ sprintf( __( '%s Units', 'generateblocks' ), unit.name ) }
														onClick={ () => setAttributes( { 'iconSizeUnit': unit.unitValue } ) }
													>
														{ unit.unitValue }
													</Button>
												</Tooltip>
											) }
										</ButtonGroup>
									</div>
								</div>

								<div className="components-base-control components-gblocks-typography-control__inputs">
									<TextControl
										type={ 'number' }
										value={ iconSize || '' }
										step={ 'em' === iconSizeUnit ? .1 : 1 }
										onChange={ ( value ) => {
											setAttributes( {
												iconSize: value
											} );
										} }
										onBlur={ () => {
											setAttributes( {
												iconSize: parseFloat( iconSize )
											} );
										} }
									/>

									<Button
										isSmall
										isSecondary
										className="components-gblocks-default-number"
										onClick={ () => {
											setAttributes( {
												iconSize: generateBlocksDefaults.button.iconSize
											} );
										} }
									>
										{ __( 'Reset', 'generateblocks' ) }
									</Button>
								</div>
							</Fragment>
						) }

						{ 'tablet' === selectedDevice && !! icon &&
							<Fragment>
								{ ! removeText &&
									<Fragment>
										<DimensionsControl { ...this.props }
											device={ selectedDevice }
											type={ 'padding' }
											label={ __( 'Padding', 'generateblocks' ) }
											attrTop={ 'iconPaddingTopTablet' }
											attrRight={ 'iconPaddingRightTablet' }
											attrBottom={ 'iconPaddingBottomTablet' }
											attrLeft={ 'iconPaddingLeftTablet' }
											attrUnit={ 'iconPaddingUnit' }
											attrSyncUnits={ 'iconPaddingSyncUnits' }
										/>
									</Fragment>
								}

								<div className="components-gblocks-typography-control__header">
									<div className="components-gblocks-typography-control__label components-base-control__label">
										{ __( 'Icon Size', 'generateblocks' ) }
									</div>

									<div className="components-gblocks-control__units">
										<ButtonGroup className="components-gblocks-typography-control__units" aria-label={ __( 'Select Units', 'generateblocks' ) }>
											{ unitSizes.map( ( unit, i ) =>
												/* translators: %s: values associated with CSS syntax, 'Pixel', 'Em', 'Percentage' */
												<Tooltip text={ sprintf( __( '%s Units', 'generateblocks' ), unit.name ) } key={ unit.unitValue }>
													<Button
														key={ unit.unitValue }
														className={ 'components-gblocks-typography-control__units--' + unit.name }
														isSmall
														isPrimary={ iconSizeUnit === unit.unitValue }
														aria-pressed={ iconSizeUnit === unit.unitValue }
														/* translators: %s: values associated with CSS syntax, 'Pixel', 'Em', 'Percentage' */
														aria-label={ sprintf( __( '%s Units', 'generateblocks' ), unit.name ) }
														onClick={ () => setAttributes( { 'iconSizeUnit': unit.unitValue } ) }
													>
														{ unit.unitValue }
													</Button>
												</Tooltip>
											) }
										</ButtonGroup>
									</div>
								</div>

								<div className="components-base-control components-gblocks-typography-control__inputs">
									<TextControl
										type={ 'number' }
										value={ iconSizeTablet || '' }
										step={ 'em' === iconSizeUnit ? .1 : 1 }
										placeholder="1"
										onChange={ ( value ) => {
											setAttributes( {
												iconSizeTablet: value
											} );
										} }
										onBlur={ () => {
											setAttributes( {
												iconSizeTablet: parseFloat( iconSizeTablet )
											} );
										} }
									/>

									<Button
										isSmall
										isSecondary
										className="components-gblocks-default-number"
										onClick={ () => {
											setAttributes( {
												iconSizeTablet: generateBlocksDefaults.button.iconSizeTablet
											} );
										} }
									>
										{ __( 'Reset', 'generateblocks' ) }
									</Button>
								</div>
							</Fragment>
						}

						{ 'mobile' === selectedDevice && !! icon && (
							<Fragment>
								{ ! removeText &&
									<Fragment>
										<DimensionsControl { ...this.props }
											device={ selectedDevice }
											type={ 'padding' }
											label={ __( 'Padding', 'generateblocks' ) }
											attrTop={ 'iconPaddingTopMobile' }
											attrRight={ 'iconPaddingRightMobile' }
											attrBottom={ 'iconPaddingBottomMobile' }
											attrLeft={ 'iconPaddingLeftMobile' }
											attrUnit={ 'iconPaddingUnit' }
											attrSyncUnits={ 'iconPaddingSyncUnits' }
										/>
									</Fragment>
								}

								<div className="components-gblocks-typography-control__header">
									<div className="components-gblocks-typography-control__label components-base-control__label">
										{ __( 'Icon Size', 'generateblocks' ) }
									</div>

									<div className="components-gblocks-control__units">
										<ButtonGroup className="components-gblocks-typography-control__units" aria-label={ __( 'Select Units', 'generateblocks' ) }>
											{ unitSizes.map( ( unit, i ) =>
												/* translators: %s: values associated with CSS syntax, 'Pixel', 'Em', 'Percentage' */
												<Tooltip text={ sprintf( __( '%s Units', 'generateblocks' ), unit.name ) } key={ unit.unitValue }>
													<Button
														key={ unit.unitValue }
														className={ 'components-gblocks-typography-control__units--' + unit.name }
														isSmall
														isPrimary={ iconSizeUnit === unit.unitValue }
														aria-pressed={ iconSizeUnit === unit.unitValue }
														/* translators: %s: values associated with CSS syntax, 'Pixel', 'Em', 'Percentage' */
														aria-label={ sprintf( __( '%s Units', 'generateblocks' ), unit.name ) }
														onClick={ () => setAttributes( { 'iconSizeUnit': unit.unitValue } ) }
													>
														{ unit.unitValue }
													</Button>
												</Tooltip>
											) }
										</ButtonGroup>
									</div>
								</div>

								<div className="components-base-control components-gblocks-typography-control__inputs">
									<TextControl
										type={ 'number' }
										value={ iconSizeMobile || '' }
										step={ 'em' === iconSizeUnit ? .1 : 1 }
										placeholder="1"
										onChange={ ( value ) => {
											setAttributes( {
												iconSizeMobile: value
											} );
										} }
										onBlur={ () => {
											setAttributes( {
												iconSizeMobile: parseFloat( iconSizeMobile )
											} );
										} }
									/>

									<Button
										isSmall
										isSecondary
										className="components-gblocks-default-number"
										onClick={ () => {
											setAttributes( {
												iconSizeMobile: generateBlocksDefaults.button.iconSizeMobile
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
						title={ __( 'Advanced', 'generateblocks' ) }
						initialOpen={ false }
						icon={ getIcon( 'advanced' ) }
						className={ 'gblocks-panel-label' }
						id={ 'buttonAdvanced' }
						state={ this.state }
						showPanel={ 'desktop' === selectedDevice || false }
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

						{ applyFilters( 'generateblocks.editor.controls', '', 'buttonAdvanced', this.props, this.state ) }
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
