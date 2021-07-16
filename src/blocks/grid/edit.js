/**
 * Block: Grid
 */

import classnames from 'classnames';
import getIcon from '../../utils/get-icon';
import ResponsiveTabs from '../../components/responsive-tabs';
import UnitPicker from '../../components/unit-picker';
import MainCSS from './css/main.js';
import DesktopCSS from './css/desktop.js';
import TabletCSS from './css/tablet.js';
import TabletOnlyCSS from './css/tablet-only.js';
import MobileCSS from './css/mobile.js';
import PanelArea from '../../components/panel-area/';

import {
	__,
} from '@wordpress/i18n';

import {
	TextControl,
	SelectControl,
	Placeholder,
	Button,
	ToolbarGroup,
	ToolbarButton,
} from '@wordpress/components';

import {
	Fragment,
	Component,
} from '@wordpress/element';

import {
	InspectorControls,
	InnerBlocks,
	BlockControls,
	InspectorAdvancedControls,
} from '@wordpress/block-editor';

import {
	createBlock,
} from '@wordpress/blocks';

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

const gbGridIds = [];

class GenerateBlockGridContainer extends Component {
	constructor() {
		super( ...arguments );

		this.state = {
			selectedLayout: false,
			selectedDevice: 'Desktop',
		};

		this.onLayoutSelect = this.onLayoutSelect.bind( this );
		this.getColumnsFromLayout = this.getColumnsFromLayout.bind( this );
		this.getLayoutsSelector = this.getLayoutsSelector.bind( this );
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

			gbGridIds.push( id );
		} else if ( gbGridIds.includes( this.props.attributes.uniqueId ) && ! isGlobalStyle ) {
			this.props.setAttributes( {
				uniqueId: id,
			} );

			gbGridIds.push( id );
		} else {
			gbGridIds.push( this.props.attributes.uniqueId );
		}

