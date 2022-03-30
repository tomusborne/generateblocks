import './editor.scss';

import {
	Component,
	Fragment,
} from '@wordpress/element';

import {
	__,
} from '@wordpress/i18n';

import {
	Tooltip,
	Button,
} from '@wordpress/components';

import {
	applyFilters,
} from '@wordpress/hooks';
import { Icon, desktop, tablet, mobile } from '@wordpress/icons';

export default class ResponsiveTabs extends Component {
	render() {
		const {
			onClick,
			selectedDevice,
		} = this.props;

		const panelHeader = document.querySelector( '.edit-post-sidebar .edit-post-sidebar__panel-tabs' );
		const panelHeaderHeight = panelHeader ? panelHeader.offsetHeight : 0;

		return (
			<Fragment>
				<div className="gb-responsive-tabs" style={ { top: panelHeaderHeight + 'px' } }>
					<Tooltip text={ __( 'Show options for all devices', 'generateblocks' ) }>
						<Button
							isPressed={ 'Desktop' === selectedDevice ? true : false }
							onClick={ () => {
								onClick( 'Desktop' );
							} }
						>
							<Icon icon={ desktop } />
						</Button>
					</Tooltip>

					<Tooltip text={ __( 'Show options for tablet devices', 'generateblocks' ) }>
						<Button
							isPressed={ 'Tablet' === selectedDevice ? true : false }
							onClick={ () => {
								onClick( 'Tablet' );
							} }
						>
							<Icon icon={ tablet } />
						</Button>
					</Tooltip>

					<Tooltip text={ __( 'Show options for mobile devices', 'generateblocks' ) }>
						<Button
							isPressed={ 'Mobile' === selectedDevice ? true : false }
							onClick={ () => {
								onClick( 'Mobile' );
							} }
						>
							<Icon icon={ mobile } />
						</Button>
					</Tooltip>
				</div>

				{ applyFilters( 'generateblocks.editor.controls', '', 'afterResponsiveTabs', this.props, this.state ) }
			</Fragment>
		);
	}
}
