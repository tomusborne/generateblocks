import classnames from 'classnames';

// Import CSS
import './editor.scss';

// Internal Dependencies.
//import getIcon from '../../utils/get-icon';

const { __ } = wp.i18n;
const { Component } = wp.element;
const {
    Dashicon,
    IconButton,
    ToggleControl,
} = wp.components;

const WPURLInput = wp.editor.URLInput;

export default class URLInput extends Component {
    constructor() {
        super( ...arguments );

        this.state = {
            moreOptions: false,
        };

        this.onChange = this.onChange.bind( this );
    }

    onChange( data ) {
        const {
            url,
            target,
            rel,
        } = this.props;

        this.props.onChange( {
            ...{
                url,
                target,
                rel,
            },
            ...data,
        } );
    }

    render() {
        const {
            url,
            target,
            rel,
            className,
            autoFocus,
        } = this.props;

        const {
            onChange,
        } = this;

        const {
            moreOptions,
        } = this.state;

        return (
            <form
                className={ classnames( 'generatepress-component-url-input', className ) }
                onSubmit={ ( e ) => e.preventDefault() }
            >
                <div className="generatepress-component-url-input-flex">
                    <Dashicon icon="admin-links" />
                    <WPURLInput
                        value={ url }
                        onChange={ ( value ) => {
                            onChange( {
                                url: value,
                            } );
                        } }
                        autoFocus={ autoFocus }
                    />
                    <IconButton
                        icon={ 'ellipsis' }
                        label={ moreOptions ? __( 'Hide More Options' ) : __( 'Show More Options' ) }
                        onClick={ () => {
                            this.setState( {
                                moreOptions: ! moreOptions,
                            } );
                        } }
                    />
                </div>
                { moreOptions ? (
                    <div className="generatepress-component-url-input-more-options">
                        <ToggleControl
                            label={ __( 'Open link in a new tab' ) }
                            checked={ '_blank' === target }
                            onChange={ () => {
                                if ( '_blank' === target ) {
                                    onChange( {
                                        target: '',
                                    } );
                                } else {
                                    onChange( {
                                        target: '_blank',
                                    } );
                                }
                            } }
                        />
                        <ToggleControl
                            label={ __( 'Add nofollow option to link' ) }
                            checked={ 'nofollow' === rel }
                            onChange={ () => {
                                if ( 'nofollow' === rel ) {
                                    onChange( {
                                        rel: '',
                                    } );
                                } else {
                                    onChange( {
                                        rel: 'nofollow',
                                    } );
                                }
                            } }
                        />
                    </div>
                ) : '' }
            </form>
        );
    }
}
