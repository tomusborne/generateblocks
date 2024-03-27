import { SelectControl } from '@wordpress/components';
import options from '../options';

export default function TextTransform( { value, onChange, label } ) {
	return (
		<SelectControl
			labelPosition={ 'top' }
			label={ label }
			value={ value }
			options={ options.textTransform }
			onChange={ onChange }
		/>
	);
}
