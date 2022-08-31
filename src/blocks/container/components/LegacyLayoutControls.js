import {
	BaseControl,
	Button,
	ButtonGroup,
	SelectControl,
	TextControl,
	ToggleControl,
	Tooltip,
} from '@wordpress/components';
import { Fragment } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { applyFilters } from '@wordpress/hooks';
import UnitPicker from '../../../components/unit-picker';
import hasNumericValue from '../../../utils/has-numeric-value';
import RangeControlInput from '../../../components/range-control';
import getResponsivePlaceholder from '../../../utils/get-responsive-placeholder';
import PanelArea from '../../../components/panel-area';
import getIcon from '../../../utils/get-icon';

export default ( props ) => {
	const {
		attributes,
		setAttributes,
		deviceType,
		state,
		blockDefaults,
		tagNames,
		filterTagName,
	} = props;

	const {
		tagName,
		isGrid,
		isQueryLoopItem,
		width,
		widthTablet,
		widthMobile,
		autoWidthTablet,
		autoWidthMobile,
		flexGrow,
		flexGrowTablet,
		flexGrowMobile,
		flexShrink,
		flexShrinkTablet,
		flexShrinkMobile,
		flexBasis,
		flexBasisTablet,
		flexBasisMobile,
		flexBasisUnit,
		outerContainer,
		innerContainer,
		containerWidth,
		verticalAlignment,
		verticalAlignmentTablet,
		verticalAlignmentMobile,
		removeVerticalGap,
		removeVerticalGapTablet,
		removeVerticalGapMobile,
		orderTablet,
		orderMobile,
		align,
		useLegacyLayout,
		minHeight,
		minHeightTablet,
		minHeightMobile,
		minHeightUnit,
		minHeightUnitTablet,
		minHeightUnitMobile,
		zindex,
		innerZindex,
	} = attributes;

	if ( ! useLegacyLayout ) {
		return null;
	}

	const hasFlexBasis = ( attribute ) => {
		return hasNumericValue( attribute ) && 'auto' !== attribute;
	};

	const hideWidthDesktop = hasFlexBasis( flexBasis );
	const hideWidthTablet = 'auto' !== flexBasisTablet &&
		( hasFlexBasis( flexBasis ) || hasFlexBasis( flexBasisTablet ) );
	const hideWidthMobile = 'auto' !== flexBasisMobile &&
		( hasFlexBasis( flexBasis ) || hasFlexBasis( flexBasisTablet ) || hasFlexBasis( flexBasisMobile ) );

	return (
		<>
			{ ! isGrid && (
				<PanelArea
					{ ...props }
					title={ __( 'Layout', 'generateblocks' ) }
					initialOpen={ true }
					icon={ getIcon( 'layout' ) }
					className={ 'gblocks-panel-label' }
					id={ 'containerLayout' }
					state={ state }
				>
					{ 'Desktop' === deviceType &&
						<Fragment>
							<SelectControl
								label={ __( 'Container', 'generateblocks' ) }
								value={ outerContainer }
								options={ [
									{ label: __( 'Full width', 'generateblocks' ), value: 'full' },
									{ label: __( 'Contained width', 'generateblocks' ), value: 'contained' },
								] }
								onChange={ ( value ) => {
									setAttributes( {
										outerContainer: value,
									} );

									if ( 'contained' === value && 'full' === align ) {
										setAttributes( {
											align: '',
										} );
									}
								} }
							/>

							{ 'full' === outerContainer &&
								<SelectControl
									label={ __( 'Inner Container', 'generateblocks' ) }
									value={ innerContainer }
									options={ [
										{ label: __( 'Full width', 'generateblocks' ), value: 'full' },
										{ label: __( 'Contained width', 'generateblocks' ), value: 'contained' },
									] }
									onChange={ ( value ) => {
										setAttributes( {
											innerContainer: value,
										} );
									} }
								/>
							}

							{ ( 'contained' === outerContainer || 'contained' === innerContainer ) &&
								<Fragment>
									<UnitPicker
										label={
											'full' === outerContainer &&
											'contained' === innerContainer
												? __( 'Inner Container Width', 'generateblocks' )
												: __( 'Container Width', 'generateblocks' )
										}
										value={ 'px' }
										units={ [ 'px' ] }
										onClick={ () => {
											return false;
										} }
									/>

									<TextControl
										type={ 'number' }
										className="gblocks-container-width"
										value={ parseFloat( containerWidth ) || '' }
										placeholder={ blockDefaults.containerWidth }
										onChange={ ( value ) => {
											setAttributes( {
												containerWidth: '' !== value ? parseFloat( value ) : undefined,
											} );
										} }
									/>
								</Fragment>
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
						</Fragment>
					}

					{ applyFilters( 'generateblocks.editor.controls', '', 'containerLayout', props, state ) }
				</PanelArea>
			) }

			{ isGrid && (
				<PanelArea
					{ ...props }
					title={ __( 'Layout', 'generateblocks' ) }
					initialOpen={ true }
					icon={ getIcon( 'layout' ) }
					className={ 'gblocks-panel-label' }
					id={ 'containerGridLayout' }
					state={ state }
				>
					{ 'Desktop' === deviceType && (
						<Fragment>
							<BaseControl>
								<UnitPicker
									label={ __( 'Container Width', 'generateblocks' ) }
									value={ '%' }
									units={ [ '%' ] }
									onClick={ () => {
										return false;
									} }
								/>

								{ !! hideWidthDesktop &&
									<div className="gblocks-small-notice-description">
										{ __( 'Width disabled as Flex Basis is not "auto".', 'generateblocks' ) }
									</div>
								}

								<ButtonGroup className={ 'widthButtons' }>
									<Button isPrimary={ width === 25 } onClick={ () => setAttributes( { width: 25 } ) } disabled={ hideWidthDesktop }>25</Button>
									<Button isPrimary={ width === 33.33 } onClick={ () => setAttributes( { width: 33.33 } ) } disabled={ hideWidthDesktop }>33</Button>
									<Button isPrimary={ width === 50 } onClick={ () => setAttributes( { width: 50 } ) } disabled={ hideWidthDesktop }>50</Button>
									<Button isPrimary={ width === 66.66 } onClick={ () => setAttributes( { width: 66.66 } ) } disabled={ hideWidthDesktop }>66</Button>
									<Button isPrimary={ width === 75 } onClick={ () => setAttributes( { width: 75 } ) } disabled={ hideWidthDesktop }>75</Button>
									<Button isPrimary={ width === 100 } onClick={ () => setAttributes( { width: 100 } ) } disabled={ hideWidthDesktop }>100</Button>
								</ButtonGroup>

								<RangeControlInput
									value={ hasNumericValue( width ) ? width : '' }
									onChange={ ( value ) => {
										// No zero value or values that start with zero.
										if ( String( value ).startsWith( 0 ) ) {
											value = '';
										}

										setAttributes( {
											width: value,
										} );
									} }
									rangeMin={ 10 }
									rangeMax={ 100 }
									step={ 5 }
									initialPosition={ blockDefaults.width }
									disabled={ hideWidthDesktop }
								/>
							</BaseControl>

							<BaseControl
								className="gblocks-flex-controls"
							>
								<div className="gblocks-utility-label">
									<label
										htmlFor="gblocks-flex-grow-desktop"
										className="components-base-control__label"
									>
										{ __( 'Flex', 'generateblocks' ) }
									</label>

									<Tooltip text={ __( 'Reset', 'generateblocks' ) } position="top">
										<Button
											className="gblocks-reset-button"
											icon={ getIcon( 'reset' ) }
											onClick={ () => {
												setAttributes( {
													flexGrow: '',
													flexShrink: '',
													flexBasis: '',
												} );
											} }
										/>
									</Tooltip>
								</div>

								<div className="gblocks-flex-controls-inner">
									<TextControl
										help={ __( 'Grow', 'generateblocks' ) }
										id="gblocks-flex-grow-desktop"
										type={ 'number' }
										value={ flexGrow }
										min="0"
										step="1"
										placeholder="0"
										onChange={ ( value ) => {
											setAttributes( {
												flexGrow: value,
											} );
										} }
										onBlur={ () => {
											if ( '' !== flexGrow ) {
												setAttributes( {
													flexGrow: parseFloat( flexGrow ),
												} );
											}
										} }
										onClick={ ( e ) => {
											// Make sure onBlur fires in Firefox.
											e.currentTarget.focus();
										} }
									/>

									<TextControl
										help={ __( 'Shrink', 'generateblocks' ) }
										type={ 'number' }
										value={ flexShrink }
										min="0"
										step="1"
										placeholder="1"
										onChange={ ( value ) => {
											setAttributes( {
												flexShrink: value,
											} );
										} }
										onBlur={ () => {
											if ( '' !== flexShrink ) {
												setAttributes( {
													flexShrink: parseFloat( flexShrink ),
												} );
											}
										} }
										onClick={ ( e ) => {
											// Make sure onBlur fires in Firefox.
											e.currentTarget.focus();
										} }
									/>

									<div className="gblocks-flex-basis-wrapper">
										{ ! isNaN( flexBasis ) &&
											<UnitPicker
												value={ flexBasisUnit }
												units={ [ 'px', '%' ] }
												onClick={ ( value ) => {
													setAttributes( {
														flexBasisUnit: value,
													} );
												} }
											/>
										}

										<TextControl
											help={ __( 'Basis', 'generateblocks' ) }
											type={ 'text' }
											placeholder="auto"
											value={ flexBasis }
											onChange={ ( value ) => {
												setAttributes( {
													flexBasis: value,
												} );
											} }
											onBlur={ () => {
												if ( ! flexBasis.match( /(auto|fill|max-content|min-content|fit-content|content|inherit|initial|revert|unset|[0-9.]+)/g ) ) {
													setAttributes( {
														flexBasis: '',
													} );
												}
											} }
										/>
									</div>
								</div>
							</BaseControl>

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
						</Fragment>
					) }

					{ 'Tablet' === deviceType && (
						<Fragment>
							<BaseControl>
								<UnitPicker
									label={ __( 'Container Width', 'generateblocks' ) }
									value={ '%' }
									units={ [ '%' ] }
									onClick={ () => {
										return false;
									} }
								/>

								{ !! hideWidthTablet &&
									<div className="gblocks-small-notice-description">
										{ __( 'Width disabled as Flex Basis is not "auto".', 'generateblocks' ) }
									</div>
								}

								<ButtonGroup className={ 'widthButtons' }>
									<Button isPrimary={ !! autoWidthTablet } disabled={ hideWidthTablet } onClick={ () => {
										if ( autoWidthTablet ) {
											setAttributes( { autoWidthTablet: false } );
										} else {
											setAttributes( { autoWidthTablet: true } );
										}
									} }>
										{ __( 'Auto', 'generateblocks' ) }
									</Button>

									<Button isPrimary={ widthTablet === 25 && ! autoWidthTablet } onClick={ () => setAttributes( { widthTablet: 25, autoWidthTablet: false } ) } disabled={ hideWidthTablet }>25</Button>
									<Button isPrimary={ widthTablet === 33.33 && ! autoWidthTablet } onClick={ () => setAttributes( { widthTablet: 33.33, autoWidthTablet: false } ) } disabled={ hideWidthTablet }>33</Button>
									<Button isPrimary={ widthTablet === 50 && ! autoWidthTablet } onClick={ () => setAttributes( { widthTablet: 50, autoWidthTablet: false } ) } disabled={ hideWidthTablet }>50</Button>
									<Button isPrimary={ widthTablet === 66.66 && ! autoWidthTablet } onClick={ () => setAttributes( { widthTablet: 66.66, autoWidthTablet: false } ) } disabled={ hideWidthTablet }>66</Button>
									<Button isPrimary={ widthTablet === 75 && ! autoWidthTablet } onClick={ () => setAttributes( { widthTablet: 75, autoWidthTablet: false } ) } disabled={ hideWidthTablet }>75</Button>
									<Button isPrimary={ widthTablet === 100 && ! autoWidthTablet } onClick={ () => setAttributes( { widthTablet: 100, autoWidthTablet: false } ) } disabled={ hideWidthTablet }>100</Button>
								</ButtonGroup>

								{ ! autoWidthTablet &&
									<RangeControlInput
										value={ hasNumericValue( widthTablet ) ? widthTablet : '' }
										onChange={ ( value ) => {
											// No zero value or values that start with zero.
											if ( String( value ).startsWith( 0 ) ) {
												value = '';
											}

											setAttributes( {
												widthTablet: value,
												autoWidthTablet: false,
											} );
										} }
										rangeMin={ 10 }
										rangeMax={ 100 }
										step={ 5 }
										initialPosition={ blockDefaults.widthTablet }
										disabled={ hideWidthTablet }
									/>
								}
							</BaseControl>

							<BaseControl
								className="gblocks-flex-controls"
							>
								<div className="gblocks-utility-label">
									<label
										htmlFor="gblocks-flex-grow-tablet"
										className="components-base-control__label"
									>
										{ __( 'Flex', 'generateblocks' ) }
									</label>

									<Tooltip text={ __( 'Reset', 'generateblocks' ) } position="top">
										<Button
											className="gblocks-reset-button"
											icon={ getIcon( 'reset' ) }
											onClick={ () => {
												setAttributes( {
													flexGrowTablet: '',
													flexShrinkTablet: '',
													flexBasisTablet: '',
												} );
											} }
										/>
									</Tooltip>
								</div>

								<div className="gblocks-flex-controls-inner">
									<TextControl
										help={ __( 'Grow', 'generateblocks' ) }
										id="gblocks-flex-grow-tablet"
										type={ 'number' }
										value={ flexGrowTablet }
										min="0"
										step="1"
										placeholder={ getResponsivePlaceholder( 'flexGrow', attributes, 'Tablet', '0' ) }
										onChange={ ( value ) => {
											setAttributes( {
												flexGrowTablet: value,
											} );
										} }
										onBlur={ () => {
											if ( '' !== flexGrowTablet ) {
												setAttributes( {
													flexGrowTablet: parseFloat( flexGrowTablet ),
												} );
											}
										} }
										onClick={ ( e ) => {
											// Make sure onBlur fires in Firefox.
											e.currentTarget.focus();
										} }
									/>

									<TextControl
										help={ __( 'Shrink', 'generateblocks' ) }
										type={ 'number' }
										value={ flexShrinkTablet }
										min="0"
										step="1"
										placeholder={ getResponsivePlaceholder( 'flexShrink', attributes, 'Tablet', '1' ) }
										onChange={ ( value ) => {
											setAttributes( {
												flexShrinkTablet: value,
											} );
										} }
										onBlur={ () => {
											if ( '' !== flexShrinkTablet ) {
												setAttributes( {
													flexShrinkTablet: parseFloat( flexShrinkTablet ),
												} );
											}
										} }
										onClick={ ( e ) => {
											// Make sure onBlur fires in Firefox.
											e.currentTarget.focus();
										} }
									/>

									<div className="gblocks-flex-basis-wrapper">
										{ ! isNaN( flexBasisTablet ) &&
											<UnitPicker
												value={ flexBasisUnit }
												units={ [ 'px', '%' ] }
												onClick={ ( value ) => {
													setAttributes( {
														flexBasisUnit: value,
													} );
												} }
											/>
										}

										<TextControl
											help={ __( 'Basis', 'generateblocks' ) }
											type={ 'text' }
											value={ flexBasisTablet }
											placeholder={ getResponsivePlaceholder( 'flexBasis', attributes, 'Tablet', 'auto' ) }
											onChange={ ( value ) => {
												setAttributes( {
													flexBasisTablet: value,
												} );
											} }
											onBlur={ () => {
												if ( ! flexBasisTablet.match( /(auto|fill|max-content|min-content|fit-content|content|inherit|initial|revert|unset|[0-9.]+)/g ) ) {
													setAttributes( {
														flexBasisTablet: '',
													} );
												}
											} }
										/>
									</div>
								</div>
							</BaseControl>

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
						</Fragment>
					) }

					{ 'Mobile' === deviceType && (
						<Fragment>
							<BaseControl>
								<UnitPicker
									label={ __( 'Container Width', 'generateblocks' ) }
									value={ '%' }
									units={ [ '%' ] }
									onClick={ () => {
										return false;
									} }
								/>

								{ !! hideWidthMobile &&
									<div className="gblocks-small-notice-description">
										{ __( 'Width disabled as Flex Basis is not "auto".', 'generateblocks' ) }
									</div>
								}

								<ButtonGroup className={ 'widthButtons' }>
									<Button isPrimary={ !! autoWidthMobile } disabled={ hideWidthMobile } onClick={ () => {
										if ( autoWidthMobile ) {
											setAttributes( { autoWidthMobile: false } );
										} else {
											setAttributes( { autoWidthMobile: true } );
										}
									} }>
										{ __( 'Auto', 'generateblocks' ) }
									</Button>

									<Button isPrimary={ widthMobile === 25 && ! autoWidthMobile } onClick={ () => setAttributes( { widthMobile: 25, autoWidthMobile: false } ) } disabled={ hideWidthMobile }>25</Button>
									<Button isPrimary={ widthMobile === 33.33 && ! autoWidthMobile } onClick={ () => setAttributes( { widthMobile: 33.33, autoWidthMobile: false } ) } disabled={ hideWidthMobile }>33</Button>
									<Button isPrimary={ widthMobile === 50 && ! autoWidthMobile } onClick={ () => setAttributes( { widthMobile: 50, autoWidthMobile: false } ) } disabled={ hideWidthMobile }>50</Button>
									<Button isPrimary={ widthMobile === 66.66 && ! autoWidthMobile } onClick={ () => setAttributes( { widthMobile: 66.66, autoWidthMobile: false } ) } disabled={ hideWidthMobile }>66</Button>
									<Button isPrimary={ widthMobile === 75 && ! autoWidthMobile } onClick={ () => setAttributes( { widthMobile: 75, autoWidthMobile: false } ) } disabled={ hideWidthMobile }>75</Button>
									<Button isPrimary={ widthMobile === 100 && ! autoWidthMobile } onClick={ () => setAttributes( { widthMobile: 100, autoWidthMobile: false } ) } disabled={ hideWidthMobile }>100</Button>
								</ButtonGroup>

								{ ! autoWidthMobile &&
									<RangeControlInput
										value={ hasNumericValue( widthMobile ) ? widthMobile : '' }
										onChange={ ( value ) => {
											// No zero value or values that start with zero.
											if ( String( value ).startsWith( 0 ) ) {
												value = '';
											}

											setAttributes( {
												widthMobile: value,
												autoWidthMobile: false,
											} );
										} }
										rangeMin={ 10 }
										rangeMax={ 100 }
										step={ 5 }
										initialPosition={ blockDefaults.widthMobile }
										disabled={ hideWidthMobile }
									/>
								}
							</BaseControl>

							<BaseControl
								className="gblocks-flex-controls"
							>
								<div className="gblocks-utility-label">
									<label
										htmlFor="gblocks-flex-grow-mobile"
										className="components-base-control__label"
									>
										{ __( 'Flex', 'generateblocks' ) }
									</label>

									<Tooltip text={ __( 'Reset', 'generateblocks' ) } position="top">
										<Button
											className="gblocks-reset-button"
											icon={ getIcon( 'reset' ) }
											onClick={ () => {
												setAttributes( {
													flexGrowMobile: '',
													flexShrinkMobile: '',
													flexBasisMobile: '',
												} );
											} }
										/>
									</Tooltip>
								</div>

								<div className="gblocks-flex-controls-inner">
									<TextControl
										help={ __( 'Grow', 'generateblocks' ) }
										id="gblocks-flex-grow-mobile"
										type={ 'number' }
										value={ flexGrowMobile }
										min="0"
										step="1"
										placeholder={ getResponsivePlaceholder( 'flexGrow', attributes, 'Mobile', '0' ) }
										onChange={ ( value ) => {
											setAttributes( {
												flexGrowMobile: value,
											} );
										} }
										onBlur={ () => {
											if ( '' !== flexGrowMobile ) {
												setAttributes( {
													flexGrowMobile: parseFloat( flexGrowMobile ),
												} );
											}
										} }
										onClick={ ( e ) => {
											// Make sure onBlur fires in Firefox.
											e.currentTarget.focus();
										} }
									/>

									<TextControl
										help={ __( 'Shrink', 'generateblocks' ) }
										type={ 'number' }
										value={ flexShrinkMobile }
										min="0"
										step="1"
										placeholder={ getResponsivePlaceholder( 'flexShrink', attributes, 'Mobile', '1' ) }
										onChange={ ( value ) => {
											setAttributes( {
												flexShrinkMobile: value,
											} );
										} }
										onBlur={ () => {
											if ( '' !== flexShrinkMobile ) {
												setAttributes( {
													flexShrinkMobile: parseFloat( flexShrinkMobile ),
												} );
											}
										} }
										onClick={ ( e ) => {
											// Make sure onBlur fires in Firefox.
											e.currentTarget.focus();
										} }
									/>

									<div className="gblocks-flex-basis-wrapper">
										{ ! isNaN( flexBasisMobile ) &&
											<UnitPicker
												value={ flexBasisUnit }
												units={ [ 'px', '%' ] }
												onClick={ ( value ) => {
													setAttributes( {
														flexBasisUnit: value,
													} );
												} }
											/>
										}

										<TextControl
											help={ __( 'Basis', 'generateblocks' ) }
											type={ 'text' }
											value={ flexBasisMobile }
											placeholder={ getResponsivePlaceholder( 'flexBasis', attributes, 'Mobile', 'auto' ) }
											onChange={ ( value ) => {
												setAttributes( {
													flexBasisMobile: value,
												} );
											} }
											onBlur={ () => {
												if ( ! flexBasisMobile.match( /(auto|fill|max-content|min-content|fit-content|content|inherit|initial|revert|unset|[0-9.]+)/g ) ) {
													setAttributes( {
														flexBasisMobile: '',
													} );
												}
											} }
										/>
									</div>
								</div>
							</BaseControl>

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
					) }

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
								label={ __( 'Outer z-index', 'generateblocks' ) }
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

					{ applyFilters( 'generateblocks.editor.controls', '', 'containerGridLayout', props, state ) }
				</PanelArea>
			) }
		</>
	);
};
