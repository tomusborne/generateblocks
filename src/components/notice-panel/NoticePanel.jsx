import { Button, PanelBody } from '@wordpress/components';
import { closeSmall } from '@wordpress/icons';
import { __ } from '@wordpress/i18n';

import './editor.scss';

export function NoticePanel( { children, title, onDismiss } ) {
	return (
		<PanelBody
			className="gb-notice-panel"
		>
			<div className="gb-notice-panel__header">
				<h2>{ title }</h2>
				{ !! onDismiss && (
					<Button
						className="gb-notice-panel__dismiss"
						onClick={ onDismiss }
						icon={ closeSmall }
						size="small"
						label={ __( 'Dismiss', 'generateblocks' ) }
						showTooltip
					/>
				) }
			</div>
			{ children }
		</PanelBody>
	);
}
