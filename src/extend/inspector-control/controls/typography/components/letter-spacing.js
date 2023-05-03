import { __ } from '@wordpress/i18n';
import UnitControl from '../../../../../components/unit-control';

export default function LetterSpacing( { units, value, placeholder, onChange } ) {
	return (
		<UnitControl
			label={ __( 'Letter Spacing', 'generateblocks' ) }
			id="gblocks-letter-spacing"
			units={ units }
			value={ value }
			placeholder={ placeholder }
			onChange={ onChange }
		/>
	);
}
