import PanelArea from '../../../components/panel-area';
import { SelectControl, ToggleControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { applyFilters } from '@wordpress/hooks';
import getIcon from '../../../utils/get-icon';
import { Fragment, useEffect, useState } from '@wordpress/element';
import TypographyControls from '../../../components/typography';
import DimensionsControl from '../../../components/dimensions';
import DimensionsGroup from '../../../components/dimensions-group';
import ColorGroup from '../../../components/color-group';
import IconPicker from '../../../components/icon-picker';
import { InspectorControls } from '@wordpress/block-editor';
import NumberControl from '../../../components/number-control';

const getFontSizePlaceholder = ( uniqueId, fontSizeUnit ) => {
	if ( 'em' === fontSizeUnit ) {
		return '1';
	}

	if ( '%' === fontSizeUnit ) {
		return '100';
	}

	const headlineId = document.querySelector( `.gb-headline-${ uniqueId }` );

	if ( headlineId ) {
		return parseFloat( window.getComputedStyle( headlineId ).fontSize );
	}

	return '25';
};

export default ( props ) => {
	const {
		uniqueId,
		attributes,
		setAttributes,
		deviceType,
		blockState,
	} = props;

	const {
		element,
		marginTop,
		marginRight,
		marginBottom,
		marginLeft,
		icon,
		iconLocation,
		iconLocationTablet,
		iconLocationMobile,
		iconVerticalAlignment,
		iconVerticalAlignmentTablet,
		iconVerticalAlignmentMobile,
		iconSizeUnit,
		inlineWidth,
		inlineWidthTablet,
		inlineWidthMobile,
		removeText,
		fontSizeUnit,
	} = attributes;

	const [ fontSizePlaceholder, setFontSizePlaceholder ] = useState( '17' );

	useEffect( () => {
		const currentPlaceholder = getFontSizePlaceholder( uniqueId, fontSizeUnit );

		if ( currentPlaceholder !== fontSizePlaceholder ) {
			setFontSizePlaceholder( currentPlaceholder );
		}
	} );

	return (
		<InspectorControls>
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
						<ToggleControl
							label={ __( 'Inline Width', 'generateblocks' ) }
							checked={ !! inlineWidth }
							onChange={ ( value ) => {
								setAttributes( {
									inlineWidth: value,
								} );
							} }
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
								label: __( 'Text', 'generateblocks' ),
								attribute: 'textColor',
							},
							{
								label: __( 'Link', 'generateblocks' ),
								attribute: 'linkColor',
							},
							{
								label: __( 'Link Hover', 'generateblocks' ),
								attribute: 'linkColorHover',
							},
							{
								label: __( 'Border', 'generateblocks' ),
								attribute: 'borderColor',
								alpha: true,
							},
							{
								label: __( 'Icon', 'generateblocks' ),
								attribute: 'iconColor',
								alpha: true,
							},
							{
								label: __( 'Highlight Text', 'generateblocks' ),
								attribute: 'highlightTextColor',
							},
						]
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
							type={ 'iconPadding' }
							label={ __( 'Padding', 'generateblocks' ) }
							units={ [ 'px', 'em', '%' ] }
						/>
					</Fragment>
					}
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
							type={ 'iconPadding' }
							label={ __( 'Padding', 'generateblocks' ) }
							units={ [ 'px', 'em', '%' ] }
						/>
					</Fragment>
					}
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
							type={ 'iconPadding' }
							label={ __( 'Padding', 'generateblocks' ) }
							units={ [ 'px', 'em', '%' ] }
						/>
					</Fragment>
					}
				</Fragment>
				}

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
						presetUnit="em"
						min="1"
						step={ 'em' === iconSizeUnit ? .1 : 1 }
					/>
				}

				{ applyFilters( 'generateblocks.editor.controls', '', 'headlineIcon', props, blockState ) }
			</PanelArea>
		</InspectorControls>
	);
};
