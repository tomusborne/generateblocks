import { __ } from '@wordpress/i18n';
import UnitControl from '../../../../../components/unit-control';

export default function LetterSpacing( { units, value, placeholder, onChange, defaultUnit } ) {
	return (
		<UnitControl
			label={ __( 'Letter Spacing', 'generateblocks' ) }
			id="gblocks-letter-spacing"
			units={ units }
			defaultUnit={ defaultUnit }
			value={ value }
			placeholder={ placeholder }
			onChange={ onChange }
		/>
	);
}
