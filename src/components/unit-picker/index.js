// Import CSS
import './editor.scss';

import {
	Component,
} from '@wordpress/element';

import {
	__,
	sprintf,
	_x,
} from '@wordpress/i18n';

import {
	ButtonGroup,
	Button,
	Tooltip,
	BaseControl,
} from '@wordpress/components';

export default class UnitChooser extends Component {
	render() {
		const {
			label,
			value,
			onClick,
			units,
			id,
			singleOption = false,
		} = this.props;

		const allUnits = singleOption ? [ value ] : units;

		return (
			<BaseControl label={ label } id={ id } className="components-gblocks-units-control-header__units">
				<div className="components-gblocks-control__units">
					<ButtonGroup className="components-gblocks-control-buttons__units" aria-label={ __( 'Select Units', 'generateblocks' ) }>
						{ allUnits.map( ( unit ) => {
							let unitName = unit;

							if ( 'px' === unit ) {
								unitName = _x( 'Pixel', 'A size unit for CSS markup', 'generateblocks' );
							}

							if ( 'em' === unit ) {
								unitName = _x( 'Em', 'A size unit for CSS markup', 'generateblocks' );
							}

							if ( '%' === unit ) {
								unitName = _x( 'Percentage', 'A size unit for CSS markup', 'generateblocks' );
							}

							if ( 'deg' === unit ) {
								unitName = _x( 'Degree', 'A size unit for CSS markup', 'generateblocks' );
							}

							return <Tooltip
								/* translators: Unit type (px, em, %) */
								text={ sprintf( __( '%s Units', 'generateblocks' ), unitName ) }
								key={ unit }
							>
								<Button
									key={ unit }
									className={ 'components-gblocks-control-button__units--' + unit }
									size="small"
									isPrimary={ value === unit }
									aria-pressed={ value === unit }
									/* translators: %s: values associated with CSS syntax, 'Pixel', 'Em', 'Percentage' */
									aria-label={ sprintf( __( '%s Units', 'generateblocks' ), unitName ) }
									onClick={ () => onClick( unit ) }
								>
									{ unit }
								</Button>
							</Tooltip>;
						} ) }
					</ButtonGroup>
				</div>
			</BaseControl>
		);
	}
}
