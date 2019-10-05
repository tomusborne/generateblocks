/**
 * Block: Container
 */

import Section from './section-tag';
import ColorPicker from '../../components/color-picker';
import getIcon from '../../utils/get-icon';
import classnames from 'classnames';
import DimensionsControl from '../../components/dimensions/';

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
			borderColorHover,
			backgroundColor,
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
		} = attributes;

		var backgroundImageValue;

		if ( bgImage ) {
			backgroundImageValue = 'url(' + bgImage.image.url + ')';

			if ( bgOptions.overlay ) {
				backgroundImageValue = 'linear-gradient(0deg, ' + backgroundColor + ', ' + backgroundColor + '), url(' + bgImage.image.url + ')';
			}
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

		const css = `
			.fx-container-` + uniqueId + ` {
				background-color: ` + backgroundColor + `;
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
				border-color: ` + borderColor + `;
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
			}

			.fx-grid-column > .fx-container-` + uniqueId + ` {
				display: flex;
				flex-direction: column;
				height: 100%;
				justify-content: ` + verticalAlignment + `;
			}

			.fx-grid-wrapper > div > .block-editor-block-list__layout > #block-` + clientId + ` > .editor-block-list__block-edit > [data-block="` + clientId + `"] {
				height: calc(100% - 56px);
			}

			.fx-grid-wrapper > div > .block-editor-block-list__layout > #block-` + clientId + ` > .editor-block-list__block-edit,
			.fx-grid-wrapper > div > .block-editor-block-list__layout > #block-` + clientId + ` > .editor-block-list__block-edit > [data-block="` + clientId + `"] > .fx-grid-column {
				height: 100%;
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
					<TextControl
						type={ 'text' }
						readOnly={ true }
						label={ __( 'Unique ID', 'flexblocks' ) }
						value={ uniqueId }
						onChange={ ( value ) => {
							setAttributes( {
								uniqueId: value
							} );
						} }
					/>

					{ ! isGrid ? (
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

								<TextControl
									type={ 'number' }
									label={ __( 'Container Width', 'flexblocks' ) }
									value={ parseFloat( containerWidth ) }
									onChange={ ( value ) => {
										setAttributes( {
											containerWidth: parseFloat( value )
										} );
									} }
								/>
							</Fragment>
						</PanelBody>
					) : '' }

					{ isGrid ? (
						<PanelBody className="section-grid-panel">
							<TabPanel className="grid-tab-panel flexblocks-control-tabs"
								activeClass="active-tab"
								tabs={ [
									{
										name: 'grid-default',
										title: __( 'Default', 'flexblocks' ),
										className: 'grid-default',
									},
									{
										name: 'grid-tablet',
										title: __( 'Tablet', 'flexblocks' ),
										className: 'grid-tablet',
									},
									{
										name: 'grid-mobile',
										title: __( 'Mobile', 'flexblocks' ),
										className: 'grid-mobile',
									},
								] }>
								{
									( tab ) => {
										const isDesktop = tab.name === 'grid-desktop';

										return (
											<div>
												{ 'grid-default' === tab.name ? (
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
															value={ parseFloat( width ) }
															onChange={ ( value ) => {
																setAttributes( {
																	width: value
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
															onChange={ ( verticalAlignment ) => { setAttributes( { verticalAlignment } ) } }
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
												) : '' }

												{ 'grid-tablet' === tab.name ? (
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
															value={ parseFloat( widthTablet ) }
															onChange={ ( value ) => {
																setAttributes( {
																	widthTablet: value
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
															onChange={ ( verticalAlignmentTablet ) => { setAttributes( { verticalAlignmentTablet } ) } }
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
													</Fragment>
												) : '' }

												{ 'grid-mobile' === tab.name ? (
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
															value={ parseFloat( widthMobile ) }
															onChange={ ( value ) => {
																setAttributes( {
																	widthMobile: value
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
															onChange={ ( verticalAlignmentMobile ) => { setAttributes( { verticalAlignmentMobile } ) } }
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
													</Fragment>
												) : '' }
											</div>
										);
									}
								}
							</TabPanel>
						</PanelBody>
					) : '' }

					<PanelBody
						title={ __( 'Spacing', 'flexblocks' ) }
						initialOpen={ false }
					>

						<TabPanel className="layout-tab-panel flexblocks-control-tabs"
							activeClass="active-tab"
							tabs={ [
								{
									name: 'grid-default',
									title: __( 'Default', 'flexblocks' ),
									className: 'grid-default',
								},
								{
									name: 'grid-tablet',
									title: __( 'Tablet', 'flexblocks' ),
									className: 'grid-tablet',
								},
								{
									name: 'grid-mobile',
									title: __( 'Mobile', 'flexblocks' ),
									className: 'grid-mobile',
								},
							] }>
							{
								( tab ) => {
									return (
										<div>
											{ 'grid-default' === tab.name ? (
												<Fragment>
													<div className="components-fx-dimensions-control__header">
														<div className="components-fx-dimensions-control__label">
															{ __( 'Minimum Height', 'flexblocks' ) }
														</div>

														<div className="components-fx-dimensions-control__units">
															<ButtonGroup className="components-fx-dimensions-control__units" aria-label={ __( 'Select Units' ) }>
																{ minHeightUnits.map( ( unit ) =>
																	/* translators: %s: values associated with CSS syntax, 'Pixel', 'Em', 'Percentage' */
																	<Tooltip text={ sprintf( __( '%s Units' ), unit.name ) }>
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
														value={ parseFloat( minHeight ) }
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
											) : '' }

											{ 'grid-tablet' === tab.name ? (
												<Fragment>
													<div className="components-fx-dimensions-control__header">
														<div className="components-fx-dimensions-control__label">
															{ __( 'Minimum Height', 'flexblocks' ) }
														</div>

														<div className="components-fx-dimensions-control__units">
															<ButtonGroup className="components-fx-dimensions-control__units" aria-label={ __( 'Select Units' ) }>
																{ minHeightUnits.map( ( unit ) =>
																	/* translators: %s: values associated with CSS syntax, 'Pixel', 'Em', 'Percentage' */
																	<Tooltip text={ sprintf( __( '%s Units' ), unit.name ) }>
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
														value={ parseFloat( minHeightTablet ) }
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
											) : '' }

											{ 'grid-mobile' === tab.name ? (
												<Fragment>
													<div className="components-fx-dimensions-control__header">
														<div className="components-fx-dimensions-control__label">
															{ __( 'Minimum Height', 'flexblocks' ) }
														</div>

														<div className="components-fx-dimensions-control__units">
															<ButtonGroup className="components-fx-dimensions-control__units" aria-label={ __( 'Select Units' ) }>
																{ minHeightUnits.map( ( unit ) =>
																	/* translators: %s: values associated with CSS syntax, 'Pixel', 'Em', 'Percentage' */
																	<Tooltip text={ sprintf( __( '%s Units' ), unit.name ) }>
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
														value={ parseFloat( minHeightMobile ) }
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
														valueTop={ borderRadiusTopRightMobile }
														valueRight={ borderRadiusBottomRightMobile }
														valueBottom={ borderRadiusBottomLeftMobile }
														valueLeft={ borderRadiusTopLeftMobile }
														valueUnit={ borderRadiusUnit }
														syncUnits={ borderRadiusSyncUnits }
														attrTop={ 'borderRadiusTopRightMobile' }
														attrRight={ 'borderRadiusBottomRightMobile' }
														attrBottom={ 'borderRadiusBottomLeftMobile' }
														attrLeft={ 'borderRadiusTopLeftMobile' }
														attrUnit={ 'borderRadiusUnit' }
														attrSyncUnits={ 'borderRadiusSyncUnits' }
														labelTop={ __( 'T-Left', 'flexblocks' ) }
														labelRight={ __( 'T-Right', 'flexblocks' ) }
														labelBottom={ __( 'B-Right', 'flexblocks' ) }
														labelLeft={ __( 'B-Left', 'flexblocks' ) }
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

						<Fragment>
							<ColorPicker
								label={ __( 'Background Color', 'flexblocks' ) }
								value={ backgroundColor }
								onChange={ ( nextBackgroundColor ) =>
									setAttributes( {
										backgroundColor: nextBackgroundColor
									} )
								}
								onClear={ () =>
									setAttributes( {
										backgroundColor: flexBlocksDefaults.container.backgroundColor
									} )
								}
								alpha={ true }
							/>
						</Fragment>

						<Fragment>
							<ColorPicker
								label={ __( 'Text Color', 'flexblocks' ) }
								value={ textColor }
								onChange={ ( nextTextColor ) =>
									setAttributes( {
										textColor: nextTextColor
									} )
								}
								onClear={ () =>
									setAttributes( {
										textColor: flexBlocksDefaults.container.textColor
									} )
								}
								alpha={ false }
							/>
						</Fragment>

						<Fragment>
							<ColorPicker
								label={ __( 'Link Color', 'flexblocks' ) }
								value={ linkColor }
								onChange={ ( nextLinkColor ) =>
									setAttributes( {
										linkColor: nextLinkColor
									} )
								}
								onClear={ () =>
									setAttributes( {
										linkColor: flexBlocksDefaults.container.linkColor
									} )
								}
								alpha={ false }
							/>
						</Fragment>

						<Fragment>
							<ColorPicker
								label={ __( 'Link Color Hover', 'flexblocks' ) }
								value={ linkColorHover }
								onChange={ ( nextLinkColorHover ) =>
									setAttributes( {
										linkColorHover: nextLinkColorHover
									} )
								}
								onClear={ () =>
									setAttributes( {
										linkColorHover: flexBlocksDefaults.container.linkColorHover
									} )
								}
								alpha={ false }
							/>
						</Fragment>

						<Fragment>
							<ColorPicker
								label={ __( 'Border Color', 'flexblocks' ) }
								value={ borderColor }
								onChange={ ( value ) =>
									setAttributes( {
										borderColor: value
									} )
								}
								onClear={ () =>
									setAttributes( {
										borderColor: flexBlocksDefaults.container.borderColor
									} )
								}
								alpha={ true }
							/>
						</Fragment>
					</PanelBody>

					<PanelBody
						title={ __( 'Background image' ) }
						initialOpen={ false }
					>
						{ ! bgImage &&
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
						}
						{ !! bgImage && <MediaUpload
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
						}
						{ !! bgImage && <div className="section-bg-settings">
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
						</div>}
					</PanelBody>
				</InspectorControls>
				<InspectorAdvancedControls>
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
						onChange={ ( nextSpacing ) => {
							setAttributes( {
								zindex: nextSpacing
							} );
						} }
						min={ -200 }
						max={ 200 }
						step={ 10 }
					/>
				</InspectorAdvancedControls>

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
