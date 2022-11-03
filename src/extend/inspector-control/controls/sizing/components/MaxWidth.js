import { __ } from '@wordpress/i18n';
import UnitControl from '../../../../../components/unit-control';

export default function MaxWidth( { value, desktopValue, tabletValue, onChange, disabled, overrideValue } ) {
	return (
		<>
			<UnitControl
				label={ __( 'Max Width', 'generateblocks' ) }
				id="gblocks-max-width"
				units={ [ 'px', '%', 'vw', 'rem' ] }
				overrideValue={ overrideValue }
				disabled={ disabled }
				value={ value }
				desktopValue={ desktopValue }
				tabletValue={ tabletValue }
				onChange={ onChange }
			/>
		</>
	);
}
