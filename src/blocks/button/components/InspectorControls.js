import ResponsiveTabs from '../../../components/responsive-tabs';
import PanelArea from '../../../components/panel-area';
import { __ } from '@wordpress/i18n';
import getIcon from '../../../utils/get-icon';
import { Fragment, useEffect, useState } from '@wordpress/element';
import TypographyControls from '../../../components/typography';
import { applyFilters } from '@wordpress/hooks';
import DimensionsControl from '../../../components/dimensions';
import { Button, TabPanel, TextControl } from '@wordpress/components';
import ColorPicker from '../../../components/color-picker';
import GradientControl from '../../../components/gradient';
import UnitPicker from '../../../components/unit-picker';
import IconPicker from '../../../components/icon-picker';
import { InspectorControls } from '@wordpress/block-editor';

const getFontSizePlaceholder = ( uniqueId ) => {
	let placeholder = '17';

	const buttonId = document.querySelector( `.gb-button-${ uniqueId }` );

	if ( buttonId ) {
		placeholder = parseFloat( window.getComputedStyle( buttonId ).fontSize );
	}

	return placeholder;
};

export default ( props ) => {
	const {
		uniqueId,
		attributes,
		setAttributes,
		deviceType,
		setDeviceType,
		state,
		blockDefaults,
	} = props;

	const {
		icon,
		removeText,
		backgroundColor,
		backgroundColorOpacity,
		textColor,
		backgroundColorHover,
		backgroundColorHoverOpacity,
		textColorHover,
		borderColor,
		borderColorOpacity,
		borderColorHover,
		borderColorHoverOpacity,
		iconSize,
		iconSizeTablet,
		iconSizeMobile,
		iconSizeUnit,
	} = attributes;

	const [ fontSizePlaceholder, setFontSizePlaceholder ] = useState( '17' );

	useEffect( () => {
		const currentPlaceholder = getFontSizePlaceholder( uniqueId );

		if ( currentPlaceholder !== fontSizePlaceholder ) {
			setFontSizePlaceholder( currentPlaceholder );
		}
	} );

	return (
		<InspectorControls>
			<ResponsiveTabs { ...props } selectedDevice={ deviceType } onClick={ setDeviceType } />

			<PanelArea
				{ ...props }
				title={ __( 'Typography', 'generateblocks' ) }
				initialOpen={ false }
				icon={ getIcon( 'typography' ) }
				className={ 'gblocks-panel-label' }
				id={ 'buttonTypography' }
				state={ state }
				showPanel={ ! removeText || false }
			>

				{ 'Desktop' === deviceType && (
					<Fragment>
						<TypographyControls
							{ ...props }
							showFontFamily={ true }
							showFontWeight={ true }
							showTextTransform={ true }
							showFontSize={ true }
							showLetterSpacing={ true }
							fontSizePlaceholder={ fontSizePlaceholder }
							defaultFontSize={ blockDefaults.fontSize }
							defaultFontSizeUnit={ blockDefaults.fontSizeUnit }
							defaultLetterSpacing={ blockDefaults.letterSpacing }
						/>
					</Fragment>
				) }

				{ 'Tablet' === deviceType && (
					<Fragment>
						<TypographyControls
							{ ...props }
							device={ 'Tablet' }
							showFontSize={ true }
							showLetterSpacing={ true }
							disableAdvancedToggle={ true }
							defaultFontSize={ blockDefaults.fontSizeTablet }
							defaultFontSizeUnit={ blockDefaults.fontSizeUnit }
							defaultLetterSpacing={ blockDefaults.letterSpacingTablet }
						/>
					</Fragment>
				) }

				{ 'Mobile' === deviceType && (
					<Fragment>
						<TypographyControls
							{ ...props }
							device={ 'Mobile' }
							showFontSize={ true }
							showLetterSpacing={ true }
							disableAdvancedToggle={ true }
							defaultFontSize={ blockDefaults.fontSizeMobile }
							defaultFontSizeUnit={ blockDefaults.fontSizeUnit }
							defaultLetterSpacing={ blockDefaults.letterSpacingMobile }
						/>
					</Fragment>
				) }

				{ applyFilters( 'generateblocks.editor.controls', '', 'buttonTypography', props, state ) }
			</PanelArea>

			<PanelArea
				{ ...props }
				title={ __( 'Spacing', 'generateblocks' ) }
				initialOpen={ false }
				icon={ getIcon( 'spacing' ) }
				className={ 'gblocks-panel-label' }
				id={ 'buttonSpacing' }
				state={ state }
			>

				{ 'Desktop' === deviceType && (
					<Fragment>
						<DimensionsControl
							{ ...props }
							device={ deviceType }
							type={ 'padding' }
							label={ __( 'Padding', 'generateblocks' ) }
							attrTop={ 'paddingTop' }
							attrRight={ 'paddingRight' }
							attrBottom={ 'paddingBottom' }
							attrLeft={ 'paddingLeft' }
							attrUnit={ 'paddingUnit' }
							attrSyncUnits={ 'paddingSyncUnits' }
							defaults={ blockDefaults }
							units={ [ 'px', 'em', '%' ] }
						/>

						<DimensionsControl
							{ ...props }
							device={ deviceType }
							type={ 'margin' }
							label={ __( 'Margin', 'generateblocks' ) }
							attrTop={ 'marginTop' }
							attrRight={ 'marginRight' }
							attrBottom={ 'marginBottom' }
							attrLeft={ 'marginLeft' }
							attrUnit={ 'marginUnit' }
							attrSyncUnits={ 'marginSyncUnits' }
							defaults={ blockDefaults }
							units={ [ 'px', 'em', '%' ] }
						/>

						<DimensionsControl
							{ ...props }
							device={ deviceType }
							type={ 'padding' }
							label={ __( 'Border Size', 'generateblocks' ) }
							attrTop={ 'borderSizeTop' }
							attrRight={ 'borderSizeRight' }
							attrBottom={ 'borderSizeBottom' }
							attrLeft={ 'borderSizeLeft' }
							attrSyncUnits={ 'borderSizeSyncUnits' }
							defaults={ blockDefaults }
							units={ [ 'px' ] }
						/>

						<DimensionsControl
							{ ...props }
							device={ deviceType }
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
							defaults={ blockDefaults }
							units={ [ 'px', 'em', '%' ] }
						/>
					</Fragment>
				) }

				{ 'Tablet' === deviceType && (
					<Fragment>
						<DimensionsControl
							{ ...props }
							device={ deviceType }
							type={ 'padding' }
							label={ __( 'Padding', 'generateblocks' ) }
							attrTop={ 'paddingTopTablet' }
							attrRight={ 'paddingRightTablet' }
							attrBottom={ 'paddingBottomTablet' }
							attrLeft={ 'paddingLeftTablet' }
							attrUnit={ 'paddingUnit' }
							attrSyncUnits={ 'paddingSyncUnits' }
							defaults={ blockDefaults }
							units={ [ 'px', 'em', '%' ] }
						/>

						<DimensionsControl
							{ ...props }
							device={ deviceType }
							type={ 'margin' }
							label={ __( 'Margin', 'generateblocks' ) }
							attrTop={ 'marginTopTablet' }
							attrRight={ 'marginRightTablet' }
							attrBottom={ 'marginBottomTablet' }
							attrLeft={ 'marginLeftTablet' }
							attrUnit={ 'marginUnit' }
							attrSyncUnits={ 'marginSyncUnits' }
							defaults={ blockDefaults }
							units={ [ 'px', 'em', '%' ] }
						/>

						<DimensionsControl
							{ ...props }
							device={ deviceType }
							type={ 'padding' }
							label={ __( 'Border Size', 'generateblocks' ) }
							attrTop={ 'borderSizeTopTablet' }
							attrRight={ 'borderSizeRightTablet' }
							attrBottom={ 'borderSizeBottomTablet' }
							attrLeft={ 'borderSizeLeftTablet' }
							attrSyncUnits={ 'borderSizeSyncUnits' }
							defaults={ blockDefaults }
							units={ [ 'px' ] }
						/>

						<DimensionsControl
							{ ...props }
							device={ deviceType }
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
							defaults={ blockDefaults }
							units={ [ 'px', 'em', '%' ] }
						/>
					</Fragment>
				) }

				{ 'Mobile' === deviceType && (
					<Fragment>
						<DimensionsControl
							{ ...props }
							device={ deviceType }
							type={ 'padding' }
							label={ __( 'Padding', 'generateblocks' ) }
							attrTop={ 'paddingTopMobile' }
							attrRight={ 'paddingRightMobile' }
							attrBottom={ 'paddingBottomMobile' }
							attrLeft={ 'paddingLeftMobile' }
							attrUnit={ 'paddingUnit' }
							attrSyncUnits={ 'paddingSyncUnits' }
							defaults={ blockDefaults }
							units={ [ 'px', 'em', '%' ] }
						/>

						<DimensionsControl
							{ ...props }
							device={ deviceType }
							type={ 'padding' }
							label={ __( 'Margin', 'generateblocks' ) }
							attrTop={ 'marginTopMobile' }
							attrRight={ 'marginRightMobile' }
							attrBottom={ 'marginBottomMobile' }
							attrLeft={ 'marginLeftMobile' }
							attrUnit={ 'marginUnit' }
							attrSyncUnits={ 'marginSyncUnits' }
							defaults={ blockDefaults }
							units={ [ 'px', 'em', '%' ] }
						/>

						<DimensionsControl
							{ ...props }
							device={ deviceType }
							type={ 'padding' }
							label={ __( 'Border Size', 'generateblocks' ) }
							attrTop={ 'borderSizeTopMobile' }
							attrRight={ 'borderSizeRightMobile' }
							attrBottom={ 'borderSizeBottomMobile' }
							attrLeft={ 'borderSizeLeftMobile' }
							attrSyncUnits={ 'borderSizeSyncUnits' }
							defaults={ blockDefaults }
							units={ [ 'px' ] }
						/>

						<DimensionsControl
							{ ...props }
							device={ deviceType }
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
							defaults={ blockDefaults }
							units={ [ 'px', 'em', '%' ] }
						/>
					</Fragment>
				) }

				{ applyFilters( 'generateblocks.editor.controls', '', 'buttonSpacing', props, state ) }
			</PanelArea>

			<PanelArea
				{ ...props }
				title={ __( 'Colors', 'generateblocks' ) }
				initialOpen={ false }
				icon={ getIcon( 'colors' ) }
				className={ 'gblocks-panel-label' }
				id={ 'buttonColors' }
				state={ state }
			>
				{ 'Desktop' === deviceType &&
				<TabPanel
					className="layout-tab-panel gblocks-control-tabs"
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
														backgroundColor: nextBackgroundColor,
													} )
												}
												onOpacityChange={ ( value ) =>
													setAttributes( {
														backgroundColorOpacity: value,
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
														textColor: nextTextColor,
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
														borderColor: value,
													} )
												}
												onOpacityChange={ ( value ) =>
													setAttributes( {
														borderColorOpacity: value,
													} )
												}
											/>

											{ applyFilters( 'generateblocks.editor.controls', '', 'buttonColorsNormal', props, state ) }
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
														backgroundColorHover: nextBackgroundColorHover,
													} )
												}
												onOpacityChange={ ( value ) =>
													setAttributes( {
														backgroundColorHoverOpacity: value,
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
														textColorHover: nextTextColorHover,
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
														borderColorHover: value,
													} )
												}
												onOpacityChange={ ( value ) =>
													setAttributes( {
														borderColorHoverOpacity: value,
													} )
												}
											/>

											{ applyFilters( 'generateblocks.editor.controls', '', 'buttonColorsHover', props, state ) }
										</Fragment>
									) }
								</div>
							);
						}
					}
				</TabPanel>
				}

				{ applyFilters( 'generateblocks.editor.controls', '', 'buttonColors', props, state ) }
			</PanelArea>

			<PanelArea
				{ ...props }
				title={ __( 'Background Gradient', 'generateblocks' ) }
				initialOpen={ false }
				icon={ getIcon( 'gradients' ) }
				className={ 'gblocks-panel-label' }
				id={ 'buttonBackgroundGradient' }
				state={ state }
			>
				{ 'Desktop' === deviceType &&
				<GradientControl
					{ ...props }
					attrGradient={ 'gradient' }
					attrGradientDirection={ 'gradientDirection' }
					attrGradientColorOne={ 'gradientColorOne' }
					attrGradientColorOneOpacity={ 'gradientColorOneOpacity' }
					attrGradientColorStopOne={ 'gradientColorStopOne' }
					attrGradientColorTwo={ 'gradientColorTwo' }
					attrGradientColorTwoOpacity={ 'gradientColorTwoOpacity' }
					attrGradientColorStopTwo={ 'gradientColorStopTwo' }
					defaultColorOne={ blockDefaults.gradientColorOne }
					defaultColorTwo={ blockDefaults.gradientColorTwo }
				/>
				}

				{ applyFilters( 'generateblocks.editor.controls', '', 'buttonBackgroundGradient', props, state ) }
			</PanelArea>

			<PanelArea
				{ ...props }
				title={ __( 'Icon', 'generateblocks' ) }
				initialOpen={ false }
				icon={ getIcon( 'icons' ) }
				className={ 'gblocks-panel-label' }
				id={ 'buttonIcon' }
				state={ state }
				showPanel={ 'Desktop' === deviceType || !! icon ? true : false }
			>

				{ 'Desktop' === deviceType &&
				<IconPicker
					{ ...props }
					attrIcon={ 'icon' }
					attrIconLocation={ 'iconLocation' }
					attrRemoveText={ 'removeText' }
					locationOptions={ [
						{ label: __( 'Left', 'generateblocks' ), value: 'left' },
						{ label: __( 'Right', 'generateblocks' ), value: 'right' },
					] }
				/>
				}

				{ 'Desktop' === deviceType && !! icon && (
					<Fragment>
						{ ! removeText &&
						<Fragment>
							<DimensionsControl
								{ ...props }
								device={ deviceType }
								type={ 'padding' }
								label={ __( 'Padding', 'generateblocks' ) }
								attrTop={ 'iconPaddingTop' }
								attrRight={ 'iconPaddingRight' }
								attrBottom={ 'iconPaddingBottom' }
								attrLeft={ 'iconPaddingLeft' }
								attrUnit={ 'iconPaddingUnit' }
								attrSyncUnits={ 'iconPaddingSyncUnits' }
								defaults={ blockDefaults }
								units={ [ 'px', 'em', '%' ] }
							/>
						</Fragment>
						}

						<UnitPicker
							label={ __( 'Icon Size', 'generateblocks' ) }
							value={ iconSizeUnit }
							units={ [ 'px', 'em' ] }
							onClick={ ( value ) => {
								setAttributes( {
									iconSizeUnit: value,
								} );
							} }
						/>

						<div className="components-base-control components-gblocks-typography-control__inputs">
							<TextControl
								type={ 'number' }
								value={ iconSize || '' }
								step={ 'em' === iconSizeUnit ? .1 : 1 }
								onChange={ ( value ) => {
									setAttributes( {
										iconSize: value,
									} );
								} }
								onBlur={ () => {
									setAttributes( {
										iconSize: parseFloat( iconSize ),
									} );
								} }
								onClick={ ( e ) => {
									// Make sure onBlur fires in Firefox.
									e.currentTarget.focus();
								} }
							/>

							<Button
								isSmall
								isSecondary
								className="components-gblocks-default-number"
								onClick={ () => {
									setAttributes( {
										iconSize: blockDefaults.iconSize,
									} );
								} }
							>
								{ __( 'Reset', 'generateblocks' ) }
							</Button>
						</div>
					</Fragment>
				) }

				{ 'Tablet' === deviceType && !! icon &&
				<Fragment>
					{ ! removeText &&
					<Fragment>
						<DimensionsControl
							{ ...props }
							device={ deviceType }
							type={ 'padding' }
							label={ __( 'Padding', 'generateblocks' ) }
							attrTop={ 'iconPaddingTopTablet' }
							attrRight={ 'iconPaddingRightTablet' }
							attrBottom={ 'iconPaddingBottomTablet' }
							attrLeft={ 'iconPaddingLeftTablet' }
							attrUnit={ 'iconPaddingUnit' }
							attrSyncUnits={ 'iconPaddingSyncUnits' }
							defaults={ blockDefaults }
							units={ [ 'px', 'em', '%' ] }
						/>
					</Fragment>
					}

					<UnitPicker
						label={ __( 'Icon Size', 'generateblocks' ) }
						value={ iconSizeUnit }
						units={ [ 'px', 'em' ] }
						onClick={ ( value ) => {
							setAttributes( {
								iconSizeUnit: value,
							} );
						} }
					/>

					<div className="components-base-control components-gblocks-typography-control__inputs">
						<TextControl
							type={ 'number' }
							value={ iconSizeTablet || '' }
							step={ 'em' === iconSizeUnit ? .1 : 1 }
							placeholder="1"
							onChange={ ( value ) => {
								setAttributes( {
									iconSizeTablet: value,
								} );
							} }
							onBlur={ () => {
								setAttributes( {
									iconSizeTablet: parseFloat( iconSizeTablet ),
								} );
							} }
							onClick={ ( e ) => {
								// Make sure onBlur fires in Firefox.
								e.currentTarget.focus();
							} }
						/>

						<Button
							isSmall
							isSecondary
							className="components-gblocks-default-number"
							onClick={ () => {
								setAttributes( {
									iconSizeTablet: blockDefaults.iconSizeTablet,
								} );
							} }
						>
							{ __( 'Reset', 'generateblocks' ) }
						</Button>
					</div>
				</Fragment>
				}

				{ 'Mobile' === deviceType && !! icon && (
					<Fragment>
						{ ! removeText &&
						<Fragment>
							<DimensionsControl
								{ ...props }
								device={ deviceType }
								type={ 'padding' }
								label={ __( 'Padding', 'generateblocks' ) }
								attrTop={ 'iconPaddingTopMobile' }
								attrRight={ 'iconPaddingRightMobile' }
								attrBottom={ 'iconPaddingBottomMobile' }
								attrLeft={ 'iconPaddingLeftMobile' }
								attrUnit={ 'iconPaddingUnit' }
								attrSyncUnits={ 'iconPaddingSyncUnits' }
								defaults={ blockDefaults }
								units={ [ 'px', 'em', '%' ] }
							/>
						</Fragment>
						}

						<UnitPicker
							label={ __( 'Icon Size', 'generateblocks' ) }
							value={ iconSizeUnit }
							units={ [ 'px', 'em' ] }
							onClick={ ( value ) => {
								setAttributes( {
									iconSizeUnit: value,
								} );
							} }
						/>

						<div className="components-base-control components-gblocks-typography-control__inputs">
							<TextControl
								type={ 'number' }
								value={ iconSizeMobile || '' }
								step={ 'em' === iconSizeUnit ? .1 : 1 }
								placeholder="1"
								onChange={ ( value ) => {
									setAttributes( {
										iconSizeMobile: value,
									} );
								} }
								onBlur={ () => {
									setAttributes( {
										iconSizeMobile: parseFloat( iconSizeMobile ),
									} );
								} }
								onClick={ ( e ) => {
									// Make sure onBlur fires in Firefox.
									e.currentTarget.focus();
								} }
							/>

							<Button
								isSmall
								isSecondary
								className="components-gblocks-default-number"
								onClick={ () => {
									setAttributes( {
										iconSizeMobile: blockDefaults.iconSizeMobile,
									} );
								} }
							>
								{ __( 'Reset', 'generateblocks' ) }
							</Button>
						</div>
					</Fragment>
				) }

				{ applyFilters( 'generateblocks.editor.controls', '', 'buttonIcon', props, state ) }
			</PanelArea>
		</InspectorControls>
	);
};
