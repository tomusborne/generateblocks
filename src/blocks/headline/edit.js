/**
 * Block: Headline
 */

import classnames from 'classnames';
import range from 'lodash/range';
import ColorPicker from '../../components/color-picker';
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
			textColor,
			linkColor,
			linkColorHover,
			fontFamily,
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
			marginUnit,
			marginSyncUnits,
			marginTopTablet,
			marginRightTablet,
			marginLeftTablet,
			marginBottomTablet,
			marginSyncUnitsTablet,
			marginTopMobile,
			marginRightMobile,
			marginBottomMobile,
			marginLeftMobile,
			marginSyncUnitsMobile,
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
			paddingSyncUnitsTablet,
			paddingTopMobile,
			paddingRightMobile,
			paddingBottomMobile,
			paddingLeftMobile,
			paddingSyncUnitsMobile,
			letterSpacing,
			letterSpacingTablet,
			letterSpacingMobile,
		} = attributes;

		const css = `
			.editor-styles-wrapper .fx-headline-` + uniqueId + ` {
				font-family: ` + fontFamily + `;
				font-weight: ` + fontWeight + `;
				text-transform: ` + textTransform + `;
				text-align: ` + alignment + `;
				font-size: ` + fontSize + fontSizeUnit + `;
				background-color: ` + backgroundColor + `;
				color: ` + textColor + `;
				line-height: ` + lineHeight + lineHeightUnit + `;
				letter-spacing: ` + letterSpacing + `em;
				margin-top: ` + marginTop + marginUnit + `;
				margin-right: ` + marginRight + marginUnit + `;
				margin-bottom: ` + marginBottom + marginUnit + `;
				margin-left: ` + marginLeft + marginUnit + `;
				padding-top: ` + paddingTop + paddingUnit + `;
				padding-right: ` + paddingRight + paddingUnit + `;
				padding-bottom: ` + paddingBottom + paddingUnit + `;
				padding-left: ` + paddingLeft + paddingUnit + `;
			}

			.editor-styles-wrapper .fx-headline-` + uniqueId + ` a {
				color: ` + linkColor + `;
			}
		`

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
											{ 'default' === tab.name ? (
												<Fragment>
													<SelectControl
														label={ __( 'Element', 'flexblocks' ) }
														value={ element }
														options={ [
															{ label: 'p', value: 'p' },
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
														valueFontWeight={ fontWeight }
														valueGoogleFont={ googleFont }
														valueTextTransform={ textTransform }
														valueFontSize={ fontSize }
														valueFontSizeUnit={ fontSizeUnit }
														valueLineHeight={ lineHeight }
														valueLineHeightUnit={ lineHeightUnit }
														valueLetterSpacing={ letterSpacing }
														attrFontFamily={ 'fontFamily' }
														attrGoogleFont={ 'googleFont' }
														attrFontWeight={ 'fontWeight' }
														attrTextTransform={ 'textTransform' }
														attrFontSize={ 'fontSize' }
														attrFontSizeUnit={ 'fontSizeUnit' }
														attrLineHeight={ 'lineHeight' }
														attrLineHeight={ 'lineHeightUnit' }
														attrLetterSpacing={ 'letterSpacing' }
														initialFontSize={ flexBlocksDefaults.headline.fontSize }
														initialLineHeight={ flexBlocksDefaults.headline.lineHeight }
														initialLetterSpacing={ flexBlocksDefaults.headline.letterSpacing }
														uniqueId={ uniqueId }
													/>
												</Fragment>
											) : '' }

											{ 'tablet' === tab.name ? (
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
														attrLineHeightUnit={ 'lineHeightUnit' }
														initialFontSize={ flexBlocksDefaults.headline.fontSizeTablet }
														initialLineHeight={ flexBlocksDefaults.headline.lineHeightTablet }
														initialLetterSpacing={ flexBlocksDefaults.headline.letterSpacingTablet }
														uniqueId={ uniqueId }
													/>
												</Fragment>
											) : '' }

											{ 'mobile' === tab.name ? (
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
														attrLetterSpacingUnit={ 'letterSpacingUnit' }
														initialFontSize={ flexBlocksDefaults.headline.fontSizeMobile }
														initialLineHeight={ flexBlocksDefaults.headline.lineHeightMobile }
														initialLetterSpacing={ flexBlocksDefaults.headline.letterSpacingMobile }
														uniqueId={ uniqueId }
													/>
												</Fragment>
											) : '' }
										</div>
									);
								}
							}
						</TabPanel>
					</PanelBody>

					<PanelBody
						title={ __( 'Colors', 'flexblocks' ) }
						initialOpen={ false }
						>
						<ColorPicker
							label={ __( 'Background Color', 'flexblocks' ) }
							value={ backgroundColor }
							onChange={ ( value ) =>
								setAttributes( {
									backgroundColor: value
								} )
							}
							onClear={ () =>
								setAttributes( {
									backgroundColor: flexBlocksDefaults.headline.backgroundColor
								} )
							}
							alpha={ true }
						/>

						<ColorPicker
							label={ __( 'Color', 'flexblocks' ) }
							value={ textColor }
							onChange={ ( value ) =>
								setAttributes( {
									textColor: value
								} )
							}
							onClear={ () =>
								setAttributes( {
									textColor: flexBlocksDefaults.headline.textColor
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
							onClear={ () =>
								setAttributes( {
									linkColor: flexBlocksDefaults.headline.linkColor
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
							onClear={ () =>
								setAttributes( {
									linkColorHover: flexBlocksDefaults.headline.linkColorHover
								} )
							}
							alpha={ false }
						/>
					</PanelBody>

					<PanelBody
						title={ __( 'Spacing', 'flexblocks' ) }
						initialOpen={ false }
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
											{ 'default' === tab.name ? (
												<Fragment>
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
												</Fragment>
											) : '' }

											{ 'tablet' === tab.name ? (
												<Fragment>
													<DimensionsControl { ...this.props }
														type={ 'margin' }
														label={ __( 'Margin', 'flexblocks' ) }
														valueTop={ marginTopTablet }
														valueRight={ marginRightTablet }
														valueBottom={ marginBottomTablet }
														valueLeft={ marginLeftTablet }
														valueUnit={ marginUnit }
														syncUnits={ marginSyncUnitsTablet }
														attrTop={ 'marginTopTablet' }
														attrRight={ 'marginRightTablet' }
														attrBottom={ 'marginBottomTablet' }
														attrLeft={ 'marginLeftTablet' }
														attrUnit={ 'marginUnit' }
														attrSyncUnits={ 'marginSyncUnitsTablet' }
													/>

													<DimensionsControl { ...this.props }
														type={ 'padding' }
														label={ __( 'Padding', 'flexblocks' ) }
														valueTop={ paddingTopTablet }
														valueRight={ paddingRightTablet }
														valueBottom={ paddingBottomTablet }
														valueLeft={ paddingLeftTablet }
														valueUnit={ paddingUnit }
														syncUnits={ paddingSyncUnitsTablet }
														attrTop={ 'paddingTopTablet' }
														attrRight={ 'paddingRightTablet' }
														attrBottom={ 'paddingBottomTablet' }
														attrLeft={ 'paddingLeftTablet' }
														attrUnit={ 'paddingUnit' }
														attrSyncUnits={ 'paddingSyncUnitsTablet' }
													/>
												</Fragment>
											) : '' }

											{ 'mobile' === tab.name ? (
												<Fragment>
													<DimensionsControl { ...this.props }
														type={ 'margin' }
														label={ __( 'Margin', 'flexblocks' ) }
														valueTop={ marginTopMobile }
														valueRight={ marginRightMobile }
														valueBottom={ marginBottomMobile }
														valueLeft={ marginLeftMobile }
														valueUnit={ marginUnit }
														syncUnits={ marginSyncUnitsMobile }
														attrTop={ 'marginTopMobile' }
														attrRight={ 'marginRightMobile' }
														attrBottom={ 'marginBottomMobile' }
														attrLeft={ 'marginLeftMobile' }
														attrUnit={ 'marginUnit' }
														attrSyncUnits={ 'marginSyncUnitsMobile' }
													/>

													<DimensionsControl { ...this.props }
														type={ 'padding' }
														label={ __( 'Padding', 'flexblocks' ) }
														valueTop={ paddingTopMobile }
														valueRight={ paddingRightMobile }
														valueBottom={ paddingBottomMobile }
														valueLeft={ paddingLeftMobile }
														valueUnit={ paddingUnit }
														syncUnits={ paddingSyncUnitsMobile }
														attrTop={ 'paddingTopMobile' }
														attrRight={ 'paddingRightMobile' }
														attrBottom={ 'paddingBottomMobile' }
														attrLeft={ 'paddingLeftMobile' }
														attrUnit={ 'paddingUnit' }
														attrSyncUnits={ 'paddingSyncUnitsMobile' }
													/>
												</Fragment>
											) : '' }
										</div>
									);
								}
							}
						</TabPanel>
					</PanelBody>
				</InspectorControls>

				<InspectorAdvancedControls>
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
				</InspectorAdvancedControls>

				<style>{ css }</style>

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
				/>
			</Fragment>
		);
	}
}

export default ( FlexBlockHeadline );
