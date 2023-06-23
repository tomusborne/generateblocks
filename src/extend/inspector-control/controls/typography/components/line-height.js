import { __ } from '@wordpress/i18n';
import UnitControl from '../../../../../components/unit-control';

export default function LineHeight( { value, placeholder, onChange, defaultUnit } ) {
	return (
		<UnitControl
			label={ __( 'Line Height', 'generateblocks' ) }
			id="gblocks-line-height"
			defaultUnit={ defaultUnit }
			value={ value }
			placeholder={ placeholder }
			onChange={ onChange }
		/>
	);
}
