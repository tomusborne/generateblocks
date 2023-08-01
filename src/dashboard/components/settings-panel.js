import { Button, PanelBody, PanelRow, Spinner } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import classnames from 'classnames';

export default function SettingsPanel( props ) {
	const { title, children, onSave, isSaving, showSaveMessage } = props;

	return (
		<div className="generateblocks-settings-main">
			<PanelBody title={ title }>
				<div className="gblocks-dashboard-panel-row-wrapper">
					<PanelRow>{ children }</PanelRow>
					<div className="gblocks-action-button">
						<Button
							variant="primary"
							disabled={ isSaving }
							onClick={ onSave }
						>
							{ !! isSaving && <Spinner /> }
							{ ! isSaving && __( 'Save' ) }
						</Button>

						<span
							className={ classnames( {
								'gblocks-action-message': true,
								'gblocks-action-message--show': !! showSaveMessage,
							} ) }
						>
							{ __( 'Settings saved.', 'generateblocks' ) }
						</span>
					</div>
				</div>
			</PanelBody>
		</div>
	);
}
