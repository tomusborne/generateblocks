// Import CSS
import './editor.scss';

const {
	Component,
} = wp.element;

const {
	__,
	sprintf,
} = wp.i18n;

const {
	ButtonGroup,
	Button,
} = wp.components;

export default class UnitChooser extends Component {
	render() {
		const {
			label,
			value,
			onClick,
			units,
		} = this.props;

		return (
			<div className="components-gblocks-units-control-header__units">
				<div className="components-gblocks-units-control-label__units">
					{ label }
				</div>

				<div className="components-gblocks-control__units">
					<ButtonGroup className="components-gblocks-control-buttons__units" aria-label={ __( 'Select Units', 'generateblocks' ) }>
						{ units.map( ( unit ) =>
							<Button
								key={ unit }
								className={ 'components-gblocks-control-button__units--' + unit }
								isSmall
								isPrimary={ value === unit }
								aria-pressed={ value === unit }
								/* translators: %s: values associated with CSS syntax, 'Pixel', 'Em', 'Percentage' */
								aria-label={ sprintf( __( '%s Units', 'generateblocks' ), unit ) }
								onClick={ () => onClick( unit ) }
							>
								{ unit }
							</Button>
						) }
					</ButtonGroup>
				</div>
			</div>
		);
	}
}
