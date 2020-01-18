/**
 * Block: Grid
 */

import classnames from 'classnames';
import getIcon from '../../utils/get-icon';

const { __ } = wp.i18n; // Import __() from wp.i18n
const {
	TextControl,
	PanelBody,
	TabPanel,
	RangeControl,
	SelectControl,
	Notice,
	Tooltip,
	IconButton,
	Icon,
	Placeholder,
	Button,
} = wp.components;

const {
	Fragment,
	Component
} = wp.element;

const {
	InspectorControls,
	InspectorAdvancedControls,
	InnerBlocks,
} = wp.blockEditor;

const {
	createBlock,
} = wp.blocks;

const {
    withSelect,
    withDispatch,
} = wp.data;

const ELEMENT_ID_REGEX = /[\s#]/g;
const gbGridIds = [];

class GenerateBlockGridContainer extends Component {
	constructor() {
        super( ...arguments );

        this.state = {
            selectedLayout: false,
            isTemplatesModalOpen: false,
        };

        this.getColumnsTemplate = this.getColumnsTemplate.bind( this );
        this.onLayoutSelect = this.onLayoutSelect.bind( this );
        this.getColumnsFromLayout = this.getColumnsFromLayout.bind( this );
        this.getLayoutsSelector = this.getLayoutsSelector.bind( this );
    }

	componentDidMount() {
		let id = this.props.clientId.substr( 2, 9 ).replace( '-', '' );

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

        // update columns number
        if ( this.state.selectedLayout ) {
            const columnsData = this.getColumnsFromLayout( this.state.selectedLayout );
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
	 * Returns the layouts configuration for a given number of columns.
	 *
	 * @return {Object[]} Columns layout configuration.
	 */
	getColumnsTemplate() {
		const {
			attributes,
		} = this.props;

		let {
			columns,
		} = attributes;

		const result = [];

		// Appender added in Gutenberg 5.7.0, so we need to add fallback to columns.
		const appenderExist = typeof InnerBlocks.ButtonBlockAppender !== 'undefined';

		const colAttrs = {
			isGrid: true,
			paddingTop: '',
			paddingRight: '',
			paddingBottom: '',
			paddingLeft: '',
		};

		// create columns from selected layout.
		if ( columns < 1 && this.state.selectedLayout ) {
			const columnsData = this.getColumnsFromLayout( this.state.selectedLayout );
			columns = columnsData.length;

			columnsData.forEach( ( colAttrs ) => {
				result.push( [
					'generateblocks/container',
					colAttrs,
				] );
			} );

		// create columns template from columns count.
		} else {
			for ( let k = 1; k <= columns; k++ ) {
				result.push( [
					'generateblocks/container',
					colAttrs
				] );
			}
		}

		return result;
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

		var i = 0;
        columnsData.forEach( ( col ) => {
            const colAttrs = {
                isGrid: true,
				paddingTop: '',
				paddingRight: '',
				paddingBottom: '',
				paddingLeft: '',
            };

			colAttrs.width = Number( columnsData[i] );
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
        let layouts = [
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
			toggleSelection,
			instanceId,
			clientId,
			isSelected,
		} = this.props;

		const {
			count,
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

		const css = `
			.gb-grid-wrapper-` + uniqueId + ` > .block-editor-inner-blocks > .block-editor-block-list__layout {
				align-items: ` + verticalAlignment + `;
				justify-content: ` + horizontalAlignment + `;
				margin-left: -` + ( horizontalGap / 2 ) + `px;
				margin-right: -` + ( horizontalGap / 2 ) + `px;
			}

			.gb-grid-wrapper-` + uniqueId + ` > .block-editor-inner-blocks > .block-editor-block-list__layout > .wp-block {
				padding-left: ` + ( horizontalGap / 2 ) + `px;
				padding-right: ` + ( horizontalGap / 2 ) + `px;
				margin-bottom: ` + verticalGap + `px;
			}
		`

		return (
			<Fragment>

				<InspectorControls>
					<PanelBody>
						<TabPanel className="grid-tab-panel gblocks-control-tabs"
							activeClass="active-tab"
							tabs={ [
								{
									name: 'default',
									title: __( 'Default', 'generateblocks' ),
									className: 'default',
								},
								{
									name: 'tablet',
									title: __( 'Tablet', 'generateblocks' ),
									className: 'tablet',
								},
								{
									name: 'mobile',
									title: __( 'Mobile', 'generateblocks' ),
									className: 'mobile',
								},
							] }>
							{
								( tab ) => {
									return (
										<div>
											{ 'default' === tab.name && (
												<Fragment>
													<div className="components-gblocks-control__header">
														<div className="components-gblocks-control__label">
															{ __( 'Horizontal Gap', 'generateblocks' ) }
														</div>

														<div className="components-gblocks-control__units">
															<Tooltip text={ __( 'Pixel Units' ) } key={ 'h-gap-unit' }>
																<Button
																	key={ 'h-gap-unit' }
																	isSmall
																	isPrimary={ true }
																	/* translators: %s: values associated with CSS syntax, 'Pixel', 'Em', 'Percentage' */
																	aria-label={ __( 'Pixel Units' ) }
																>
																	px
																</Button>
															</Tooltip>
														</div>
													</div>

													<RangeControl
														value={ parseFloat( horizontalGap ) || '' }
														onChange={ ( value ) => setAttributes( {
															horizontalGap: value
														} ) }
														min={ 0 }
														max={ 100 }
														initialPosition={ generateBlocksDefaults.gridContainer.horizontalGap }
													/>

													<div className="components-gblocks-control__header">
														<div className="components-gblocks-control__label">
															{ __( 'Vertical Gap', 'generateblocks' ) }
														</div>

														<div className="components-gblocks-control__units">
															<Tooltip text={ __( 'Pixel Units' ) } key={ 'v-gap-unit' }>
																<Button
																	key={ 'v-gap-unit' }
																	isSmall
																	isPrimary={ true }
																	/* translators: %s: values associated with CSS syntax, 'Pixel', 'Em', 'Percentage' */
																	aria-label={ __( 'Pixel Units' ) }
																>
																	px
																</Button>
															</Tooltip>
														</div>
													</div>

													<RangeControl
														value={ parseFloat( verticalGap ) || '' }
														onChange={ ( value ) => setAttributes( {
															verticalGap: value
														} ) }
														min={ 0 }
														max={ 100 }
														initialPosition={ generateBlocksDefaults.gridContainer.verticalGap }
													/>

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
														onChange={ ( verticalAlignment ) => {
															setAttributes( { verticalAlignment } )
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
														onChange={ ( horizontalAlignment ) => {
															setAttributes( { horizontalAlignment } )
														} }
													/>
												</Fragment>
											) }

											{ 'tablet' === tab.name && (
												<Fragment>
													<div className="components-gblocks-control__header">
														<div className="components-gblocks-control__label">
															{ __( 'Horizontal Gap', 'generateblocks' ) }
														</div>

														<div className="components-gblocks-control__units">
															<Tooltip text={ __( 'Pixel Units' ) } key={ 'h-gap-tablet-unit' }>
																<Button
																	key={ 'h-gap-tablet-unit' }
																	isSmall
																	isPrimary={ true }
																	/* translators: %s: values associated with CSS syntax, 'Pixel', 'Em', 'Percentage' */
																	aria-label={ __( 'Pixel Units' ) }
																>
																	px
																</Button>
															</Tooltip>
														</div>
													</div>

													<RangeControl
														value={ parseFloat( horizontalGapTablet ) || '' }
														onChange={ ( value ) => setAttributes( {
															horizontalGapTablet: value
														} ) }
														min={ 0 }
														max={ 100 }
														initialPosition={ generateBlocksDefaults.gridContainer.horizontalGapTablet }
													/>

													<div className="components-gblocks-control__header">
														<div className="components-gblocks-control__label">
															{ __( 'Vertical Gap', 'generateblocks' ) }
														</div>

														<div className="components-gblocks-control__units">
															<Tooltip text={ __( 'Pixel Units' ) } key={ 'v-gap-tablet-unit' }>
																<Button
																	key={ 'v-gap-tablet-unit' }
																	isSmall
																	isPrimary={ true }
																	/* translators: %s: values associated with CSS syntax, 'Pixel', 'Em', 'Percentage' */
																	aria-label={ __( 'Pixel Units' ) }
																>
																	px
																</Button>
															</Tooltip>
														</div>
													</div>

													<RangeControl
														value={ parseFloat( verticalGapTablet ) || '' }
														onChange={ ( value ) => setAttributes( {
															verticalGapTablet: value
														} ) }
														min={ 0 }
														max={ 100 }
														initialPosition={ generateBlocksDefaults.gridContainer.verticalGapTablet }
													/>

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
														onChange={ ( verticalAlignmentTablet ) => { setAttributes( { verticalAlignmentTablet } ) } }
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
														onChange={ ( horizontalAlignmentTablet ) => { setAttributes( { horizontalAlignmentTablet } ) } }
													/>
												</Fragment>
											) }

											{ 'mobile' === tab.name && (
												<Fragment>
													<div className="components-gblocks-control__header">
														<div className="components-gblocks-control__label">
															{ __( 'Horizontal Gap', 'generateblocks' ) }
														</div>

														<div className="components-gblocks-control__units">
															<Tooltip text={ __( 'Pixel Units' ) } key={ 'h-gap-mobile-unit' }>
																<Button
																	key={ 'h-gap-mobile-unit' }
																	isSmall
																	isPrimary={ true }
																	/* translators: %s: values associated with CSS syntax, 'Pixel', 'Em', 'Percentage' */
																	aria-label={ __( 'Pixel Units' ) }
																>
																	px
																</Button>
															</Tooltip>
														</div>
													</div>

													<RangeControl
														value={ parseFloat( horizontalGapMobile ) || '' }
														onChange={ ( value ) => setAttributes( {
															horizontalGapMobile: value
														} ) }
														min={ 0 }
														max={ 100 }
														initialPosition={ generateBlocksDefaults.gridContainer.horizontalGapMobile }
													/>

													<div className="components-gblocks-control__header">
														<div className="components-gblocks-control__label">
															{ __( 'Vertical Gap', 'generateblocks' ) }
														</div>

														<div className="components-gblocks-control__units">
															<Tooltip text={ __( 'Pixel Units' ) } key={ 'v-gap-mobile-unit' }>
																<Button
																	key={ 'v-gap-mobile-unit' }
																	isSmall
																	isPrimary={ true }
																	/* translators: %s: values associated with CSS syntax, 'Pixel', 'Em', 'Percentage' */
																	aria-label={ __( 'Pixel Units' ) }
																>
																	px
																</Button>
															</Tooltip>
														</div>
													</div>

													<RangeControl
														value={ parseFloat( verticalGapMobile ) || '' }
														onChange={ ( value ) => setAttributes( {
															verticalGapMobile: value
														} ) }
														min={ 0 }
														max={ 100 }
														initialPosition={ generateBlocksDefaults.gridContainer.verticalGapMobile }
													/>

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
														onChange={ ( verticalAlignmentMobile ) => {
															setAttributes( { verticalAlignmentMobile } )
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
														onChange={ ( horizontalAlignmentMobile ) => {
															setAttributes( { horizontalAlignmentMobile } )
														} }
													/>
												</Fragment>
											) }
										</div>
									);
								}
							}
						</TabPanel>
					</PanelBody>

					<PanelBody
						title={ __( 'Advanced', 'generateblocks' ) }
						initialOpen={ false }
						icon={ getIcon( 'advanced' ) }
						className={ 'gblocks-panel-label' }
					>
						<TextControl
							label={ __( 'Element ID', 'generateblocks' ) }
							value={ elementId }
							onChange={ ( elementId ) => {
								elementId = elementId.replace( ELEMENT_ID_REGEX, '-' );
								setAttributes( { elementId } );
							} }
						/>

						<TextControl
							label={ __( 'CSS Classes', 'generateblocks' ) }
							value={ cssClasses }
							onChange={ ( cssClasses ) => { setAttributes( { cssClasses } ) } }
						/>
					</PanelBody>
				</InspectorControls>

				<style>{ css }</style>

				<div
					id={ !! elementId ? elementId : undefined }
					className={ classnames( {
						'gb-grid-wrapper': true,
						[`gb-grid-wrapper-${ uniqueId }`]: true,
						[`${ cssClasses }`]: '' !== cssClasses
					} ) }
				>
					{ columns > 0 || this.state.selectedLayout ? (
						<Fragment>
							<InnerBlocks
								template={ this.getColumnsTemplate() }
								allowedBlocks={ [ 'generateblocks/container' ] }
								renderAppender={ false }
							/>

							<div className="block-list-appender gb-grid-appender">
								<Tooltip text={ __( 'Add Container', 'generateblocks' ) }>
			                        <IconButton
			                            icon={ getIcon( 'addContainer' ) }
			                            onClick={ () => {
											wp.data.dispatch( 'core/block-editor' ).insertBlocks(
												wp.blocks.createBlock( 'generateblocks/container', {
												    isGrid: true,
													paddingTop: '',
													paddingRight: '',
													paddingBottom: '',
													paddingLeft: '',
												} ),
												undefined,
												clientId
											);
			                            } }
			                        />
			                    </Tooltip>
							</div>
						</Fragment>
						) : this.getLayoutsSelector() }
				</div>
			</Fragment>
		);
	}
}

export default ( GenerateBlockGridContainer );
