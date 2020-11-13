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
import './style.scss';

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

	updateSettings() {
		this.setState( { isAPISaving: true } );

		apiFetch( {
			path: '/generateblocks/v1/update_settings',
			method: 'POST',
			data: {
				settings: this.state.settings,
			},
		} ).then( ( result ) => {
			this.setState( { isAPISaving: false } );
			document.querySelector( '.gblocks-settings-saved' ).classList.add( 'show-settings-saved' );

			setTimeout( function() {
				document.querySelector( '.gblocks-settings-saved' ).classList.remove( 'show-settings-saved' );
			}, 3000 );

			if ( ! result.success || ! result.response ) {
				// eslint-disable-next-line no-console
				console.log( result );
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
						title={ __( 'Settings' ) }
					>
						<PanelRow>
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
						</PanelRow>

						{ 'file' === this.getSetting( 'css_print_method' ) &&
							<PanelRow>
								<BaseControl
									className="gblocks-regenerate-css"
									label={ __( 'Regenerate CSS', 'generateblocks' ) }
									help={ __( 'Force your external CSS files to regenerate next time their page is loaded.', 'generateblocks' ) }
								>
									<Button
										isSecondary
										onClick={ () => {
											this.setState( { isRegeneratingCSS: true } );

											apiFetch( {
												path: '/generateblocks/v1/regenerate_css_files',
												method: 'POST',
											} ).then( ( result ) => {
												this.setState( { isRegeneratingCSS: false } );

												if ( ! result.success || ! result.response ) {
													// eslint-disable-next-line no-console
													console.log( result );
												}
											} );
										} }
									>
										{ this.state.isRegeneratingCSS && <Spinner /> }
										{ ! this.state.isRegeneratingCSS && __( 'Regenerate Files', 'generateblocks' ) }
									</Button>
								</BaseControl>
							</PanelRow>
						}

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
							onClick={ () => this.updateSettings() }
						>
							{ this.state.isAPISaving && <Spinner /> }
							{ ! this.state.isAPISaving && __( 'Save' ) }
						</Button>

						<span className="gblocks-settings-saved">
							{ __( 'Settings saved.', 'generateblocks' ) }
						</span>
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
