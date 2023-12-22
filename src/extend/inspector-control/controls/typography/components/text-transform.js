import { SelectControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
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
