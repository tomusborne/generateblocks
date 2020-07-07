/**
 * Block: Grid
 */

import classnames from 'classnames';
import getIcon from '../../utils/get-icon';
import getSelectedDevice from '../../utils/get-selected-device';
import ResponsiveTabs from '../../components/responsive-tabs';
import DesktopCSS from './css/desktop.js';
import PanelArea from '../../components/panel-area/';

const { __ } = wp.i18n;

const {
	TextControl,
	SelectControl,
	Tooltip,
	Placeholder,
	Button,
	Toolbar,
} = wp.components;

const {
	Fragment,
	Component,
} = wp.element;

const {
	InspectorControls,
	InnerBlocks,
	BlockControls,
} = wp.blockEditor;

const {
	createBlock,
} = wp.blocks;

const {
	applyFilters,
} = wp.hooks;

const ELEMENT_ID_REGEX = /[\s#]/g;
const gbGridIds = [];

class GenerateBlockGridContainer extends Component {
	constructor() {
		super( ...arguments );

		this.state = {
			selectedLayout: false,
			selectedDevice: 'desktop',
		};

		this.onLayoutSelect = this.onLayoutSelect.bind( this );
		this.getColumnsFromLayout = this.getColumnsFromLayout.bind( this );
		this.getLayoutsSelector = this.getLayoutsSelector.bind( this );
	}

	componentDidMount() {
		const id = this.props.clientId.substr( 2, 9 ).replace( '-', '' );

		if ( ! this.props.attributes.uniqueId ) {
			this.props.setAttributes( {
				uniqueId: id,
			} );

			gbGridIds.push( id );
		} else if ( gbGridIds.includes( this.props.attributes.uniqueId ) ) {
			this.props.setAttributes( {
				uniqueId: id,
			} );

			gbGridIds.push( id );
		} else {
			gbGridIds.push( this.props.attributes.uniqueId );
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
     * @return {array}.
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
     * @return {jsx}.
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
			'16.66-16.66-16.66-16.66-16.66-16.66',
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
     * @param {String} layout layout string.
     */
	onLayoutSelect( layout ) {
		this.setState( {
			selectedLayout: layout,
		} );
	}

	render() {
		const {
			attributes,
			setAttributes,
			clientId,
		} = this.props;

		const {
			selectedDevice,
		} = this.state;

		const {
			uniqueId,
			elementId,
			cssClasses,
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

		const horizontalGapPlaceholderTablet = horizontalGap || 0 === horizontalGap ? horizontalGap : '',
			verticalGapPlaceholderTablet = verticalGap || 0 === verticalGap ? verticalGap : '';

		let horizontalGapPlaceholderMobile = horizontalGap || 0 === horizontalGap ? horizontalGap : '',
			verticalGapPlaceholderMobile = verticalGap || 0 === verticalGap ? verticalGap : '';

		if ( horizontalGapTablet ) {
			horizontalGapPlaceholderMobile = horizontalGapTablet;
		}

		if ( verticalGapTablet ) {
			verticalGapPlaceholderMobile = verticalGapTablet;
		}

		let htmlAttributes = {
			id: !! elementId ? elementId : undefined,
			className: classnames( {
				'gb-grid-wrapper': true,
				[ `gb-grid-wrapper-${ uniqueId }` ]: true,
				[ `${ cssClasses }` ]: '' !== cssClasses,
			} ),
		};

		htmlAttributes = applyFilters( 'generateblocks.frontend.htmlAttributes', htmlAttributes, 'generateblocks/grid', attributes );

		return (
			<Fragment>
				<BlockControls>
					<Toolbar>
						<Tooltip text={ __( 'Add Grid Item', 'generateblocks' ) }>
							<Button
								className="gblocks-block-control-icon gblocks-add-grid-item"
								icon={ getIcon( 'addContainer' ) }
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
							/>
						</Tooltip>
					</Toolbar>
				</BlockControls>
				<InspectorControls>
					<ResponsiveTabs { ...this.props }
						selectedDevice={ getSelectedDevice( selectedDevice ) }
						onClick={ ( device ) => {
							window.localStorage.setItem( 'generateblocksSelectedDevice', device );

							this.setState( {
								selectedDevice: device,
							} );
						} }
					/>

					<PanelArea { ...this.props }
						id={ 'gridLayout' }
						state={ this.state }
					>
						{ 'desktop' === getSelectedDevice( selectedDevice ) && (
							<Fragment>
								<div className="components-gblocks-control__header">
									<div className="components-gblocks-control__label">
										{ __( 'Horizontal Gap', 'generateblocks' ) }
									</div>

									<div className="components-gblocks-control__units">
										<Tooltip text={ __( 'Pixel Units', 'generateblocks' ) } key={ 'h-gap-unit' }>
											<Button
												key={ 'h-gap-unit' }
												isSmall
												isPrimary={ true }
												aria-label={ __( 'Pixel Units', 'generateblocks' ) }
											>
												px
											</Button>
										</Tooltip>
									</div>
								</div>

								<div className="components-base-control components-gblocks-typography-control__inputs">
									<TextControl
										type={ 'number' }
										value={ horizontalGap || 0 === horizontalGap ? horizontalGap : '' }
										min="0"
										onChange={ ( value ) => {
											// No hyphens allowed here.
											value = value.toString().replace( /-/g, '' );

											setAttributes( {
												horizontalGap: value,
											} );
										} }
										onBlur={ () => {
											if ( ! horizontalGap && generateBlocksDefaults.gridContainer.horizontalGap ) {
												// If we have no value and a default exists, set to 0 to prevent default from coming back.
												setAttributes( {
													horizontalGap: 0,
												} );
											} else {
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

								<div className="components-gblocks-control__header">
									<div className="components-gblocks-control__label">
										{ __( 'Vertical Gap', 'generateblocks' ) }
									</div>

									<div className="components-gblocks-control__units">
										<Tooltip text={ __( 'Pixel Units', 'generateblocks' ) } key={ 'v-gap-unit' }>
											<Button
												key={ 'v-gap-unit' }
												isSmall
												isPrimary={ true }
												aria-label={ __( 'Pixel Units', 'generateblocks' ) }
											>
												px
											</Button>
										</Tooltip>
									</div>
								</div>

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
											if ( ! verticalGap && generateBlocksDefaults.gridContainer.verticalGap ) {
												// If we have no value and a default exists, set to 0 to prevent default from coming back.
												setAttributes( {
													verticalGap: 0,
												} );
											} else {
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

						{ 'tablet' === getSelectedDevice( selectedDevice ) && (
							<Fragment>
								<div className="components-gblocks-control__header">
									<div className="components-gblocks-control__label">
										{ __( 'Horizontal Gap', 'generateblocks' ) }
									</div>

									<div className="components-gblocks-control__units">
										<Tooltip text={ __( 'Pixel Units', 'generateblocks' ) } key={ 'h-gap-tablet-unit' }>
											<Button
												key={ 'h-gap-tablet-unit' }
												isSmall
												isPrimary={ true }
												aria-label={ __( 'Pixel Units', 'generateblocks' ) }
											>
												px
											</Button>
										</Tooltip>
									</div>
								</div>

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
											if ( ! horizontalGapTablet && generateBlocksDefaults.gridContainer.horizontalGapTablet ) {
												// If we have no value and a default exists, set to 0 to prevent default from coming back.
												setAttributes( {
													horizontalGapTablet: 0,
												} );
											} else {
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

								<div className="components-gblocks-control__header">
									<div className="components-gblocks-control__label">
										{ __( 'Vertical Gap', 'generateblocks' ) }
									</div>

									<div className="components-gblocks-control__units">
										<Tooltip text={ __( 'Pixel Units', 'generateblocks' ) } key={ 'v-gap-tablet-unit' }>
											<Button
												key={ 'v-gap-tablet-unit' }
												isSmall
												isPrimary={ true }
												aria-label={ __( 'Pixel Units', 'generateblocks' ) }
											>
												px
											</Button>
										</Tooltip>
									</div>
								</div>

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
											if ( ! verticalGapTablet && generateBlocksDefaults.gridContainer.verticalGapTablet ) {
												// If we have no value and a default exists, set to 0 to prevent default from coming back.
												setAttributes( {
													verticalGapTablet: 0,
												} );
											} else {
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

						{ 'mobile' === getSelectedDevice( selectedDevice ) && (
							<Fragment>
								<div className="components-gblocks-control__header">
									<div className="components-gblocks-control__label">
										{ __( 'Horizontal Gap', 'generateblocks' ) }
									</div>

									<div className="components-gblocks-control__units">
										<Tooltip text={ __( 'Pixel Units', 'generateblocks' ) } key={ 'h-gap-mobile-unit' }>
											<Button
												key={ 'h-gap-mobile-unit' }
												isSmall
												isPrimary={ true }
												aria-label={ __( 'Pixel Units', 'generateblocks' ) }
											>
												px
											</Button>
										</Tooltip>
									</div>
								</div>

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
											if ( ! horizontalGapMobile && generateBlocksDefaults.gridContainer.horizontalGapMobile ) {
												// If we have no value and a default exists, set to 0 to prevent default from coming back.
												setAttributes( {
													horizontalGapMobile: 0,
												} );
											} else {
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

								<div className="components-gblocks-control__header">
									<div className="components-gblocks-control__label">
										{ __( 'Vertical Gap', 'generateblocks' ) }
									</div>

									<div className="components-gblocks-control__units">
										<Tooltip text={ __( 'Pixel Units', 'generateblocks' ) } key={ 'v-gap-mobile-unit' }>
											<Button
												key={ 'v-gap-mobile-unit' }
												isSmall
												isPrimary={ true }
												aria-label={ __( 'Pixel Units', 'generateblocks' ) }
											>
												px
											</Button>
										</Tooltip>
									</div>
								</div>

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
											if ( ! verticalGapMobile && generateBlocksDefaults.gridContainer.verticalGapMobile ) {
												// If we have no value and a default exists, set to 0 to prevent default from coming back.
												setAttributes( {
													verticalGapMobile: 0,
												} );
											} else {
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
						title={ __( 'Advanced', 'generateblocks' ) }
						initialOpen={ false }
						icon={ getIcon( 'advanced' ) }
						className={ 'gblocks-panel-label' }
						id={ 'gridAdvanced' }
						state={ this.state }
						showPanel={ 'desktop' === getSelectedDevice( selectedDevice ) || false }
					>
						<TextControl
							label={ __( 'Element ID', 'generateblocks' ) }
							value={ elementId }
							onChange={ ( value ) => {
								const newElementId = value.replace( ELEMENT_ID_REGEX, '-' );

								setAttributes( {
									elementId: newElementId,
								} );
							} }
						/>

						<TextControl
							label={ __( 'CSS Classes', 'generateblocks' ) }
							value={ cssClasses }
							onChange={ ( value ) => {
								setAttributes( {
									cssClasses: value,
								} );
							} }
						/>

						{ applyFilters( 'generateblocks.editor.controls', '', 'gridAdvanced', this.props, this.state ) }
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

				<DesktopCSS { ...this.props } />

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

export default ( GenerateBlockGridContainer );
