/**
 * Block: Headline
 */

import classnames from 'classnames';
import ColorPicker from '../../components/color-picker';
import IconPicker from '../../components/icon-picker';
import UnitPicker from '../../components/unit-picker';
import TypographyControls from '../../components/typography';
import DimensionsControl from '../../components/dimensions/';
import ResponsiveTabs from '../../components/responsive-tabs';
import getIcon from '../../utils/get-icon';
import MainCSS from './css/main.js';
import DesktopCSS from './css/desktop.js';
import TabletCSS from './css/tablet.js';
import TabletOnlyCSS from './css/tablet-only.js';
import MobileCSS from './css/mobile.js';
import PanelArea from '../../components/panel-area/';
import Element from '../../components/element';
import './markformat';
import HeadingLevelIcon from './element-icons';
import getAllUniqueIds from '../../utils/get-all-unique-ids';

import {
	__,
	sprintf,
} from '@wordpress/i18n';

import {
	TextControl,
	ToolbarGroup,
	SelectControl,
	ToggleControl,
	Button,
} from '@wordpress/components';

import {
	Fragment,
	Component,
} from '@wordpress/element';

import {
	InspectorControls,
	RichText,
	BlockControls,
	AlignmentToolbar,
	InspectorAdvancedControls,
} from '@wordpress/block-editor';

import {
	applyFilters,
} from '@wordpress/hooks';

import {
	withSelect,
	withDispatch,
} from '@wordpress/data';

import {
	compose,
} from '@wordpress/compose';

import {
	createBlock,
} from '@wordpress/blocks';

/**
 * Regular expression matching invalid anchor characters for replacement.
 *
 * @type {RegExp}
 */
