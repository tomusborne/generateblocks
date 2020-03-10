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
import getIcon from '../../utils/get-icon';

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
	IconButton,
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
			toggleSelection,
			instanceId,
			isSelected,
			clientId,
		} = this.props;

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

		let borderStyleValue = '',
			removeIconPadding = '',
			fontFamilyFallbackValue = '',
			backgroundImageValue,
			gradientColorStopOneValue = '',
			gradientColorStopTwoValue = '';

		if ( gradient ) {
			if ( gradientColorOne && '' !== gradientColorStopOne ) {
				gradientColorStopOneValue = ' ' + gradientColorStopOne + '%';
			}

			if ( gradientColorTwo && '' !== gradientColorStopTwo ) {
				gradientColorStopTwoValue = ' ' + gradientColorStopTwo + '%';
			}
		}

		if ( gradient ) {
			backgroundImageValue = 'linear-gradient(' + gradientDirection + 'deg, ' + hexToRGBA( gradientColorOne, gradientColorOneOpacity ) + gradientColorStopOneValue + ', ' + hexToRGBA( gradientColorTwo, gradientColorTwoOpacity ) + gradientColorStopTwoValue + ');';
		}

		if ( borderSizeTop || borderSizeRight || borderSizeBottom || borderSizeLeft ) {
			borderStyleValue = 'solid';
		}

		if ( fontFamily && fontFamilyFallback ) {
			fontFamilyFallbackValue = ', ' + fontFamilyFallback;
		}

		if ( removeText ) {
			removeIconPadding = 'padding: 0;';
		}

		const css = `
			.block-editor-block-list__block a.gb-button-` + uniqueId + ` {
				background-color: ` + hexToRGBA( backgroundColor, backgroundColorOpacity ) + `;
				background-image: ` + backgroundImageValue + `;
				color: ` + textColor + `;
				padding-top: ` + paddingTop + paddingUnit + `;
				padding-right: ` + paddingRight + paddingUnit + `;
				padding-bottom: ` + paddingBottom + paddingUnit + `;
				padding-left: ` + paddingLeft + paddingUnit + `;
				border-top-left-radius: ` + borderRadiusTopLeft + borderRadiusUnit + `;
				border-top-right-radius: ` + borderRadiusTopRight + borderRadiusUnit + `;
				border-bottom-right-radius: ` + borderRadiusBottomRight + borderRadiusUnit + `;
				border-bottom-left-radius: ` + borderRadiusBottomLeft + borderRadiusUnit + `;
				font-family: ` + fontFamily + fontFamilyFallbackValue + `;
				font-weight: ` + fontWeight + `;
				text-transform: ` + textTransform + `;
				font-size: ` + fontSize + fontSizeUnit + `;
				letter-spacing: ` + letterSpacing + `em;
				border-width: 0;
				border-top-width: ` + borderSizeTop + `px;
				border-right-width: ` + borderSizeRight + `px;
				border-bottom-width: ` + borderSizeBottom + `px;
				border-left-width: ` + borderSizeLeft + `px;
				border-style: ` + borderStyleValue + `;
				border-color: ` + hexToRGBA( borderColor, borderColorOpacity ) + `;
				text-transform: ` + textTransform + `;
				margin-top: ` + marginTop + marginUnit + `;
				margin-right: ` + marginRight + marginUnit + `;
				margin-bottom: ` + marginBottom + marginUnit + `;
				margin-left: ` + marginLeft + marginUnit + `;
			}

			.block-editor-block-list__block a.gb-button-` + uniqueId + `:hover,
			.block-editor-block-list__block a.gb-button-` + uniqueId + `:focus,
			.block-editor-block-list__block a.gb-button-` + uniqueId + `:active {
				background-color: ` + hexToRGBA( backgroundColorHover, backgroundColorHoverOpacity ) + `;
				color: ` + textColorHover + `;
				border-color: ` + hexToRGBA( borderColorHover, borderColorHoverOpacity ) + `;
			}

			.block-editor-block-list__block a.gb-button-` + uniqueId + ` .gb-icon {
				padding-top: ` + iconPaddingTop + iconPaddingUnit + `;
				padding-right: ` + iconPaddingRight + iconPaddingUnit + `;
				padding-bottom: ` + iconPaddingBottom + iconPaddingUnit + `;
				padding-left: ` + iconPaddingLeft + iconPaddingUnit + `;
				` + removeIconPadding + `
				font-size: ` + iconSize + `em;
			}
		`

		jQuery( '.gb-button' ).on( 'click', function( e ) {
			e.preventDefault();
		} );

		const sanitizeSVG = ( svg ) => {
			return DOMPurify.sanitize( svg, { USE_PROFILES: { svg: true, svgFilters: true } } );
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

		const googleFontsAttr = ':100,100italic,200,200italic,300,300italic,400,400italic,500,500italic,600,600italic,700,700italic,800,800italic,900,900italic';

		return (
			<Fragment>
				<BlockControls>
					<Toolbar>
						<Tooltip text={ __( 'Add Button', 'generateblocks' ) }>
							<IconButton
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
					<PanelBody
						title={ __( 'Typography', 'generateblocks' ) }
						initialOpen={ true }
						icon={ getIcon( 'typography' ) }
						className={ 'gblocks-panel-label' }
						>
						<TabPanel className="grid-tab-panel gblocks-control-tabs"
							activeClass="active-tab"
							tabs={ [
								{
									name: 'default',
									title: __( 'Default', 'generateblocks' ),
									className: 'default',
								},
								{
									name: 'tablet',
									title: __( 'Tablet', 'generateblocks' ),
									className: 'tablet',
								},
								{
									name: 'mobile',
									title: __( 'Mobile', 'generateblocks' ),
									className: 'mobile',
								},
							] }>
							{
								( tab ) => {
									return (
										<div>
											{ 'default' === tab.name && (
												<Fragment>
													<TypographyControls { ...this.props }
														valueFontFamily={ fontFamily }
														valueFontFamilyFallback={ fontFamilyFallback }
														valueFontWeight={ fontWeight }
														valueGoogleFont={ googleFont }
														valueTextTransform={ textTransform }
														valueFontSize={ fontSize }
														valueFontSizeUnit={ fontSizeUnit }
														valueLetterSpacing={ letterSpacing }
														valueShowAdvancedTypography={ showAdvancedTypography }
														attrFontFamily={ 'fontFamily' }
														attrFontFamilyFallback={ 'fontFamilyFallback' }
														attrGoogleFont={ 'googleFont' }
														attrFontWeight={ 'fontWeight' }
														attrTextTransform={ 'textTransform' }
														attrFontSize={ 'fontSize' }
														attrFontSizeUnit={ 'fontSizeUnit' }
														attrLineHeight={ 'disable' }
														attrLetterSpacing={ 'letterSpacing' }
														attrShowAdvancedTypography={ 'showAdvancedTypography' }
														defaultFontSize={ generateBlocksDefaults.button.fontSize }
														defaultFontSizeUnit={ generateBlocksDefaults.button.fontSizeUnit }
														defaultLetterSpacing={ generateBlocksDefaults.button.letterSpacing }
														uniqueId={ uniqueId }
													/>
												</Fragment>
											) }

											{ 'tablet' === tab.name && (
												<Fragment>
													<TypographyControls { ...this.props }
														valueFontSize={ fontSizeTablet }
														valueFontSizeUnit={ fontSizeUnit }
														valueLetterSpacing={ letterSpacingTablet }
														valueShowAdvancedTypography={ showAdvancedTypography }
														attrFontSize={ 'fontSizeTablet' }
														attrFontSizeUnit={ 'fontSizeUnit' }
														attrLineHeight={ 'disable' }
														attrLetterSpacing={ 'letterSpacingTablet' }
														attrShowAdvancedTypography={ 'showAdvancedTypography' }
														defaultFontSize={ generateBlocksDefaults.button.fontSizeTablet }
														defaultFontSizeUnit={ generateBlocksDefaults.button.fontSizeUnit }
														defaultLetterSpacing={ generateBlocksDefaults.button.letterSpacingTablet }
														uniqueId={ uniqueId }
													/>
												</Fragment>
											) }

											{ 'mobile' === tab.name && (
												<Fragment>
													<TypographyControls { ...this.props }
														valueFontSize={ fontSizeMobile }
														valueFontSizeUnit={ fontSizeUnit }
														valueLetterSpacing={ letterSpacingMobile }
														valueShowAdvancedTypography={ showAdvancedTypography }
														attrFontSize={ 'fontSizeMobile' }
														attrFontSizeUnit={ 'fontSizeUnit' }
														attrLineHeight={ 'disable' }
														attrLetterSpacing={ 'letterSpacingMobile' }
														attrShowAdvancedTypography={ 'showAdvancedTypography' }
														defaultFontSize={ generateBlocksDefaults.button.fontSizeMobile }
														defaultFontSizeUnit={ generateBlocksDefaults.button.fontSizeUnit }
														defaultLetterSpacing={ generateBlocksDefaults.button.letterSpacingMobile }
														uniqueId={ uniqueId }
													/>
												</Fragment>
											) }
										</div>
									);
								}
							}
						</TabPanel>
					</PanelBody>

					<PanelBody
						title={ __( 'Spacing', 'generateblocks' ) }
						initialOpen={ false }
						icon={ getIcon( 'spacing' ) }
						className={ 'gblocks-panel-label' }
						>
						<TabPanel className="grid-tab-panel gblocks-control-tabs"
							activeClass="active-tab"
							tabs={ [
								{
									name: 'grid-default',
									title: __( 'Default', 'generateblocks' ),
									className: 'grid-default',
								},
								{
									name: 'grid-tablet',
									title: __( 'Tablet', 'generateblocks' ),
									className: 'grid-tablet',
								},
								{
									name: 'grid-mobile',
									title: __( 'Mobile', 'generateblocks' ),
									className: 'grid-mobile',
								},
							] }>
							{
								( tab ) => {
									return (
										<div>
											{ 'grid-default' === tab.name && (
												<Fragment>
													<DimensionsControl { ...this.props }
														type={ 'padding' }
														label={ __( 'Padding', 'generateblocks' ) }
														valueTop={ paddingTop }
														valueRight={ paddingRight }
														valueBottom={ paddingBottom }
														valueLeft={ paddingLeft }
														valueUnit={ paddingUnit }
														syncUnits={ paddingSyncUnits }
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
														valueTop={ marginTop }
														valueRight={ marginRight }
														valueBottom={ marginBottom }
														valueLeft={ marginLeft }
														valueUnit={ marginUnit }
														syncUnits={ marginSyncUnits }
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
														valueTop={ borderSizeTop }
														valueRight={ borderSizeRight }
														valueBottom={ borderSizeBottom }
														valueLeft={ borderSizeLeft }
														//unit={ paddingUnit }
														syncUnits={ borderSizeSyncUnits }
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
														valueTop={ borderRadiusTopLeft }
														valueRight={ borderRadiusTopRight }
														valueBottom={ borderRadiusBottomRight }
														valueLeft={ borderRadiusBottomLeft }
														valueUnit={ borderRadiusUnit }
														syncUnits={ borderRadiusSyncUnits }
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

											{ 'grid-tablet' === tab.name && (
												<Fragment>
													<DimensionsControl { ...this.props }
														type={ 'padding' }
														label={ __( 'Padding', 'generateblocks' ) }
														valueTop={ paddingTopTablet }
														valueRight={ paddingRightTablet }
														valueBottom={ paddingBottomTablet }
														valueLeft={ paddingLeftTablet }
														valueUnit={ paddingUnit }
														syncUnits={ paddingSyncUnits }
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
														valueTop={ marginTopTablet }
														valueRight={ marginRightTablet }
														valueBottom={ marginBottomTablet }
														valueLeft={ marginLeftTablet }
														valueUnit={ marginUnit }
														syncUnits={ marginSyncUnits }
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
														valueTop={ borderSizeTopTablet }
														valueRight={ borderSizeRightTablet }
														valueBottom={ borderSizeBottomTablet }
														valueLeft={ borderSizeLeftTablet }
														//unit={ paddingUnit }
														syncUnits={ borderSizeSyncUnits }
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
														valueTop={ borderRadiusTopLeftTablet }
														valueRight={ borderRadiusTopRightTablet }
														valueBottom={ borderRadiusBottomRightTablet }
														valueLeft={ borderRadiusBottomLeftTablet }
														valueUnit={ borderRadiusUnit }
														syncUnits={ borderRadiusSyncUnits }
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

											{ 'grid-mobile' === tab.name && (
												<Fragment>
													<DimensionsControl { ...this.props }
														type={ 'padding' }
														label={ __( 'Padding', 'generateblocks' ) }
														valueTop={ paddingTopMobile }
														valueRight={ paddingRightMobile }
														valueBottom={ paddingBottomMobile }
														valueLeft={ paddingLeftMobile }
														valueUnit={ paddingUnit }
														syncUnits={ paddingSyncUnits }
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
														valueTop={ marginTopMobile }
														valueRight={ marginRightMobile }
														valueBottom={ marginBottomMobile }
														valueLeft={ marginLeftMobile }
														valueUnit={ marginUnit }
														syncUnits={ marginSyncUnits }
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
														valueTop={ borderSizeTopMobile }
														valueRight={ borderSizeRightMobile }
														valueBottom={ borderSizeBottomMobile }
														valueLeft={ borderSizeLeftMobile }
														syncUnits={ borderSizeSyncUnits }
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
														valueTop={ borderRadiusTopLeftMobile }
														valueRight={ borderRadiusTopRightMobile }
														valueBottom={ borderRadiusBottomRightMobile }
														valueLeft={ borderRadiusBottomLeftMobile }
														valueUnit={ borderRadiusUnit }
														syncUnits={ borderRadiusSyncUnits }
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
										</div>
									);
								}
							}
						</TabPanel>
					</PanelBody>

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
														onChange={ ( nextBackgroundColor ) =>
															setAttributes( {
																backgroundColor: nextBackgroundColor
															} )
														}
														alpha={ true }
														valueOpacity={ backgroundColorOpacity }
														attrOpacity={ 'backgroundColorOpacity' }
														onOpacityChange={ ( value ) =>
															setAttributes( {
																backgroundColorOpacity: value
															} )
														}
														key="buttonBackgroundColor"
													/>

													<ColorPicker
														label={ __( 'Text Color', 'generateblocks' ) }
														value={ textColor }
														onChange={ ( nextTextColor ) =>
															setAttributes( {
																textColor: nextTextColor
															} )
														}
														alpha={ false }
														key="buttonTextColor"
													/>

													<ColorPicker
														label={ __( 'Border Color', 'generateblocks' ) }
														value={ borderColor }
														onChange={ ( value ) =>
															setAttributes( {
																borderColor: value
															} )
														}
														alpha={ true }
														valueOpacity={ borderColorOpacity }
														attrOpacity={ 'borderColorOpacity' }
														onOpacityChange={ ( value ) =>
															setAttributes( {
																borderColorOpacity: value
															} )
														}
														key="buttonBorderColor"
													/>
												</Fragment>

											) : (

												<Fragment>
													<ColorPicker
														label={ __( 'Background Color', 'generateblocks' ) }
														value={ backgroundColorHover }
														onChange={ ( nextBackgroundColorHover ) =>
															setAttributes( {
																backgroundColorHover: nextBackgroundColorHover
															} )
														}
														alpha={ true }
														valueOpacity={ backgroundColorHoverOpacity }
														attrOpacity={ 'backgroundColorHoverOpacity' }
														onOpacityChange={ ( value ) =>
															setAttributes( {
																backgroundColorHoverOpacity: value
															} )
														}
														key="buttonBackgroundColorHover"
													/>

													<ColorPicker
														label={ __( 'Text Color', 'generateblocks' ) }
														value={ textColorHover }
														onChange={ ( nextTextColorHover ) =>
															setAttributes( {
																textColorHover: nextTextColorHover
															} )
														}
														alpha={ false }
														key="buttonTextColorHover"
													/>

													<ColorPicker
														label={ __( 'Border Color', 'generateblocks' ) }
														value={ borderColorHover }
														onChange={ ( value ) =>
															setAttributes( {
																borderColorHover: value
															} )
														}
														alpha={ true }
														valueOpacity={ borderColorHoverOpacity }
														attrOpacity={ 'borderColorHoverOpacity' }
														onOpacityChange={ ( value ) =>
															setAttributes( {
																borderColorHoverOpacity: value
															} )
														}
														key="buttonBorderColorHover"
													/>
												</Fragment>
											) }
										</div>
									);
								}
							}
						</TabPanel>
					</PanelBody>

					<PanelBody
						title={ __( 'Background Gradient' ) }
						initialOpen={ false }
						icon={ getIcon( 'gradients' ) }
						className={ 'gblocks-panel-label' }
					>
						<GradientControl { ...this.props }
							valueGradient={ gradient }
							valueGradientDirection={ gradientDirection }
							valueGradientColorOne={ gradientColorOne }
							valueGradientColorOneOpacity={ gradientColorOneOpacity }
							valueGradientColorStopOne={ gradientColorStopOne }
							valueGradientColorTwo={ gradientColorTwo }
							valueGradientColorTwoOpacity={ gradientColorTwoOpacity }
							valueGradientColorStopTwo={ gradientColorStopTwo }
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

					<PanelBody
						title={ __( 'Icon', 'generateblocks' ) }
						initialOpen={ false }
						icon={ getIcon( 'icons' ) }
						className={ 'gblocks-panel-label' }
						>

						<IconPicker { ...this.props }
							valueIcon={ icon }
							attrIcon={ 'icon' }
							valueIconLocation={ iconLocation }
							attrIconLocation={ 'iconLocation' }
							locationOptions={ [
								{ label: __( 'Left', 'generateblocks' ), value: 'left' },
								{ label: __( 'Right', 'generateblocks' ), value: 'right' },
							] }
							valueRemoveText={ removeText }
							attrRemoveText={ 'removeText' }
							valueAriaLabel={ ariaLabel }
							attrAriaLabel={ 'ariaLabel' }
						/>

						<TabPanel className="headline-tab-panel gblocks-control-tabs"
							activeClass="active-tab"
							tabs={ [
								{
									name: 'default',
									title: __( 'Default', 'generateblocks' ),
									className: 'default',
								},
								{
									name: 'tablet',
									title: __( 'Tablet', 'generateblocks' ),
									className: 'tablet',
								},
								{
									name: 'mobile',
									title: __( 'Mobile', 'generateblocks' ),
									className: 'mobile',
								},
							] }>
							{
								( tab ) => {
									return (
										<div>
											{ 'default' === tab.name && (
												<Fragment>
													{ ! removeText &&
														<DimensionsControl { ...this.props }
															type={ 'padding' }
															label={ __( 'Padding', 'generateblocks' ) }
															valueTop={ iconPaddingTop }
															valueRight={ iconPaddingRight }
															valueBottom={ iconPaddingBottom }
															valueLeft={ iconPaddingLeft }
															valueUnit={ iconPaddingUnit }
															syncUnits={ iconPaddingSyncUnits }
															attrTop={ 'iconPaddingTop' }
															attrRight={ 'iconPaddingRight' }
															attrBottom={ 'iconPaddingBottom' }
															attrLeft={ 'iconPaddingLeft' }
															attrUnit={ 'iconPaddingUnit' }
															attrSyncUnits={ 'iconPaddingSyncUnits' }
														/>
													}

													<RangeControl
														label={ __( 'Icon Size', 'generateblocks' ) }
														value={ iconSize ? iconSize : '' }
														onChange={ ( value ) => setAttributes( {
															iconSize: parseFloat( value )
														} ) }
														min={ .1 }
														max={ 15 }
														step={ .1 }
														initialPosition={ generateBlocksDefaults.headline.iconSize }
													/>
												</Fragment>
											) }

											{ 'tablet' === tab.name && (
												<Fragment>
													{ ! removeText &&
														<DimensionsControl { ...this.props }
															type={ 'padding' }
															label={ __( 'Padding', 'generateblocks' ) }
															valueTop={ iconPaddingTopTablet }
															valueRight={ iconPaddingRightTablet }
															valueBottom={ iconPaddingBottomTablet }
															valueLeft={ iconPaddingLeftTablet }
															valueUnit={ iconPaddingUnit }
															syncUnits={ iconPaddingSyncUnits }
															attrTop={ 'iconPaddingTopTablet' }
															attrRight={ 'iconPaddingRightTablet' }
															attrBottom={ 'iconPaddingBottomTablet' }
															attrLeft={ 'iconPaddingLeftTablet' }
															attrUnit={ 'iconPaddingUnit' }
															attrSyncUnits={ 'iconPaddingSyncUnits' }
														/>
													}

													<RangeControl
														label={ __( 'Icon Size', 'generateblocks' ) }
														value={ parseFloat( iconSizeTablet ) }
														onChange={ ( value ) => setAttributes( { iconSizeTablet: parseFloat( value ) } ) }
														min={ .1 }
														max={ 15 }
														step={ .1 }
														initialPosition={ generateBlocksDefaults.headline.iconSizeTablet }
													/>
												</Fragment>
											) }

											{ 'mobile' === tab.name && (
												<Fragment>
													{ ! removeText &&
														<DimensionsControl { ...this.props }
															type={ 'padding' }
															label={ __( 'Padding', 'generateblocks' ) }
															valueTop={ iconPaddingTopMobile }
															valueRight={ iconPaddingRightMobile }
															valueBottom={ iconPaddingBottomMobile }
															valueLeft={ iconPaddingLeftMobile }
															valueUnit={ iconPaddingUnit }
															syncUnits={ iconPaddingSyncUnits }
															attrTop={ 'iconPaddingTopMobile' }
															attrRight={ 'iconPaddingRightMobile' }
															attrBottom={ 'iconPaddingBottomMobile' }
															attrLeft={ 'iconPaddingLeftMobile' }
															attrUnit={ 'iconPaddingUnit' }
															attrSyncUnits={ 'iconPaddingSyncUnits' }
														/>
													}

													<RangeControl
														label={ __( 'Icon Size', 'generateblocks' ) }
														value={ iconSize ? iconSize : '' }
														onChange={ ( value ) => setAttributes( {
															iconSizeMobile: parseFloat( value )
														} ) }
														min={ .1 }
														max={ 15 }
														step={ .1 }
														initialPosition={ generateBlocksDefaults.headline.iconSizeMobile }
													/>
												</Fragment>
											) }
										</div>
									);
								}
							}
						</TabPanel>
					</PanelBody>

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

				<style>{ css }</style>

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
