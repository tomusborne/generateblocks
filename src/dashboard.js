import { Button, PanelBody, PanelRow } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

import './dashboard.scss';
import compatibleRender from '@utils/compatible-render';

export function Dashboard() {
	return (
		<div className="generateblocks-dashboard">
			<div className="gblocks-dashboard-intro-content">
				<h2>{ __( 'GenerateBlocks', 'generateblocks' ) }</h2>
				<p>{ __( 'Take WordPress to the next level.', 'generateblocks' ) }</p>

				<div className="gblocks-sub-navigation">
					{ ! generateblocksDashboard.gbpVersion && (
						<Button
							variant="primary"
							href="https://generatepress.com/blocks/"
							target="_blank" rel="noreferrer noopener"
						>
							{ __( 'GenerateBlocks Pro', 'generateblocks' ) }
						</Button>
					) }

					<Button
						variant="secondary"
						href="https://generatepress.com/blocks"
						target="_blank" rel="noreferrer noopener"
					>
						{ __( 'Learn more', 'generateblocks' ) }
					</Button>

					<Button
						variant="secondary"
						href="https://docs.generateblocks.com"
						target="_blank" rel="noreferrer noopener"
					>
						{ __( 'Documentation', 'generateblocks' ) }
					</Button>
				</div>
			</div>

			<PanelBody
				title={ __( 'Information', 'generateblocks' ) }
				className="gb-dashboard-info"
			>
				<div className="gblocks-dashboard-panel-row-wrapper">
					<PanelRow>
						<ul style={ { marginBottom: 0 } }>
							<li><strong>Version:</strong> { generateblocksDashboard.gbVersion }</li>
							{ !! generateblocksDashboard.gbpVersion ? (
								<li><strong>Pro Version:</strong> { generateblocksDashboard.gbpVersion }</li>
							) : (
								<li><strong>Pro Version:</strong> Not Installed. <a href="https://generatepress.com/blocks">Get Pro</a></li>
							) }
						</ul>
					</PanelRow>
				</div>
			</PanelBody>
		</div>
	);
}

window.addEventListener( 'DOMContentLoaded', () => {
	compatibleRender(
		document.getElementById( 'gblocks-dashboard' ),
		<Dashboard />
	);
} );
