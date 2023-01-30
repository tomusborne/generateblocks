import { __ } from '@wordpress/i18n';
import UnitControl from '../../../../../components/unit-control';

export default function Height( { value, desktopValue, tabletValue, onChange, units } ) {
	return (
		<UnitControl
			label={ __( 'Height', 'generateblocks' ) }
			id="gblocks-height"
			units={ units }
			value={ value }
			desktopValue={ desktopValue }
			tabletValue={ tabletValue }
			onChange={ onChange }
		/>
	);
}
