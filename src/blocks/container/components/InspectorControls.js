import { InspectorControls, MediaUpload } from '@wordpress/block-editor';
import PanelArea from '../../../components/panel-area';
import { __, sprintf } from '@wordpress/i18n';
import getIcon from '../../../utils/get-icon';
import { Fragment, useEffect } from '@wordpress/element';
import {
	BaseControl,
	Button,
	Dropdown, Notice, PanelBody, PanelRow, RangeControl,
	SelectControl,
	TextControl,
	ToggleControl,
	Tooltip,
} from '@wordpress/components';
import UnitPicker from '../../../components/unit-picker';
import { applyFilters } from '@wordpress/hooks';
import hasNumericValue from '../../../utils/has-numeric-value';
import TypographyControls from '../../../components/typography';
import DimensionsGroup from '../../../components/dimensions-group';
import ColorPicker from '../../../components/color-picker';
import ColorGroup from '../../../components/color-group';
import GradientControl from '../../../components/gradient';
import classnames from 'classnames';
import sanitizeSVG from '../../../utils/sanitize-svg';
import { useSelect } from '@wordpress/data';
import LegacyLayoutControls from './LegacyLayoutControls';
import LayoutControls from './LayoutControls';

export default ( props ) => {
	const {
		clientId,
		attributes,
		setAttributes,
		deviceType,
		state,
		blockDefaults,
		allShapes,
		context,
		tagNames,
		filterTagName,
	} = props;

	const {
		isGrid,
		isQueryLoopItem,
		gridId,
		flexBasis,
		flexBasisTablet,
		flexBasisMobile,
		minHeight,
		minHeightUnit,
		minHeightTablet,
		minHeightUnitTablet,
		minHeightMobile,
		minHeightUnitMobile,
		backgroundColor,
		bgImage,
		bgOptions,
		bgImageSize,
		bgImageInline,
		verticalAlignment,
		verticalAlignmentTablet,
		verticalAlignmentMobile,
		zindex,
		innerZindex,
		removeVerticalGap,
		removeVerticalGapTablet,
		removeVerticalGapMobile,
		orderTablet,
		orderMobile,
		shapeDividers,
		useDynamicData,
		dynamicContentType,
		tagName,
		useLegacyLayout,
	} = attributes;

	const {
		getBlockParents,
		getBlocksByClientId,
	} = useSelect( ( select ) => select( 'core/block-editor' ), [] );

	useEffect( () => {
		const parentBlockId = getBlockParents( clientId, true );

		if ( parentBlockId.length > 0 ) {
			const parentBlocks = getBlocksByClientId( parentBlockId );

			if ( parentBlocks.length > 0 ) {
				if ( 'generateblocks/grid' === parentBlocks[ 0 ].name ) {
					const parentGridId = parentBlocks[ 0 ].attributes.uniqueId;

					if ( parentGridId !== gridId ) {
						setAttributes( {
							isGrid: true,
							gridId: parentGridId,
						} );
					}
				} else if ( isGrid && ! isQueryLoopItem ) {
					// Grid block isn't the parent, can't be a grid item.
					setAttributes( {
						isGrid: false,
						gridId: '',
					} );
				}
			}
		} else if ( isGrid && ! isQueryLoopItem ) {
			// No parent exists, can't be a grid item.
			setAttributes( {
				isGrid: false,
				gridId: '',
			} );
		}
	} );

	const isInQueryLoop = 'undefined' !== typeof context[ 'generateblocks/queryId' ];

	const handleAddShape = () => {
		const shapeDividersValues = [ ...shapeDividers ];

		shapeDividersValues.push( {
			shape: generateBlocksStyling.container.shapeDividers.shape,
			color: generateBlocksStyling.container.shapeDividers.color,
			colorOpacity: generateBlocksStyling.container.shapeDividers.colorOpacity,
			location: generateBlocksStyling.container.shapeDividers.location,
			height: generateBlocksStyling.container.shapeDividers.height,
			heightTablet: generateBlocksStyling.container.shapeDividers.heightTablet,
			heightMobile: generateBlocksStyling.container.shapeDividers.heightMobile,
			width: generateBlocksStyling.container.shapeDividers.width,
			widthTablet: generateBlocksStyling.container.shapeDividers.widthTablet,
			widthMobile: generateBlocksStyling.container.shapeDividers.widthMobile,
			flipHorizontally: generateBlocksStyling.container.shapeDividers.flipHorizontally,
			zindex: generateBlocksStyling.container.shapeDividers.zindex,
		} );

		setAttributes( { shapeDividers: shapeDividersValues } );
	};

	const handleRemoveShape = ( index ) => {
		const shapeDividersValues = [ ...shapeDividers ];

		shapeDividersValues.splice( index, 1 );
		setAttributes( { shapeDividers: shapeDividersValues } );
	};

	const bgImageSizes = [];

	Object.keys( generateBlocksInfo.imageSizes ).forEach( ( size ) => {
		bgImageSizes.push( {
			label: generateBlocksInfo.imageSizes[ size ],
			value: generateBlocksInfo.imageSizes[ size ],
		} );
	} );

	const hasFlexBasis = ( attribute ) => {
		return hasNumericValue( attribute ) && 'auto' !== attribute;
	};

	const hideWidthDesktop = hasFlexBasis( flexBasis );
	const hideWidthTablet = 'auto' !== flexBasisTablet &&
		( hasFlexBasis( flexBasis ) || hasFlexBasis( flexBasisTablet ) );
	const hideWidthMobile = 'auto' !== flexBasisMobile &&
		( hasFlexBasis( flexBasis ) || hasFlexBasis( flexBasisTablet ) || hasFlexBasis( flexBasisMobile ) );

	return (
		<InspectorControls>
			<PanelArea
				{ ...props }
				title={ __( 'Layout', 'generateblocks' ) }
				initialOpen={ true }
				icon={ getIcon( 'layout' ) }
				className={ 'gblocks-panel-label' }
				id={ 'containerLayout' }
				state={ state }
			>
				<LegacyLayoutControls
					{ ...props }
					hasFlexBasis={ hasFlexBasis }
					hideWidthDesktop={ hideWidthDesktop }
					hideWidthTablet={ hideWidthTablet }
					hideWidthMobile={ hideWidthMobile }
				/>

				<LayoutControls
					{ ...props }
					hasFlexBasis={ hasFlexBasis }
					hideWidthDesktop={ hideWidthDesktop }
					hideWidthTablet={ hideWidthTablet }
					hideWidthMobile={ hideWidthMobile }
				/>

				{ 'Desktop' === deviceType &&
					<>
						{ !! isGrid &&
							<>
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
									onChange={ ( value ) => {
										setAttributes( {
											verticalAlignment: value,
										} );
									} }
								/>

								{ ! isQueryLoopItem &&
									<ToggleControl
										label={ __( 'Remove Vertical Gap', 'generateblocks' ) }
										checked={ !! removeVerticalGap }
										onChange={ ( value ) => {
											setAttributes( {
												removeVerticalGap: value,
											} );
										} }
									/>
								}
							</>
						}

						<SelectControl
							label={ __( 'Tag Name', 'generateblocks' ) }
							value={ tagName }
							options={ tagNames }
							onChange={ ( value ) => {
								setAttributes( {
									tagName: filterTagName( value ),
								} );
							} }
						/>

						{ applyFilters( 'generateblocks.editor.controls', '', 'containerAfterElementTag', props, state ) }
					</>
				}

				{ 'Tablet' === deviceType && !! isGrid &&
					<>
						<SelectControl
							label={ __( 'Vertical Alignment', 'generateblocks' ) }
							help={ __( 'Align grid item content. Does not apply if vertical alignment is set in the grid.', 'generateblocks' ) }
							value={ verticalAlignmentTablet }
							options={ [
								{ label: __( 'Inherit', 'generateblocks' ), value: 'inherit' },
								{ label: __( 'Default', 'generateblocks' ), value: '' },
								{ label: __( 'Top', 'generateblocks' ), value: 'flex-start' },
								{ label: __( 'Center', 'generateblocks' ), value: 'center' },
								{ label: __( 'Bottom', 'generateblocks' ), value: 'flex-end' },
							] }
							onChange={ ( value ) => {
								setAttributes( {
									verticalAlignmentTablet: value,
								} );
							} }
						/>

						{ ! isQueryLoopItem &&
							<ToggleControl
								label={ __( 'Remove Vertical Gap', 'generateblocks' ) }
								checked={ !! removeVerticalGapTablet }
								onChange={ ( value ) => {
									setAttributes( {
										removeVerticalGapTablet: value,
									} );
								} }
							/>
						}

						<TextControl
							type={ 'number' }
							label={ __( 'Order', 'generateblocks' ) }
							value={ orderTablet || 0 === orderTablet ? orderTablet : '' }
							onChange={ ( value ) => {
								setAttributes( {
									orderTablet: parseFloat( value ),
								} );
							} }
						/>
					</>
				}

				{ 'Mobile' === deviceType && !! isGrid &&
					<Fragment>
						<SelectControl
							label={ __( 'Vertical Alignment', 'generateblocks' ) }
							help={ __( 'Align grid item content. Does not apply if vertical alignment is set in the grid.', 'generateblocks' ) }
							value={ verticalAlignmentMobile }
							options={ [
								{ label: __( 'Inherit', 'generateblocks' ), value: 'inherit' },
								{ label: __( 'Default', 'generateblocks' ), value: '' },
								{ label: __( 'Top', 'generateblocks' ), value: 'flex-start' },
								{ label: __( 'Center', 'generateblocks' ), value: 'center' },
								{ label: __( 'Bottom', 'generateblocks' ), value: 'flex-end' },
							] }
							onChange={ ( value ) => {
								setAttributes( {
									verticalAlignmentMobile: value,
								} );
							} }
						/>

						{ ! isQueryLoopItem &&
							<ToggleControl
								label={ __( 'Remove Vertical Gap', 'generateblocks' ) }
								checked={ !! removeVerticalGapMobile }
								onChange={ ( value ) => {
									setAttributes( {
										removeVerticalGapMobile: value,
									} );
								} }
							/>
						}

						<TextControl
							type={ 'number' }
							label={ __( 'Order', 'generateblocks' ) }
							value={ orderMobile || 0 === orderMobile ? orderMobile : '' }
							onChange={ ( value ) => {
								setAttributes( {
									orderMobile: parseFloat( value ),
								} );
							} }
						/>
					</Fragment>
				}

				{ applyFilters( 'generateblocks.editor.controls', '', 'containerLayout', props, state ) }
			</PanelArea>

			<PanelArea
				{ ...props }
				title={ __( 'Typography', 'generateblocks' ) }
				initialOpen={ false }
				icon={ getIcon( 'typography' ) }
				className={ 'gblocks-panel-label' }
				id={ 'containerTypography' }
				state={ state }
			>
				<TypographyControls
					{ ...props }
					deviceType={ deviceType }
					options={ [ 'fontWeight', 'textTransform', 'fontSize', 'fontFamily' ] }
				/>

				{ applyFilters( 'generateblocks.editor.controls', '', 'containerTypography', props, state ) }
			</PanelArea>

			<PanelArea
				{ ...props }
				title={ __( 'Spacing', 'generateblocks' ) }
				initialOpen={ false }
				icon={ getIcon( 'spacing' ) }
				className={ 'gblocks-panel-label' }
				id={ 'containerSpacing' }
				state={ state }
			>
				<DimensionsGroup
					{ ...props }
					deviceType={ deviceType }
					dimensions={
						[
							{
								type: 'padding',
								label: __( 'Padding', 'generateblocks' ),
								units: [ 'px', 'em', '%' ],
							},
							{
								type: 'margin',
								label: __( 'Margin', 'generateblocks' ),
								units: [ 'px', 'em', '%' ],
							},
							{
								type: 'borderSize',
								label: __( 'Border Size', 'generateblocks' ),
								units: [ 'px' ],
							},
							{
								type: 'borderRadius',
								label: __( 'Border Radius', 'generateblocks' ),
								units: [ 'px', 'em', '%' ],
							},
						]
					}
				/>

				{ 'Desktop' === deviceType && (
					<Fragment>
						<UnitPicker
							label={ __( 'Minimum Height', 'generateblocks' ) }
							value={ minHeightUnit }
							units={ [ 'px', 'vh', 'vw' ] }
							onClick={ ( value ) => {
								setAttributes( {
									minHeightUnit: value,
								} );
							} }
						/>

						<TextControl
							type={ 'number' }
							value={ minHeight ? minHeight : '' }
							onChange={ ( value ) => {
								setAttributes( {
									minHeight: parseFloat( value ),
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
								onChange={ ( value ) => {
									setAttributes( {
										verticalAlignment: value,
									} );
								} }
							/>
						}

						<TextControl
							label={ !! useLegacyLayout ? __( 'Outer z-index', 'generateblocks' ) : __( 'z-index', 'generateblocks' ) }
							type={ 'number' }
							value={ zindex || 0 === zindex ? zindex : '' }
							onChange={ ( value ) => {
								setAttributes( {
									zindex: value,
								} );
							} }
							onBlur={ () => {
								setAttributes( {
									zindex: parseFloat( zindex ),
								} );
							} }
							onClick={ ( e ) => {
								// Make sure onBlur fires in Firefox.
								e.currentTarget.focus();
							} }
						/>

						{ !! useLegacyLayout &&
							<TextControl
								label={ __( 'Inner z-index', 'generateblocks' ) }
								type={ 'number' }
								value={ innerZindex || 0 === innerZindex ? innerZindex : '' }
								onChange={ ( value ) => {
									setAttributes( {
										innerZindex: value,
									} );
								} }
								onBlur={ () => {
									setAttributes( {
										innerZindex: parseFloat( innerZindex ),
									} );
								} }
								onClick={ ( e ) => {
									// Make sure onBlur fires in Firefox.
									e.currentTarget.focus();
								} }
							/>
						}
					</Fragment>
				) }

				{ 'Tablet' === deviceType && (
					<Fragment>
						<UnitPicker
							label={ __( 'Minimum Height', 'generateblocks' ) }
							value={ minHeightUnitTablet }
							units={ [ 'px', 'vh', 'vw' ] }
							onClick={ ( value ) => {
								setAttributes( {
									minHeightUnitTablet: value,
								} );
							} }
						/>

						<TextControl
							type={ 'number' }
							value={ minHeightTablet || 0 === minHeightTablet ? minHeightTablet : '' }
							onChange={ ( value ) => {
								setAttributes( {
									minHeightTablet: parseFloat( value ),
								} );
							} }
						/>

						{ ( !! minHeight || !! minHeightTablet ) && ! isGrid &&
							<SelectControl
								label={ __( 'Vertical Alignment', 'generateblocks' ) }
								value={ verticalAlignmentTablet }
								options={ [
									{ label: __( 'Inherit', 'generateblocks' ), value: 'inherit' },
									{ label: __( 'Default', 'generateblocks' ), value: '' },
									{ label: __( 'Top', 'generateblocks' ), value: 'flex-start' },
									{ label: __( 'Center', 'generateblocks' ), value: 'center' },
									{ label: __( 'Bottom', 'generateblocks' ), value: 'flex-end' },
								] }
								onChange={ ( value ) => {
									setAttributes( {
										verticalAlignmentTablet: value,
									} );
								} }
							/>
						}
					</Fragment>
				) }

				{ 'Mobile' === deviceType && (
					<Fragment>
						<UnitPicker
							label={ __( 'Minimum Height', 'generateblocks' ) }
							value={ minHeightUnitMobile }
							units={ [ 'px', 'vh', 'vw' ] }
							onClick={ ( value ) => {
								setAttributes( {
									minHeightUnitMobile: value,
								} );
							} }
						/>

						<TextControl
							type={ 'number' }
							value={ minHeightMobile || 0 === minHeightMobile ? minHeightMobile : '' }
							onChange={ ( value ) => {
								setAttributes( {
									minHeightMobile: parseFloat( value ),
								} );
							} }
						/>

						{ ( !! minHeight || !! minHeightTablet || !! minHeightMobile ) && ! isGrid &&
							<SelectControl
								label={ __( 'Vertical Alignment', 'generateblocks' ) }
								value={ verticalAlignmentMobile }
								options={ [
									{ label: __( 'Inherit', 'generateblocks' ), value: 'inherit' },
									{ label: __( 'Default', 'generateblocks' ), value: '' },
									{ label: __( 'Top', 'generateblocks' ), value: 'flex-start' },
									{ label: __( 'Center', 'generateblocks' ), value: 'center' },
									{ label: __( 'Bottom', 'generateblocks' ), value: 'flex-end' },
								] }
								onChange={ ( value ) => {
									setAttributes( {
										verticalAlignmentMobile: value,
									} );
								} }
							/>
						}
					</Fragment>
				) }

				{ applyFilters( 'generateblocks.editor.controls', '', 'containerSpacing', props, state ) }
			</PanelArea>

			<PanelArea
				{ ...props }
				title={ __( 'Colors', 'generateblocks' ) }
				initialOpen={ false }
				icon={ getIcon( 'colors' ) }
				className={ 'gblocks-panel-label' }
				id={ 'containerColors' }
				state={ state }
			>
				{ 'Desktop' === deviceType &&
					<ColorGroup
						{ ...props }
						colors={
							[
								{
									group: 'background',
									label: __( 'Background', 'generateblocks' ),
									items: [
										{
											attribute: 'backgroundColor',
											alpha: true,
										},
									],
								},
								{
									group: 'text',
									label: __( 'Text', 'generateblocks' ),
									items: [
										{
											attribute: 'textColor',
										},
									],
								},
								{
									group: 'link',
									label: __( 'Link', 'generateblocks' ),
									items: [
										{
											attribute: 'linkColor',
										},
										{
											tooltip: __( 'Hover', 'generateblocks' ),
											attribute: 'linkColorHover',
										},
									],
								},
								{
									group: 'border',
									label: __( 'Border', 'generateblocks' ),
									items: [
										{
											attribute: 'borderColor',
											alpha: true,
										},
									],
								},
							]
						}
					/>
				}

				{ applyFilters( 'generateblocks.editor.controls', '', 'containerColors', props, state ) }
			</PanelArea>

			<PanelArea
				{ ...props }
				title={ __( 'Backgrounds', 'generateblocks' ) }
				initialOpen={ false }
				icon={ getIcon( 'gradients' ) }
				className={ 'gblocks-panel-label' }
				id={ 'containerBackground' }
				state={ state }
			>
				<Fragment>
					<BaseControl
						id="gblocks-background-image-upload"
						label={ __( 'Image URL', 'generateblocks' ) }
					>
						<div className="gblocks-bg-image-wrapper">
							<TextControl
								type={ 'text' }
								value={ !! bgImage ? bgImage.image.url : '' }
								onChange={ ( value ) => {
									if ( ! value ) {
										setAttributes( {
											bgImage: null,
										} );
									} else {
										setAttributes( {
											bgImage: {
												id: '',
												image: {
													url: value,
												},
											},
										} );
									}
								} }
							/>

							<div className="gblocks-background-image-action-buttons">
								<MediaUpload
									title={ __( 'Set background image', 'generateblocks' ) }
									onSelect={ ( media ) => {
										let size = blockDefaults.bgImageSize;

										if ( 'undefined' === typeof media.sizes[ size ] ) {
											size = 'full';
										}

										setAttributes( {
											bgImage: {
												id: media.id,
												image: media.sizes[ size ],
											},
										} );
									} }
									onClose={ () => {
										document.querySelector( '.gblocks-bg-image-wrapper input' ).focus();
									} }
									allowedTypes={ [ 'image' ] }
									value={ !! bgImage ? bgImage.id : '' }
									modalClass="editor-gb-container-background__media-modal"
									render={ ( { open } ) => (
										<Tooltip text={ __( 'Open the Media Library', 'generateblocks' ) }>
											<Button
												onClick={ open }
												className="is-secondary is-small"
											>
												{ __( 'Browse', 'generateblocks' ) }
											</Button>
										</Tooltip>
									) }
								/>

								{ applyFilters( 'generateblocks.editor.backgroundImageActions', '', props, state ) }
							</div>
						</div>
					</BaseControl>

					{ useDynamicData && '' !== dynamicContentType &&
						<Notice
							className="gblocks-option-notice"
							status="info"
							isDismissible={ false }
						>
							{ __( 'Using featured image as dynamic background.', 'generateblocks' ) }
						</Notice>
					}

					{ ( !! bgImage || ( useDynamicData && '' !== dynamicContentType ) ) && (
						<Fragment>
							<ToggleControl
								label={ __( 'Use inline style', 'generateblocks' ) }
								disabled={ useDynamicData && '' !== dynamicContentType && ( isQueryLoopItem || isInQueryLoop ) }
								checked={ !! bgImageInline }
								onChange={ ( nextImageInline ) => {
									setAttributes( {
										bgImageInline: nextImageInline,
									} );
								} }
							/>

							{ !! bgOptions.overlay ? ( // This option is deprecated, so only show it if it's in use.
								<Fragment>
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

									<Notice
										className="gblocks-option-notice"
										status="info"
										isDismissible={ false }
									>
										{ __( 'The background color overlay option is deprecated. Toggle this option to use the new method.', 'generateblocks' ) }
									</Notice>
								</Fragment>
							) : ( // These options is only for people not using the deprecated overlay option.
								<Fragment>
									{ (
										( bgImage && bgImage.id ) ||
										( useDynamicData && '' !== dynamicContentType ) ) &&
										<SelectControl
											label={ __( 'Image Size', 'generateblocks' ) }
											value={ bgImageSize }
											options={ bgImageSizes }
											onChange={ ( value ) => {
												setAttributes( {
													bgImageSize: value,
												} );
											} }
										/>
									}

									<SelectControl
										label={ __( 'Selector', 'generateblocks' ) }
										value={ bgOptions.selector }
										options={ [
											{ label: __( 'Element', 'generateblocks' ), value: 'element' },
											{ label: __( 'Pseudo Element', 'generateblocks' ), value: 'pseudo-element' },
										] }
										onChange={ ( value ) => {
											setAttributes( {
												bgOptions: {
													...bgOptions,
													selector: value,
												},
											} );

											if ( 'pseudo-element' === value && ! innerZindex && 0 !== innerZindex ) {
												setAttributes( {
													innerZindex: 1,
												} );
											}
										} }
									/>

									<RangeControl
										label={ __( 'Image Opacity', 'generateblocks' ) }
										value={ bgOptions.opacity }
										onChange={ ( value ) => {
											setAttributes( {
												bgOptions: {
													...bgOptions,
													opacity: value,
													selector: 'pseudo-element',
												},
											} );

											if ( ! innerZindex && 0 !== innerZindex ) {
												setAttributes( {
													innerZindex: 1,
												} );
											}
										} }
										min={ 0 }
										max={ 1 }
										step={ 0.01 }
										initialPosition={ blockDefaults.bgOptions.opacity }
									/>

									{ 1 !== bgOptions.opacity && 'pseudo-element' !== bgOptions.selector &&
										<Notice
											className="gblocks-option-notice"
											status="info"
											isDismissible={ false }
										>
											{ __( 'Your selector must be set to Pseudo Element to use opacity.', 'generateblocks' ) }
										</Notice>
									}
								</Fragment>
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
						</Fragment>
					) }

					<GradientControl
						{ ...props }
						attrGradient={ 'gradient' }
						attrGradientDirection={ 'gradientDirection' }
						attrGradientColorOne={ 'gradientColorOne' }
						attrGradientColorStopOne={ 'gradientColorStopOne' }
						attrGradientColorTwo={ 'gradientColorTwo' }
						attrGradientColorStopTwo={ 'gradientColorStopTwo' }
						attrGradientColorOneOpacity={ 'gradientColorOneOpacity' }
						attrGradientColorTwoOpacity={ 'gradientColorTwoOpacity' }
						defaultColorOne={ blockDefaults.gradientColorOne }
						defaultColorTwo={ blockDefaults.gradientColorTwo }
					/>

					{ applyFilters( 'generateblocks.editor.controls', '', 'containerBackground', props, state ) }
				</Fragment>
			</PanelArea>

			<PanelArea
				{ ...props }
				title={ __( 'Shapes', 'generateblocks' ) }
				initialOpen={ false }
				icon={ getIcon( 'shapes' ) }
				className={ 'gblocks-panel-label' }
				id={ 'containerShapes' }
				state={ state }
				showPanel={ 'Desktop' === deviceType || attributes.shapeDividers.length ? true : false }
			>
				<BaseControl className="gb-icon-chooser gb-shape-chooser">
					{
						shapeDividers.map( ( location, index ) => {
							const shapeNumber = index + 1;

							return <Fragment key={ index }>
								<div className="gblocks-shape-container">
									<div
										className={ classnames( {
											'gblocks-shape-toggle-preview': true,
											[ `gblocks-shape-toggle-preview-${ shapeNumber }` ]: true,
										} ) }
										style={ { backgroundColor } }
									>
										{ 'undefined' !== typeof allShapes[ shapeDividers[ index ].shape ] &&
										<div
											className="gblocks-shape-divider-preview"
											style={ { color: shapeDividers[ index ].color } }
											dangerouslySetInnerHTML={ { __html: sanitizeSVG( allShapes[ shapeDividers[ index ].shape ].icon ) } }
										/>
										}
									</div>

									{
										/* translators: Shape number */
										sprintf( __( 'Shape %s', 'generateblocks' ), shapeNumber )
									}

									<Fragment>
										<Dropdown
											contentClassName="gblocks-shapes-dropdown"
											renderToggle={ ( { isOpen, onToggle } ) => (
												<Tooltip text={ __( 'Edit Shape', 'generateblocks' ) }>
													<Button
														className="gblocks-shape-dropdown"
														isSecondary={ isOpen ? undefined : true }
														isPrimary={ isOpen ? true : undefined }
														icon={ getIcon( 'wrench' ) }
														onClick={ onToggle }
														aria-expanded={ isOpen }
													/>
												</Tooltip>
											) }
											renderContent={ () => (
												<div className="gblocks-shape-controls">
													{ 'Desktop' === deviceType &&
														<Fragment>
															<BaseControl className="gb-icon-chooser">
																{
																	Object.keys( generateBlocksInfo.svgShapes ).map( ( svg, i ) => {
																		const svgItems = generateBlocksInfo.svgShapes[ svg ].svgs;

																		return (
																			<PanelBody
																				title={ generateBlocksInfo.svgShapes[ svg ].group }
																				initialOpen={ svgItems.hasOwnProperty( shapeDividers[ index ].shape ) }
																				key={ i }
																			>
																				<PanelRow>
																					<BaseControl>
																						<ul className="gblocks-icon-chooser gblocks-shape-chooser">
																							{
																								Object.keys( svgItems ).map( ( svgItem, iconIndex ) => {
																									return (
																										<li key={ `editor-pblock-types-list-item-${ iconIndex }` }>
																											<Tooltip text={ ( svgItems[ svgItem ].label ) }>
																												<Button
																													className={ classnames( {
																														'editor-block-list-item-button': true,
																														'gblocks-shape-is-active': shapeDividers[ index ].shape === svgItem,
																													} ) }
																													onClick={ () => {
																														const shapes = [ ...shapeDividers ];

																														shapes[ index ] = {
																															...shapes[ index ],
																															shape: svgItem,
																														};

																														setAttributes( {
																															shapeDividers: shapes,
																														} );
																													} }
																												>
																													{ 'string' === typeof svgItems[ svgItem ].icon ? (
																														<Fragment>
																															<span
																																className="editor-block-types-list__item-icon"
																																dangerouslySetInnerHTML={ { __html: sanitizeSVG( svgItems[ svgItem ].icon ) } }
																															/>
																														</Fragment>
																													) : (
																														<Fragment>
																															<span className="editor-block-types-list__item-icon">
																																{ svgItems[ svgItem ].icon }
																															</span>
																														</Fragment>
																													) }
																												</Button>
																											</Tooltip>
																										</li>
																									);
																								} )
																							}
																						</ul>
																					</BaseControl>
																				</PanelRow>
																			</PanelBody>
																		);
																	} )
																}
															</BaseControl>

															<BaseControl>
																<ColorPicker
																	label={ __( 'Color', 'generateblocks' ) }
																	value={ shapeDividers[ index ].color }
																	alpha={ true }
																	valueOpacity={ shapeDividers[ index ].colorOpacity }
																	onChange={ ( value ) => {
																		const shapes = [ ...shapeDividers ];

																		shapes[ index ] = {
																			...shapes[ index ],
																			color: value,
																		};

																		setAttributes( {
																			shapeDividers: shapes,
																		} );
																	} }
																	onOpacityChange={ ( value ) => {
																		const shapes = [ ...shapeDividers ];

																		shapes[ index ] = {
																			...shapes[ index ],
																			colorOpacity: value,
																		};

																		setAttributes( {
																			shapeDividers: shapes,
																		} );
																	} }
																/>
															</BaseControl>

															<SelectControl
																label={ __( 'Location', 'generateblocks' ) }
																value={ shapeDividers[ index ].location }
																options={ [
																	{ label: __( 'Top', 'generateblocks' ), value: 'top' },
																	{ label: __( 'Bottom', 'generateblocks' ), value: 'bottom' },
																] }
																onChange={ ( value ) => {
																	const shapes = [ ...shapeDividers ];

																	shapes[ index ] = {
																		...shapes[ index ],
																		location: value,
																	};

																	setAttributes( {
																		shapeDividers: shapes,
																	} );
																} }
															/>

															<UnitPicker
																label={ __( 'Height', 'generateblocks' ) }
																value={ 'px' }
																units={ [ 'px' ] }
																onClick={ () => {
																	return false;
																} }
															/>

															<TextControl
																type={ 'number' }
																value={ shapeDividers[ index ].height ? shapeDividers[ index ].height : '' }
																onChange={ ( value ) => {
																	const shapes = [ ...shapeDividers ];

																	shapes[ index ] = {
																		...shapes[ index ],
																		height: parseFloat( value ),
																	};

																	setAttributes( {
																		shapeDividers: shapes,
																	} );
																} }
															/>

															<UnitPicker
																label={ __( 'Width', 'generateblocks' ) }
																value={ '%' }
																units={ [ '%' ] }
																onClick={ () => {
																	return false;
																} }
															/>

															<TextControl
																type={ 'number' }
																value={ shapeDividers[ index ].width ? shapeDividers[ index ].width : '' }
																min="100"
																onChange={ ( value ) => {
																	const shapes = [ ...shapeDividers ];

																	shapes[ index ] = {
																		...shapes[ index ],
																		width: parseFloat( value ),
																	};

																	setAttributes( {
																		shapeDividers: shapes,
																	} );
																} }
															/>

															<ToggleControl
																label={ __( 'Flip Horizontally', 'generateblocks' ) }
																checked={ !! shapeDividers[ index ].flipHorizontally }
																onChange={ ( value ) => {
																	const shapes = [ ...shapeDividers ];

																	shapes[ index ] = {
																		...shapes[ index ],
																		flipHorizontally: value,
																	};

																	setAttributes( {
																		shapeDividers: shapes,
																	} );
																} }
															/>

															<TextControl
																label={ __( 'z-index', 'generateblocks' ) }
																type={ 'number' }
																min="0"
																value={ shapeDividers[ index ].zindex || 0 === shapeDividers[ index ].zindex ? shapeDividers[ index ].zindex : '' }
																onChange={ ( value ) => {
																	const shapes = [ ...shapeDividers ];

																	shapes[ index ] = {
																		...shapes[ index ],
																		zindex: value,
																	};

																	setAttributes( {
																		shapeDividers: shapes,
																	} );
																} }
																onBlur={ () => {
																	const shapes = [ ...shapeDividers ];

																	shapes[ index ] = {
																		...shapes[ index ],
																		zindex: parseFloat( shapeDividers[ index ].zindex ),
																	};

																	setAttributes( {
																		shapeDividers: shapes,
																	} );
																} }
																onClick={ ( e ) => {
																	// Make sure onBlur fires in Firefox.
																	e.currentTarget.focus();
																} }
															/>
														</Fragment>
													}

													{ 'Tablet' === deviceType &&
														<Fragment>
															<UnitPicker
																label={ __( 'Height', 'generateblocks' ) }
																value={ 'px' }
																units={ [ 'px' ] }
																onClick={ () => {
																	return false;
																} }
															/>

															<TextControl
																type={ 'number' }
																value={ shapeDividers[ index ].heightTablet ? shapeDividers[ index ].heightTablet : '' }
																onChange={ ( value ) => {
																	const shapes = [ ...shapeDividers ];

																	shapes[ index ] = {
																		...shapes[ index ],
																		heightTablet: parseFloat( value ),
																	};

																	setAttributes( {
																		shapeDividers: shapes,
																	} );
																} }
															/>

															<UnitPicker
																label={ __( 'Width', 'generateblocks' ) }
																value={ '%' }
																units={ [ '%' ] }
																onClick={ () => {
																	return false;
																} }
															/>

															<TextControl
																type={ 'number' }
																value={ shapeDividers[ index ].widthTablet ? shapeDividers[ index ].widthTablet : '' }
																min="100"
																onChange={ ( value ) => {
																	const shapes = [ ...shapeDividers ];

																	shapes[ index ] = {
																		...shapes[ index ],
																		widthTablet: parseFloat( value ),
																	};

																	setAttributes( {
																		shapeDividers: shapes,
																	} );
																} }
															/>
														</Fragment>
													}

													{ 'Mobile' === deviceType &&
														<Fragment>
															<UnitPicker
																label={ __( 'Height', 'generateblocks' ) }
																value={ 'px' }
																units={ [ 'px' ] }
																onClick={ () => {
																	return false;
																} }
															/>

															<TextControl
																type={ 'number' }
																value={ shapeDividers[ index ].heightMobile ? shapeDividers[ index ].heightMobile : '' }
																onChange={ ( value ) => {
																	const shapes = [ ...shapeDividers ];

																	shapes[ index ] = {
																		...shapes[ index ],
																		heightMobile: parseFloat( value ),
																	};

																	setAttributes( {
																		shapeDividers: shapes,
																	} );
																} }
															/>

															<UnitPicker
																label={ __( 'Width', 'generateblocks' ) }
																value={ '%' }
																units={ [ '%' ] }
																onClick={ () => {
																	return false;
																} }
															/>

															<TextControl
																type={ 'number' }
																value={ shapeDividers[ index ].widthMobile ? shapeDividers[ index ].widthMobile : '' }
																min="100"
																onChange={ ( value ) => {
																	const shapes = [ ...shapeDividers ];

																	shapes[ index ] = {
																		...shapes[ index ],
																		widthMobile: parseFloat( value ),
																	};

																	setAttributes( {
																		shapeDividers: shapes,
																	} );
																} }
															/>
														</Fragment>
													}
												</div>
											) }
										/>
									</Fragment>

									{ 'Desktop' === deviceType &&
										<Tooltip text={ __( 'Delete Shape', 'generateblocks' ) }>
											<Button
												className="gblocks-remove-shape"
												onClick={ () => {
													// eslint-disable-next-line
													if ( window.confirm( __( 'This will permanently delete this shape.', 'generateblocks' ) ) ) {
														handleRemoveShape( index );
													}
												} }
												icon={ getIcon( 'x' ) }
											/>
										</Tooltip>
									}
								</div>
							</Fragment>;
						} )
					}

					<div className="gblocks-add-new-shape">
						<Button
							isSecondary
							onClick={ handleAddShape.bind( this ) }
						>
							{ __( 'Add Shape', 'generateblocks' ) }
						</Button>
					</div>
				</BaseControl>

				{ applyFilters( 'generateblocks.editor.controls', '', 'containerShapeDivider', props, state ) }
			</PanelArea>
		</InspectorControls>
	);
};
