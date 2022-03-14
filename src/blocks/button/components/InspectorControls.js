import ResponsiveTabs from '../../../components/responsive-tabs';
import PanelArea from '../../../components/panel-area';
import { __ } from '@wordpress/i18n';
import getIcon from '../../../utils/get-icon';
import { Fragment, useEffect, useState } from '@wordpress/element';
import TypographyControls from '../../../components/typography';
import { applyFilters } from '@wordpress/hooks';
import DimensionsControl from '../../../components/dimensions';
import DimensionsGroup from '../../../components/dimensions-group';
import { Button, TextControl } from '@wordpress/components';
import ColorGroup from '../../../components/color-group';
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
					<ColorGroup
						{ ...props }
						colors={
							[
								{
									label: __( 'Background', 'generateblocks' ),
									attribute: 'backgroundColor',
									alpha: true,
								},
								{
									label: __( 'Background Hover', 'generateblocks' ),
									attribute: 'backgroundColorHover',
									alpha: true,
								},
								{
									label: __( 'Text', 'generateblocks' ),
									attribute: 'textColor',
								},
								{
									label: __( 'Text Hover', 'generateblocks' ),
									attribute: 'textColorHover',
								},
								{
									label: __( 'Border', 'generateblocks' ),
									attribute: 'borderColor',
									alpha: true,
								},
								{
									label: __( 'Border Hover', 'generateblocks' ),
									attribute: 'borderColorHover',
									alpha: true,
								},
							]
						}
					/>
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
							<DimensionsControl
								{ ...props }
								device={ deviceType }
								type={ 'iconPadding' }
								label={ __( 'Padding', 'generateblocks' ) }
								units={ [ 'px', 'em', '%' ] }
							/>
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
						<DimensionsControl
							{ ...props }
							device={ deviceType }
							type={ 'iconPadding' }
							label={ __( 'Padding', 'generateblocks' ) }
							units={ [ 'px', 'em', '%' ] }
						/>
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
							<DimensionsControl
								{ ...props }
								device={ deviceType }
								type={ 'iconPadding' }
								label={ __( 'Padding', 'generateblocks' ) }
								units={ [ 'px', 'em', '%' ] }
							/>
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
