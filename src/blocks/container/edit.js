/**
 * Block: Container
 */

import Element from '../../components/element';
import ColorPicker from '../../components/color-picker';
import UnitPicker from '../../components/unit-picker';
import getIcon from '../../utils/get-icon';
import classnames from 'classnames';
import DimensionsControl from '../../components/dimensions/';
import PanelArea from '../../components/panel-area/';
import TypographyControls from '../../components/typography';
import GradientControl from '../../components/gradient/';
import sanitizeSVG from '../../utils/sanitize-svg';
import ResponsiveTabs from '../../components/responsive-tabs';
import MainCSS from './css/main.js';
import DesktopCSS from './css/desktop.js';
import TabletCSS from './css/tablet.js';
import TabletOnlyCSS from './css/tablet-only.js';
import MobileCSS from './css/mobile.js';

import {
	__,
	sprintf,
} from '@wordpress/i18n';

import {
	RangeControl,
	Button,
	ButtonGroup,
	ToggleControl,
	SelectControl,
	TextControl,
	BaseControl,
	Notice,
	PanelBody,
	PanelRow,
	Tooltip,
	Dropdown,
} from '@wordpress/components';

import {
	Fragment,
	Component,
} from '@wordpress/element';

import {
	InspectorControls,
	InnerBlocks,
	MediaUpload,
	AlignmentToolbar,
	InspectorAdvancedControls,
	BlockControls,
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

/**
 * Regular expression matching invalid anchor characters for replacement.
 *
 * @type {RegExp}
 */
const ANCHOR_REGEX = /[\s#]/g;

const gbContainerIds = [];

class GenerateBlockContainer extends Component {
	constructor() {
		super( ...arguments );

		this.state = {
			selectedDevice: 'Desktop',
		};

		this.getDeviceType = this.getDeviceType.bind( this );
		this.setDeviceType = this.setDeviceType.bind( this );
	}

	componentDidMount() {
		const id = this.props.clientId.substr( 2, 9 ).replace( '-', '' );

		// We don't want to ever regenerate unique IDs if they're a global style.
		const isGlobalStyle = 'undefined' !== typeof this.props.attributes.isGlobalStyle && this.props.attributes.isGlobalStyle;

		if ( ! this.props.attributes.uniqueId ) {
			this.props.setAttributes( {
				uniqueId: id,
			} );

			gbContainerIds.push( id );
		} else if ( gbContainerIds.includes( this.props.attributes.uniqueId ) && ! isGlobalStyle ) {
			this.props.setAttributes( {
				uniqueId: id,
			} );

			gbContainerIds.push( id );
		} else {
			gbContainerIds.push( this.props.attributes.uniqueId );
		}

		const thisBlock = document.getElementById( 'block-' + this.props.clientId );

		if ( thisBlock && 'full' === this.props.attributes.align ) {
			thisBlock.setAttribute( 'data-align', 'full' );
		}

		// This block used to be static. Set it to dynamic by default from now on.
		if ( 'undefined' === typeof this.props.attributes.isDynamic || ! this.props.attributes.isDynamic ) {
			this.props.setAttributes( {
				isDynamic: true,
			} );
		}
	}

	componentDidUpdate() {
		const thisBlock = document.getElementById( 'block-' + this.props.clientId );

		if ( thisBlock ) {
			const alignValue = this.props.attributes.align;
			let currentDataAlign = '';

			if ( thisBlock.getAttribute( 'data-align' ) ) {
				currentDataAlign = thisBlock.getAttribute( 'data-align' );
			}

			if ( alignValue !== currentDataAlign ) {
				if ( ( '' === alignValue || undefined === alignValue ) && '' !== currentDataAlign ) {
					thisBlock.removeAttribute( 'data-align' );
				} else {
					thisBlock.setAttribute( 'data-align', alignValue );
				}
			}
		}
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
			hasChildBlocks,
			clientId,
		} = this.props;

		const {
			uniqueId,
			className,
			anchor,
			tagName,
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
			borderColor,
			borderColorOpacity,
			backgroundColor,
			backgroundColorOpacity,
			textColor,
			linkColor,
			linkColorHover,
			bgImage,
			bgOptions,
			bgImageSize,
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
			alignment,
			alignmentTablet,
			alignmentMobile,
			fontFamily,
			googleFont,
			googleFontVariants,
			fullWidthContent,
			align,
			shapeDividers,
		} = attributes;

		// Attribute defaults added to an object late don't get defaults.
		if ( 'undefined' === typeof attributes.bgOptions.selector ) {
			attributes.bgOptions.selector = 'element';
		}

		if ( 'undefined' === typeof attributes.bgOptions.opacity ) {
			attributes.bgOptions.opacity = 1;
		}

		const tagNames = [
			{ label: 'div', value: 'div' },
			{ label: 'section', value: 'section' },
			{ label: 'header', value: 'header' },
			{ label: 'footer', value: 'footer' },
			{ label: 'aside', value: 'aside' },
		];

		const pageBuilderContainerOption = document.getElementById( '_generate-full-width-content' );
		const changeEvent = new Event( 'change' ); // eslint-disable-line no-undef
		const getRootId = wp.data.select( 'core/block-editor' ).getBlockHierarchyRootClientId( clientId );
		const isRootContainer = getRootId === clientId;

		const fullWidthContentOptions = () => {
			return (
				<Fragment>
					{ generateBlocksInfo.isGeneratePress && isRootContainer && pageBuilderContainerOption &&
						<BaseControl
							id="gblocks-gp-full-width-page"
							label={ __( 'If you want to build a full width page, use the option below to remove the page width, margin and padding.', 'generateblocks' ) }
							className="gblocks-gpress-full-width"
						>
							<ToggleControl
								label={ __( 'Make page full-width', 'generateblocks' ) }
								checked={ fullWidthContent ? true : false }
								onChange={ ( value ) => {
									if ( value ) {
										if ( 'select' === pageBuilderContainerOption.tagName.toLowerCase() ) {
											pageBuilderContainerOption.value = 'true';
											pageBuilderContainerOption.dispatchEvent( changeEvent );
										} else {
											pageBuilderContainerOption.checked = true;
											pageBuilderContainerOption.setAttribute( 'value', 'true' );
											pageBuilderContainerOption.dispatchEvent( changeEvent );
										}

										setAttributes( {
											fullWidthContent: 'true',
											align: '',
										} );
									} else {
										if ( 'select' === pageBuilderContainerOption.tagName.toLowerCase() ) {
											pageBuilderContainerOption.value = '';
											pageBuilderContainerOption.dispatchEvent( changeEvent );
										} else {
											pageBuilderContainerOption.checked = false;
											pageBuilderContainerOption.setAttribute( 'value', '' );
											document.querySelector( 'input[name="_generate-full-width-content"]#default-content' ).checked = true;
											pageBuilderContainerOption.dispatchEvent( changeEvent );
										}

										setAttributes( {
											fullWidthContent: '',
										} );
									}
								} }
							/>
						</BaseControl>
					}
				</Fragment>
			);
		};

		let googleFontsAttr = '';

		if ( googleFontVariants ) {
			googleFontsAttr = ':' + googleFontVariants;
		}

		let parentBlockId = false,
			parentBlock = false,
			hasGridContainer = false,
			gridContainerId = '';

		if ( typeof wp.data.select( 'core/block-editor' ).getBlockParents === 'function' ) {
			parentBlockId = wp.data.select( 'core/block-editor' ).getBlockParents( clientId, true )[ 0 ];

			if ( parentBlockId ) {
				parentBlock = wp.data.select( 'core/block-editor' ).getBlocksByClientId( parentBlockId );

				if ( parentBlock && 'generateblocks/grid' === parentBlock[ 0 ].name ) {
					hasGridContainer = true;
					gridContainerId = parentBlock[ 0 ].attributes.uniqueId;
				}
			}
		}

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

		const allShapes = [];

		Object.keys( generateBlocksInfo.svgShapes ).forEach( ( key ) => {
			const shapes = generateBlocksInfo.svgShapes[ key ].svgs;

			Object.keys( shapes ).forEach( ( name ) => {
				allShapes[ name ] = {
					label: shapes[ name ].label,
					icon: shapes[ name ].icon,
				};
			} );
		} );

		const allShapeDividers = () => {
			return (
				<Fragment>
					{ !! attributes.shapeDividers.length &&
						<div className="gb-shapes">
							{
								attributes.shapeDividers.map( ( location, index ) => {
									const shapeNumber = index + 1;

									return <Fragment key={ index }>
										{ 'undefined' !== typeof allShapes[ shapeDividers[ index ].shape ] &&
											<div
												className={ classnames( {
													'gb-shape': true,
													[ `gb-shape-${ shapeNumber }` ]: true,
												} ) }
												dangerouslySetInnerHTML={ { __html: sanitizeSVG( allShapes[ shapeDividers[ index ].shape ].icon ) } }
											/>
										}
									</Fragment>;
								} )
							}
						</div>
					}
				</Fragment>
			);
		};

		const bgImageSizes = [];

		Object.keys( generateBlocksInfo.imageSizes ).forEach( ( size ) => {
			bgImageSizes.push( {
				label: generateBlocksInfo.imageSizes[ size ],
				value: generateBlocksInfo.imageSizes[ size ],
			} );
		} );

		let htmlAttributes = {
			className: classnames( {
				'gb-container': true,
				[ `gb-container-${ uniqueId }` ]: true,
				[ `${ className }` ]: undefined !== className,
			} ),
			id: anchor ? anchor : null,
		};

		htmlAttributes = applyFilters( 'generateblocks.frontend.htmlAttributes', htmlAttributes, 'generateblocks/container', attributes );

		return (
			<Fragment>
				<BlockControls>
					{ 'Desktop' === this.getDeviceType() && (
						<AlignmentToolbar
							value={ alignment }
							onChange={ ( value ) => {
								setAttributes( { alignment: value } );
							} }
						/>
					) }

					{ 'Tablet' === this.getDeviceType() && (
						<AlignmentToolbar
							value={ alignmentTablet }
							onChange={ ( value ) => {
								setAttributes( { alignmentTablet: value } );
							} }
						/>
					) }

					{ 'Mobile' === this.getDeviceType() && (
						<AlignmentToolbar
							value={ alignmentMobile }
							onChange={ ( value ) => {
								setAttributes( { alignmentMobile: value } );
							} }
						/>
					) }
				</BlockControls>

				<InspectorControls>
					<ResponsiveTabs { ...this.props }
						selectedDevice={ this.getDeviceType() }
						onClick={ ( device ) => {
							this.setDeviceType( device );
						} }
					/>

					{ ! isGrid && (
						<PanelArea { ...this.props }
							title={ __( 'Layout', 'generateblocks' ) }
							initialOpen={ true }
							icon={ getIcon( 'layout' ) }
							className={ 'gblocks-panel-label' }
							id={ 'containerLayout' }
							state={ this.state }
						>
							{ 'Desktop' === this.getDeviceType() &&
								<Fragment>
									{ hasGridContainer &&
										<ToggleControl
											label={ __( 'Grid Item', 'generateblocks' ) }
											help={ __( 'This Container is inside a Grid Block but is not set as a grid item. Enable this option for optimal results.', 'generateblocks' ) }
											checked={ !! isGrid }
											onChange={ ( value ) => {
												setAttributes( {
													isGrid: value,
													gridId: gridContainerId,
												} );
											} }
										/>
									}

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
												label={ __( 'Container Width', 'generateblocks' ) }
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
												placeholder={ generateBlocksDefaults.container.containerWidth }
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
										options={ applyFilters( 'generateblocks.editor.containerTagNames', tagNames, this.props, this.state ) }
										onChange={ ( value ) => {
											setAttributes( {
												tagName: value,
											} );
										} }
									/>

									{ applyFilters( 'generateblocks.editor.controls', '', 'containerAfterElementTag', this.props, this.state ) }

									{ fullWidthContentOptions() }
								</Fragment>
							}

							{ applyFilters( 'generateblocks.editor.controls', '', 'containerLayout', this.props, this.state ) }
						</PanelArea>
					) }

					{ isGrid && (
						<PanelArea { ...this.props }
							title={ __( 'Layout', 'generateblocks' ) }
							initialOpen={ true }
							icon={ getIcon( 'layout' ) }
							className={ 'gblocks-panel-label' }
							id={ 'containerGridLayout' }
							state={ this.state }
						>
							{ ! hasGridContainer &&
								<ToggleControl
									label={ __( 'Grid Item', 'generateblocks' ) }
									help={ __( 'This container is set as a grid item but is not inside a grid block. Deactivate this option for optimal results.', 'generateblocks' ) }
									checked={ !! isGrid }
									onChange={ ( value ) => {
										setAttributes( {
											isGrid: value,
											gridId: '',
										} );
									} }
								/>
							}

							{ 'Desktop' === this.getDeviceType() && (
								<Fragment>
									<UnitPicker
										label={ __( 'Container Width', 'generateblocks' ) }
										value={ '%' }
										units={ [ '%' ] }
										onClick={ () => {
											return false;
										} }
									/>

									<ButtonGroup className={ 'widthButtons' }>
										<Button isPrimary={ width === 25 } onClick={ () => setAttributes( { width: 25 } ) }>25</Button>
										<Button isPrimary={ width === 33.33 } onClick={ () => setAttributes( { width: 33.33 } ) }>33</Button>
										<Button isPrimary={ width === 50 } onClick={ () => setAttributes( { width: 50 } ) }>50</Button>
										<Button isPrimary={ width === 66.66 } onClick={ () => setAttributes( { width: 66.66 } ) }>66</Button>
										<Button isPrimary={ width === 75 } onClick={ () => setAttributes( { width: 75 } ) }>75</Button>
										<Button isPrimary={ width === 100 } onClick={ () => setAttributes( { width: 100 } ) }>100</Button>
									</ButtonGroup>

									<RangeControl
										className={ 'gblocks-column-width-control' }
										value={ width || '' }
										onChange={ ( value ) => {
											setAttributes( {
												width: value,
											} );
										} }
										min={ 0 }
										max={ 100 }
										step={ 0.01 }
										initialPosition={ generateBlocksDefaults.container.width }
									/>

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

									<ToggleControl
										label={ __( 'Remove Vertical Gap', 'generateblocks' ) }
										checked={ !! removeVerticalGap }
										onChange={ ( value ) => {
											setAttributes( {
												removeVerticalGap: value,
											} );
										} }
									/>

									<SelectControl
										label={ __( 'Tag Name', 'generateblocks' ) }
										value={ tagName }
										options={ applyFilters( 'generateblocks.editor.containerTagNames', tagNames, this.props, this.state ) }
										onChange={ ( value ) => {
											setAttributes( {
												tagName: value,
											} );
										} }
									/>

									{ applyFilters( 'generateblocks.editor.controls', '', 'containerAfterElementTag', this.props, this.state ) }
								</Fragment>
							) }

							{ 'Tablet' === this.getDeviceType() && (
								<Fragment>
									<UnitPicker
										label={ __( 'Container Width', 'generateblocks' ) }
										value={ '%' }
										units={ [ '%' ] }
										onClick={ () => {
											return false;
										} }
									/>

									<ButtonGroup className={ 'widthButtons' }>
										<Button isPrimary={ widthTablet === 25 } onClick={ () => setAttributes( { widthTablet: 25 } ) }>25</Button>
										<Button isPrimary={ widthTablet === 33.33 } onClick={ () => setAttributes( { widthTablet: 33.33 } ) }>33</Button>
										<Button isPrimary={ widthTablet === 50 } onClick={ () => setAttributes( { widthTablet: 50 } ) }>50</Button>
										<Button isPrimary={ widthTablet === 66.66 } onClick={ () => setAttributes( { widthTablet: 66.66 } ) }>66</Button>
										<Button isPrimary={ widthTablet === 75 } onClick={ () => setAttributes( { widthTablet: 75 } ) }>75</Button>
										<Button isPrimary={ widthTablet === 100 } onClick={ () => setAttributes( { widthTablet: 100 } ) }>100</Button>
									</ButtonGroup>

									<RangeControl
										className={ 'gblocks-column-width-control' }
										value={ widthTablet || '' }
										onChange={ ( value ) => {
											setAttributes( {
												widthTablet: value,
											} );
										} }
										min={ 0 }
										max={ 100 }
										step={ 0.01 }
										initialPosition={ generateBlocksDefaults.container.widthTablet }
									/>

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

									<ToggleControl
										label={ __( 'Remove Vertical Gap', 'generateblocks' ) }
										checked={ !! removeVerticalGapTablet }
										onChange={ ( value ) => {
											setAttributes( {
												removeVerticalGapTablet: value,
											} );
										} }
									/>

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

							{ 'Mobile' === this.getDeviceType() && (
								<Fragment>
									<UnitPicker
										label={ __( 'Container Width', 'generateblocks' ) }
										value={ '%' }
										units={ [ '%' ] }
										onClick={ () => {
											return false;
										} }
									/>

									<ButtonGroup className={ 'widthButtons' }>
										<Button isPrimary={ widthMobile === 25 } onClick={ () => setAttributes( { widthMobile: 25 } ) }>25</Button>
										<Button isPrimary={ widthMobile === 33.33 } onClick={ () => setAttributes( { widthMobile: 33.33 } ) }>33</Button>
										<Button isPrimary={ widthMobile === 50 } onClick={ () => setAttributes( { widthMobile: 50 } ) }>50</Button>
										<Button isPrimary={ widthMobile === 66.66 } onClick={ () => setAttributes( { widthMobile: 66.66 } ) }>66</Button>
										<Button isPrimary={ widthMobile === 75 } onClick={ () => setAttributes( { widthMobile: 75 } ) }>75</Button>
										<Button isPrimary={ widthMobile === 100 } onClick={ () => setAttributes( { widthMobile: 100 } ) }>100</Button>
									</ButtonGroup>

									<RangeControl
										className={ 'gblocks-column-width-control' }
										value={ widthMobile || '' }
										onChange={ ( value ) => {
											setAttributes( {
												widthMobile: value,
											} );
										} }
										min={ 0 }
										max={ 100 }
										step={ 0.01 }
										initialPosition={ generateBlocksDefaults.container.widthMobile }
									/>

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

									<ToggleControl
										label={ __( 'Remove Vertical Gap', 'generateblocks' ) }
										checked={ !! removeVerticalGapMobile }
										onChange={ ( value ) => {
											setAttributes( {
												removeVerticalGapMobile: value,
											} );
										} }
									/>

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

							{ applyFilters( 'generateblocks.editor.controls', '', 'containerGridLayout', this.props, this.state ) }
						</PanelArea>
					) }

					<PanelArea { ...this.props }
						title={ __( 'Typography', 'generateblocks' ) }
						initialOpen={ false }
						icon={ getIcon( 'typography' ) }
						className={ 'gblocks-panel-label' }
						id={ 'containerTypography' }
						state={ this.state }
					>

						{ 'Desktop' === this.getDeviceType() && (
							<Fragment>
								<TypographyControls { ...this.props }
									showFontFamily={ true }
									showFontWeight={ true }
									showTextTransform={ true }
									showFontSize={ true }
									defaultFontSize={ generateBlocksDefaults.container.fontSize }
									defaultFontSizeUnit={ generateBlocksDefaults.container.fontSizeUnit }
									defaultLineHeight={ generateBlocksDefaults.container.lineHeight }
									defaultLineHeightUnit={ generateBlocksDefaults.container.lineHeightUnit }
									defaultLetterSpacing={ generateBlocksDefaults.container.letterSpacing }
								/>
							</Fragment>
						) }

						{ 'Tablet' === this.getDeviceType() && (
							<Fragment>
								<TypographyControls { ...this.props }
									device={ 'Tablet' }
									showFontSize={ true }
									defaultFontSize={ generateBlocksDefaults.container.fontSizeTablet }
									defaultFontSizeUnit={ generateBlocksDefaults.container.fontSizeUnit }
									defaultLineHeight={ generateBlocksDefaults.container.lineHeightTablet }
									defaultLineHeightUnit={ generateBlocksDefaults.container.lineHeightUnit }
									defaultLetterSpacing={ generateBlocksDefaults.container.letterSpacingTablet }
								/>
							</Fragment>
						) }

						{ 'Mobile' === this.getDeviceType() && (
							<Fragment>
								<TypographyControls { ...this.props }
									device={ 'Mobile' }
									showFontSize={ true }
									defaultFontSize={ generateBlocksDefaults.container.fontSizeMobile }
									defaultFontSizeUnit={ generateBlocksDefaults.container.fontSizeUnit }
									defaultLineHeight={ generateBlocksDefaults.container.lineHeightMobile }
									defaultLineHeightUnit={ generateBlocksDefaults.container.lineHeightUnit }
									defaultLetterSpacing={ generateBlocksDefaults.container.letterSpacingMobile }
								/>
							</Fragment>
						) }

						{ applyFilters( 'generateblocks.editor.controls', '', 'containerTypography', this.props, this.state ) }
					</PanelArea>

					<PanelArea { ...this.props }
						title={ __( 'Spacing', 'generateblocks' ) }
						initialOpen={ false }
						icon={ getIcon( 'spacing' ) }
						className={ 'gblocks-panel-label' }
						id={ 'containerSpacing' }
						state={ this.state }
					>

						{ 'Desktop' === this.getDeviceType() && (
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
									defaults={ generateBlocksDefaults.container }
									units={ [ 'px', 'em', '%' ] }
								/>

								<DimensionsControl { ...this.props }
									device={ this.getDeviceType() }
									type={ 'margin' }
									label={ __( 'Margin', 'generateblocks' ) }
									attrTop={ 'marginTop' }
									attrRight={ 'marginRight' }
									attrBottom={ 'marginBottom' }
									attrLeft={ 'marginLeft' }
									attrUnit={ 'marginUnit' }
									attrSyncUnits={ 'marginSyncUnits' }
									defaults={ generateBlocksDefaults.container }
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
									defaults={ generateBlocksDefaults.container }
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
									defaults={ generateBlocksDefaults.container }
									units={ [ 'px', 'em', '%' ] }
								/>

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

						{ 'Tablet' === this.getDeviceType() && (
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
									value={ minHeightTablet ? minHeightTablet : '' }
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
									defaults={ generateBlocksDefaults.container }
									units={ [ 'px', 'em', '%' ] }
								/>

								<DimensionsControl { ...this.props }
									device={ this.getDeviceType() }
									type={ 'margin' }
									label={ __( 'Margin', 'generateblocks' ) }
									attrTop={ 'marginTopTablet' }
									attrRight={ 'marginRightTablet' }
									attrBottom={ 'marginBottomTablet' }
									attrLeft={ 'marginLeftTablet' }
									attrUnit={ 'marginUnit' }
									attrSyncUnits={ 'marginSyncUnits' }
									defaults={ generateBlocksDefaults.container }
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
									defaults={ generateBlocksDefaults.container }
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
									defaults={ generateBlocksDefaults.container }
									units={ [ 'px', 'em', '%' ] }
								/>
							</Fragment>
						) }

						{ 'Mobile' === this.getDeviceType() && (
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
									value={ minHeightMobile ? minHeightMobile : '' }
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
									defaults={ generateBlocksDefaults.container }
									units={ [ 'px', 'em', '%' ] }
								/>

								<DimensionsControl { ...this.props }
									device={ this.getDeviceType() }
									type={ 'margin' }
									label={ __( 'Margin', 'generateblocks' ) }
									attrTop={ 'marginTopMobile' }
									attrRight={ 'marginRightMobile' }
									attrBottom={ 'marginBottomMobile' }
									attrLeft={ 'marginLeftMobile' }
									attrUnit={ 'marginUnit' }
									attrSyncUnits={ 'marginSyncUnits' }
									defaults={ generateBlocksDefaults.container }
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
									defaults={ generateBlocksDefaults.container }
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
									defaults={ generateBlocksDefaults.container }
									units={ [ 'px', 'em', '%' ] }
								/>
							</Fragment>
						) }

						{ applyFilters( 'generateblocks.editor.controls', '', 'containerSpacing', this.props, this.state ) }
					</PanelArea>

					<PanelArea { ...this.props }
						title={ __( 'Colors', 'generateblocks' ) }
						initialOpen={ false }
						icon={ getIcon( 'colors' ) }
						className={ 'gblocks-panel-label' }
						id={ 'containerColors' }
						state={ this.state }
					>
						{ 'Desktop' === this.getDeviceType() &&
							<Fragment>
								<ColorPicker
									label={ __( 'Background Color', 'generateblocks' ) }
									value={ backgroundColor }
									alpha={ true }
									valueOpacity={ backgroundColorOpacity }
									attrOpacity={ 'backgroundColorOpacity' }
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
									onChange={ ( nextTextColor ) =>
										setAttributes( {
											textColor: nextTextColor,
										} )
									}
								/>

								<ColorPicker
									label={ __( 'Link Color', 'generateblocks' ) }
									value={ linkColor }
									alpha={ false }
									onChange={ ( nextLinkColor ) =>
										setAttributes( {
											linkColor: nextLinkColor,
										} )
									}
								/>

								<ColorPicker
									label={ __( 'Link Color Hover', 'generateblocks' ) }
									value={ linkColorHover }
									alpha={ false }
									onChange={ ( nextLinkColorHover ) =>
										setAttributes( {
											linkColorHover: nextLinkColorHover,
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
							</Fragment>
						}

						{ applyFilters( 'generateblocks.editor.controls', '', 'containerColors', this.props, this.state ) }
					</PanelArea>

					<PanelArea { ...this.props }
						title={ __( 'Backgrounds', 'generateblocks' ) }
						initialOpen={ false }
						icon={ getIcon( 'gradients' ) }
						className={ 'gblocks-panel-label' }
						id={ 'containerBackground' }
						state={ this.state }
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
												let size = generateBlocksDefaults.container.bgImageSize;

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

										{ applyFilters( 'generateblocks.editor.backgroundImageActions', '', this.props, this.state ) }
									</div>
								</div>
							</BaseControl>

							{ !! bgImage && (
								<Fragment>
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
											{ 'undefined' !== typeof bgImage.id && bgImage.id &&
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
												} }
												min={ 0 }
												max={ 1 }
												step={ 0.1 }
												initialPosition={ generateBlocksDefaults.container.bgOptions.opacity }
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

							<GradientControl { ...this.props }
								attrGradient={ 'gradient' }
								attrGradientDirection={ 'gradientDirection' }
								attrGradientColorOne={ 'gradientColorOne' }
								attrGradientColorStopOne={ 'gradientColorStopOne' }
								attrGradientColorTwo={ 'gradientColorTwo' }
								attrGradientColorStopTwo={ 'gradientColorStopTwo' }
								attrGradientColorOneOpacity={ 'gradientColorOneOpacity' }
								attrGradientColorTwoOpacity={ 'gradientColorTwoOpacity' }
								defaultColorOne={ generateBlocksDefaults.container.gradientColorOne }
								defaultColorTwo={ generateBlocksDefaults.container.gradientColorTwo }
							/>

							{ applyFilters( 'generateblocks.editor.controls', '', 'containerBackground', this.props, this.state ) }
						</Fragment>
					</PanelArea>

					<PanelArea { ...this.props }
						title={ __( 'Shapes', 'generateblocks' ) }
						initialOpen={ false }
						icon={ getIcon( 'shapes' ) }
						className={ 'gblocks-panel-label' }
						id={ 'containerShapes' }
						state={ this.state }
						showPanel={ 'Desktop' === this.getDeviceType() || attributes.shapeDividers.length ? true : false }
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
															{ 'Desktop' === this.getDeviceType() &&
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

															{ 'Tablet' === this.getDeviceType() &&
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

															{ 'Mobile' === this.getDeviceType() &&
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

											{ 'Desktop' === this.getDeviceType() &&
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

						{ applyFilters( 'generateblocks.editor.controls', '', 'containerShapeDivider', this.props, this.state ) }
					</PanelArea>

					<PanelArea { ...this.props }
						title={ __( 'Documentation', 'generateblocks' ) }
						initialOpen={ false }
						icon={ getIcon( 'documentation' ) }
						className={ 'gblocks-panel-label' }
						id={ 'containerDocumentation' }
						state={ this.state }
					>
						<p>{ __( 'Need help with this block?', 'generateblocks' ) }</p>
						<a href="https://docs.generateblocks.com/collection/container/" target="_blank" rel="noreferrer noopener">{ __( 'Visit our documentation', 'generateblocks' ) }</a>

						{ applyFilters( 'generateblocks.editor.controls', '', 'containerDocumentation', this.props, this.state ) }
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

				<Element
					tagName={ applyFilters( 'generateblocks.frontend.containerTagName', tagName, attributes ) }
					htmlAttrs={ htmlAttributes }
				>
					{ applyFilters( 'generateblocks.frontend.afterContainerOpen', '', attributes ) }
					<div
						className={ classnames( {
							'gb-inside-container': true,
						} ) }
					>
						{ applyFilters( 'generateblocks.frontend.insideContainer', '', attributes ) }
						<InnerBlocks
							templateLock={ false }
							renderAppender={ ( hasChildBlocks ? undefined : () => <InnerBlocks.ButtonBlockAppender /> ) }
						/>
					</div>

					{ allShapeDividers() }

					{ applyFilters( 'generateblocks.frontend.beforeContainerClose', '', attributes ) }
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
		if ( ! select( 'core/edit-post' ) ) {
			return {
				media: null,
				deviceType: null,
			};
		}

		const {
			__experimentalGetPreviewDeviceType: getPreviewDeviceType,
		} = select( 'core/edit-post' );

		const {
			getMedia,
		} = select( 'core' );

		const {
			getEditedPostAttribute,
		} = select( 'core/editor' );

		const featuredImageId = getEditedPostAttribute( 'featured_media' );

		if ( ! getPreviewDeviceType ) {
			return {
				media: featuredImageId ? getMedia( featuredImageId ) : null,
				deviceType: null,
			};
		}

		return {
			media: featuredImageId ? getMedia( featuredImageId ) : null,
			deviceType: getPreviewDeviceType(),
		};
	} ),
] )( GenerateBlockContainer );
