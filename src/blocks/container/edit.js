/**
 * Block: Container
 */

import Section from './section-tag';
import ColorPicker from '../../components/color-picker';
import hexToRGBA from '../../components/color-picker/hex-to-rgba';
import getIcon from '../../utils/get-icon';
import classnames from 'classnames';
import DimensionsControl from '../../components/dimensions/';
import TypographyControls from '../../components/typography';
import GradientControl from '../../components/gradient/';
import ApplyFilters from '../../components/apply-filters/';

const { __, _x } = wp.i18n; // Import __() from wp.i18n
const {
	PanelBody,
	RangeControl,
	Button,
	ButtonGroup,
	ResponsiveWrapper,
	ToggleControl,
	SelectControl,
	TextControl,
	Notice,
	Tooltip,
	Icon,
	BaseControl,
} = wp.components;

const {
	Fragment,
	Component
} = wp.element;

const {
	InspectorControls,
	InspectorAdvancedControls,
	InnerBlocks,
	MediaUpload,
	AlignmentToolbar,
} = wp.blockEditor;

const {
	applyFilters
} = wp.hooks;

const ELEMENT_ID_REGEX = /[\s#]/g;
const gbContainerIds = [];

class GenerateBlockContainer extends Component {
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

			gbContainerIds.push( id );
		} else if ( gbContainerIds.includes( this.props.attributes.uniqueId ) ) {
			this.props.setAttributes( {
				uniqueId: id,
			} );

			gbContainerIds.push( id );
		} else {
			gbContainerIds.push( this.props.attributes.uniqueId );
		}
	}

	render() {
		const {
			attributes,
			setAttributes,
			hasChildBlocks,
			clientId,
		} = this.props;

		const {
            selectedDevice,
        } = this.state;

		const onSelectBgImage = ( media ) => {
			setAttributes( {
				bgImage: {
					id: media.id,
					image: media.sizes.full,
				}
			} )
		}

		const onRemoveBgImage = () => {
			setAttributes( {
				bgImage: null
			} )
		}

		const onClearBackgroundColor = () => {
			setAttributes( {
				backgroundColor: null
			} )
		}

		const {
			uniqueId,
			tagName,
			elementId,
			cssClasses,
			isGrid,
			width,
			widthTablet,
			widthMobile,
			outerContainer,
			innerContainer,
			containerWidth,
			minHeight,
			minHeightUnit,
			minHeightTablet,
			minHeightUnitTablet,
			minHeightMobile,
			minHeightUnitMobile,
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
			paddingUnitTablet,
			paddingTopMobile,
			paddingRightMobile,
			paddingBottomMobile,
			paddingLeftMobile,
			paddingUnitMobile,
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
			marginUnitTablet,
			marginTopMobile,
			marginRightMobile,
			marginBottomMobile,
			marginLeftMobile,
			marginUnitMobile,
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
			backgroundColor,
			backgroundColorOpacity,
			gradient,
			gradientDirection,
			gradientColorOne,
			gradientColorOneOpacity,
			gradientColorStopOne,
			gradientColorTwo,
			gradientColorTwoOpacity,
			gradientColorStopTwo,
			textColor,
			linkColor,
			linkColorHover,
			bgImage,
			bgOptions,
			verticalAlignment,
			verticalAlignmentTablet,
			verticalAlignmentMobile,
			zindex,
			removeVerticalGap,
			removeVerticalGapTablet,
			removeVerticalGapMobile,
			orderTablet,
			orderMobile,
			alignment,
			alignmentTablet,
			alignmentMobile,
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
			fullWidthContent,
		} = attributes;

		let backgroundImageValue,
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

		if ( bgImage ) {
			backgroundImageValue = 'url(' + bgImage.image.url + ')';

			if ( bgOptions.overlay ) {
				if ( gradient ) {
					backgroundImageValue = 'linear-gradient(' + gradientDirection + 'deg, ' + hexToRGBA( gradientColorOne, gradientColorOneOpacity ) + gradientColorStopOneValue + ', ' + hexToRGBA( gradientColorTwo, gradientColorTwoOpacity ) + gradientColorStopTwoValue + '), url(' + bgImage.image.url + ')';
				} else {
					backgroundImageValue = 'linear-gradient(0deg, ' + hexToRGBA( backgroundColor, backgroundColorOpacity ) + ', ' + hexToRGBA( backgroundColor, backgroundColorOpacity ) + '), url(' + bgImage.image.url + ')';
				}
			}
		} else if ( gradient ) {
			backgroundImageValue = 'linear-gradient(' + gradientDirection + 'deg, ' + hexToRGBA( gradientColorOne, gradientColorOneOpacity ) + gradientColorStopOneValue + ', ' + hexToRGBA( gradientColorTwo, gradientColorTwoOpacity ) + gradientColorStopTwoValue + ');';
		}

		var outerContainerWidth = '';
		var innerContainerWidth = '';
		var containerWidthPreview = containerWidth;

		if ( ! containerWidthPreview ) {
			containerWidthPreview = generateBlocksDefaults.container.containerWidth;
		}

		if ( 'full' === outerContainer || isGrid ) {
			outerContainerWidth = 'none';
		} else {
			outerContainerWidth = containerWidthPreview + 'px';
		}

		if ( 'full' === innerContainer || isGrid ) {
			innerContainerWidth = 'none';
		} else {
			innerContainerWidth = 'max-width:' + containerWidthPreview + 'px;margin-left: auto;margin-right:auto;';
		}

		var borderStyleValue = '';

		if ( borderSizeTop || borderSizeRight || borderSizeBottom || borderSizeLeft ) {
			borderStyleValue = 'solid';
		}

		var removeVerticalGapStyle = '';

		if ( removeVerticalGap ) {
			removeVerticalGapStyle = 'margin-bottom: 0 !important';
		}

		var zIndexStyle = '';

		if ( zindex ) {
			zIndexStyle = 'z-index:' + zindex + ';position:relative;';
		}

		let fontFamilyFallbackValue = '';

		if ( fontFamily && fontFamilyFallback ) {
			fontFamilyFallbackValue = ', ' + fontFamilyFallback;
		}

		let minHeightCSS = '',
			minHeightInnerWidth = '';

		if ( minHeight && ! isGrid ) {
			minHeightCSS = 'min-height: ' + minHeight + minHeightUnit + ';display: flex;flex-direction: row;align-items:' + verticalAlignment + ';';
			minHeightInnerWidth = 'width: 100%';
		} else if ( minHeight ) {
			minHeightCSS = 'min-height: ' + minHeight + minHeightUnit + ';';
		}

		const css = `
			.gb-container-` + uniqueId + ` {
				background-color: ` + hexToRGBA( backgroundColor, backgroundColorOpacity ) + `;
				color: ` + textColor + `;
		  		background-image: ` + backgroundImageValue + `;
		  		background-size: ` + bgOptions.size + `;
		  		background-position: ` + bgOptions.position + `;
				background-repeat: ` + bgOptions.repeat + `;
				background-attachment: ` + bgOptions.attachment + `;
				border-top-left-radius: ` + borderRadiusTopLeft + borderRadiusUnit + `;
				border-top-right-radius: ` + borderRadiusTopRight + borderRadiusUnit + `;
				border-bottom-right-radius: ` + borderRadiusBottomRight + borderRadiusUnit + `;
				border-bottom-left-radius: ` + borderRadiusBottomLeft + borderRadiusUnit + `;
				border-width: 0;
				border-top-width: ` + borderSizeTop + `px;
				border-right-width: ` + borderSizeRight + `px;
				border-bottom-width: ` + borderSizeBottom + `px;
				border-left-width: ` + borderSizeLeft + `px;
				border-style: ` + borderStyleValue + `;
				border-color: ` + hexToRGBA( borderColor, borderColorOpacity ) + `;
				` + minHeightCSS + `
				margin-top: ` + marginTop + marginUnit + `;
				margin-right: ` + marginRight + marginUnit + `;
				margin-bottom: ` + marginBottom + marginUnit + `;
				margin-left: ` + marginLeft + marginUnit + `;
				` + zIndexStyle + `;
				text-align: ` + alignment + `;
				font-family: ` + fontFamily + fontFamilyFallbackValue + `;
				font-weight: ` + fontWeight + `;
				text-transform: ` + textTransform + `;
				text-align: ` + alignment + `;
				font-size: ` + fontSize + fontSizeUnit + `;
			}

			.gb-container-` + uniqueId + ` a, .gb-container-` + uniqueId + ` a:visited {
			  color: ` + linkColor + `;
			}

			.gb-container-` + uniqueId + ` a:hover {
			  color: ` + linkColorHover + `;
			}

			.gb-container-` + uniqueId + ` > .gb-inside-container {
			  padding-top: ` + paddingTop + paddingUnit + `;
			  padding-right: ` + paddingRight + paddingUnit + `;
			  padding-bottom: ` + paddingBottom + paddingUnit + `;
			  padding-left: ` + paddingLeft + paddingUnit + `;
			  ` + innerContainerWidth + `;
			  ` + minHeightInnerWidth + `;
			}

			.gb-grid-wrapper > div > .block-editor-block-list__layout > #block-` + clientId + ` {
				width: ` + width + `%;
				display: flex;
				flex-direction: column;
				margin-left: 0;
				margin-right: 0;
			}

			.gb-grid-wrapper > div > .block-editor-block-list__layout > #block-` + clientId + ` > .gb-grid-column {
				height: 100%;
			}

			.block-editor-block-list__layout > #block-` + clientId + ` {
				max-width: ` + outerContainerWidth + `;
				` + removeVerticalGapStyle + `
			}

			.gb-grid-column > .gb-container-` + uniqueId + ` {
				display: flex;
				flex-direction: column;
				height: 100%;
				justify-content: ` + verticalAlignment + `;
			}

			.gb-grid-wrapper > div > .block-editor-block-list__layout > #block-` + clientId + ` > .block-editor-block-list__block-edit,
			.gb-grid-wrapper > div > .block-editor-block-list__layout > #block-` + clientId + ` > .block-editor-block-list__block-edit > [data-block="` + clientId + `"],
			.gb-grid-wrapper > div > .block-editor-block-list__layout > #block-` + clientId + ` > .block-editor-block-list__block-edit > [data-block="` + clientId + `"] > .gb-grid-column {
				height: 100%;
			}

			#block-` + clientId + `:not(.has-child-selected):not(.is-selected) .block-list-appender:not(:first-child),
			#block-` + clientId + `:not(.has-child-selected):not(.is-selected) .block-editor-block-list__layout > div:not(:first-child) > .block-list-appender {
				display: none;
			}
		`

		const minHeightUnits = [
			{
				name: _x( 'Pixel', 'A size unit for CSS markup' ),
				unitValue: 'px',
			},
			{
				name: _x( 'VH', 'A size unit for CSS markup' ),
				unitValue: 'vh',
			},
			{
				name: _x( 'VW', 'A size unit for CSS markup' ),
				unitValue: 'vw',
			},
		];

		const pageBuilderContainerOption = document.getElementById( '_generate-full-width-content' );
		const changeEvent = new Event( 'change' );
		const getRootId = wp.data.select( 'core/block-editor' ).getBlockHierarchyRootClientId( clientId );
		const isRootContainer = getRootId === clientId;

		const fullWidthContentOptions = () => {
			return (
				<div>
					{ generateBlocksInfo.isGeneratePress && isRootContainer && pageBuilderContainerOption &&
						<ToggleControl
							label={ __( 'Set Full Width Content', 'generateblocks' ) }
							help={ __( 'This option tells the content container that contains all of the blocks on this page to be full width.', 'generateblocks' ) }
							checked={ fullWidthContent ? true : false }
							onChange={ ( value ) => {
								if ( value ) {
									pageBuilderContainerOption.checked = true;
									pageBuilderContainerOption.setAttribute( 'value', 'true' );
									pageBuilderContainerOption.dispatchEvent( changeEvent );

									setAttributes( {
										fullWidthContent: 'true',
									} );
								} else {
									pageBuilderContainerOption.checked = false;
									pageBuilderContainerOption.setAttribute( 'value', '' );
									document.querySelector( 'input[name="_generate-full-width-content"]#default-content' ).checked = true;
									pageBuilderContainerOption.dispatchEvent( changeEvent );

									setAttributes( {
										fullWidthContent: '',
									} );
								}
							} }
						/>
					}
				</div>
			);
		}

		return (
			<Fragment>
				<InspectorControls>
					<div className="gb-responsive-tabs">
						<Tooltip text={ __( 'Show options for all devices', 'generateblocks' ) } key={ 'desktop-tab' }>
							<Button
								isLarge
								isPressed={ 'desktop' === selectedDevice ? true : false }
								onClick={ () => {
									this.setState( {
										selectedDevice: 'desktop',
									} );
								} }
							>
								{ __( 'Desktop', 'generateblocks' ) }
							</Button>
						</Tooltip>

						<Tooltip text={ __( 'Show options for tablet devices' ) } key={ 'tablet-tab' }>
							<Button
								isLarge
								isPressed={ 'tablet' === selectedDevice ? true : false }
								onClick={ () => {
									this.setState( {
										selectedDevice: 'tablet',
									} );
								} }
							>
								{ __( 'Tablet', 'generateblocks' ) }
							</Button>
						</Tooltip>

						<Tooltip text={ __( 'Show options for mobile devices' ) } key={ 'desktop-tab' }>
							<Button
								isLarge
								isPressed={ 'mobile' === selectedDevice ? true : false }
								onClick={ () => {
									this.setState( {
										selectedDevice: 'mobile',
									} );
								} }
							>
								{ __( 'Mobile', 'generateblocks' ) }
							</Button>
						</Tooltip>
					</div>

					{ ! isGrid && 'desktop' === selectedDevice && (
						<PanelBody>
							<Fragment>
								{ fullWidthContentOptions() }

								<SelectControl
									label={ __( 'Container', 'generateblocks' ) }
									value={ outerContainer }
									options={ [
										{ label: __( 'Full width', 'generateblocks' ), value: 'full' },
										{ label: __( 'Contained', 'generateblocks' ), value: 'contained' },
									] }
									onChange={ ( outerContainer ) => { setAttributes( { outerContainer } ) } }
								/>

								{ ! generateBlocksInfo.isGeneratePress && 'full' === outerContainer &&
									<BaseControl
										label={ __( 'Full width containers will only work if your theme allows you to set your content to be full width.', 'generateblocks' ) }
									/>
								}

								<SelectControl
									label={ __( 'Inner Container', 'generateblocks' ) }
									value={ innerContainer }
									options={ [
										{ label: __( 'Full width', 'generateblocks' ), value: 'full' },
										{ label: __( 'Contained', 'generateblocks' ), value: 'contained' },
									] }
									onChange={ ( innerContainer ) => { setAttributes( { innerContainer } ) } }
								/>

								<div className="components-gblocks-control__header">
									<div className="components-gblocks-control__label">
										{ __( 'Container Width', 'generateblocks' ) }
									</div>

									<div className="components-gblocks-control__units">
										<Tooltip text={ __( 'Pixel Units' ) } key={ 'container-width-unit' }>
											<Button
												key={ 'container-width-unit' }
												isSmall
												isPrimary={ true }
												/* translators: %s: values associated with CSS syntax, 'Pixel', 'Em', 'Percentage' */
												aria-label={ __( 'Pixel Units' ) }
											>
												px
											</Button>
										</Tooltip>
									</div>
								</div>

								<TextControl
									type={ 'number' }
									value={ parseFloat( containerWidth ) || '' }
									onChange={ ( value ) => {
										setAttributes( {
											containerWidth: '' !== value ? parseFloat( value ) : undefined
										} );
									} }
								/>
							</Fragment>
						</PanelBody>
					) }

					{ isGrid && (
						<PanelBody className="section-grid-panel">
							{ 'desktop' === selectedDevice && (
								<Fragment>
									<div className="components-gblocks-control__header">
										<div className="components-gblocks-control__label">
											{ __( 'Container Width', 'generateblocks' ) }
										</div>

										<div className="components-gblocks-control__units">
											<Tooltip text={ __( 'Percentage Units' ) } key={ 'percentage-unit' }>
												<Button
													key={ 'percentage-unit' }
													isSmall
													isPrimary={ true }
													/* translators: %s: values associated with CSS syntax, 'Pixel', 'Em', 'Percentage' */
													aria-label={ __( 'Percentage Units' ) }
												>
													%
												</Button>
											</Tooltip>
										</div>
									</div>

									<ButtonGroup className={ 'widthButtons' }>
										<Button isLarge isPrimary={ width === 25 } onClick={ () => { setAttributes( { width: 25 } ); } }>25</Button>
										<Button isLarge isPrimary={ width === 33.33 } onClick={ () => { setAttributes( { width: 33.33 } ); } }>33</Button>
										<Button isLarge isPrimary={ width === 50 } onClick={ () => { setAttributes( { width: 50 } ); } }>50</Button>
										<Button isLarge isPrimary={ width === 66.66 } onClick={ () => { setAttributes( { width: 66.66 } ); } }>66</Button>
										<Button isLarge isPrimary={ width === 75 } onClick={ () => { setAttributes( { width: 75 } ); } }>75</Button>
										<Button isLarge isPrimary={ width === 100 } onClick={ () => { setAttributes( { width: 100 } ); } }>100</Button>
									</ButtonGroup>

									<RangeControl
										className={ 'gblocks-column-width-control' }
										value={ width || '' }
										onChange={ ( value ) => {
											setAttributes( {
												width: value
											} );
										} }
										min={ 0 }
										max={ 100 }
										step={ 0.01 }
										allowReset={ true }
										initialPosition={ generateBlocksDefaults.container.width }
									/>

									<SelectControl
										label={ __( 'Vertical Alignment', 'generateblocks' ) }
										help={ __( 'Align grid item content. Does not apply if vertical alignment is set in the grid.', 'generateblocks' ) }
										value={ verticalAlignment }
										options={ [
											{ label: __( 'Default', 'generateblocks' ), value: '' },
											{ label: __( 'Top', 'generateblocks' ), value: 'flex-start' },
											{ label: __( 'Center', 'generateblocks' ), value: 'center' },
											{ label: __( 'Bottom', 'generateblocks' ), value: 'flex-end' },
										] }
										onChange={ ( verticalAlignment ) => {
											setAttributes( { verticalAlignment } )
										} }
									/>

									<ToggleControl
										label={ __( 'Remove Vertical Gap', 'generateblocks' ) }
										checked={ !! removeVerticalGap }
										onChange={ ( value ) => {
											setAttributes( {
												removeVerticalGap: value
											} );
										} }
									/>
								</Fragment>
							) }

							{ 'tablet' === selectedDevice && (
								<Fragment>
									<div className="components-gblocks-control__header">
										<div className="components-gblocks-control__label">
											{ __( 'Container Width', 'generateblocks' ) }
										</div>

										<div className="components-gblocks-control__units">
											<Tooltip text={ __( 'Percentage Units' ) } key={ 'percentage-unit' }>
												<Button
													key={ 'percentage-unit' }
													isSmall
													isPrimary={ true }
													/* translators: %s: values associated with CSS syntax, 'Pixel', 'Em', 'Percentage' */
													aria-label={ __( 'Percentage Units' ) }
												>
													%
												</Button>
											</Tooltip>
										</div>
									</div>

									<ButtonGroup className={ 'widthButtons' }>
										<Button isLarge isPrimary={ widthTablet === 25 } onClick={ () => { setAttributes( { widthTablet: 25 } ); } }>25</Button>
										<Button isLarge isPrimary={ widthTablet === 33.33 } onClick={ () => { setAttributes( { widthTablet: 33.33 } ); } }>33</Button>
										<Button isLarge isPrimary={ widthTablet === 50 } onClick={ () => { setAttributes( { widthTablet: 50 } ); } }>50</Button>
										<Button isLarge isPrimary={ widthTablet === 66.66 } onClick={ () => { setAttributes( { widthTablet: 66.66 } ); } }>66</Button>
										<Button isLarge isPrimary={ widthTablet === 75 } onClick={ () => { setAttributes( { widthTablet: 75 } ); } }>75</Button>
										<Button isLarge isPrimary={ widthTablet === 100 } onClick={ () => { setAttributes( { widthTablet: 100 } ); } }>100</Button>
									</ButtonGroup>

									<RangeControl
										className={ 'gblocks-column-width-control' }
										value={ widthTablet || '' }
										onChange={ ( value ) => {
											setAttributes( {
												widthTablet: value
											} );
										} }
										min={ 0 }
										max={ 100 }
										step={ 0.01 }
										allowReset={ true }
										initialPosition={ generateBlocksDefaults.container.widthTablet }
									/>

									<SelectControl
										label={ __( 'Vertical Alignment', 'generateblocks' ) }
										help={ __( 'Align grid item content. Does not apply if vertical alignment is set in the grid.', 'generateblocks' ) }
										value={ verticalAlignmentTablet }
										options={ [
											{ label: __( 'Inherit', 'generateblocks' ), value: 'inherit'},
											{ label: __( 'Default', 'generateblocks' ), value: '' },
											{ label: __( 'Top', 'generateblocks' ), value: 'flex-start' },
											{ label: __( 'Center', 'generateblocks' ), value: 'center' },
											{ label: __( 'Bottom', 'generateblocks' ), value: 'flex-end' },
										] }
										onChange={ ( verticalAlignmentTablet ) => {
											setAttributes( { verticalAlignmentTablet } )
										} }
									/>

									<ToggleControl
										label={ __( 'Remove Vertical Gap', 'generateblocks' ) }
										checked={ !! removeVerticalGapTablet }
										onChange={ ( value ) => {
											setAttributes( {
												removeVerticalGapTablet: value
											} );
										} }
									/>

									<TextControl
										type={ 'number' }
										label={ __( 'Order', 'generateblocks' ) }
										value={ orderTablet ? orderTablet : '' }
										onChange={ ( value ) => {
											setAttributes( {
												orderTablet: parseFloat( value )
											} );
										} }
									/>
								</Fragment>
							) }

							{ 'mobile' === selectedDevice && (
								<Fragment>
									<div className="components-gblocks-control__header">
										<div className="components-gblocks-control__label">
											{ __( 'Container Width', 'generateblocks' ) }
										</div>

										<div className="components-gblocks-control__units">
											<Tooltip text={ __( 'Percentage Units' ) } key={ 'percentage-unit' }>
												<Button
													key={ 'percentage-unit' }
													isSmall
													isPrimary={ true }
													/* translators: %s: values associated with CSS syntax, 'Pixel', 'Em', 'Percentage' */
													aria-label={ __( 'Percentage Units' ) }
												>
													%
												</Button>
											</Tooltip>
										</div>
									</div>

									<ButtonGroup className={ 'widthButtons' }>
										<Button isLarge isPrimary={ widthMobile === 25 } onClick={ () => { setAttributes( { widthMobile: 25 } ); } }>25</Button>
										<Button isLarge isPrimary={ widthMobile === 33.33 } onClick={ () => { setAttributes( { widthMobile: 33.33 } ); } }>33</Button>
										<Button isLarge isPrimary={ widthMobile === 50 } onClick={ () => { setAttributes( { widthMobile: 50 } ); } }>50</Button>
										<Button isLarge isPrimary={ widthMobile === 66.66 } onClick={ () => { setAttributes( { widthMobile: 66.66 } ); } }>66</Button>
										<Button isLarge isPrimary={ widthMobile === 75 } onClick={ () => { setAttributes( { widthMobile: 75 } ); } }>75</Button>
										<Button isLarge isPrimary={ widthMobile === 100 } onClick={ () => { setAttributes( { widthMobile: 100 } ); } }>100</Button>
									</ButtonGroup>

									<RangeControl
										className={ 'gblocks-column-width-control' }
										value={ widthMobile || '' }
										onChange={ ( value ) => {
											setAttributes( {
												widthMobile: value
											} );
										} }
										min={ 0 }
										max={ 100 }
										step={ 0.01 }
										allowReset={ true }
										initialPosition={ generateBlocksDefaults.container.widthMobile }
									/>

									<SelectControl
										label={ __( 'Vertical Alignment', 'generateblocks' ) }
										help={ __( 'Align grid item content. Does not apply if vertical alignment is set in the grid.', 'generateblocks' ) }
										value={ verticalAlignmentMobile }
										options={ [
											{ label: __( 'Inherit', 'generateblocks' ), value: 'inherit'},
											{ label: __( 'Default', 'generateblocks' ), value: '' },
											{ label: __( 'Top', 'generateblocks' ), value: 'flex-start' },
											{ label: __( 'Center', 'generateblocks' ), value: 'center' },
											{ label: __( 'Bottom', 'generateblocks' ), value: 'flex-end' },
										] }
										onChange={ ( verticalAlignmentMobile ) => {
											setAttributes( { verticalAlignmentMobile } )
										} }
									/>

									<ToggleControl
										label={ __( 'Remove Vertical Gap', 'generateblocks' ) }
										checked={ !! removeVerticalGapMobile }
										onChange={ ( value ) => {
											setAttributes( {
												removeVerticalGapMobile: value
											} );
										} }
									/>

									<TextControl
										type={ 'number' }
										label={ __( 'Order', 'generateblocks' ) }
										value={ orderMobile ? orderMobile : '' }
										onChange={ ( value ) => {
											setAttributes( {
												orderMobile: parseFloat( value )
											} );
										} }
									/>
								</Fragment>
							) }
						</PanelBody>
					) }

					<PanelBody
						title={ __( 'Typography', 'generateblocks' ) }
						initialOpen={ false }
						icon={ getIcon( 'typography' ) }
						className={ 'gblocks-panel-label' }
						>

							{ 'desktop' === selectedDevice && (
								<Fragment>
									<BaseControl label={ __( 'Text Alignment', 'generateblocks' ) }>
										<AlignmentToolbar
											isCollapsed={ false }
											value={ alignment }
											onChange={ ( value ) => {
												setAttributes( { alignment: value } );
											} }
										/>
									</BaseControl>

									<TypographyControls { ...this.props }
										showFontFamily={ true }
										showFontWeight={ true }
										showTextTransform={ true }
										showFontSize={ true }
										defaultFontSize={ generateBlocksDefaults.container.fontSize }
										defaultFontSizeUnit={ generateBlocksDefaults.container.fontSizeUnit }
										defaultLineHeight={ generateBlocksDefaults.container.lineHeight }
										defaultLineHeightUnit={ generateBlocksDefaults.container.lineHeightUnit }
										defaultLetterSpacing={ generateBlocksDefaults.container.letterSpacing }
									/>
								</Fragment>
							) }

							{ 'tablet' === selectedDevice && (
								<Fragment>
									<BaseControl label={ __( 'Text Alignment', 'generateblocks' ) }>
										<AlignmentToolbar
											isCollapsed={ false }
											value={ alignmentTablet }
											onChange={ ( value ) => {
												setAttributes( { alignmentTablet: value } );
											} }
										/>
									</BaseControl>

									<TypographyControls { ...this.props }
										showFontSize={ true }
										defaultFontSize={ generateBlocksDefaults.container.fontSizeTablet }
										defaultFontSizeUnit={ generateBlocksDefaults.container.fontSizeUnit }
										defaultLineHeight={ generateBlocksDefaults.container.lineHeightTablet }
										defaultLineHeightUnit={ generateBlocksDefaults.container.lineHeightUnit }
										defaultLetterSpacing={ generateBlocksDefaults.container.letterSpacingTablet }
									/>
								</Fragment>
							) }

							{ 'mobile' === selectedDevice && (
								<Fragment>
									<BaseControl label={ __( 'Text Alignment', 'generateblocks' ) }>
										<AlignmentToolbar
											isCollapsed={ false }
											value={ alignmentMobile }
											onChange={ ( value ) => {
												setAttributes( { alignmentMobile: value } );
											} }
										/>
									</BaseControl>

									<TypographyControls { ...this.props }
										showFontSize={ true }
										defaultFontSize={ generateBlocksDefaults.container.fontSizeMobile }
										defaultFontSizeUnit={ generateBlocksDefaults.container.fontSizeUnit }
										defaultLineHeight={ generateBlocksDefaults.container.lineHeightMobile }
										defaultLineHeightUnit={ generateBlocksDefaults.container.lineHeightUnit }
										defaultLetterSpacing={ generateBlocksDefaults.container.letterSpacingMobile }
									/>
								</Fragment>
							) }
					</PanelBody>

					<PanelBody
						title={ __( 'Spacing', 'generateblocks' ) }
						initialOpen={ false }
						icon={ getIcon( 'spacing' ) }
						className={ 'gblocks-panel-label' }
					>

						{ 'desktop' === selectedDevice && (
							<Fragment>
								<div className="components-gblocks-dimensions-control__header">
									<div className="components-gblocks-dimensions-control__label">
										{ __( 'Minimum Height', 'generateblocks' ) }
									</div>

									<div className="components-gblocks-control__units">
										<ButtonGroup className="components-gblocks-dimensions-control__units" aria-label={ __( 'Select Units' ) }>
											{ minHeightUnits.map( ( unit ) =>
												/* translators: %s: values associated with CSS syntax, 'Pixel', 'Em', 'Percentage' */
												<Tooltip text={ sprintf( __( '%s Units' ), unit.name ) } key={ unit.unitValue }>
													<Button
														key={ unit.unitValue }
														className={ 'components-gblocks-dimensions-control__units--' + unit.name }
														isSmall
														isPrimary={ minHeightUnit === unit.unitValue }
														aria-pressed={ minHeightUnit === unit.unitValue }
														/* translators: %s: values associated with CSS syntax, 'Pixel', 'Em', 'Percentage' */
														aria-label={ sprintf( __( '%s Units' ), unit.name ) }
														onClick={ () => setAttributes( { minHeightUnit: unit.unitValue } ) }
													>
														{ unit.unitValue }
													</Button>
												</Tooltip>
											) }
										</ButtonGroup>
									</div>
								</div>

								<TextControl
									type={ 'number' }
									value={ minHeight ? minHeight : '' }
									onChange={ ( value ) => {
										setAttributes( {
											minHeight: parseFloat( value )
										} );
									} }
								/>

								{ !! minHeight && ! isGrid &&
									<SelectControl
										label={ __( 'Vertical Alignment', 'generateblocks' ) }
										value={ verticalAlignment }
										options={ [
											{ label: __( 'Default', 'generateblocks' ), value: '' },
											{ label: __( 'Top', 'generateblocks' ), value: 'flex-start' },
											{ label: __( 'Center', 'generateblocks' ), value: 'center' },
											{ label: __( 'Bottom', 'generateblocks' ), value: 'flex-end' },
										] }
										onChange={ ( verticalAlignment ) => {
											setAttributes( { verticalAlignment } )
										} }
									/>
								}

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
								<div className="components-gblocks-dimensions-control__header">
									<div className="components-gblocks-dimensions-control__label">
										{ __( 'Minimum Height', 'generateblocks' ) }
									</div>

									<div className="components-gblocks-control__units">
										<ButtonGroup className="components-gblocks-dimensions-control__units" aria-label={ __( 'Select Units' ) }>
											{ minHeightUnits.map( ( unit ) =>
												/* translators: %s: values associated with CSS syntax, 'Pixel', 'Em', 'Percentage' */
												<Tooltip text={ sprintf( __( '%s Units' ), unit.name ) } key={ unit.unitValue }>
													<Button
														key={ unit.unitValue }
														className={ 'components-gblocks-dimensions-control__units--' + unit.name }
														isSmall
														isPrimary={ minHeightUnitTablet === unit.unitValue }
														aria-pressed={ minHeightUnitTablet === unit.unitValue }
														/* translators: %s: values associated with CSS syntax, 'Pixel', 'Em', 'Percentage' */
														aria-label={ sprintf( __( '%s Units' ), unit.name ) }
														onClick={ () => setAttributes( { minHeightUnitTablet: unit.unitValue } ) }
													>
														{ unit.unitValue }
													</Button>
												</Tooltip>
											) }
										</ButtonGroup>
									</div>
								</div>

								<TextControl
									type={ 'number' }
									value={ minHeightTablet ? minHeightTablet : '' }
									onChange={ ( value ) => {
										setAttributes( {
											minHeightTablet: parseFloat( value )
										} );
									} }
								/>

								{ ( !! minHeight || !! minHeightTablet ) && ! isGrid &&
									<SelectControl
										label={ __( 'Vertical Alignment', 'generateblocks' ) }
										value={ verticalAlignmentTablet }
										options={ [
											{ label: __( 'Inherit', 'generateblocks' ), value: 'inherit'},
											{ label: __( 'Default', 'generateblocks' ), value: '' },
											{ label: __( 'Top', 'generateblocks' ), value: 'flex-start' },
											{ label: __( 'Center', 'generateblocks' ), value: 'center' },
											{ label: __( 'Bottom', 'generateblocks' ), value: 'flex-end' },
										] }
										onChange={ ( verticalAlignmentTablet ) => {
											setAttributes( { verticalAlignmentTablet } )
										} }
									/>
								}

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
								<div className="components-gblocks-dimensions-control__header">
									<div className="components-gblocks-dimensions-control__label">
										{ __( 'Minimum Height', 'generateblocks' ) }
									</div>

									<div className="components-gblocks-control__units">
										<ButtonGroup className="components-gblocks-dimensions-control__units" aria-label={ __( 'Select Units' ) }>
											{ minHeightUnits.map( ( unit ) =>
												/* translators: %s: values associated with CSS syntax, 'Pixel', 'Em', 'Percentage' */
												<Tooltip text={ sprintf( __( '%s Units' ), unit.name ) } key={ unit.unitValue }>
													<Button
														key={ unit.unitValue }
														className={ 'components-gblocks-dimensions-control__units--' + unit.name }
														isSmall
														isPrimary={ minHeightUnitMobile === unit.unitValue }
														aria-pressed={ minHeightUnitMobile === unit.unitValue }
														/* translators: %s: values associated with CSS syntax, 'Pixel', 'Em', 'Percentage' */
														aria-label={ sprintf( __( '%s Units' ), unit.name ) }
														onClick={ () => setAttributes( { minHeightUnitMobile: unit.unitValue } ) }
													>
														{ unit.unitValue }
													</Button>
												</Tooltip>
											) }
										</ButtonGroup>
									</div>
								</div>

								<TextControl
									type={ 'number' }
									value={ minHeightMobile ? minHeightMobile : '' }
									onChange={ ( value ) => {
										setAttributes( {
											minHeightMobile: parseFloat( value )
										} );
									} }
								/>

								{ ( !! minHeight || !! minHeightTablet || !! minHeightMobile ) && ! isGrid &&
									<SelectControl
										label={ __( 'Vertical Alignment', 'generateblocks' ) }
										value={ verticalAlignmentMobile }
										options={ [
											{ label: __( 'Inherit', 'generateblocks' ), value: 'inherit'},
											{ label: __( 'Default', 'generateblocks' ), value: '' },
											{ label: __( 'Top', 'generateblocks' ), value: 'flex-start' },
											{ label: __( 'Center', 'generateblocks' ), value: 'center' },
											{ label: __( 'Bottom', 'generateblocks' ), value: 'flex-end' },
										] }
										onChange={ ( verticalAlignmentMobile ) => {
											setAttributes( { verticalAlignmentMobile } )
										} }
									/>
								}

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
									type={ 'margin' }
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

							<ApplyFilters name="generateblocks.editor.controls" attribute="containerColors" props={ this.props }>
								<Fragment>
									<ColorPicker
										label={ __( 'Background Color', 'generateblocks' ) }
										value={ backgroundColor }
										alpha={ true }
										valueOpacity={ backgroundColorOpacity }
										attrOpacity={ 'backgroundColorOpacity' }
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
										onChange={ ( nextTextColor ) =>
											setAttributes( {
												textColor: nextTextColor
											} )
										}
									/>

									<ColorPicker
										label={ __( 'Link Color', 'generateblocks' ) }
										value={ linkColor }
										alpha={ false }
										onChange={ ( nextLinkColor ) =>
											setAttributes( {
												linkColor: nextLinkColor
											} )
										}
									/>

									<ColorPicker
										label={ __( 'Link Color Hover', 'generateblocks' ) }
										value={ linkColorHover }
										alpha={ false }
										onChange={ ( nextLinkColorHover ) =>
											setAttributes( {
												linkColorHover: nextLinkColorHover
											} )
										}
									/>

									<ColorPicker
										label={ __( 'Border Color', 'generateblocks' ) }
										value={ borderColor }
										alpha={ true }
										valueOpacity={ borderColorOpacity }
										attrOpacity={ 'borderColorOpacity' }
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
							</ApplyFilters>
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
								attrGradientColorStopOne={ 'gradientColorStopOne' }
								attrGradientColorTwo={ 'gradientColorTwo' }
								attrGradientColorStopTwo={ 'gradientColorStopTwo' }
								attrGradientColorOneOpacity={ 'gradientColorOneOpacity' }
								attrGradientColorTwoOpacity={ 'gradientColorTwoOpacity' }
								defaultColorOne={ generateBlocksDefaults.container.gradientColorOne }
								defaultColorTwo={ generateBlocksDefaults.container.gradientColorTwo }
							/>
						</PanelBody>
					}

					{ 'desktop' === selectedDevice &&
						<PanelBody
							title={ __( 'Background Image' ) }
							initialOpen={ false }
							icon={ getIcon( 'backgrounds' ) }
							className={ 'gblocks-panel-label' }
						>
							{ ! bgImage && (
								<div>
									<MediaUpload
										title={ __( 'Set background image', 'generateblocks' ) }
										onSelect={ onSelectBgImage }
										allowedTypes={["image"]}
										modalClass="editor-post-featured-image__media-modal"
										render={ ( { open } ) => (
											<Button className="editor-post-featured-image__toggle" onClick={ open }>
												{ __( 'Set background image', 'generateblocks' ) }
											</Button>
										) }
									/>
								</div>
							) }

							{ !! bgImage && (
								<MediaUpload
									title={ __( 'Set background image', 'generateblocks' ) }
									onSelect={ onSelectBgImage }
									allowedTypes={["image"]}
									value={ bgImage.id }
									modalClass="editor-post-featured-image__media-modal"
									render={ ( { open } ) => (
										<div className="editor-bg-image">
											<Button className="editor-post-featured-image__preview" onClick={ open }>
												<ResponsiveWrapper
													naturalWidth={ bgImage.image.width }
													naturalHeight={ bgImage.image.height }
												>
													<img src={ bgImage.image.url } alt={ __( 'BG Image' ) } />
												</ResponsiveWrapper>
											</Button>
											<div className={ 'edit-bg-buttons' }>
												<Button onClick={ open } isDefault isLarge>
													{ __( 'Replace image' ) }
												</Button>
												<Button onClick={ onRemoveBgImage } isLink isDestructive>
													{ __('Remove background image') }
												</Button>
											</div>
										</div>
									) }
								/>
							) }

							{ !! bgImage && (
								<div className="section-bg-settings">
									<ToggleControl
										label={ __( 'Background Color Overlay', 'generateblocks' ) }
										checked={ !! bgOptions.overlay }
										onChange={ ( nextOverlay ) => {
											setAttributes( {
												bgOptions: {
													...bgOptions,
													overlay: nextOverlay,
												},
											} );
										} }
									/>

									{ !! bgOptions.overlay && (
										<div className="gblocks-notice">
											{ __( 'Your background color must have transparency for the image to show.', 'generateblocks' ) }
										</div>
									) }

									<TextControl
										label={ __( 'Size', 'generateblocks' ) }
										value={ bgOptions.size }
										onChange={ ( nextSize ) => {
											setAttributes( {
												bgOptions: {
													...bgOptions,
													size: nextSize,
												},
											} );
										} }
									/>

									<TextControl
										label={ __( 'Position', 'generateblocks' ) }
										value={ bgOptions.position }
										onChange={ ( nextPosition ) => {
											setAttributes( {
												bgOptions: {
													...bgOptions,
													position: nextPosition,
												},
											} );
										} }
									/>

									<SelectControl
										label={ __( 'Repeat', 'generateblocks' ) }
										value={ bgOptions.repeat }
										options={ [
											{ label: 'no-repeat', value: 'no-repeat' },
											{ label: 'repeat', value: 'repeat' },
											{ label: 'repeat-x', value: 'repeat-x' },
											{ label: 'repeat-y', value: 'repeat-y' },
										] }
										onChange={ ( nextRepeat ) => {
											setAttributes( {
												bgOptions: {
													...bgOptions,
													repeat: nextRepeat,
												},
											} );
										} }
									/>

									<SelectControl
										label={ __( 'Attachment', 'generateblocks' ) }
										value={ bgOptions.attachment }
										options={ [
											{ label: 'scroll', value: '' },
											{ label: 'fixed', value: 'fixed' },
											{ label: 'local', value: 'local' },
										] }
										onChange={ ( nextAttachment ) => {
											setAttributes( {
												bgOptions: {
													...bgOptions,
													attachment: nextAttachment,
												},
											} );
										} }
									/>
								</div>
							) }
						</PanelBody>
					}

					<ApplyFilters name="generateblocks.editor.panels" attribute="afterContainerBackgrounds" props={ this.props }></ApplyFilters>

					{ 'desktop' === selectedDevice &&
						<PanelBody
							title={ __( 'Advanced', 'generateblocks' ) }
							initialOpen={ false }
							icon={ getIcon( 'advanced' ) }
							className={ 'gblocks-panel-label' }
						>
							<SelectControl
								label={ __( 'Element Tag', 'generateblocks' ) }
								value={ tagName }
								options={ [
									{ label: 'div', value: 'div' },
									{ label: 'section', value: 'section' },
									{ label: 'header', value: 'header' },
									{ label: 'footer', value: 'footer' },
								] }
								onChange={ ( tagName ) => { setAttributes( { tagName } ) } }
							/>

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

							<RangeControl
								label={ __( 'z-index', 'generateblocks' ) }
								value={ zindex || '' }
								onChange={ ( value ) => {
									setAttributes( {
										zindex: value
									} );
								} }
								min={ -200 }
								max={ 200 }
								step={ 10 }
							/>

							<ApplyFilters name="generateblocks.editor.controls" attribute="containerAdvanced" props={ this.props }></ApplyFilters>
						</PanelBody>
					}

					<PanelBody
						title={ __( 'Documentation', 'generateblocks' ) }
						icon={ getIcon( 'documentation' ) }
						initialOpen={ false }
						className={ 'gblocks-panel-label' }
					>
						<p>{ __( 'Need help with this block?', 'generateblocks' ) }</p>
						<a href="https://docs.generateblocks.com/collection/container/" target="_blank" rel="noreferrer noopener">{ __( 'Visit our documentation', 'generateblocks' ) }</a>
					</PanelBody>
				</InspectorControls>

				<style>{ css }</style>

				{ !! isGrid && (
					<div className={ classnames( {
						'gb-grid-column': true,
						[`gb-grid-column-${ uniqueId }`]: true
					} ) }>
						<Section
							tagName={ tagName }
							id={ elementId }
							className={ classnames( {
								'gb-container': true,
								[`gb-container-${ uniqueId }`]: true,
								[`${ cssClasses }`]: '' !== cssClasses
							} ) }
						>
							{ applyFilters( 'generateblocks.editor.insideContainerWrapper', '', this.props ) }
							<div
								className={ classnames( {
								'gb-inside-container': true
								} ) }
							>
								<InnerBlocks
									templateLock={ false }
									renderAppender={ (
										hasChildBlocks ?
											undefined :
											() => <InnerBlocks.ButtonBlockAppender />
									) }
								/>
							</div>
						</Section>
					</div>
				) }

				{ ! isGrid && (
					<Section
						tagName={ tagName }
						id={ elementId }
						className={ classnames( {
							'gb-container': true,
							[`gb-container-${ uniqueId }`]: true,
							[`${ cssClasses }`]: '' !== cssClasses
						} ) }
					>
						{ applyFilters( 'generateblocks.editor.insideContainerWrapper', '', this.props ) }
						<div
							className={ classnames( {
							'gb-inside-container': true
							} ) }
						>
							<InnerBlocks
								templateLock={ false }
								renderAppender={ (
									hasChildBlocks ?
										undefined :
										() => <InnerBlocks.ButtonBlockAppender />
								) }
							/>
						</div>
					</Section>
				) }

			</Fragment>
		);
	}
}

export default ( GenerateBlockContainer );
