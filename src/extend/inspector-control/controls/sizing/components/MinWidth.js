import { __ } from '@wordpress/i18n';
import UnitControl from '../../../../../components/unit-control';

export default function MinWidth( { value, onChange, disabled, placeholder } ) {
	return (
		<UnitControl
			label={ __( 'Min Width', 'generateblocks' ) }
			id="gblocks-min-width"
			value={ value }
			placeholder={ placeholder }
			onChange={ onChange }
			disabled={ disabled }
		/>
	);
}
