import { __ } from '@wordpress/i18n';
import UnitControl from '../../../../../components/unit-control';

export default function Width( props ) {
	const {
		value,
		placeholder,
		onChange,
	} = props;

	return (
		<UnitControl
			label={ __( 'Width', 'generateblocks' ) }
			id="gblocks-width"
			value={ value }
			placeholder={ placeholder }
			onChange={ onChange }
		/>
	);
}
