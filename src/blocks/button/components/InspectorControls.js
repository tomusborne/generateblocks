import PanelArea from '../../../components/panel-area';
import { __ } from '@wordpress/i18n';
import getIcon from '../../../utils/get-icon';
import { Fragment } from '@wordpress/element';
import TypographyControls from '../../../components/typography';
import { applyFilters } from '@wordpress/hooks';
import DimensionsControl from '../../../components/dimensions';
import DimensionsGroup from '../../../components/dimensions-group';
import ColorGroup from '../../../components/color-group';
import GradientControl from '../../../components/gradient';
import IconPicker from '../../../components/icon-picker';
import { InspectorControls } from '@wordpress/block-editor';
import NumberControl from '../../../components/number-control';
import './ConditionalColors';

export default ( props ) => {
	const {
		attributes,
		deviceType,
		state,
		blockDefaults,
		computedStyles,
	} = props;

	const {
		icon,
		removeText,
		iconSizeUnit,
	} = attributes;

	return (
		<InspectorControls>
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
				<TypographyControls
					{ ...props }
					deviceType={ deviceType }
					options={ [ 'fontWeight', 'textTransform', 'fontSize', 'letterSpacing', 'fontFamily' ] }
					computedStyles={ computedStyles }
				/>

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
									group: 'background',
									label: __( 'Background', 'generateblocks' ),
									items: [
										{
											attribute: 'backgroundColor',
											alpha: true,
										},
										{
											tooltip: __( 'Hover', 'generateblocks' ),
											attribute: 'backgroundColorHover',
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
										{
											tooltip: __( 'Hover', 'generateblocks' ),
											attribute: 'textColorHover',
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
										{
											tooltip: __( 'Hover', 'generateblocks' ),
											attribute: 'borderColorHover',
											alpha: true,
										},
									],
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
					</Fragment>
				) }

				{ !! icon &&
					<NumberControl
						{ ...props }
						label={ __( 'Icon Size', 'generateblocks' ) }
						attributeName="iconSize"
						units={ [ 'px', 'em' ] }
						device={ deviceType }
						presets={
							[
								{
									unit: 'em',
									data: [ 0.7, 1, 1.5, 2 ],
								},
							]
						}
						min="1"
						step={ 'em' === iconSizeUnit ? .1 : 1 }
					/>
				}

				{ applyFilters( 'generateblocks.editor.controls', '', 'buttonIcon', props, state ) }
			</PanelArea>
		</InspectorControls>
	);
};
