import { __ } from '@wordpress/i18n';
import UnitControl from '../../../../../components/unit-control';

export default function MinHeight( { value, desktopValue, tabletValue, onChange } ) {
	return (
		<UnitControl
			label={ __( 'Min Height', 'generateblocks' ) }
			id="gblocks-min-height"
			units={ [ 'px', 'vh', 'vw' ] }
			value={ value }
			desktopValue={ desktopValue }
			tabletValue={ tabletValue }
			onChange={ onChange }
		/>
	);
}
