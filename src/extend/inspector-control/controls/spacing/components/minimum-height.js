import UnitPicker from '../../../../../components/unit-picker';
import { __ } from '@wordpress/i18n';
import { TextControl } from '@wordpress/components';
import spacingOptions from '../options';

export default function MinimumHeight( { value, onChange, unitValue, onChangeUnit } ) {
	return (
		<>
			<UnitPicker
				label={ __( 'Minimum Height', 'generateblocks' ) }
				value={ unitValue }
				units={ spacingOptions.minimumHeightUnits }
				onClick={ onChangeUnit }
			/>
			<TextControl type={ 'number' } value={ value } onChange={ onChange } />
		</>
	);
}
