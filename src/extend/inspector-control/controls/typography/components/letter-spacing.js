import { __ } from '@wordpress/i18n';
import UnitControl from '../../../../../components/unit-control';

export default function LetterSpacing( { value, placeholder, onChange, defaultUnit } ) {
	return (
		<UnitControl
			label={ __( 'Letter Spacing', 'generateblocks' ) }
			id="gblocks-letter-spacing"
			defaultUnit={ defaultUnit }
			value={ value }
			placeholder={ placeholder }
			onChange={ onChange }
		/>
	);
}
