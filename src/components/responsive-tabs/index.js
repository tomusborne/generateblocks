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

export default class ResponsiveTabs extends Component {
	render() {
		const {
			onClick,
			selectedDevice,
		} = this.props;

		return (
			<Fragment>
				<div className="gb-responsive-tabs">
					<Tooltip text={ __( 'Show options for all devices', 'generateblocks' ) }>
						<Button
							isPressed={ 'Desktop' === selectedDevice ? true : false }
							onClick={ () => {
								onClick( 'Desktop' );
							} }
						>
							{ __( 'Desktop', 'generateblocks' ) }
						</Button>
					</Tooltip>

					<Tooltip text={ __( 'Show options for tablet devices', 'generateblocks' ) }>
						<Button
							isPressed={ 'Tablet' === selectedDevice ? true : false }
							onClick={ () => {
								onClick( 'Tablet' );
							} }
						>
							{ __( 'Tablet', 'generateblocks' ) }
						</Button>
					</Tooltip>

					<Tooltip text={ __( 'Show options for mobile devices', 'generateblocks' ) }>
						<Button
							isPressed={ 'Mobile' === selectedDevice ? true : false }
							onClick={ () => {
								onClick( 'Mobile' );
							} }
						>
							{ __( 'Mobile', 'generateblocks' ) }
						</Button>
					</Tooltip>
				</div>

				{ applyFilters( 'generateblocks.editor.controls', '', 'afterResponsiveTabs', this.props, this.state ) }
			</Fragment>
		);
	}
}
