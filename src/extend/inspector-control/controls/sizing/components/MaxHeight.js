import { __ } from '@wordpress/i18n';
import UnitControl from '../../../../../components/unit-control';

export default function MaxHeight( { value, onChange, placeholder } ) {
	return (
		<>
			<UnitControl
				label={ __( 'Max Height', 'generateblocks' ) }
				id="gblocks-max-height"
				value={ value }
				placeholder={ placeholder }
				onChange={ onChange }
			/>
		</>
	);
}
