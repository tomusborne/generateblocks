/**
 * WordPress dependencies
 */
const {
	__,
} = wp.i18n;

const {
	BaseControl,
	Button,
	PanelBody,
	PanelRow,
	Placeholder,
	Spinner,
	ToggleControl,
	SelectControl,
} = wp.components;

const {
	render,
	Component,
	Fragment,
} = wp.element;

const {
	apiFetch,
} = wp;

const {
	applyFilters,
} = wp.hooks;

/**
 * Internal dependencies
 */
import './dashboard.scss';

class App extends Component {
	constructor() {
		super( ...arguments );

		this.state = {
			isAPILoaded: false,
			isAPISaving: false,
			isRegeneratingCSS: false,
			settings: generateBlocksSettings.settings,
		};

		this.getSetting = this.getSetting.bind( this );
		this.updateSettings = this.updateSettings.bind( this );
	}

	componentDidMount() {
		this.setState( {
			isAPILoaded: true,
		} );
	}

	getSetting( name, defaultVal ) {
		let result = defaultVal;

		if ( 'undefined' !== typeof this.state.settings[ name ] ) {
			result = this.state.settings[ name ];
		}

		return result;
	}

	updateSettings( e ) {
		this.setState( { isAPISaving: true } );
		const message = e.target.nextElementSibling;

		apiFetch( {
			path: '/generateblocks/v1/update_settings',
			method: 'POST',
			data: {
				settings: this.state.settings,
			},
		} ).then( ( result ) => {
			this.setState( { isAPISaving: false } );
			message.classList.add( 'gblocks-action-message--show' );

			if ( ! result.success || ! result.response ) {
				message.classList.add( 'gblocks-action-message--error' );
				message.textContent = result;
			} else {
				message.textContent = __( 'Settings saved.', 'generateblocks' );

				setTimeout( function() {
					message.classList.remove( 'gblocks-action-message--show' );
				}, 3000 );
			}
		} );
	}

	render() {
		if ( ! this.state.isAPILoaded ) {
			return (
				<Placeholder>
					<Spinner />
				</Placeholder>
			);
		}

		return (
			<Fragment>
				<div className="generateblocks-main">
					{ applyFilters( 'generateblocks.dashboard.beforeSettings', '', this ) }

					<PanelBody
						title={ __( 'Settings', 'generateblocks' ) }
					>
						<PanelRow className="gblocks-css-print-method">
							<SelectControl
								label={ __( 'CSS Print Method', 'generateblocks' ) }
								help={ __( 'Generating your CSS in external files is better for overall performance.', 'generateblocks' ) }
								value={ this.getSetting( 'css_print_method' ) }
								options={ [
									{ label: __( 'External File', 'generateblocks' ), value: 'file' },
									{ label: __( 'Inline Embedding', 'generateblocks' ), value: 'inline' },
								] }
								onChange={ ( value ) => {
									this.setState( {
										settings: {
											...this.state.settings,
											css_print_method: value,
										},
									} );
								} }
							/>

							{ 'file' === this.getSetting( 'css_print_method' ) &&
								<BaseControl
									id="gblocks-regenerate-css"
									className="gblocks-regenerate-css"
									help={ __( 'Force your external CSS files to regenerate next time their page is loaded.', 'generateblocks' ) }
								>
									<Button
										isSecondary
										onClick={ ( e ) => {
											this.setState( { isRegeneratingCSS: true } );
											const message = e.target.nextElementSibling;

											apiFetch( {
												path: '/generateblocks/v1/regenerate_css_files',
												method: 'POST',
											} ).then( ( result ) => {
												this.setState( { isRegeneratingCSS: false } );
												message.classList.add( 'gblocks-action-message--show' );

												if ( ! result.success || ! result.response ) {
													message.classList.add( 'gblocks-action-message--error' );
													message.textContent = result;
												} else {
													message.textContent = __( 'CSS files regenerated.', 'generateblocks' );

													setTimeout( function() {
														message.classList.remove( 'gblocks-action-message--show' );
													}, 3000 );
												}
											} );
										} }
									>
										{ this.state.isRegeneratingCSS && <Spinner /> }
										{ ! this.state.isRegeneratingCSS && __( 'Regenerate CSS Files', 'generateblocks' ) }
									</Button>

									<span className="gblocks-action-message"></span>
								</BaseControl>
							}
						</PanelRow>

						<PanelRow>
							<ToggleControl
								label={ __( 'Sync Responsive Previews' ) }
								help={ __( 'Sync our responsive preview controls with the editor responsive previews.', 'generateblocks' ) }
								checked={ this.getSetting( 'sync_responsive_previews' ) }
								onChange={ ( value ) => {
									this.setState( {
										settings: {
											...this.state.settings,
											sync_responsive_previews: value,
										},
									} );
								} }
							/>
						</PanelRow>

						{ applyFilters( 'generateblocks.dashboard.settings', '', this ) }

						<Button
							isPrimary
							disabled={ this.state.isAPISaving }
							onClick={ ( e ) => this.updateSettings( e ) }
						>
							{ this.state.isAPISaving && <Spinner /> }
							{ ! this.state.isAPISaving && __( 'Save' ) }
						</Button>

						<span className="gblocks-action-message"></span>
					</PanelBody>

					{ applyFilters( 'generateblocks.dashboard.afterSettings', '', this ) }
				</div>
			</Fragment>
		);
	}
}

window.addEventListener( 'DOMContentLoaded', () => {
	render(
		<App />,
		document.getElementById( 'gblocks-block-default-settings' )
	);
} );
