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
	Notice,
	Tooltip,
	IconButton,
	Icon,
} = wp.components;

const {
	Fragment,
	Component
} = wp.element;

const {
	InspectorControls,
	InspectorAdvancedControls,
	InnerBlocks,
} = wp.editor;

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
        //this.getColumnsFromLayout = this.getColumnsFromLayout.bind( this );
        //this.getLayoutsSelector = this.getLayoutsSelector.bind( this );
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
        // if ( this.state.selectedLayout ) {
        //     const columnsData = this.getColumnsFromLayout( this.state.selectedLayout );
        //     columns = columnsData.length;
		//
        //     setAttributes( {
        //         columns,
        //     } );
		//
        //     this.setState( {
        //         selectedLayout: false,
        //     } );
        // }
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

		// create columns from selected layout.
		if ( columns < 1 && this.state.selectedLayout ) {
			// const columnsData = this.getColumnsFromLayout( this.state.selectedLayout );
			// columns = columnsData.length;
			//
			// columnsData.forEach( ( colAttrs ) => {
			// 	result.push( [
			// 		'generatepress/grid-column',
			// 		colAttrs,
			// 		appenderExist ? [] : [ [ 'core/paragraph', { content: 'Column ' + ( colAttrs.size === 'auto' ? 'Auto' : colAttrs.size ) } ] ],
			// 	] );
			// } );

		// create columns template from columns count.
		} else {
			for ( let k = 1; k <= columns; k++ ) {
				result.push( [ 'generatepress/grid-column' ] );
			}
		}

		return result;
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
			gap,
		} = attributes;

		const css = `
			.gp-button-wrapper-` + uniqueId + ` {

			}
		`

		return (
			<Fragment>

				<InspectorControls>
					<PanelBody>
						<RangeControl
							label={ __( 'Columns', 'gp-premium' ) }
							value={ columns }
							onChange={ ( value ) => setAttributes( { columns: value } ) }
							min={ 1 }
							max={ 6 }
						/>

						<RangeControl
							label={ __( 'Gap', 'gp-premium' ) }
							value={ gap }
							onChange={ ( value ) => setAttributes( { gap: value } ) }
							min={ 0 }
							max={ 100 }
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
						allowedBlocks={ [ 'generatepress/grid-column' ] }
					/>
				</div>
			</Fragment>
		);
	}
}

export default ( GenerateGridContainer );
