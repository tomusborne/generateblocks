// External Dependencies.
import classnames from 'classnames';
import getColClass from './get-col-class';

const { __, sprintf } = wp.i18n;
const { Component, Fragment } = wp.element;
const { createHigherOrderComponent } = wp.compose;
const { addFilter } = wp.hooks;
const {
    BaseControl,
    PanelBody,
    SelectControl,
    ToggleControl,
    TextControl,
    Tooltip,
    Toolbar,
} = wp.components;

const {
    applyFilters,
} = wp.hooks;

const {
    InspectorControls,
    InnerBlocks,
} = wp.editor;

const {
    withSelect,
} = wp.data;

const el = wp.element.createElement;
const { registerBlockType } = wp.blocks;

/**
 * Get array for Select element.
 *
 * @returns {Array} array for Select.
 */
const getDefaultColumnSizes = function() {
    const result = [
        {
            label: __( 'Inherit from larger' ),
            value: '',
        }, {
            label: __( 'Auto' ),
            value: 'auto',
        },
    ];

    for ( let k = 1; k <= 12; k++ ) {
        result.push( {
            label: sprintf( k === 1 ? __( '%d Column (%s)' ) : __( '%d Columns (%s)' ), k, `${ Math.round( ( 100 * k / 12 ) * 100 ) / 100 }%` ),
            value: k,
        } );
    }
    return result;
};

/**
 * Get array for Select element.
 *
 * @param {Number} columns - number of available columns.
 *
 * @returns {Array} array for Select.
 */
const getDefaultColumnOrders = function( columns = 12 ) {
    const result = [
        {
            label: __( 'Inherit from larger' ),
            value: '',
        }, {
            label: __( 'Auto' ),
            value: 'auto',
        }, {
            label: __( 'First' ),
            value: 'first',
        },
    ];

    for ( let k = 1; k <= columns; k++ ) {
        result.push( {
            label: k,
            value: k,
        } );
    }

    result.push( {
        label: __( 'Last' ),
        value: 'last',
    } );

    return result;
};

class GridColumnBlock extends Component {
    render() {
        const {
            attributes,
            setAttributes,
            isSelected,
            hasChildBlocks,
        } = this.props;

        const {
            stickyContent,
            stickyContentTop,
            stickyContentBottom,
        } = attributes;

        return (
            <Fragment>
                <InspectorControls>
                    <PanelBody>
						<Fragment>
							<SelectControl
								label={ __( 'Size' ) }
								value={ attributes[ 'size' ] }
								onChange={ ( value ) => {
									setAttributes( {
										[ 'size' ]: value,
									} );
								} }
								options={ getDefaultColumnSizes() }
							/>
						</Fragment>
                    </PanelBody>
                </InspectorControls>
                <div className="ghostkit-col-content">
                    { ! isSelected ? (
                        <div className="ghostkit-column-button-select">
                            <Tooltip text={ __( 'Select Column' ) }>

                            </Tooltip>
                        </div>
                    ) : '' }
                    <InnerBlocks
                        templateLock={ false }
                        renderAppender={ (
                            hasChildBlocks ?
                                undefined :
                                () => <InnerBlocks.ButtonBlockAppender />
                        ) }
                    />
                </div>
            </Fragment>
        );
    }
}

const GridColumnBlockWithSelect = withSelect( ( select, ownProps ) => {
    const { clientId } = ownProps;
    const blockEditor = select( 'core/block-editor' );

    return {
        hasChildBlocks: blockEditor ? blockEditor.getBlockOrder( clientId ).length > 0 : false,
    };
} )( GridColumnBlock );

export const name = 'generatepress/grid-column';