const ANCHOR_REGEX = /[\s#]/g;

class GenerateBlockHeadline extends Component {
	constructor() {
		super( ...arguments );

		this.getFontSizePlaceholder = this.getFontSizePlaceholder.bind( this );
		this.getDeviceType = this.getDeviceType.bind( this );
		this.setDeviceType = this.setDeviceType.bind( this );

		this.state = {
			selectedDevice: 'Desktop',
			fontSizePlaceholder: '17',
		};
	}

	componentDidMount() {
		// Generate a unique ID if none exists or if the same ID exists on this page.
		const allBlocks = wp.data.select( 'core/block-editor' ).getBlocks();
		const uniqueIds = getAllUniqueIds( allBlocks, [], this.props.clientId );

		if ( ! this.props.attributes.uniqueId || uniqueIds.includes( this.props.attributes.uniqueId ) ) {
			this.props.setAttributes( {
				uniqueId: this.props.clientId.substr( 2, 9 ).replace( '-', '' ),
			} );
		}

		const tempFontSizePlaceholder = this.getFontSizePlaceholder();

		if ( tempFontSizePlaceholder !== this.state.fontSizePlaceholder ) {
			this.setState( {
				fontSizePlaceholder: tempFontSizePlaceholder,
			} );
		}

		// hasIcon came late, so let's set it on mount if we have an icon.
		if ( ! this.props.attributes.hasIcon && this.props.attributes.icon ) {
			this.props.setAttributes( {
				hasIcon: true,
			} );
		}
	}

	componentDidUpdate() {
		const tempFontSizePlaceholder = this.getFontSizePlaceholder();

		if ( tempFontSizePlaceholder !== this.state.fontSizePlaceholder ) {
			this.setState( {
				fontSizePlaceholder: tempFontSizePlaceholder,
			} );
		}
	}

	getFontSizePlaceholder() {
		let placeholder = '25';

		if ( 'em' === this.props.attributes.fontSizeUnit ) {
			placeholder = '1';
		} else if ( '%' === this.props.attributes.fontSizeUnit ) {
			placeholder = '100';
		} else {
			const headlineId = document.querySelector( '.gb-headline-' + this.props.attributes.uniqueId );

			if ( headlineId ) {
				placeholder = parseFloat( window.getComputedStyle( headlineId ).fontSize );
			}
		}

		return placeholder;
	}

	getDeviceType() {
		let deviceType = this.props.deviceType ? this.props.deviceType : this.state.selectedDevice;

		if ( ! generateBlocksInfo.syncResponsivePreviews ) {
			deviceType = this.state.selectedDevice;
		}

		return deviceType;
	}

	setDeviceType( deviceType ) {
		if ( generateBlocksInfo.syncResponsivePreviews && this.props.deviceType ) {
			this.props.setDeviceType( deviceType );
			this.setState( { selectedDevice: deviceType } );
		} else {
			this.setState( { selectedDevice: deviceType } );
		}
	}

	render() {
		const {
			attributes,
			setAttributes,
			onReplace,
			clientId,
		} = this.props;

		const {
			fontSizePlaceholder,
		} = this.state;

		const {
			uniqueId,
			anchor,
			className,
			content,
			element,
			alignment,
			alignmentTablet,
			alignmentMobile,
			backgroundColor,
			backgroundColorOpacity,
			textColor,
			linkColor,
			linkColorHover,
			borderColor,
			borderColorOpacity,
			highlightTextColor,
			fontFamily,
			googleFont,
			googleFontVariants,
			marginTop,
			marginRight,
			marginBottom,
			marginLeft,
			icon,
			hasIcon,
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
			ariaLabel,
		} = attributes;

		let googleFontsAttr = '';

		if ( googleFontVariants ) {
			googleFontsAttr = ':' + googleFontVariants;
		}

		let iconSizePlaceholderMobile = '';

		if ( iconSizeTablet || 0 === iconSizeTablet ) {
			iconSizePlaceholderMobile = iconSizeTablet;
		} else if ( iconSize || 0 === iconSize ) {
			iconSizePlaceholderMobile = iconSize;
		} else {
			iconSizePlaceholderMobile = '';
		}

		let htmlAttributes = {
			className: classnames( {
				'gb-headline': true,
				[ `gb-headline-${ uniqueId }` ]: true,
				'gb-headline-text': ! hasIcon,
				[ className ]: undefined !== className,
			} ),
			id: anchor ? anchor : null,
		};

		htmlAttributes = applyFilters( 'generateblocks.frontend.htmlAttributes', htmlAttributes, 'generateblocks/headline', attributes );

		const onSplit = ( value, isOriginal ) => {
			let block;

			if ( isOriginal || value ) {
				block = createBlock( 'generateblocks/headline', {
					...attributes,
					content: value,
				} );
			} else {
				block = createBlock( 'core/paragraph' );
			}

			if ( isOriginal ) {
				block.clientId = clientId;
			}

			return block;
		};

		return (
			<Fragment>
				<BlockControls>
					<ToolbarGroup
						isCollapsed={ true }
						icon={ <HeadingLevelIcon level={ element } /> }
						label={ __( 'Change Headline Element', 'generateblocks' ) }
						controls={ [
							{
								isActive: 'h1' === element,
								icon: (
									<HeadingLevelIcon
										level={ 'h1' }
									/>
								),
								title: sprintf(
									// translators: %s: heading level e.g: "1", "2", "3"
									__( 'Heading %s', 'generateblocks' ),
									'1'
								),
								onClick: () => {
									setAttributes( { element: 'h1' } );
								},
							},
							{
								isActive: 'h2' === element,
								icon: (
									<HeadingLevelIcon
										level={ 'h2' }
									/>
								),
								title: sprintf(
									// translators: %s: heading level e.g: "1", "2", "3"
									__( 'Heading %s', 'generateblocks' ),
									'2'
								),
								onClick: () => {
									setAttributes( { element: 'h2' } );
								},
							},
							{
								isActive: 'h3' === element,
								icon: (
									<HeadingLevelIcon
										level={ 'h3' }
									/>
								),
								title: sprintf(
									// translators: %s: heading level e.g: "1", "2", "3"
									__( 'Heading %s', 'generateblocks' ),
									'3'
								),
								onClick: () => {
									setAttributes( { element: 'h3' } );
								},
							},
							{
								isActive: 'h4' === element,
								icon: (
									<HeadingLevelIcon
										level={ 'h4' }
									/>
								),
								title: sprintf(
									// translators: %s: heading level e.g: "1", "2", "3"
									__( 'Heading %s', 'generateblocks' ),
									'4'
								),
								onClick: () => {
									setAttributes( { element: 'h4' } );
								},
							},
							{
								isActive: 'h5' === element,
								icon: (
									<HeadingLevelIcon
										level={ 'h5' }
									/>
								),
								title: sprintf(
									// translators: %s: heading level e.g: "1", "2", "3"
									__( 'Heading %s', 'generateblocks' ),
									'5'
								),
								onClick: () => {
									setAttributes( { element: 'h5' } );
								},
							},
							{
								isActive: 'h6' === element,
								icon: (
									<HeadingLevelIcon
										level={ 'h6' }
									/>
								),
								title: sprintf(
									// translators: %s: heading level e.g: "1", "2", "3"
									__( 'Heading %s', 'generateblocks' ),
									'6'
								),
								onClick: () => {
									setAttributes( { element: 'h6' } );
								},
							},
							{
								isActive: 'p' === element,
								icon: (
									<HeadingLevelIcon
										level={ 'p' }
									/>
								),
								title: __( 'Paragraph', 'generateblocks' ),
								onClick: () => {
									setAttributes( { element: 'p' } );
								},
							},
							{
								isActive: 'div' === element,
								icon: (
									<HeadingLevelIcon
										level={ 'div' }
									/>
								),
								title: __( 'Div', 'generateblocks' ),
								onClick: () => {
									setAttributes( { element: 'div' } );
								},
							},
						] }
					/>

					{ 'Desktop' === this.getDeviceType() && ! inlineWidth &&
						<AlignmentToolbar
							value={ alignment }
							onChange={ ( value ) => {
								setAttributes( { alignment: value } );
							} }
						/>
					}

					{ 'Tablet' === this.getDeviceType() && ! inlineWidthTablet &&
						<AlignmentToolbar
							value={ alignmentTablet }
							onChange={ ( value ) => {
								setAttributes( { alignmentTablet: value } );
							} }
						/>
					}

					{ 'Mobile' === this.getDeviceType() && ! inlineWidthMobile &&
						<AlignmentToolbar
							value={ alignmentMobile }
							onChange={ ( value ) => {
								setAttributes( { alignmentMobile: value } );
							} }
						/>
					}
				</BlockControls>

				<InspectorControls>
					<ResponsiveTabs { ...this.props }
						selectedDevice={ this.getDeviceType() }
						onClick={ ( device ) => {
							this.setDeviceType( device );
						} }
					/>

					<PanelArea { ...this.props }
						id={ 'headlineElement' }
						state={ this.state }
						showPanel={ 'Desktop' === this.getDeviceType() ? true : false }
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

						{ applyFilters( 'generateblocks.editor.controls', '', 'headlineElement', this.props, this.state ) }
					</PanelArea>

					<PanelArea { ...this.props }
						title={ __( 'Typography', 'generateblocks' ) }
						initialOpen={ false }
						icon={ getIcon( 'typography' ) }
						className={ 'gblocks-panel-label' }
						id={ 'headlineTypography' }
						state={ this.state }
						showPanel={ ! removeText || false }
					>
						{ 'Desktop' === this.getDeviceType() && (
							<Fragment>
								<TypographyControls { ...this.props }
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

						{ 'Tablet' === this.getDeviceType() && (
							<Fragment>
								<TypographyControls { ...this.props }
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

						{ 'Mobile' === this.getDeviceType() && (
							<Fragment>
								<TypographyControls { ...this.props }
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

						{ applyFilters( 'generateblocks.editor.controls', '', 'headlineTypography', this.props, this.state ) }
					</PanelArea>

					<PanelArea { ...this.props }
						title={ __( 'Spacing', 'generateblocks' ) }
						initialOpen={ false }
						icon={ getIcon( 'spacing' ) }
						className={ 'gblocks-panel-label' }
						id={ 'headlineSpacing' }
						state={ this.state }
					>
						{ 'Desktop' === this.getDeviceType() && (
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

								<DimensionsControl { ...this.props }
									device={ this.getDeviceType() }
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

								<DimensionsControl { ...this.props }
									device={ this.getDeviceType() }
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

								<DimensionsControl { ...this.props }
									device={ this.getDeviceType() }
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

								<DimensionsControl { ...this.props }
									device={ this.getDeviceType() }
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

						{ 'Tablet' === this.getDeviceType() && (
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

								<DimensionsControl { ...this.props }
									device={ this.getDeviceType() }
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

								<DimensionsControl { ...this.props }
									device={ this.getDeviceType() }
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

								<DimensionsControl { ...this.props }
									device={ this.getDeviceType() }
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

								<DimensionsControl { ...this.props }
									device={ this.getDeviceType() }
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

						{ 'Mobile' === this.getDeviceType() && (
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

								<DimensionsControl { ...this.props }
									device={ this.getDeviceType() }
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

								<DimensionsControl { ...this.props }
									device={ this.getDeviceType() }
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

								<DimensionsControl { ...this.props }
									device={ this.getDeviceType() }
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

								<DimensionsControl { ...this.props }
									device={ this.getDeviceType() }
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

						{ applyFilters( 'generateblocks.editor.controls', '', 'headlineSpacing', this.props, this.state ) }
					</PanelArea>

					<PanelArea { ...this.props }
						title={ __( 'Colors', 'generateblocks' ) }
						initialOpen={ false }
						icon={ getIcon( 'colors' ) }
						className={ 'gblocks-panel-label' }
						id={ 'headlineColors' }
						state={ this.state }
						showPanel={ 'Desktop' === this.getDeviceType() || false }
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

					<PanelArea { ...this.props }
						title={ __( 'Icon', 'generateblocks' ) }
						initialOpen={ false }
						icon={ getIcon( 'icons' ) }
						className={ 'gblocks-panel-label' }
						id={ 'headlineIcon' }
						state={ this.state }
						showPanel={ 'Desktop' === this.getDeviceType() || !! icon ? true : false }
					>

						{ 'Desktop' === this.getDeviceType() &&
							<IconPicker { ...this.props }
								attrIcon={ 'icon' }
								attrRemoveText={ 'removeText' }
								attrAriaLabel={ 'ariaLabel' }
							/>
						}

						{ 'Desktop' === this.getDeviceType() && !! icon &&
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

										<DimensionsControl { ...this.props }
											device={ this.getDeviceType() }
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

						{ 'Tablet' === this.getDeviceType() && !! icon &&
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

										<DimensionsControl { ...this.props }
											device={ this.getDeviceType() }
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

						{ 'Mobile' === this.getDeviceType() && !! icon &&
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

										<DimensionsControl { ...this.props }
											device={ this.getDeviceType() }
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

						{ applyFilters( 'generateblocks.editor.controls', '', 'headlineIcon', this.props, this.state ) }
					</PanelArea>

					<PanelArea { ...this.props }
						title={ __( 'Documentation', 'generateblocks' ) }
						icon={ getIcon( 'documentation' ) }
						initialOpen={ false }
						className={ 'gblocks-panel-label' }
						id={ 'headlineDocumentation' }
						state={ this.state }
					>
						<p>{ __( 'Need help with this block?', 'generateblocks' ) }</p>
						<a href="https://docs.generateblocks.com/collection/headline/" target="_blank" rel="noreferrer noopener">{ __( 'Visit our documentation', 'generateblocks' ) }</a>

						{ applyFilters( 'generateblocks.editor.controls', '', 'headlineDocumentation', this.props, this.state ) }
					</PanelArea>
				</InspectorControls>

				<InspectorAdvancedControls>
					<TextControl
						label={ __( 'HTML Anchor', 'generateblocks' ) }
						help={ __( 'Anchors lets you link directly to a section on a page.', 'generateblocks' ) }
						value={ anchor || '' }
						onChange={ ( nextValue ) => {
							nextValue = nextValue.replace( ANCHOR_REGEX, '-' );
							setAttributes( {
								anchor: nextValue,
							} );
						} } />
				</InspectorAdvancedControls>

				<MainCSS { ...this.props } />

				{ this.props.deviceType &&
					<Fragment>
						{ 'Desktop' === this.props.deviceType &&
							<DesktopCSS { ...this.props } />
						}

						{ ( 'Tablet' === this.props.deviceType || 'Mobile' === this.props.deviceType ) &&
							<TabletCSS { ...this.props } />
						}

						{ 'Tablet' === this.props.deviceType &&
							<TabletOnlyCSS { ...this.props } />
						}

						{ 'Mobile' === this.props.deviceType &&
							<MobileCSS { ...this.props } />
						}
					</Fragment>
				}

				{ fontFamily && googleFont &&
					<link
						rel="stylesheet"
						href={ 'https://fonts.googleapis.com/css?family=' + fontFamily.replace( / /g, '+' ) + googleFontsAttr }
					/>
				}

				{ applyFilters( 'generateblocks.editor.beforeHeadlineElement', '', this.props ) }

				<Element
					tagName={ element }
					htmlAttrs={ htmlAttributes }
				>
					{ hasIcon &&
						<Fragment>
							<span
								className="gb-icon"
								aria-label={ !! removeText && !! ariaLabel ? ariaLabel : undefined }
								dangerouslySetInnerHTML={ { __html: icon } }
							/>

							{ ! removeText &&
								<span className="gb-headline-text">
									<RichText
										tagName="span"
										value={ content }
										onChange={ ( value ) => setAttributes( { content: value } ) }
										onSplit={ onSplit }
										onReplace={ onReplace }
										placeholder={ __( 'Headline', 'generateblocks' ) }
										allowedFormats={ applyFilters( 'generateblocks.editor.headlineDisableFormatting', false, this.props ) ? [] : null }
									/>
								</span>
							}
						</Fragment>
					}

					{ ! hasIcon && ! removeText &&
						<RichText
							tagName="span"
							value={ content }
							onChange={ ( value ) => setAttributes( { content: value } ) }
							onSplit={ onSplit }
							onReplace={ onReplace }
							placeholder={ __( 'Headline', 'generateblocks' ) }
							allowedFormats={ applyFilters( 'generateblocks.editor.headlineDisableFormatting', false, this.props ) ? [] : null }
						/>
					}
				</Element>
			</Fragment>
		);
	}
}

export default compose( [
	withDispatch( ( dispatch ) => ( {
		setDeviceType( type ) {
			const {
				__experimentalSetPreviewDeviceType: setPreviewDeviceType,
			} = dispatch( 'core/edit-post' ) || false;

			if ( ! setPreviewDeviceType ) {
				return;
			}

			setPreviewDeviceType( type );
		},
	} ) ),
	withSelect( ( select ) => {
		const {
			__experimentalGetPreviewDeviceType: getPreviewDeviceType,
		} = select( 'core/edit-post' ) || false;

		if ( ! getPreviewDeviceType ) {
			return {
				deviceType: null,
			};
		}

		return {
			deviceType: getPreviewDeviceType(),
		};
	} ),
] )( GenerateBlockHeadline );
