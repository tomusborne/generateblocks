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

class GenerateGridContainer extends Component {
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
		var instanceId = this.props.instanceId + 1;

		if ( ! this.props.attributes.uniqueId ) {
			this.props.setAttributes( {
				uniqueId: instanceId,
			} );
		} else if ( this.props.attributes.uniqueId && this.props.attributes.uniqueId !== instanceId ) {
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
					'generatepress/section',
					colAttrs,
				] );
			} );

		// create columns template from columns count.
		} else {
			for ( let k = 1; k <= columns; k++ ) {
				result.push( [
					'generatepress/section',
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

			colAttrs.width = columnsData[i];
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
                className="gp-select-layout"
            >
                <div className="gp-grid-wrapper-layout-preview">
                    { layouts.map( ( layout ) => {
                        const columnsData = this.getColumnsFromLayout( layout );

                        return (
                            <button
                                key={ `layout-${ layout }` }
                                className="gp-grid-wrapper-layout-preview-btn"
                                onClick={ () => this.onLayoutSelect( layout ) }
                            >
                                { columnsData.map( ( colAttrs, i ) => {
                                    return (
                                        <div
                                            key={ `layout-${ layout }-col-${ i }` }
                                            className={ classnames( 'gp-col', `gp-col-${ colAttrs.width }` ) }
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
		} = attributes;

		const css = `
			.gp-grid-wrapper-` + uniqueId + ` > .editor-inner-blocks > .editor-block-list__layout {
				align-items: ` + verticalAlignment + `;
			}
		`

		return (
			<Fragment>

				<InspectorControls>
					<PanelBody>
						<RangeControl
							label={ __( 'Sections', 'gp-premium' ) }
							value={ columns }
							onChange={ ( value ) => setAttributes( { columns: value } ) }
							min={ 1 }
							max={ 25 }
							initialPosition={ generatepressDefaults.gridContainer.columns }
						/>

						<RangeControl
							label={ __( 'Horizontal Gap', 'gp-premium' ) }
							value={ horizontalGap }
							onChange={ ( value ) => setAttributes( { horizontalGap: value } ) }
							min={ 0 }
							max={ 100 }
							initialPosition={ generatepressDefaults.gridContainer.horizontalGap }
						/>

						<RangeControl
							label={ __( 'Vertical Gap', 'gp-premium' ) }
							value={ verticalGap }
							onChange={ ( value ) => setAttributes( { verticalGap: value } ) }
							min={ 0 }
							max={ 100 }
							initialPosition={ generatepressDefaults.gridContainer.verticalGap }
						/>

						<SelectControl
							label={ __( 'Vertical Alignment', 'gp-premium' ) }
							value={ verticalAlignment }
							options={ [
								{ label: __( 'Default', 'gp-premium' ), value: '' },
								{ label: __( 'Top', 'gp-premium' ), value: 'flex-start' },
								{ label: __( 'Center', 'gp-premium' ), value: 'center' },
								{ label: __( 'Bottom', 'gp-premium' ), value: 'flex-end' },
							] }
							onChange={ ( verticalAlignment ) => { setAttributes( { verticalAlignment } ) } }
						/>
					</PanelBody>
				</InspectorControls>

				<InspectorAdvancedControls>
					<TextControl
						label={ __( 'Element ID', 'gp-premium' ) }
						value={ elementId }
						onChange={ ( elementId ) => {
							elementId = elementId.replace( ELEMENT_ID_REGEX, '-' );
							setAttributes( { elementId } );
						} }
					/>

					<TextControl
						label={ __( 'CSS Classes', 'gp-premium' ) }
						value={ cssClasses }
						onChange={ ( cssClasses ) => { setAttributes( { cssClasses } ) } }
					/>
				</InspectorAdvancedControls>

				<style>{ css }</style>

				<div
					id={ !! elementId ? elementId : undefined }
					className={ classnames( {
						'gp-grid-wrapper': true,
						[`gp-grid-wrapper-${ uniqueId }`]: true,
						[`${ cssClasses }`]: '' !== cssClasses
					} ) }
				>
					{ columns > 0 || this.state.selectedLayout ? (
						<Fragment>
							{ ! isSelected ? (
								<div className="gp-grid-wrapper-button-select">
									<Tooltip text={ __( 'Select Grid', 'gp-premium' ) }>
										<Icon icon="screenoptions" />
									</Tooltip>
								</div>
							) : '' }
							<InnerBlocks
								template={ this.getColumnsTemplate() }
								templateLock="all"
								allowedBlocks={ [ 'generatepress/section' ] }
							/>
						</Fragment>
						) : this.getLayoutsSelector() }
				</div>
			</Fragment>
		);
	}
}

export default ( GenerateGridContainer );