const iconEl = el('svg', { width: 20, height: 20, viewBox: "0 0 600 600" },
	el('path', { d: "M485.2 427.8l-99.1-46.2 15.8-34c5.6-11.9 8.8-24.3 10-36.7 3.3-33.7-9-67.3-33.2-91.1-8.9-8.7-19.3-16.1-31.3-21.7-11.9-5.6-24.3-8.8-36.7-10-33.7-3.3-67.4 9-91.1 33.2-8.7 8.9-16.1 19.3-21.7 31.3l-15.8 34-30.4 65.2c-.7 1.5-.1 3.3 1.5 4l65.2 30.4 34 15.8 34 15.8 68 31.7 74.7 34.8c-65 45.4-152.1 55.2-228.7 17.4C90.2 447.4 44.1 313.3 97.3 202.6c53.3-110.8 186-158.5 297.8-106.3 88.1 41.1 137.1 131.9 129.1 223.4-.1 1.3.6 2.4 1.7 3l65.6 30.6c1.8.8 3.9-.3 4.2-2.2 22.6-130.7-44-265.4-170.5-323.5-150.3-69-327-4.1-396.9 145.8-70 150.1-5.1 328.5 145.1 398.5 114.1 53.2 244.5 28.4 331.3-52.3 17.9-16.6 33.9-35.6 47.5-56.8 1-1.5.4-3.6-1.3-4.3l-65.7-30.7zm-235-109.6l15.8-34c8.8-18.8 31.1-26.9 49.8-18.1s26.9 31 18.1 49.8l-15.8 34-34-15.8-33.9-15.9z" } )
);

registerBlockType( 'generatepress/grid-column', {
    title: __( 'Column' ),
    parent: [ 'generatepress/grid' ],
    description: __( 'A single column within a grid block.' ),
    icon: iconEl,
    category: 'generatepress',
    supports: {
        html: false,
        className: false,
        anchor: true,
        inserter: false,
        reusable: false,
    },
    attributes: {
        sm_size: {
            type: 'string',
            default: '',
        },
        sm_order: {
            type: 'string',
            default: '',
        },
        sm_verticalAlign: {
            type: 'string',
            default: '',
        },

        md_size: {
            type: 'string',
            default: '',
        },
        md_order: {
            type: 'string',
            default: '',
        },
        md_verticalAlign: {
            type: 'string',
            default: '',
        },

        lg_size: {
            type: 'string',
            default: '',
        },
        lg_order: {
            type: 'string',
            default: '',
        },
        lg_verticalAlign: {
            type: 'string',
            default: '',
        },

        xl_size: {
            type: 'string',
            default: '',
        },
        xl_order: {
            type: 'string',
            default: '',
        },
        xl_verticalAlign: {
            type: 'string',
            default: '',
        },

        size: {
            type: 'string',
            default: 'auto',
        },
        order: {
            type: 'string',
            default: '',
        },
        verticalAlign: {
            type: 'string',
            default: '',
        },
        stickyContent: {
            type: 'boolean',
            default: false,
        },
        stickyContentTop: {
            type: 'number',
            default: 40,
        },
        stickyContentBottom: {
            type: 'number',
            default: '',
        },
    },

    edit: GridColumnBlockWithSelect,

    save: function( props ) {
        let className = getColClass( props );
        const {
            awb_color, // eslint-disable-line
        } = props.attributes;

        return (
            <div className={ className }>
                <div className="ghostkit-col-content">
                    <InnerBlocks.Content />
                </div>
            </div>
        );
    },
} );

/**
 * Override the default block element to add column classes on wrapper.
 *
 * @param  {Function} BlockListBlock Original component
 * @return {Function}                Wrapped component
 */
export const withClasses = createHigherOrderComponent( ( BlockListBlock ) => (
    ( props ) => {
        const { name: blockName } = props;
        let className = props.className;

        if ( 'generatepress/grid-column' === blockName ) {
            className = classnames( className, getColClass( props ) );
        }

        return <BlockListBlock { ...props } className={ className } />;
    }
) );

addFilter( 'editor.BlockListBlock', 'core/editor/grid-column/with-classes', withClasses );
