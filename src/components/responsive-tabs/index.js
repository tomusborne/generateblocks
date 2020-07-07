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
						isLarge
						isPressed={ 'desktop' === selectedDevice ? true : false }
						onClick={ () => {
							onClick( 'desktop' );
						} }
					>
						{ __( 'Desktop', 'generateblocks' ) }
					</Button>
				</Tooltip>

				<Tooltip text={ __( 'Show options for tablet devices', 'generateblocks' ) }>
					<Button
						isLarge
						isPressed={ 'tablet' === selectedDevice ? true : false }
						onClick={ () => {
							onClick( 'tablet' );
						} }
					>
						{ __( 'Tablet', 'generateblocks' ) }
					</Button>
				</Tooltip>

				<Tooltip text={ __( 'Show options for mobile devices', 'generateblocks' ) }>
					<Button
						isLarge
						isPressed={ 'mobile' === selectedDevice ? true : false }
						onClick={ () => {
							onClick( 'mobile' );
						} }
					>
						{ __( 'Mobile', 'generateblocks' ) }
					</Button>
				</Tooltip>
			</div>
		);
	}
}
