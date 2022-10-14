import { __ } from '@wordpress/i18n';
import UnitControl from '../../../../../components/unit-control';

export default function MinWidth( { value, desktopValue, tabletValue, onChange, disabled } ) {
	return (
		<UnitControl
			label={ __( 'Min Width', 'generateblocks' ) }
			id="gblocks-min-width"
			units={ [ 'px', 'vh', 'vw' ] }
			value={ value }
			desktopValue={ desktopValue }
			tabletValue={ tabletValue }
			onChange={ onChange }
			disabled={ disabled }
		/>
	);
}