		// This block used to be static. Set it to dynamic by default from now on.
		if ( 'undefined' === typeof this.props.attributes.isDynamic || ! this.props.attributes.isDynamic ) {
			this.props.setAttributes( {
				isDynamic: true,
			} );
		}
	}

	componentDidUpdate() {
		const {
			attributes,
			setAttributes,
			clientId,
		} = this.props;

		let {
			columns,
		} = attributes;

		if ( this.state.selectedLayout ) {
			const columnsData = this.getColumnsFromLayout( this.state.selectedLayout );

			columnsData.forEach( ( colAttrs ) => {
				wp.data.dispatch( 'core/block-editor' ).insertBlocks( createBlock( 'generateblocks/container', colAttrs ), undefined, clientId, false );
			} );

			columns = columnsData.length;

			setAttributes( {
				columns,
			} );

			this.setState( {
				selectedLayout: false,
			} );
		} else {
			const parentBlock = wp.data.select( 'core/block-editor' ).getBlocksByClientId( clientId )[ 0 ];

			if ( parentBlock ) {
				const childBlocks = parentBlock.innerBlocks;
				columns = childBlocks.length;

				setAttributes( {
					columns,
				} );
			}
		}
	}

	/**
	 * Get columns sizes array from layout string
	 *
	 * @param {string} layout - layout data. Example: `3-6-3`
	 *
	 * @return {Array}.
	 */
	getColumnsFromLayout( layout ) {
		const result = [];
		const columnsData = layout.split( '-' );

		let i = 0;
		columnsData.forEach( () => {
			const colAttrs = {
				isGrid: true,
				gridId: this.props.attributes.uniqueId,
				paddingTop: generateBlocksStyling.container.gridItemPaddingTop || '0',
				paddingRight: generateBlocksStyling.container.gridItemPaddingRight || '0',
				paddingBottom: generateBlocksStyling.container.gridItemPaddingBottom || '0',
				paddingLeft: generateBlocksStyling.container.gridItemPaddingLeft || '0',
			};

			colAttrs.width = Number( columnsData[ i ] );
			i++;

			result.push( colAttrs );
		} );

		return result;
	}

	/**
	 * Layouts selector when no columns selected.
	 *
	 * @return {JSX}.
	 */
	getLayoutsSelector() {
		const layouts = [
			'100',
			'50-50',
			'33.33-33.33-33.33',
			'25-25-25-25',

			'25-75',
			'75-25',
			'25-25-50',
			'25-50-25',

			'50-25-25',
			'20-60-20',
			'20-20-20-20-20',
			'16-16-16-16-16-16',
		];

		return (
			<Placeholder
				label={ __( 'Grid', 'generateblocks' ) }
				instructions={ __( 'Select one layout to get started.', 'generateblocks' ) }
				className="gb-select-layout"
			>
				<div className="gb-grid-wrapper-layout-preview">
					{ layouts.map( ( layout ) => {
						const columnsData = this.getColumnsFromLayout( layout );

						return (
							<button
								key={ `layout-${ layout }` }
								className="gb-grid-wrapper-layout-preview-btn"
								onClick={ () => this.onLayoutSelect( layout ) }
							>
								{ columnsData.map( ( colAttrs, i ) => {
									return (
										<div
											key={ `layout-${ layout }-col-${ i }` }
											className={ classnames( 'gb-col', `gb-col-${ colAttrs.width }` ) }
										/>
									);
								} ) }
							</button>
						);
					} ) }
				</div>
			</Placeholder>
		);
	}

	/**
	 * Select predefined layout.
	 *
	 * @param {string} layout layout string.
	 */
	onLayoutSelect( layout ) {
		this.setState( {
			selectedLayout: layout,
		} );
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
			clientId,
		} = this.props;

		const {
			uniqueId,
			className,
			anchor,
			columns,
			horizontalGap,
			verticalGap,
			verticalAlignment,
			horizontalGapTablet,
			verticalGapTablet,
			verticalAlignmentTablet,
			horizontalGapMobile,
			verticalGapMobile,
			verticalAlignmentMobile,
			horizontalAlignment,
			horizontalAlignmentTablet,
			horizontalAlignmentMobile,
		} = attributes;

		const usingGlobalStyle = 'undefined' !== typeof attributes.useGlobalStyle && attributes.useGlobalStyle && 'undefined' !== typeof attributes.globalStyleId && attributes.globalStyleId;
		let horizontalGapValue = horizontalGap || 0 === horizontalGap ? horizontalGap : '';

		if ( usingGlobalStyle ) {
			if ( generateBlocksDefaults.gridContainer.horizontalGap === horizontalGapValue ) {
				horizontalGapValue = '';
			}
		}

		const horizontalGapPlaceholderTablet = horizontalGapValue,
			verticalGapPlaceholderTablet = verticalGap || 0 === verticalGap ? verticalGap : '';

		let horizontalGapPlaceholderMobile = horizontalGapValue,
			verticalGapPlaceholderMobile = verticalGap || 0 === verticalGap ? verticalGap : '';

		if ( horizontalGapTablet ) {
			horizontalGapPlaceholderMobile = horizontalGapTablet;
		}

		if ( verticalGapTablet ) {
			verticalGapPlaceholderMobile = verticalGapTablet;
		}

		let htmlAttributes = {
			className: classnames( {
				'gb-grid-wrapper': true,
				[ `gb-grid-wrapper-${ uniqueId }` ]: true,
				[ `${ className }` ]: undefined !== className,
			} ),
			id: anchor ? anchor : null,
		};

		htmlAttributes = applyFilters( 'generateblocks.frontend.htmlAttributes', htmlAttributes, 'generateblocks/grid', attributes );

		return (
			<Fragment>
				{ ( columns > 0 || this.state.selectedLayout ) &&
					<BlockControls>
						<ToolbarGroup>
							<ToolbarButton
								className="gblocks-block-control-icon gblocks-add-grid-item"
								icon={ getIcon( 'addContainer' ) }
								label={ __( 'Add Grid Item', 'generateblocks' ) }
								onClick={ () => {
									wp.data.dispatch( 'core/block-editor' ).insertBlocks(
										createBlock( 'generateblocks/container', {
											isGrid: true,
											gridId: uniqueId,
											paddingTop: generateBlocksStyling.container.gridItemPaddingTop || '0',
											paddingRight: generateBlocksStyling.container.gridItemPaddingRight || '0',
											paddingBottom: generateBlocksStyling.container.gridItemPaddingBottom || '0',
											paddingLeft: generateBlocksStyling.container.gridItemPaddingLeft || '0',
										} ),
										undefined,
										clientId
									);
								} }
								showTooltip
							/>
						</ToolbarGroup>
					</BlockControls>
				}

				<InspectorControls>
					<ResponsiveTabs { ...this.props }
						selectedDevice={ this.getDeviceType() }
						onClick={ ( device ) => {
							this.setDeviceType( device );
						} }
					/>

					<PanelArea { ...this.props }
						id={ 'gridLayout' }
						state={ this.state }
					>
						{ 'Desktop' === this.getDeviceType() && (
							<Fragment>
								<UnitPicker
									label={ __( 'Horizontal Gap', 'generateblocks' ) }
									value={ 'px' }
									units={ [ 'px' ] }
									onClick={ () => {
										return false;
									} }
								/>

								<div className="components-base-control components-gblocks-typography-control__inputs">
									<TextControl
										type={ 'number' }
										value={ horizontalGapValue }
										min="0"
										onChange={ ( value ) => {
											// No hyphens allowed here.
											value = value.toString().replace( /-/g, '' );

											setAttributes( {
												horizontalGap: value,
											} );
										} }
										onBlur={ () => {
											if ( ! usingGlobalStyle && ! horizontalGap && generateBlocksDefaults.gridContainer.horizontalGap ) {
												// If we have no value and a default exists, set to 0 to prevent default from coming back.
												setAttributes( {
													horizontalGap: 0,
												} );
											} else if ( '' !== horizontalGap ) {
												setAttributes( {
													horizontalGap: parseFloat( horizontalGap ),
												} );
											}
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
												horizontalGap: generateBlocksDefaults.gridContainer.horizontalGap,
											} );
										} }
									>
										{ __( 'Reset', 'generateblocks' ) }
									</Button>
								</div>

								<UnitPicker
									label={ __( 'Vertical Gap', 'generateblocks' ) }
									value={ 'px' }
									units={ [ 'px' ] }
									onClick={ () => {
										return false;
									} }
								/>

								<div className="components-base-control components-gblocks-typography-control__inputs">
									<TextControl
										type={ 'number' }
										value={ verticalGap || 0 === verticalGap ? verticalGap : '' }
										min="0"
										onChange={ ( value ) => {
											// No negative values allowed here.
											value = value.toString().replace( /-/g, '' );

											setAttributes( {
												verticalGap: value,
											} );
										} }
										onBlur={ () => {
											if ( ! usingGlobalStyle && ! verticalGap && generateBlocksDefaults.gridContainer.verticalGap ) {
												// If we have no value and a default exists, set to 0 to prevent default from coming back.
												setAttributes( {
													verticalGap: 0,
												} );
											} else if ( '' !== verticalGap ) {
												setAttributes( {
													verticalGap: parseFloat( verticalGap ),
												} );
											}
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
												verticalGap: generateBlocksDefaults.gridContainer.verticalGap,
											} );
										} }
									>
										{ __( 'Reset', 'generateblocks' ) }
									</Button>
								</div>

								<SelectControl
									label={ __( 'Vertical Alignment', 'generateblocks' ) }
									value={ verticalAlignment }
									help={ __( 'Align grid items. Removes same height columns and overrides grid item content alignment.', 'generateblocks' ) }
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

								<SelectControl
									label={ __( 'Horizontal Alignment', 'generateblocks' ) }
									value={ horizontalAlignment }
									options={ [
										{ label: __( 'Default', 'generateblocks' ), value: '' },
										{ label: __( 'Left', 'generateblocks' ), value: 'flex-start' },
										{ label: __( 'Center', 'generateblocks' ), value: 'center' },
										{ label: __( 'Right', 'generateblocks' ), value: 'flex-end' },
									] }
									onChange={ ( value ) => {
										setAttributes( {
											horizontalAlignment: value,
										} );
									} }
								/>
							</Fragment>
						) }

						{ 'Tablet' === this.getDeviceType() && (
							<Fragment>
								<UnitPicker
									label={ __( 'Horizontal Gap', 'generateblocks' ) }
									value={ 'px' }
									units={ [ 'px' ] }
									onClick={ () => {
										return false;
									} }
								/>

								<div className="components-base-control components-gblocks-typography-control__inputs">
									<TextControl
										type={ 'number' }
										value={ horizontalGapTablet || 0 === horizontalGapTablet ? horizontalGapTablet : '' }
										min="0"
										placeholder={ horizontalGapPlaceholderTablet }
										onChange={ ( value ) => {
											// No negative values allowed here.
											value = value.toString().replace( /-/g, '' );

											setAttributes( {
												horizontalGapTablet: value,
											} );
										} }
										onBlur={ () => {
											if ( ! usingGlobalStyle && ! horizontalGapTablet && generateBlocksDefaults.gridContainer.horizontalGapTablet ) {
												// If we have no value and a default exists, set to 0 to prevent default from coming back.
												setAttributes( {
													horizontalGapTablet: 0,
												} );
											} else if ( '' !== horizontalGapTablet ) {
												setAttributes( {
													horizontalGapTablet: parseFloat( horizontalGapTablet ),
												} );
											}
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
												horizontalGapTablet: generateBlocksDefaults.gridContainer.horizontalGapTablet,
											} );
										} }
									>
										{ __( 'Reset', 'generateblocks' ) }
									</Button>
								</div>

								<UnitPicker
									label={ __( 'Vertical Gap', 'generateblocks' ) }
									value={ 'px' }
									units={ [ 'px' ] }
									onClick={ () => {
										return false;
									} }
								/>

								<div className="components-base-control components-gblocks-typography-control__inputs">
									<TextControl
										type={ 'number' }
										value={ verticalGapTablet || 0 === verticalGapTablet ? verticalGapTablet : '' }
										min="0"
										placeholder={ verticalGapPlaceholderTablet }
										onChange={ ( value ) => {
											// No negative values allowed here.
											value = value.toString().replace( /-/g, '' );

											setAttributes( {
												verticalGapTablet: value,
											} );
										} }
										onBlur={ () => {
											if ( ! usingGlobalStyle && ! verticalGapTablet && generateBlocksDefaults.gridContainer.verticalGapTablet ) {
												// If we have no value and a default exists, set to 0 to prevent default from coming back.
												setAttributes( {
													verticalGapTablet: 0,
												} );
											} else if ( '' !== verticalGapTablet ) {
												setAttributes( {
													verticalGapTablet: parseFloat( verticalGapTablet ),
												} );
											}
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
												verticalGapTablet: generateBlocksDefaults.gridContainer.verticalGapTablet,
											} );
										} }
									>
										{ __( 'Reset', 'generateblocks' ) }
									</Button>
								</div>

								<SelectControl
									label={ __( 'Vertical Alignment', 'generateblocks' ) }
									help={ __( 'Align grid items. Removes same height columns and overrides grid item content alignment.', 'generateblocks' ) }
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

								<SelectControl
									label={ __( 'Horizontal Alignment', 'generateblocks' ) }
									value={ horizontalAlignmentTablet }
									options={ [
										{ label: __( 'Inherit', 'generateblocks' ), value: 'inherit' },
										{ label: __( 'Default', 'generateblocks' ), value: '' },
										{ label: __( 'Left', 'generateblocks' ), value: 'flex-start' },
										{ label: __( 'Center', 'generateblocks' ), value: 'center' },
										{ label: __( 'Right', 'generateblocks' ), value: 'flex-end' },
									] }
									onChange={ ( value ) => {
										setAttributes( {
											horizontalAlignmentTablet: value,
										} );
									} }
								/>
							</Fragment>
						) }

						{ 'Mobile' === this.getDeviceType() && (
							<Fragment>
								<UnitPicker
									label={ __( 'Horizontal Gap', 'generateblocks' ) }
									value={ 'px' }
									units={ [ 'px' ] }
									onClick={ () => {
										return false;
									} }
								/>

								<div className="components-base-control components-gblocks-typography-control__inputs">
									<TextControl
										type={ 'number' }
										value={ horizontalGapMobile || 0 === horizontalGapMobile ? horizontalGapMobile : '' }
										min="0"
										placeholder={ horizontalGapPlaceholderMobile }
										onChange={ ( value ) => {
											// No negative values allowed here.
											value = value.toString().replace( /-/g, '' );

											setAttributes( {
												horizontalGapMobile: value,
											} );
										} }
										onBlur={ () => {
											if ( ! usingGlobalStyle && ! horizontalGapMobile && generateBlocksDefaults.gridContainer.horizontalGapMobile ) {
												// If we have no value and a default exists, set to 0 to prevent default from coming back.
												setAttributes( {
													horizontalGapMobile: 0,
												} );
											} else if ( '' !== horizontalGapMobile ) {
												setAttributes( {
													horizontalGapMobile: parseFloat( horizontalGapMobile ),
												} );
											}
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
												horizontalGapMobile: generateBlocksDefaults.gridContainer.horizontalGapMobile,
											} );
										} }
									>
										{ __( 'Reset', 'generateblocks' ) }
									</Button>
								</div>

								<UnitPicker
									label={ __( 'Vertical Gap', 'generateblocks' ) }
									value={ 'px' }
									units={ [ 'px' ] }
									onClick={ () => {
										return false;
									} }
								/>

								<div className="components-base-control components-gblocks-typography-control__inputs">
									<TextControl
										type={ 'number' }
										value={ verticalGapMobile || 0 === verticalGapMobile ? verticalGapMobile : '' }
										min="0"
										placeholder={ verticalGapPlaceholderMobile }
										onChange={ ( value ) => {
											// No negative values allowed here.
											value = value.toString().replace( /-/g, '' );

											setAttributes( {
												verticalGapMobile: value,
											} );
										} }
										onBlur={ () => {
											if ( ! usingGlobalStyle && ! verticalGapMobile && generateBlocksDefaults.gridContainer.verticalGapMobile ) {
												// If we have no value and a default exists, set to 0 to prevent default from coming back.
												setAttributes( {
													verticalGapMobile: 0,
												} );
											} else if ( '' !== verticalGapMobile ) {
												setAttributes( {
													verticalGapMobile: parseFloat( verticalGapMobile ),
												} );
											}
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
												verticalGapMobile: generateBlocksDefaults.gridContainer.verticalGapMobile,
											} );
										} }
									>
										{ __( 'Reset', 'generateblocks' ) }
									</Button>
								</div>

								<SelectControl
									label={ __( 'Vertical Alignment', 'generateblocks' ) }
									help={ __( 'Align grid items. Removes same height columns and overrides grid item content alignment.', 'generateblocks' ) }
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

								<SelectControl
									label={ __( 'Horizontal Alignment', 'generateblocks' ) }
									value={ horizontalAlignmentMobile }
									options={ [
										{ label: __( 'Inherit', 'generateblocks' ), value: 'inherit' },
										{ label: __( 'Default', 'generateblocks' ), value: '' },
										{ label: __( 'Left', 'generateblocks' ), value: 'flex-start' },
										{ label: __( 'Center', 'generateblocks' ), value: 'center' },
										{ label: __( 'Right', 'generateblocks' ), value: 'flex-end' },
									] }
									onChange={ ( value ) => {
										setAttributes( {
											horizontalAlignmentMobile: value,
										} );
									} }
								/>
							</Fragment>
						) }

						{ applyFilters( 'generateblocks.editor.controls', '', 'gridLayout', this.props, this.state ) }
					</PanelArea>

					<PanelArea { ...this.props }
						title={ __( 'Documentation', 'generateblocks' ) }
						icon={ getIcon( 'documentation' ) }
						initialOpen={ false }
						className={ 'gblocks-panel-label' }
						id={ 'gridDocumentation' }
						state={ this.state }
					>
						<p>{ __( 'Need help with this block?', 'generateblocks' ) }</p>
						<a href="https://docs.generateblocks.com/collection/grid/" target="_blank" rel="noreferrer noopener">{ __( 'Visit our documentation', 'generateblocks' ) }</a>

						{ applyFilters( 'generateblocks.editor.controls', '', 'gridDocumentation', this.props, this.state ) }
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

				<div
					{ ...htmlAttributes }
				>
					{ columns > 0 || this.state.selectedLayout ? (
						<Fragment>
							<InnerBlocks
								allowedBlocks={ [ 'generateblocks/container' ] }
								renderAppender={ false }
							/>
						</Fragment>
					) : this.getLayoutsSelector() }
				</div>
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
] )( GenerateBlockGridContainer );
