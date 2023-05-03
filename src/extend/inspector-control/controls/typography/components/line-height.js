import { __ } from '@wordpress/i18n';
import UnitControl from '../../../../../components/unit-control';

export default function LineHeight( { units, value, placeholder, onChange } ) {
	return (
		<UnitControl
			label={ __( 'Line Height', 'generateblocks' ) }
			id="gblocks-line-height"
			units={ units }
			value={ value }
			placeholder={ placeholder }
			onChange={ onChange }
		/>
	);
}
