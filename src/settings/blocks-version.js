import { __ } from '@wordpress/i18n';
import { Button, PanelBody, PanelRow, Placeholder, Spinner, ToggleControl } from '@wordpress/components';
import { useEffect, useState } from '@wordpress/element';
import apiFetch from '@wordpress/api-fetch';

import compatibleRender from '@utils/compatible-render';

function BlocksVersionSettings() {
	const [ isAPILoaded, setIsAPILoaded ] = useState( false );
	const [ isAPISaving, setIsAPISaving ] = useState( false );
	const [ useV1Blocks, setUseV1Blocks ] = useState( generateBlocksSettings.useV1Blocks );

	useEffect( () => {
		setIsAPILoaded( true );
	}, [] );

	async function updateSetting( e, name, value ) {
		setIsAPISaving( true );
		const message = e.target.nextElementSibling;

		await apiFetch( {
			path: '/generateblocks/v1/setting',
			method: 'POST',
			data: {
				name,
				value,
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

	if ( ! generateBlocksSettings.useV1Blocks ) {
		return null;
	}

	if ( ! isAPILoaded ) {
		return (
			<Placeholder className="gblocks-settings-placeholder">
				<Spinner />
			</Placeholder>
		);
	}

	return (
		<>
			<div className="generateblocks-settings-main">
				<PanelBody
					title={ __( 'Blocks Version', 'generateblocks' ) }
				>
					<div className="gblocks-dashboard-panel-row-wrapper">
						<PanelRow>
							<ToggleControl
								label={ __( 'Use version 1 blocks', 'generateblocks' ) }
								help={ __( 'Enabling this option will make it so only version 1 blocks display in the block inserter.', 'generateblocks' ) }
								checked={ !! useV1Blocks }
								onChange={ ( value ) => setUseV1Blocks( value ) }
							/>
						</PanelRow>

						<div className="gblocks-action-button">
							<Button
								isPrimary
								disabled={ !! isAPISaving }
								onClick={ ( e ) => updateSetting( e, 'gb_use_v1_blocks', useV1Blocks ) }
							>
								{ !! isAPISaving && <Spinner /> }
								{ ! isAPISaving && __( 'Save', 'generateblocks' ) }
							</Button>

							<span className="gblocks-action-message"></span>
						</div>

					</div>
				</PanelBody>
			</div>
		</>
	);
}

window.addEventListener( 'DOMContentLoaded', () => {
	compatibleRender(
		document.getElementById( 'gblocks-blocks-version-settings' ),
		<BlocksVersionSettings />
	);
} );
