import ResponsiveTabs from '../../../components/responsive-tabs';
import PanelArea from '../../../components/panel-area';
import { Button, SelectControl, TextControl, ToggleControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { applyFilters } from '@wordpress/hooks';
import getIcon from '../../../utils/get-icon';
import { Fragment } from '@wordpress/element';
import TypographyControls from '../../../components/typography';
import DimensionsControl from '../../../components/dimensions';
import ColorPicker from '../../../components/color-picker';
import IconPicker from '../../../components/icon-picker';
import UnitPicker from '../../../components/unit-picker';
import { InspectorControls } from '@wordpress/block-editor';

export default ( props ) => {
	const {
		attributes,
		setAttributes,
		deviceType,
		setDeviceType,
		blockState,
	} = props;

	const {
		fontSizePlaceholder,
	} = blockState;

	const {
		element,
		backgroundColor,
		backgroundColorOpacity,
		textColor,
		linkColor,
		linkColorHover,
		borderColor,
		borderColorOpacity,
		highlightTextColor,
		marginTop,
		marginRight,
		marginBottom,
		marginLeft,
		icon,
		iconColor,
		iconColorOpacity,
		iconLocation,
		iconLocationTablet,
		iconLocationMobile,
		iconVerticalAlignment,
		iconVerticalAlignmentTablet,
		iconVerticalAlignmentMobile,
		iconSize,
		iconSizeTablet,
		iconSizeMobile,
		iconSizeUnit,
		inlineWidth,
		inlineWidthTablet,
		inlineWidthMobile,
		removeText,
	} = attributes;

	let iconSizePlaceholderMobile = '';

	if ( iconSizeTablet || 0 === iconSizeTablet ) {
		iconSizePlaceholderMobile = iconSizeTablet;
	} else if ( iconSize || 0 === iconSize ) {
		iconSizePlaceholderMobile = iconSize;
	} else {
		iconSizePlaceholderMobile = '';
	}

	return (
		<InspectorControls>
			<ResponsiveTabs { ...props } selectedDevice={ deviceType } onClick={ setDeviceType } />

			<PanelArea
				{ ...props }
				id={ 'headlineElement' }
				state={ blockState }
				showPanel={ 'Desktop' === deviceType }
			>
				<SelectControl
					label={ __( 'Tag Name', 'generateblocks' ) }
					value={ element }
					options={ [
						{ label: 'h1', value: 'h1' },
						{ label: 'h2', value: 'h2' },
						{ label: 'h3', value: 'h3' },
						{ label: 'h4', value: 'h4' },
						{ label: 'h5', value: 'h5' },
						{ label: 'h6', value: 'h6' },
						{ label: 'paragraph', value: 'p' },
						{ label: 'div', value: 'div' },
					] }
					onChange={ ( value ) => {
						setAttributes( {
							element: value,
						} );

						if ( ! marginTop && ! marginRight && ! marginBottom && ! marginLeft ) {
							if ( 'p' === value ) {
								setAttributes( { marginUnit: 'em' } );
							} else {
								setAttributes( { marginUnit: generateBlocksDefaults.headline.marginUnit } );
							}
						}
					} }
				/>

				{ applyFilters( 'generateblocks.editor.controls', '', 'headlineElement', props, blockState ) }
			</PanelArea>

			<PanelArea
				{ ...props }
				title={ __( 'Typography', 'generateblocks' ) }
				initialOpen={ false }
				icon={ getIcon( 'typography' ) }
				className={ 'gblocks-panel-label' }
				id={ 'headlineTypography' }
				state={ blockState }
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
							showLineHeight={ true }
							showLetterSpacing={ true }
							fontSizePlaceholder={ fontSizePlaceholder }
							defaultFontSize={ generateBlocksDefaults.headline.fontSize }
							defaultFontSizeUnit={ generateBlocksDefaults.headline.fontSizeUnit }
							defaultLineHeight={ generateBlocksDefaults.headline.lineHeight }
							defaultLineHeightUnit={ generateBlocksDefaults.headline.lineHeightUnit }
							defaultLetterSpacing={ generateBlocksDefaults.headline.letterSpacing }
						/>
					</Fragment>
				) }

				{ 'Tablet' === deviceType && (
					<Fragment>
						<TypographyControls
							{ ...props }
							device={ 'Tablet' }
							showFontSize={ true }
							showLineHeight={ true }
							showLetterSpacing={ true }
							defaultFontSize={ generateBlocksDefaults.headline.fontSizeTablet }
							defaultFontSizeUnit={ generateBlocksDefaults.headline.fontSizeUnit }
							defaultLineHeight={ generateBlocksDefaults.headline.lineHeightTablet }
							defaultLineHeightUnit={ generateBlocksDefaults.headline.lineHeightUnit }
							defaultLetterSpacing={ generateBlocksDefaults.headline.letterSpacingTablet }
						/>
					</Fragment>
				) }

				{ 'Mobile' === deviceType && (
					<Fragment>
						<TypographyControls
							{ ...props }
							device={ 'Mobile' }
							showFontSize={ true }
							showLineHeight={ true }
							showLetterSpacing={ true }
							defaultFontSize={ generateBlocksDefaults.headline.fontSizeMobile }
							defaultFontSizeUnit={ generateBlocksDefaults.headline.fontSizeUnit }
							defaultLineHeight={ generateBlocksDefaults.headline.lineHeightMobile }
							defaultLineHeightUnit={ generateBlocksDefaults.headline.lineHeightUnit }
							defaultLetterSpacing={ generateBlocksDefaults.headline.letterSpacingMobile }
						/>
					</Fragment>
				) }

				{ applyFilters( 'generateblocks.editor.controls', '', 'headlineTypography', props, blockState ) }
			</PanelArea>

			<PanelArea
				{ ...props }
				title={ __( 'Spacing', 'generateblocks' ) }
				initialOpen={ false }
				icon={ getIcon( 'spacing' ) }
				className={ 'gblocks-panel-label' }
				id={ 'headlineSpacing' }
				state={ blockState }
			>
				{ 'Desktop' === deviceType && (
					<Fragment>
						<ToggleControl
							label={ __( 'Inline Width', 'generateblocks' ) }
							checked={ !! inlineWidth }
							onChange={ ( value ) => {
								setAttributes( {
									inlineWidth: value,
								} );
							} }
						/>

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
							defaults={ generateBlocksDefaults.headline }
							units={ [ 'px', 'em', '%' ] }
						/>

						<DimensionsControl
							{ ...props }
							device={ deviceType }
							type={ 'margin' }
							block={ 'headline' }
							label={ __( 'Margin', 'generateblocks' ) }
							attrTop={ 'marginTop' }
							attrRight={ 'marginRight' }
							attrBottom={ 'marginBottom' }
							attrLeft={ 'marginLeft' }
							attrUnit={ 'marginUnit' }
							attrSyncUnits={ 'marginSyncUnits' }
							defaults={ generateBlocksDefaults.headline }
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
							defaults={ generateBlocksDefaults.headline }
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
							defaults={ generateBlocksDefaults.headline }
							units={ [ 'px', 'em', '%' ] }
						/>
					</Fragment>
				) }

				{ 'Tablet' === deviceType && (
					<Fragment>
						<ToggleControl
							label={ __( 'Inline Width', 'generateblocks' ) }
							checked={ !! inlineWidthTablet }
							onChange={ ( value ) => {
								setAttributes( {
									inlineWidthTablet: value,
								} );
							} }
						/>

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
							defaults={ generateBlocksDefaults.headline }
							units={ [ 'px', 'em', '%' ] }
						/>

						<DimensionsControl
							{ ...props }
							device={ deviceType }
							type={ 'margin' }
							block={ 'headline' }
							label={ __( 'Margin', 'generateblocks' ) }
							attrTop={ 'marginTopTablet' }
							attrRight={ 'marginRightTablet' }
							attrBottom={ 'marginBottomTablet' }
							attrLeft={ 'marginLeftTablet' }
							attrUnit={ 'marginUnit' }
							attrSyncUnits={ 'marginSyncUnits' }
							defaults={ generateBlocksDefaults.headline }
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
							defaults={ generateBlocksDefaults.headline }
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
							defaults={ generateBlocksDefaults.headline }
							units={ [ 'px', 'em', '%' ] }
						/>
					</Fragment>
				) }

				{ 'Mobile' === deviceType && (
					<Fragment>
						<ToggleControl
							label={ __( 'Inline Width', 'generateblocks' ) }
							checked={ !! inlineWidthMobile }
							onChange={ ( value ) => {
								setAttributes( {
									inlineWidthMobile: value,
								} );
							} }
						/>

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
							defaults={ generateBlocksDefaults.headline }
							units={ [ 'px', 'em', '%' ] }
						/>

						<DimensionsControl
							{ ...props }
							device={ deviceType }
							type={ 'margin' }
							block={ 'headline' }
							label={ __( 'Margin', 'generateblocks' ) }
							attrTop={ 'marginTopMobile' }
							attrRight={ 'marginRightMobile' }
							attrBottom={ 'marginBottomMobile' }
							attrLeft={ 'marginLeftMobile' }
							attrUnit={ 'marginUnit' }
							attrSyncUnits={ 'marginSyncUnits' }
							defaults={ generateBlocksDefaults.headline }
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
							defaults={ generateBlocksDefaults.headline }
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
							defaults={ generateBlocksDefaults.headline }
							units={ [ 'px', 'em', '%' ] }
						/>
					</Fragment>
				) }

				{ applyFilters( 'generateblocks.editor.controls', '', 'headlineSpacing', props, blockState ) }
			</PanelArea>

			<PanelArea
				{ ...props }
				title={ __( 'Colors', 'generateblocks' ) }
				initialOpen={ false }
				icon={ getIcon( 'colors' ) }
				className={ 'gblocks-panel-label' }
				id={ 'headlineColors' }
				state={ blockState }
				showPanel={ 'Desktop' === deviceType || false }
			>
				<ColorPicker
					label={ __( 'Background Color', 'generateblocks' ) }
					value={ backgroundColor }
					alpha={ true }
					valueOpacity={ backgroundColorOpacity }
					attrOpacity={ 'backgroundColorOpacity' }
					onChange={ ( value ) =>
						setAttributes( {
							backgroundColor: value,
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
					onChange={ ( value ) =>
						setAttributes( {
							textColor: value,
						} )
					}
				/>

				<ColorPicker
					label={ __( 'Link Color', 'generateblocks' ) }
					value={ linkColor }
					alpha={ false }
					onChange={ ( value ) =>
						setAttributes( {
							linkColor: value,
						} )
					}
				/>

				<ColorPicker
					label={ __( 'Link Color Hover', 'generateblocks' ) }
					value={ linkColorHover }
					alpha={ false }
					onChange={ ( value ) =>
						setAttributes( {
							linkColorHover: value,
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
							borderColor: value,
						} )
					}
					onOpacityChange={ ( value ) =>
						setAttributes( {
							borderColorOpacity: value,
						} )
					}
				/>

				{ icon &&
				<ColorPicker
					label={ __( 'Icon Color', 'generateblocks' ) }
					value={ iconColor }
					alpha={ true }
					valueOpacity={ iconColorOpacity }
					attrOpacity={ 'iconColorOpacity' }
					onChange={ ( value ) =>
						setAttributes( {
							iconColor: value,
						} )
					}
					onOpacityChange={ ( value ) =>
						setAttributes( {
							iconColorOpacity: value,
						} )
					}
				/>
				}

				<ColorPicker
					label={ __( 'Highlight Text', 'generateblocks' ) }
					value={ highlightTextColor }
					alpha={ false }
					onChange={ ( value ) =>
						setAttributes( {
							highlightTextColor: value,
						} )
					}
				/>
			</PanelArea>

			<PanelArea
				{ ...props }
				title={ __( 'Icon', 'generateblocks' ) }
				initialOpen={ false }
				icon={ getIcon( 'icons' ) }
				className={ 'gblocks-panel-label' }
				id={ 'headlineIcon' }
				state={ blockState }
				showPanel={ 'Desktop' === deviceType || !! icon ? true : false }
			>

				{ 'Desktop' === deviceType &&
				<IconPicker
					{ ...props }
					attrIcon={ 'icon' }
					attrRemoveText={ 'removeText' }
					attrAriaLabel={ 'ariaLabel' }
				/>
				}

				{ 'Desktop' === deviceType && !! icon &&
				<Fragment>
					{ ! removeText &&
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
									iconVerticalAlignment: value,
								} );
							} }
						/>
						}

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
							defaults={ generateBlocksDefaults.headline }
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
							value={ iconSize || 0 === iconSize ? iconSize : '' }
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
									iconSize: generateBlocksDefaults.headline.iconSize,
								} );
							} }
						>
							{ __( 'Reset', 'generateblocks' ) }
						</Button>
					</div>
				</Fragment>
				}

				{ 'Tablet' === deviceType && !! icon &&
				<Fragment>
					{ ! removeText &&
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
								{ label: __( 'Inherit', 'generateblocks' ), value: '' },
								{ label: __( 'Top', 'generateblocks' ), value: 'top' },
								{ label: __( 'Center', 'generateblocks' ), value: 'center' },
								{ label: __( 'Bottom', 'generateblocks' ), value: 'bottom' },
							] }
							onChange={ ( value ) => {
								setAttributes( {
									iconVerticalAlignmentTablet: value,
								} );
							} }
						/>
						}

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
							defaults={ generateBlocksDefaults.headline }
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
							value={ iconSizeTablet || 0 === iconSizeTablet ? iconSizeTablet : '' }
							step={ 'em' === iconSizeUnit ? .1 : 1 }
							placeholder={ iconSize || 0 === iconSize ? iconSize : '' }
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
									iconSizeTablet: generateBlocksDefaults.headline.iconSizeTablet,
								} );
							} }
						>
							{ __( 'Reset', 'generateblocks' ) }
						</Button>
					</div>
				</Fragment>
				}

				{ 'Mobile' === deviceType && !! icon &&
				<Fragment>
					{ ! removeText &&
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
								{ label: __( 'Inherit', 'generateblocks' ), value: '' },
								{ label: __( 'Top', 'generateblocks' ), value: 'top' },
								{ label: __( 'Center', 'generateblocks' ), value: 'center' },
								{ label: __( 'Bottom', 'generateblocks' ), value: 'bottom' },
							] }
							onChange={ ( value ) => {
								setAttributes( {
									iconVerticalAlignmentMobile: value,
								} );
							} }
						/>
						}

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
							defaults={ generateBlocksDefaults.headline }
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
							value={ iconSizeMobile || 0 === iconSizeMobile ? iconSizeMobile : '' }
							step={ 'em' === iconSizeUnit ? .1 : 1 }
							placeholder={ iconSizePlaceholderMobile }
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
									iconSizeMobile: generateBlocksDefaults.headline.iconSizeMobile,
								} );
							} }
						>
							{ __( 'Reset', 'generateblocks' ) }
						</Button>
					</div>
				</Fragment>
				}

				{ applyFilters( 'generateblocks.editor.controls', '', 'headlineIcon', props, blockState ) }
			</PanelArea>

			<PanelArea
				{ ...props }
				title={ __( 'Documentation', 'generateblocks' ) }
				icon={ getIcon( 'documentation' ) }
				initialOpen={ false }
				className={ 'gblocks-panel-label' }
				id={ 'headlineDocumentation' }
				state={ blockState }
			>
				<p>{ __( 'Need help with this block?', 'generateblocks' ) }</p>
				<a href="https://docs.generateblocks.com/collection/headline/" target="_blank" rel="noreferrer noopener">{ __( 'Visit our documentation', 'generateblocks' ) }</a>

				{ applyFilters( 'generateblocks.editor.controls', '', 'headlineDocumentation', props, blockState ) }
			</PanelArea>
		</InspectorControls>
	);
};
