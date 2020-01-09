/**
 * Block: Container
 */

import Section from './section-tag';
import ColorPicker from '../../components/color-picker';
import hexToRGBA from '../../components/color-picker/hex-to-rgba';
import getIcon from '../../utils/get-icon';
import classnames from 'classnames';
import DimensionsControl from '../../components/dimensions/';
import GradientControl from '../../components/gradient/';

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
	TabPanel,
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
} = wp.blockEditor;

const ELEMENT_ID_REGEX = /[\s#]/g;
const fbContainerIds = [];

class FlexBlockContainer extends Component {
	constructor() {
		super( ...arguments );
	}

	componentDidMount() {
		let id = this.props.clientId.substr( 2, 9 ).replace( '-', '' );

		if ( ! this.props.attributes.uniqueId ) {
			this.props.setAttributes( {
				uniqueId: id,
			} );

			fbContainerIds.push( id );
		} else if ( fbContainerIds.includes( this.props.attributes.uniqueId ) ) {
			this.props.attributes.uniqueId = id; // Need this to update ID on duplicate.

			this.props.setAttributes( {
				uniqueId: id,
			} );

			fbContainerIds.push( id );
		} else {
			fbContainerIds.push( this.props.attributes.uniqueId );
		}
	}

	render() {
		const {
			attributes,
			setAttributes,
			toggleSelection,
			hasChildBlocks,
			clientId,
			isSelected,
		} = this.props;

		const onSelectBgImage = ( media ) => {
			setAttributes( {
				bgImage: {
					id: media.id,
					image: media.sizes.large || media.sizes.full,
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
					backgroundImageValue = 'linear-gradient(' + gradientDirection + ', ' + hexToRGBA( gradientColorOne, gradientColorOneOpacity ) + gradientColorStopOneValue + ', ' + hexToRGBA( gradientColorTwo, gradientColorTwoOpacity ) + gradientColorStopTwoValue + '), url(' + bgImage.image.url + ')';
				} else {
					backgroundImageValue = 'linear-gradient(0deg, ' + hexToRGBA( backgroundColor, backgroundColorOpacity ) + ', ' + hexToRGBA( backgroundColor, backgroundColorOpacity ) + '), url(' + bgImage.image.url + ')';
				}
			}
		} else if ( gradient ) {
			backgroundImageValue = 'linear-gradient(' + gradientDirection + ', ' + hexToRGBA( gradientColorOne, gradientColorOneOpacity ) + gradientColorStopOneValue + ', ' + hexToRGBA( gradientColorTwo, gradientColorTwoOpacity ) + gradientColorStopTwoValue + ');';
		}

		var outerContainerWidth = '';
		var innerContainerWidth = '';

		if ( 'full' === outerContainer || isGrid ) {
			outerContainerWidth = 'none';
		} else {
			outerContainerWidth = containerWidth + 'px';
		}

		if ( 'full' === innerContainer || isGrid ) {
			innerContainerWidth = 'none';
		} else {
			innerContainerWidth = 'max-width:' + containerWidth + 'px;margin-left: auto;margin-right:auto;';
		}

		var borderStyleValue = '';

		if ( borderSizeTop || borderSizeRight || borderSizeBottom || borderSizeLeft ) {
			borderStyleValue = 'solid';
		}

		var removeVerticalGapStyle = '';

		if ( removeVerticalGap ) {
			removeVerticalGapStyle = 'margin-bottom: 0 !important';
		}

		const css = `
			.fx-container-` + uniqueId + ` {
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
				min-height: ` + minHeight + minHeightUnit + `;
			}

			.fx-container-` + uniqueId + ` a, .fx-container-` + uniqueId + ` a:visited {
			  color: ` + linkColor + `;
			}

			.fx-container-` + uniqueId + ` a:hover {
			  color: ` + linkColorHover + `;
			}

			.fx-container-` + uniqueId + ` > .fx-inside-container {
			  padding-top: ` + paddingTop + paddingUnit + `;
			  padding-right: ` + paddingRight + paddingUnit + `;
			  padding-bottom: ` + paddingBottom + paddingUnit + `;
			  padding-left: ` + paddingLeft + paddingUnit + `;
			  ` + innerContainerWidth + `;
			}

			.fx-grid-wrapper > div > .block-editor-block-list__layout > #block-` + clientId + ` {
				width: ` + width + `%;
				display: flex;
				flex-direction: column;
			}

			.block-editor-block-list__layout > #block-` + clientId + ` {
				max-width: ` + outerContainerWidth + `;
				` + removeVerticalGapStyle + `
			}

			.fx-grid-column > .fx-container-` + uniqueId + ` {
				display: flex;
				flex-direction: column;
				height: 100%;
				justify-content: ` + verticalAlignment + `;
			}

			.fx-grid-wrapper > div > .block-editor-block-list__layout > #block-` + clientId + ` > .editor-block-list__block-edit,
			.fx-grid-wrapper > div > .block-editor-block-list__layout > #block-` + clientId + ` > .editor-block-list__block-edit > [data-block="` + clientId + `"],
			.fx-grid-wrapper > div > .block-editor-block-list__layout > #block-` + clientId + ` > .editor-block-list__block-edit > [data-block="` + clientId + `"] > .fx-grid-column {
				height: 100%;
			}

			#block-` + clientId + `:not(.has-child-selected):not(.is-selected) .block-list-appender:not(:first-child) {
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

		return (
			<Fragment>
				<InspectorControls>
					{ ! isGrid && (
						<PanelBody>
							<Fragment>
								<SelectControl
									label={ __( 'Container', 'flexblocks' ) }
									value={ outerContainer }
									options={ [
										{ label: __( 'Full width', 'flexblocks' ), value: 'full' },
										{ label: __( 'Contained', 'flexblocks' ), value: 'contained' },
									] }
									onChange={ ( outerContainer ) => { setAttributes( { outerContainer } ) } }
								/>

								<SelectControl
									label={ __( 'Inner Container', 'flexblocks' ) }
									value={ innerContainer }
									options={ [
										{ label: __( 'Full width', 'flexblocks' ), value: 'full' },
										{ label: __( 'Contained', 'flexblocks' ), value: 'contained' },
									] }
									onChange={ ( innerContainer ) => { setAttributes( { innerContainer } ) } }
								/>

								<div className="components-fx-control__header">
									<div className="components-fx-control__label">
										{ __( 'Container Width', 'flexblocks' ) }
									</div>

									<div className="components-fx-control__units">
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
									value={ parseFloat( containerWidth ) }
									onChange={ ( value ) => {
										setAttributes( {
											containerWidth: parseFloat( value )
										} );
									} }
								/>
							</Fragment>
						</PanelBody>
					) }

					{ isGrid && (
						<PanelBody className="section-grid-panel">
							<TabPanel className="grid-tab-panel flexblocks-control-tabs"
								activeClass="active-tab"
								tabs={ [
									{
										name: 'default',
										title: __( 'Default', 'flexblocks' ),
										className: 'grid-default',
									},
									{
										name: 'tablet',
										title: __( 'Tablet', 'flexblocks' ),
										className: 'grid-tablet',
									},
									{
										name: 'mobile',
										title: __( 'Mobile', 'flexblocks' ),
										className: 'grid-mobile',
									},
								] }>
								{
									( tab ) => {
										return (
											<div>
												{ 'default' === tab.name && (
													<Fragment>
														<ButtonGroup className={ 'widthButtons' }>
															<Button isLarge isPrimary={ width === 25 } onClick={ () => { setAttributes( { width: 25 } ); } }>25%</Button>
															<Button isLarge isPrimary={ width === 33.33 } onClick={ () => { setAttributes( { width: 33.33 } ); } }>33%</Button>
															<Button isLarge isPrimary={ width === 50 } onClick={ () => { setAttributes( { width: 50 } ); } }>50%</Button>
															<Button isLarge isPrimary={ width === 66.66 } onClick={ () => { setAttributes( { width: 66.66 } ); } }>66%</Button>
															<Button isLarge isPrimary={ width === 75 } onClick={ () => { setAttributes( { width: 75 } ); } }>75%</Button>
														</ButtonGroup>

														<RangeControl
															className={ 'fx-column-width-control' }
															value={ width ? width : '' }
															onChange={ ( value ) => {
																setAttributes( {
																	width: parseFloat( value )
																} );
															} }
															min={ 10.00 }
															max={ 100.00 }
															step={ 0.01 }
															allowReset={ true }
															initialPosition={ flexBlocksDefaults.container.width }
														/>

														<SelectControl
															label={ __( 'Vertical Alignment', 'flexblocks' ) }
															help={ __( 'Align grid item content. Does not apply if vertical alignment is set in the grid.', 'flexblocks' ) }
															value={ verticalAlignment }
															options={ [
																{ label: __( 'Default', 'flexblocks' ), value: '' },
																{ label: __( 'Top', 'flexblocks' ), value: 'flex-start' },
																{ label: __( 'Center', 'flexblocks' ), value: 'center' },
																{ label: __( 'Bottom', 'flexblocks' ), value: 'flex-end' },
															] }
															onChange={ ( verticalAlignment ) => {
																setAttributes( { verticalAlignment } )
															} }
														/>

														<ToggleControl
															label={ __( 'Remove Vertical Gap', 'flexblocks' ) }
															checked={ !! removeVerticalGap }
															onChange={ ( value ) => {
																setAttributes( {
																	removeVerticalGap: value
																} );
															} }
														/>
													</Fragment>
												) }

												{ 'tablet' === tab.name && (
													<Fragment>
														<ButtonGroup className={ 'widthButtons' }>
															<Button isLarge isPrimary={ widthTablet === 25 } onClick={ () => { setAttributes( { widthTablet: 25 } ); } }>25%</Button>
															<Button isLarge isPrimary={ widthTablet === 33.33 } onClick={ () => { setAttributes( { widthTablet: 33.33 } ); } }>33%</Button>
															<Button isLarge isPrimary={ widthTablet === 50 } onClick={ () => { setAttributes( { widthTablet: 50 } ); } }>50%</Button>
															<Button isLarge isPrimary={ widthTablet === 66.66 } onClick={ () => { setAttributes( { widthTablet: 66.66 } ); } }>66%</Button>
															<Button isLarge isPrimary={ widthTablet === 100 } onClick={ () => { setAttributes( { widthTablet: 100 } ); } }>100%</Button>
														</ButtonGroup>

														<RangeControl
															className={ 'fx-column-width-control' }
															value={ widthTablet }
															onChange={ ( value ) => {
																setAttributes( {
																	widthTablet: parseFloat( value )
																} );
															} }
															min={ 10.00 }
															max={ 100.00 }
															step={ 0.01 }
															allowReset={ true }
															initialPosition={ flexBlocksDefaults.container.widthTablet }
														/>

														<SelectControl
															label={ __( 'Vertical Alignment', 'flexblocks' ) }
															help={ __( 'Align grid item content. Does not apply if vertical alignment is set in the grid.', 'flexblocks' ) }
															value={ verticalAlignmentTablet }
															options={ [
																{ label: __( 'Inherit', 'flexblocks' ), value: 'inherit'},
																{ label: __( 'Default', 'flexblocks' ), value: '' },
																{ label: __( 'Top', 'flexblocks' ), value: 'flex-start' },
																{ label: __( 'Center', 'flexblocks' ), value: 'center' },
																{ label: __( 'Bottom', 'flexblocks' ), value: 'flex-end' },
															] }
															onChange={ ( verticalAlignmentTablet ) => {
																setAttributes( { verticalAlignmentTablet } )
															} }
														/>

														<ToggleControl
															label={ __( 'Remove Vertical Gap', 'flexblocks' ) }
															checked={ !! removeVerticalGapTablet }
															onChange={ ( value ) => {
																setAttributes( {
																	removeVerticalGapTablet: value
																} );
															} }
														/>

														<TextControl
															type={ 'number' }
															label={ __( 'Order', 'flexblocks' ) }
															value={ orderTablet ? orderTablet : '' }
															onChange={ ( value ) => {
																setAttributes( {
																	orderTablet: parseFloat( value )
																} );
															} }
														/>
													</Fragment>
												) }

												{ 'mobile' === tab.name && (
													<Fragment>
														<ButtonGroup className={ 'widthButtons' }>
															<Button isLarge isPrimary={ widthMobile === 25 } onClick={ () => { setAttributes( { widthMobile: 25 } ); } }>25%</Button>
															<Button isLarge isPrimary={ widthMobile === 33.33 } onClick={ () => { setAttributes( { widthMobile: 33.33 } ); } }>33%</Button>
															<Button isLarge isPrimary={ widthMobile === 50 } onClick={ () => { setAttributes( { widthMobile: 50 } ); } }>50%</Button>
															<Button isLarge isPrimary={ widthMobile === 66.66 } onClick={ () => { setAttributes( { widthMobile: 66.66 } ); } }>66%</Button>
															<Button isLarge isPrimary={ widthMobile === 100 } onClick={ () => { setAttributes( { widthMobile: 100 } ); } }>100%</Button>
														</ButtonGroup>

														<RangeControl
															className={ 'fx-column-width-control' }
															value={ widthMobile }
															onChange={ ( value ) => {
																setAttributes( {
																	widthMobile: parseFloat( value )
																} );
															} }
															min={ 10.00 }
															max={ 100.00 }
															step={ 0.01 }
															allowReset={ true }
															initialPosition={ flexBlocksDefaults.container.widthMobile }
														/>

														<SelectControl
															label={ __( 'Vertical Alignment', 'flexblocks' ) }
															help={ __( 'Align grid item content. Does not apply if vertical alignment is set in the grid.', 'flexblocks' ) }
															value={ verticalAlignmentMobile }
															options={ [
																{ label: __( 'Inherit', 'flexblocks' ), value: 'inherit'},
																{ label: __( 'Default', 'flexblocks' ), value: '' },
																{ label: __( 'Top', 'flexblocks' ), value: 'flex-start' },
																{ label: __( 'Center', 'flexblocks' ), value: 'center' },
																{ label: __( 'Bottom', 'flexblocks' ), value: 'flex-end' },
															] }
															onChange={ ( verticalAlignmentMobile ) => {
																setAttributes( { verticalAlignmentMobile } )
															} }
														/>

														<ToggleControl
															label={ __( 'Remove Vertical Gap', 'flexblocks' ) }
															checked={ !! removeVerticalGapMobile }
															onChange={ ( value ) => {
																setAttributes( {
																	removeVerticalGapMobile: value
																} );
															} }
														/>

														<TextControl
															type={ 'number' }
															label={ __( 'Order', 'flexblocks' ) }
															value={ orderMobile ? orderMobile : '' }
															onChange={ ( value ) => {
																setAttributes( {
																	orderMobile: parseFloat( value )
																} );
															} }
														/>
													</Fragment>
												) }
											</div>
										);
									}
								}
							</TabPanel>
						</PanelBody>
					) }

					<PanelBody
						title={ __( 'Spacing', 'flexblocks' ) }
						initialOpen={ false }
						icon={ getIcon( 'spacing' ) }
						className={ 'fx-panel-label' }
					>

						<TabPanel className="layout-tab-panel flexblocks-control-tabs"
							activeClass="active-tab"
							tabs={ [
								{
									name: 'default',
									title: __( 'Default', 'flexblocks' ),
									className: 'grid-default',
								},
								{
									name: 'tablet',
									title: __( 'Tablet', 'flexblocks' ),
									className: 'grid-tablet',
								},
								{
									name: 'mobile',
									title: __( 'Mobile', 'flexblocks' ),
									className: 'grid-mobile',
								},
							] }>
							{
								( tab ) => {
									return (
										<div>
											{ 'default' === tab.name && (
												<Fragment>
													<div className="components-fx-dimensions-control__header">
														<div className="components-fx-dimensions-control__label">
															{ __( 'Minimum Height', 'flexblocks' ) }
														</div>

														<div className="components-fx-dimensions-control__units">
															<ButtonGroup className="components-fx-dimensions-control__units" aria-label={ __( 'Select Units' ) }>
																{ minHeightUnits.map( ( unit ) =>
																	/* translators: %s: values associated with CSS syntax, 'Pixel', 'Em', 'Percentage' */
																	<Tooltip text={ sprintf( __( '%s Units' ), unit.name ) } key={ unit.unitValue }>
																		<Button
																			key={ unit.unitValue }
																			className={ 'components-fx-dimensions-control__units--' + unit.name }
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

													<DimensionsControl { ...this.props }
														type={ 'padding' }
														label={ __( 'Border Size', 'flexblocks' ) }
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

													<DimensionsControl { ...this.props }
														type={ 'padding' }
														label={ __( 'Border Radius', 'flexblocks' ) }
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
														labelTop={ __( 'T-Left', 'flexblocks' ) }
														labelRight={ __( 'T-Right', 'flexblocks' ) }
														labelBottom={ __( 'B-Right', 'flexblocks' ) }
														labelLeft={ __( 'B-Left', 'flexblocks' ) }
													/>
												</Fragment>
											) }

											{ 'tablet' === tab.name && (
												<Fragment>
													<div className="components-fx-dimensions-control__header">
														<div className="components-fx-dimensions-control__label">
															{ __( 'Minimum Height', 'flexblocks' ) }
														</div>

														<div className="components-fx-dimensions-control__units">
															<ButtonGroup className="components-fx-dimensions-control__units" aria-label={ __( 'Select Units' ) }>
																{ minHeightUnits.map( ( unit ) =>
																	/* translators: %s: values associated with CSS syntax, 'Pixel', 'Em', 'Percentage' */
																	<Tooltip text={ sprintf( __( '%s Units' ), unit.name ) } key={ unit.unitValue }>
																		<Button
																			key={ unit.unitValue }
																			className={ 'components-fx-dimensions-control__units--' + unit.name }
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

													<DimensionsControl { ...this.props }
														type={ 'padding' }
														label={ __( 'Border Size', 'flexblocks' ) }
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
													/>

													<DimensionsControl { ...this.props }
														type={ 'padding' }
														label={ __( 'Border Radius', 'flexblocks' ) }
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
														labelTop={ __( 'T-Left', 'flexblocks' ) }
														labelRight={ __( 'T-Right', 'flexblocks' ) }
														labelBottom={ __( 'B-Right', 'flexblocks' ) }
														labelLeft={ __( 'B-Left', 'flexblocks' ) }
													/>
												</Fragment>
											) }

											{ 'mobile' === tab.name && (
												<Fragment>
													<div className="components-fx-dimensions-control__header">
														<div className="components-fx-dimensions-control__label">
															{ __( 'Minimum Height', 'flexblocks' ) }
														</div>

														<div className="components-fx-dimensions-control__units">
															<ButtonGroup className="components-fx-dimensions-control__units" aria-label={ __( 'Select Units' ) }>
																{ minHeightUnits.map( ( unit ) =>
																	/* translators: %s: values associated with CSS syntax, 'Pixel', 'Em', 'Percentage' */
																	<Tooltip text={ sprintf( __( '%s Units' ), unit.name ) } key={ unit.unitValue }>
																		<Button
																			key={ unit.unitValue }
																			className={ 'components-fx-dimensions-control__units--' + unit.name }
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

													<DimensionsControl { ...this.props }
														type={ 'padding' }
														label={ __( 'Border Size', 'flexblocks' ) }
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
													/>

													<DimensionsControl { ...this.props }
														type={ 'padding' }
														label={ __( 'Border Radius', 'flexblocks' ) }
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
														labelTop={ __( 'T-Left', 'flexblocks' ) }
														labelRight={ __( 'T-Right', 'flexblocks' ) }
														labelBottom={ __( 'B-Right', 'flexblocks' ) }
														labelLeft={ __( 'B-Left', 'flexblocks' ) }
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

						<Fragment>
							<ColorPicker
								label={ __( 'Background Color', 'flexblocks' ) }
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
							/>

							<ColorPicker
								label={ __( 'Text Color', 'flexblocks' ) }
								value={ textColor }
								onChange={ ( nextTextColor ) =>
									setAttributes( {
										textColor: nextTextColor
									} )
								}
								alpha={ false }
							/>

							<ColorPicker
								label={ __( 'Link Color', 'flexblocks' ) }
								value={ linkColor }
								onChange={ ( nextLinkColor ) =>
									setAttributes( {
										linkColor: nextLinkColor
									} )
								}
								alpha={ false }
							/>

							<ColorPicker
								label={ __( 'Link Color Hover', 'flexblocks' ) }
								value={ linkColorHover }
								onChange={ ( nextLinkColorHover ) =>
									setAttributes( {
										linkColorHover: nextLinkColorHover
									} )
								}
								alpha={ false }
							/>

							<ColorPicker
								label={ __( 'Border Color', 'flexblocks' ) }
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
						</Fragment>
					</PanelBody>

					<PanelBody
						title={ __( 'Background Gradient' ) }
						initialOpen={ false }
						icon={ getIcon( 'gradients' ) }
						className={ 'fx-panel-label' }
					>
						<GradientControl { ...this.props }
							valueGradient={ gradient }
							valueGradientDirection={ gradientDirection }
							valueGradientColorOne={ gradientColorOne }
							valueGradientColorStopOne={ gradientColorStopOne }
							valueGradientColorTwo={ gradientColorTwo }
							valueGradientColorStopTwo={ gradientColorStopTwo }
							valueGradientColorOneOpacity={ gradientColorOneOpacity }
							valueGradientColorTwoOpacity={ gradientColorTwoOpacity }
							attrGradient={ 'gradient' }
							attrGradientDirection={ 'gradientDirection' }
							attrGradientColorOne={ 'gradientColorOne' }
							attrGradientColorStopOne={ 'gradientColorStopOne' }
							attrGradientColorTwo={ 'gradientColorTwo' }
							attrGradientColorStopTwo={ 'gradientColorStopTwo' }
							attrGradientColorOneOpacity={ 'gradientColorOneOpacity' }
							attrGradientColorTwoOpacity={ 'gradientColorTwoOpacity' }
							defaultColorOne={ flexBlocksDefaults.container.gradientColorOne }
							defaultColorTwo={ flexBlocksDefaults.container.gradientColorTwo }
						/>
					</PanelBody>

					<PanelBody
						title={ __( 'Background Image' ) }
						initialOpen={ false }
						icon={ getIcon( 'backgrounds' ) }
						className={ 'fx-panel-label' }
					>
						{ ! bgImage && (
							<div>
								<MediaUpload
									title={ __('Set background image') }
									onSelect={ onSelectBgImage }
									allowedTypes={["image"]}
									modalClass="editor-post-featured-image__media-modal"
									render={ ( { open } ) => (
										<Button className="editor-post-featured-image__toggle" onClick={ open }>
											{ __( 'Set background image' ) }
										</Button>
									) }
								/>
							</div>
						) }

						{ !! bgImage && (
							<MediaUpload
								title={ __( 'Set background image' ) }
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
									label={ __( 'Background Color Overlay', 'flexblocks' ) }
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
									<div className="fx-notice">
										{ __( 'Your background color must have transparency for the image to show.', 'flexblocks' ) }
									</div>
								) }

								<TextControl
									label={ __( 'Size', 'flexblocks' ) }
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
									label={ __( 'Position', 'flexblocks' ) }
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
									label={ __( 'Repeat', 'flexblocks' ) }
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
									label={ __( 'Attachment', 'flexblocks' ) }
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

					<PanelBody
						title={ __( 'Advanced', 'flexblocks' ) }
						initialOpen={ false }
						icon={ getIcon( 'advanced' ) }
						className={ 'fx-panel-label' }
					>
						<SelectControl
							label={ __( 'Element Tag', 'flexblocks' ) }
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

						<RangeControl
							label={ __( 'z-index', 'flexblocks' ) }
							value={ zindex }
							onChange={ ( value ) => {
								setAttributes( {
									zindex: parseFloat( value )
								} );
							} }
							min={ -200 }
							max={ 200 }
							step={ 10 }
						/>
					</PanelBody>
				</InspectorControls>

				<style>{ css }</style>

				{ !! isGrid && (
					<div className={ classnames( {
						'fx-grid-column': true,
						[`fx-grid-column-${ uniqueId }`]: true
					} ) }>
						<Section
							tagName={ tagName }
							id={ elementId }
							className={ classnames( {
								'fx-container': true,
								[`fx-container-${ uniqueId }`]: true,
								[`${ cssClasses }`]: '' !== cssClasses
							} ) }
						>
							<div
								className={ classnames( {
								'fx-inside-container': true
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
							'fx-container': true,
							[`fx-container-${ uniqueId }`]: true,
							[`${ cssClasses }`]: '' !== cssClasses
						} ) }
					>
						<div
							className={ classnames( {
							'fx-inside-container': true
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

export default ( FlexBlockContainer );
