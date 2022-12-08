import { __ } from '@wordpress/i18n';
import UnitControl from '../../../../../components/unit-control';

export default function MaxWidth( { value, desktopValue, tabletValue, onChange, disabled, overrideValue, units, overrideAction } ) {
	return (
		<>
			<UnitControl
				label={ __( 'Max Width', 'generateblocks' ) }
				id="gblocks-max-width"
				units={ units }
				overrideValue={ overrideValue }
				disabled={ disabled }
				value={ value }
				desktopValue={ desktopValue }
				tabletValue={ tabletValue }
				onChange={ onChange }
				overrideAction={ overrideAction }
			/>
		</>
	);
}
