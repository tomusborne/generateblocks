import { __ } from '@wordpress/i18n';
import UnitControl from '../../../../../components/unit-control';

export default function MinHeight( { value, onChange, placeholder } ) {
	return (
		<UnitControl
			label={ __( 'Min Height', 'generateblocks' ) }
			id="gblocks-min-height"
			value={ value }
			placeholder={ placeholder }
			onChange={ onChange }
		/>
	);
}
