import { __ } from '@wordpress/i18n';
import UnitControl from '../../../../../components/unit-control';

export default function FontSize( { value, placeholder, onChange } ) {
	return (
		<UnitControl
			label={ __( 'Font Size', 'generateblocks' ) }
			id="gblocks-font-size"
			value={ value }
			placeholder={ placeholder }
			onChange={ onChange }
		/>
	);
}
