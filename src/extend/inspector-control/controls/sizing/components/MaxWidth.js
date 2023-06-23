import { __ } from '@wordpress/i18n';
import UnitControl from '../../../../../components/unit-control';

export default function MaxWidth( { value, onChange, disabled, overrideValue, overrideAction, placeholder } ) {
	return (
		<>
			<UnitControl
				label={ __( 'Max Width', 'generateblocks' ) }
				id="gblocks-max-width"
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
