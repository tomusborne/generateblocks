import { Button, PanelBody, PanelRow } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { useEffect, useState } from '@wordpress/element';

export default function SettingsPanel( props ) {
	const { title, children, onSave, isLoading, message } = props;
	const [ showMessage, setShowMessage ] = useState( false );

	useEffect( () => {
		setShowMessage( true );
		return function() {
			setTimeout( () => setShowMessage( false ), 1500 );
		};
	}, [ message ] );

	return (
		<div className="generateblocks-settings-main">
			<PanelBody title={ title }>
				<div className="gblocks-dashboard-panel-row-wrapper">
					<PanelRow>{ children }</PanelRow>
					<div className="gblocks-action-button">
						<Button
							isPrimary
							disabled={ isLoading }
							onClick={ onSave }
						>
							{ __( 'Save', 'generateblocks' ) }
						</Button>
						{ showMessage &&
							<span
								className="gblocks-action-message gblocks-action-message--show"
							>
								{ message }
							</span>
						}
					</div>
				</div>
			</PanelBody>
		</div>
	);
}
