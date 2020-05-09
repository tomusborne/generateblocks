import classnames from 'classnames';

// Import CSS
import './editor.scss';

const { __ } = wp.i18n;
const { Component } = wp.element;
const {
	Button,
	ToggleControl,
} = wp.components;

const WPURLInput = wp.blockEditor.URLInput;

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
			relNoFollow,
			relSponsored,
		} = this.props;

		this.props.onChange( {
			...{
				url,
				target,
				relNoFollow,
				relSponsored,
			},
			...data,
		} );
	}

	render() {
		const {
			url,
			target,
			relNoFollow,
			relSponsored,
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
				className={ classnames( 'gblocks-component-url-input', className ) }
				onSubmit={ ( e ) => e.preventDefault() }
			>
				<div className="gblocks-component-url-input-flex">
					<WPURLInput
						value={ url }
						onChange={ ( value ) => {
							onChange( {
								url: value,
							} );
						} }
						autoFocus={ autoFocus } // eslint-disable-line jsx-a11y/no-autofocus
					/>
					<Button
						icon={ 'ellipsis' }
						label={ moreOptions ? __( 'Hide More Options', 'generateblocks' ) : __( 'Show More Options', 'generateblocks' ) }
						onClick={ () => {
							this.setState( {
								moreOptions: ! moreOptions,
							} );
						} }
					/>
				</div>
				{ moreOptions &&
					<div className="gblocks-component-url-input-more-options">
						<ToggleControl
							label={ __( 'Open link in a new tab', 'generateblocks' ) }
							checked={ target || '' }
							onChange={ ( value ) => {
								onChange( {
									target: value,
								} );
							} }
						/>

						<ToggleControl
							label={ __( 'Add rel="nofollow"', 'generateblocks' ) }
							checked={ relNoFollow || '' }
							onChange={ ( value ) => {
								onChange( {
									relNoFollow: value,
								} );
							} }
						/>

						<ToggleControl
							label={ __( 'Add rel="sponsored"', 'generateblocks' ) }
							checked={ relSponsored || '' }
							onChange={ ( value ) => {
								onChange( {
									relSponsored: value,
								} );
							} }
						/>
					</div>
				}
			</form>
		);
	}
}
