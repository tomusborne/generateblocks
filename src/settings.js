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
	Fragment,
	useEffect,
	useState,
} from '@wordpress/element';

import apiFetch from '@wordpress/api-fetch';

import {
	applyFilters,
} from '@wordpress/hooks';

/**
 * Internal dependencies
 */
import compatibleRender from '@utils/compatible-render';
import './settings/blocks-version';

import './settings.scss';

function Settings() {
	const [ isAPILoaded, setIsAPILoaded ] = useState( false );
	const [ isAPISaving, setIsAPISaving ] = useState( false );
	const [ isRegeneratingCSS, setIsRegeneratingCSS ] = useState( false );
	const [ settings, setSettings ] = useState( generateBlocksSettings.settings );

	useEffect( () => {
		setIsAPILoaded( true );
	}, [] );

	function getSetting( name, defaultVal ) {
		let result = defaultVal;

		if ( 'undefined' !== typeof settings[ name ] ) {
			result = settings[ name ];
		}

		return result;
	}

	function updateSettings( e ) {
		setIsAPISaving( true );
		const message = e.target.nextElementSibling;

		apiFetch( {
			path: '/generateblocks/v1/settings',
			method: 'POST',
			data: {
				settings,
			},
		} ).then( ( result ) => {
			setIsAPISaving( false );
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

	if ( ! isAPILoaded ) {
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
								value={ generateBlocksSettings.gpContainerWidth || getSetting( 'container_width' ) }
								onChange={ ( value ) => {
									setSettings( {
										...settings,
										container_width: value,
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
								value={ getSetting( 'css_print_method' ) }
								options={ [
									{ label: __( 'External File', 'generateblocks' ), value: 'file' },
									{ label: __( 'Inline Embedding', 'generateblocks' ), value: 'inline' },
								] }
								onChange={ ( value ) => {
									setSettings( {
										...settings,
										css_print_method: value,
									} );
								} }
							/>
						</PanelRow>

						{ 'file' === getSetting( 'css_print_method' ) &&
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
												setIsRegeneratingCSS( true );
												const message = e.target.nextElementSibling;

												apiFetch( {
													path: '/generateblocks/v1/regenerate_css_files',
													method: 'POST',
												} ).then( ( result ) => {
													setIsRegeneratingCSS( false );
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
											{ isRegeneratingCSS && <Spinner /> }
											{ ! isRegeneratingCSS && __( 'Regenerate CSS Files', 'generateblocks' ) }
										</Button>

										<span className="gblocks-action-message"></span>
									</div>
								</BaseControl>
							</PanelRow>
						}

						{ !! generateBlocksSettings.useV1Blocks && (
							<>
								<PanelRow>
									<ToggleControl
										label={ __( 'Sync Responsive Previews', 'generateblocks' ) }
										help={ __( 'Sync our responsive preview controls with the editor responsive previews.', 'generateblocks' ) }
										checked={ getSetting( 'sync_responsive_previews' ) }
										onChange={ ( value ) => {
											setSettings( {
												...settings,
												sync_responsive_previews: value,
											} );
										} }
									/>
								</PanelRow>

								<PanelRow>
									<ToggleControl
										label={ __( 'Disable Google Fonts', 'generateblocks' ) }
										help={ __( 'Prevent Google Fonts from being called on your website and remove them from the font family lists.', 'generateblocks' ) }
										checked={ getSetting( 'disable_google_fonts' ) }
										onChange={ ( value ) => {
											setSettings( {
												...settings,
												disable_google_fonts: value,
											} );
										} }
									/>
								</PanelRow>
							</>
						) }

						{ applyFilters(
							'generateblocks.dashboard.settings',
							'',
							{
								settings,
								setSettings,
							}
						) }

						<div className="gblocks-action-button">
							<Button
								isPrimary
								disabled={ isAPISaving }
								onClick={ ( e ) => updateSettings( e ) }
							>
								{ isAPISaving && <Spinner /> }
								{ ! isAPISaving && __( 'Save', 'generateblocks' ) }
							</Button>

							<span className="gblocks-action-message"></span>
						</div>
					</div>
				</PanelBody>

				{ applyFilters(
					'generateblocks.dashboard.afterSettings',
					'',
					{
						setSettings,
						settings,
					}
				) }
			</div>
		</Fragment>
	);
}

window.addEventListener( 'DOMContentLoaded', () => {
	compatibleRender(
		document.getElementById( 'gblocks-block-default-settings' ),
		<Settings />
	);
} );
