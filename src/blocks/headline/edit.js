/**
 * Block: Headline
 */

import classnames from 'classnames';
import ColorPicker from '../../components/color-picker';
import hexToRGBA from '../../components/color-picker/hex-to-rgba';
import IconPicker from '../../components/icon-picker';
import TypographyControls from '../../components/typography';
import DimensionsControl from '../../components/dimensions/';
import getIcon from '../../utils/get-icon';
import './markformat';

const { __ } = wp.i18n; // Import __() from wp.i18n
const {
	TextControl,
	Toolbar,
	PanelBody,
	RangeControl,
	SelectControl,
	BaseControl,
	TabPanel,
	DropdownMenu,
	ToggleControl,
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
	AlignmentToolbar,
} = wp.blockEditor;

const ELEMENT_ID_REGEX = /[\s#]/g;
const gbHeadlineIds = [];

class GenerateBlockHeadline extends Component {
	constructor() {
		super( ...arguments );
	}

	componentDidMount() {
		let id = this.props.clientId.substr( 2, 9 ).replace( '-', '' );

		if ( ! this.props.attributes.uniqueId ) {
			this.props.setAttributes( {
				uniqueId: id,
			} );

			gbHeadlineIds.push( id );
		} else if ( gbHeadlineIds.includes( this.props.attributes.uniqueId ) ) {
			this.props.setAttributes( {
				uniqueId: id,
			} );

			gbHeadlineIds.push( id );
		} else {
			gbHeadlineIds.push( this.props.attributes.uniqueId );
		}
	}

	render() {
		const {
			attributes,
			setAttributes,
			toggleSelection,
			instanceId
		} = this.props;

		const {
			uniqueId,
			elementId,
			cssClasses,
			content,
			element,
			alignment,
			alignmentTablet,
			alignmentMobile,
			backgroundColor,
			backgroundColorOpacity,
			textColor,
			linkColor,
			linkColorHover,
			borderColor,
			borderColorOpacity,
			highlightTextColor,
			showAdvancedTypography,
			fontFamily,
			fontFamilyFallback,
			googleFont,
			fontWeight,
			fontSize,
			fontSizeTablet,
			fontSizeMobile,
			fontSizeUnit,
			textTransform,
			lineHeight,
			lineHeightTablet,
			lineHeightMobile,
			lineHeightUnit,
			marginTop,
			marginRight,
			marginBottom,
			marginLeft,
			marginSyncUnits,
			marginTopTablet,
			marginRightTablet,
			marginLeftTablet,
			marginBottomTablet,
			marginTopMobile,
			marginRightMobile,
			marginBottomMobile,
			marginLeftMobile,
			marginUnit,
			paddingTop,
			paddingRight,
			paddingBottom,
			paddingLeft,
			paddingTopTablet,
			paddingRightTablet,
			paddingBottomTablet,
			paddingLeftTablet,
			paddingTopMobile,
			paddingRightMobile,
			paddingBottomMobile,
			paddingLeftMobile,
			paddingUnit,
			paddingSyncUnits,
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
			letterSpacing,
			letterSpacingTablet,
			letterSpacingMobile,
			icon,
			iconColor,
			iconColorOpacity,
			customIcon,
			iconLocation,
			iconLocationTablet,
			iconLocationMobile,
			iconVerticalAlignment,
			iconVerticalAlignmentTablet,
			iconVerticalAlignmentMobile,
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
			inlineWidth,
			inlineWidthTablet,
			inlineWidthMobile,
		} = attributes;

		let iconFlexDirection = '',
			iconAlignment = '',
			headlineWrapperAlignment = '',
			inlineVerticalAlignment = '',
			fontFamilyFallbackValue = '',
			inlineHeadline = '',
			borderStyleValue = '';

		if ( icon && 'above' === iconLocation ) {
			iconFlexDirection = 'column';
			iconAlignment = 'right' === alignment ? 'flex-end' : alignment;
		}

		if ( icon && 'inline' === iconLocation ) {
			headlineWrapperAlignment = 'right' === alignment ? 'flex-end' : alignment;
			inlineVerticalAlignment = iconVerticalAlignment;
		}

		if ( fontFamily && fontFamilyFallback ) {
			fontFamilyFallbackValue = ', ' + fontFamilyFallback;
		}

		if ( inlineWidth ) {
			inlineHeadline = 'display: inline-flex;';
		}

		if ( borderSizeTop || borderSizeRight || borderSizeBottom || borderSizeLeft ) {
			borderStyleValue = 'solid';
		}

		const css = `
			.editor-styles-wrapper .gb-headline-` + uniqueId + ` {
				font-family: ` + fontFamily + fontFamilyFallbackValue + `;
				font-weight: ` + fontWeight + `;
				text-transform: ` + textTransform + `;
				text-align: ` + alignment + `;
				font-size: ` + fontSize + fontSizeUnit + `;
				background-color: ` + hexToRGBA( backgroundColor, backgroundColorOpacity ) + `;
				color: ` + textColor + `;
				line-height: ` + lineHeight + lineHeightUnit + `;
				letter-spacing: ` + letterSpacing + `em;
				margin-top: ` + marginTop + marginUnit + ` !important;
				margin-right: ` + marginRight + marginUnit + `;
				margin-bottom: ` + marginBottom + marginUnit + ` !important;
				margin-left: ` + marginLeft + marginUnit + `;
				padding-top: ` + paddingTop + paddingUnit + `;
				padding-right: ` + paddingRight + paddingUnit + `;
				padding-bottom: ` + paddingBottom + paddingUnit + `;
				padding-left: ` + paddingLeft + paddingUnit + `;
				` + inlineHeadline + `
				border-width: 0;
				border-top-width: ` + borderSizeTop + `px;
				border-right-width: ` + borderSizeRight + `px;
				border-bottom-width: ` + borderSizeBottom + `px;
				border-left-width: ` + borderSizeLeft + `px;
				border-style: ` + borderStyleValue + `;
				border-color: ` + hexToRGBA( borderColor, borderColorOpacity ) + `;
			}

			.editor-styles-wrapper .gb-headline-` + uniqueId + ` a {
				color: ` + linkColor + `;
			}

			.gb-headline-wrapper-` + uniqueId + ` .gb-icon {
				padding-top: ` + iconPaddingTop + iconPaddingUnit + `;
				padding-right: ` + iconPaddingRight + iconPaddingUnit + `;
				padding-bottom: ` + iconPaddingBottom + iconPaddingUnit + `;
				padding-left: ` + iconPaddingLeft + iconPaddingUnit + `;
				align-self: ` + iconAlignment + `;
				color: ` + hexToRGBA( iconColor, iconColorOpacity ) + `;
				font-size: ` + fontSize + fontSizeUnit + `;
			}

			.gb-headline-wrapper-` + uniqueId + ` .gb-icon svg {
				width: ` + iconSize + `em;
				height: ` + iconSize + `em;
			}

			.gb-headline-wrapper-` + uniqueId + ` {
				flex-direction: ` + iconFlexDirection + `;
				justify-content: ` + headlineWrapperAlignment + `;
				align-items: ` + inlineVerticalAlignment + `;
				margin-top: ` + marginTop + marginUnit + ` !important;
				margin-right: ` + marginRight + marginUnit + `;
				margin-bottom: ` + marginBottom + marginUnit + ` !important;
				margin-left: ` + marginLeft + marginUnit + `;
				padding-top: ` + paddingTop + paddingUnit + `;
				padding-right: ` + paddingRight + paddingUnit + `;
				padding-bottom: ` + paddingBottom + paddingUnit + `;
				padding-left: ` + paddingLeft + paddingUnit + `;
				background-color: ` + hexToRGBA( backgroundColor, backgroundColorOpacity ) + `;
				color: ` + textColor + `;
				` + inlineHeadline + `
				border-width: 0;
				border-top-width: ` + borderSizeTop + `px;
				border-right-width: ` + borderSizeRight + `px;
				border-bottom-width: ` + borderSizeBottom + `px;
				border-left-width: ` + borderSizeLeft + `px;
				border-style: ` + borderStyleValue + `;
				border-color: ` + hexToRGBA( borderColor, borderColorOpacity ) + `;
			}

			.gb-headline-` + uniqueId + ` .gb-highlight {
				color: ` + highlightTextColor + `;
			}
		`

		const sanitizeSVG = ( svg ) => {
			return DOMPurify.sanitize( svg, { USE_PROFILES: { svg: true, svgFilters: true } } );
		}

		const googleFontsAttr = ':100,100italic,200,200italic,300,300italic,400,400italic,500,500italic,600,600italic,700,700italic,800,800italic,900,900italic';

		return (
			<Fragment>

				<BlockControls>
					<Toolbar>
						<DropdownMenu
							icon={ getIcon( 'paragraph' ) }
							label={ __( 'Element' ) }
							controls={ [
								{
									title: 'paragraph',
									onClick: () => setAttributes( { element: 'p' } ),
								},
								{
									title: 'h1',
									onClick: () => setAttributes( { element: 'h1' } ),
								},
								{
									title: 'h2',
									onClick: () => setAttributes( { element: 'h2' } ),
								},
								{
									title: 'h3',
									onClick: () => setAttributes( { element: 'h3' } ),
								},
								{
									title: 'h4',
									onClick: () => setAttributes( { element: 'h4' } ),
								},
							] }
						/>
					</Toolbar>

					{ ! inlineWidth &&
						<AlignmentToolbar
							isCollapsed={ false }
							value={ alignment }
							onChange={ ( nextAlign ) => {
								setAttributes( { alignment: nextAlign } );
							} }
						/>
					}
				</BlockControls>

				<InspectorControls>
					<PanelBody
						title={ __( 'Typography', 'generateblocks' ) }
						initialOpen={ true }
						icon={ getIcon( 'typography' ) }
						className={ 'gblocks-panel-label' }
						>
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
													<SelectControl
														label={ __( 'Element', 'generateblocks' ) }
														value={ element }
														options={ [
															{ label: 'paragraph', value: 'p' },
															{ label: 'h1', value: 'h1' },
															{ label: 'h2', value: 'h2' },
															{ label: 'h3', value: 'h3' },
															{ label: 'h4', value: 'h4' },
															{ label: 'h5', value: 'h5' },
															{ label: 'h6', value: 'h6' },
														] }
														onChange={ ( element ) => { setAttributes( { element } ) } }
													/>

													{ ! inlineWidth &&
														<AlignmentToolbar
															isCollapsed={ false }
															value={ alignment }
															onChange={ ( value ) => {
																setAttributes( { alignment: value } );
															} }
														/>
													}

													<TypographyControls { ...this.props }
														valueFontFamily={ fontFamily }
														valueFontFamilyFallback={ fontFamilyFallback }
														valueFontWeight={ fontWeight }
														valueGoogleFont={ googleFont }
														valueTextTransform={ textTransform }
														valueFontSize={ fontSize }
														valueFontSizeUnit={ fontSizeUnit }
														valueLineHeight={ lineHeight }
														valueLineHeightUnit={ lineHeightUnit }
														valueLetterSpacing={ letterSpacing }
														valueShowAdvancedTypography={ showAdvancedTypography }
														attrFontFamily={ 'fontFamily' }
														attrFontFamilyFallback={ 'fontFamilyFallback' }
														attrGoogleFont={ 'googleFont' }
														attrFontWeight={ 'fontWeight' }
														attrTextTransform={ 'textTransform' }
														attrFontSize={ 'fontSize' }
														attrFontSizeUnit={ 'fontSizeUnit' }
														attrLineHeight={ 'lineHeight' }
														attrLineHeightUnit={ 'lineHeightUnit' }
														attrLetterSpacing={ 'letterSpacing' }
														attrShowAdvancedTypography={ 'showAdvancedTypography' }
														defaultFontSize={ generateBlocksDefaults.headline.fontSize }
														defaultFontSizeUnit={ generateBlocksDefaults.headline.fontSizeUnit }
														defaultLineHeight={ generateBlocksDefaults.headline.lineHeight }
														defaultLineHeightUnit={ generateBlocksDefaults.headline.lineHeightUnit }
														defaultLetterSpacing={ generateBlocksDefaults.headline.letterSpacing }
														uniqueId={ uniqueId }
													/>
												</Fragment>
											) }

											{ 'tablet' === tab.name && (
												<Fragment>
													{ ! inlineWidthTablet &&
														<AlignmentToolbar
															isCollapsed={ false }
															value={ alignmentTablet }
															onChange={ ( value ) => {
																setAttributes( { alignmentTablet: value } );
															} }
														/>
													}

													<TypographyControls { ...this.props }
														valueFontSize={ fontSizeTablet }
														valueFontSizeUnit={ fontSizeUnit }
														valueLineHeight={ lineHeightTablet }
														valueLineHeightUnit={ lineHeightUnit }
														valueLetterSpacing={ letterSpacingTablet }
														valueShowAdvancedTypography={ showAdvancedTypography }
														attrFontSize={ 'fontSizeTablet' }
														attrFontSizeUnit={ 'fontSizeUnit' }
														attrLineHeight={ 'lineHeightTablet' }
														attrLineHeightUnit={ 'lineHeightUnit' }
														attrLetterSpacing={ 'letterSpacingTablet' }
														attrShowAdvancedTypography={ 'showAdvancedTypography' }
														defaultFontSize={ generateBlocksDefaults.headline.fontSizeTablet }
														defaultFontSizeUnit={ generateBlocksDefaults.headline.fontSizeUnit }
														defaultLineHeight={ generateBlocksDefaults.headline.lineHeightTablet }
														defaultLineHeightUnit={ generateBlocksDefaults.headline.lineHeightUnit }
														defaultLetterSpacing={ generateBlocksDefaults.headline.letterSpacingTablet }
														uniqueId={ uniqueId }
													/>
												</Fragment>
											) }

											{ 'mobile' === tab.name && (
												<Fragment>
													{ ! inlineWidthMobile &&
														<AlignmentToolbar
															isCollapsed={ false }
															value={ alignmentMobile }
															onChange={ ( value ) => {
																setAttributes( { alignmentMobile: value } );
															} }
														/>
													}

													<TypographyControls { ...this.props }
														valueFontSize={ fontSizeMobile }
														valueFontSizeUnit={ fontSizeUnit }
														valueLineHeight={ lineHeightMobile }
														valueLineHeightUnit={ lineHeightUnit }
														valueLetterSpacing={ letterSpacingMobile }
														valueShowAdvancedTypography={ showAdvancedTypography }
														attrFontSize={ 'fontSizeMobile' }
														attrFontSizeUnit={ 'fontSizeUnit' }
														attrLineHeight={ 'lineHeightMobile' }
														attrLineHeightUnit={ 'lineHeightUnit' }
														attrLetterSpacing={ 'letterSpacingMobile' }
														attrShowAdvancedTypography={ 'showAdvancedTypography' }
														defaultFontSize={ generateBlocksDefaults.headline.fontSizeMobile }
														defaultFontSizeUnit={ generateBlocksDefaults.headline.fontSizeUnit }
														defaultLineHeight={ generateBlocksDefaults.headline.lineHeightMobile }
														defaultLineHeightUnit={ generateBlocksDefaults.headline.lineHeightUnit }
														defaultLetterSpacing={ generateBlocksDefaults.headline.letterSpacingMobile }
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
						title={ __( 'Colors', 'generateblocks' ) }
						initialOpen={ false }
						icon={ getIcon( 'colors' ) }
						className={ 'gblocks-panel-label' }
						>
						<ColorPicker
							label={ __( 'Background Color', 'generateblocks' ) }
							value={ backgroundColor }
							onChange={ ( value ) =>
								setAttributes( {
									backgroundColor: value
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
						/>

						<ColorPicker
							label={ __( 'Text Color', 'generateblocks' ) }
							value={ textColor }
							onChange={ ( value ) =>
								setAttributes( {
									textColor: value
								} )
							}
							alpha={ false }
						/>

						<ColorPicker
							label={ __( 'Link Color', 'generateblocks' ) }
							value={ linkColor }
							onChange={ ( value ) =>
								setAttributes( {
									linkColor: value
								} )
							}
							alpha={ false }
						/>

						<ColorPicker
							label={ __( 'Link Color Hover', 'generateblocks' ) }
							value={ linkColorHover }
							onChange={ ( value ) =>
								setAttributes( {
									linkColorHover: value
								} )
							}
							alpha={ false }
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
						/>

						<ColorPicker
							label={ __( 'Highlight Text', 'generateblocks' ) }
							value={ highlightTextColor }
							onChange={ ( value ) =>
								setAttributes( {
									highlightTextColor: value
								} )
							}
							alpha={ false }
						/>
					</PanelBody>

					<PanelBody
						title={ __( 'Spacing', 'generateblocks' ) }
						initialOpen={ false }
						icon={ getIcon( 'spacing' ) }
						className={ 'gblocks-panel-label' }
						>
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
													<ToggleControl
														label={ __( 'Inline Width', 'generateblocks' ) }
														checked={ !! inlineWidth }
														onChange={ ( value ) => {
															setAttributes( {
																inlineWidth: value
															} );
														} }
													/>

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
														syncUnits={ borderSizeSyncUnits }
														attrTop={ 'borderSizeTop' }
														attrRight={ 'borderSizeRight' }
														attrBottom={ 'borderSizeBottom' }
														attrLeft={ 'borderSizeLeft' }
														attrSyncUnits={ 'borderSizeSyncUnits' }
														displayUnit={ 'px' }
													/>
												</Fragment>
											) }

											{ 'tablet' === tab.name && (
												<Fragment>
													<ToggleControl
														label={ __( 'Inline Width', 'generateblocks' ) }
														checked={ !! inlineWidthTablet }
														onChange={ ( value ) => {
															setAttributes( {
																inlineWidthTablet: value
															} );
														} }
													/>

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
														syncUnits={ borderSizeSyncUnits }
														attrTop={ 'borderSizeTopTablet' }
														attrRight={ 'borderSizeRightTablet' }
														attrBottom={ 'borderSizeBottomTablet' }
														attrLeft={ 'borderSizeLeftTablet' }
														attrSyncUnits={ 'borderSizeSyncUnits' }
														displayUnit={ 'px' }
													/>
												</Fragment>
											) }

											{ 'mobile' === tab.name && (
												<Fragment>
													<ToggleControl
														label={ __( 'Inline Width', 'generateblocks' ) }
														checked={ !! inlineWidthMobile }
														onChange={ ( value ) => {
															setAttributes( {
																inlineWidthMobile: value
															} );
														} }
													/>

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
														type={ 'margin' }
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
												</Fragment>
											) }
										</div>
									);
								}
							}
						</TabPanel>
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
						/>

						<ColorPicker
							label={ __( 'Icon Color', 'generateblocks' ) }
							value={ iconColor }
							onChange={ ( value ) =>
								setAttributes( {
									iconColor: value
								} )
							}
							alpha={ true }
							valueOpacity={ iconColorOpacity }
							attrOpacity={ 'iconColorOpacity' }
							onOpacityChange={ ( value ) =>
								setAttributes( {
									iconColorOpacity: value
								} )
							}
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
													<SelectControl
														label={ __( 'Icon Location', 'generateblocks' ) }
														value={ iconLocation }
														options={ [
															{ label: __( 'Inline', 'generateblocks' ), value: 'inline' },
															{ label: __( 'Above', 'generateblocks' ), value: 'above' },
														] }
														onChange={ ( value ) => {
															setAttributes( {
																iconLocation: value,
																iconPaddingRight: 'inline' === value ? '0.5' : '',
																iconPaddingBottom: 'above' === value ? '0.5' : '',
															} );
														} }
													/>

													{ 'inline' === iconLocation &&
														<SelectControl
															label={ __( 'Icon Alignment', 'generateblocks' ) }
															value={ iconVerticalAlignment }
															options={ [
																{ label: __( 'Top', 'generateblocks' ), value: 'top' },
																{ label: __( 'Center', 'generateblocks' ), value: 'center' },
																{ label: __( 'Bottom', 'generateblocks' ), value: 'bottom' },
															] }
															onChange={ ( value ) => {
																setAttributes( {
																	iconVerticalAlignment: value
																} );
															} }
														/>
													}

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
													<SelectControl
														label={ __( 'Icon Location', 'generateblocks' ) }
														value={ iconLocationTablet }
														options={ [
															{ label: __( 'Inherit', 'generateblocks' ), value: '' },
															{ label: __( 'Inline', 'generateblocks' ), value: 'inline' },
															{ label: __( 'Above', 'generateblocks' ), value: 'above' },
														] }
														onChange={ ( value ) => {
															setAttributes( {
																iconLocationTablet: value,
																iconPaddingRightTablet: 'inline' === value ? '0.5' : '',
																iconPaddingBottomTablet: 'above' === value ? '0.5' : '',
															} );
														} }
													/>

													{ 'inline' === iconLocationTablet &&
														<SelectControl
															label={ __( 'Icon Alignment', 'generateblocks' ) }
															value={ iconVerticalAlignmentTablet }
															options={ [
																{ label: __( 'Top', 'generateblocks' ), value: 'top' },
																{ label: __( 'Center', 'generateblocks' ), value: 'center' },
																{ label: __( 'Bottom', 'generateblocks' ), value: 'bottom' },
															] }
															onChange={ ( value ) => {
																setAttributes( {
																	iconVerticalAlignmentTablet: value
																} );
															} }
														/>
													}

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
													<SelectControl
														label={ __( 'Icon Location', 'generateblocks' ) }
														value={ iconLocationMobile }
														options={ [
															{ label: __( 'Inherit', 'generateblocks' ), value: '' },
															{ label: __( 'Inline', 'generateblocks' ), value: 'inline' },
															{ label: __( 'Above', 'generateblocks' ), value: 'above' },
														] }
														onChange={ ( value ) => {
															setAttributes( {
																iconLocationMobile: value,
																iconPaddingRightMobile: 'inline' === value ? '0.5' : '',
																iconPaddingBottomMobile: 'above' === value ? '0.5' : '',
															} );
														} }
													/>

													{ 'inline' === iconLocationMobile &&
														<SelectControl
															label={ __( 'Icon Alignment', 'generateblocks' ) }
															value={ iconVerticalAlignmentMobile }
															options={ [
																{ label: __( 'Top', 'generateblocks' ), value: 'top' },
																{ label: __( 'Center', 'generateblocks' ), value: 'center' },
																{ label: __( 'Bottom', 'generateblocks' ), value: 'bottom' },
															] }
															onChange={ ( value ) => {
																setAttributes( {
																	iconVerticalAlignmentMobile: value
																} );
															} }
														/>
													}

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
						initialOpen={ false }
						className={ 'gblocks-panel-label' }
					>
						<p>{ __( 'Need help with this block?', 'generateblocks' ) }</p>
						<a href="https://docs.generateblocks.com/collection/headline/" target="_blank" rel="noreferrer noopener">{ __( 'Visit our documentation', 'generateblocks' ) }</a>
					</PanelBody>
				</InspectorControls>

				<style>{ css }</style>

				{ fontFamily && googleFont &&
					<link
						rel="stylesheet"
						href={ `https://fonts.googleapis.com/css?family=` + fontFamily.replace( / /g, '+' ) + googleFontsAttr }
					/>
				}

				{ icon ? (
					<div
						className={ classnames( {
						'gb-headline-wrapper': true,
						[`gb-headline-wrapper-${ uniqueId }`]: true,
						} ) }
					>
						{ icon &&
							<span
								className="gb-icon"
								dangerouslySetInnerHTML={ { __html: sanitizeSVG( icon ) } }
							/>
						}

						<RichText
							allowedFormats={ [ 'core/bold', 'core/italic', 'core/link', 'core/underline', 'generateblocks/mark' ] }
							tagName={ element }
							value={ content }
							onChange={ ( value ) => setAttributes( { content: value } ) }
							id={ !! elementId ? elementId : undefined }
							className={ classnames( {
								'gb-headline': true,
								[`gb-headline-${ uniqueId }`]: true,
								[`${ cssClasses }`]: '' !== cssClasses
							} ) }
							placeholder={ __( 'Write headline…', 'generateblocks' ) }
							keepPlaceholderOnFocus={ true }
						/>
					</div>
				) : (
					<RichText
						allowedFormats={ [ 'core/bold', 'core/italic', 'core/link', 'core/underline', 'generateblocks/mark' ] }
						tagName={ element }
						value={ content }
						onChange={ ( value ) => setAttributes( { content: value } ) }
						id={ !! elementId ? elementId : undefined }
						className={ classnames( {
							'gb-headline': true,
							[`gb-headline-${ uniqueId }`]: true,
							[`${ cssClasses }`]: '' !== cssClasses
						} ) }
						placeholder={ __( 'Write headline…', 'generateblocks' ) }
						keepPlaceholderOnFocus={ true }
					/>
				) }
			</Fragment>
		);
	}
}

export default ( GenerateBlockHeadline );
