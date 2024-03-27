import { SelectControl } from '@wordpress/components';
import options from '../options';

// TODO: Remove "default, normal, bold" and set default to 400
export default function FontWeight( { value, onChange, label } ) {
	return (
		<SelectControl
			labelPosition={ 'top' }
			label={ label }
			value={ value }
			options={ options.fontWeight }
			onChange={ onChange }
		/>
	);
}
