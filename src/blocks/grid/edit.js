/**
 * Block: Buttons
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
		if ( ! this.props.attributes.uniqueId ) {
			var instanceId = this.props.instanceId + 1;

			this.props.setAttributes( {
				uniqueId: instanceId,
			} );
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
			tagName: 'div',
		};

		// create columns from selected layout.
		if ( columns < 1 && this.state.selectedLayout ) {
			const columnsData = this.getColumnsFromLayout( this.state.selectedLayout );
			columns = columnsData.length;

			columnsData.forEach( ( colAttrs ) => {
				result.push( [
					'flex-blocks/section',
					colAttrs,
				] );
			} );

		// create columns template from columns count.
		} else {
			for ( let k = 1; k <= columns; k++ ) {
				result.push( [
					'flex-blocks/section',
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
				tagName: 'div',
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
		} = attributes;

		const css = `
			.fx-grid-wrapper-` + uniqueId + ` > .editor-inner-blocks > .editor-block-list__layout {
				align-items: ` + verticalAlignment + `;
			}
		`

		return (
			<Fragment>

				<InspectorControls>
					<PanelBody>
						<RangeControl
							label={ __( 'Sections', 'flex-blocks' ) }
							value={ columns }
							onChange={ ( value ) => setAttributes( { columns: value } ) }
							min={ 1 }
							max={ 25 }
							initialPosition={ flexBlocksDefaults.gridContainer.columns }
						/>

						<TabPanel className="grid-tab-panel flex-blocks-control-tabs"
							activeClass="active-tab"
							tabs={ [
								{
									name: 'grid-default',
									title: __( 'Default', 'flex-blocks' ),
									className: 'grid-default',
								},
								{
									name: 'grid-tablet',
									title: __( 'Tablet', 'flex-blocks' ),
									className: 'grid-tablet',
								},
								{
									name: 'grid-mobile',
									title: __( 'Mobile', 'flex-blocks' ),
									className: 'grid-mobile',
								},
							] }>
							{
								( tab ) => {
									return (
										<div>
											{ 'grid-default' === tab.name ? (
												<Fragment>
													<RangeControl
														label={ __( 'Horizontal Gap', 'flex-blocks' ) }
														value={ horizontalGap }
														onChange={ ( value ) => setAttributes( { horizontalGap: value } ) }
														min={ 0 }
														max={ 100 }
														initialPosition={ flexBlocksDefaults.gridContainer.horizontalGap }
													/>

													<RangeControl
														label={ __( 'Vertical Gap', 'flex-blocks' ) }
														value={ verticalGap }
														onChange={ ( value ) => setAttributes( { verticalGap: value } ) }
														min={ 0 }
														max={ 100 }
														initialPosition={ flexBlocksDefaults.gridContainer.verticalGap }
													/>

													<SelectControl
														label={ __( 'Vertical Alignment', 'flex-blocks' ) }
														value={ verticalAlignment }
														options={ [
															{ label: __( 'Default', 'flex-blocks' ), value: '' },
															{ label: __( 'Top', 'flex-blocks' ), value: 'flex-start' },
															{ label: __( 'Center', 'flex-blocks' ), value: 'center' },
															{ label: __( 'Bottom', 'flex-blocks' ), value: 'flex-end' },
														] }
														onChange={ ( verticalAlignment ) => { setAttributes( { verticalAlignment } ) } }
													/>
												</Fragment>
											) : '' }

											{ 'grid-tablet' === tab.name ? (
												<Fragment>
													<RangeControl
														label={ __( 'Horizontal Gap', 'flex-blocks' ) }
														value={ horizontalGapTablet }
														onChange={ ( value ) => setAttributes( { horizontalGapTablet: value } ) }
														min={ 0 }
														max={ 100 }
														initialPosition={ flexBlocksDefaults.gridContainer.horizontalGapTablet }
													/>

													<RangeControl
														label={ __( 'Vertical Gap', 'flex-blocks' ) }
														value={ verticalGapTablet }
														onChange={ ( value ) => setAttributes( { verticalGapTablet: value } ) }
														min={ 0 }
														max={ 100 }
														initialPosition={ flexBlocksDefaults.gridContainer.verticalGapTablet }
													/>

													<SelectControl
														label={ __( 'Vertical Alignment', 'flex-blocks' ) }
														value={ verticalAlignmentTablet }
														options={ [
															{ label: __( 'Inherit', 'flex-blocks' ), value: 'inherit' },
															{ label: __( 'Default', 'flex-blocks' ), value: '' },
															{ label: __( 'Top', 'flex-blocks' ), value: 'flex-start' },
															{ label: __( 'Center', 'flex-blocks' ), value: 'center' },
															{ label: __( 'Bottom', 'flex-blocks' ), value: 'flex-end' },
														] }
														onChange={ ( verticalAlignmentTablet ) => { setAttributes( { verticalAlignmentTablet } ) } }
													/>
												</Fragment>
											) : '' }

											{ 'grid-mobile' === tab.name ? (
												<Fragment>
													<RangeControl
														label={ __( 'Horizontal Gap', 'flex-blocks' ) }
														value={ horizontalGapMobile }
														onChange={ ( value ) => setAttributes( { horizontalGapMobile: value } ) }
														min={ 0 }
														max={ 100 }
														initialPosition={ flexBlocksDefaults.gridContainer.horizontalGapMobile }
													/>

													<RangeControl
														label={ __( 'Vertical Gap', 'flex-blocks' ) }
														value={ verticalGapMobile }
														onChange={ ( value ) => setAttributes( { verticalGapMobile: value } ) }
														min={ 0 }
														max={ 100 }
														initialPosition={ flexBlocksDefaults.gridContainer.verticalGapMobile }
													/>

													<SelectControl
														label={ __( 'Vertical Alignment', 'flex-blocks' ) }
														value={ verticalAlignmentMobile }
														options={ [
															{ label: __( 'Inherit', 'flex-blocks' ), value: 'inherit' },
															{ label: __( 'Default', 'flex-blocks' ), value: '' },
															{ label: __( 'Top', 'flex-blocks' ), value: 'flex-start' },
															{ label: __( 'Center', 'flex-blocks' ), value: 'center' },
															{ label: __( 'Bottom', 'flex-blocks' ), value: 'flex-end' },
														] }
														onChange={ ( verticalAlignmentMobile ) => { setAttributes( { verticalAlignmentMobile } ) } }
													/>
												</Fragment>
											) : '' }
										</div>
									);
								}
							}
						</TabPanel>
					</PanelBody>
				</InspectorControls>

				<InspectorAdvancedControls>
					<TextControl
						label={ __( 'Element ID', 'flex-blocks' ) }
						value={ elementId }
						onChange={ ( elementId ) => {
							elementId = elementId.replace( ELEMENT_ID_REGEX, '-' );
							setAttributes( { elementId } );
						} }
					/>

					<TextControl
						label={ __( 'CSS Classes', 'flex-blocks' ) }
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
								allowedBlocks={ [ 'flex-blocks/section' ] }
							/>
						</Fragment>
						) : this.getLayoutsSelector() }
				</div>
			</Fragment>
		);
	}
}

export default ( FlexBlockGridContainer );
