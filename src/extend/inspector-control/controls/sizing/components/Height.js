import { __ } from '@wordpress/i18n';
import UnitControl from '../../../../../components/unit-control';

export default function Height( { value, onChange, units, placeholder } ) {
	return (
		<UnitControl
			label={ __( 'Height', 'generateblocks' ) }
			id="gblocks-height"
			units={ units }
			value={ value }
			placeholder={ placeholder }
			onChange={ onChange }
		/>
	);
}
