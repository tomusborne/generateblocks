import { __ } from '@wordpress/i18n';
import UnitControl from '../../../../../components/unit-control';

export default function MinHeight( { value, onChange, units, placeholder } ) {
	return (
		<UnitControl
			label={ __( 'Min Height', 'generateblocks' ) }
			id="gblocks-min-height"
			units={ units }
			value={ value }
			placeholder={ placeholder }
			onChange={ onChange }
		/>
	);
}
