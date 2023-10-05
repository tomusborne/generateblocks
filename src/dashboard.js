/**
 * WordPress dependencies
 */
import {
	__,
} from '@wordpress/i18n';

import {
	BaseControl,
	Button,
	PanelBody,
	PanelRow,
	Placeholder,
	Spinner,
	ToggleControl,
	SelectControl,
	TextControl,
} from '@wordpress/components';

import {
	render,
	Component,
	Fragment,
} from '@wordpress/element';

import apiFetch from '@wordpress/api-fetch';

import {
	applyFilters,
} from '@wordpress/hooks';

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
			path: '/generateblocks/v1/settings',
			method: 'POST',
			data: {
				settings: this.state.settings,
			},
		} ).then( ( result ) => {
			this.setState( { isAPISaving: false } );
			message.classList.add( 'gblocks-action-message--show' );
			message.textContent = result.response;

			if ( ! result.success || ! result.response ) {
				message.classList.add( 'gblocks-action-message--error' );
			} else {
				setTimeout( function() {
					message.classList.remove( 'gblocks-action-message--show' );
				}, 3000 );
			}
		} );
	}

	render() {
		if ( ! this.state.isAPILoaded ) {
			return (
				<Placeholder className="gblocks-settings-placeholder">
					<Spinner />
				</Placeholder>
			);
		}

		return (
			<Fragment>
				<div className="generateblocks-settings-main">
					{ applyFilters( 'generateblocks.dashboard.beforeSettings', '', this ) }

					<PanelBody
						title={ __( 'Settings', 'generateblocks' ) }
					>
						<div className="gblocks-dashboard-panel-row-wrapper">
							<PanelRow className="gblocks-container-width">
								<div className="gblocks-units">px</div>

								<TextControl
									type="number"
									label={ __( 'Global max-width', 'generateblocks' ) }
									help={ !! generateBlocksSettings.gpContainerWidth
										? __( 'The global max-width is set by GeneratePress in the Customizer.', 'generateblocks' )
										: __( 'The global max-width value you can use in your blocks.', 'generateblocks' )
									}
									disabled={ !! generateBlocksSettings.gpContainerWidth }
									value={ generateBlocksSettings.gpContainerWidth || this.getSetting( 'container_width' ) }
									onChange={ ( value ) => {
										this.setState( {
											settings: {
												...this.state.settings,
												container_width: value,
											},
										} );
									} }
								/>

								{ !! generateBlocksSettings.gpContainerWidthLink &&
									<a href={ generateBlocksSettings.gpContainerWidthLink } target="_blank" rel="noopener noreferrer" style={ { fontSize: '12px' } }>
										{ __( 'Go to option →', 'generateblocks' ) }
									</a>
								}
							</PanelRow>

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
							</PanelRow>

							{ 'file' === this.getSetting( 'css_print_method' ) &&
								<PanelRow>
									<BaseControl
										id="gblocks-regenerate-css"
										className="gblocks-regenerate-css"
										help={ __( 'Force your external CSS files to regenerate next time their page is loaded.', 'generateblocks' ) }
									>
										<div className="gblocks-action-button">
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
														message.textContent = result.response;

														if ( ! result.success || ! result.response ) {
															message.classList.add( 'gblocks-action-message--error' );
														} else {
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
										</div>
									</BaseControl>
								</PanelRow>
							}

							<PanelRow>
								<ToggleControl
									label={ __( 'Sync Responsive Previews', 'generateblocks' ) }
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

							<PanelRow>
								<ToggleControl
									label={ __( 'Disable Google Fonts', 'generateblocks' ) }
									help={ __( 'Prevent Google Fonts from being called on your website and remove them from the font family lists.', 'generateblocks' ) }
									checked={ this.getSetting( 'disable_google_fonts' ) }
									onChange={ ( value ) => {
										this.setState( {
											settings: {
												...this.state.settings,
												disable_google_fonts: value,
											},
										} );
									} }
								/>
							</PanelRow>

							{ applyFilters( 'generateblocks.dashboard.settings', '', this ) }

							<div className="gblocks-action-button">
								<Button
									isPrimary
									disabled={ this.state.isAPISaving }
									onClick={ ( e ) => this.updateSettings( e ) }
								>
									{ this.state.isAPISaving && <Spinner /> }
									{ ! this.state.isAPISaving && __( 'Save' ) }
								</Button>

								<span className="gblocks-action-message"></span>
							</div>
						</div>
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
