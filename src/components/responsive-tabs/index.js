import './editor.scss';

const { Component } = wp.element;
const { __ } = wp.i18n;

const {
	Tooltip,
	Button,
} = wp.components;

export default class ResponsiveTabs extends Component {
	render() {
		const {
			onClick,
			selectedDevice,
		} = this.props;

		return (
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
		);
	}
}
