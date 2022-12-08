import { __ } from '@wordpress/i18n';
import UnitControl from '../../../../../components/unit-control';

export default function MinHeight( { value, desktopValue, tabletValue, onChange, units } ) {
	return (
		<UnitControl
			label={ __( 'Min Height', 'generateblocks' ) }
			id="gblocks-min-height"
			units={ units }
			value={ value }
			desktopValue={ desktopValue }
			tabletValue={ tabletValue }
			onChange={ onChange }
		/>
	);
}
