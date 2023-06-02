import { __ } from '@wordpress/i18n';
import UnitControl from '../../../../../components/unit-control';

export default function FontSize( { units, value, placeholder, onChange } ) {
	return (
		<UnitControl
			label={ __( 'Font Size', 'generateblocks' ) }
			id="gblocks-font-size"
			units={ units }
			value={ value }
			placeholder={ placeholder }
			onChange={ onChange }
		/>
	);
}
