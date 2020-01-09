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
const fbHeadlineIds = [];

class FlexBlockHeadline extends Component {
	constructor() {
		super( ...arguments );
	}

	componentDidMount() {
		let id = this.props.clientId.substr( 2, 9 ).replace( '-', '' );

		if ( ! this.props.attributes.uniqueId ) {
			this.props.setAttributes( {
				uniqueId: id,
			} );

			fbHeadlineIds.push( id );
		} else if ( fbHeadlineIds.includes( this.props.attributes.uniqueId ) ) {
			this.props.setAttributes( {
				uniqueId: id,
			} );

			fbHeadlineIds.push( id );
		} else {
			fbHeadlineIds.push( this.props.attributes.uniqueId );
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
		} = attributes;

		let iconFlexDirection = '',
			iconAlignment = '',
			headlineWrapperAlignment = '',
			inlineVerticalAlignment = '',
			fontFamilyFallbackValue = '';

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

		const css = `
			.editor-styles-wrapper .fx-headline-` + uniqueId + ` {
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
			}

			.editor-styles-wrapper .fx-headline-` + uniqueId + ` a {
				color: ` + linkColor + `;
			}

			.fx-headline-wrapper-` + uniqueId + ` .fx-icon {
				padding-top: ` + iconPaddingTop + iconPaddingUnit + `;
				padding-right: ` + iconPaddingRight + iconPaddingUnit + `;
				padding-bottom: ` + iconPaddingBottom + iconPaddingUnit + `;
				padding-left: ` + iconPaddingLeft + iconPaddingUnit + `;
				align-self: ` + iconAlignment + `;
				color: ` + hexToRGBA( iconColor, iconColorOpacity ) + `;
			}

			.fx-headline-wrapper-` + uniqueId + ` .fx-icon svg {
				width: ` + iconSize + `em;
				height: ` + iconSize + `em;
			}

			.fx-headline-wrapper-` + uniqueId + ` {
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
			}
		`

		const sanitizeSVG = ( svg ) => {
			return DOMPurify.sanitize( svg, { USE_PROFILES: { svg: true, svgFilters: true } } );
		}

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

					<AlignmentToolbar
						isCollapsed={ false }
						value={ alignment }
						onChange={ ( nextAlign ) => {
							setAttributes( { alignment: nextAlign } );
						} }
					/>
				</BlockControls>

				<InspectorControls>
					<PanelBody
						title={ __( 'Typography', 'flexblocks' ) }
						initialOpen={ true }
						icon={ getIcon( 'typography' ) }
						className={ 'fx-panel-label' }
						>
						<TabPanel className="headline-tab-panel flexblocks-control-tabs"
							activeClass="active-tab"
							tabs={ [
								{
									name: 'default',
									title: __( 'Default', 'flexblocks' ),
									className: 'default',
								},
								{
									name: 'tablet',
									title: __( 'Tablet', 'flexblocks' ),
									className: 'tablet',
								},
								{
									name: 'mobile',
									title: __( 'Mobile', 'flexblocks' ),
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
														label={ __( 'Element', 'flexblocks' ) }
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

													<AlignmentToolbar
														isCollapsed={ false }
														value={ alignment }
														onChange={ ( value ) => {
															setAttributes( { alignment: value } );
														} }
													/>

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
														defaultFontSize={ flexBlocksDefaults.headline.fontSize }
														defaultFontSizeUnit={ flexBlocksDefaults.headline.fontSizeUnit }
														defaultLineHeight={ flexBlocksDefaults.headline.lineHeight }
														defaultLineHeightUnit={ flexBlocksDefaults.headline.lineHeightUnit }
														defaultLetterSpacing={ flexBlocksDefaults.headline.letterSpacing }
														uniqueId={ uniqueId }
													/>
												</Fragment>
											) }

											{ 'tablet' === tab.name && (
												<Fragment>
													<AlignmentToolbar
														isCollapsed={ false }
														value={ alignmentTablet }
														onChange={ ( value ) => {
															setAttributes( { alignmentTablet: value } );
														} }
													/>

													<TypographyControls { ...this.props }
														valueFontSize={ fontSizeTablet }
														valueFontSizeUnit={ fontSizeUnit }
														valueLineHeight={ lineHeightTablet }
														valueLineHeightUnit={ lineHeightUnit }
														valueLetterSpacing={ letterSpacingTablet }
														attrFontSize={ 'fontSizeTablet' }
														attrFontSizeUnit={ 'fontSizeUnit' }
														attrLineHeight={ 'lineHeightTablet' }
														attrLineHeightUnit={ 'lineHeightUnit' }
														attrLetterSpacing={ 'letterSpacingTablet' }
														defaultFontSize={ flexBlocksDefaults.headline.fontSizeTablet }
														defaultFontSizeUnit={ flexBlocksDefaults.headline.fontSizeUnit }
														defaultLineHeight={ flexBlocksDefaults.headline.lineHeightTablet }
														defaultLineHeightUnit={ flexBlocksDefaults.headline.lineHeightUnit }
														defaultLetterSpacing={ flexBlocksDefaults.headline.letterSpacingTablet }
														uniqueId={ uniqueId }
													/>
												</Fragment>
											) }

											{ 'mobile' === tab.name && (
												<Fragment>
													<AlignmentToolbar
														isCollapsed={ false }
														value={ alignmentMobile }
														onChange={ ( value ) => {
															setAttributes( { alignmentMobile: value } );
														} }
													/>

													<TypographyControls { ...this.props }
														valueFontSize={ fontSizeMobile }
														valueFontSizeUnit={ fontSizeUnit }
														valueLineHeight={ lineHeightMobile }
														valueLineHeightUnit={ lineHeightUnit }
														valueLetterSpacing={ letterSpacingMobile }
														attrFontSize={ 'fontSizeMobile' }
														attrFontSizeUnit={ 'fontSizeUnit' }
														attrLineHeight={ 'lineHeightMobile' }
														attrLineHeightUnit={ 'lineHeightUnit' }
														attrLetterSpacing={ 'letterSpacingMobile' }
														defaultFontSize={ flexBlocksDefaults.headline.fontSizeMobile }
														defaultFontSizeUnit={ flexBlocksDefaults.headline.fontSizeUnit }
														defaultLineHeight={ flexBlocksDefaults.headline.lineHeightMobile }
														defaultLineHeightUnit={ flexBlocksDefaults.headline.lineHeightUnit }
														defaultLetterSpacing={ flexBlocksDefaults.headline.letterSpacingMobile }
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
						title={ __( 'Colors', 'flexblocks' ) }
						initialOpen={ false }
						icon={ getIcon( 'colors' ) }
						className={ 'fx-panel-label' }
						>
						<ColorPicker
							label={ __( 'Background Color', 'flexblocks' ) }
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
							label={ __( 'Text Color', 'flexblocks' ) }
							value={ textColor }
							onChange={ ( value ) =>
								setAttributes( {
									textColor: value
								} )
							}
							alpha={ false }
						/>

						<ColorPicker
							label={ __( 'Link Color', 'flexblocks' ) }
							value={ linkColor }
							onChange={ ( value ) =>
								setAttributes( {
									linkColor: value
								} )
							}
							alpha={ false }
						/>

						<ColorPicker
							label={ __( 'Link Color Hover', 'flexblocks' ) }
							value={ linkColorHover }
							onChange={ ( value ) =>
								setAttributes( {
									linkColorHover: value
								} )
							}
							alpha={ false }
						/>
					</PanelBody>

					<PanelBody
						title={ __( 'Spacing', 'flexblocks' ) }
						initialOpen={ false }
						icon={ getIcon( 'spacing' ) }
						className={ 'fx-panel-label' }
						>
						<TabPanel className="headline-tab-panel flexblocks-control-tabs"
							activeClass="active-tab"
							tabs={ [
								{
									name: 'default',
									title: __( 'Default', 'flexblocks' ),
									className: 'default',
								},
								{
									name: 'tablet',
									title: __( 'Tablet', 'flexblocks' ),
									className: 'tablet',
								},
								{
									name: 'mobile',
									title: __( 'Mobile', 'flexblocks' ),
									className: 'mobile',
								},
							] }>
							{
								( tab ) => {
									return (
										<div>
											{ 'default' === tab.name && (
												<Fragment>
													<DimensionsControl { ...this.props }
														type={ 'padding' }
														label={ __( 'Padding', 'flexblocks' ) }
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
														label={ __( 'Margin', 'flexblocks' ) }
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
												</Fragment>
											) }

											{ 'tablet' === tab.name && (
												<Fragment>
													<DimensionsControl { ...this.props }
														type={ 'padding' }
														label={ __( 'Padding', 'flexblocks' ) }
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
														label={ __( 'Margin', 'flexblocks' ) }
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
												</Fragment>
											) }

											{ 'mobile' === tab.name && (
												<Fragment>
													<DimensionsControl { ...this.props }
														type={ 'padding' }
														label={ __( 'Padding', 'flexblocks' ) }
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
														label={ __( 'Margin', 'flexblocks' ) }
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
												</Fragment>
											) }
										</div>
									);
								}
							}
						</TabPanel>
					</PanelBody>

					<PanelBody
						title={ __( 'Icon', 'flexblocks' ) }
						initialOpen={ false }
						icon={ getIcon( 'icons' ) }
						className={ 'fx-panel-label' }
						>

						<IconPicker { ...this.props }
							valueIcon={ icon }
							attrIcon={ 'icon' }
						/>

						<ColorPicker
							label={ __( 'Icon Color', 'flexblocks' ) }
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

						<TabPanel className="headline-tab-panel flexblocks-control-tabs"
							activeClass="active-tab"
							tabs={ [
								{
									name: 'default',
									title: __( 'Default', 'flexblocks' ),
									className: 'default',
								},
								{
									name: 'tablet',
									title: __( 'Tablet', 'flexblocks' ),
									className: 'tablet',
								},
								{
									name: 'mobile',
									title: __( 'Mobile', 'flexblocks' ),
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
														label={ __( 'Icon Location', 'flexblocks' ) }
														value={ iconLocation }
														options={ [
															{ label: __( 'Inline', 'flexblocks' ), value: 'inline' },
															{ label: __( 'Above', 'flexblocks' ), value: 'above' },
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
															label={ __( 'Icon Alignment', 'flexblocks' ) }
															value={ iconVerticalAlignment }
															options={ [
																{ label: __( 'Top', 'flexblocks' ), value: 'top' },
																{ label: __( 'Center', 'flexblocks' ), value: 'center' },
																{ label: __( 'Bottom', 'flexblocks' ), value: 'bottom' },
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
														label={ __( 'Padding', 'flexblocks' ) }
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
														label={ __( 'Icon Size', 'flexblocks' ) }
														value={ iconSize ? iconSize : '' }
														onChange={ ( value ) => setAttributes( {
															iconSize: parseFloat( value )
														} ) }
														min={ 1 }
														max={ 15 }
														step={ .5 }
														initialPosition={ flexBlocksDefaults.headline.iconSize }
													/>
												</Fragment>
											) }

											{ 'tablet' === tab.name && (
												<Fragment>
													<SelectControl
														label={ __( 'Icon Location', 'flexblocks' ) }
														value={ iconLocationTablet }
														options={ [
															{ label: __( 'Inherit', 'flexblocks' ), value: '' },
															{ label: __( 'Inline', 'flexblocks' ), value: 'inline' },
															{ label: __( 'Above', 'flexblocks' ), value: 'above' },
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
															label={ __( 'Icon Alignment', 'flexblocks' ) }
															value={ iconVerticalAlignmentTablet }
															options={ [
																{ label: __( 'Top', 'flexblocks' ), value: 'top' },
																{ label: __( 'Center', 'flexblocks' ), value: 'center' },
																{ label: __( 'Bottom', 'flexblocks' ), value: 'bottom' },
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
														label={ __( 'Padding', 'flexblocks' ) }
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
														label={ __( 'Icon Size', 'flexblocks' ) }
														value={ parseFloat( iconSizeTablet ) }
														onChange={ ( value ) => setAttributes( { iconSizeTablet: parseFloat( value ) } ) }
														min={ 1 }
														max={ 15 }
														step={ .5 }
														initialPosition={ flexBlocksDefaults.headline.iconSizeTablet }
													/>
												</Fragment>
											) }

											{ 'mobile' === tab.name && (
												<Fragment>
													<SelectControl
														label={ __( 'Icon Location', 'flexblocks' ) }
														value={ iconLocationMobile }
														options={ [
															{ label: __( 'Inherit', 'flexblocks' ), value: '' },
															{ label: __( 'Inline', 'flexblocks' ), value: 'inline' },
															{ label: __( 'Above', 'flexblocks' ), value: 'above' },
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
															label={ __( 'Icon Alignment', 'flexblocks' ) }
															value={ iconVerticalAlignmentMobile }
															options={ [
																{ label: __( 'Top', 'flexblocks' ), value: 'top' },
																{ label: __( 'Center', 'flexblocks' ), value: 'center' },
																{ label: __( 'Bottom', 'flexblocks' ), value: 'bottom' },
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
														label={ __( 'Padding', 'flexblocks' ) }
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
														label={ __( 'Icon Size', 'flexblocks' ) }
														value={ iconSize ? iconSize : '' }
														onChange={ ( value ) => setAttributes( {
															iconSizeMobile: parseFloat( value )
														} ) }
														min={ 1 }
														max={ 15 }
														step={ .5 }
														initialPosition={ flexBlocksDefaults.headline.iconSizeMobile }
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
						title={ __( 'Advanced', 'flexblocks' ) }
						initialOpen={ false }
						icon={ getIcon( 'advanced' ) }
						className={ 'fx-panel-label' }
					>
						<TextControl
							label={ __( 'Element ID', 'flexblocks' ) }
							value={ elementId }
							onChange={ ( elementId ) => {
								elementId = elementId.replace( ELEMENT_ID_REGEX, '-' );
								setAttributes( { elementId } );
							} }
						/>

						<TextControl
							label={ __( 'CSS Classes', 'flexblocks' ) }
							value={ cssClasses }
							onChange={ ( cssClasses ) => { setAttributes( { cssClasses } ) } }
						/>
					</PanelBody>
				</InspectorControls>

				<style>{ css }</style>

				{ icon ? (
					<div
						className={ classnames( {
						'fx-headline-wrapper': true,
						[`fx-headline-wrapper-${ uniqueId }`]: true,
						} ) }
					>
						{ icon &&
							<span
								className="fx-icon"
								dangerouslySetInnerHTML={ { __html: sanitizeSVG( icon ) } }
							/>
						}

						<RichText
							allowedFormats={ [ 'core/bold', 'core/italic', 'core/link', 'core/underline', 'core/mark' ] }
							tagName={ element }
							value={ content }
							onChange={ ( value ) => setAttributes( { content: value } ) }
							id={ !! elementId ? elementId : undefined }
							className={ classnames( {
								'fx-headline': true,
								[`fx-headline-${ uniqueId }`]: true,
								[`${ cssClasses }`]: '' !== cssClasses
							} ) }
							placeholder={ __( 'Write headline…' ) }
							keepPlaceholderOnFocus={ true }
						/>
					</div>
				) : (
					<RichText
						allowedFormats={ [ 'core/bold', 'core/italic', 'core/link', 'core/underline', 'core/mark' ] }
						tagName={ element }
						value={ content }
						onChange={ ( value ) => setAttributes( { content: value } ) }
						id={ !! elementId ? elementId : undefined }
						className={ classnames( {
							'fx-headline': true,
							[`fx-headline-${ uniqueId }`]: true,
							[`${ cssClasses }`]: '' !== cssClasses
						} ) }
						placeholder={ __( 'Write headline…' ) }
						keepPlaceholderOnFocus={ true }
					/>
				) }
			</Fragment>
		);
	}
}

export default ( FlexBlockHeadline );
