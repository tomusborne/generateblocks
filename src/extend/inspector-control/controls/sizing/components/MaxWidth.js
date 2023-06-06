import { __ } from '@wordpress/i18n';
import UnitControl from '../../../../../components/unit-control';

export default function MaxWidth( { value, onChange, disabled, overrideValue, units, overrideAction, placeholder } ) {
	return (
		<>
			<UnitControl
				label={ __( 'Max Width', 'generateblocks' ) }
				id="gblocks-max-width"
				units={ units }
				overrideValue={ overrideValue }
				disabled={ disabled }
				value={ value }
				placeholder={ placeholder }
				onChange={ onChange }
				overrideAction={ overrideAction }
			/>
		</>
	);
}
