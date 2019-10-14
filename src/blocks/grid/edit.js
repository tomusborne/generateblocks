/**
 * Block: Grid
 */

import classnames from 'classnames';

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
const fbGridIds = [];

class FlexBlockGridContainer extends Component {
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

			fbGridIds.push( id );
		} else if ( fbGridIds.includes( this.props.attributes.uniqueId ) ) {
			this.props.setAttributes( {
				uniqueId: id,
			} );

			fbGridIds.push( id );
		} else {
			fbGridIds.push( this.props.attributes.uniqueId );
		}
	}

    componentDidUpdate() {
        const {
            attributes,
            setAttributes,
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
					'flexblocks/container',
					colAttrs,
				] );
			} );

		// create columns template from columns count.
		} else {
			for ( let k = 1; k <= columns; k++ ) {
				result.push( [
					'flexblocks/container',
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
                label={ __( 'Grid' ) }
                instructions={ __( 'Select one layout to get started.' ) }
                className="fx-select-layout"
            >
                <div className="fx-grid-wrapper-layout-preview">
                    { layouts.map( ( layout ) => {
                        const columnsData = this.getColumnsFromLayout( layout );

                        return (
                            <button
                                key={ `layout-${ layout }` }
                                className="fx-grid-wrapper-layout-preview-btn"
                                onClick={ () => this.onLayoutSelect( layout ) }
                            >
                                { columnsData.map( ( colAttrs, i ) => {
                                    return (
                                        <div
                                            key={ `layout-${ layout }-col-${ i }` }
                                            className={ classnames( 'fx-col', `fx-col-${ colAttrs.width }` ) }
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
			.fx-grid-wrapper-` + uniqueId + ` > .editor-inner-blocks > .editor-block-list__layout {
				align-items: ` + verticalAlignment + `;
				justify-content: ` + horizontalAlignment + `;
			}
		`

		return (
			<Fragment>

				<InspectorControls>
					<PanelBody>
						<TextControl
							type="number"
							label={ __( 'Grid Items', 'flexblocks' ) }
							value={ columns ? columns : '' }
							onChange={ ( value ) => setAttributes( {
								columns: parseInt( value )
							} ) }
							min={ 1 }
						/>

						<TabPanel className="grid-tab-panel flexblocks-control-tabs"
							activeClass="active-tab"
							tabs={ [
								{
									name: 'default',
									title: __( 'Default', 'flexblocks' ),
									className: 'default',
								},
								{
									name: 'tablet',
									title: __( 'Tablet', 'flexblocks' ),
									className: 'tablet',
								},
								{
									name: 'mobile',
									title: __( 'Mobile', 'flexblocks' ),
									className: 'mobile',
								},
							] }>
							{
								( tab ) => {
									return (
										<div>
											{ 'default' === tab.name && (
												<Fragment>
													<RangeControl
														label={ __( 'Horizontal Gap', 'flexblocks' ) }
														value={ horizontalGap ? horizontalGap : '' }
														onChange={ ( value ) => setAttributes( {
															horizontalGap: parseFloat( value )
														} ) }
														min={ 0 }
														max={ 100 }
														initialPosition={ flexBlocksDefaults.gridContainer.horizontalGap }
													/>

													<RangeControl
														label={ __( 'Vertical Gap', 'flexblocks' ) }
														value={ verticalGap ? verticalGap : '' }
														onChange={ ( value ) => setAttributes( {
															verticalGap: parseFloat( value )
														} ) }
														min={ 0 }
														max={ 100 }
														initialPosition={ flexBlocksDefaults.gridContainer.verticalGap }
													/>

													<SelectControl
														label={ __( 'Vertical Alignment', 'flexblocks' ) }
														value={ verticalAlignment }
														help={ __( 'Align grid items. Removes same height columns and overrides grid item content alignment.', 'flexblocks' ) }
														options={ [
															{ label: __( 'Default', 'flexblocks' ), value: '' },
															{ label: __( 'Top', 'flexblocks' ), value: 'flex-start' },
															{ label: __( 'Center', 'flexblocks' ), value: 'center' },
															{ label: __( 'Bottom', 'flexblocks' ), value: 'flex-end' },
														] }
														onChange={ ( verticalAlignment ) => {
															setAttributes( { verticalAlignment } )
														} }
													/>

													<SelectControl
														label={ __( 'Horizontal Alignment', 'flexblocks' ) }
														value={ horizontalAlignment }
														options={ [
															{ label: __( 'Default', 'flexblocks' ), value: '' },
															{ label: __( 'Left', 'flexblocks' ), value: 'flex-start' },
															{ label: __( 'Center', 'flexblocks' ), value: 'center' },
															{ label: __( 'Right', 'flexblocks' ), value: 'flex-end' },
														] }
														onChange={ ( horizontalAlignment ) => {
															setAttributes( { horizontalAlignment } )
														} }
													/>
												</Fragment>
											) }

											{ 'tablet' === tab.name && (
												<Fragment>
													<RangeControl
														label={ __( 'Horizontal Gap', 'flexblocks' ) }
														value={ horizontalGapTablet ? horizontalGapTablet : '' }
														onChange={ ( value ) => setAttributes( {
															horizontalGapTablet: parseFloat( value )
														} ) }
														min={ 0 }
														max={ 100 }
														initialPosition={ flexBlocksDefaults.gridContainer.horizontalGapTablet }
													/>

													<RangeControl
														label={ __( 'Vertical Gap', 'flexblocks' ) }
														value={ verticalGapTablet ? verticalGapTablet : '' }
														onChange={ ( value ) => setAttributes( {
															verticalGapTablet: parseFloat( value )
														} ) }
														min={ 0 }
														max={ 100 }
														initialPosition={ flexBlocksDefaults.gridContainer.verticalGapTablet }
													/>

													<SelectControl
														label={ __( 'Vertical Alignment', 'flexblocks' ) }
														help={ __( 'Align grid items. Removes same height columns and overrides grid item content alignment.', 'flexblocks' ) }
														value={ verticalAlignmentTablet }
														options={ [
															{ label: __( 'Inherit', 'flexblocks' ), value: 'inherit' },
															{ label: __( 'Default', 'flexblocks' ), value: '' },
															{ label: __( 'Top', 'flexblocks' ), value: 'flex-start' },
															{ label: __( 'Center', 'flexblocks' ), value: 'center' },
															{ label: __( 'Bottom', 'flexblocks' ), value: 'flex-end' },
														] }
														onChange={ ( verticalAlignmentTablet ) => { setAttributes( { verticalAlignmentTablet } ) } }
													/>

													<SelectControl
														label={ __( 'Horizontal Alignment', 'flexblocks' ) }
														value={ horizontalAlignmentTablet }
														options={ [
															{ label: __( 'Inherit', 'flexblocks' ), value: 'inherit' },
															{ label: __( 'Default', 'flexblocks' ), value: '' },
															{ label: __( 'Left', 'flexblocks' ), value: 'flex-start' },
															{ label: __( 'Center', 'flexblocks' ), value: 'center' },
															{ label: __( 'Right', 'flexblocks' ), value: 'flex-end' },
														] }
														onChange={ ( horizontalAlignmentTablet ) => { setAttributes( { horizontalAlignmentTablet } ) } }
													/>
												</Fragment>
											) }

											{ 'mobile' === tab.name && (
												<Fragment>
													<RangeControl
														label={ __( 'Horizontal Gap', 'flexblocks' ) }
														value={ horizontalGapMobile ? horizontalGapMobile : '' }
														onChange={ ( value ) => setAttributes( {
															horizontalGapMobile: parseFloat( value )
														} ) }
														min={ 0 }
														max={ 100 }
														initialPosition={ flexBlocksDefaults.gridContainer.horizontalGapMobile }
													/>

													<RangeControl
														label={ __( 'Vertical Gap', 'flexblocks' ) }
														value={ verticalGapMobile ? verticalGapMobile : '' }
														onChange={ ( value ) => setAttributes( {
															verticalGapMobile: parseFloat( value )
														} ) }
														min={ 0 }
														max={ 100 }
														initialPosition={ flexBlocksDefaults.gridContainer.verticalGapMobile }
													/>

													<SelectControl
														label={ __( 'Vertical Alignment', 'flexblocks' ) }
														help={ __( 'Align grid items. Removes same height columns and overrides grid item content alignment.', 'flexblocks' ) }
														value={ verticalAlignmentMobile }
														options={ [
															{ label: __( 'Inherit', 'flexblocks' ), value: 'inherit' },
															{ label: __( 'Default', 'flexblocks' ), value: '' },
															{ label: __( 'Top', 'flexblocks' ), value: 'flex-start' },
															{ label: __( 'Center', 'flexblocks' ), value: 'center' },
															{ label: __( 'Bottom', 'flexblocks' ), value: 'flex-end' },
														] }
														onChange={ ( verticalAlignmentMobile ) => {
															setAttributes( { verticalAlignmentMobile } )
														} }
													/>

													<SelectControl
														label={ __( 'Horizontal Alignment', 'flexblocks' ) }
														value={ horizontalAlignmentMobile }
														options={ [
															{ label: __( 'Inherit', 'flexblocks' ), value: 'inherit' },
															{ label: __( 'Default', 'flexblocks' ), value: '' },
															{ label: __( 'Left', 'flexblocks' ), value: 'flex-start' },
															{ label: __( 'Center', 'flexblocks' ), value: 'center' },
															{ label: __( 'Right', 'flexblocks' ), value: 'flex-end' },
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
				</InspectorControls>

				<InspectorAdvancedControls>
					<TextControl
						label={ __( 'Element ID', 'flexblocks' ) }
						value={ elementId }
						onChange={ ( elementId ) => {
							elementId = elementId.replace( ELEMENT_ID_REGEX, '-' );
							setAttributes( { elementId } );
						} }
					/>

					<TextControl
						label={ __( 'CSS Classes', 'flexblocks' ) }
						value={ cssClasses }
						onChange={ ( cssClasses ) => { setAttributes( { cssClasses } ) } }
					/>
				</InspectorAdvancedControls>

				<style>{ css }</style>

				<div
					id={ !! elementId ? elementId : undefined }
					className={ classnames( {
						'fx-grid-wrapper': true,
						[`fx-grid-wrapper-${ uniqueId }`]: true,
						[`${ cssClasses }`]: '' !== cssClasses
					} ) }
				>
					{ columns > 0 || this.state.selectedLayout ? (
						<Fragment>
							<InnerBlocks
								template={ this.getColumnsTemplate() }
								templateLock="all"
								allowedBlocks={ [ 'flexblocks/container' ] }
							/>
						</Fragment>
						) : this.getLayoutsSelector() }
				</div>
			</Fragment>
		);
	}
}

export default ( FlexBlockGridContainer );
